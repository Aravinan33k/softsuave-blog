import type { Metadata } from 'next';
import { CalendarDays, Check, Coffee, MailCheck } from 'lucide-react';
import { absoluteUrl } from '@/lib/seo/metadata';
import { cwThankYou } from '@/lib/home/ad-coffee-with-us-content';
import { SiteLink } from '@/themes/softsuave/site-link';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';
import coffee from '@/components/ad/coffee.module.css';

/**
 * The "Have a Coffee With Us" confirmation page — where the meeting form on
 * /ad/coffee-with-us sends the visitor once the lead is accepted
 * (`CW_THANK_YOU_PATH`). Its own URL rather than the site-wide /thank-you, so
 * this campaign's conversion can be counted on its own.
 *
 * One centred column: a check badge, the confirmation, what happens next, a
 * sign-off and the way back home. No top navigation, like the other /ad
 * pages; the /ad layout adds the footer's copyright and legal line beneath
 * (`ad/layout.tsx`). `noindex, nofollow`, and not in the sitemap.
 */

export const metadata: Metadata = {
  title: cwThankYou.meta.title,
  description: cwThankYou.meta.description,
  alternates: { canonical: cwThankYou.meta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: cwThankYou.meta.title,
    description: cwThankYou.meta.description,
    url: absoluteUrl(cwThankYou.meta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
};

const ICONS = { mail: MailCheck, calendar: CalendarDays, coffee: Coffee } as const;

export default function CoffeeThankYouPage() {
  const t = cwThankYou;
  return (
    <div className={home.page}>
      <main id="main" className={coffee.thanks}>
        <div className={coffee.thanksInner}>
          <span className={coffee.thanksBadge} aria-hidden>
            <span className={coffee.thanksBadgeRing}>
              <Check size={30} strokeWidth={2} />
            </span>
          </span>

          <p className={coffee.thanksEyebrow}>{t.eyebrow}</p>
          <h1 className={coffee.thanksTitle}>{t.title}</h1>
          <p className={coffee.thanksBody}>{t.body[0]}</p>
          <p className={`${coffee.thanksBody} ${coffee.thanksBodyBright}`}>{t.body[1]}</p>

          <section className={coffee.thanksNext} aria-labelledby="cw-next">
            <h2 id="cw-next" className={coffee.thanksNextTitle}>
              {t.next.title}
            </h2>
            <ol className={coffee.thanksSteps}>
              {t.next.items.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.label}>
                    <Icon size={20} strokeWidth={1.7} aria-hidden />
                    {item.label}
                  </li>
                );
              })}
            </ol>
          </section>

          <p className={coffee.thanksSignoff}>{t.signoff}</p>

          {/* The homepage that is live in this environment: SiteLink resolves "/"
              to this app's homepage when it is released, softsuave.com's until then. */}
          {/* The site's primary button (landing .btn .btnPrimary, by request): the
              softsuave.com orange and its left-to-right white wipe on hover. */}
          <SiteLink href={t.cta.href} className={`${landing.btn} ${landing.btnPrimary} ${coffee.thanksCta}`}>
            {t.cta.label}
          </SiteLink>

          <p className={coffee.thanksFooterLine}>{t.footerLine}</p>
        </div>
      </main>
    </div>
  );
}
