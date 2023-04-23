import { NextApiRequest, NextApiResponse } from 'next';
import { sendErrorToChatGPT, ErrorInformation } from '../../../services/aiDebug';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const errorInfo: ErrorInformation = req.body;
    const chatGPTResponse = await sendErrorToChatGPT('client', errorInfo);
    res.status(200).json({ message: chatGPTResponse });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};
