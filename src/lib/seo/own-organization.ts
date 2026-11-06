/**
 * Pages whose approved schema spec is the page's COMPLETE structured data, so
 * the marketing layout emits nothing site-wide for them — neither its
 * Organization nor its WebSite (see `SiteGraph`).
 *
 * Each page listed here carries exactly the spec's four blocks — Organization,
 * Service, WebPage, FAQPage (24–29 Sep requests):
 *
 *   /agentic-ai-development-services
 *   /android-application-development-company (an exception, like the
 *     Mobile App page below: it mirrors softsuave.com's page, whose schema is
 *     a Service graph and a FAQPage — its Organization arrives from GTM and
 *     its footer keeps the address microdata, as live's does)
 *   /computer-vision-development-services
 *   /custom-ai-development-services
 *   /data-engineering-services
 *   /data-science-services
 *   /flutter-application-development-company (an exception, like Android,
 *     iOS, React Native and Mobile App: it mirrors softsuave.com's page, whose
 *     schema is a Service graph and a FAQPage — its Organization arrives from
 *     GTM and its footer keeps the address microdata, as live's does)
 *   /generative-ai-development-company
 *   /graphql-development-company
 *   /hire-backend-application-developer, /hire-dedicated-developers,
 *     /hire-devops-developers, /hire-frontend-application-developer,
 *     /hire-mobile-app-developers, /hire-qa-testers-india,
 *     /hire-software-developers and /hire-web-app-developers (exceptions,
 *     like the mobile pages: each mirrors its softsuave.com page's own blocks
 *     verbatim — see `lib/seo/hire-roles-live-schema` — with its Organization
 *     arriving from GTM where live carries none, and its footer keeping the
 *     address microdata, as live's does)
 *   the hire-by-skill pages whose live page carries JSON-LD — Angular, .NET,
 *     Flutter, Ionic, Java, MEAN, NestJS, Node, PHP, Python, React Native,
 *     ReactJS and Swift — and the Android, iOS, Salesforce and Blockchain
 *     role pages (exceptions, like the hire-by-role pages: each mirrors its
 *     live page's own blocks verbatim — see `lib/seo/hire-skills-live-schema`
 *     and `hire-roles-live-schema` — with the Organization arriving from GTM
 *     and the footer keeping its address microdata, as live's does)
 *   /hire-django-developer, /hire-laravel-developer and
 *     /hire-ruby-on-rails-developer (exceptions, like the skill pages above:
 *     Django and Ruby on Rails emit no JSON-LD, as their live pages carry
 *     none; Laravel emits only the FAQPage live's GTM injects — see
 *     `lib/seo/hire-skills-live-schema`)
 *   /global-capability-center, /offshore-software-development-company,
 *     /it-staff-augmentation-services and /it-outsourcing-company-india
 *     (exceptions, like the hire pages: each mirrors its live page's own
 *     blocks verbatim — see `lib/seo/<slug>.ts` — with the site Organization
 *     arriving from GTM and the footer keeping its address microdata)
 *   /hire-ai-developer and /hire-forward-deployed-engineer (exceptions, like
 *     the hire pages above: the AI page's live page carries no JSON-LD of its
 *     own, so it emits none; the FDE page mirrors live's two blocks, which
 *     include its own Organization — see `hire-roles-live-schema`)
 *   /cloud-computing, /legacy-modernization-services and
 *     /product-engineering-services (exceptions: their live pages carry no
 *     JSON-LD of their own — only the GTM-injected site Organization — so
 *     these pages emit none either, and the footer keeps its microdata)
 *   /ionic-app-development-company (an exception, like Android, iOS, React
 *     Native, Flutter and Mobile App: it mirrors softsuave.com's page, whose
 *     schema is a Service graph and a FAQPage — its Organization arrives from
 *     GTM and its footer keeps the address microdata, as live's does)
 *   /ios-application-development-company (an exception, like Android and
 *     Mobile App: it mirrors softsuave.com's page, whose schema is a Service
 *     graph, BreadcrumbList, FAQPage and Product — its Organization arrives
 *     from GTM and its footer keeps the address microdata, as live's does)
 *   /mobile-application-development-company (the one exception to the
 *     list below: it mirrors softsuave.com's page, whose schema is a lone
 *     FAQPage — its Organization arrives from GTM and its footer keeps the
 *     address microdata, as live's does)
 *   /nextjs-development-company
 *   /php-application-development-company and
 *   /python-application-development-company (exceptions, like the mobile
 *     pages: each mirrors softsuave.com's page — PHP a Service graph and a
 *     FAQPage, Python a lone Service graph — with its Organization arriving
 *     from GTM and its footer keeping the address microdata, as live's does)
 *   /postgresql-development-company
 *   /predictive-intelligence-services
 *   /rag-development-services
 *   /react-native-app-development-company (an exception, like Android, iOS
 *     and Mobile App: it mirrors softsuave.com's page, whose schema is a
 *     Service graph and a FAQPage — its Organization arrives from GTM and its
 *     footer keeps the address microdata, as live's does)
 *   /software-development-company (an exception, like PHP and Python: it
 *     mirrors softsuave.com's page, whose schema is a lone Service graph —
 *     its Organization arrives from GTM and its footer keeps the address
 *     microdata, as live's does; see `lib/seo/software-development-company`)
 *   /typescript-development-company
 *   /vuejs-development-company
 *   /web-application-development-company (an exception, like Mobile App: it
 *     mirrors softsuave.com's page, whose schema is a lone FAQPage — its
 *     Organization arrives from GTM and its footer keeps the address
 *     microdata, as live's does; see `lib/seo/web-application-development-company`)
 *   /xamarin-app-development-company (an exception, like the other mobile
 *     pages: it mirrors softsuave.com's page, whose schema is a Product and a
 *     BreadcrumbList — its Organization arrives from GTM and its footer keeps
 *     the address microdata, as live's does)
 *
 * so each page must also:
 *   - emit the spec's Organization itself (`softSuaveOrganizationLd`, which
 *     lists no Facebook profile — the site-wide node does);
 *   - turn off the footer's PostalAddress microdata
 *     (`<Footer addressMicrodata={false} />`).
 * Their WebPages carry no `isPartOf`, so nothing on them points at the WebSite.
 *
 * Kept free of `server-only` so the client `SiteGraph` can read it.
 */
