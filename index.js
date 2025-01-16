import { chatCompletionStream, HfInference } from "@huggingface/inference";
import readline from "readline";

// creating instance to call hugging face inference API 
const inference = new HfInference(process.env.HUGGING_FACE_TOKEN);
let out = "";

// Context for the conversation
const context = [
  {
    role: "system",
    content: "You are a helpful and harmless assistant. You should list out 3 options and answer in short and ask which 2 options to explain in detail further.",
  },
];

// readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to handle streaming responses
const createChatStream = async (userPrompt) => {
  // Add the user prompt to the context
  context.push({
    role: "user",
    content: userPrompt,
  });

  const stream = inference.chatCompletionStream({
    model: "Qwen/Qwen2.5-Coder-32B-Instruct",
    messages: context,
    temperature: 0.5,
    max_tokens: 500,
    top_p: 0.7,
    seed:7777,
  });

  // Process the stream
  for await (const chunk of stream) {
    if (chunk.choices && chunk.choices.length > 0) {
      const newContent = chunk.choices[0].delta.content;
      out += newContent;
    }
  }

  // Log the assistant's response
  console.log("Response:", out);

  // Add the assistant's response to the context
  context.push({
    role: "assistant",
    content: out,
  });

  // Reset `out` for the next prompt
  out = "";
};

// Prompt the user for input and process it
const askPrompt = () => {
  rl.question("Enter your prompt: ", async (userPrompt) => {
    if (userPrompt.trim().toLowerCase() === "exit") {
      console.log("Exiting...");
      rl.close();
      return;
    }

    // Handle the chat stream
    await createChatStream(userPrompt);

    // Ask for the next prompt
    askPrompt();
  });
};

// Start the process
console.log("Enter your prompt (type 'exit' to quit):");
askPrompt();
