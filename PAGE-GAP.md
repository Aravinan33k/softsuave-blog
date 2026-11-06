# Page gap: this app vs softsuave.com

Generated 2026-09-20 by diffing `src/app/**/page.tsx` against the
live sitemap (`https://www.softsuave.com/sitemap.xml`, 623 URLs, 212 non-blog).

- Live non-blog pages: 212
- Built here: 85
- **Missing: 144**
- Built here but NOT on live (new work): 17

Caveat: a slug could also be served from the CMS via `src/app/[slug]/page.tsx`.
The database was unreachable when this ran, so only file-based routes were checked.
Nothing in `prisma/seed.ts` creates these slugs.

## Nav links with no local page

These are linked from `src/lib/home/nav-menu.ts` and had no route in this app.

**They were not 404ing.** `navHref` (`src/themes/softsuave/nav-data.ts`) treats
any path outside `MARKETING_ROUTES` as belonging to the live site, so each one
sent the reader to softsuave.com — and all ten return 200 there. The cost was a
reader silently leaving the app mid-journey, not a broken link.

Building the page is only half the fix: a route must also be registered in
`landing-pages.ts`, because that registry is what `LOCAL_PATHS` derives from.
An unregistered page exists and nothing links to it.

| Link | Live status | Built here |
|---|---|---|
| `/clients` | 200 | yes |
| `/faqs` | 200 | yes |
| `/case-studies` | 200 | yes |
| `/success-stories` | 200 | yes |
| `/life-at-softsuave` | 200 | not yet |
| `/free-cost-estimation` | 200 | not yet |
| `/php-application-development-company` | 200 | not yet |
| `/python-application-development-company` | 200 | not yet |
| `/career-overview` | 200 | not yet |
| `/how-to-hire` | 200 | not yet |

`/career-overview` and `/how-to-hire` are absent from the live sitemap but
serve 200 — an earlier revision of this file called them dead on live, which
was wrong. A sitemap is not an inventory of what resolves.

`/career-overview` also backs the "apply for jobs" notice under every hero
enquiry form (`sharedHeroAlert` in `src/lib/home/delivery-shared.ts`), which
reaches the live careers page through `SiteLink` for the same reason.

## Missing, by group

### Hub / index pages (8)
Nav and footer point at several of these.

- /case-studies
- /clients
- /engagement-model
- /faqs
- /portfolio
- /services
- /success-stories
- /technologies

### Case studies (64)
Individual `case-study-*` pages, plus the `/case-studies` index above.

- /case-study-ai-assist-logistics-onboarding
- /case-study-ai-chatbot-for-engagement-and-secure-transactions
- /case-study-ai-driven-cybersecurity-automation
- /case-study-ai-driven-equipment-&-workforce-optimization
- /case-study-ai-optimization-in-healthcare
- /case-study-ai-powered-business-intelligence-insights
- /case-study-ai-powered-cyber-theart-detection
- /case-study-ai-powered-education-solutions
- /case-study-ai-powered-multi-cloud-management
- /case-study-all-in-one-financial-management-app
- /case-study-area-mapping-solution
- /case-study-billing-platform
- /case-study-blockchain-digital-currency-platform
- /case-study-brand-forge
- /case-study-centralized-shipment-tracking
- /case-study-cloud-based-campus-management
- /case-study-comprehensive-ecommerce-for-retail
- /case-study-corporate-banking-solution
- /case-study-crm-application-for-real-estate
- /case-study-custom-business-management-platform
- /case-study-digital-advertising-in-public-spaces
- /case-study-digitizing-product-inspections
- /case-study-ecommerce-platform
- /case-study-field-workforce-management
- /case-study-freelancer-platform
- /case-study-healthpass-wellness-subscriptions-in-banking
- /case-study-high-performance-lms-for-education
- /case-study-high-performance-trading-platform
- /case-study-hire-voice
- /case-study-intuitive-online-shopping-platform
- /case-study-job-progress-tracking
- /case-study-legal-violation-tracking-application
- /case-study-logistics-ride-hailing-application
- /case-study-marketmind-ai-market-intelligence
- /case-study-monetize-digital-assets-through-eCommerce
- /case-study-neurora-behavioral-intelligence
- /case-study-online-consultation-platform-for-doctors
- /case-study-optimizing-a-healthcare-application
- /case-study-optimizing-influencer-and-brand-collaborations
- /case-study-parksafe-community-vehicle-alert-app
- /case-study-patientcare-platform
- /case-study-personalized-ecommerce-platform
- /case-study-postguard-compliance-ai
- /case-study-project-&-compliance-workflow-transformation
- /case-study-restaurant-workflow-optimization
- /case-study-saas-platform-for-corporate-banking
- /case-study-safeops-ai-incident-management
- /case-study-salesforce-telephone-app-integration
- /case-study-savings-solution-for-better-financial-management
- /case-study-scalable-delivery-mangement-for-logistics
- /case-study-shiftsense-ai-shift-intelligence
- /case-study-smart-digital-signage-with-advanced-ad-scheduling
- /case-study-smart-movie-ticketing-with-real-time-booking
- /case-study-smart-warranty-and-document-management-app
- /case-study-streamlining-publication-workflows-with-integrated-tracking
- /case-study-subscription-management-for-customer-growth
- /case-study-tech-driven-financial-modeling-platform
- /case-study-tech-driven-workforce-development-platform
- /case-study-telehealth-consultation-platform-for-doctors
- /case-study-tender-intelligence
- /case-study-ticket-management-system
- /case-study-vehicle-intelligence
- /case-study-web-scraping-solution
- /case-study-wellpet-ai-smart-wellness-platform

