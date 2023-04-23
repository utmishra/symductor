import { Configuration, OpenAIApi } from 'openai';

import fs from 'fs';
import { execSync } from 'child_process';

const technologyStack = 'React, TypeScript, and Node.js';
export interface ErrorInformation {
  fileName: string;
  error: Error | string;
}

export type ChatGPTResponse = { errorMessageSummary: string; reason: string; possibleSolution: string };

export async function sendErrorToChatGPT(type: 'server' | 'client', errorInfo: ErrorInformation): Promise<undefined | ChatGPTResponse> {
  console.error(errorInfo);

  const { fileName, error } = errorInfo;

  // Get the git diff of the file
  const gitDiff = type === 'server' ? execSync(`git diff ${fileName}`).toString() : 'NA';

  // Read the complete code of the file
  const fileContent = type === 'server' ? fs.readFileSync(fileName, 'utf-8') : 'NA';

  // Create instruction set
  const instructionSet = {
    projectGoal: `The primary project goal is to build a web application using ${technologyStack}.`,
    errorType: type,
    fileName,
    gitDiff,
    fileContent,
    errorMessage: error,
    errorStack: error,
  };

  // Send instruction set to ChatGPT API

  console.info('Sending data to ChatGPT API...');

  try {
    const prompt = `
    Analyze the provided information and respond a JSON object (and no other text before or after the JSON) with the following fields:
    - errorMessageySummary: Error message without the full stack trace but include the necessary sources of error
    - reason: Reason of error message
    - possibleSolutions: Possible solutions
    
    -- If the type === 'client', fileName, gitDiff, and fileContent will be 'NA'.
    -- If the type === 'client', format the values in Markdown format with errorMessageSummary as a heading and quoted, reason in a bold but regular text as a paragraph and and possibleSolution as a bull list. Make sure to wrap code in Markdown code wrappers wherever applicable.

    -- Information (in JSON format)::
    ${JSON.stringify(instructionSet)}    
  `;

    console.log(`OpenAI Prompt: ${prompt}`);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.3,
    });

    let result: ChatGPTResponse | string = 'Something went wrong.';
    console.log('ChatGPT Response: ', response.data.choices);

    if (response?.data?.choices) {
      try {
        // Remove next line characters from the response
        const responseText = response.data.choices[0].text?.replace(/[\r\n]/g, '');
        const jsonData = responseText?.match(/({.*})/g);

        result = response.data.choices[0].text && jsonData && JSON.parse(jsonData[0]);
      } catch (err) {
        console.error("Failed to parse ChatGPT's response. Here is the full response: ", response.data.choices[0].text);
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
