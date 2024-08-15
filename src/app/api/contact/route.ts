import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, content } = req.body;

        try {
            // メール送信処理
            const transporter = nodemailer.createTransport({
                // メールサーバーの設定
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: 'temmie0232@gmail.com',
                subject: `問い合わせ: ${title}`,
                text: content,
            });

            // OpenAI APIを使用して回答を生成
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);

            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "あなたはカスタマーサポートの担当者です。丁寧で親切な対応を心がけてください。" },
                    { role: "user", content: `Title: ${title}\n\nContent: ${content}\n\n間違えに関する謝罪を含め、内容は制作者のメールへと送信された旨を返信してください。それ以外の内容の場合は、適切な返答をしてください。` }
                ],
            });

            const response = completion.data.choices[0]?.message?.content || '申し訳ございません。回答の生成中にエラーが発生しました。';

            res.status(200).json({ response });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}