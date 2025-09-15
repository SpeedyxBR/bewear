import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// A chave de API é lida do arquivo .env automaticamente pelo Next.js
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const result = await model.generateContent('Explain how AI works in a few words');
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}