# basic-chatbot

This is a Node.js-based chatbot application that utilizes chatCompletionStream to interact with an AI model. The chatbot supports dynamic user input through the terminal and streams real-time responses from the AI. The conversation context is maintained throughout the session to provide a coherent chat experience.

## Features
#### Interactive Chat: Users can input prompts through the terminal and receive AI-generated responses.
#### Streaming Responses: AI responses are streamed in real-time for a smoother experience.\n
#### Context Maintenance: The conversation context, including both user inputs and AI responses, is preserved for continuity.
#### Customizable Model: Uses the Qwen/Qwen2.5-Coder-32B-Instruct model but can be adapted to other models.
#### Graceful Exit: Allows users to terminate the session by typing exit.

## Requirements
Node.js: Ensure you have Node.js (version 14 or above) installed.
Inference API: Access to an AI inference service that supports chatCompletionStream.

## Installation
Clone the repository or download the script:

```
git clone https://github.com/TAMANNA230904/basic-chatbot
 ```

Install necessary dependencies:
```
npm install
```