### Portfolio items (17)

- /portfolio
- /portfolio-Appinux
- /portfolio-buildingowl
- /portfolio-driveby
- /portfolio-english3
- /portfolio-eurotm
- /portfolio-flipixs
- /portfolio-grabcery
- /portfolio-grabcery-android
- /portfolio-grabcery-ios
- /portfolio-job-track
- /portfolio-speedhome
- /portfolio-sulekha-events
- /portfolio-udl
- /portfolio-virujh
- /portfolio-whos-up
- /portfolio-zipdoc

### Geo / location pages (12)

- /hire-full-stack-developers-in-india
- /mobile-app-development-company-dubai
- /mobile-app-development-company-germany
- /mobile-app-development-company-italy
- /mobile-app-development-company-maryland
- /mobile-app-development-company-poland
- /mobile-app-development-company-saudi-arabia
- /mobile-app-development-company-south-africa
- /software-development-company-france
- /software-development-company-germany
- /software-development-company-india
- /software-development-company-spain

### Offshore tech sub-pages (8)
Nested under a segment that does not exist here at all.

- /offshore-software-development-company/angular
- /offshore-software-development-company/dot-net
- /offshore-software-development-company/flutter
- /offshore-software-development-company/java
- /offshore-software-development-company/php
- /offshore-software-development-company/react-native
- /offshore-software-development-company/ror
- /offshore-software-development-company/ruby-on-rails

### Lead-gen / calculators (9)

- /30-min-free-consultation
- /developer-estimation
- /developer-rate-card
- /free-7-days-trial
- /free-cost-estimation
- /free-demo-app
- /free-quote
- /mobile-app-estimation
- /staff-augmentation-cost-calculator

### Hire-role pages (5)

- /hire-cms-developer
- /hire-full-stack-developers-in-india
- /hire-saas-developer
- /hire-selenium-tester
- /hire-xamarin-developer

### Service / industry pages (rest)

