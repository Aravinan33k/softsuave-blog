import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from './icons';
import { SITE, navHref } from './nav-data';

const SERVICES = [
  ['Global Capability Center (GCC)', '/global-capability-center'],
  ['AI Development Services', '/ai-development-service'],
  ['Software Development Services', '/software-development-company-india'],
  ['Mobile App Development Services', '/mobile-application-development-company'],
  ['Web App Development Services', '/web-application-development-company'],
  ['Legacy Modernization Services', '/legacy-modernization-services'],
];
const DELIVERY = [
  ['Offshore Software Development', '/offshore-software-development-company'],
  ['IT Staff Augmentation Services', '/it-staff-augmentation-services'],
  ['Hire Dedicated Developer Team', '/hire-dedicated-developers'],
];
const INDUSTRIES = [
  ['Aviation', '/ai-in-aviation'],
  ['Logistics', '/ai-in-logistics'],
  ['FinTech', '/fintech-ai-solutions'],
  ['HealthTech', '/ai-solutions-in-healthtech'],
  ['EdTech', '/ai-solutions-in-edutech'],
  ['Construction', '/ai-solutions-for-construction'],
];
const FOOTER_LINKS = [
  ['Clients', '/clients'],
  ['Blog', '/blog'],
  ['Careers', '/career-overview'],
  ['Contact', '/contact'],
  ['Case Studies', '/case-studies'],
  ['Privacy Policy', '/privacy-policy'],
  ['FAQ', '/faqs'],
];
const SOCIALS = [
  [FacebookIcon, 'https://www.facebook.com/softsuave/', 'Facebook'],
  [TwitterIcon, 'https://twitter.com/softsuave', 'Twitter'],
  [LinkedinIcon, 'https://in.linkedin.com/company/softsuave', 'LinkedIn'],
  [InstagramIcon, 'https://www.instagram.com/softsuavetech/', 'Instagram'],
  [YoutubeIcon, 'https://www.youtube.com/@softsuave', 'YouTube'],
] as const;

/** Site-relative hrefs resolve via the nav's rules; social URLs pass through. */
function abs(href: string): string {
  return href.startsWith('/') ? navHref(href) : href;
}

function Column({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="ss-heading mb-3 text-sm font-bold uppercase tracking-wide text-white">{title}</h3>
      <ul className="space-y-2 text-sm text-neutral-400">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={abs(href)} className="transition-colors hover:text-[#ff0042]">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SoftSuaveFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0d0d0f] text-neutral-300">
      <div className="mx-auto max-w-[1320px] px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Services" links={SERVICES} />
          <Column title="Delivery Method" links={DELIVERY} />
          <Column title="Industries" links={INDUSTRIES} />
          <div>
            <h3 className="ss-heading mb-3 text-sm font-bold uppercase tracking-wide text-white">Follow us</h3>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(([Icon, href, label]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition-colors hover:border-[#ff0042] hover:text-[#ff0042]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-neutral-400">
          Soft Suave is an offshore software development company specializing in web, mobile apps, and software
          development. Leveraging cutting-edge AI technologies, we deliver innovative solutions that empower businesses
          across industries to reach new heights.
        </p>

        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
          {FOOTER_LINKS.map(([label, href]) => (
            <a key={label} href={abs(href)} className="transition-colors hover:text-[#ff0042]">
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-8 grid gap-6 border-t border-neutral-800 pt-8 text-sm text-neutral-400 sm:grid-cols-2">
          <div>
            <p className="ss-heading mb-1 font-bold text-white">Main Branch — India</p>
            <p>Soft Suave Technologies, SSPDL Building, Alpha City, Gamma Block, 5th Floor, Navalur, Chennai — 603103.</p>
            <p className="mt-1">
              <a href="tel:+918015159981" className="hover:text-[#ff0042]">+91 8015159981</a> (HR)
            </p>
          </div>
          <div>
            <p className="ss-heading mb-1 font-bold text-white">Let&apos;s meet up — USA</p>
            <p>Soft Suave LLC, 3030 K Street NW, Suite 102, Washington, DC 20007, USA.</p>
            <p className="mt-1">
              <a href="mailto:contact@softsuave.com" className="hover:text-[#ff0042]">contact@softsuave.com</a> ·{' '}
              <a href="tel:+14102206301" className="hover:text-[#ff0042]">+1 (410) 220-6301</a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500">
          Copyright © {year} by{' '}
          <a href={SITE} className="text-[#ff0042] hover:underline">Soft Suave</a>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
