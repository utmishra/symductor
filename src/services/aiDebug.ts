import { Configuration, OpenAIApi } from 'openai';

import fs from 'fs';
import { execSync } from 'child_process';

const technologyStack = 'React, TypeScript, and Node.js';
export interface ErrorInformation {
  fileName: string;
  error: Error | string;
}

export async function sendErrorToChatGPT(errorInfo: ErrorInformation): Promise<void> {
  const { fileName, error } = errorInfo;

  // Get the git diff of the file
  const gitDiff = execSync(`git diff ${fileName}`).toString();

  // Read the complete code of the file
  const fileContent = fs.readFileSync(fileName, 'utf-8');

  // Create instruction set
  const instructionSet = {
    projectGoal: `The primary project goal is to build a web application using ${technologyStack}.`,
    fileName,
    gitDiff,
    fileContent,
    errorMessage: error.message,
    errorStack: error.stack,
  };

  // Send instruction set to ChatGPT API

  console.info('Sending data to ChatGPT API...');

  try {
    const prompt = `
        Analyze the provided information and return the following:
        - Error message without the full stack trace but include the necessary sources of error
        - Reason of error message
        - Possible solutions

        Information::
        ${JSON.stringify({ fileName: instructionSet['sourceURL'], error: instructionSet['error'] })}
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
      temperature: 0,
    });

    const result = response.data.choices[0].text;
    console.log(`OpenAI Response: ${result}`);
  } catch (error: unknown) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
      console.log('Something went wrong');
    }
  }
}
