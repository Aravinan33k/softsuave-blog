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
 *   /typescript-development-company
 *   /vuejs-development-company
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
  '/agentic-ai-development-services',
  '/android-application-development-company',
  '/computer-vision-development-services',
  '/custom-ai-development-services',
  '/data-engineering-services',
  '/data-science-services',
  '/flutter-application-development-company',
  '/generative-ai-development-company',
  '/graphql-development-company',
  '/hire-android-developers',
  '/hire-angularjs-developers',
  '/hire-backend-application-developer',
  '/hire-blockchain-developer',
  '/hire-dedicated-developers',
  '/hire-devops-developers',
  '/hire-dot-net-developers',
  '/hire-flutter-developers',
  '/hire-frontend-application-developer',
  '/hire-ionic-developers',
  '/hire-ios-developers',
  '/hire-java-developers',
  '/hire-mean-stack-developers-india',
  '/hire-mobile-app-developers',
  '/hire-nestjs-developers',
  '/hire-nodejs-developers',
  '/hire-php-developers',
  '/hire-python-developers',
  '/hire-qa-testers-india',
  '/hire-react-native-developers',
  '/hire-reactjs-developers',
  '/hire-salesforce-developer',
  '/hire-software-developers',
  '/hire-swift-developers',
  '/hire-web-app-developers',
  '/ionic-app-development-company',
  '/ios-application-development-company',
  '/mobile-application-development-company',
  '/nextjs-development-company',
  '/php-application-development-company',
  '/postgresql-development-company',
  '/predictive-intelligence-services',
  '/python-application-development-company',
  '/rag-development-services',
  '/react-native-app-development-company',
  '/typescript-development-company',
  '/vuejs-development-company',
  '/xamarin-app-development-company',
]);
