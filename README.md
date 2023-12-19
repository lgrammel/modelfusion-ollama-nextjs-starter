# Next.js, Vercel AI SDK, Ollama & ModelFusion starter

This starter example shows how to use [Next.js](https://nextjs.org/), the [Vercel AI SDK](https://sdk.vercel.ai/docs), [Ollama](https://ollama.ai/) and [ModelFusion](https://modelfusion.dev) to create a ChatGPT-like AI-powered streaming chat bot.

## Setup

1. Install [Ollama](https://ollama.ai/) on your machine.
1. Pull the model: `ollama pull llama2:chat` ([reference](https://ollama.ai/library/llama2))
1. Clone the repository: `git clone https://github.com/lgrammel/modelfusion-ollama-nextjs-starter.git`
1. Install dependencies: `npm install`
1. Start the development server: `npm run dev`
1. Go to http://localhost:3000/
1. Code: `app/api/chat/route.ts`

## Example Route

```ts
import { ModelFusionTextStream } from "@modelfusion/vercel-ai";
import { Message, StreamingTextResponse } from "ai";
import { TextChatMessage, ollama, streamText } from "modelfusion";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  // Use ModelFusion to call Ollama:
  const textStream = await streamText(
    ollama.ChatTextGenerator({ model: "llama2:chat" }).withChatPrompt(),
    {
      system:
        "You are an AI chat bot. " +
        "Follow the user's instructions carefully.",

      // map Vercel AI SDK Message to ModelFusion TextChatMessage:
      messages: messages.filter(
        // only user and assistant roles are supported:
        (message) => message.role === "user" || message.role === "assistant"
      ) as TextChatMessage[],
    }
  );

  // Return the result using the Vercel AI SDK:
  return new StreamingTextResponse(
    ModelFusionTextStream(
      textStream,
      // optional callbacks:
      {
        onStart() {
          console.log("onStart");
        },
        onToken(token) {
          console.log("onToken", token);
        },
        onCompletion: () => {
          console.log("onCompletion");
        },
        onFinal(completion) {
          console.log("onFinal", completion);
        },
      }
    )
  );
}
```
