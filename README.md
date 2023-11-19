# Next.js, Vercel AI SDK, Ollama & ModelFusion starter

This starter example shows how to use [Next.js](https://nextjs.org/), the [Vercel AI SDK](https://sdk.vercel.ai/docs), [Ollama](https://ollama.ai/) and [ModelFusion](modelfusion.dev) to create a ChatGPT-like AI-powered streaming chat bot.

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

### Vicuna

1. Pull the model: `ollama pull vicuna` ([reference](https://ollama.ai/library/vicuna))
2. Go to http://localhost:3000/vicuna
3. Code: `app/api/vicuna/route.ts`
