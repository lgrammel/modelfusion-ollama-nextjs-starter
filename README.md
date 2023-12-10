# Next.js, Vercel AI SDK, Ollama & ModelFusion starter

This starter example shows how to use [Next.js](https://nextjs.org/), the [Vercel AI SDK](https://sdk.vercel.ai/docs), [Ollama](https://ollama.ai/) and [ModelFusion](https://modelfusion.dev) to create a ChatGPT-like AI-powered streaming chat bot.

## Setup

1. Install [Ollama](https://ollama.ai/) on your machine.
2. Clone the repository: `git clone https://github.com/lgrammel/modelfusion-ollama-nextjs-starter.git`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

For each example, you also need to pull the AI model with Ollama.

## Examples

### Llama 2

1. Pull the model: `ollama pull llama2:chat` ([reference](https://ollama.ai/library/llama2))
2. Go to http://localhost:3000/llama2
3. Code: `app/api/llama/route.ts`

### Mistral

1. Pull the model: `ollama pull mistral:text` ([reference](https://ollama.ai/library/mistral))
2. Go to http://localhost:3000/mistral
3. Code: `app/api/mistral/route.ts`

### OpenHermes 2.5

1. Pull the model: `ollama pull openhermes2.5-mistral` ([reference](https://ollama.ai/library/openhermes2.5-mistral))
2. Go to http://localhost:3000/openhermes
3. Code: `app/api/openhermes/route.ts`

### Neural Chat

1. Pull the model: `ollama pull neural-chat` ([reference](https://ollama.ai/library/neural-chat))
2. Go to http://localhost:3000/neural-chat
3. Code: `app/api/neural-chat/route.ts`

### Vicuna

1. Pull the model: `ollama pull vicuna` ([reference](https://ollama.ai/library/vicuna))
2. Go to http://localhost:3000/vicuna
3. Code: `app/api/vicuna/route.ts`

## Example Route

```ts
import { ModelFusionTextStream } from "@modelfusion/vercel-ai";
import { Message, StreamingTextResponse } from "ai";
import { Llama2Prompt, TextChatMessage, ollama, streamText } from "modelfusion";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  // Use ModelFusion to call Ollama:
  const textStream = await streamText(
    ollama
      .TextGenerator({
        model: "llama2:chat",
        maxCompletionTokens: -1, // infinite generation
        temperature: 0,
        raw: true, // use raw inputs and map to prompt template below
      })
      .withPromptTemplate(Llama2Prompt.chat()),
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
