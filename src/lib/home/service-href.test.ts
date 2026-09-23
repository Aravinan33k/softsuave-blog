import { describe, expect, it } from 'vitest';
import { MARKETING_ROUTES } from './landing-pages';
import { SERVICE_ROUTE_TARGETS, matchServiceRoute, serviceHref } from './service-href';

describe('matchServiceRoute', () => {
  it.each([
    ['Mobile App Development', '/mobile-application-development-company'],
    ['React Native App Development', '/react-native-app-development-company'],
    ['React.js Development', '/reactjs-app-development-company'],
    ['Next.js Development', '/nextjs-development-company'],
    ['Node.js API Development', '/nodejs-development-company'],
    ['Java Enterprise Applications', '/java-application-development-company'],
    ['.NET Development', '/dot-net-application-development-company'],
    ['Generative AI Development', '/generative-ai-development-company'],
    ['Agentic AI Solutions', '/agentic-ai-development-services'],
    ['Cloud Migration Services', '/cloud-computing'],
    ['Data Engineering', '/data-engineering-services'],
    ['Cloud Data Engineering', '/data-engineering-services'],
    ['IT Staff Augmentation', '/it-staff-augmentation-services'],
    ['Legacy Modernization', '/legacy-modernization-services'],
    ['Custom Software Development', '/software-development-company'],
    ['Web Application Development', '/web-application-development-company'],
    ['Hire Python Developers', '/hire-python-developers'],
    ['Dedicated React Native Developers', '/hire-react-native-developers'],
    ['Hire Mobile App Developers', '/hire-mobile-app-developers'],
    ['Dedicated Development Team', '/hire-dedicated-developers'],
    ['QA & Testing Services', '/hire-qa-testers-india'],
    ['Fintech', '/fintech-ai-solutions'],
  ] as const)('%s → %s', (name, path) => {
    expect(matchServiceRoute(name)).toBe(path);
  });

  it('does not confuse JavaScript with Java, or React Native with React', () => {
    expect(matchServiceRoute('JavaScript Consulting')).not.toBe('/java-application-development-company');
    expect(matchServiceRoute('React Native')).toBe('/react-native-app-development-company');
  });

  it('prefers a service page over a hire-only page outside a hiring context', () => {
    expect(matchServiceRoute('Cloud and DevOps Engineering')).toBe('/cloud-computing');
    expect(matchServiceRoute('Hire DevOps Engineers')).toBe('/hire-devops-developers');
    expect(matchServiceRoute('QA and Software Testing')).toBe('/hire-qa-testers-india');
  });

  it('treats a dedicated team as a hiring context', () => {
    expect(matchServiceRoute('Dedicated ROR Developer Team')).toBe('/hire-ruby-on-rails-developer');
    expect(matchServiceRoute('Dedicated Flutter Team')).toBe('/hire-flutter-developers');
  });

  it('only sends bare sector names to the sector pages', () => {
    expect(matchServiceRoute('Healthcare')).toBe('/ai-solutions-in-healthtech');
    expect(matchServiceRoute('Custom eCommerce Development')).toBeUndefined();
  });

  it('only links on a confident match', () => {
    expect(matchServiceRoute('Scalable Architecture')).toBeUndefined();
    expect(matchServiceRoute('Performance Optimization')).toBeUndefined();
    expect(matchServiceRoute('Requirement Analysis')).toBeUndefined();
    expect(matchServiceRoute('')).toBeUndefined();
  });
});

describe('serviceHref', () => {
  it('never links a card to the page it is on', () => {
    expect(serviceHref('Node.js Development', '/nodejs-development-company')).toBeUndefined();
    expect(serviceHref('Node.js Development', '/nodejs-development-company/')).toBeUndefined();
    expect(serviceHref('Cloud Consulting', '/cloud-computing')).toBeUndefined();
    expect(serviceHref('Anything', '/cloud-computing', '/cloud-computing')).toBeUndefined();
  });

  it('links elsewhere', () => {
    expect(serviceHref('Node.js Development', '/software-development-company')).toBe(
      '/nodejs-development-company',
    );
  });

  it('prefers an explicit href from the content', () => {
    expect(serviceHref('Node.js Development', '/', '/contact')).toBe('/contact');
  });
});

describe('SERVICE_ROUTE_TARGETS', () => {
  it('only points at routes this app serves', () => {
    const routes = new Set(MARKETING_ROUTES);
    const missing = SERVICE_ROUTE_TARGETS.filter((p) => !routes.has(p));
    expect(missing).toEqual([]);
  });
});
