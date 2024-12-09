// Import necessary modules
import ModelClient from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Route handler
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || !body.messages || !Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(process.env)

    const client = new ModelClient(process.env.API_CLIENT_PATH, new AzureKeyCredential(process.env.API_CLIENT_KEY));

    const response = await client.path("/chat/completions").post({
      body: {
        messages: body.messages,
      },
    });

    if (isUnexpected(response)) {
      return new Response(JSON.stringify({ error: response.body.error }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { choices, model, usage } = response.body;

    return new Response(
      JSON.stringify({
        message: choices[0].message.content,
        model: model,
        usage: {
          promptTokens: usage.prompt_tokens,
          totalTokens: usage.total_tokens,
          completionTokens: usage.completion_tokens,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
