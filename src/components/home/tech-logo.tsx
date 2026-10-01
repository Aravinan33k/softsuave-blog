"use client";

import React, { useId } from "react";

/**
 * Returns a high-quality inline SVG logo/icon for the given technology name.
 */
/**
 * Product names that share a mark with an entry below — the product's brand,
 * or the same vendor's family mark. Keyed by the normalised name (lowercase,
 * alphanumerics only), the same form `norm` takes.
 */
const ALIASES: Record<string, string> = {
  openaigpt4o: "openai",
  openaitextembedding3: "openai",
  anthropicclaude: "claude",
  googlegemini: "gemini",
  metallama: "llama",
  azureopenaiservice: "azureai",
  azureaisearch: "azureai",
  azureaidocumentintelligence: "azureai",
  azure: "azureai",
  aws: "awsbedrock",
  awstextract: "awsbedrock",
  googlecloud: "googlevertexai",
  googledocumentai: "googlevertexai",
  llamaparse: "llamaindex",
  cohereembed: "cohere",
  coherererank: "cohere",
  microsoftazure: "azureai",
  tesseractocr: "tesseract",
  onnxruntime: "onnx",
  restapis: "rest",
  githubactions: "github",
  pyspark: "apachespark",
  awsgluedatacatalog: "awsglue",
  cicdpipelines: "cicd",
  sqlserver: "microsoftsqlserver",
  azuresynapseanalytics: "azuresynapse",
  bigquery: "googlebigquery",
  redshift: "amazonredshift",
  s3: "amazons3",
  dynamodb: "amazondynamodb",
  rds: "amazonrds",
  quicksight: "amazonquicksight",
  kafka: "apachekafka",
  spark: "apachespark",
  flink: "apacheflink",
  iceberg: "apacheiceberg",
  nifi: "apachenifi",
  beam: "apachebeam",
  atlas: "apacheatlas",
  sklearn: "scikitlearn",
  jupyter: "jupyternotebook",
  iossdks: "apple",
  ios: "apple",
  gcp: "googlevertexai",
  reactjs: "react",
  ror: "rubyonrails",
  awsdynamodb: "amazondynamodb",
  cloudfirestore: "firebase",
  firestore: "firebase",
  mssqlserver: "microsoftsqlserver",
  mssql: "microsoftsqlserver",
  // Spelling variants the hire-by-role technology bands use for marks above.
  amazonwebservices: "awsbedrock",
  googlecloudplatform: "googlevertexai",
  googlecloudvision: "googlevertexai",
  azureml: "azureai",
  openaiapi: "openai",
  chatgpt: "openai",
  googlebert: "google",
  expressjs: "express",
  go: "golang",
  // "Swift Data" and "SwiftData" — Apple's persistence framework for Swift.
  swiftdata: "swift",
  visualstudiocode: "vscode",
  // The DevOps page's automation list abbreviates Selenium to "SE".
  se: "selenium",
  reduxtoolkit: "redux",
  yii2: "yii",
  elkstack: "elasticsearch",
  jquerymobile: "jquery",
  awscloudwatch: "cloudwatch",
  restfulapis: "restapis",
  integrationrestsoapapi: "rest",
  jsonrpc: "json",
  htmlcss: "html",
  versioncontrolgit: "git",
  unittestingapexui: "unittesting",
  // Hyperledger Fabric's name for its smart contracts.
  chaincode: "hyperledger",
  owaspzap: "owasp",
  katalonteststudio: "katalon",
  // Salesforce's own products carry the Salesforce cloud.
  salesforcecommunities: "salesforce",
  salesforceconnect: "salesforce",
  deploymenttoolssalesforcedx: "salesforce",
  appexchangepackagedevelopment: "salesforce",
  lightningwebcomponentslwc: "salesforce",
  auralightningcomponents: "salesforce",
  visualforce: "salesforce",
  // Stack-band names that were drawing the generic disc (29 Sep sweep): the
  // product itself under another spelling, or an official member of the
  // vendor's own family, so the vendor mark is the honest one.
  angularjs: "angular",
  angular2: "angular",
  angularmaterial: "angular",
  bootstrap3: "bootstrap",
  ngbootstrap: "bootstrap",
  ngrxangularredux: "ngrx",
  androidwebview: "android",
  iosuiwebview: "apple",
  awsrds: "amazonrds",
  awscodecommit: "awsbedrock",
  azuredatabase: "azureai",
  gcpservices: "googlevertexai",
  googlecloudsql: "googlevertexai",
  googlemeet: "google",
  googlemeetandchat: "google",
  githubcopilot: "github",
  msteams: "microsoftteams",
  microsoftteam: "microsoftteams",
  dockercontainerization: "docker",
  postmanapitesting: "postman",
  eclipsexcode: "eclipse",
  visualstudiocodeionicextensionpack: "vscode",
  graphqlservices: "graphql",
  restservices: "rest",
  kotlinmultiplatform: "kotlin",
  meteorjs: "meteor",
  tensorflowrecommenders: "tensorflow",
  herokupostgres: "heroku",
  jsonb: "json",
  plpgsql: "postgresql",
  psql: "postgresql",
  pgadmin: "postgresql",
  // Rails' own components
  railsapi: "rails",
  activestorage: "rails",
  railsadmin: "rails",
  webpacker: "webpack",
  // Laravel's first-party packages and services ("Telescopet" and "Breez" are
  // the live copy's spellings of Telescope and Breeze)
  laravelblade: "laravel",
  laravelforge: "laravel",
  laravelpassport: "laravel",
  sanctum: "laravel",
  nova: "laravel",
  vapor: "laravel",
  envoyer: "laravel",
  herd: "laravel",
  tinker: "laravel",
  telescope: "laravel",
  telescopet: "laravel",
  breeze: "laravel",
  breez: "laravel",
  atomeditor: "atom",
  // Pug was called Jade until 2016
  jade: "pug",
};

/**
 * Names that are practices, protocols or skills rather than products — "RAG",
 * "Token creation", "Data Modeling". No brand owns them, so rather than the
 * generic disc they get a purpose-drawn glyph in the band's accent. Consulted
 * only after every brand case has missed, so a product can never be drawn as a
 * concept. Keyed by the normalised name, like `ALIASES`.
 */
type Concept =
  | "shield"
  | "lock"
  | "key"
  | "idcard"
  | "audit"
  | "plug"
  | "link"
  | "card"
  | "cart"
  | "database"
  | "migrate"
  | "schema"
  | "chart"
  | "insight"
  | "chat"
  | "team"
  | "training"
  | "bulb"
  | "doc"
  | "checklist"
  | "check"
  | "flow"
  | "clock"
  | "deploy"
  | "code"
  | "bug"
  | "layout"
  | "architecture"
  | "cloud"
  | "network"
  | "blocks"
  | "broadcast"
  | "realtime"
  | "token"
  | "coins"
  | "sparkle"
  | "tune"
  | "agent"
  | "retrieval"
  | "building"
  | "pose"
  | "alert"
  | "badge"
  | "button"
  | "uicard"
  | "checkbox"
  | "chip"
  | "fab"
  | "array"
  | "table"
  | "list"
  | "eye"
  | "search"
  | "backup"
  | "geo"
  | "globe"
  | "mail";

const CONCEPTS: Record<string, Concept> = {
  // AI
  llms: "sparkle",
  llmfinetuning: "tune",
  agenticai: "agent",
  rag: "retrieval",
  ragpipelines: "retrieval",
  vectordatabases: "database",
  openpose: "pose",
  // Security and compliance
  aes: "lock",
  endtoendencryption: "lock",
  rsa: "key",
  cryptographicprotocols: "key",
  gdpr: "shield",
  hipaacompliance: "shield",
  securitypractices: "shield",
  secureapis: "shield",
  securityaudits: "audit",
  kycamlintegration: "idcard",
  // Blockchain
  tokencreation: "token",
  ico: "token",
  erc20: "token",
  erc721: "token",
  erc1155: "token",
  defi: "coins",
  consensusalgorithms: "network",
  peertopeernetworkdesign: "network",
  microservices: "blocks",
  michelson: "code",
  websocket: "realtime",
  websockets: "realtime",
  // Integrations and commerce
  thirdpartyintegrations: "plug",
  externalsystemintegration: "plug",
  webhooks: "link",
  paymentgateways: "card",
  customecommercesolutions: "cart",
  erp: "building",
  manualtestingtools: "checklist",
  // Salesforce platform skills
  apexprogramming: "code",
  soqlsosl: "database",
  datamanagement: "database",
  datamigration: "migrate",
  datamodeling: "schema",
  dataanalyticsreporting: "chart",
  flowbuilder: "flow",
  processbuilder: "flow",
  workflowtriggers: "flow",
  businessprocessmapping: "flow",
  approvalprocesses: "check",
  validationrules: "check",
  batchclassesscheduling: "clock",
  changesets: "deploy",
  debuglogserrorhandling: "bug",
  userinterfaceuidesign: "layout",
  solutionsystemdesign: "architecture",
  cloudcomputingconcepts: "cloud",
  multiorgstrategy: "network",
  platformeventspubsub: "broadcast",
  crmbestpractices: "checklist",
  requirementsgathering: "checklist",
  technicaldocumentation: "doc",
  // Working skills
  communication: "chat",
  teamcollaboration: "team",
  usertraining: "training",
  problemsolving: "bulb",
  analyticalthinking: "insight",
  // Ionic UI components (hire-ionic stack)
  alert: "alert",
  badge: "badge",
  button: "button",
  card: "uicard",
  checkbox: "checkbox",
  chip: "chip",
  content: "doc",
  floatingactionbutton: "fab",
  // Database concepts (PostgreSQL stack)
  arrays: "array",
  constraints: "check",
  indexes: "list",
  tables: "table",
  views: "eye",
  schemas: "schema",
  fulltextsearch: "search",
  backupandrestoretools: "backup",
  schemamigrationtools: "migrate",
  dbms: "database",
  databasecleaner: "database",
  postgis: "geo",
  // Patterns and language features
  factorypattern: "blocks",
  repositorypattern: "database",
  servicepattern: "blocks",
  simplemvcpattern: "architecture",
  mvvm: "architecture",
  gates: "shield",
  policies: "shield",
  coroutines: "flow",
  i18n: "globe",
  delayedjobs: "clock",
  nodecron: "clock",
  // Mail libraries
  phpmailer: "mail",
  swiftmailer: "mail",
  nodemailer: "mail",
};

/** The concept glyphs: accent line icons on the 24-unit grid the marks use. */
const CONCEPT_GLYPHS: Record<Concept, React.ReactNode> = {
  shield: (
    <>
      <path d="M12 3l7 2.8V11c0 4.4-2.9 8-7 9.4C7.9 19 5 15.4 5 11V5.8L12 3z" />
      <path d="M9 11.8l2.1 2.1 4-4.3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" />
      <path d="M12 14.2v2.4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="16" r="4" />
      <path d="M10.9 13.1L19.5 4.5" />
      <path d="M16.5 7.5l2.5 2.5" />
      <path d="M14 10l2 2" />
    </>
  ),
  idcard: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <circle cx="8.6" cy="10.8" r="2" />
      <path d="M5.8 15.6c.6-1.4 1.6-2 2.8-2s2.2.6 2.8 2" />
      <path d="M14 10h4M14 13.5h3" />
    </>
  ),
  audit: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3L20.5 20.5" />
      <path d="M7.8 10.6l1.9 1.9 3.3-3.5" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v4M15 3v4" />
      <path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0V7z" />
      <path d="M12 16v5" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M6.5 14.5h4" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.2 10.2h10.4L20 7.4H6.3" />
      <circle cx="9" cy="18.6" r="1.4" />
      <circle cx="16.4" cy="18.6" r="1.4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" />
      <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </>
  ),
  migrate: (
    <>
      <ellipse cx="8" cy="6" rx="4.5" ry="2" />
      <path d="M3.5 6v10c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V6" />
      <path d="M3.5 11c0 1.1 2 2 4.5 2s4.5-.9 4.5-2" />
      <path d="M14.5 15h6.5M18.3 12.3l2.7 2.7-2.7 2.7" />
    </>
  ),
  schema: (
    <>
      <rect x="3" y="3.5" width="7" height="5" rx="1" />
      <rect x="14" y="3.5" width="7" height="5" rx="1" />
      <rect x="8.5" y="15.5" width="7" height="5" rx="1" />
      <path d="M6.5 8.5V12h11V8.5M12 12v3.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8.5 16v-4M12.5 16V8M16.5 16v-6" />
    </>
  ),
  insight: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3L20.5 20.5" />
      <path d="M8 12.8v-1.6M10.5 12.8V8.2M13 12.8V10" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H10.5L6 19.5V16H4z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth="2.4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M16.4 14.3c2.2.1 3.7 1.7 4.1 4.2" />
    </>
  ),
  training: (
    <>
      <path d="M2.5 9L12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c1.5 1.6 3.4 2.4 5.5 2.4s4-.8 5.5-2.4V11" />
      <path d="M21.5 9v5" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 17.5h6M10 20.5h4" />
      <path d="M8.5 14.5C7 13.3 6 11.6 6 9.6a6 6 0 0 1 12 0c0 2-1 3.7-2.5 4.9-.5.4-.5 1-.5 1.5V17H9v-1c0-.5 0-1.1-.5-1.5z" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6" />
    </>
  ),
  checklist: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 3h6v3H9z" />
      <path d="M8.3 11l1.3 1.3 2.2-2.3M8.3 16l1.3 1.3 2.2-2.3M14 11.3h2M14 16.3h2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.2l2.5 2.5 4.9-5.2" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3.5" width="6.5" height="5" rx="1" />
      <rect x="14.5" y="15.5" width="6.5" height="5" rx="1" />
      <path d="M6.25 8.5V16a2 2 0 0 0 2 2h6.25" />
      <path d="M12 15.5l2.5 2.5-2.5 2.5" />
      <path d="M9.5 6h5a3.25 3.25 0 0 1 3.25 3.25v6.25" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  deploy: (
    <>
      <path d="M12 15V4M8 8l4-4 4 4" />
      <path d="M4 14v5a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-5" />
    </>
  ),
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" />,
  bug: (
    <>
      <rect x="7.5" y="7.5" width="9" height="12" rx="4.5" />
      <path d="M9.5 7.5a2.5 2.5 0 0 1 5 0M12 11v8.5" />
      <path d="M4 13h3.5M16.5 13H20M5 8.5l2.8 1.5M19 8.5l-2.8 1.5M5 18.5l2.8-1.8M19 18.5l-2.8-1.8" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18M9 8.5V20" />
    </>
  ),
  architecture: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="3" y="16" width="6" height="5" rx="1" />
      <rect x="15" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </>
  ),
  cloud: <path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.1 4.7 4.7 0 0 0 7 18.5z" />,
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="17" r="2.2" />
      <circle cx="19" cy="17" r="2.2" />
      <path d="M10.9 6.9L6.1 15.1M13.1 6.9l4.8 8.2M7.2 17h9.6" />
    </>
  ),
  blocks: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M8.3 8.3a5.2 5.2 0 0 0 0 7.4M15.7 8.3a5.2 5.2 0 0 1 0 7.4M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4" />
    </>
  ),
  realtime: <path d="M4 9h15l-3.5-3.5M20 15H5l3.5 3.5" />,
  token: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <path d="M12 9.8v4.4" />
    </>
  ),
  coins: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M14.2 10.3a5.5 5.5 0 1 1-3.9 3.9" />
      <path d="M9 7v4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" />
      <path d="M18 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  tune: (
    <>
      <path d="M5 4v16M12 4v16M19 4v16" />
      <circle cx="5" cy="14.5" r="2" fill="var(--accent)" />
      <circle cx="12" cy="8.5" r="2" fill="var(--accent)" />
      <circle cx="19" cy="12.5" r="2" fill="var(--accent)" />
    </>
  ),
  agent: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 5v3" />
      <circle cx="12" cy="3.8" r="1.2" />
      <path d="M9.5 12.5v1.5M14.5 12.5v1.5" />
      <path d="M2.8 12v3.5M21.2 12v3.5" />
    </>
  ),
  retrieval: (
    <>
      <path d="M12 21H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7l4 4v3.5" />
      <path d="M13 3v4h4" />
      <circle cx="16.3" cy="16.3" r="3" />
      <path d="M18.5 18.5L21 21" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5.5L12 3v18M12 8.5l8 2.5v10M3 21h18" />
      <path d="M7 8h2M7 11.5h2M7 15h2M15 13.5h2M15 17h2" />
    </>
  ),
  pose: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M12 7v7M12 9.5l-5-2M12 9.5l5 2.5M12 14l-3.5 6.5M12 14l3.5 6.5" />
      <circle cx="7" cy="7.5" r=".9" fill="var(--accent)" />
      <circle cx="17" cy="12" r=".9" fill="var(--accent)" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4l9 15.5H3z" />
      <path d="M12 10v4.2" />
      <path d="M12 16.8h.01" strokeWidth="2.4" />
    </>
  ),
  badge: (
    <>
      <rect x="3" y="7" width="14" height="11" rx="3" />
      <circle cx="18" cy="6.5" r="3" fill="var(--accent)" />
    </>
  ),
  button: (
    <>
      <rect x="3" y="7.5" width="18" height="9" rx="4.5" />
      <path d="M8.5 12h7" />
    </>
  ),
  uicard: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M4 11h16" />
      <path d="M7.5 14.5h6M7.5 17h4" />
    </>
  ),
  checkbox: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 12.2l2.7 2.7L16 9.5" />
    </>
  ),
  chip: (
    <>
      <rect x="2.5" y="7.5" width="19" height="9" rx="4.5" />
      <circle cx="7.5" cy="12" r="2" />
      <path d="M14 10.3l3.4 3.4M17.4 10.3L14 13.7" />
    </>
  ),
  fab: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  array: (
    <>
      <path d="M7 4H4v16h3M17 4h3v16h-3" />
      <path d="M9 12h.01M12 12h.01M15 12h.01" strokeWidth="2.4" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M3 15h18M9.5 9.5V20" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" strokeWidth="2.4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3L20.5 20.5" />
      <path d="M8 9h5M8 12h3.5" />
    </>
  ),
  backup: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l2.5 1.5" />
    </>
  ),
  geo: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6.5L20.5 7" />
    </>
  ),
};