- /30-min-free-consultation
- /case-study-ai-assist-logistics-onboarding
- /case-study-ai-chatbot-for-engagement-and-secure-transactions
- /case-study-ai-driven-cybersecurity-automation
- /case-study-ai-driven-equipment-&-workforce-optimization
- /case-study-ai-optimization-in-healthcare
- /case-study-ai-powered-business-intelligence-insights
- /case-study-ai-powered-cyber-theart-detection
- /case-study-ai-powered-education-solutions
- /case-study-ai-powered-multi-cloud-management
- /case-study-all-in-one-financial-management-app
- /case-study-area-mapping-solution
- /case-study-billing-platform
- /case-study-blockchain-digital-currency-platform
- /case-study-brand-forge
- /case-study-centralized-shipment-tracking
- /case-study-cloud-based-campus-management
- /case-study-comprehensive-ecommerce-for-retail
- /case-study-corporate-banking-solution
- /case-study-crm-application-for-real-estate
- /case-study-custom-business-management-platform
- /case-study-digital-advertising-in-public-spaces
- /case-study-digitizing-product-inspections
- /case-study-ecommerce-platform
- /case-study-field-workforce-management
- /case-study-freelancer-platform
- /case-study-healthpass-wellness-subscriptions-in-banking
- /case-study-high-performance-lms-for-education
- /case-study-high-performance-trading-platform
- /case-study-hire-voice
- /case-study-intuitive-online-shopping-platform
- /case-study-job-progress-tracking
- /case-study-legal-violation-tracking-application
- /case-study-logistics-ride-hailing-application
- /case-study-marketmind-ai-market-intelligence
- /case-study-monetize-digital-assets-through-eCommerce
- /case-study-neurora-behavioral-intelligence
- /case-study-online-consultation-platform-for-doctors
- /case-study-optimizing-a-healthcare-application
- /case-study-optimizing-influencer-and-brand-collaborations
- /case-study-parksafe-community-vehicle-alert-app
- /case-study-patientcare-platform
- /case-study-personalized-ecommerce-platform
- /case-study-postguard-compliance-ai
- /case-study-project-&-compliance-workflow-transformation
- /case-study-restaurant-workflow-optimization
- /case-study-saas-platform-for-corporate-banking
- /case-study-safeops-ai-incident-management
- /case-study-salesforce-telephone-app-integration
- /case-study-savings-solution-for-better-financial-management
- /case-study-scalable-delivery-mangement-for-logistics
- /case-study-shiftsense-ai-shift-intelligence
- /case-study-smart-digital-signage-with-advanced-ad-scheduling
- /case-study-smart-movie-ticketing-with-real-time-booking
- /case-study-smart-warranty-and-document-management-app
- /case-study-streamlining-publication-workflows-with-integrated-tracking
- /case-study-subscription-management-for-customer-growth
- /case-study-tech-driven-financial-modeling-platform
- /case-study-tech-driven-workforce-development-platform
- /case-study-telehealth-consultation-platform-for-doctors
- /case-study-tender-intelligence
- /case-study-ticket-management-system
- /case-study-vehicle-intelligence
- /case-study-web-scraping-solution
- /case-study-wellpet-ai-smart-wellness-platform
- /construction-employee-time-tracking-app
- /construction-project-management-software
- /cross-platform-application-development-company
- /ecommerce-app-development-package
- /ecommerce-mobile-app-development-company
- /education-app-development-company
- /free-7-days-trial
- /free-demo-app
- /free-quote
- /healthcare-mobile-app-development-company
- /hire-cms-developer
- /hire-saas-developer
- /hire-selenium-tester
- /hire-xamarin-developer
- /life-at-softsuave
- /low-code-development-company
- /magento-development
- /multi-vendor-marketplace-platform
- /offshore-ror-development-company
- /offshore-software-development-company/angular
- /offshore-software-development-company/dot-net
- /offshore-software-development-company/flutter
- /offshore-software-development-company/java
- /offshore-software-development-company/php
- /offshore-software-development-company/react-native
- /offshore-software-development-company/ror
- /offshore-software-development-company/ruby-on-rails
- /onestop-digital-banking-solution
- /php-application-development-company
- /portfolio-Appinux
- /portfolio-buildingowl
- /portfolio-driveby
- /portfolio-english3
- /portfolio-eurotm
- /portfolio-flipixs
- /portfolio-grabcery
- /portfolio-grabcery-android
- /portfolio-grabcery-ios
- /portfolio-job-track
- /portfolio-speedhome
- /portfolio-sulekha-events
- /portfolio-udl
- /portfolio-virujh
- /portfolio-whos-up
- /portfolio-zipdoc
- /pos-software-development-company
- /privacy-policy
- /python-application-development-company
- /real-estate-crm-software-development
- /retail-solutions
- /secured-communication-app-for-patient-care
- /test-web-est
- /video-call-app-development-company
- /wordpress-development-company

## Built here, not on live (17)

New work — the AI/service push plus the blog surface. Nothing to port.

- /agentic-ai-development-services
- /blog
- /category/[slug]
- /computer-vision-development-services
- /custom-ai-development-services
- /data-engineering-services
- /data-science-services
- /generative-ai-development-company
- /graphql-development-company
- /hire-forward-deployed-engineer
- /nextjs-development-company
- /predictive-intelligence-services
- /preview/[type]/[id]
- /rag-development-services
- /search
- /tag/[slug]
- /typescript-development-company
