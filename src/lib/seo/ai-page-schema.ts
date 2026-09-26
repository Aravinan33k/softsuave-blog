/**
 * Structured data for the AI service pages, transcribed from the approved SEO
 * specification (the "Schemas" block each page carries in the content doc).
 *
 * Three things make this a data module rather than eight hand-written objects
 * in eight `page.tsx` files:
 *
 *  - the nodes cross-reference each other by `@id` — a page's Service points at
 *    its WebPage, its WebPage points back at the Service, and both point at the
 *    single Organization — so they have to be authored as one consistent set;
 *  - the Organization node is identical on every page, so it is declared once
 *    here and referenced by `@id` everywhere else, which is also what stops the
 *    same company facts drifting apart page to page;
 *  - five of the eight pages are not built yet (RAG & Document AI, Computer
 *    Vision, Predictive Intelligence, Data Engineering, Data Science). Their
 *    markup is approved and lives here ready for the route, rather than being
 *    re-derived when someone finally adds it.
 *
 * URLs are absolute and production-canonical on purpose: structured data is
 * read by crawlers against the live origin, not against whatever host is
 * serving a preview, so these do NOT go through `absoluteUrl`.
 *
 * Emitted through `components/seo/json-ld.tsx` — see `aiPageJsonLd` below.
 */

/** Shared publisher node. Every page's Service resolves `provider` to this. */
export const softSuaveOrganizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.softsuave.com/#organization",
  "name": "Soft Suave Technologies",
  "alternateName": "Soft Suave",
  "url": "https://www.softsuave.com/",
  "logo": "https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp",
  "description": "Soft Suave is an AI-enabled engineering partner helping businesses build scalable AI solutions, automate complex workflows, and integrate modern technologies through augmented teams and dedicated developers.",
  "foundingDate": "2012",
  "email": "contact@softsuave.com",
  "address": [
    {
      "@type": "PostalAddress",
      "name": "Soft Suave Technologies — Head Office",
      "streetAddress": "SSPDL Building, Alpha City, Gamma Block, 5th Floor, Navalur",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "603103",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "name": "Soft Suave Technologies — Development Centre",
      "streetAddress": "MFAR Silverline Tech Park, 1st Floor, 180 EPIP Zone, EPIP 2nd Phase, Whitefield",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560066",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "name": "Soft Suave — US Sales Office",
      "streetAddress": "3210 Vogel Rd",
      "addressLocality": "Ellicott City",
      "addressRegion": "MD",
      "postalCode": "21043",
      "addressCountry": "US"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-410-220-6301",
      "contactType": "sales",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+44-7403-646450",
      "contactType": "sales",
      "areaServed": "GB",
      "availableLanguage": "English"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-99527-32708",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": [
        "English",
        "Tamil",
        "Hindi"
      ]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-8015159981",
      "contactType": "human resources",
      "areaServed": "IN",
      "availableLanguage": [
        "English",
        "Tamil",
        "Hindi"
      ]
    }
  ],
  "sameAs": [
    "https://in.linkedin.com/company/softsuave",
    "https://www.instagram.com/softsuavetech/",
    "https://www.youtube.com/@softsuave",
    "https://clutch.co/profile/soft-suave-technologies",
    "https://www.goodfirms.co/company/soft-suave"
  ],
  "knowsAbout": [
    "Software Development",
    "Artificial Intelligence Development",
    "Mobile App Development",
    "Web Application Development",
    "Cloud Computing",
    "DevOps",
    "Legacy Modernization",
    "Product Engineering",
    "IT Staff Augmentation",
    "Offshore Software Development",
    "Global Capability Centers"
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "certification",
    "name": "ISO/IEC 27001:2022 Information Security Management"
  },
  "parentOrganization": {
    "@type": "Organization",
    "@id": "https://www.kiwitech.com/#organization",
    "name": "KiwiTech, LLC",
    "url": "https://www.kiwitech.com/",
    "description": "KiwiTech is a US-based technology and innovation company supporting early and growth-stage startups. KiwiTech acquired a majority stake in Soft Suave Technologies in November 2025.",
    "foundingDate": "2009",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3030 K Street NW, Suite 102",
      "addressLocality": "Washington",
      "addressRegion": "DC",
      "postalCode": "20007",
      "addressCountry": "US"
    }
  }
} as const;

/**
 * Per-page markup, keyed by page. `path` is the canonical route the schema
 * describes — kept beside the nodes so a page can assert its own route matches
 * the one its structured data claims.
 */
