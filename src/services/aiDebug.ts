import { Configuration, OpenAIApi } from 'openai';

import fs from 'fs';
import { execSync } from 'child_process';

const technologyStack = 'React, TypeScript, and Node.js';
export interface ErrorInformation {
  fileName: string;
  error: Error | string;
}

export type ChatGPTResponse = { errorMessageSummary: string; reason: string; possibleSolution: string };

export async function sendErrorToChatGPT(type: 'server' | 'client', errorInfo: string, fileName?: string): Promise<undefined | ChatGPTResponse> {
  // Get the git diff of the file
  const gitDiff = type === 'server' ? execSync(`git diff ${fileName}`).toString() : 'NA';

  // Read the complete code of the file
  const fileContent = type === 'server' && fileName ? fs.readFileSync(fileName, 'utf-8') : 'NA';

  // Create instruction set
  const instructionSet = {
    projectGoal: `The primary project goal is to build a web application using ${technologyStack}.`,
    errorType: type,
    fileName,
    gitDiff,
    fileContent,
    errorMessage: errorInfo,
  };

  // Send instruction set to ChatGPT API

  console.info('Sending data to ChatGPT API...');

  try {
    const prompt = `
    This data is being sent to the ChatGPT API to generate a response. The response will be used to debug the error. Process the Error details shared in INPUTDATA and respond in pure JSON format, following the structure provided in OUTPUTDATA section. It is important to respond in JSON format, with no other text added before and after the JSON in your response and that it follows the structure of OUTPUTDATA to ensure that the response is parsed correctly. Therefore, no need to add introductory text like "Here is the response:" or "The response is:".
    -- INPUTDATA::
    ${JSON.stringify(instructionSet)}

    -- OUTPUTDATA::
    { "errorMessageSummary": string, //Error message without the full stack trace but include the necessary sources of error. Send the string in Markdown format, starting as a Heading (# Heading)
      "reason": string, // Reason of error message. Send the string in Markdown format, starting as bullet points, with main reason marked as bold.
      "possibleSolutions": string  //Possible solutions to fix the error. Send the string in Markdown format, starting as bullet points, with main solution marked as bold.
    }

    -- Explanation of input data::
    projectGoal: This provides the initial context of the Project the developer is working on
    errorType: This provides the type of error, whether it is a client side error or a server side error
    fileName: This provides the name of the file where the error occurred. It can be NA for client type errors
    gitDiff: This provides the git diff of the file where the error occurred. It can be used to add context for the recently made changes in the code. It can be NA for client type errors
    fileContent: This provides the complete code of the file where the error occurred. It can be NA for client type errors
    errorMessage: This provides the error message and the most important input field. Find out why this error could've occured based on the above received context. It can be a string with error message and might include the error stack.
    errorStack: This provides the full stack trace of the error. It can be NA for client type errors
  `;

    console.log(`OpenAI Prompt: ${prompt}`);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      n: 1,
      stop: ['}\n'],
      temperature: 0.3,
      messages: [{ role: 'assistant', content: prompt }],
    });

    let result: ChatGPTResponse | string = 'Something went wrong.';

    if (response?.data?.choices) {
      try {
        if (
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].message &&
          response.data.choices[0].message.content
        ) {
          // Remove next line characters from the response
          console.log('ChatGPT Response: ', response.data.choices[0].message.content);
          const responseText = response.data.choices[0].message.content.replace(/[\r\n]/g, '');
          const jsonData = responseText.match(/({.*})/g);

          if (jsonData) {
            result = JSON.parse(jsonData[0]);
          }
        }
      } catch (err) {
        console.error("Failed to parse ChatGPT's response. Here is the full response: ", response.data.choices[0].message);
      }
    }

    if (type === 'server') {
      console.error((result as ChatGPTResponse).errorMessageSummary);
      console.info((result as ChatGPTResponse).reason);
      console.info((result as ChatGPTResponse).possibleSolution);
      return;
    } else {
      return result as ChatGPTResponse;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
