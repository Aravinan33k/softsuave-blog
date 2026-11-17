import type { TechStackContent } from "@/components/landing/tech-stack";

/**
 * The AI technology stack, on its own so the "Hire AI Developers" page can reuse
 * its groups without importing the whole Custom AI page's copy (`custom-ai-content`)
 * into the browser.
 */
export const caTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Our AI Technology Stack",
  body: "Our AI development services use proven models, frameworks, cloud platforms, and MLOps tools to deliver secure, scalable, production-ready solutions for diverse business requirements.",
  groups: [
    {
      name: "Foundation Models",
      items: ["GPT", "Claude", "Gemini", "Llama", "Mistral", "DeepSeek", "OpenAI", "Anthropic"],
    },
    {
      name: "AI Frameworks",
      items: ["LangChain", "LangGraph", "CrewAI", "AutoGen", "LlamaIndex", "Semantic Kernel"],
    },
    {
      name: "Vector Databases and Search",
      items: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "FAISS", "Chroma"],
    },
    {
      name: "Cloud AI and Data Platforms",
      items: ["Azure AI", "Amazon Bedrock", "Google Vertex AI", "Databricks", "Snowflake", "Hugging Face"],
    },
  ],
};
