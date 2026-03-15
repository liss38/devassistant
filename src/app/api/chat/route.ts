
import { generateText, streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { REACT_SYSTEM_PROMPT } from '@/lib/prompts';
import { createOpenAI } from '@ai-sdk/openai';


// 
// 
// @TODO/REFACT —> вынести в lib/yandex-gpt
// 
//  OpenAI‑совместимый endpoint AI Studio
const yandexBaseURL=`https://llm.api.cloud.yandex.net`;
// 
//  Модель YandexGPT (пример, см. доку AI Studio)
const yandexGptModelUri=`gpt://${process.env.YANDEX_FOLDER_ID!}/yandexgpt-lite/latest`;
// 
// YandexGPT client
const yandex = createOpenAI({
  baseURL: yandexBaseURL,
  apiKey: process.env.YANDEX_API_KEY!,
  headers: {
    'x-folder-id': process.env.YANDEX_FOLDER_ID!,
  },
});
// 
// 
// ------------------------


// 
// @TODO/REFACT:
const completionOptions = {
  stream: true,
  temperature: 0.6,
  maxTokens: '2000',
};
// ----------------



export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const formattedMessages = [
      {
        role: 'system',
        text: REACT_SYSTEM_PROMPT,
      },
      ...((messages || []).map((m: any) => ({ role: m.role, text: m.content })))
    ];

    const response = await fetch(
      `${yandexBaseURL}/foundationModels/v1/completion`, {
        method: 'POST',
        headers: {
          'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
          'x-folder-id': process.env.YANDEX_FOLDER_ID!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelUri: yandexGptModelUri,
          messages: formattedMessages,
          completionOptions,
        }),
    });

    console.log(`>>>>>>>>>  YandexGPT Response:  `,  response);

    if (!response.ok) {
      throw new Error(`Yandex API error: ${response.status}`);
    }

    // ✅ STREAMING через ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  const text = parsed.result?.alternatives?.[0]?.message?.text || '';
                  if (text) {
                    controller.enqueue(`data: ${JSON.stringify({ text })}\n\n`);
                  }
                } catch (e) {
                  // Игнорируем невалидный JSON
                }
              }
            }
          }
        } finally {
          controller.enqueue('data: [DONE]\n\n');
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('YandexGPT error:', error);
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }


  // try {
  //   const { message } = await req.json();

  //   const result = await streamText({
  //     model: yandex(yandexGPTModel),
  //     system: REACT_SYSTEM_PROMPT,
  //     messages: [
  //       { role: 'user', content: message }
  //     ],
  //   });

  //   return result.toTextStreamResponse();
  // } catch (error) {
  //   console.error('AI Error:', error);
  //   return NextResponse.json(
  //     { error: 'AI service unavailable' },
  //     { status: 500 }
  //   );
  // }
}