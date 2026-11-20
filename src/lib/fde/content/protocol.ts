export type ProtocolStep = {
  /** Mono label above the rule, e.g. "DAY 1". */
  day: string;
  title: string;
  subtitle: string;
  /**
   * `terminal` renders the title in the mono brand face and fills the node
   * dot — used to mark the final milestone.
   */
  variant?: "default" | "terminal";
};

export const protocolContent = {
  eyebrow: ">_ The FDE Process",
  headline: "From Discovery to Production: How Our FDEs Work",
  subheading:
    "Our structured process keeps each stage clear, reduces handoff gaps, aligns teams, and helps delivery progress smoothly toward production readiness.",
};

export const protocolSteps: ProtocolStep[] = [
  { day: "STEP 1", title: "Discover", subtitle: "Workflow Deep Dive" },
  { day: "STEP 2", title: "Design", subtitle: "Solution Blueprint" },
  { day: "STEP 3", title: "Build", subtitle: "Engineering & Development" },
  { day: "STEP 4", title: "Integrate", subtitle: "System Integration" },
  { day: "STEP 5", title: "Deploy", subtitle: "Production Deployment" },
  {
    day: "STEP 6",
    title: ">_ Optimize",
    subtitle: "Continuous Improvement",
    variant: "terminal",
  },
];