/**
 * Brand-coloured monogram tiles, for named products that have no mark drawn
 * above. Several of these products' own marks ARE letter tiles (Adobe XD's
 * "Xd", the JetBrains IDEs' black squares), and for the rest the product's
 * colour and initials are the honest stand-in — the generic disc said nothing
 * at all. Keyed by the normalised name, like `ALIASES`; consulted after every
 * brand case and concept has missed.
 *
 * `[text, background, foreground?, shape?]` — `round` draws a disc, `ide` the
 * JetBrains tile (letters top-left over a short bar).
 */
type MonogramSpec = readonly [string, string, string?, ("round" | "ide")?];

const MONOGRAMS: Record<string, MonogramSpec> = {
  // Ruby / Rails ecosystem
  activeadmin: ["AA", "#5E6469"],
  apipierails: ["Ap", "#CC0000"],
  cancancan: ["Cc", "#D33A2C"],
  capistrano: ["Cap", "#2B5B84"],
  capybara: ["Cb", "#8D6E4B"],
  carrierwave: ["CW", "#1F6FB2"],
  cuba: ["Cu", "#B22222"],
  devise: ["Dv", "#8B2331"],
  dotenv: [".env", "#ECD53F", "#1A1A1A"],
  factorybot: ["FB", "#D32F2F"],
  faker: ["Fk", "#6D4C41"],
  figaro: ["Fg", "#546E7A"],
  grape: ["Gr", "#6F2DA8"],
  hanami: ["Ha", "#E7488C"],
  honeybadger: ["Hb", "#EA5937"],
  hotwire: ["Hw", "#FFE801", "#1A1A1A"],
  mina: ["Mi", "#4A4A4A"],
  minitest: ["Mt", "#CC342D"],
  omniauth: ["OA", "#2F2F2F"],
  papertrail: ["PT", "#1B8A5A"],
  passenger: ["Ps", "#6C2D91"],
  puma: ["Pu", "#262626"],
  pundit: ["Pd", "#5B4B8A"],
  reek: ["Rk", "#CC342D"],
  resque: ["Rq", "#B7282E"],
  rollbar: ["Rb", "#3569F3"],
  rubocop: ["RC", "#D8322B"],
  sidekiq: ["Sq", "#B1003E"],
  simplecov: ["SC", "#4CAF50"],
  sinatra: ["Si", "#6C3483"],
  solr: ["So", "#D9411E"],
  thin: ["Th", "#607D8B"],
  unicorn: ["Un", "#9C27B0"],
  webrick: ["WB", "#CC342D"],
  // PHP / Laravel ecosystem
  authorizenet: ["Au", "#1C3D5A"],
  backpack: ["Bp", "#7C69EF"],
  composer: ["Co", "#885630"],
  filament: ["Fi", "#F59E0B", "#1A1A1A"],
  guzzlehttp: ["Gz", "#3E78B2"],
  laragon: ["Lg", "#0E83CD"],
  livewire: ["Lw", "#FB70A9"],
  octobercms: ["Oc", "#DB6A26"],
  pest: ["Pe", "#F472B6", "#1A1A1A"],
  phpunit: ["PU", "#3C9CD7"],
  pusher: ["Pu", "#300D4F"],
  spatiepermissions: ["Sp", "#197593"],
  sqlyog: ["SQ", "#1B75BB"],
  statamic: ["St", "#FF269E"],
  twig: ["Tw", "#8BC34A", "#1A1A1A"],
  voyager: ["Vy", "#22A7F0"],
  // JavaScript / Node ecosystem
  adonisjs: ["A", "#5A45FF"],
  feathersio: ["F", "#333333"],
  hapijs: ["h", "#F7A80D", "#1A1A1A"],
  koajs: ["koa", "#33333D"],
  lodash: ["lo", "#3492FF"],
  loopbackjs: ["LB", "#3F5DFF"],
  mongoose: ["M", "#880000"],
  passport: ["P", "#34E27A", "#1A1A1A"],
  pm2: ["PM2", "#2B037A"],
  pug: ["Pug", "#A86454"],
  sailsjs: ["S", "#14ACC2"],
  sequelize: ["Sq", "#52B0E7"],
  totaljs: ["T", "#1A1A1A"],
  unload: ["Ul", "#455A64"],
  vash: ["V", "#6A1B9A"],
  // Angular component libraries and data stores
  couchdb: ["Cd", "#E42528"],
  fullcalendar: ["FC", "#2C3E50"],
  kendoui: ["K", "#FF6358"],
  primeng: ["P", "#DD0031"],
  rethinkdb: ["R", "#48B9A8"],
  syncfusion: ["Sf", "#FF8C00", "#1A1A1A"],
  // Kotlin / Android
  dagger: ["Dg", "#3F51B5"],
  hilt: ["Hi", "#3DDC84", "#1A1A1A"],
  koin: ["Ko", "#F7931E", "#1A1A1A"],
  ktor: ["Kt", "#087CFA"],
  micronaut: ["Mn", "#1A1A1A"],
  retrofit: ["Rf", "#48B983"],
  roboelectric: ["Rb", "#8BC34A", "#1A1A1A"],
  testng: ["TN", "#E0431F"],
  // Databases and migrations
  flyway: ["Fw", "#CC0200"],
  liquibase: ["Lq", "#2962FF"],
  mariadb: ["Ma", "#003545", "#C49A6C"],
  // Data science and MLOps
  dvc: ["DVC", "#945DD6"],
  evidently: ["Ev", "#ED0400"],
  implicit: ["im", "#37474F"],
  microsoftpowerautomate: ["PA", "#0066FF"],
  prometheus: ["P", "#E6522C", "#FFFFFF", "round"],
  prophet: ["Pr", "#0467DF"],
  pyod: ["Py", "#306998"],
  r: ["R", "#276DC3", "#FFFFFF", "round"],
  river: ["Rv", "#1E88E5"],
  shap: ["SH", "#FF0051"],
  // Tools, editors and services
  adobexd: ["Xd", "#470137", "#FF61F6"],
  ansible: ["A", "#1A1918", "#FFFFFF", "round"],
  aptanastudio: ["Ap", "#E86B25"],
  basecamp: ["Bc", "#FFE700", "#1D2D35"],
  cordova: ["Co", "#35434F"],
  ember: ["E", "#E04E39"],
  phpstorm: ["PS", "#000000", "#FFFFFF", "ide"],
  rubymine: ["RM", "#000000", "#FFFFFF", "ide"],
  webstorm: ["WS", "#000000", "#FFFFFF", "ide"],
  sublime: ["S", "#4B4B4B", "#FF9800"],
  tabnine: ["Tn", "#6B4FBB"],
};

/**
 * A near-black tile vanishes into the dark bands, so it gets a hairline in the
 * band's own text colour — light on dark, dark (and barely there) on light.
 */
function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70;
}

function Monogram({ spec }: { spec: MonogramSpec }) {
  const [text, bg, fg = "#FFFFFF", shape] = spec;
  const font = { fontFamily: "var(--font-body), system-ui, sans-serif", fontWeight: 700 } as const;
  const ring = isDark(bg) ? { stroke: "currentColor", strokeOpacity: 0.28, strokeWidth: 1 } : {};
  if (shape === "ide") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" fill={bg} {...ring} />
        <text x="5" y="12.5" fontSize="8" fill={fg} style={font}>
          {text}
        </text>
        <rect x="5" y="16.5" width="7" height="1.6" fill={fg} />
      </svg>
    );
  }
  const size = text.length === 1 ? 12 : text.length === 2 ? 10 : text.length === 3 ? 7.8 : 7.2;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {shape === "round" ? (
        <circle cx="12" cy="12" r="10" fill={bg} {...ring} />
      ) : (
        <rect x="2" y="2" width="20" height="20" rx="5" fill={bg} {...ring} />
      )}
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        letterSpacing="-0.3"
        fill={fg}
        style={font}
      >
        {text}
      </text>
    </svg>
  );
}

function ConceptGlyph({ kind }: { kind: Concept }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--accent)"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {CONCEPT_GLYPHS[kind]}
    </svg>
  );
}

