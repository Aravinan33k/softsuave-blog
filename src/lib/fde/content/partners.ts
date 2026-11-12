export type PartnerIconName = "sparkles" | "brain" | "bolt";

export type ModelPartner = {
  name: string;
  /** Model family shown under the partner name. */
  models: string;
  icon: PartnerIconName;
  strengths: string[];
};

export const modelPartnersContent = {
  badge: "Flexible AI Implementation",
  headline: "Build With the Right AI for Every Workflow",
  description:
    "Use models from OpenAI, Anthropic, and Google based on the workflow, data, integration needs, and expected output instead of relying on one AI platform.",
  footnote:
    "Our Forward Deployed Engineers evaluate the workflow and integrate the AI models that best fit the solution.",
};

export const modelPartners: ModelPartner[] = [
  {
    name: "Anthropic",
    models: "Use Claude for AI applications that involve reasoning, document-heavy workflows, structured analysis, and knowledge-based tasks.",
    icon: "sparkles",
    strengths: [
      "Document understanding",
      "Long-context workflows",
      "Structured analysis",
      "AI assistants and agents",
    ],
  },
  {
    name: "OpenAI",
    models: "Build AI agents, assistants, automation, and multimodal applications using GPT models and OpenAI APIs.",
    icon: "brain",
    strengths: [
      "AI agents and assistants",
      "Text and multimodal applications",
      "Tool and API integrations",
      "Business workflow automation",
    ],
  },
  {
    name: "Google",
    models: "Build AI solutions with Gemini and Google Cloud services for multimodal applications, enterprise integrations, and connected workflows.",
    icon: "bolt",
    strengths: [
      "Multimodal AI applications",
      "Google Cloud integrations",
      "Enterprise AI workflows",
      "AI agents and automation",
    ],
  },
];
