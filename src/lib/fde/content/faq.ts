export type FaqItem = {
  question: string;
  answer: string;
};

export const faqContent = {
  badge: "Frequently Asked Questions",
  headline: "Everything You Need to Know About Forward Deployed Engineers",
  description:
    "Understand what Forward Deployed Engineers do, when to use the model, and how an FDE engagement differs from conventional development or consulting.",
};

export const faqItems: FaqItem[] = [
  {
    question: "What is a Forward Deployed Engineer?",
    answer: "A Forward Deployed Engineer is a software engineer who works closely with business and technical teams to understand complex problems and take practical solutions from definition through production implementation."
  },
  {
    question: "What does a Forward Deployed Engineer do?",
    answer: "A Forward Deployed Engineer handles workflow discovery, solution design, development, integration, deployment, and ongoing improvement while staying closely involved with the business problem throughout delivery."
  },
  {
    question: "When should I hire a Forward Deployed Engineer?",
    answer: "Hire a Forward Deployed Engineer when requirements are complex, involve multiple teams or systems, or need to evolve during implementation. FDEs are especially useful when closer technical ownership is required."
  },
  {
    question: "How is a Forward Deployed Engineer different from a software developer?",
    answer: "A software developer generally focuses on assigned engineering requirements. A Forward Deployed Engineer works more broadly across the problem, including workflow discovery, technical scoping, solution design, implementation, integration, and production delivery."
  },
  {
    question: "What is the difference between an FDE and staff augmentation?",
    answer: "Staff augmentation primarily adds development capacity to an existing team and roadmap. Forward Deployed Engineering starts with a business or technical problem and gives the engineer broader responsibility for understanding, designing, implementing, and integrating the resulting solution."
  },
  {
    question: "What is the difference between an FDE and a consultant?",
    answer: "Consultants commonly analyze problems and recommend strategies or solutions. A Forward Deployed Engineer is directly involved in engineering the solution, integrating it with existing systems, moving it into production, and improving it after implementation."
  },
  {
    question: "What can Soft Suave's Forward Deployed Engineers build?",
    answer: "Soft Suave's Forward Deployed Engineers can build and integrate AI-enabled applications, automation, intelligent workflows, and connected software solutions around specific business requirements."
  },
  {
    question: "How does a Soft Suave FDE engagement work?",
    answer: "Soft Suave follows a structured Forward Deployed Engineering lifecycle: discover the workflow, design the solution, build the required technology, integrate and deploy it, and continue optimizing the implementation based on real business requirements."
  }
];