export const aiPageSchemas = {
  customAi: {
    path: "/custom-ai-development-services",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/custom-ai-development-services#service",
        "name": "Custom AI Development Services",
        "serviceType": "Custom AI Development and AI Solution Engineering",
        "description": "Custom AI development services covering strategy, proof of concept, product engineering, model integration, data pipeline development, secure deployment, and ongoing optimization. Solutions include Generative AI, Agentic AI, RAG and Document AI, Computer Vision, and Predictive Intelligence.",
        "url": "https://www.softsuave.com/custom-ai-development-services",
        "image": "https://www.softsuave.com/images/landing/custom-ai/custom-ai-development-hero-v5.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Businesses, founders, product leaders, CTOs, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/custom-ai-development-services#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Custom AI Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "@id": "https://www.softsuave.com/generative-ai-development-company#service",
                        "url": "https://www.softsuave.com/generative-ai-development-company",
                        "name": "Generative AI Development",
                        "description": "Custom Generative AI solutions using large language models for content generation, code generation, image creation, copilots, workflow automation, and enterprise applications."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "@id": "https://www.softsuave.com/agentic-ai-development-services#service",
                        "url": "https://www.softsuave.com/agentic-ai-development-services",
                        "name": "Agentic AI Development Services",
                        "description": "Agentic AI solutions that plan, reason, use tools, and coordinate autonomous multi-step workflows across business applications with human oversight."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "@id": "https://www.softsuave.com/rag-development-services#service",
                        "url": "https://www.softsuave.com/rag-development-services",
                        "name": "RAG and Document AI Solutions",
                        "description": "RAG and Document AI solutions for enterprise knowledge retrieval, trusted answers, document extraction, information processing, and document workflow automation."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "@id": "https://www.softsuave.com/computer-vision-development-services#service",
                        "url": "https://www.softsuave.com/computer-vision-development-services",
                        "name": "Computer Vision Development Services",
                        "description": "Computer Vision solutions for object detection, optical character recognition, video analysis, visual inspection, anomaly detection, and operational monitoring."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "@id": "https://www.softsuave.com/predictive-intelligence-services#service",
                        "url": "https://www.softsuave.com/predictive-intelligence-services",
                        "name": "Predictive Intelligence Services and Solutions",
                        "description": "Predictive Intelligence solutions for forecasting, anomaly detection, recommendations, risk identification, operational planning, and data-driven decision support."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/custom-ai-development-services#webpage",
        "url": "https://www.softsuave.com/custom-ai-development-services",
        "name": "Custom AI Development Services & Solutions | Soft Suave",
        "description": "Custom AI development services from strategy to production. Build GenAI, agentic AI, RAG, and computer vision solutions around your data and workflows.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/custom-ai-development-services#primaryimage",
            "url": "https://www.softsuave.com/images/landing/custom-ai/custom-ai-development-hero-v5.webp",
            "contentUrl": "https://www.softsuave.com/images/landing/custom-ai/custom-ai-development-hero-v5.webp",
            "caption": "Custom AI Development Services by Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/custom-ai-development-services#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/custom-ai-development-services#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/custom-ai-development-services#faq",
        "url": "https://www.softsuave.com/custom-ai-development-services",
        "name": "FAQs About Custom AI Development Services",
        "isPartOf": {
            "@id": "https://www.softsuave.com/custom-ai-development-services#webpage"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Why work with a custom AI development company in India?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "India gives you access to a deep AI engineering talent pool at 40–60% below equivalent US or EU rates, which is why a large share of global AI delivery runs from here. We work from development centres in Chennai and Bangalore with a US office, maintain a 4–6 hour overlap with US and EU teams, and have delivered software for global clients for over 13 years. Engagement terms, security controls, and delivery milestones are agreed in writing before work starts."
                }
            },
            {
                "@type": "Question",
                "name": "How much does it cost to build an AI solution with a team in India?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI development in India typically costs 40–60% less than equivalent US or EU rates, which is the main reason global teams build here. Beyond location, four factors move the price: project complexity, model selection, the state of your data, and the engagement model you choose. Because those vary sharply between projects, we give you a realistic figure rather than a range that fits nobody. Get a rough quote in 24 hours."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to develop a production-ready AI solution?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It depends on your data and integration needs, so we structure it in stages rather than guessing upfront. Discovery maps the use case and validates your data. A POC then proves one high-value case against defined KPIs. Only after that do we commit to a full build timeline, because by then we know what the data can actually support. Timelines stretch most when data needs cleaning or labeling, or when compliance review is involved. Talk to our experts for an estimate against your specific use case."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between traditional ML and Generative AI for my use case?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Traditional ML learns patterns from your structured, historical data to predict or classify: forecasting demand, scoring credit risk, flagging fraud, and recommending products. Generative AI creates new output from natural language input, which suits drafting content, answering questions over your documents, and powering copilots and conversational interfaces. If you are asking what will happen or which category something belongs to, you want ML. If you are asking the system to create or explain something, you are looking for Generative AI. Many production systems use both."
                }
            },
            {
                "@type": "Question",
                "name": "Which LLMs and AI models do you work with?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use the most suitable AI model for each problem instead of sticking to a single provider. Our work covers OpenAI, Claude, Llama, and Gemini, orchestrated with LangChain and vector databases such as Pinecone and Weaviate. For traditional ML, we build with TensorFlow, PyTorch, Keras, Scikit-learn, XGBoost, and LightGBM. NLP work uses spaCy and Hugging Face, while computer vision work uses OpenCV and MediaPipe."
                }
            },
            {
                "@type": "Question",
                "name": "How do you prevent hallucinations in Generative AI applications?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hallucinations are controlled by grounding the model in your own data rather than relying only on its training. We use retrieval-augmented generation with vector databases so responses are drawn from your documents, add source attribution so answers can be traced, and constrain the model's scope to defined domains. Where accuracy is critical, we design human-in-the-loop review into the workflow instead of allowing the model to act unchecked."
                }
            },
            {
                "@type": "Question",
                "name": "How do you handle data security, privacy, and compliance in AI projects?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Security is designed in, not added later. We work under NDAs, apply encryption, VPC isolation, role-based access control, and PII masking, and offer private cloud deployment where your data cannot leave your environment. Full auditability is built in so you can evidence how data was accessed and used. We scope compliance requirements during discovery, before any data moves."
                }
            },
            {
                "@type": "Question",
                "name": "Can you work with our existing data warehouse, cloud, or analytics stack?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We integrate with AWS, Azure, GCP, Snowflake, and BigQuery, and deploy using Docker, Kubernetes, and CI/CD pipelines alongside MLOps platforms such as MLflow, Vertex AI, and Kubeflow. The goal is to enhance the stack you already run, not replace it."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need a lot of labeled data to start with AI development?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Pre-trained models, transfer learning, synthetic data, and semi-supervised approaches can reduce how much labeled data you need. Retrieval-based Generative AI applications often need no labeled training data because they work directly with your existing documents. We assess what your data can support during discovery so you know before committing to a build."
                }
            },
            {
                "@type": "Question",
                "name": "Can we start with a small AI POC before committing to a bigger project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, and we recommend it. A POC targets one high-value use case with success criteria agreed in writing before work starts, including accuracy, performance, and adoption benchmarks defined with you. You receive a working prototype and a clear answer on feasibility before making a full-scale investment. Proven POCs can then move into production."
                }
            },
            {
                "@type": "Question",
                "name": "What happens if the AI model doesn't meet accuracy or performance expectations?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This is what the POC stage is designed to identify. Success criteria are established before development begins, creating an agreed definition of working. If a model falls short, we retrain it with adjusted features, test alternative approaches, and improve the training data. Addressing this during the POC stage settles feasibility before committing to a full build."
                }
            },
            {
                "@type": "Question",
                "name": "What happens after launch - do you support and maintain the AI solution?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. AI models can degrade as real-world data shifts, so ongoing operation is treated as part of the solution. We support automated deployments, retraining cycles, drift monitoring, and cost optimization to keep models accurate and efficient over time. Support terms are agreed as part of your engagement model."
                }
            }
        ]
    },
  },

  generativeAi: {
    path: "/generative-ai-development-company",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/generative-ai-development-company#service",
        "name": "Generative AI Development Services",
        "alternateName": "Generative AI Development",
        "serviceType": "Custom Generative AI Application Development and Integration",
        "description": "Generative AI development services covering use-case discovery, proof-of-concept development, custom applications, model integration, security, evaluation, LLMOps, product modernization, and ongoing optimization. Soft Suave builds production-ready RAG systems, AI agents, copilots, assistants, and LLM applications around business data and workflows.",
        "url": "https://www.softsuave.com/generative-ai-development-company",
        "image": "https://www.softsuave.com/assets/images/generative-ai-development-company-og.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Businesses, founders, product leaders, CTOs, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/generative-ai-development-company#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Generative AI Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Generative AI Consulting and Use-Case Discovery",
                        "description": "Feasibility assessment, data-readiness review, and use-case recommendations focused on identifying the simplest suitable Generative AI approach."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Generative AI Proof of Concept Development",
                        "description": "Working Generative AI proofs of concept built and evaluated against real business data before proceeding with full-scale development."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Generative AI Application Development",
                        "description": "Production-ready copilots, assistants, and internal tools with complete frontend, backend, model, data, and system integrations."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Generative AI Integration Services",
                        "description": "Integration of Generative AI capabilities with CRM, ERP, ticketing systems, identity providers, internal APIs, and existing permission models."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Model Selection and Customisation",
                        "description": "Selection, testing, and fine-tuning of suitable models from OpenAI, Anthropic, Google, Meta, and Mistral based on accuracy, speed, and cost requirements."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Generative AI Security and Governance",
                        "description": "Generative AI security controls, guardrails, audit logging, access management, human oversight, and governance for production environments."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Evaluation, Testing and LLMOps",
                        "description": "Evaluation datasets, regression testing, prompt versioning, cost tracking, production monitoring, and model-drift detection."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Dedicated Generative AI Development Teams",
                        "description": "Dedicated Generative AI developers who work within existing client sprints, tools, processes, and working-hour requirements."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Generative AI Product Modernisation",
                        "description": "Integration of Generative AI assistants, enterprise search, and intelligent automation into existing software products and architectures."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Generative AI Support and Optimisation",
                        "description": "Ongoing quality monitoring, prompt optimization, model upgrades, token-cost management, and production support after launch."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/generative-ai-development-company#webpage",
        "url": "https://www.softsuave.com/generative-ai-development-company",
        "name": "Generative AI Development Company | Soft Suave",
        "description": "Choose Soft Suave, a generative AI development company with 13+ years of experience and 400+ AI experts, for secure, production-ready solutions.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/generative-ai-development-company#primaryimage",
            "url": "https://www.softsuave.com/assets/images/generative-ai-development-company-og.webp",
            "contentUrl": "https://www.softsuave.com/assets/images/generative-ai-development-company-og.webp",
            "caption": "Generative AI Development Company - Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/generative-ai-development-company#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/generative-ai-development-company#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/generative-ai-development-company#faq",
        "url": "https://www.softsuave.com/generative-ai-development-company",
        "name": "FAQs About Generative AI Development Services",
        "isPartOf": {
            "@id": "https://www.softsuave.com/generative-ai-development-company#webpage"
        },
        "about": {
            "@id": "https://www.softsuave.com/generative-ai-development-company#service"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What does a generative AI development company actually do?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A generative AI development company designs, builds, and deploys applications powered by generative models. Soft Suave covers use-case scoping, architecture, integration, evaluation, and production support: the complete engineering work, not strategy decks alone."
                }
            },
            {
                "@type": "Question",
                "name": "How much do generative AI development services cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generative AI development costs depend on the use case, project scope, data readiness, model requirements, integrations, security, evaluation, infrastructure, and ongoing support. Soft Suave typically delivers services at 40 to 60% lower costs than comparable US and EU development teams. A detailed estimate is provided after discovery based on the project's technical and delivery requirements."
                }
            },
            {
                "@type": "Question",
                "name": "How long does a generative AI project take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The timeline depends on whether the project involves a proof of concept or a production-ready solution. Data preparation, model selection, application development, system integrations, security testing, evaluation, and deployment all affect the schedule. Soft Suave confirms a realistic timeline after discovery, once the technical requirements and data readiness are understood."
                }
            },
            {
                "@type": "Question",
                "name": "Should we use RAG, fine-tuning, or an AI agent?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use RAG when answers must come from your data, fine-tuning when behavior must be fixed, and agents when a task has multiple steps. Soft Suave starts with the simplest option that meets the requirement."
                }
            },
            {
                "@type": "Question",
                "name": "What are custom Generative AI development services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Custom Generative AI development services build a system around your data, workflows, and rules rather than configuring an off-the-shelf tool. Soft Suave delivers custom builds where a packaged product cannot meet the requirement."
                }
            },
            {
                "@type": "Question",
                "name": "What generative AI solutions work best for enterprises?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generative AI delivers the best results when a specific use case has clear ownership and measurable goals. Soft Suave recommends starting with a focused solution, such as a knowledge assistant, document processing system, or support copilot, before expanding into a broader platform."
                }
            },
            {
                "@type": "Question",
                "name": "What happens to our data during generative AI development?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Soft Suave works under NDA, deploys into your own cloud account, and configures model access with your provider keys and terms. Your data stays inside your perimeter and is not used to train models."
                }
            },
            {
                "@type": "Question",
                "name": "What if the generative AI system underperforms?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Soft Suave defines clear evaluation criteria before development, helping identify performance gaps during testing and refine the model, data, or technical approach to achieve the required outcomes."
                }
            }
        ]
    },
  },

  agenticAi: {
    path: "/agentic-ai-development-services",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/agentic-ai-development-services#service",
        "name": "Agentic AI Development Services",
        "alternateName": "Agentic AI Development",
        "serviceType": "Custom Agentic AI System Development and Integration",
        "description": "Agentic AI development services covering readiness assessment, agent architecture, custom AI agent development, multi-agent orchestration, RAG integration, enterprise system integration, memory management, evaluation, guardrails, deployment, observability, and ongoing optimization.",
        "url": "https://www.softsuave.com/agentic-ai-development-services",
        "image": "https://www.softsuave.com/assets/images/agentic-ai-development-services-og.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Operations leaders, engineering leaders, data leaders, CTOs, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/agentic-ai-development-services#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Agentic AI Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Agentic AI Strategy and Readiness Assessment",
                        "description": "Assessment of workflows, data availability, system access, autonomy boundaries, operational risks, and measurable success criteria before agent development begins."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom AI Agent Design and Development",
                        "description": "Custom AI agents designed around defined goals, approved tools, input data, output formats, permissions, and stopping conditions."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Multi-Agent Architecture and Orchestration",
                        "description": "Multi-agent systems with specialized responsibilities, task sequencing, orchestration, conflict resolution, and controlled handoffs between agents."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "RAG and Enterprise Knowledge Integration",
                        "description": "Retrieval-augmented generation that grounds agents in enterprise documents, records, and knowledge bases with permission-aware data access."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tool, API, and Enterprise System Integration",
                        "description": "Agentic AI integration with APIs, CRM, ERP, ticketing platforms, databases, and internal business applications."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Agent Memory and Context Management",
                        "description": "Short-term context, persistent memory, and retrieval strategies for maintaining relevant information across long-running agentic workflows."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Agent Evaluation, Testing, and Guardrails",
                        "description": "Agent testing for accuracy, tool-use correctness, failure handling, unsafe actions, escalation behavior, and compliance with defined operating boundaries."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Deployment, Observability, and Optimization",
                        "description": "Production deployment, agent-run tracing, failure monitoring, cost tracking, latency analysis, and continuous improvement of prompts, routing, and policies."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/agentic-ai-development-services#webpage",
        "url": "https://www.softsuave.com/agentic-ai-development-services",
        "name": "Agentic AI Development Services | Soft Suave",
        "description": "Transform complex workflows with our agentic AI development services backed by 13+ years of expertise and 400+ AI & engineering specialists.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/agentic-ai-development-services#primaryimage",
            "url": "https://www.softsuave.com/assets/images/agentic-ai-development-services-og.webp",
            "contentUrl": "https://www.softsuave.com/assets/images/agentic-ai-development-services-og.webp",
            "caption": "Agentic AI Development Services by Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/agentic-ai-development-services#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/agentic-ai-development-services#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/agentic-ai-development-services#faq",
        "url": "https://www.softsuave.com/agentic-ai-development-services",
        "name": "Agentic AI Development FAQs",
        "isPartOf": {
            "@id": "https://www.softsuave.com/agentic-ai-development-services#webpage"
        },
        "about": {
            "@id": "https://www.softsuave.com/agentic-ai-development-services#service"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are agentic AI development services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Agentic AI development services help businesses build systems that can plan, make decisions, use tools, and complete multi-step workflows with controlled human oversight. The process covers architecture, agent logic, data grounding, enterprise integration, evaluation, governance, deployment, and ongoing support."
                }
            },
            {
                "@type": "Question",
                "name": "How is agentic AI different from generative AI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generative AI primarily creates or transforms content, while agentic AI coordinates steps, uses approved tools, and performs permitted actions toward a defined goal. A generative system answers a prompt; an agentic system plans a sequence, calls tools, updates records inside your applications, and then decides when the task is finished."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between agentic AI and AI agents?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "An AI agent performs specific tasks, while agentic AI manages the complete system. One agent performs a single defined task, whereas an agentic system adds planning, memory, orchestration, tool permissions, and human checkpoints across one or more agents."
                }
            },
            {
                "@type": "Question",
                "name": "How is agentic AI different from workflow automation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Workflow automation follows fixed rules, while an agentic system decides its next step within defined goals, permissions, and operational boundaries. Automation is the better choice when a process never changes. Agentic AI is well suited to workflows with variable inputs, frequent exceptions, and decisions requiring contextual understanding."
                }
            },
            {
                "@type": "Question",
                "name": "How do you keep agentic AI systems secure and controlled?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Control comes from restricting what an agent is able to reach and do. Scoped tool permissions, role-based data access, human approval checkpoints, execution limits, and full run logging are designed into the architecture rather than added after deployment."
                }
            },
            {
                "@type": "Question",
                "name": "What affects the cost of agentic AI development?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cost is driven by integration count, workflow complexity, the autonomy level required, and how ready your data is. A bounded single-agent build differs substantially from a governed multi-agent system. Project pricing is confirmed after your requirements and scope are reviewed."
                }
            },
            {
                "@type": "Question",
                "name": "How long does an agentic AI project take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Timelines depend on the project scope, complexity, integrations, and resource requirements, and a realistic schedule is confirmed after the discovery discussion. In practice, system access, data permissions, and named approval owners usually determine how quickly a build can move."
                }
            },
            {
                "@type": "Question",
                "name": "What happens if the agents underperform in production?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Agents are evaluated against defined task sets and performance measures, making underperformance measurable and traceable. Run data helps identify failures so prompts, routing, permissions, or escalation rules can be adjusted and re-evaluated."
                }
            },
            {
                "@type": "Question",
                "name": "What happens to our data during an agentic AI project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data handling terms are agreed within your contract before any work begins. Retrieval and system access are designed to follow the role permissions you already operate under. Access controls can be configured to prevent agents from retrieving records beyond the requesting user's authorized permissions."
                }
            }
        ]
    },
  },

  ragDocumentAi: {
    path: "/rag-development-services",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/rag-development-services#service",
        "name": "RAG Development Services and Document AI Solutions",
        "serviceType": "Retrieval-Augmented Generation and Document AI Development",
        "description": "RAG development services and Document AI solutions covering custom RAG systems, enterprise knowledge retrieval, application integration, document extraction, summarization, retrieval evaluation, optimization, and permission-aware knowledge access.",
        "url": "https://www.softsuave.com/rag-development-services",
        "image": "https://www.softsuave.com/assets/images/rag-development-services-og.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Businesses, knowledge management teams, operations leaders, product leaders, CTOs, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/rag-development-services#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "RAG Development Services and Document AI Solutions",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom RAG Development",
                        "description": "Custom RAG systems designed around enterprise knowledge sources, application requirements, user queries, metadata, and retrieval needs."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Enterprise Knowledge Retrieval",
                        "description": "Enterprise retrieval systems configured around approved sources, document types, query patterns, metadata, chunking strategies, and ranking approaches."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "RAG Application Integration",
                        "description": "Integration of retrieval capabilities into AI assistants, enterprise search, internal applications, and customer support workflows."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Document AI and Data Extraction",
                        "description": "Document AI solutions that extract information, preserve document structure, and prepare complex business files for retrieval and downstream AI workflows."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Document Retrieval and Summarization",
                        "description": "Retrieval and AI-assisted summarization solutions that help users identify and review relevant information across large document collections."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "RAG Evaluation and Optimization",
                        "description": "Evaluation of retrieval relevance, source quality, answer grounding, failure cases, and knowledge-base changes using representative business queries."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Permission-Aware Knowledge Access",
                        "description": "Retrieval architectures aligned with enterprise identities, document permissions, user roles, and confidential information access requirements."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/rag-development-services#webpage",
        "url": "https://www.softsuave.com/rag-development-services",
        "name": "RAG Development Services & Document AI Solutions | Soft Suave",
        "description": "RAG development services and Document AI solutions for enterprise knowledge retrieval, document processing, and search. Discuss your RAG project with Soft Suave.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/rag-development-services#primaryimage",
            "url": "https://www.softsuave.com/assets/images/rag-development-services-og.webp",
            "contentUrl": "https://www.softsuave.com/assets/images/rag-development-services-og.webp",
            "caption": "RAG Development Services and Document AI Solutions by Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/rag-development-services#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/rag-development-services#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/rag-development-services#faq",
        "url": "https://www.softsuave.com/rag-development-services",
        "name": "Frequently Asked Questions About RAG and Document AI",
        "isPartOf": {
            "@id": "https://www.softsuave.com/rag-development-services#webpage"
        },
        "about": {
            "@id": "https://www.softsuave.com/rag-development-services#service"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What do we need before starting a RAG project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Start with the knowledge sources the system needs to use, the questions users are expected to ask, and who should have access to each source. Data quality, document structure, integrations, permissions, and expected outputs should be reviewed before the retrieval architecture is finalized."
                }
            },
            {
                "@type": "Question",
                "name": "How much does a RAG implementation cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "RAG implementation costs vary based on the number and condition of your data sources, document complexity, integrations, access requirements, evaluation needs, and deployment scope. Reviewing these requirements with our experts first helps define a realistic project scope and cost range."
                }
            },
            {
                "@type": "Question",
                "name": "How long does a production RAG system take to build?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The timeline depends on data readiness, source complexity, integrations, access controls, evaluation requirements, and the level of production setup involved. Starting with our expert assessment helps identify potential delays early and establish a more realistic delivery plan."
                }
            },
            {
                "@type": "Question",
                "name": "Does RAG eliminate hallucinations?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. RAG can reduce unsupported responses by grounding the model in retrieved information, but it does not eliminate hallucinations completely. Retrieval quality, source quality, model behavior, prompting, and evaluation still influence whether the final response is accurate, relevant, and supported by available evidence."
                }
            },
            {
                "@type": "Question",
                "name": "Can RAG work with scanned PDFs and complex document formats?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, when the document content can first be converted into usable information for retrieval. Document AI can help extract and organize content from complex files before it is indexed, allowing the RAG pipeline to search and retrieve information more effectively."
                }
            },
            {
                "@type": "Question",
                "name": "How do you measure whether a RAG system is working?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evaluate retrieval and generation separately. Check whether the system finds relevant source material, whether that evidence supports the answer, whether the response addresses the question, and which queries consistently produce weak, missing, or conflicting results."
                }
            },
            {
                "@type": "Question",
                "name": "How do you protect confidential documents in RAG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Confidential information should be filtered according to each user's permitted access before retrieved content reaches the model. The access design depends on existing identity systems, repositories, document permissions, and security requirements already used within the organization."
                }
            }
        ]
    },
  },

  computerVision: {
    path: "/computer-vision-development-services",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/computer-vision-development-services#service",
        "name": "Computer Vision Development Services",
        "serviceType": "Custom Computer Vision Software Development and Integration",
        "description": "Custom computer vision development services covering use-case assessment, visual data preparation, model development, object and vehicle detection, OCR, video analytics, visual inspection, validation, optimization, system integration, and deployment support.",
        "url": "https://www.softsuave.com/computer-vision-development-services",
        "image": "https://www.softsuave.com/assets/images/computer-vision-development-services-og.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Businesses, operations leaders, product leaders, engineering teams, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/computer-vision-development-services#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Computer Vision Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Computer Vision Consulting and Use-Case Assessment",
                        "description": "Assessment of visual inputs, operating conditions, feasibility, validation requirements, intended actions, and suitable Computer Vision workflows."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Computer Vision Data Preparation",
                        "description": "Organization and preparation of visual data for model development, representative testing, validation, and expected real-world operating conditions."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Computer Vision Model Development and Training",
                        "description": "Custom detection and classification models developed around specific visual inputs, business requirements, and operational conditions."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Object and Vehicle Detection",
                        "description": "Detection and classification of defined objects and vehicles across images, video, and live camera feeds for operational workflows."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Optical Character Recognition",
                        "description": "OCR solutions that extract and validate information from visual documents before sending usable data to downstream applications."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Video Analytics",
                        "description": "Computer Vision video analytics that identify defined events in continuous visual feeds and provide outputs for alerts, dashboards, and review."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Visual Inspection",
                        "description": "Visual inspection workflows that assess images or video against defined criteria and route results into quality-control or human-review processes."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Validation and Acceptance Testing",
                        "description": "Representative testing of Computer Vision workflows against defined acceptance criteria, visual inputs, and intended operating conditions."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Computer Vision Model Optimization",
                        "description": "Optimization and retesting of Computer Vision workflows against relevant visual conditions, performance requirements, and operational acceptance criteria."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "System Integration and Deployment Support",
                        "description": "Integration of validated Computer Vision outputs with applications, dashboards, alerts, audit records, and operational review workflows."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/computer-vision-development-services#webpage",
        "url": "https://www.softsuave.com/computer-vision-development-services",
        "name": "Computer Vision Development Services | Soft Suave",
        "description": "Custom computer vision development services that transform camera feeds, images, and documents into validated outputs for real-world operations.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/computer-vision-development-services#primaryimage",
            "url": "https://www.softsuave.com/assets/images/computer-vision-development-services-og.webp",
            "contentUrl": "https://www.softsuave.com/assets/images/computer-vision-development-services-og.webp",
            "caption": "Computer Vision Development Services by Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/computer-vision-development-services#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/computer-vision-development-services#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/computer-vision-development-services#faq",
        "url": "https://www.softsuave.com/computer-vision-development-services",
        "name": "Common Questions About Computer Vision Development",
        "isPartOf": {
            "@id": "https://www.softsuave.com/computer-vision-development-services#webpage"
        },
        "about": {
            "@id": "https://www.softsuave.com/computer-vision-development-services#service"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is Computer Vision appropriate for my problem?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Computer Vision is appropriate when a workflow depends on interpreting repeatable visual inputs and the required result or action can be clearly defined and validated. Feasibility also depends on input quality and operating conditions."
                }
            },
            {
                "@type": "Question",
                "name": "What data is required for a Computer Vision project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The required data depends on the visual task and should represent the conditions in which the system will operate. This may include images, video, camera feeds, or visual documents with relevant real-world variations."
                }
            },
            {
                "@type": "Question",
                "name": "How accurate can a Computer Vision system be?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Achievable performance depends on the use case, input quality, operating conditions, and the validation criteria defined for the project. Representative testing is required because a universal accuracy figure cannot reflect every visual source, environment, and acceptance requirement."
                }
            },
            {
                "@type": "Question",
                "name": "What affects Computer Vision development cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Computer Vision development cost depends on the visual problem, available inputs, processing requirements, integration scope, and deployment complexity. Project pricing is confirmed after requirements and scope are reviewed for each engagement."
                }
            },
            {
                "@type": "Question",
                "name": "How does Computer Vision deployment work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Computer Vision deployment depends on where visual inputs originate, how quickly results are required, and which systems must receive the output. The approach is defined around processing needs, interface availability, operating conditions, and the required downstream action."
                }
            },
            {
                "@type": "Question",
                "name": "Can Computer Vision integrate with our existing cameras and systems?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Integration can be assessed when the available camera feeds and system interfaces can support the required Computer Vision workflow. Compatibility remains use-case specific; Soft Suave has case-specific edge-camera integration experience from a transportation implementation."
                }
            },
            {
                "@type": "Question",
                "name": "What are the limitations of Computer Vision?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Computer Vision performance can be affected by the quality and consistency of visual inputs and by changing real-world operating conditions. Viewpoint, lighting, visibility, obstruction, environmental variation, and unclear validation criteria may limit what the workflow can interpret reliably."
                }
            }
        ]
    },
  },

  predictiveIntelligence: {
    path: "/predictive-intelligence-services",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/predictive-intelligence-services#service",
        "name": "Predictive Intelligence Services and Solutions",
        "serviceType": "Predictive Intelligence and Machine Learning Development",
        "description": "Predictive intelligence services covering AI forecasting, predictive modeling, anomaly detection, recommendation systems, workflow integration, model deployment, monitoring, and continuous improvement. These solutions turn business data into forecasts, risk signals, recommendations, alerts, and operational actions.",
        "url": "https://www.softsuave.com/predictive-intelligence-services",
        "image": "https://www.softsuave.com/assets/images/predictive-intelligence-services-og.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Product, operations, finance, customer, data, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/predictive-intelligence-services#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Predictive Intelligence Services and Solutions",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Forecasting Services",
                        "description": "Time-series forecasting solutions that anticipate future metrics, events, and operational conditions for capacity planning, scenario evaluation, and business decisions."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Predictive Modeling Services",
                        "description": "Validated classification, regression, and ranking models that estimate risk, customer behavior, likelihood, priority, and expected business outcomes."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Anomaly Detection Services",
                        "description": "Anomaly detection systems that identify unusual transactions, behaviors, and operational signals while reducing unnecessary false-positive alerts."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Recommendation System Development",
                        "description": "Recommendation systems that prioritize relevant content, products, features, offers, and workflow actions using contextual models, business rules, and feedback."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/predictive-intelligence-services#webpage",
        "url": "https://www.softsuave.com/predictive-intelligence-services",
        "name": "Predictive Intelligence Services & Solutions | Soft Suave",
        "description": "Soft Suave offers predictive intelligence services, including forecasting, anomaly detection, and recommendation systems that turn predictions into action.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/predictive-intelligence-services#primaryimage",
            "url": "https://www.softsuave.com/assets/images/predictive-intelligence-services-og.webp",
            "contentUrl": "https://www.softsuave.com/assets/images/predictive-intelligence-services-og.webp",
            "caption": "Predictive Intelligence Services and Solutions by Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/predictive-intelligence-services#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/predictive-intelligence-services#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/predictive-intelligence-services#faq",
        "url": "https://www.softsuave.com/predictive-intelligence-services",
        "name": "Frequently Asked Questions About Predictive Intelligence",
        "isPartOf": {
            "@id": "https://www.softsuave.com/predictive-intelligence-services#webpage"
        },
        "about": {
            "@id": "https://www.softsuave.com/predictive-intelligence-services#service"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What data is needed for predictive intelligence?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The required data depends on the outcome you want to anticipate. Most useful projects need relevant historical examples, dependable signals available at prediction time, clearly defined outcomes, and sufficient data quality. Data volume alone cannot compensate for missing labels, inconsistent definitions, or irrelevant signals."
                }
            },
            {
                "@type": "Question",
                "name": "Can predictive intelligence work with our existing applications?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, predictive capabilities can be integrated with existing applications when suitable connection points and data access are available. Outputs may be delivered through APIs, embedded features, dashboards, alerts, workflow engines, or review queues rather than requiring users to adopt an entirely separate application."
                }
            },
            {
                "@type": "Question",
                "name": "How do you evaluate predictive model reliability?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Reliability is evaluated against representative validation data and business-relevant metrics. The assessment should compare the model with the current baseline, examine false-positive and false-negative costs, review performance across important segments, and continue after deployment through data, drift, and outcome monitoring."
                }
            },
            {
                "@type": "Question",
                "name": "Does predictive intelligence need real-time data?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not every use case needs real-time data. Immediate fraud or operational alerts may require real-time or near-real-time signals, while planning and prioritization tasks may work effectively with hourly, daily, or scheduled batch predictions. The update frequency should match how quickly the decision changes."
                }
            },
            {
                "@type": "Question",
                "name": "How long does implementation take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Delivery timelines depend on the project scope, complexity, integrations, and resource requirements. Data readiness, validation needs, workflow design, security requirements, and deployment architecture can all affect implementation. A realistic schedule is confirmed after the discovery discussion and review of the proposed use case."
                }
            },
            {
                "@type": "Question",
                "name": "What affects predictive intelligence development cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cost depends on use-case complexity, data preparation, the number and type of models, integration requirements, user interfaces, security needs, deployment design, and ongoing monitoring. Project pricing is confirmed after requirements and scope are reviewed, rather than applying one estimate to every implementation."
                }
            },
            {
                "@type": "Question",
                "name": "When is predictive intelligence not appropriate?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It may not be appropriate when the target outcome is poorly defined, relevant historical data is insufficient, available signals do not support the decision, or the surrounding process cannot act on predictions. A simple rule-based approach may also be preferable when it solves the requirement effectively."
                }
            }
        ]
    },
  },

  dataEngineering: {
    path: "/data-engineering-services",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/data-engineering-services#service",
        "name": "Data Engineering Services and Solutions",
        "serviceType": "Data Pipeline, Integration, and Cloud Data Engineering",
        "description": "Data engineering services covering data pipeline development, structured data foundations, database and system connectivity, cloud data engineering, analytics data preparation, and AI data foundation engineering.",
        "url": "https://www.softsuave.com/data-engineering-services",
        "image": "https://www.softsuave.com/assets/images/data-engineering-services-og.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Businesses, data leaders, analytics teams, product leaders, CTOs, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/data-engineering-services#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Data Engineering Services and Solutions",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Data Pipeline Development Services",
                        "description": "Data pipelines that move information across databases, applications, cloud environments, and internal systems for reporting, analytics, and AI."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Data Foundation Engineering",
                        "description": "Structured data foundations that organize how business information is connected, accessed, and used across different technology environments."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Database and System Connectivity",
                        "description": "Connections between databases, applications, and internal systems that support reliable data movement across dependent platforms and workflows."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Cloud Data Engineering",
                        "description": "Cloud data flows designed around existing databases, applications, storage platforms, infrastructure requirements, and downstream business needs."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Analytics Data Preparation",
                        "description": "Business data preparation and integration for reporting systems, dashboards, analytical environments, and informed decision-making."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Data Foundation Engineering",
                        "description": "Connected data foundations that make relevant business information available to AI applications, model workflows, RAG systems, and intelligent solutions."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/data-engineering-services#webpage",
        "url": "https://www.softsuave.com/data-engineering-services",
        "name": "Data Engineering Services & Solutions | Soft Suave",
        "description": "Build stronger data foundations with Soft Suave's data engineering services for data pipelines, integrated systems, analytics-ready data, and AI solutions.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/data-engineering-services#primaryimage",
            "url": "https://www.softsuave.com/assets/images/data-engineering-services-og.webp",
            "contentUrl": "https://www.softsuave.com/assets/images/data-engineering-services-og.webp",
            "caption": "Data Engineering Services and Solutions by Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/data-engineering-services#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/data-engineering-services#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/data-engineering-services#faq",
        "url": "https://www.softsuave.com/data-engineering-services",
        "name": "Frequently Asked Questions About Data Engineering Services",
        "isPartOf": {
            "@id": "https://www.softsuave.com/data-engineering-services#webpage"
        },
        "about": {
            "@id": "https://www.softsuave.com/data-engineering-services#service"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are data engineering services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data engineering services build and connect the systems required to move and make data available across applications, databases, cloud environments, analytics tools, and AI systems. The exact scope depends on the existing environment and where the data needs to be used."
                }
            },
            {
                "@type": "Question",
                "name": "What does a data engineering company do?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A data engineering company helps design and implement the data flows and supporting systems required to connect data sources with applications and downstream use cases. The work can include data pipelines, database connections, cloud data flows, and connections between internal systems."
                }
            },
            {
                "@type": "Question",
                "name": "What are data pipeline development services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data pipeline development services build the technical flows required to move data between approved source and destination systems. The pipeline requirements depend on the systems involved, how the information needs to move, and where it will be consumed."
                }
            },
            {
                "@type": "Question",
                "name": "Can Data Engineering work with our existing systems?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data engineering can be planned around existing databases, applications, cloud storage, and internal systems without assuming that the full technology environment needs to be replaced. The appropriate approach depends on the current architecture and required outcome."
                }
            },
            {
                "@type": "Question",
                "name": "How does Data Engineering support AI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data engineering supports AI by creating the data foundations and connections needed for AI applications to access relevant business information. A suitable approach is shaped by the type of AI solution being built, the data available, and the expected output."
                }
            },
            {
                "@type": "Question",
                "name": "Which cloud platforms does Soft Suave work with?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Soft Suave's technology experience includes AWS, Microsoft Azure, and Google Cloud. We select technologies based on your existing environment, technical requirements, and the needs of the data engineering solution."
                }
            },
            {
                "@type": "Question",
                "name": "Should Data Engineering be handled in-house or outsourced?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data Engineering can be handled internally or supported through an outsourced engagement depending on available engineering capacity, specialist requirements, project scope, and long-term ownership. The decision should be based on the specific Data Engineering deliverables rather than outsourcing considerations alone."
                }
            },
            {
                "@type": "Question",
                "name": "How much do Data Engineering Services cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data Engineering Services pricing depends on scope, source systems, required connections, engineering complexity, and deployment requirements. Project pricing is confirmed after requirements and scope are reviewed."
                }
            }
        ]
    },
  },

  dataScience: {
    path: "/data-science-services",
    service: {
        "@type": "Service",
        "@id": "https://www.softsuave.com/data-science-services#service",
        "name": "Data Science Services and Consulting",
        "serviceType": "Data Science Consulting, Analysis, and Model Development",
        "description": "Data science services covering consulting, data-readiness assessment, exploratory analysis, statistical experimentation, machine learning model development, model evaluation, validation, and MLOps support for informed business decisions.",
        "url": "https://www.softsuave.com/data-science-services",
        "image": "https://www.softsuave.com/assets/images/data-science-services-og.webp",
        "provider": {
            "@id": "https://www.softsuave.com/#organization"
        },
        "areaServed": "Worldwide",
        "audience": {
            "@type": "BusinessAudience",
            "name": "Businesses, data leaders, product leaders, operations teams, CTOs, and enterprise technology teams"
        },
        "mainEntityOfPage": {
            "@id": "https://www.softsuave.com/data-science-services#webpage"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Data Science Services and Consulting",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Data Science Consulting and Strategy",
                        "description": "Data science consulting that defines business questions, identifies suitable use cases, evaluates data readiness, and plans analysis, experimentation, or model development."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Exploratory Data Analysis",
                        "description": "Exploration of datasets to identify patterns, relationships, anomalies, missing information, distributions, and other characteristics relevant to the business question."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Statistical Analysis and Experimentation",
                        "description": "Statistical analysis and structured experimentation used to test assumptions, evaluate relationships, compare outcomes, and support evidence-based decisions."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Data Science Development Services",
                        "description": "Development of statistical and machine learning models using validated requirements, suitable datasets, and defined evaluation criteria."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Model Evaluation and Validation",
                        "description": "Evaluation and comparison of analytical and machine learning models to understand performance, limitations, trade-offs, and suitability for intended use."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "MLOps and Model Lifecycle Support",
                        "description": "Model deployment, versioning, monitoring, and lifecycle management for validated models operating within approved applications and production environments."
                    }
                }
            ]
        }
    },
    webPage: {
        "@type": "WebPage",
        "@id": "https://www.softsuave.com/data-science-services#webpage",
        "url": "https://www.softsuave.com/data-science-services",
        "name": "Data Science Services & Consulting | Soft Suave",
        "description": "Work with Soft Suave for data science services covering consulting, analysis, model development, experimentation, & validation for better business decisions.",
        "inLanguage": "en",
        "dateModified": "2026-09-15",
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "@id": "https://www.softsuave.com/data-science-services#primaryimage",
            "url": "https://www.softsuave.com/assets/images/data-science-services-og.webp",
            "contentUrl": "https://www.softsuave.com/assets/images/data-science-services-og.webp",
            "caption": "Data Science Services and Consulting by Soft Suave"
        },
        "mainEntity": {
            "@id": "https://www.softsuave.com/data-science-services#service"
        },
        "about": {
            "@id": "https://www.softsuave.com/data-science-services#service"
        },
        "publisher": {
            "@id": "https://www.softsuave.com/#organization"
        }
    },
    faqPage: {
        "@type": "FAQPage",
        "@id": "https://www.softsuave.com/data-science-services#faq",
        "url": "https://www.softsuave.com/data-science-services",
        "name": "Data Science Solutions and Services FAQs",
        "isPartOf": {
            "@id": "https://www.softsuave.com/data-science-services#webpage"
        },
        "about": {
            "@id": "https://www.softsuave.com/data-science-services#service"
        },
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How much do Data Science Services cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Data Science service costs depend on the business problem, available data, analysis required, model complexity, validation needs, integrations, and overall project scope. Project pricing is confirmed after the business requirements, available data, expected outcomes, technical environment, and scope are reviewed."
                }
            },
            {
                "@type": "Question",
                "name": "Can we begin with a Data Science PoC?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. A Data Science PoC can help determine whether a proposed use case is technically and practically viable before a wider project begins. A useful PoC should define the business question, use representative data, establish evaluation criteria, and produce enough evidence to support a clear proceed, revise, or stop decision."
                }
            },
            {
                "@type": "Question",
                "name": "How long does a Data Science project take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The duration of a Data Science project depends on data availability, data quality, the question being investigated, experimentation requirements, model complexity, validation needs, and integration scope. A feasibility assessment or focused analysis will usually require a different level of work from a project that includes model development and application integration."
                }
            },
            {
                "@type": "Question",
                "name": "Can a Data Science project start if our data is fragmented?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, but fragmented data should be assessed before deeper analysis or model development begins. The initial Data Science work can identify whether the available information is usable, which limitations affect the intended question, and whether additional preparation or data-foundation work is required before meaningful experimentation or modeling can continue."
                }
            },
            {
                "@type": "Question",
                "name": "What happens after a Data Science model is validated?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "After validation, the next step depends on how the model will be used. A validated model may support internal analysis, be prepared for an application or API workflow, require additional testing with broader data, or become part of a wider AI implementation based on the project's agreed business and technical requirements."
                }
            },
            {
                "@type": "Question",
                "name": "What data is needed before starting a Data Science project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A Data Science project needs data that is relevant to the business question and sufficiently representative of the situation being studied. The data does not need to be perfect at the start, but its availability, structure, completeness, consistency, and limitations should be assessed before selecting an analytical or modeling approach."
                }
            },
            {
                "@type": "Question",
                "name": "What are the benefits of hiring a Data Science consultant versus building an in-house team?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hiring a data science consultant can be useful when a business needs specialized analysis, independent feasibility assessment, or additional capability without first building a permanent internal team. An in-house team may be more suitable when Data Science is a continuous core function requiring long-term ownership, repeated experimentation, and ongoing domain knowledge."
                }
            }
        ]
    },
  },
} as const;

export type AiPageKey = keyof typeof aiPageSchemas;

/**
 * The full JSON-LD array for one page: the shared Organization, then that
 * page's Service, WebPage and FAQPage.
 *
 * `@context` is stated once per node by `JsonLd` consumers — the stored nodes
 * have it stripped, so it is re-attached here and nowhere else.
 */
export function aiPageJsonLd(key: AiPageKey): object[] {
  const page = aiPageSchemas[key];
  const ctx = { '@context': 'https://schema.org' };
  /*
   * The Organization is NOT returned here any more.
   *
   * `softSuaveOrganizationLd` below carries the same `@id` as
   * `lib/seo/organization.ts` — the two are transcriptions of one approved
   * block — and `app/(marketing)/layout.tsx` now emits that node once for every
   * page on this surface. Returning it here as well put two nodes sharing one
   * identifier into the same document, which is a collision rather than a
   * duplicate: a consumer merging the graph by `@id` has to reconcile them.
   *
   * The `provider`/`publisher` references below are untouched and still resolve
   * — to the layout's copy.
   */
  return [
    { ...ctx, ...page.service },
    { ...ctx, ...page.webPage },
    { ...ctx, ...page.faqPage },
  ];
}
