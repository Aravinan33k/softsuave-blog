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
    case "crewai":
      // Overlapping "crew" of agent circles in CrewAI's red/orange brand color
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="9" r="5" fill="#FF5A1F" fillOpacity="0.85" />
          <circle cx="15" cy="9" r="5" fill="#FF5A1F" fillOpacity="0.85" />
          <circle cx="11.5" cy="15" r="5" fill="#EA580C" />
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
    case "amazonbedrock":
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
    case "chroma":
      // Chroma's stacked colour bars
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="5" rx="2.5" fill="#FFDE2D" />
          <rect x="3" y="10" width="18" height="5" rx="2.5" fill="#327EFF" />
          <rect x="3" y="16" width="18" height="4" rx="2" fill="#FF6446" />
        </svg>
      );
    case "databricks":
      // Databricks red stacked deltas
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L21 8L12 13L3 8L12 3Z" fill="#FF3621" />
          <path d="M3 12L12 17L21 12V15L12 20L3 15V12Z" fill="#FF3621" fillOpacity="0.7" />
        </svg>
      );
    case "snowflake":
      // Snowflake's blue six-spoke crystal
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#29B5E8" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3V21" />
            <path d="M4.2 7.5L19.8 16.5" />
            <path d="M19.8 7.5L4.2 16.5" />
          </g>
          <circle cx="12" cy="12" r="3" fill="#29B5E8" />
        </svg>
      );
    case "huggingface":
      // Hugging Face yellow smiling face
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" fill="#FFD21E" />
          <circle cx="9" cy="10" r="1.4" fill="#3B2F0B" />
          <circle cx="15" cy="10" r="1.4" fill="#3B2F0B" />
          <path d="M8.5 14C9.5 15.6 10.7 16.4 12 16.4C13.3 16.4 14.5 15.6 15.5 14" stroke="#3B2F0B" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "react":
      // React's electron orbits
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#61DAFB" strokeWidth="1.4">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          </g>
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        </svg>
      );
    case "angular":
      // Angular shield with A
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 5.5L4.5 18L12 22L19.5 18L21 5.5L12 2Z" fill="#DD0031" />
          <path d="M12 2V22L19.5 18L21 5.5L12 2Z" fill="#C3002F" />
          <path d="M12 6.5L16.5 16.5H14.7L13.8 14.2H10.2L9.3 16.5H7.5L12 6.5ZM12 9.8L10.8 12.7H13.2L12 9.8Z" fill="white" />
        </svg>
      );
    case "vuejs":
    case "vue":
      // Vue's layered green/navy V
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4H6.5L12 13.5L17.5 4H22L12 21L2 4Z" fill="#41B883" />
          <path d="M7.5 4H10.5L12 6.6L13.5 4H16.5L12 11.8L7.5 4Z" fill="#35495E" />
        </svg>
      );
    case "nextjs":
    case "next":
      // Next.js black circle wordmark N
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#0A0A0A" stroke="#3F3F46" strokeWidth="1" />
          <path d="M8.5 16.5V7.5L16 17.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 7.5V13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "typescript":
      // TS blue tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
          <path d="M6 11H12M9 11V18" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M18.5 12C17.6 11.2 14.5 11 14.5 13C14.5 15 18.5 14.5 18.5 16.5C18.5 18.5 15.2 18.3 14.2 17.4" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "javascript":
      // JS yellow tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
          <path d="M10 10V16C10 17.4 8 17.8 7 16.6" stroke="#1A1A1A" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M17.6 11.2C16.8 10.3 13.8 10.3 13.8 12.4C13.8 14.4 17.6 13.9 17.6 15.9C17.6 17.9 14.6 17.8 13.6 16.8" stroke="#1A1A1A" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "html5":
    case "html":
      // HTML5 orange shield
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2H20L18.6 19L12 22L5.4 19L4 2Z" fill="#E34F26" />
          <path d="M12 4V20.2L17 18L18.1 4H12Z" fill="#EF652A" />
          <path d="M8 7H16L15.7 10H10.5L10.7 12H15.5L15.1 16.5L12 17.6L8.9 16.5L8.7 14H10.7L10.8 15.2L12 15.6L13.2 15.2L13.4 13H8.5L8 7Z" fill="white" />
        </svg>
      );
    case "css3":
    case "css":
      // CSS3 blue shield
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2H20L18.6 19L12 22L5.4 19L4 2Z" fill="#1572B6" />
          <path d="M12 4V20.2L17 18L18.1 4H12Z" fill="#33A9DC" />
          <path d="M8 7H16L15.7 10H10.5L10.7 12H15.5L15.1 16.5L12 17.6L8.9 16.5L8.7 14H10.7L10.8 15.2L12 15.6L13.2 15.2L13.4 13H8.5L8 7Z" fill="white" />
        </svg>
      );
    case "nodejs":
    case "node":
      // Node's green hexagon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="#539E43" />
          <path d="M12 8.2C10 8.2 9 9 9 10.2C9 12.8 14 11.8 14 13.6C14 14.3 13.4 14.8 12.2 14.8C10.9 14.8 10.3 14.3 10.2 13.4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "net":
    case "dotnet":
      // .NET purple tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#512BD4" />
          <circle cx="6.2" cy="16.2" r="1.5" fill="white" />
          <path d="M9.5 17V9L15 17V9" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 9H21M19 9V17" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "java":
      // Java steam cup
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2C13 4 9 5.5 11 7.5M14 3.5C15.5 5 12.5 6 14 7.5" stroke="#EA2D2E" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 10H17V15C17 16.7 15.7 18 14 18H9C7.3 18 6 16.7 6 15V10Z" fill="#5382A1" />
          <path d="M17 11H18.5C19.6 11 20.5 11.9 20.5 13C20.5 14.1 19.6 15 18.5 15H17" stroke="#5382A1" strokeWidth="1.6" />
          <path d="M6 20.5C9 21.8 15 21.8 18 20.5" stroke="#EA2D2E" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "python":
      // Python's interlocking blue/yellow snakes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9 2 7 3 7 5.5V8H12V9H5.5C3.5 9 2 10.5 2 13.5C2 16 3 17.5 5 17.5H7V14C7 12 8.5 10.5 10.5 10.5H15V5.5C15 3 14 2 12 2Z" fill="#3776AB" />
          <path d="M12 22C15 22 17 21 17 18.5V16H12V15H18.5C20.5 15 22 13.5 22 10.5C22 8 21 6.5 19 6.5H17V10C17 12 15.5 13.5 13.5 13.5H9V18.5C9 21 10 22 12 22Z" fill="#FFD43B" />
          <circle cx="10" cy="5.5" r="1" fill="white" />
          <circle cx="14" cy="18.5" r="1" fill="#3776AB" />
        </svg>
      );
    case "php":
      // PHP purple ellipse
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="11" ry="6.5" fill="#777BB4" />
          <path d="M6 15L7.4 9H10C11.2 9 11.8 9.7 11.6 10.8C11.4 12 10.6 12.6 9.4 12.6H8.2L7.8 15H6Z" fill="white" />
          <path d="M13.6 15L15 9H17.6C18.8 9 19.4 9.7 19.2 10.8C19 12 18.2 12.6 17 12.6H15.8L15.4 15H13.6Z" fill="white" />
        </svg>
      );
    case "rubyonrails":
    case "rails":
    case "ruby":
      // Rails red gem
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4H17L21 9L12 21L3 9L7 4Z" fill="#CC0000" />
          <path d="M3 9H21M12 21L7 4M12 21L17 4M7 4L12 9L17 4M3 9L12 9L21 9" stroke="white" strokeWidth="0.9" strokeOpacity="0.7" />
        </svg>
      );
    case "django":
      // Django dark green tile with D
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#092E20" />
          <path d="M13.5 5V19C11 19.6 8 19 8 15C8 11.4 10.4 10.4 13.5 11.2" stroke="#44B78B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M16.5 8V15" stroke="#44B78B" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="16.5" cy="5.4" r="1.2" fill="#44B78B" />
        </svg>
      );
    case "nestjs":
    case "nest":
      // NestJS red cat-head hexagon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="#E0234E" />
          <path d="M8 9C10.5 8 13 9.5 13 12C13 14 11.5 15.5 9.5 15.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="15" cy="10" r="1.4" fill="white" />
        </svg>
      );
    case "figma":
      // Figma's five-colour stack
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 2H12V8H9C7.3 8 6 6.7 6 5C6 3.3 7.3 2 9 2Z" fill="#F24E1E" />
          <path d="M12 2H15C16.7 2 18 3.3 18 5C18 6.7 16.7 8 15 8H12V2Z" fill="#FF7262" />
          <path d="M9 8H12V14H9C7.3 14 6 12.7 6 11C6 9.3 7.3 8 9 8Z" fill="#A259FF" />
          <path d="M9 14H12V17C12 18.7 10.7 20 9 20C7.3 20 6 18.7 6 17C6 15.3 7.3 14 9 14Z" fill="#0ACF83" />
          <circle cx="15" cy="11" r="3" fill="#1ABCFE" />
        </svg>
      );
    case "sketch":
      // Sketch amber diamond
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4H18L22 9L12 21L2 9L6 4Z" fill="#FDB300" />
          <path d="M2 9H22M12 21L6 4M12 21L18 4" stroke="white" strokeWidth="0.9" strokeOpacity="0.65" />
        </svg>
      );
    case "framer":
      // Framer's blue folded shape
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2H19V9H12L5 2Z" fill="#0055FF" />
          <path d="M5 9H19L12 16H5V9Z" fill="#0055FF" fillOpacity="0.75" />
          <path d="M5 16H12V23L5 16Z" fill="#0055FF" fillOpacity="0.5" />
        </svg>
      );
    case "miro":
      // Miro's yellow overlapping panels
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#FFD02F" />
          <path d="M9 5L6.5 10V19H8.8V11L11 6.5L9 5Z" fill="#050038" />
          <path d="M13.5 5L11 10V19H13.3V11L15.5 6.5L13.5 5Z" fill="#050038" />
          <path d="M18 5L15.5 10V19H17.8V11L19.5 6.5L18 5Z" fill="#050038" />
        </svg>
      );
    case "adobephotoshop":
    case "photoshop":
      // Photoshop blue Ps tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#001E36" />
          <path d="M7 17V7H10C11.7 7 12.8 8 12.8 9.8C12.8 11.6 11.7 12.7 10 12.7H8.8" stroke="#31A8FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 10.4C17.3 9.8 14.8 9.7 14.8 11.3C14.8 12.9 18 12.4 18 14.3C18 15.9 15.6 15.9 14.7 15.2" stroke="#31A8FF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "adobeillustrator":
    case "illustrator":
      // Illustrator orange Ai tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#330000" />
          <path d="M6 17L9.5 7L13 17M7.4 13.6H11.6" stroke="#FF9A00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 10.5V17" stroke="#FF9A00" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="16.5" cy="7.4" r="1.2" fill="#FF9A00" />
        </svg>
      );
    case "selenium":
      // Selenium green mercury drop
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C12 2 5 9 5 14C5 18 8.1 21 12 21C15.9 21 19 18 19 14C19 9 12 2 12 2Z" fill="#43B02A" />
          <path d="M9.5 14C9.5 16 10.6 17.5 12.4 17.8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "cypress":
      // Cypress dark circle with arc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#17202C" />
          <path d="M15 9.2C14.3 8.5 13.3 8.2 12.3 8.4C10.5 8.8 9.4 10.4 9.7 12.2C10 14 11.6 15.1 13.3 14.8C14.2 14.6 15 14.1 15.4 13.3" stroke="#69D3A7" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15.6 15.4L14.2 18.6" stroke="#69D3A7" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "playwright":
      // Playwright's green theatre mask
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#2D4552" />
          <path d="M6.5 10.5C7.4 9.6 9 9.6 9.9 10.5" stroke="#E2574C" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14.1 10.5C15 9.6 16.6 9.6 17.5 10.5" stroke="#2EAD33" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7.5 15C9 16.8 15 16.8 16.5 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "appium":
      // Appium purple circle with A
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#662D91" />
          <path d="M7.8 17L12 7L16.2 17M9.4 13.8H14.6" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "postman":
      // Postman orange planet
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FF6C37" />
          <path d="M9.5 15L15 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M13 7.8C14.7 7.8 15.9 9.1 15.9 10.7C15.9 12 15 13 13.8 13.4L10.6 14.4L9.6 11.2C9.9 10 11 9.1 12.3 9.1" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "apachejmeter":
    case "jmeter":
      // JMeter's Apache feather
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 3C13 5 8.5 9.5 6.5 15L5 21" stroke="#D22128" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 3C18 8 15.5 12.5 11 15C9.5 15.8 8 16 6.7 15.6C8.6 10 12.9 5.2 18 3Z" fill="#D22128" />
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