export default function TechLogo({ name }: { name: string }) {
  /**
   * Three of the marks below paint from a `<linearGradient>`, which SVG can
   * only reach by id — and an id is document-global. A page rendering the same
   * mark twice therefore emitted the id twice: invalid HTML, and every
   * reference resolves to whichever copy the parser saw first.
   *
   * Latent for as long as each mark appeared once per page, and real the moment
   * the hire-by-role card grids started drawing brand marks beside a technology
   * band that already carried them — Kotlin, on /hire-mobile-app-developers.
   *
   * `useId` is per instance, so the copies no longer collide. The colons React
   * brackets the value with are stripped: they are legal in a URL fragment, but
   * not worth betting a logo on.
   */
  const uid = useId().replace(/:/g, "");
  /**
   * `#` becomes the word before punctuation is stripped, so "C#" and "F#" stay
   * distinct from "C" and "F". Without it both collapse to the same key and a
   * C# stack borrows the C mark — which is what the Xamarin page was doing
   * (review: "add the missing icons in the tech stack section").
   */
  const norm = name.toLowerCase().replace(/#/g, "sharp").replace(/[^a-z0-9]/g, "");

  const key = ALIASES[norm] ?? norm;

  switch (key) {
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
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill={`url(#geminiGrad-${uid})`} />
          <defs>
            <linearGradient id={`geminiGrad-${uid}`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
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
    case "flask":
      // Flask's horn/drinking-vessel silhouette
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.4 2.6h3.4v5.1l5.4 9.1c1 1.7-.2 3.9-2.2 3.9H8c-2 0-3.2-2.2-2.2-3.9l3.6-6.1V2.6Z" fill="#111111" />
          <path d="M7.5 14.4h8.8" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8.4 2.6h5" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "pyramid":
      // Pyramid — the framework's stepped triangle
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.8 21 20H3L12 2.8Z" fill="#E4A83C" />
          <path d="M12 2.8V20" stroke="white" strokeWidth="1.1" strokeOpacity="0.75" />
          <path d="M7.4 11.7h9.2M5.2 15.9h13.6" stroke="white" strokeWidth="1.1" strokeOpacity="0.75" />
        </svg>
      );
    /* ----------------------------------------------------------------
       Rendering strategies, routing, gateways and test levels.

       These are the first entries here that are NOT products, so there is
       no vendor mark to reproduce — and without one they fell through to
       the generic dot, which is what the Next.js page's stack was showing
       for eight of its thirty-one items (review: "a few icons are missing
       in the tech stack section").

       So they are drawn, in one accent colour rather than brand palettes,
       which is the honest signal: a coloured logo means a product, a coral
       glyph means a technique. Same 24x24 geometry as everything else.
       ---------------------------------------------------------------- */
    case "rspec":
      // RSpec — Ruby's testing framework: its red-magenta tile marked with a
      // spec's passing example
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#B3232A" />
          <path
            d="M6.4 6.2h3.5c1.9 0 3.1 1.1 3.1 2.8 0 1.2-.6 2.1-1.7 2.5l2.1 4.3h-2l-1.8-3.9H8.2v3.9H6.4V6.2Zm1.8 4.2h1.5c.9 0 1.4-.4 1.4-1.2s-.5-1.2-1.4-1.2H8.2v2.4Z"
            fill="#fff"
          />
          <path d="M14.4 12.6l1.7 1.7 3.1-3.4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ssr":
      // Server-side rendering: a server stack pushing a finished page out
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.6" y="4" width="8" height="5" rx="1.2" />
          <rect x="2.6" y="13" width="8" height="5" rx="1.2" />
          <path d="M12.8 11h6.4" />
          <path d="M16.6 8.2 19.8 11l-3.2 2.8" />
          <path d="M5.4 6.5h.01M5.4 15.5h.01" />
        </svg>
      );
    case "ssg":
      // Static generation: a page built ahead of time, marked done
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.6 3.4h8.2l4.6 4.6v12.6H5.6z" />
          <path d="M13.4 3.6v4.6h4.6" />
          <path d="M8.6 15.4l2 2 4.2-4.4" />
        </svg>
      );
    case "isr":
      // Incremental regeneration: a page that refreshes itself on a cycle
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.6 4.4h10.2v6.2" />
          <path d="M19.6 12.4a7 7 0 01-11.8 5.1L5.2 15" />
          <path d="M4.6 19.4v-4.6h4.6" />
          <path d="M19.4 8.2V3.6h-4.6" />
        </svg>
      );
    case "approuter":
    case "router":
      // Routing: one entry branching to the segments below it
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4.6" r="2.2" />
          <circle cx="5.4" cy="19.4" r="2.2" />
          <circle cx="18.6" cy="19.4" r="2.2" />
          <path d="M12 6.8v4.4" />
          <path d="M12 11.2H5.4v6M12 11.2h6.6v6" />
        </svg>
      );
    case "apigateways":
    case "apigateway":
      // A gateway: traffic converging through one controlled opening
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.6 20.4V8.6a3.4 3.4 0 016.8 0v11.8" />
          <path d="M5.4 20.4h13.2" />
          <path d="M2.6 12h3.6M17.8 12h3.6" />
        </svg>
      );
    case "unittesting":
      // One unit, checked in isolation
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4.4" y="4.4" width="15.2" height="15.2" rx="2.4" />
          <path d="M8.6 12.2l2.4 2.4 4.4-4.8" />
        </svg>
      );
    case "integrationtesting":
      // Two units checked where they meet
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.8" y="7.4" width="7.4" height="9.2" rx="1.8" />
          <rect x="13.8" y="7.4" width="7.4" height="9.2" rx="1.8" />
          <path d="M10.2 12h3.6" />
          <path d="M10.6 4.6l1.4 1.4 1.4-1.4" />
        </svg>
      );
    case "endtoendtesting":
    case "e2etesting":
      // The whole path walked, start to finish
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF5436" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="4.4" cy="17.6" r="2" />
          <path d="M6.4 17.6h4a4 4 0 004-4v-2a4 4 0 014-4h1" />
          <path d="M17.6 4.4v7.2" />
          <path d="M17.6 4.4l3.4 1.8-3.4 1.8" />
        </svg>
      );
    case "aspnetcore":
    case "aspnet":
      // ASP.NET Core — the purple .NET tile with the stack wordmark's dot
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#512BD4" />
          <circle cx="5.9" cy="16.1" r="1.5" fill="#fff" />
          <path d="M9.4 17V9.6h1.7l3 4.7V9.6h1.6V17h-1.6l-3.1-4.8V17H9.4Z" fill="#fff" />
          <path d="M17.2 11.2h1.5v1.6h1.5v1.4h-1.5v1.6h-1.5v-1.6h-1.5v-1.4h1.5v-1.6Z" fill="#fff" />
        </svg>
      );
    case "vbnet":
      // VB.NET — the same .NET purple, marked with the language's initials
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#512BD4" />
          <path d="M4.4 7.6h1.8l1.7 5.5 1.7-5.5h1.8l-2.6 8H7L4.4 7.6Z" fill="#fff" />
          <path
            d="M12.4 7.6h3c1.4 0 2.3.7 2.3 2 0 .8-.4 1.4-1 1.7.8.3 1.3.9 1.3 1.9 0 1.4-1 2.4-2.6 2.4h-3v-8Zm1.7 3.2h1.1c.5 0 .8-.3.8-.8s-.3-.8-.8-.8h-1.1v1.6Zm0 3.4h1.3c.6 0 .9-.3.9-.9s-.3-.9-.9-.9h-1.3v1.8Z"
            fill="#fff"
          />
        </svg>
      );
    case "blazor":
      // Blazor — its purple rounded badge with the lightning-bolt "B"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#512BD4" />
          <path d="M13.6 4.5 7.4 12.6h3.4L9.9 19.5l6.4-8.4h-3.5l.8-6.6Z" fill="#fff" />
        </svg>
      );
    case "rackspace":
      // Rackspace — its red rounded tile with the wordmark's opening "r"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#E2231A" />
          <path
            d="M8.2 8.9h2.2v1.2c.5-.9 1.4-1.4 2.6-1.4.5 0 .9.1 1.3.2l-.5 2.1a3 3 0 0 0-1.1-.2c-1.4 0-2.3.9-2.3 2.6v2.7H8.2V8.9Z"
            fill="#fff"
          />
        </svg>
      );
    case "csharp":
      // C#'s purple rounded tile with the sharp sign
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#68217A" />
          <path
            d="M10.4 6.4h1.4l-.5 3h2l.5-3h1.4l-.5 3h1.9v1.3h-2.1l-.4 2.6h2v1.3h-2.2l-.5 3h-1.4l.5-3h-2l-.5 3H8.6l.5-3H7.2v-1.3h2.1l.4-2.6h-2V9.4h2.2l.5-3Zm.7 4.3-.4 2.6h2l.4-2.6h-2Z"
            fill="#fff"
          />
        </svg>
      );
    case "jquery":
      // jQuery's blue rounded badge with the lowercase wordmark's "jQ"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#0769AD" />
          <path
            d="M8.1 7.2h1.7v6.6c0 1.6-.9 2.5-2.4 2.5-.6 0-1.1-.1-1.5-.4l.4-1.4c.3.2.6.3.9.3.6 0 .9-.3.9-1.1V7.2Z"
            fill="#fff"
          />
          <path
            d="M15.3 16.6c-2 0-3.4-1.5-3.4-3.8s1.4-3.8 3.4-3.8 3.4 1.5 3.4 3.8c0 .9-.2 1.7-.6 2.3l.9.8-1 1.1-.9-.8c-.5.3-1.1.4-1.8.4Zm0-1.5c1 0 1.6-.9 1.6-2.3s-.6-2.3-1.6-2.3-1.6.9-1.6 2.3.6 2.3 1.6 2.3Z"
            fill="#fff"
          />
        </svg>
      );
    case "android":
      // Android's green robot head — antennae, eyes and the domed body
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.2 5.1 6.1 3.4a.4.4 0 0 1 .7-.4l1.1 1.8A7 7 0 0 1 12 4c1.5 0 2.9.3 4.1.8l1.1-1.8a.4.4 0 1 1 .7.4l-1.1 1.7A6 6 0 0 1 19.4 10H4.6a6 6 0 0 1 2.6-4.9Z"
            fill="#3DDC84"
          />
          <circle cx="8.8" cy="7.6" r="0.8" fill="#fff" />
          <circle cx="15.2" cy="7.6" r="0.8" fill="#fff" />
          <path d="M4.6 11.2h14.8v6.1a1.5 1.5 0 0 1-1.5 1.5H6.1a1.5 1.5 0 0 1-1.5-1.5v-6.1Z" fill="#3DDC84" />
          <rect x="1.4" y="11.2" width="2.2" height="6.4" rx="1.1" fill="#3DDC84" />
          <rect x="20.4" y="11.2" width="2.2" height="6.4" rx="1.1" fill="#3DDC84" />
          <rect x="8.2" y="18.6" width="2.2" height="4.2" rx="1.1" fill="#3DDC84" />
          <rect x="13.6" y="18.6" width="2.2" height="4.2" rx="1.1" fill="#3DDC84" />
        </svg>
      );
    case "laravel":
      /**
       * Laravel's mark: the angular "L" drawn as a single red stroke.
       *
       * What this replaced was a stack of five shaded parallelograms — an
       * isometric box, not a letter, and nothing a reader would recognise as
       * Laravel (review: "update laravel icon"). The real mark is one
       * continuous chevron path, so it is drawn as one.
       */
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.1 4.2h3.3v12.1h7.1l-1.7 3.5H3.1V4.2Z"
            fill="#FF2D20"
          />
          <path
            d="M13.4 4.2h3.4l4.1 8.4-1.7 3.5-2.4-5-2.5 5.1h-3.5l4.2-8.5-1.6-3.5Z"
            fill="#FF2D20"
          />
        </svg>
      );
    case "cakephp":
      // CakePHP — a red slice of layered cake
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.4 11.6h17.2v6.2c0 1.2-3.9 2.2-8.6 2.2s-8.6-1-8.6-2.2v-6.2Z" fill="#D33C43" />
          <ellipse cx="12" cy="11.6" rx="8.6" ry="2.3" fill="#EE5A5F" />
          <path d="M12 4v4.4" stroke="#D33C43" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="3.4" r="1.4" fill="#F5A623" />
        </svg>
      );
    case "codeigniter":
      // CodeIgniter's orange flame
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.6 1.8c.7 2.4-.4 3.6-1.9 4.9-1.6 1.4-3.6 3-3.6 6.2 0 4 3.1 6.9 6.6 6.9-2.6-1.6-3.4-3.6-2.5-5.6.7-1.6 2.4-2.6 3.6-4.1 1.9-2.3 1.4-5.6-2.2-8.3Z" fill="#DD4814" />
          <path d="M9.6 12.4c-1.6 1.5-2.2 3.1-1.8 4.7.5 2.1 2.6 3.6 5.1 3.9-3.6.5-6.9-1.6-7.6-4.6-.5-2.2.6-4.4 2.6-5.7l1.7 1.7Z" fill="#EE6C2C" />
        </svg>
      );
    case "zend":
      // Zend — the framework's blue chevron block
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.4" y="4.4" width="19.2" height="15.2" rx="2.6" fill="#0B7EC8" />
          <path d="M7 9h10l-10 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "yii":
      // Yii — the framework's bold blue/green wordmark initial
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="4" fill="#0073BB" />
          <path d="M6.6 6.6 9.9 12v5.4" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.2 6.6 9.9 12" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="16.4" cy="8" r="1.3" fill="#8DC63F" />
          <path d="M16.4 11.2v6.2" stroke="#8DC63F" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "soap":
      // SOAP — an XML envelope, which is what the protocol puts on the wire
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.4" y="5" width="19.2" height="14" rx="2.4" fill="#4A6FA5" />
          <path d="m2.9 6.6 9.1 6.2 9.1-6.2" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8.6 16.4 6.8 14.6l1.8-1.8M15.4 16.4l1.8-1.8-1.8-1.8" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "json":
      // JSON — its two braces
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.6 3.4c-2.3 0-2.6 1.4-2.6 3.2 0 2-.5 3.3-2.2 3.4v2c1.7.1 2.2 1.4 2.2 3.4 0 1.8.3 3.2 2.6 3.2" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.4 3.4c2.3 0 2.6 1.4 2.6 3.2 0 2 .5 3.3 2.2 3.4v2c-1.7.1-2.2 1.4-2.2 3.4 0 1.8-.3 3.2-2.6 3.2" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="1.5" fill="#F5A623" />
        </svg>
      );
    case "ajax":
      // AJAX — the asynchronous request/response round trip
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.4 9.6a8 8 0 0 1 13.3-3.1" stroke="#2F74C0" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M19.6 14.4a8 8 0 0 1-13.3 3.1" stroke="#2F74C0" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M17.9 2.9v3.8h-3.8M6.1 21.1v-3.8h3.8" stroke="#2F74C0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "sass":
      // Sass's pink ampersand-in-a-circle mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.4" fill="#CD6799" />
          <path d="M16.6 10.1c-.7-1.4-3-1.6-4.9-1-1.7.6-2.6 1.7-2.3 2.8.3 1.2 1.9 1.7 3.2 2.3 1 .5 1.7 1 1.5 1.7-.2.8-1.5 1.1-2.5.8-.8-.2-1.2-.8-1-1.3.1-.4.5-.6.8-.7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

    case "pgvector":
      // Postgres elephant blue with a vector arrow
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#336791" />
          <path d="M7 17L17 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M11 7H17V13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "elasticsearch":
      // Elastic's teal/yellow/pink stacked crescents
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 9C6 4.5 12 3 17 5.5L12 9H4Z" fill="#FEC514" />
          <path d="M4 15C6 19.5 12 21 17 18.5L12 15H4Z" fill="#00BFB3" />
          <path d="M4 9H12L20 12L12 15H4C3.4 13 3.4 11 4 9Z" fill="#F04E98" />
        </svg>
      );
    case "cohere":
      // Cohere's coral/green/blue rounded quadrants
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#39594D" />
          <path d="M12 2A10 10 0 0 1 22 12H12V2Z" fill="#D18EE2" />
          <path d="M2 12A10 10 0 0 1 12 2V12H2Z" fill="#FF7759" />
        </svg>
      );
    case "sentencetransformers":
      // Two overlapping text lines mapped to a point
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#1F6FEB" />
          <path d="M6 8H14M6 12H12M6 16H10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="17" cy="15" r="2.5" fill="white" />
        </svg>
      );
    case "bge":
      // BAAI general embedding — layered bars in indigo
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#4F46E5" />
          <rect x="6" y="6" width="12" height="3" rx="1.5" fill="white" />
          <rect x="6" y="10.5" width="8" height="3" rx="1.5" fill="white" fillOpacity="0.8" />
          <rect x="6" y="15" width="10" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
        </svg>
      );
    case "haystack":
      // deepset Haystack — teal stack of hay lines
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#03AF9D" />
          <path d="M12 5L18 17H6L12 5Z" fill="white" />
          <path d="M9 13H15" stroke="#03AF9D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "unstructuredio":
      // Unstructured — document dissolving into blocks
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#0B7A75" />
          <rect x="6" y="6" width="5" height="5" rx="1" fill="white" />
          <rect x="13" y="6" width="5" height="5" rx="1" fill="white" fillOpacity="0.7" />
          <rect x="6" y="13" width="5" height="5" rx="1" fill="white" fillOpacity="0.7" />
          <rect x="13" y="13" width="5" height="5" rx="1" fill="white" fillOpacity="0.4" />
        </svg>
      );
    case "pymupdf":
      // PyMuPDF — red PDF page with a fold
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2H14L20 8V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2Z" fill="#E5322D" />
          <path d="M14 2V8H20" fill="#FF7A70" />
          <path d="M8 13H16M8 17H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "apachetika":
      // Apache Tika — feather-toned document mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#D22128" />
          <path d="M8 16C9 11 13 7 17 7C16 11 13 15 8 16Z" fill="white" />
          <path d="M8 16L14 10" stroke="#D22128" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "ragas":
      // Ragas — evaluation tick over a gradient disc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill={`url(#ragasGrad-${uid})`} />
          <path d="M7 12.5L10.5 16L17 8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id={`ragasGrad-${uid}`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "langsmith":
      // LangSmith — LangChain family, forged-link mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#1C3C3C" />
          <path d="M9 15L15 9" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
          <path d="M13.5 6.5L15 5A3 3 0 0 1 19 9L17.5 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M10.5 17.5L9 19A3 3 0 0 1 5 15L6.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "langfuse":
      // Langfuse — trace waveform in teal on navy
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#0A2540" />
          <path d="M5 14L8 10L11 15L14 8L17 13L19 11" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trulens":
      // TruLens — lens with a truth-check
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="7" stroke="#0EA5E9" strokeWidth="2.4" />
          <path d="M16 16L21 21" stroke="#0EA5E9" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M8 11L10 13L14 9" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "phoenix":
      // Arize Phoenix — rising flame mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#7C3AED" />
          <path d="M12 5C13 8 16 9.5 16 13A4 4 0 0 1 8 13C8 11 9.5 10 10 8.5C10.5 10 12 10.5 12 12C12.5 10 12.5 7.5 12 5Z" fill="white" />
        </svg>
      );
    case "fastapi":
      // FastAPI — teal disc with a lightning bolt
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#009688" />
          <path d="M13 4L7 13H11.5L10.5 20L17 11H12.5L13 4Z" fill="white" />
        </svg>
      );
    case "docker":
      // Docker — whale-blue container stack
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21C21 16.5 18 19.5 13 19.5C8 19.5 4.5 17 3 12Z" fill="#2496ED" />
          <rect x="5" y="8.5" width="3" height="3" fill="#2496ED" />
          <rect x="8.5" y="8.5" width="3" height="3" fill="#2496ED" />
          <rect x="12" y="8.5" width="3" height="3" fill="#2496ED" />
          <rect x="8.5" y="5" width="3" height="3" fill="#2496ED" />
          <rect x="12" y="5" width="3" height="3" fill="#2496ED" />
        </svg>
      );
    case "kubernetes":
      // Kubernetes — blue heptagon with the helm
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20.5 6.2L22.5 15.3L16.6 22H7.4L1.5 15.3L3.5 6.2L12 2Z" fill="#326CE5" />
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.6" />
          <path d="M12 6V9M12 15V18M6.5 9.5L9 11M15 13L17.5 14.5M6.5 14.5L9 13M15 11L17.5 9.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "postgresql":
    case "postgres":
      // PostgreSQL — elephant-blue disc with a database glyph
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#336791" />
          <ellipse cx="12" cy="8" rx="5" ry="2" fill="white" />
          <path d="M7 8V16C7 17.1 9.2 18 12 18C14.8 18 17 17.1 17 16V8" stroke="white" strokeWidth="1.8" />
          <path d="M7 12C7 13.1 9.2 14 12 14C14.8 14 17 13.1 17 12" stroke="white" strokeWidth="1.8" />
        </svg>
      );
    case "redis":
      // Redis — red stacked hexagonal cells
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L20 6.5L12 10L4 6.5L12 3Z" fill="#DC382D" />
          <path d="M4 10.5L12 14L20 10.5V13.5L12 17L4 13.5V10.5Z" fill="#DC382D" fillOpacity="0.8" />
          <path d="M4 15.5L12 19L20 15.5V18L12 21.5L4 18V15.5Z" fill="#DC382D" fillOpacity="0.6" />
        </svg>
      );
    case "airflow":
    case "apacheairflow":
      // Apache Airflow — teal pinwheel
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12L12 2C15 5 15 9 12 12Z" fill="#017CEE" />
          <path d="M12 12L22 12C19 15 15 15 12 12Z" fill="#00AD46" />
          <path d="M12 12L12 22C9 19 9 15 12 12Z" fill="#E43921" />
          <path d="M12 12L2 12C5 9 9 9 12 12Z" fill="#11E1EE" />
        </svg>
      );
    case "c":
    case "cpp":
      // C++ — blue hex with the ++ mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z" fill="#00599C" />
          <path d="M12 8.2A3.8 3.8 0 108 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15 10.5v3M13.5 12h3M18.5 10.5v3M17 12h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "opencv":
      // OpenCV — three coloured rings
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="5.8" r="3.6" stroke="#E4322B" strokeWidth="2.6" />
          <circle cx="6.4" cy="16" r="3.6" stroke="#5CAE48" strokeWidth="2.6" />
          <circle cx="17.6" cy="16" r="3.6" stroke="#2A5BB4" strokeWidth="2.6" />
        </svg>
      );
    case "torchvision":
    case "pytorch":
      // PyTorch — flame with the orbiting dot
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.5l4.9 4.9a7 7 0 11-9.9 0L9.2 5.2v3.1l-1 1a5.4 5.4 0 107.6 0L12 5.7V2.5z" fill="#EE4C2C" />
          <circle cx="15.1" cy="7.4" r="1.15" fill="#EE4C2C" />
        </svg>
      );
    case "tensorflow":
      // TensorFlow — the two orange chevrons
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L21 7.2v3.4l-6-3.4v3.4l3 1.7v3.4l-6-3.4V2z" fill="#FF6F00" />
          <path d="M12 2L3 7.2v9.6L7.5 19.4V9.6L12 7v-5z" fill="#FFA800" />
          <path d="M12 15.1v6.9l3-1.7v-3.4l-3-1.8z" fill="#FF6F00" />
        </svg>
      );
    case "pillow":
      // Pillow (PIL) — image tile with a mountain
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="4" width="19" height="16" rx="3" fill="#1F6FB2" />
          <circle cx="8" cy="9" r="1.7" fill="#FFD43B" />
          <path d="M4.5 17l4.5-5 3.2 3.6 2.6-2.6L19.5 17H4.5z" fill="white" />
        </svg>
      );
    case "numpy":
      // NumPy — interlocking blue/cyan cubes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l8 4.2-8 4.2-8-4.2L12 2z" fill="#4DABCF" />
          <path d="M4 7.3l7 3.7v8.3l-7-3.7V7.3z" fill="#4D77CF" />
          <path d="M20 7.3l-7 3.7v8.3l7-3.7V7.3z" fill="#013243" />
        </svg>
      );
    case "ffmpeg":
      // FFmpeg — green play chevrons
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#3B7A3B" />
          <path d="M7 7l5 5-5 5V7z" fill="white" />
          <path d="M13 7l5 5-5 5V7z" fill="#7BC043" />
        </svg>
      );
    case "gstreamer":
      // GStreamer — pipeline of linked blocks
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#7A2E8E" />
          <rect x="5" y="9" width="5" height="6" rx="1.4" fill="white" />
          <rect x="14" y="9" width="5" height="6" rx="1.4" fill="white" />
          <path d="M10 12h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "tesseract":
      // Tesseract — nested cube (a hypercube in outline)
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#2B2B2B" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="1.6" stroke="white" strokeWidth="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5" />
          <path d="M5.5 5.5L9 9M18.5 5.5L15 9M5.5 18.5L9 15M18.5 18.5L15 15" stroke="white" strokeWidth="1.2" />
        </svg>
      );
    case "paddleocr":
    case "paddlepaddle":
      // PaddleOCR — blue disc with a text-scan bracket
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#0F6BFF" />
          <path d="M7 8V6.5h2.5M17 8V6.5h-2.5M7 16v1.5h2.5M17 16v1.5h-2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 11h8M8 14h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "onnx":
      // ONNX — connected graph nodes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#5B5B5B" />
          <circle cx="7" cy="8" r="2" fill="#FFF" />
          <circle cx="7" cy="16" r="2" fill="#FFF" />
          <circle cx="16" cy="12" r="2.4" fill="#7CC0FF" />
          <path d="M9 8.8l4.8 2.4M9 15.2l4.8-2.4" stroke="white" strokeWidth="1.4" />
        </svg>
      );
    case "tensorrt":
      // TensorRT — NVIDIA green speed mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#76B900" />
          <path d="M13.5 4L7 13h4l-1.5 7L17 11h-4.2l0.7-7z" fill="white" />
        </svg>
      );
    case "openvino":
      // OpenVINO — Intel-blue disc with a routed path
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#0068B5" />
          <path d="M6 15l4-6 4 6 4-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "rest":
    case "restapi":
      // REST — endpoint braces around a link
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#2D6A9F" />
          <path d="M9 7.5C7 7.5 7.6 12 6 12c1.6 0 1 4.5 3 4.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M15 7.5c2 0 1.4 4.5 3 4.5-1.6 0-1 4.5-3 4.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "graphql":
      // GraphQL — pink hexagon of linked nodes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.6l8.1 4.7v9.4L12 21.4 3.9 16.7V7.3L12 2.6z" stroke="#E10098" strokeWidth="1.5" />
          <path d="M12 4l7 12H5L12 4z" stroke="#E10098" strokeWidth="1.5" />
          <circle cx="12" cy="3.4" r="1.7" fill="#E10098" />
          <circle cx="19.4" cy="16.6" r="1.7" fill="#E10098" />
          <circle cx="4.6" cy="16.6" r="1.7" fill="#E10098" />
        </svg>
      );
    case "apolloclient":
    case "apollo":
      // Apollo Client — the GraphQL client's dark orbit-ring mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#311C87" />
          <ellipse cx="12" cy="12" rx="7" ry="3" stroke="white" strokeWidth="1.6" transform="rotate(-20 12 12)" />
          <circle cx="12" cy="12" r="2.3" fill="white" />
        </svg>
      );
    case "graphiql":
      // GraphiQL — the in-browser query IDE's own prompt, on a dark editor tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#1B1B1B" />
          <path d="M7 9l3 3-3 3" stroke="#E10098" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15h5" stroke="#E10098" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "oauth20":
    case "oauth2":
    case "oauth":
      // OAuth — a shield and key for delegated, token-based access
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.6l7 3v6c0 5-3 8.4-7 9.8-4-1.4-7-4.8-7-9.8v-6l7-3z" fill="#3B82F6" />
          <circle cx="10.4" cy="11" r="2" stroke="white" strokeWidth="1.6" />
          <path d="M12 12.4L16 16.4M14.4 14L16 12.6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "jwt":
      // JWT — its own three dot-joined segments (header.payload.signature)
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="8" width="6" height="8" rx="2" fill="#FB015B" />
          <rect x="9" y="8" width="6" height="8" rx="2" fill="#D63AFF" />
          <rect x="16.5" y="8" width="6" height="8" rx="2" fill="#4A90D9" />
          <circle cx="8.2" cy="12" r="0.9" fill="white" />
          <circle cx="15.8" cy="12" r="0.9" fill="white" />
        </svg>
      );
    case "mongodb":
      // MongoDB — the green leaf
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1.8c2.6 3.2 5.4 6 5.4 10.2 0 3.7-2.4 6.6-5.4 8-3-1.4-5.4-4.3-5.4-8C6.6 7.8 9.4 5 12 1.8z" fill="#4DB33D" />
          <path d="M12 1.8v18.2c-3-1.4-5.4-4.3-5.4-8C6.6 7.8 9.4 5 12 1.8z" fill="#3F9430" />
          <path d="M12 20v2.2" stroke="#B8C4C2" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "pytest":
      // pytest — blue check inside a test tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#0A9EDC" />
          <path d="M6 6.5h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 6.5v6.2l-2 4.8h10l-2-4.8V6.5" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "jenkins":
      // Jenkins — the butler bust
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#D33833" />
          <circle cx="12" cy="9" r="3.6" fill="#F0D6B7" />
          <path d="M5.5 20c0-3.6 2.9-5.8 6.5-5.8s6.5 2.2 6.5 5.8" fill="white" />
          <path d="M9.4 8.2h1.2M13.4 8.2h1.2" stroke="#335061" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "github":
    case "git":
      // GitHub — the mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"
            fill="currentColor"
          />
        </svg>
      );
    case "googlebigquery":
      // BigQuery — the blue disc with its cut segment
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" fill="#4285F4" />
          <circle cx="11" cy="11" r="4.2" fill="white" />
          <circle cx="11" cy="11" r="2" fill="#4285F4" />
          <path d="M16.8 16.8L21 21" stroke="#4285F4" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "amazonredshift":
      // Redshift — the analytics-purple cluster cube
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.5l8 4v11l-8 4-8-4v-11l8-4z" fill="#8C4FFF" />
          <path d="M12 2.5v19l8-4v-11l-8-4z" fill="#7433E6" />
          <path d="M8 9.5v6M12 7.5v9M16 9.5v6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "azuresynapse":
      // Synapse — linked Azure nodes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 7.5l5.5-4.5 5.5 4.5v9L12 21l-5.5-4.5v-9z" fill="#0078D4" />
          <circle cx="12" cy="12" r="2.6" fill="white" />
          <path d="M12 3v6.4M12 14.6V21M6.5 7.5l3.3 3.2M17.5 7.5l-3.3 3.2" stroke="#50E6FF" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "amazons3":
      // S3 — the green bucket
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5h16l-1.8 15.2a1 1 0 01-1 .8H6.8a1 1 0 01-1-.8L4 5z" fill="#569A31" />
          <path d="M12 5v16h5.2a1 1 0 001-.8L20 5h-8z" fill="#3F7A22" />
          <ellipse cx="12" cy="5" rx="8" ry="2" fill="#7DBF52" />
        </svg>
      );
    case "azuredatalakestorage":
      // Data Lake Storage — Azure layers over water
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#50E6FF" />
          <path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="#0078D4" />
          <path d="M4 15.5c2 0 2 1.6 4 1.6s2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6" stroke="#50E6FF" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 19c2 0 2 1.6 4 1.6s2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6" stroke="#0078D4" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "googlecloudstorage":
      // Cloud Storage — the stacked Google-blue buckets
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="6" rx="1.6" fill="#4285F4" />
          <rect x="3" y="14" width="18" height="6" rx="1.6" fill="#AECBFA" />
          <circle cx="17.5" cy="7" r="1.2" fill="white" />
          <circle cx="17.5" cy="17" r="1.2" fill="#4285F4" />
        </svg>
      );
    case "deltalake":
      // Delta Lake — the delta above the waterline
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l7.5 12H4.5L12 3z" fill="#00ADD4" />
          <path d="M12 8.6l3.6 6.4H8.4L12 8.6z" fill="#0B2F44" />
          <path d="M3 18.4c2 0 2 1.6 4 1.6s2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6" stroke="#00ADD4" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "apacheiceberg":
      // Iceberg — the mass above and below the surface
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.5l5.5 9h-11l5.5-9z" fill="#8FD6F5" />
          <path d="M12 21.5L4 12h16l-8 9.5z" fill="#2C7BE5" />
          <path d="M3 11.8h18" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "awsglue":
      // Glue — the analytics-purple flask
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2.8h4v5.4l4.6 8.2A2.4 2.4 0 0116.5 20h-9a2.4 2.4 0 01-2.1-3.6L10 8.2V2.8z" fill="#8C4FFF" />
          <path d="M7.4 14.6h9.2l1.9 3.4H5.5l1.9-3.4z" fill="#C7A6FF" />
          <path d="M9 2.8h6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "azuredatafactory":
      // Data Factory — the Azure gear pair
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9.2" cy="9.2" r="5.4" stroke="#0078D4" strokeWidth="2.4" />
          <circle cx="16" cy="16" r="3.8" stroke="#50E6FF" strokeWidth="2.2" />
          <circle cx="9.2" cy="9.2" r="1.6" fill="#0078D4" />
        </svg>
      );
    case "googlecloudcomposer":
      // Composer — the scheduled loop
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12a8 8 0 10-2.6 5.9" stroke="#4285F4" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20.4 12.8l-2.8 4.6-4.6-2" stroke="#34A853" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2.4" fill="#FBBC05" />
        </svg>
      );
    case "dagster":
      // Dagster — the indigo asset graph
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#4F43DD" />
          <path d="M8 8h3.4v3.4H8zM12.6 12.6H16V16h-3.4z" fill="white" />
          <path d="M11.4 9.7h2.4v2.9" stroke="white" strokeWidth="1.3" />
        </svg>
      );
    case "prefect":
      // Prefect — the chevron triangle
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.6L21.4 19H2.6L12 2.6z" fill="#115AF4" />
          <path d="M12 8.4L17 17H7l5-8.6z" fill="#0B2F44" />
        </svg>
      );
    case "apachespark":
      // Spark — the radiating arc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.4l1.9 5.8 5.8 1.9-5.8 1.9L12 17.8l-1.9-5.8L4.3 10l5.8-1.9L12 2.4z" fill="#E25A1C" />
          <path d="M6.4 19.4c3.6 1.8 7.6 1.8 11.2 0" stroke="#E25A1C" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "awsemr":
      // EMR — the purple cluster
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.2" fill="#8C4FFF" />
          <circle cx="12" cy="7.2" r="1.9" fill="white" />
          <circle cx="7.6" cy="15" r="1.9" fill="white" />
          <circle cx="16.4" cy="15" r="1.9" fill="white" />
          <path d="M12 9.1l-4.4 5.9M12 9.1l4.4 5.9M9.5 15h5" stroke="white" strokeWidth="1.2" />
        </svg>
      );
    case "pandas":
      // pandas — the navy plate of coloured bars
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#150458" />
          <rect x="6.4" y="5.4" width="2.6" height="6" rx="1.3" fill="#E70488" />
          <rect x="6.4" y="13.4" width="2.6" height="5.2" rx="1.3" fill="#E70488" />
          <rect x="10.7" y="5.4" width="2.6" height="13.2" rx="1.3" fill="#FFCA00" />
          <rect x="15" y="5.4" width="2.6" height="5.2" rx="1.3" fill="#E70488" />
          <rect x="15" y="12.6" width="2.6" height="6" rx="1.3" fill="#E70488" />
        </svg>
      );
    case "apachekafka":
      // Kafka — the broker and its connected nodes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="2.4" fill="currentColor" />
          <circle cx="7.6" cy="4.6" r="2.1" fill="currentColor" />
          <circle cx="7.6" cy="19.4" r="2.1" fill="currentColor" />
          <circle cx="17.6" cy="12" r="2.1" fill="currentColor" />
          <path d="M9.4 11l-1.8-5M9.4 13l-1.8 5M14.4 12h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "awskinesis":
      // Kinesis — the purple stream
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7.5c3 0 3 2 6 2s3-2 6-2 3 2 6 2" stroke="#8C4FFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 12.5c3 0 3 2 6 2s3-2 6-2 3 2 6 2" stroke="#C7A6FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 17.5c3 0 3 2 6 2s3-2 6-2 3 2 6 2" stroke="#8C4FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "googlepubsub":
      // Pub/Sub — one publisher fanning out to subscribers
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.6" y="9.4" width="5.2" height="5.2" rx="1.4" fill="#4285F4" />
          <rect x="16.2" y="3.4" width="5.2" height="5.2" rx="1.4" fill="#34A853" />
          <rect x="16.2" y="15.4" width="5.2" height="5.2" rx="1.4" fill="#EA4335" />
          <path d="M8.4 11.4l7.2-4.6M8.4 12.8l7.2 4.6" stroke="#AECBFA" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "azureeventhubs":
      // Event Hubs — the hub with arriving events
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4.4" fill="#0078D4" />
          <path d="M12 2.6v3.4M12 18v3.4M2.6 12H6M18 12h3.4" stroke="#50E6FF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5.4 5.4l2.4 2.4M18.6 18.6l-2.4-2.4M5.4 18.6l2.4-2.4M18.6 5.4l-2.4 2.4" stroke="#0078D4" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "apacheflink":
      // Flink — the squirrel's curl
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4.6c-6.4 0-11 3.4-11 8.2 0 3.4 2.6 6.6 6.6 6.6 2.6 0 4.4-1.6 4.4-3.6 0-1.8-1.4-3-3-3-1.2 0-2.2.7-2.2 1.8" stroke="#E6526F" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="17.4" cy="5.4" r="1.9" fill="#E6526F" />
        </svg>
      );
    case "dbt":
      // dbt — the orange hourglass mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FF694A" />
          <path d="M7.6 6.4l8.8 11.2M16.4 6.4L7.6 17.6" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "sql":
      // SQL — the query cylinder
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6.2v11.6c0 1.4 3.6 2.4 8 2.4s8-1 8-2.4V6.2" fill="#4C9AFF" />
          <ellipse cx="12" cy="6.2" rx="8" ry="2.4" fill="#9EC7FF" />
          <path d="M4 12c0 1.4 3.6 2.4 8 2.4s8-1 8-2.4" stroke="white" strokeWidth="1.4" />
        </svg>
      );
    case "apachebeam":
      // Beam — the converging light beam
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.2" stroke="#E8A33D" strokeWidth="2" />
          <path d="M12 3.2L8.2 20.4M12 3.2l3.8 17.2M4.2 9.6h15.6" stroke="#E8A33D" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "mysql":
      // MySQL — the teal store with its amber dolphin fin
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6.6v10.8c0 1.3 3.6 2.4 8 2.4s8-1.1 8-2.4V6.6" fill="#00758F" />
          <ellipse cx="12" cy="6.6" rx="8" ry="2.4" fill="#0A94B0" />
          <path d="M7 17.4c3.4 0 5.6-2.2 6.6-5.4 1.4 1.2 2.6 2 4.4 2.2" stroke="#F29111" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "microsoftsqlserver":
      // SQL Server — the red server stack
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="5.2" rx="1.6" fill="#CC2927" />
          <rect x="3" y="10.8" width="18" height="5.2" rx="1.6" fill="#E24B49" />
          <rect x="3" y="17.6" width="18" height="2.8" rx="1.4" fill="#CC2927" />
          <circle cx="6.6" cy="6.6" r="1" fill="white" />
          <circle cx="6.6" cy="13.4" r="1" fill="white" />
        </svg>
      );
    case "oracle":
      // Oracle — the red ring wordmark shape
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.2" y="7" width="19.6" height="10" rx="5" stroke="#F80000" strokeWidth="2.6" />
        </svg>
      );
    case "amazonrds":
      // RDS — the managed relational store
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.4 7v10c0 1.3 3.4 2.4 7.6 2.4s7.6-1.1 7.6-2.4V7" fill="#527FFF" />
          <ellipse cx="12" cy="7" rx="7.6" ry="2.4" fill="#89A9FF" />
          <path d="M9.4 12.8l2.6 2.6 2.6-2.6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "amazondynamodb":
      // DynamoDB — the striped document store
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.4 6.4v11.2c0 1.3 3.4 2.4 7.6 2.4s7.6-1.1 7.6-2.4V6.4" fill="#4053D6" />
          <ellipse cx="12" cy="6.4" rx="7.6" ry="2.4" fill="#7B88E8" />
          <path d="M7.4 11.6h9.2M7.4 15h9.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "cassandra":
      // Cassandra — the blue eye
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.2 12c2.8-4 6-6 9.8-6s7 2 9.8 6c-2.8 4-6 6-9.8 6s-7-2-9.8-6z" fill="#1287B1" />
          <circle cx="12" cy="12" r="3.2" fill="white" />
          <circle cx="12" cy="12" r="1.5" fill="#0B4F68" />
        </svg>
      );
    case "fivetran":
      // Fivetran — sources converging into one line
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.4h5M3 12h9M3 18.6h5" stroke="#1C46F2" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M8 5.4l4.6 6.6L8 18.6" stroke="#1C46F2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18.6" cy="12" r="2.6" fill="#1C46F2" />
        </svg>
      );
    case "airbyte":
      // Airbyte — the purple ribbon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.4 19V9.4a4.4 4.4 0 018.8 0V14a2.4 2.4 0 104.8 0V5" stroke="#615EFF" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="18.6" cy="4.6" r="2" fill="#615EFF" />
        </svg>
      );
    case "apachenifi":
      // NiFi — the routed flow
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.6" y="9.4" width="5" height="5.2" rx="1.4" fill="#1891C3" />
          <rect x="16.4" y="3.6" width="5" height="5.2" rx="1.4" fill="#728E9B" />
          <rect x="16.4" y="15.2" width="5" height="5.2" rx="1.4" fill="#728E9B" />
          <path d="M7.6 11.4h4.2V6.2h4.6M7.6 12.6h4.2v5.2h4.6" stroke="#1891C3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "powerbi":
      // Power BI — the yellow column chart
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.4" y="13" width="4.6" height="8" rx="1.4" fill="#E8B000" />
          <rect x="9.7" y="8" width="4.6" height="13" rx="1.4" fill="#F2C811" />
          <rect x="16" y="3" width="4.6" height="18" rx="1.4" fill="#FBDE6A" />
        </svg>
      );
    case "tableau":
      // Tableau — the cross of marks
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.6v18.8M2.6 12h18.8" stroke="#E97627" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M6.4 6.4v5M3.9 8.9h5M17.6 12.6v5M15.1 15.1h5" stroke="#E97627" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "looker":
      // Looker — the petal over the circle
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8.4" cy="8" r="4.2" stroke="#4285F4" strokeWidth="2" />
          <path d="M14.4 9.6a5.6 5.6 0 11-4.6 9.8 5.6 5.6 0 014.6-9.8z" fill="#5F63F2" />
        </svg>
      );
    case "amazonquicksight":
      // QuickSight — the inspected chart
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="4" fill="#8C4FFF" />
          <rect x="6.2" y="12.6" width="2.6" height="5.2" rx="1.3" fill="white" />
          <rect x="10.7" y="9.4" width="2.6" height="8.4" rx="1.3" fill="white" />
          <rect x="15.2" y="6.2" width="2.6" height="11.6" rx="1.3" fill="white" />
        </svg>
      );
    case "metabase":
      // Metabase — the dot matrix
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="2" fill="#509EE3" />
          <circle cx="12" cy="5.2" r="2" fill="#509EE3" />
          <circle cx="18" cy="6" r="2" fill="#88C1EE" />
          <circle cx="6" cy="12" r="2" fill="#88C1EE" />
          <circle cx="12" cy="12" r="2" fill="#509EE3" />
          <circle cx="18" cy="12" r="2" fill="#509EE3" />
          <circle cx="9" cy="18" r="2" fill="#509EE3" />
          <circle cx="15" cy="18" r="2" fill="#88C1EE" />
        </svg>
      );
    case "greatexpectations":
      // Great Expectations — the passing check
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.4" stroke="#FF6310" strokeWidth="2.2" />
          <path d="M7.4 12.4l3.2 3.2 6-6.6" stroke="#FF6310" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "apacheatlas":
      // Atlas — the catalogued lineage globe
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.2" stroke="#2E6E9E" strokeWidth="2" />
          <path d="M12 2.8c2.6 2.6 2.6 15.8 0 18.4M12 2.8c-2.6 2.6-2.6 15.8 0 18.4M2.8 12h18.4" stroke="#2E6E9E" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#2E6E9E" />
        </svg>
      );
    case "montecarlo":
      // Monte Carlo — the monitored distribution
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.6 18.4c3.4 0 3.4-12 9.4-12s6 12 9.4 12" stroke="#5B7FFF" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M2.6 21h18.8" stroke="#2F4FD6" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="6.6" r="2" fill="#2F4FD6" />
        </svg>
      );
    case "scala":
      // Scala — the stacked red bands
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 5.2c4-1 8-1 12-2v4.2c-4 1-8 1-12 2V5.2z" fill="#DC322F" />
          <path d="M6 11.1c4-1 8-1 12-2v4.2c-4 1-8 1-12 2v-4.2z" fill="#E5534B" />
          <path d="M6 17c4-1 8-1 12-2v4.2c-4 1-8 1-12 2V17z" fill="#DC322F" />
        </svg>
      );
    case "terraform":
      // Terraform — the stacked purple blocks
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.4 4.4l5 2.9v5.8l-5-2.9V4.4z" fill="#7B42BC" />
          <path d="M9.5 7.9l5 2.9v5.8l-5-2.9V7.9z" fill="#9B58E0" />
          <path d="M15.6 7.9l5-2.9v5.8l-5 2.9V7.9z" fill="#7B42BC" />
          <path d="M9.5 15l5 2.9v5.8l-5-2.9V15z" fill="#9B58E0" />
        </svg>
      );
    case "cicd":
      // CI/CD — the build-and-release loop
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.4 12a8.4 8.4 0 01-13.8 6.4" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M3.6 12A8.4 8.4 0 0117.4 5.6" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M17.4 2.2v3.8h-3.8M6.6 21.8V18h3.8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "scipy":
      // SciPy — the blue curve over its axis
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.4" fill="#0053A0" />
          <path d="M5.6 14.6c2.4 0 2.4-5.4 4.8-5.4s2.4 5.4 4.8 5.4 2.4-2.6 3.2-3.4" stroke="#8CAAE6" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "statsmodels":
      // statsmodels — a fitted line through scattered observations
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.6 20.4V3.6M3.6 20.4h16.8" stroke="#4C6EA8" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5.6 17.4L19 6.6" stroke="#4C6EA8" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="8" cy="16.4" r="1.5" fill="#8FB2E0" />
          <circle cx="12.6" cy="11.4" r="1.5" fill="#8FB2E0" />
          <circle cx="17" cy="9.2" r="1.5" fill="#8FB2E0" />
        </svg>
      );
    case "scikitlearn":
      // scikit-learn — the orange and blue orbit
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="9.4" ry="4.6" transform="rotate(-32 12 12)" stroke="#F7931E" strokeWidth="1.9" />
          <ellipse cx="12" cy="12" rx="9.4" ry="4.6" transform="rotate(32 12 12)" stroke="#3499CD" strokeWidth="1.9" />
          <circle cx="12" cy="12" r="2.1" fill="#F7931E" />
        </svg>
      );
    case "xgboost":
      // XGBoost — the boosted tree
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="4.6" r="2.2" fill="#A21C2B" />
          <circle cx="6.6" cy="12" r="2.2" fill="#C7414F" />
          <circle cx="17.4" cy="12" r="2.2" fill="#C7414F" />
          <circle cx="17.4" cy="19.4" r="2.2" fill="#E0737E" />
          <path d="M10.6 6.2L8 10M13.4 6.2L16 10M17.4 14.2v3" stroke="#A21C2B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "lightgbm":
      // LightGBM — the leaf-wise split, struck light
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="2.1" fill="#4BA636" />
          <circle cx="6" cy="18" r="2.1" fill="#7EC242" />
          <circle cx="14" cy="12" r="2.1" fill="#4BA636" />
          <path d="M7.7 7.2L12.4 10.6M7.7 16.8l4.7-3.4" stroke="#4BA636" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19.6 4.4l-3.2 6h3l-3.4 5.6" stroke="#F2C811" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "matplotlib":
      // Matplotlib — the polar wedge dial
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.4" fill="#11557C" />
          <circle cx="12" cy="12" r="6" fill="white" />
          <path d="M12 12V4.4A7.6 7.6 0 0119 8.6L12 12z" fill="#F2C811" />
          <path d="M12 12l7-3.4a7.6 7.6 0 01-1.6 8.8L12 12z" fill="#4BA636" />
          <path d="M12 12l5.4 5.4A7.6 7.6 0 015 15L12 12z" fill="#3499CD" />
          <circle cx="12" cy="12" r="1.5" fill="#11557C" />
        </svg>
      );
    case "plotly":
      // Plotly — the navy plot with its coloured marks
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5" fill="#3F4F75" />
          <circle cx="7.4" cy="15.6" r="2" fill="#19D3F3" />
          <circle cx="12" cy="11.4" r="2" fill="#FF6692" />
          <circle cx="16.6" cy="7.6" r="2" fill="#FFA15A" />
        </svg>
      );
    case "jupyternotebook":
      // Jupyter — the three orbiting circles over the planet
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6.4" cy="3.6" r="1.7" fill="#767677" />
          <circle cx="17.6" cy="20.4" r="1.7" fill="#767677" />
          <path d="M4 9.2c1.6 3.2 5 5 8 5s6.4-1.8 8-5" stroke="#F37726" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M20 15.4c-1.6-3.2-5-5-8-5s-6.4 1.8-8 5" stroke="#F37726" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    case "jupyterlab":
      // JupyterLab — the same orange, as the workbench's panelled layout
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.6" y="3.4" width="18.8" height="17.2" rx="3" stroke="#F37726" strokeWidth="1.9" />
          <path d="M9 3.4v17.2" stroke="#F37726" strokeWidth="1.7" />
          <path d="M12 8.6h6.2M12 12h6.2M12 15.4h4" stroke="#767677" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "mlflow":
      // MLflow — the tracked run looping back
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18.6A8.6 8.6 0 0112 4.4a8.6 8.6 0 016.4 14.2" stroke="#0194E2" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M8.6 4.8L4.2 6.6l1 4.6" stroke="#0194E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="2.4" fill="#43C9ED" />
        </svg>
      );
    case "kotlin":
      // Kotlin — the folded gradient square
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18L12 12l9 9H3V3z" fill={`url(#kotlinGrad-${uid})`} />
          <path d="M3 3h9l-9 9V3z" fill="#7F52FF" />
          <defs>
            <linearGradient id={`kotlinGrad-${uid}`} x1="21" y1="3" x2="3" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E44857" />
              <stop offset="0.5" stopColor="#C711E1" />
              <stop offset="1" stopColor="#7F52FF" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "androidstudio":
      // Android Studio — the compass needle on the Android green
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="4.6" fill="#0F2A1D" />
          <path d="M16.8 7.2l-3 6.6-6.6 3 3-6.6 6.6-3z" fill="#3DDC84" />
          <circle cx="12" cy="12" r="1.7" fill="#0F2A1D" />
        </svg>
      );
    case "jetpack":
      // Jetpack — the Android-green stacked libraries
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.6l8.4 4.2-8.4 4.2-8.4-4.2L12 2.6z" fill="#3DDC84" />
          <path d="M3.6 11.4L12 15.6l8.4-4.2" stroke="#3DDC84" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.6 15.8L12 20l8.4-4.2" stroke="#2BA45F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "firebase":
      // Firebase — the amber flame
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.6 18.2L7.2 3.4l3.2 5.6L12.4 5l7 13.2-7.4 3.4-7.4-3.4z" fill="#FFA000" />
          <path d="M4.6 18.2L7.2 3.4l3.2 5.6-6 9.2z" fill="#FFCA28" />
          <path d="M12 21.6l7.4-3.4L12 8.6v13z" fill="#F57C00" />
        </svg>
      );
    case "swift":
      // Swift — the orange bird's swoop
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5" fill="#F05138" />
          <path d="M6.2 5.6c3.6 3.6 7 6.2 10.6 8.4-2.4 2.6-6.6 3-10.2 1 3.4 2.8 8.6 3.4 11.8.4 1-1 1-2.4.4-3.8-1.6-3.4-5-5.6-8.4-6H6.2z" fill="white" />
        </svg>
      );
    case "swiftui":
      // SwiftUI — the declarative layers behind the Swift orange
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5" fill="#F05138" />
          <rect x="6" y="5.8" width="12" height="4.2" rx="1.5" fill="white" />
          <rect x="6" y="11.6" width="7.6" height="2.6" rx="1.3" fill="white" opacity="0.85" />
          <rect x="6" y="15.6" width="12" height="2.6" rx="1.3" fill="white" opacity="0.6" />
        </svg>
      );
    case "xcode":
      // Xcode — the blue build hammer
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5" fill="#1C7BEA" />
          <path d="M8.6 6.2l5.6 2.2-1.4 3.4L7.2 9.6l1.4-3.4z" fill="white" />
          <path d="M11.2 11l5.4 6.2-1.9 1.6-4.6-6.4 1.1-1.4z" fill="white" />
        </svg>
      );
    case "apple":
      // Apple — the mark, for the platform SDKs
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.4 12.4c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.7 2.4 2.9 2.4 1.2 0 1.6-.7 3.1-.7 1.4 0 1.8.7 3.1.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.4-1-2.4-3.7z"
            fill="currentColor"
          />
          <path d="M14.2 4.8c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" fill="currentColor" />
        </svg>
      );
    case "flutter":
      // Flutter — the folded blue chevron
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.4 1.8L4.2 12l3.2 3.2L20.8 1.8h-6.4z" fill="#47C5FB" />
          <path d="M14.3 11.1l-4.9 4.9 3.2 3.3 4.9-4.9h-3.2z" fill="#00569E" />
          <path d="M9.4 16l3.2-3.2 3.2 3.2-3.2 3.2L9.4 16z" fill="#00B5F8" />
        </svg>
      );
    case "reactnative":
      // React Native — the React atom
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="9.6" ry="3.7" stroke="#61DAFB" strokeWidth="1.3" />
          <ellipse cx="12" cy="12" rx="9.6" ry="3.7" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.3" />
          <ellipse cx="12" cy="12" rx="9.6" ry="3.7" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.3" />
        </svg>
      );
    case "ionic":
      // Ionic — the orbiting ring
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.3" stroke="#3880FF" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.4" fill="#3880FF" />
          <circle cx="18.2" cy="5.8" r="2.2" fill="#3880FF" />
        </svg>
      );
    case "xamarin":
      // Xamarin — the interlocking X
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.4 3.4h9.2l4.6 8.6-4.6 8.6H7.4L2.8 12l4.6-8.6z" stroke="#3498DB" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8.6 8.4l6.8 7.2M15.4 8.4l-6.8 7.2" stroke="#3498DB" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "xml":
      // XML — the angle brackets around a tag
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.4 6.4L3.6 12l4.8 5.6M15.6 6.4L20.4 12l-4.8 5.6" stroke="#F1662A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.4 5.2l-2.8 13.6" stroke="#F1662A" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "sqlite":
      // SQLite — the blue feather over the store
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.4 6.6v10.8c0 1.3 3.4 2.4 7.6 2.4s7.6-1.1 7.6-2.4V6.6" fill="#0F80CC" />
          <ellipse cx="12" cy="6.6" rx="7.6" ry="2.4" fill="#62BAEA" />
          <path d="M18.6 4.4c-4 3.4-6.4 7.8-7.4 13.2l-1.8-3.2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "kafka":
      // Kafka's connected nodes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="4.5" r="2.3" fill="#231F20" />
          <circle cx="6.5" cy="12" r="2.3" fill="#231F20" />
          <circle cx="17.5" cy="12" r="2.3" fill="#231F20" />
          <circle cx="12" cy="19.5" r="2.3" fill="#231F20" />
          <path d="M12 6.8V17.2M10 11L8.4 11.4M13.9 11L15.6 11.4" stroke="#231F20" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    // "restapis" only: "restapi" and "rest" are handled above.
    case "restapis":
      // API braces
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#4B5563" />
          <path d="M9.6 7.8C8 7.8 8.2 10.4 6.8 10.9C8.2 11.4 8 14.2 9.6 14.2M14.4 7.8C16 7.8 15.8 10.4 17.2 10.9C15.8 11.4 16 14.2 14.4 14.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 17.5H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    // "enterprisedatabases" only: "postgresql" and "mysql" are handled above.
    case "enterprisedatabases":
      // Database cylinder
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="6" rx="7.5" ry="3.2" fill="#336791" />
          <path d="M4.5 6V18C4.5 19.8 7.9 21.2 12 21.2C16.1 21.2 19.5 19.8 19.5 18V6" fill="#336791" />
          <path d="M4.5 12C4.5 13.8 7.9 15.2 12 15.2C16.1 15.2 19.5 13.8 19.5 12" stroke="white" strokeWidth="1.3" />
        </svg>
      );
    case "deepeval":
      // Evaluation checkmark in a scoring frame
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#7C3AED" />
          <path d="M7.5 12.4L10.6 15.5L16.5 8.8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "guardrailsai":
    case "guardrails":
      // Shield guardrail
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.6L20 5.8V12C20 16.5 16.6 20.2 12 21.4C7.4 20.2 4 16.5 4 12V5.8L12 2.6Z" fill="#059669" />
          <path d="M8.3 12.2L11 14.9L15.9 9.6" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    /* ----------------------------------------------------------------
       Added for the hire-by-skill pages' tech-stack review ("some icons
       are missing"): collaboration tools, build/CI tools and a handful of
       common backend/service names that had none until now.
       ---------------------------------------------------------------- */
    case "gitlab":
      // GitLab's orange fox/tanuki
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.5 3.6 15 2 9.8 4.3 3l3.4 6.8h8.6L19.7 3 22 9.8 20.4 15 12 21.5Z" fill="#FC6D26" />
          <path d="M12 21.5 7.7 9.8H4.3L12 21.5Z" fill="#E24329" />
          <path d="M12 21.5 16.3 9.8h3.4L12 21.5Z" fill="#E24329" />
        </svg>
      );
    case "bitbucket":
      // Bitbucket's blue folded ribbon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#0052CC" />
          <path d="M4.8 7h14.4l-1.9 10H6.7L4.8 7Z" fill="white" />
          <path d="M9.4 13.4h5.2l.9-3.4H8.5l.9 3.4Z" fill="#0052CC" />
        </svg>
      );
    case "slack":
      // Slack's four-colour hash
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8.6" y="2" width="3.4" height="9" rx="1.7" fill="#36C5F0" />
          <rect x="2" y="8.6" width="9" height="3.4" rx="1.7" fill="#2EB67D" />
          <rect x="12" y="13" width="3.4" height="9" rx="1.7" fill="#ECB22E" />
          <rect x="13" y="12" width="9" height="3.4" rx="1.7" fill="#E01E5A" />
        </svg>
      );
    case "jira":
      // Jira's blue gradient chevrons
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2 6 8h12L12 2Z" fill="#2684FF" />
          <path d="M12 8.8 6.8 14h10.4L12 8.8Z" fill="#2684FF" fillOpacity="0.75" />
          <path d="M12 15.6 8 19.4h8L12 15.6Z" fill="#2684FF" fillOpacity="0.5" />
        </svg>
      );
    case "trello":
      // Trello's blue board with two cards
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#0079BF" />
          <rect x="4.6" y="4.6" width="6" height="11.4" rx="1.2" fill="white" />
          <rect x="13.4" y="4.6" width="6" height="7.4" rx="1.2" fill="#B6E0FF" />
        </svg>
      );
    case "asana":
      // Asana's three coral circles
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="4.6" r="3" fill="#F06A6A" />
          <circle cx="5.4" cy="16.4" r="3" fill="#F06A6A" />
          <circle cx="18.6" cy="16.4" r="3" fill="#F06A6A" />
        </svg>
      );
    case "webpack":
      // Webpack's blue faceted cube
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2 20.4 6.8V17.2L12 22 3.6 17.2V6.8L12 2Z" fill="#8ED6FB" />
          <path d="M12 2 20.4 6.8 12 11.6 3.6 6.8 12 2Z" fill="#1C78C0" />
          <path d="M12 11.6V22L3.6 17.2V6.8L12 11.6Z" fill="#8ED6FB" fillOpacity="0.6" />
        </svg>
      );
    case "babel":
      // Babel's yellow chevron mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#F5DA55" />
          <path d="M8 8.5 12 12l-4 3.5M16 8.5 12 12l4 3.5" stroke="#151515" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "axios":
      // Axios's purple "a" swoosh
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#5A29E4" />
          <path d="M6.5 17 12 7l5.5 10M9 13.5h6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "bootstrap":
      // Bootstrap's purple "B"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#7952B3" />
          <path
            d="M8.4 6.4h4.5c1.9 0 3.1 1 3.1 2.6 0 1.1-.6 1.9-1.6 2.2 1.2.3 2 1.2 2 2.6 0 1.8-1.4 2.8-3.4 2.8H8.4V6.4Zm1.9 3.9h2.3c.9 0 1.4-.4 1.4-1.1s-.5-1.1-1.4-1.1h-2.3v2.2Zm0 4h2.5c1 0 1.6-.4 1.6-1.2s-.6-1.2-1.6-1.2h-2.5v2.4Z"
            fill="white"
          />
        </svg>
      );
    case "stripe":
      // Stripe's indigo "S"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#635BFF" />
          <path
            d="M15.6 9.2c0-1-.9-1.5-2.3-1.5-1.5 0-2.6.6-2.6 1.7 0 2.6 5.9 1.3 5.9 5.4 0 2.2-1.9 3.6-4.7 3.6-1.9 0-3.6-.6-4.5-1.4l.7-1.9c.9.7 2.2 1.2 3.7 1.2 1.5 0 2.5-.6 2.5-1.7 0-2.7-5.8-1.4-5.8-5.4 0-2 1.7-3.5 4.4-3.5 1.7 0 3.1.5 4 1.2l-.7 1.9c-.2-.2-.4-.4-.6-.6Z"
            fill="white"
          />
        </svg>
      );
    case "paypal":
      // PayPal's two-tone blue "P"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.3 18.4 9.7 9.8c.2-1.1 1.1-1.9 2.2-1.9h3.1c2.6 0 4.2 1.5 3.9 3.9-.3 2.8-2.3 4.4-5.1 4.4h-1.6l-.6 3.3-3.3-1.1Z"
            fill="#003087"
          />
          <path
            d="M6.1 15.4 7.5 6.8c.2-1.1 1.1-1.9 2.2-1.9h3.1c2.6 0 4.2 1.5 3.9 3.9-.3 2.8-2.3 4.4-5.1 4.4H9.9l-.5 3.3-3.3-1.1Z"
            fill="#009CDE"
          />
        </svg>
      );
    case "twilio":
      // Twilio's red four-dot ring
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#F22F46" />
          <circle cx="9" cy="9" r="1.8" fill="white" />
          <circle cx="15" cy="9" r="1.8" fill="white" />
          <circle cx="9" cy="15" r="1.8" fill="white" />
          <circle cx="15" cy="15" r="1.8" fill="white" />
        </svg>
      );
    case "apache":
      // Apache feather
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 20c3-6 3-11 7-16-3 5-2 8-1 10 1-3 3-5 6-6-2 2-2 4-1 6 2-1 4-1 6 0-4 1-6 3-7 6-3-1-6-1-10 0Z"
            fill="#D22128"
          />
        </svg>
      );
    case "nginx":
      // Nginx's green brick-stack mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" fill="#009639" />
          <path d="M8.4 8.2 12 13.4V8.2h1.6v7.6H12L8.4 10.6v5.2H6.8V8.2h1.6Z" fill="white" />
        </svg>
      );
    case "heroku":
      // Heroku's purple violet badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#430098" />
          <path d="M7 18V6h2v5l3.5-3.2V6H14v12h-2v-5.6L8.5 15V18H7Z" fill="white" />
          <path d="M15.5 9.4c1-.7 2.4-.4 2.4 1V13h-1.7v-2c0-.5-.3-.6-.7-.4l-1.5 1V13h-1.7V6h1.7v3.9l1.5-.5Z" fill="white" />
        </svg>
      );
    case "digitalocean":
      // DigitalOcean's blue circle mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a10 10 0 1 0 0 20v-4a6 6 0 1 1 0-12V2Z" fill="#0080FF" />
          <rect x="12" y="16" width="4" height="4" fill="#0080FF" />
          <rect x="8" y="16" width="3" height="3" fill="#0080FF" fillOpacity="0.6" />
          <rect x="12" y="12.5" width="3" height="3" fill="#0080FF" fillOpacity="0.6" />
        </svg>
      );
    case "vscode":
      // VS Code's blue folded-ribbon mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5 2.5 8 10 4 7l-1.5 1L7 12l-4.5 4 1.5 1 4-3 8.5 7.5 4-2V4.5l-4-2Zm0 4.4v10.2L10 12l6.5-5.1Z"
            fill="#007ACC"
          />
        </svg>
      );
    case "sentry":
      // Sentry's dark logomark loop
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#362D59" />
          <path
            d="M12 5.5c-.5 0-1 .3-1.3.8L6 15.4c-.6 1.1.2 2.4 1.4 2.4h1.7c0-2.5 1.4-4.4 3.9-4.4h4.6L13.3 6.3c-.3-.5-.8-.8-1.3-.8Z"
            fill="white"
          />
        </svg>
      );
    case "newrelic":
      // New Relic's teal circular gauge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#008C99" />
          <path d="M12 6v6l4.2 2.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "datadog":
      // Datadog's purple dog-bone mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.8 15.2c1.2-.4 1.9-1.5 1.6-2.7-.2-1-1.1-1.7-2.1-1.7l-1-3.4c-.3-1-1.2-1.6-2.2-1.4-.9.2-1.5 1-1.5 1.9v2.5L8 7.7C7.4 7 6.4 6.9 5.6 7.4c-.9.6-1.1 1.8-.5 2.6l2.4 3.3-2.6 1c-.9.4-1.4 1.4-1 2.4.4.9 1.4 1.3 2.3 1l3.1-1.2 6.2 1.2c1 .2 2-.4 2.3-1.4v-1.1Z"
            fill="#632CA6"
          />
        </svg>
      );
    case "mailchimp":
      // Mailchimp's yellow circle with a chimp-freckle dot pattern
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFE01B" />
          <circle cx="9" cy="10.5" r="1" fill="#241C15" />
          <circle cx="15" cy="10.5" r="1" fill="#241C15" />
          <path d="M8.5 15c1.2 1 5.8 1 7 0" stroke="#241C15" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "typeform":
      // Typeform's black square-dot mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#262627" />
          <circle cx="12" cy="12" r="4.5" fill="#FA7268" />
        </svg>
      );
    case "circleci":
      // CircleCI's dark ringed dot
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#151515" />
          <circle cx="12" cy="12" r="7" fill="none" stroke="white" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.6" fill="white" />
        </svg>
      );
    case "travisci":
      // Travis CI's red/blue chevron badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#3EAAAF" />
          <path d="M8 15V9l4 3 4-3v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "junit":
      // JUnit's green checkmark badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#25A162" />
          <path d="M7.5 12.4 10.6 15.5 16.5 8.8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mockito":
      // Mockito's orange mock-glasses mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="13" r="4" fill="none" stroke="#C5D93D" strokeWidth="1.8" />
          <circle cx="16" cy="13" r="4" fill="none" stroke="#C5D93D" strokeWidth="1.8" />
          <path d="M12 13h0M4.2 13H2M22 13h-2.2" stroke="#C5D93D" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "espresso":
      // Espresso's coffee-cup mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-5Z" fill="#6F4E37" />
          <path d="M16 11h1.5a2.2 2.2 0 0 1 0 4.4H16" stroke="#6F4E37" strokeWidth="1.6" />
          <path d="M8 8.5c0-1 1-1 1-2M12 8.5c0-1 1-1 1-2" stroke="#6F4E37" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "gradle":
      // Gradle's blue-grey elephant/spanner mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.5 6.5c1.3 1.3 1.3 3.4 0 4.7l-1 1 3.5 3.5-2.1 2.1L14.4 14.3l-1 1c-1.3 1.3-3.4 1.3-4.7 0-1.3-1.3-1.3-3.4 0-4.7l6.8-6.8c1.3-1.3 3.4-1.3 4.7 0-.9-.9-1.8-.4-2.7.5Z"
            fill="#02303A"
          />
        </svg>
      );
    case "maven":
      // Maven's orange-brown "m" badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#C71A36" />
          <path d="M6.5 17V7h2l3.5 6 3.5-6h2v10h-1.9v-6.6L12.6 17h-1.2L8.4 10.4V17H6.5Z" fill="white" />
        </svg>
      );
    /* ----------------------------------------------------------------
       Added for the hire-by-role technology bands ("update the missing
       icons"): every product those stacks name that had no mark here.
       ---------------------------------------------------------------- */
    case "express":
      // Express — its monochrome "ex" wordmark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.8" y="1.8" width="20.4" height="20.4" rx="5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5.4 12.4h5.2c0-1.9-1.1-3.1-2.6-3.1s-2.6 1.3-2.6 3.1 1.1 3.1 2.6 3.1c1 0 1.8-.5 2.3-1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 9.4l5.4 6.2M18.4 9.4L13 15.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "golang":
      // Go — the cyan "GO" with its speed lines
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 9.8h3.6M.8 12.2h3.6M1.8 14.6h2.4" stroke="#00ADD8" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M13.3 9.7A3.6 3.6 0 1 0 14.1 12.4H11.2" stroke="#00ADD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="12" r="3.1" stroke="#00ADD8" strokeWidth="2" />
        </svg>
      );
    case "cloudwatch":
      // Amazon CloudWatch — AWS management pink tile, cloud under a lens
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#E7157B" />
          <path d="M7.6 15.5h6.6a2.6 2.6 0 0 0 .4-5.2 3.9 3.9 0 0 0-7.4-.9 3.1 3.1 0 0 0 .4 6.1z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="15.2" cy="15.2" r="2.3" fill="#E7157B" stroke="white" strokeWidth="1.4" />
          <path d="M16.9 16.9l1.9 1.9" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "redux":
      // Redux — the purple three-arm swirl
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#764ABC" />
          <g stroke="white" strokeWidth="1.6" strokeLinecap="round">
            <path d="M14.6 7.2c1.9 1.4 2.9 3.9 2.3 6.3" />
            <path d="M15.6 16.2c-2 1.4-4.8 1.6-6.8.2" />
            <path d="M7.2 14.4c-.7-2.3 0-4.9 1.9-6.4" />
          </g>
          <circle cx="12.6" cy="6.8" r="1.3" fill="white" />
          <circle cx="17.4" cy="15" r="1.3" fill="white" />
          <circle cx="7.4" cy="15.9" r="1.3" fill="white" />
        </svg>
      );
    case "springboot":
    case "spring":
      // Spring Boot — the green hexagon with its power mark
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l8.7 5v10L12 22l-8.7-5V7z" fill="#6DB33F" />
          <path d="M9.2 9.3a4.3 4.3 0 1 0 5.6 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 7.2v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "tailwindcss":
    case "tailwind":
      // Tailwind CSS — the sky-blue double wave
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.62C13.67 10.62 15.03 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.62C16.34 6.18 14.98 4.8 12 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.62C7.67 17.82 9.03 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.62C10.34 13.38 8.98 12 6 12z"
            fill="#38BDF8"
          />
        </svg>
      );
    case "jest":
      // Jest — the crimson "J" under its three dots
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6.5" cy="4.6" r="2" fill="#C21325" />
          <circle cx="12" cy="4.6" r="2" fill="#C21325" />
          <circle cx="17.5" cy="4.6" r="2" fill="#C21325" />
          <path d="M14.8 8.8v6.8a4 4 0 0 1-8 .4" stroke="#C21325" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case "vite":
      // Vite — the violet-to-blue chevron with its yellow bolt
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.6 4.3L12.5 20.4c-.2.4-.8.4-1 0L2.4 4.3c-.2-.4.1-.9.6-.8L12 5.1l9-1.6c.5-.1.8.4.6.8z" fill={`url(#viteGrad-${uid})`} />
          <path d="M15.9 2.4L9.4 3.7c-.1 0-.2.1-.2.2l-.4 6.8c0 .2.1.3.3.3l1.8-.4c.2 0 .3.1.3.3l-.5 2.6c0 .2.1.3.3.3l1.1-.3c.2 0 .3.1.3.3l-.8 4c-.1.3.3.4.4.2l.1-.1 4.4-8.8c.1-.2-.1-.4-.3-.3l-1.9.4c-.2 0-.3-.1-.3-.3l1.2-4.3c.1-.2-.1-.4-.3-.3z" fill="#FFC517" />
          <defs>
            <linearGradient id={`viteGrad-${uid}`} x1="2" y1="3" x2="14" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "vitest":
      // Vitest — the green check struck through by Vite's yellow bolt
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 12.5l6 6L20.5 6" stroke="#729B1B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.8 3.5L8.5 12h3.4l-1.6 7 5.6-9.2h-3.5l1.4-6.3z" fill="#FCC72B" />
        </svg>
      );
    case "npm":
      // npm — the white "n" in its red square
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#CB3837" />
          <path d="M6 18V6h12v12h-3V9h-3v9H6z" fill="white" />
        </svg>
      );
    case "yarn":
      // Yarn — a wound ball on the package manager's blue
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#2C8EBB" />
          <circle cx="12" cy="12" r="5.8" stroke="white" strokeWidth="1.5" />
          <path d="M7.6 10.2c2.4-.2 5.8.8 8.4 3.8M9 16.6c.6-2.6 2.6-5.4 5.6-7.2M11 6.6c1.6 1.6 2.6 4.4 2.4 10.8" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "pnpm":
      // pnpm — its grid of amber and grey squares
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="2.5" width="5.6" height="5.6" fill="#F9AD00" />
          <rect x="9.2" y="2.5" width="5.6" height="5.6" fill="#F9AD00" />
          <rect x="15.9" y="2.5" width="5.6" height="5.6" fill="#F9AD00" />
          <rect x="15.9" y="9.2" width="5.6" height="5.6" fill="#F9AD00" />
          <rect x="9.2" y="9.2" width="5.6" height="5.6" fill="#8A8A8A" />
          <rect x="2.5" y="15.9" width="5.6" height="5.6" fill="#8A8A8A" />
          <rect x="9.2" y="15.9" width="5.6" height="5.6" fill="#8A8A8A" />
          <rect x="15.9" y="15.9" width="5.6" height="5.6" fill="#8A8A8A" />
        </svg>
      );
    case "eslint":
      // ESLint — the indigo nested hexagons
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l8.7 5v10L12 22l-8.7-5V7z" fill="#4B32C3" />
          <path d="M12 6.6l4.7 2.7v5.4L12 17.4l-4.7-2.7V9.3z" stroke="#8080F2" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "prettier":
      // Prettier — its staggered colour bars
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#1A2B34" />
          <g strokeWidth="1.8" strokeLinecap="round">
            <path d="M5 6h7" stroke="#56B3B4" />
            <path d="M15 6h4" stroke="#EA5E5E" />
            <path d="M5 9.5h4" stroke="#BF85BF" />
            <path d="M12 9.5h7" stroke="#F7BA3E" />
            <path d="M5 13h9" stroke="#EA5E5E" />
            <path d="M17 13h2" stroke="#56B3B4" />
            <path d="M5 16.5h3" stroke="#F7BA3E" />
            <path d="M11 16.5h5" stroke="#BF85BF" />
          </g>
        </svg>
      );
    case "storybook":
      // Storybook — the pink book with its bookmark and white "S"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.2 3.4L18.6 2.5c.8 0 1.4.6 1.4 1.4v16.2c0 .8-.7 1.4-1.5 1.4l-14-.6c-.7 0-1.3-.6-1.3-1.3L3 4.7c0-.7.5-1.3 1.2-1.3z" fill="#FF4785" />
          <path d="M15.2 2.7l.1 3 1.1-.8 1 .7-.1-3.1z" fill="white" />
          <path d="M14.6 9.2c-.6-.6-1.6-.9-2.6-.9-1.5 0-2.5.7-2.5 1.8 0 2.7 5.4 1.4 5.4 4.2 0 1.3-1.2 2.2-2.9 2.2-1.3 0-2.4-.4-3.1-1.2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "materialui":
    case "mui":
      // MUI — the blue faceted "M"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 4.2l7.3 4.2v3L4 8.6v8.8l-2.5-1.4z" fill="#007FFF" />
          <path d="M8.8 8.4L16 4.2v3l-7.2 4.2z" fill="#007FFF" />
          <path d="M16 9.6l2.5-1.4v8.2L11.3 20.6v-3l4.7-2.7z" fill="#007FFF" />
          <path d="M20 4.9l2.5-1.4v3L20 7.9z" fill="#007FFF" />
        </svg>
      );
    case "styledcomponents":
      // styled-components — pink angle brackets round a polish bottle
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 6.5L2 12l5 5.5M17 6.5l5 5.5-5 5.5" stroke="#DB7093" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10.8" y="5.5" width="2.4" height="4.2" rx=".6" fill="#DB7093" />
          <rect x="9" y="10" width="6" height="8" rx="1.6" fill="#DB7093" />
        </svg>
      );
    case "ngrx":
      // NgRx — the purple Angular-family shield
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 5.5L4.5 18L12 22L19.5 18L21 5.5L12 2Z" fill="#BA2BD2" />
          <path d="M12 2V22L19.5 18L21 5.5L12 2Z" fill="#8F1FA5" />
          <path d="M8.8 16V8l6.4 8V8" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pinia":
      // Pinia — the smiling pineapple
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7.6c-1-2.2-3-3.4-5-3.2 1.2.8 2.2 1.9 2.6 3.2M12 7.6c1-2.2 3-3.4 5-3.2-1.2.8-2.2 1.9-2.6 3.2M12 7.6V2.5" stroke="#52CE63" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="12" cy="14.8" rx="6" ry="7" fill="#FFD859" />
          <circle cx="9.8" cy="14" r="1" fill="#3E2A0B" />
          <circle cx="14.2" cy="14" r="1" fill="#3E2A0B" />
          <path d="M10.6 17c.9.7 1.9.7 2.8 0" stroke="#3E2A0B" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "zustand":
      // Zustand — the bear
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6.5" r="3" fill="#8B5E3C" />
          <circle cx="18" cy="6.5" r="3" fill="#8B5E3C" />
          <circle cx="12" cy="13" r="8.5" fill="#8B5E3C" />
          <ellipse cx="12" cy="15.6" rx="4" ry="3.2" fill="#D9B38C" />
          <circle cx="8.8" cy="11" r="1.1" fill="#2B1D12" />
          <circle cx="15.2" cy="11" r="1.1" fill="#2B1D12" />
          <ellipse cx="12" cy="14.4" rx="1.5" ry="1.1" fill="#2B1D12" />
        </svg>
      );
    case "rxjs":
      // RxJS — the magenta disc with its coiled stream
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#B7178C" />
          <path d="M17 9.6A5.4 5.4 0 1 0 15.9 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="1.6" />
        </svg>
      );
    case "reacttestinglibrary":
    case "testinglibrary":
      // Testing Library — the red goat
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 7.6C7.3 6.3 7.3 4 8.8 2.8M15 7.6c1.7-1.3 1.7-3.6.2-4.8" stroke="#E33332" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 8.8L4 10.6l4.2 1.2zM16 8.8l4 1.8-4.2 1.2z" fill="#E33332" />
          <path d="M8 7.8h8l-1 7.6c-.3 2-1.6 3.4-3 3.4s-2.7-1.4-3-3.4z" fill="#E33332" />
          <path d="M11 18.4l1 3.4 1-3.4z" fill="#E33332" />
          <circle cx="10.2" cy="11.2" r="1" fill="white" />
          <circle cx="13.8" cy="11.2" r="1" fill="white" />
        </svg>
      );
    case "grpc":
      // gRPC — teal badge with the lowercase "g"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#244C5A" />
          <circle cx="11.2" cy="10.4" r="3.4" stroke="#6FD0D0" strokeWidth="1.9" />
          <path d="M14.6 7v7.8a3.6 3.6 0 0 1-6.6 2" stroke="#6FD0D0" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "swagger":
      // Swagger — the green disc with its navy braces
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#85EA2D" />
          <path d="M9.4 6.8c-1.8 0-1.6 2.6-1.6 3.6S7.2 12 6.2 12c1 0 1.6.6 1.6 1.6s-.2 3.6 1.6 3.6M14.6 6.8c1.8 0 1.6 2.6 1.6 3.6s.6 1.6 1.6 1.6c-1 0-1.6.6-1.6 1.6s.2 3.6-1.6 3.6" stroke="#173647" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="12" r=".9" fill="#173647" />
          <circle cx="12" cy="12" r=".9" fill="#173647" />
          <circle cx="14" cy="12" r=".9" fill="#173647" />
        </svg>
      );
    case "openapi":
      // OpenAPI Initiative — the green ring of linked nodes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3a9 9 0 1 1-8.6 6.4" stroke="#6BA539" strokeWidth="2" strokeLinecap="round" />
          <circle cx="5.4" cy="5.6" r="2" fill="#6BA539" />
          <circle cx="12" cy="12" r="2.4" fill="#6BA539" />
          <path d="M12 12L7 7M12 12h5M12 12v5" stroke="#6BA539" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "openidconnect":
    case "openid":
      // OpenID — the orange stroke inside the grey arc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.6 4.2l3-1.5v17.6l-3 1.5z" fill="#F78C40" />
          <path d="M9.2 8.4C5 9.3 2.2 11.6 2.2 14.3c0 3 3.6 5.6 8.4 6.1v-1.9C7.4 18 5.2 16.3 5.2 14.3c0-1.8 1.6-3.3 4-4z" fill="#B2B2B2" />
          <path d="M15 8.4c2 .3 3.8.9 5.1 1.8l-1.4 1 4.8 1-.5-4.3-1.3.8c-1.8-1.1-4.2-1.9-6.7-2.1z" fill="#B2B2B2" />
        </svg>
      );
    case "nunit":
      // NUnit — the green "nu" badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#3BB14A" />
          <path d="M5.8 16.2v-5.6a2.4 2.4 0 0 1 4.8 0v5.6M13.4 8.4v5.2a2.4 2.4 0 0 0 4.8 0V8.4" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "azuredevops":
      // Azure DevOps — the blue folded loop
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 6.4v11l-4.6 3.8-7.1-2.6v2.6l-4-5.3 11.7.9V6.8zM18 7L11.4 3v2.6L5.3 7.4 3.4 9.9v5.6l2.6 1.2V9.5z" fill="#0078D7" />
        </svg>
      );
    case "grafana":
      // Grafana — the orange-to-yellow cog swirl
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke={`url(#grafanaGrad-${uid})`} strokeLinecap="round">
            <circle cx="12" cy="12.5" r="6.2" strokeWidth="2.6" />
            <path d="M12 2.5v2.6M12 19.9v2.1M2.8 12.5h2.5M18.7 12.5h2.5M5.2 5.7l1.8 1.8M17 17.5l1.8 1.8M18.8 5.7L17 7.5M7 17.5l-1.8 1.8" strokeWidth="2.2" />
          </g>
          <path d="M12 12.5h3.4" stroke="#F46800" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id={`grafanaGrad-${uid}`} x1="12" y1="22" x2="12" y2="2.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FCEE1F" />
              <stop offset="1" stopColor="#F15B2A" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "spacy":
      // spaCy — its cyan badge with the lowercase "s"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#09A3D5" />
          <path d="M15.4 9c-.7-.7-1.9-1.1-3.1-1.1-1.7 0-2.9.8-2.9 2 0 2.9 6.2 1.5 6.2 4.4 0 1.3-1.3 2.2-3.2 2.2-1.4 0-2.7-.5-3.5-1.3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "mediapipe":
      // MediaPipe — its teal stacked pipes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="4.2" height="18" rx="2.1" fill="#0097A7" />
          <rect x="9.9" y="3" width="4.2" height="11" rx="2.1" fill="#00BCD4" />
          <rect x="9.9" y="16.6" width="4.2" height="4.4" rx="2.1" fill="#00BCD4" />
          <rect x="16.8" y="3" width="4.2" height="4.4" rx="2.1" fill="#4DD0E1" />
          <rect x="16.8" y="10" width="4.2" height="11" rx="2.1" fill="#4DD0E1" />
        </svg>
      );
    case "keras":
      // Keras — the white "K" on red
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#D00000" />
          <path d="M8.2 6v12M8.2 12.6L15.6 6M10.8 10.4L16 18" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      );
    case "nltk":
      // NLTK — a Python-blue badge with its "N" over a text line
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#3776AB" />
          <path d="M8 14.5V6.5l8 8v-8" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 18h10" stroke="#FFD43B" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "google":
      // Google — the four-colour "G"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g strokeWidth="3.4">
            <path d="M5.42 9.61A7 7 0 0 1 17.36 7.5" stroke="#EA4335" />
            <path d="M5.94 15.5A7 7 0 0 1 5.42 9.61" stroke="#FBBC05" />
            <path d="M17.36 16.5A7 7 0 0 1 5.94 15.5" stroke="#34A853" />
            <path d="M19 12A7 7 0 0 1 17.36 16.5M12 12h7" stroke="#4285F4" />
          </g>
        </svg>
      );
    case "jasmine":
      // Jasmine — the white flower on purple
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#8A4182" />
          <path d="M12 5.5v4M12 14.5v4M5.5 12h4M14.5 12h4M7.4 7.4l2.8 2.8M13.8 13.8l2.8 2.8M16.6 7.4l-2.8 2.8M10.2 13.8l-2.8 2.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.6" fill="white" />
        </svg>
      );
    case "cucumber":
      // Cucumber — the green gherkin
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.5c5 0 8.5 3.8 8.5 8.6 0 4.5-3.3 7.9-7.4 8.5v2.4C7.4 21.2 3.5 17 3.5 11.1 3.5 6.3 7 2.5 12 2.5z" fill="#23D96C" />
          <g fill="white">
            <circle cx="9" cy="8" r="1.2" />
            <circle cx="15" cy="8" r="1.2" />
            <circle cx="12" cy="11.5" r="1.2" />
            <circle cx="9" cy="15" r="1.2" />
            <circle cx="15" cy="15" r="1.2" />
          </g>
        </svg>
      );
    case "specflow":
      // SpecFlow — green badge with its "S" leaf
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10H2V12C2 6.5 6.5 2 12 2z" fill="#3DB54A" />
          <path d="M15.2 9c-.7-.7-1.8-1.1-3-1.1-1.6 0-2.7.8-2.7 1.9 0 2.8 5.9 1.4 5.9 4.3 0 1.2-1.2 2.1-3 2.1-1.3 0-2.5-.5-3.3-1.2" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "katalon":
      // Katalon — navy badge with its green "K"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#1E2A4A" />
          <path d="M8.5 6.5v11M8.5 13l7-6.5M11.2 10.7l4.8 6.8" stroke="#35D07F" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "restassured":
      // REST Assured — a green check inside API braces
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#5A9E3A" />
          <path d="M7.6 6.5C5.8 6.5 6.3 12 4.8 12c1.5 0 1 5.5 2.8 5.5M16.4 6.5c1.8 0 1.3 5.5 2.8 5.5-1.5 0-1 5.5-2.8 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9.2 12.2l2 2 3.6-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "soapui":
      // SoapUI — the green bar of soap and its bubbles
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="11" width="15" height="9" rx="3" fill="#6CB33F" />
          <path d="M6 15.5h8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="17.5" cy="6.5" r="3.2" stroke="#6CB33F" strokeWidth="1.6" />
          <circle cx="11" cy="6" r="2" stroke="#6CB33F" strokeWidth="1.4" />
          <circle cx="20.5" cy="12.5" r="1.3" stroke="#6CB33F" strokeWidth="1.2" />
        </svg>
      );
    case "blazemeter":
      // BlazeMeter — the orange flame
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c.6 3.4 5.8 5.6 5.8 11.2A5.8 5.8 0 0 1 12 19a5.8 5.8 0 0 1-5.8-5.8c0-2.4 1.2-4.2 2.6-5.5 0 1.8.8 3 2 3.4C10.2 8.2 11 4.8 12 2z" fill="#FF6B00" />
          <path d="M12 12.2c1.3 1.3 2.6 2.2 2.6 3.8a2.6 2.6 0 0 1-5.2 0c0-1.6 1.3-2.5 2.6-3.8z" fill="#FFC23D" />
          <path d="M6 21.5h12" stroke="#FF6B00" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "browserstack":
      // BrowserStack — the many-coloured concentric eye
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#E8543C" />
          <circle cx="12.4" cy="11.6" r="8" fill="#F4B400" />
          <circle cx="12.8" cy="11.2" r="6.2" fill="#2BB673" />
          <circle cx="13" cy="11" r="4.5" fill="#1D8FE1" />
          <circle cx="13.2" cy="10.8" r="2.7" fill="#0B1A2A" />
          <circle cx="14" cy="10" r=".9" fill="white" />
        </svg>
      );
    case "owasp":
      // OWASP — the wasp
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="8.4" cy="8.6" rx="3.2" ry="1.7" transform="rotate(-30 8.4 8.6)" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="15.6" cy="8.6" rx="3.2" ry="1.7" transform="rotate(30 15.6 8.6)" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="8.4" r="1.8" fill="currentColor" />
          <path d="M12 10.4c1.8 0 2.4 1.6 2.4 3.6 0 2.4-1.2 4.3-2.4 5.6-1.2-1.3-2.4-3.2-2.4-5.6 0-2 .6-3.6 2.4-3.6z" fill="currentColor" />
          <path d="M10 13.2h4M10.1 15.6h3.8" stroke="var(--surface, #111)" strokeWidth="1" />
        </svg>
      );
    case "openstack":
      // OpenStack — the red split square
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4.5h-4.2V7.2H7.2v2.3z" fill="#ED1944" />
          <path d="M3 14.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.5h-4.2v2.3H7.2v-2.3z" fill="#ED1944" />
          <path d="M3 11h4.2v2H3zM16.8 11H21v2h-4.2z" fill="#ED1944" />
        </svg>
      );
    case "cloudfoundry":
      // Cloud Foundry — the blue cloud badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#0C9ED5" />
          <path d="M8 16.5h8.2a3 3 0 0 0 .4-6 4.5 4.5 0 0 0-8.6-1A3.5 3.5 0 0 0 8 16.5z" fill="white" />
          <path d="M11 12.8h3" stroke="#0C9ED5" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "qasymphony":
      // QASymphony — its teal "Q" badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#00A79D" />
          <circle cx="11.6" cy="11.6" r="4.6" stroke="white" strokeWidth="1.9" />
          <path d="M14 14l3.4 3.4" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "resharper":
      // ReSharper — JetBrains' gradient frame round a black "R#" tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="2" fill={`url(#resharperGrad-${uid})`} />
          <rect x="5" y="5" width="14" height="14" fill="#000" />
          <path d="M7.2 14V8h2.2a1.7 1.7 0 0 1 0 3.4H7.2M9.3 11.4l1.6 2.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.2 8.4v5.2M15.6 8.4v5.2M12.4 10h4.2M12.4 12h4.2" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M7.2 16.6h5" stroke="white" strokeWidth="1.2" />
          <defs>
            <linearGradient id={`resharperGrad-${uid}`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C21456" />
              <stop offset=".5" stopColor="#E14CE3" />
              <stop offset="1" stopColor="#FDBC2C" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "saucelabs":
      // Sauce Labs — the white bolt on red
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#E2231A" />
          <path d="M13.4 5L8 13h3.4l-1 6 5.6-8.2h-3.5z" fill="white" />
        </svg>
      );
    case "testrail":
      // TestRail — the green "T" over its rails
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#65C179" />
          <path d="M7 7.5h10M12 7.5v9.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M6.5 12.5h3M14.5 12.5h3M6.5 16.5h3M14.5 16.5h3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "sonarqube":
      // SonarQube — the blue sonar arcs
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#4E9BCD" strokeLinecap="round">
            <path d="M3 5.5c8 0 15 6 15.6 15" strokeWidth="2.2" />
            <path d="M5.5 3c7.5 1.2 13 6.4 14.6 12.6" strokeWidth="1.6" />
            <path d="M11 2.6c4.4 1.4 8 4.8 9.6 8.8" strokeWidth="1.2" />
          </g>
        </svg>
      );
    case "meteor":
      // Meteor — the red streaking comet
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#DE4F4F" strokeLinecap="round">
            <path d="M3 3l13 13" strokeWidth="2.2" />
            <path d="M8 3.5l9 9M3.5 8l9 9" strokeWidth="1.5" />
            <path d="M12.5 3.8l5.4 5.4M3.8 12.5l5.4 5.4" strokeWidth="1" />
          </g>
          <circle cx="17.8" cy="17.8" r="3.4" fill="#DE4F4F" />
        </svg>
      );
    case "appdynamics":
      // AppDynamics — the blue ring with its rising arc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#0AAAE3" />
          <path d="M7 16.5a5.5 5.5 0 1 1 10 0" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M12 16.5l2.6-5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1.3" fill="white" />
        </svg>
      );
    case "sensu":
      // Sensu — the green nested rings
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#89C967" />
          <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.4" fill="white" />
        </svg>
      );
    case "objectivec":
      // Objective-C — message-send brackets round a "C"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#438EFF" />
          <path d="M7.5 6.5H5.5v11h2M16.5 6.5h2v11h-2" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.2 9.6a3 3 0 1 0 0 4.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "wordpress":
      // WordPress — the "W" in its ringed blue disc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#21759B" />
          <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.1" />
          <path d="M6.8 8.6l2.6 7.6 2.6-6.1 2.6 6.1 2.6-7.6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ethereum":
      // Ethereum — the white octahedron on its violet coin
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#627EEA" />
          <path d="M12 4v5.9l5 2.2z" fill="white" fillOpacity=".6" />
          <path d="M12 4l-5 8.1 5-2.2z" fill="white" />
          <path d="M12 16v4l5-7z" fill="white" fillOpacity=".6" />
          <path d="M12 20v-4l-5-3z" fill="white" />
          <path d="M12 15.1l5-3-5-2.2z" fill="white" fillOpacity=".2" />
          <path d="M7 12.1l5 3V9.9z" fill="white" fillOpacity=".6" />
        </svg>
      );
    case "hyperledger":
      // Hyperledger — slate badge with a ledger-bar "H"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#2F3134" stroke="#5A5E63" strokeWidth="1" />
          <path d="M8 6.5v11M16 6.5v11M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M10.5 8.5h3M10.5 15.5h3" stroke="#2F9FD8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "solana":
      // Solana — the three gradient bars
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g fill={`url(#solanaGrad-${uid})`}>
            <path d="M6.5 4h15l-4 4h-15z" />
            <path d="M2.5 10h15l4 4h-15z" />
            <path d="M6.5 16h15l-4 4h-15z" />
          </g>
          <defs>
            <linearGradient id={`solanaGrad-${uid}`} x1="3" y1="20" x2="21" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9945FF" />
              <stop offset="1" stopColor="#14F195" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "eos":
      // EOS — the faceted gem outline
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L6.5 9.5 4.5 16 12 22l7.5-6-2-6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 2l-3 16.5L12 22l3-3.5zM6.5 9.5L15 18.5M17.5 9.5L9 18.5M4.5 16h15" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      );
    case "polkadot":
      // Polkadot — the pink ring of six dots
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#E6007A">
            <ellipse cx="12" cy="4" rx="3.2" ry="2" />
            <ellipse cx="12" cy="20" rx="3.2" ry="2" />
            <ellipse cx="5.1" cy="8" rx="3.2" ry="2" transform="rotate(-60 5.1 8)" />
            <ellipse cx="18.9" cy="16" rx="3.2" ry="2" transform="rotate(-60 18.9 16)" />
            <ellipse cx="5.1" cy="16" rx="3.2" ry="2" transform="rotate(60 5.1 16)" />
            <ellipse cx="18.9" cy="8" rx="3.2" ry="2" transform="rotate(60 18.9 8)" />
          </g>
        </svg>
      );
    case "cardano":
      // Cardano — the dotted rings on its blue coin
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#0033AD" />
          <g fill="white">
            <circle cx="12" cy="8.2" r="1.3" />
            <circle cx="12" cy="15.8" r="1.3" />
            <circle cx="8.7" cy="10.1" r="1.3" />
            <circle cx="15.3" cy="10.1" r="1.3" />
            <circle cx="8.7" cy="13.9" r="1.3" />
            <circle cx="15.3" cy="13.9" r="1.3" />
            <circle cx="12" cy="4.6" r=".8" />
            <circle cx="12" cy="19.4" r=".8" />
            <circle cx="5.6" cy="8.3" r=".8" />
            <circle cx="18.4" cy="8.3" r=".8" />
            <circle cx="5.6" cy="15.7" r=".8" />
            <circle cx="18.4" cy="15.7" r=".8" />
          </g>
        </svg>
      );
    case "solidity":
      // Solidity — the stacked faceted diamonds
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L7.5 9.2 12 11.8z" fill="currentColor" fillOpacity=".85" />
          <path d="M12 2l4.5 7.2L12 11.8z" fill="currentColor" fillOpacity=".5" />
          <path d="M12 22l4.5-7.2L12 12.2z" fill="currentColor" fillOpacity=".85" />
          <path d="M12 22l-4.5-7.2L12 12.2z" fill="currentColor" fillOpacity=".5" />
        </svg>
      );
    case "rust":
      // Rust — the "R" inside its cog
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.3" stroke="currentColor" strokeWidth="2.4" strokeDasharray="1.6 1.32" />
          <circle cx="12" cy="12" r="7.6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8.6 16.2V7.8h3.8a2.2 2.2 0 0 1 0 4.4H8.6M12.4 12.2l2.8 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "vyper":
      // Vyper — the nested "V" chevrons
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4l9 16 9-16" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M7.5 4L12 12l4.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "web3js":
    case "web3":
      // web3.js — the orange isometric cube
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l8.7 5L12 12 3.3 7z" fill="#F7A45D" />
          <path d="M3.3 7L12 12v10l-8.7-5z" fill="#F16822" />
          <path d="M20.7 7L12 12v10l8.7-5z" fill="#C6501A" />
        </svg>
      );
    case "truffle":
      // Truffle — the chocolate truffle with its teal drizzle
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 16.5c0-5.5 4-10 9-10s9 4.5 9 10c0 2.2-4 3.5-9 3.5s-9-1.3-9-3.5z" fill="#5E464D" />
          <path d="M5.8 11.5c1.6 1.2 3 1.2 4.4 0s2.8-1.2 4.2 0 2.6 1.2 3.8 0" stroke="#3FE0C5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "hardhat":
      // Hardhat — the yellow hard hat
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 15.5a8 8 0 0 1 16 0z" fill="#FFF100" />
          <path d="M10.6 7.6h2.8v7.9h-2.8z" fill="#EDCF00" />
          <rect x="2.2" y="15.5" width="19.6" height="2.6" rx="1.3" fill="#EDCF00" />
        </svg>
      );
    case "mocha":
      // Mocha — the coffee cup on its brown disc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#8D6748" />
          <path d="M6.5 10.5h9v3a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4z" fill="white" />
          <path d="M15.5 11.3h1a1.9 1.9 0 0 1 0 3.8h-1.2" stroke="white" strokeWidth="1.3" />
          <path d="M9.5 8.4c0-.9.9-.9.9-1.8M12.5 8.4c0-.9.9-.9.9-1.8" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "chai":
      // Chai — the teacup on its brick-red disc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#A30701" />
          <path d="M6.5 9.5h9c0 3.6-1.8 6-4.5 6s-4.5-2.4-4.5-6z" fill="white" />
          <path d="M15.3 10.5h.9a1.6 1.6 0 0 1 0 3.2h-1.4" stroke="white" strokeWidth="1.2" />
          <path d="M5.5 17h11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "salesforce":
      // Salesforce — the sky-blue cloud
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6.4a4 4 0 0 1 6.4.9 4.4 4.4 0 0 1 5.6 4.3 4.5 4.5 0 0 1-5.5 4.4 3.6 3.6 0 0 1-5 1.5 4.2 4.2 0 0 1-7.7-.4A3.8 3.8 0 0 1 2 10a3.9 3.9 0 0 1 5.4-3.6A3.9 3.9 0 0 1 10 6.4z" fill="#00A1E0" />
        </svg>
      );
    case "sap":
      // SAP — the white wordmark on its blue wedge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 6h21L12 18H1.5z" fill={`url(#sapGrad-${uid})`} />
          <g stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9.1c-.3-.3-.8-.5-1.3-.5-.7 0-1.2.4-1.2.9 0 1.3 2.7.7 2.7 2.2 0 .6-.6 1.1-1.4 1.1-.6 0-1.2-.2-1.5-.6" />
            <path d="M7.1 13l1.5-4.4 1.5 4.4M7.6 11.6h2" />
            <path d="M11.4 13V8.6h1.3a1.3 1.3 0 0 1 0 2.6h-1.3" />
          </g>
          <defs>
            <linearGradient id={`sapGrad-${uid}`} x1="12" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00B8F1" />
              <stop offset="1" stopColor="#1E5FBB" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "workday":
      // Workday — the orange sun arc over the blue "w"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.2 9.2a5.8 5.8 0 0 1 11.6 0" stroke="#F38B00" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M3.8 11.5l3.2 7.5 5-6.6 5 6.6 3.2-7.5" stroke="#0875E1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "microsoftteams":
    case "teams":
      // Microsoft Teams — the "T" tile with its person
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18.2" cy="6.8" r="2.4" fill="#7B83EB" />
          <rect x="14.5" y="10" width="7.5" height="8.5" rx="2.5" fill="#7B83EB" />
          <circle cx="11" cy="5" r="2.6" fill="#5059C9" />
          <rect x="2" y="7" width="13" height="13" rx="2" fill="#5059C9" />
          <path d="M5.5 10.5h6M8.5 10.5v6.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case "linear":
      // Linear — the indigo disc with its diagonal speed cuts
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#5E6AD2" />
          <path d="M2.8 13.6l7.6 7.6M2.3 10.3l11.4 11.4M3.3 7.1l13.6 13.6" stroke="var(--surface, #0B0B0F)" strokeWidth="1.1" />
        </svg>
      );
    case "shopify":
      // Shopify — the green shopping bag with its "S"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 7.5V6a3 3 0 0 1 6 0v1.5" stroke="#5E8E3E" strokeWidth="1.6" />
          <path d="M5 7.5h14l-1.2 13.5H6.2z" fill="#95BF47" />
          <path d="M14 11c-.5-.5-1.2-.7-2-.7-1 0-1.8.6-1.8 1.4 0 1.9 3.8 1 3.8 3 0 .9-.8 1.5-2 1.5-.9 0-1.6-.3-2.1-.8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "magento":
      // Magento — the orange hexagonal "M"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.5 7v10l2.6 1.5V8.5L12 5.1l5.9 3.4v10L20.5 17V7z" fill="#EE672F" />
          <path d="M12 8.6l-2.6 1.5v10.3L12 22l2.6-1.6V10.1z" fill="#EE672F" />
        </svg>
      );
    case "woocommerce":
      // WooCommerce — the purple speech bubble with "woo"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="4.5" width="21" height="12.5" rx="3" fill="#7F54B3" />
          <path d="M13.5 16.5l4 3.8-.4-3.8z" fill="#7F54B3" />
          <path d="M4.2 8.6l1.3 5.2 1.8-3.6 1.8 3.6 1.3-5.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="13.9" cy="11.5" r="1.7" stroke="white" strokeWidth="1.3" />
          <circle cx="18.4" cy="11.5" r="1.7" stroke="white" strokeWidth="1.3" />
        </svg>
      );
    case "bigcommerce":
      // BigCommerce — the dark tile with its white "B"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#121118" stroke="#3F3F46" strokeWidth="1" />
          <path d="M8 6.5h4.4c1.8 0 2.9.9 2.9 2.4 0 1-.5 1.7-1.4 2 1.1.3 1.8 1.1 1.8 2.4 0 1.7-1.3 2.7-3.2 2.7H8z" fill="white" />
          <path d="M16.5 21.5L21.5 16.5v5z" fill="white" />
        </svg>
      );
    case "eclipse":
      // Eclipse — the striped violet disc with its orange crescent
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#F7941E" />
          <circle cx="13.4" cy="12" r="8.6" fill="#2C2255" />
          <path d="M6.2 10.6h14M6.2 13.4h14" stroke="white" strokeWidth="1.3" />
        </svg>
      );
    case "jetpackcompose":
      // Jetpack Compose — the layered hexagon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l8.7 5v10L12 22l-8.7-5V7z" fill="#073042" />
          <path d="M12 5.6l5.6 3.2L12 12 6.4 8.8z" fill="#4285F4" />
          <path d="M6.4 8.8L12 12v6.4l-5.6-3.2z" fill="#3DDC84" />
          <path d="M17.6 8.8L12 12v6.4l5.6-3.2z" fill="#3DDC84" fillOpacity=".6" />
        </svg>
      );
    case "nativescript":
      // NativeScript — the white "N" on its light-blue tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#65ADF1" />
          <path d="M8 17V7l8 10V7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mcp":
    case "modelcontextprotocol":
      // Model Context Protocol — the interlinked strokes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 11.3l7.7-7.7a2.7 2.7 0 0 1 3.8 3.8L9.2 13.2" />
            <path d="M9.3 13.1L15 7.4a2.7 2.7 0 0 1 3.8 3.8l-6.7 6.7a.9.9 0 0 0 0 1.3l1.5 1.5" />
            <path d="M13.1 5.5L7.4 11.2a2.7 2.7 0 0 0 3.8 3.8l5.7-5.7" />
          </g>
        </svg>
      );
    case "zoom":
      // Zoom — the white camera on its blue tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="6" fill="#2D8CFF" />
          <rect x="5" y="8.5" width="9.5" height="7" rx="1.8" fill="#FFFFFF" />
          <path d="M15.3 11.2l3.7-2.4v6.4l-3.7-2.4z" fill="#FFFFFF" />
        </svg>
      );
    case "vim":
      // Vim — the green diamond with its "V"
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l10 10-10 10L2 12z" fill="#019833" />
          <path d="M7.5 7.5h3l1.5 5.3 1.5-5.3h3L13.3 16.5h-2.6z" fill="#FFFFFF" />
        </svg>
      );
    case "atom":
      // Atom — three orbits around the nucleus
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#5FB57D" strokeWidth="1.5">
            <ellipse cx="12" cy="12" rx="9.5" ry="3.6" />
            <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)" />
          </g>
          <circle cx="12" cy="12" r="1.8" fill="#5FB57D" />
        </svg>
      );
    case "socketio":
      // Socket.IO — the white bolt in the black disc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#010101" stroke="currentColor" strokeOpacity="0.28" />
          <path d="M13.6 4.5L7.2 13h4.4l-1.2 6.5 6.4-8.5h-4.4z" fill="#FFFFFF" />
        </svg>
      );
    // ---- Predictive Intelligence stack (1 Oct review: "update the tech stack
    // icons"). These were letter monograms; each is now the product's own mark
    // where it has one (R, Prometheus, DVC, Power Automate), and otherwise a
    // drawing of what the library does in its brand colour.
    case "r":
      // R — the grey ring behind the blue R
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="10.5" rx="10.2" ry="7.2" stroke="#9EA2AB" strokeWidth="2.6" />
          <path d="M9 7.6h6.1c2 0 3.2 1.1 3.2 2.7 0 1.4-.9 2.3-2.3 2.6l3 4.9h-3.2l-2.6-4.6h-1.3v4.6H9z M11.9 9.8v1.6h2.6c.6 0 1-.3 1-.8s-.4-.8-1-.8z" fill="#276DC3" fillRule="evenodd" />
        </svg>
      );
    case "prometheus":
      // Prometheus — the white torch flame on the orange disc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10.5" fill="#E6522C" />
          <path d="M12 4.6c.6 2.2 2.9 3.3 2.9 6.2 0 .9-.3 1.7-.8 2.3.1-1-.4-1.9-1-2.5-.2 1-.7 1.6-1.4 2-.3-.9-1-1.5-1.5-2.1-.6.9-1 1.7-.9 2.6-.6-.7-1-1.5-1-2.4 0-2.7 2.9-3.9 3.7-6.1z" fill="#FFFFFF" />
          <rect x="7.2" y="14.6" width="9.6" height="1.6" rx=".5" fill="#FFFFFF" />
          <rect x="8.2" y="17.2" width="7.6" height="1.6" rx=".5" fill="#FFFFFF" />
        </svg>
      );
    case "dvc":
      // DVC — its three coloured pipeline strokes
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6.5h9.5a3 3 0 0 1 3 3" stroke="#13ADC7" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M4 12h16" stroke="#945DD6" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M4 17.5h9.5a3 3 0 0 0 3-3" stroke="#F46737" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case "microsoftpowerautomate":
      // Power Automate — the blue folded chevrons
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4.5h8.5l6.5 7.5-6.5 7.5H3l6.5-7.5z" fill="#0066FF" />
          <path d="M11.5 4.5H17l4 7.5-4 7.5h-5.5l6.5-7.5z" fill="#2D9CFF" />
        </svg>
      );
    case "shap":
      // SHAP — its force plot: red pushes up, blue pushes down
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 8l3 4-3 4h4.5l3-4-3-4zM8.5 8l3 4-3 4H12l3-4-3-4z" fill="#FF0051" />
          <path d="M21.5 8l-3 4 3 4h-3.5l-3-4 3-4z" fill="#008BFB" />
        </svg>
      );
    case "prophet":
      // Prophet — a history line running into a shaded forecast band
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 9.5l8-4.5v9l-8 1.5z" fill="#0467DF" fillOpacity="0.22" />
          <path d="M3 17l3.2-3.5 3 1.8 3.8-4.8" stroke="#0467DF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 10.5l8-1.5" stroke="#0467DF" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 2.4" />
        </svg>
      );
    case "pyod":
      // PyOD — outlier detection: a cluster, and the one point flagged outside it
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="15" r="1.8" fill="#306998" />
          <circle cx="9.5" cy="17.5" r="1.8" fill="#306998" />
          <circle cx="8.8" cy="12.6" r="1.8" fill="#306998" />
          <circle cx="12.4" cy="15.4" r="1.8" fill="#306998" />
          <circle cx="17.5" cy="6.5" r="2" fill="#FFD43B" />
          <circle cx="17.5" cy="6.5" r="4.2" stroke="#E5484D" strokeWidth="1.6" />
        </svg>
      );
    case "river":
      // River — online learning on a stream: three flowing waves
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8c3-2.6 6-2.6 9 0s6 2.6 9 0" stroke="#1E88E5" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M3 12.5c3-2.6 6-2.6 9 0s6 2.6 9 0" stroke="#42A5F5" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M3 17c3-2.6 6-2.6 9 0s6 2.6 9 0" stroke="#90CAF9" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "implicit":
      // implicit — collaborative filtering's user × item matrix, gaps filled in
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}${c}`}
                x={3.5 + c * 6}
                y={3.5 + r * 6}
                width="5"
                height="5"
                rx="1.2"
                fill={(r + c) % 2 === 0 ? "#26A69A" : "#B2DFDB"}
                fillOpacity={(r + c) % 2 === 0 ? 1 : 0.7}
              />
            )),
          )}
        </svg>
      );
    case "evidently":
      // Evidently — model monitoring: a drift chart on its red tile
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="#ED0400" />
          <path d="M6 15.5l3.2-3.4 2.8 2 3.4-5 2.6 2.4" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 18h12" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    default: {
      const concept = CONCEPTS[key];
      if (concept) return <ConceptGlyph kind={concept} />;
      const monogram = MONOGRAMS[key];
      if (monogram) return <Monogram spec={monogram} />;
      // Generic database/cloud icon
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="var(--accent)" />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      );
    }
  }
}
