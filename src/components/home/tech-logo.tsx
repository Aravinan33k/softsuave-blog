import React from "react";

/**
 * Returns a high-quality inline SVG logo/icon for the given technology name.
 */
export default function TechLogo({ name }: { name: string }) {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (norm) {
    case "mistral":
      // Stylized chevron orange/red M
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18V6L12 11.5L20 6V18L16.5 15.5L12 18.5L7.5 15.5L4 18Z" fill="#FF5436" />
        </svg>
      );
    case "deepseek":
      // Stylized blue circle with white gear/badge shape
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#0066FF" />
          <path d="M8 8H16V10H10V12H14V14H10V16H8V8Z" fill="white" />
        </svg>
      );
    case "gpt":
    case "openai":
      // Stylized OpenAI green/white flower spiral
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#10a37f" />
          <path d="M12.5 8C11.5 8 11 8.5 11 9.5C11 10.5 11.5 11 12.5 11C13.5 11 14 10.5 14 9.5C14 8.5 13.5 8 12.5 8Z" fill="white" />
          <path d="M10.5 13C9.5 13 9 13.5 9 14.5C9 15.5 9.5 16 10.5 16C11.5 16 12 15.5 12 14.5C12 13.5 11.5 13 10.5 13Z" fill="white" />
        </svg>
      );
    case "claude":
    case "anthropic":
      // Stylized gold/amber symbol
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12M12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6M12 18C9.33 18 6.67 16.67 6.67 14C6.67 11.33 9.33 10 12 10C14.67 10 17.33 11.33 17.33 14C17.33 16.67 14.67 18 12 18Z" fill="#D97706" />
        </svg>
      );
    case "gemini":
      // Google Gemini blue/purple sparkle star
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill="url(#geminiGrad)" />
          <defs>
            <linearGradient id="geminiGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93C5FD" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "llama":
      // Stylized animal face/ears in brown/white
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#6B7280" />
          <path d="M9 16C9 14 10 11 12 11C14 11 15 14 15 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="8" r="1.5" fill="white" />
          <circle cx="14" cy="8" r="1.5" fill="white" />
        </svg>
      );
    case "autogen":
      // Microsoft/Agent purple-blue node logo
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#6366F1" />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      );
    case "llamaindex":
      // Meta llama badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#F59E0B" />
          <path d="M7 17V7L12 12L17 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "semantickernel":
      // Microsoft colorful squares
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A1F1" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
      );
    case "langchain":
      // Parrot green/yellow brand icon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#13AA52" />
          <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12" stroke="white" strokeWidth="2" />
        </svg>
      );
    case "langgraph":
      // Network nodes and lines
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="18" r="3" fill="#EC4899" />
          <circle cx="18" cy="6" r="3" fill="#3B82F6" />
          <circle cx="12" cy="12" r="3" fill="#10B981" />
          <line x1="8.5" y1="15.5" x2="10.5" y2="13.5" stroke="white" strokeWidth="1.5" />
          <line x1="13.5" y1="10.5" x2="15.5" y2="8.5" stroke="white" strokeWidth="1.5" />
        </svg>
      );
    case "qdrant":
      // Magenta/purple cube
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#D946EF" />
          <path d="M12 2L12 22M3 7L21 17M21 7L3 17" stroke="white" strokeWidth="1.5" />
        </svg>
      );
    case "milvus":
      // Vector database blue bird
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#0EA5E9" />
          <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white" />
        </svg>
      );
    case "faiss":
      // Meta AI infinity loop
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 14.5C15.2 14.5 14 13.5 13 12.5C12 11.5 10.8 10.5 9.5 10.5C8.2 10.5 7 11.5 7 12.5C7 13.5 8.2 14.5 9.5 14.5C10.8 14.5 12 13.5 13 12.5C14 11.5 15.2 10.5 16.5 10.5C17.8 10.5 19 11.5 19 12.5C19 13.5 17.8 14.5 16.5 14.5Z" fill="#0080FF" />
        </svg>
      );
    case "pinecone":
      // Stylized pinecone green segments
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L6 8H18L12 2Z" fill="#22C55E" />
          <path d="M12 8L5 15H19L12 8Z" fill="#15803D" />
          <path d="M12 15L7 21H17L12 15Z" fill="#166534" />
        </svg>
      );
    case "weaviate":
      // Green/blue helix
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#14B8A6" />
          <path d="M7 12C7 9.24 9.24 7 12 7V17C9.24 17 7 14.76 7 12Z" fill="white" />
        </svg>
      );
    case "azureai":
      // Microsoft Azure polygon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 19L10 14.5L14.5 19H5.5Z" fill="#008AD7" />
          <path d="M14.5 19L10 14.5L18.5 5L14.5 19Z" fill="#0072C6" />
          <path d="M18.5 5L10 14.5L5.5 19L18.5 5Z" fill="#50E6FF" />
        </svg>
      );
    case "awsbedrock":
      // AWS orange arrow/box
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#FF9900" />
          <path d="M6 14C8 17 12 18 16 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M15 13L17 17L13 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "googlevertexai":
    case "vertexai":
      // Google Cloud Platform hexagon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#4285F4" />
          <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="#EA4335" />
          <path d="M12 9L9 11V13L12 15L15 13V11L12 9Z" fill="#FBBC05" />
        </svg>
      );
    default:
      // Generic database/cloud icon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="var(--accent)" />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      );
  }
}
