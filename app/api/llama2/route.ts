import { Message, StreamingTextResponse, readableFromAsyncIterable } from "ai";
import {
  ChatMessage,
  Llama2PromptFormat,
  OllamaTextGenerationModel,
  streamText,
} from "modelfusion";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const textStream = await streamText(
    new OllamaTextGenerationModel({
      model: "llama2:7b-chat",
      maxCompletionTokens: -1, // infinite generation
      temperature: 0,
      raw: true, // use raw inputs and map to prompt format below
    }).withPromptFormat(Llama2PromptFormat.chat()), // Llama2 prompt
    {
      system:
        "You are an AI chat bot. " +
        "Follow the user's instructions carefully.",

      // map Vercel AI SDK Message to ModelFusion ChatMessage:
      messages: messages
        .filter(
          // only user and assistant roles are supported:
          (message) => message.role === "user" || message.role === "assistant"
        )
        .map((message) => ({
          role: message.role,
          content: message.content,
        })) as ChatMessage[],
    }
  );

  return new StreamingTextResponse(readableFromAsyncIterable(textStream));
}