export const PAGES_WITH_OWN_SITE_GRAPH: ReadonlySet<string> = new Set([
  '/about',
  '/agentic-ai-development-services',
  '/android-application-development-company',
  '/awards-recognition',
  '/case-study-ai-assist-logistics-onboarding',
  '/case-study-ai-chatbot-for-engagement-and-secure-transactions',
  '/case-study-ai-driven-cybersecurity-automation',
  '/case-study-ai-driven-equipment-&-workforce-optimization',
  '/case-study-ai-optimization-in-healthcare',
  '/case-study-ai-powered-business-intelligence-insights',
  '/case-study-ai-powered-cyber-theart-detection',
  '/case-study-ai-powered-education-solutions',
  '/case-study-ai-powered-multi-cloud-management',
  '/case-study-all-in-one-financial-management-app',
  '/case-study-area-mapping-solution',
  '/case-study-blockchain-digital-currency-platform',
  '/case-study-brand-forge',
  '/case-study-centralized-shipment-tracking',
  '/case-study-cloud-based-campus-management',
  '/case-study-comprehensive-ecommerce-for-retail',
  '/case-study-corporate-banking-solution',
  '/case-study-crm-application-for-real-estate',
  '/case-study-custom-business-management-platform',
  '/case-study-digital-advertising-in-public-spaces',
  '/case-study-digitizing-product-inspections',
  '/case-study-healthpass-wellness-subscriptions-in-banking',
  '/case-study-high-performance-lms-for-education',
  '/case-study-high-performance-trading-platform',
  '/case-study-hire-voice',
  '/case-study-intuitive-online-shopping-platform',
  '/case-study-job-progress-tracking',
  '/case-study-legal-violation-tracking-application',
  '/case-study-logistics-ride-hailing-application',
  '/case-study-marketmind-ai-market-intelligence',
  '/case-study-neurora-behavioral-intelligence',
  '/case-study-online-consultation-platform-for-doctors',
  '/case-study-optimizing-influencer-and-brand-collaborations',
  '/case-study-parksafe-community-vehicle-alert-app',
  '/case-study-personalized-ecommerce-platform',
  '/case-study-postguard-compliance-ai',
  '/case-study-project-&-compliance-workflow-transformation',
  '/case-study-restaurant-workflow-optimization',
  '/case-study-saas-platform-for-corporate-banking',
  '/case-study-safeops-ai-incident-management',
  '/case-study-salesforce-telephone-app-integration',
  '/case-study-savings-solution-for-better-financial-management',
  '/case-study-scalable-delivery-mangement-for-logistics',
  '/case-study-shiftsense-ai-shift-intelligence',
  '/case-study-smart-digital-signage-with-advanced-ad-scheduling',
  '/case-study-smart-movie-ticketing-with-real-time-booking',
  '/case-study-smart-warranty-and-document-management-app',
  '/case-study-streamlining-publication-workflows-with-integrated-tracking',
  '/case-study-subscription-management-for-customer-growth',
  '/case-study-tech-driven-workforce-development-platform',
  '/case-study-telehealth-consultation-platform-for-doctors',
  '/case-study-ticket-management-system',
  '/case-study-tender-intelligence',
  '/case-study-vehicle-intelligence',
  '/case-study-web-scraping-solution',
  '/case-study-wellpet-ai-smart-wellness-platform',
  '/clients',
  '/cloud-computing',
  '/computer-vision-development-services',
  '/custom-ai-development-services',
  '/data-engineering-services',
  '/data-science-services',
  '/flutter-application-development-company',
  '/generative-ai-development-company',
  '/global-capability-center',
  '/graphql-development-company',
  '/hire-ai-developer',
  '/hire-android-developers',
  '/hire-angularjs-developers',
  '/hire-backend-application-developer',
  '/hire-blockchain-developer',
  '/hire-dedicated-developers',
  '/hire-devops-developers',
  '/hire-django-developer',
  '/hire-dot-net-developers',
  '/hire-flutter-developers',
  '/hire-forward-deployed-engineer',
  '/hire-frontend-application-developer',
  '/hire-ionic-developers',
  '/hire-ios-developers',
  '/hire-java-developers',
  '/hire-laravel-developer',
  '/hire-mean-stack-developers-india',
  '/hire-mobile-app-developers',
  '/hire-nestjs-developers',
  '/hire-nodejs-developers',
  '/hire-php-developers',
  '/hire-python-developers',
  '/hire-qa-testers-india',
  '/hire-react-native-developers',
  '/hire-reactjs-developers',
  '/hire-ruby-on-rails-developer',
  '/hire-salesforce-developer',
  '/hire-software-developers',
  '/hire-swift-developers',
  '/hire-web-app-developers',
  '/hire-xamarin-developer',
  '/ionic-app-development-company',
  '/ios-application-development-company',
  '/it-outsourcing-company-india',
  '/it-staff-augmentation-services',
  '/java-application-development-company',
  '/legacy-modernization-services',
  '/mobile-application-development-company',
  '/nextjs-development-company',
  '/nodejs-development-company',
  '/offshore-software-development-company',
  '/onestop-digital-banking-solution',
  '/php-application-development-company',
  '/postgresql-development-company',
  '/predictive-intelligence-services',
  '/product-engineering-services',
  '/python-application-development-company',
  '/rag-development-services',
  '/react-native-app-development-company',
  '/reactjs-app-development-company',
  '/software-development-company',
  '/success-stories',
  '/typescript-development-company',
  '/vuejs-development-company',
  '/web-application-development-company',
  '/xamarin-app-development-company',
]);
