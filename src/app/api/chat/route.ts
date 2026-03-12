
import { yandex } from '@ai-sdk/yandexcloud';
import { generateText, streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { REACT_SYSTEM_PROMPT } from '@/lib/prompts';


export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const result = await streamText({
      model: yandex('yandexgpt-lite'),
      system: REACT_SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: message }
      ],
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json(
      { error: 'AI service unavailable' },
      { status: 500 }
    );
  }
}