import { generateText } from "ai";
import "dotenv/config";

async function main() {
  const result = await generateText({
    model: "minimax/minimax-m3-free",

    prompt: "Hello! Introduce yourself in one short sentence.",
  });

  console.log(result.text);
}

main().catch(console.error);