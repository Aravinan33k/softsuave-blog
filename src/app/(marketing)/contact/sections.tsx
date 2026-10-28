'use client';

import { contactHeading, contactTestimonials } from '@/lib/home/contact-content';
import Breadcrumb from '@/components/common/breadcrumb';
import ContactChannels from '@/components/contact/contact-channels';
import { ContactAwards, ContactOffices } from '@/components/contact/contact-sections';
import Testimonials from '@/components/home/testimonials';
import styles from '@/components/home/home.module.css';
import cx from '@/components/contact/contact.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 */
export default function Sections() {
  return (
    <>
      {/* The hero — heading and the three channel cards — on white. `.light`
          re-points the band tokens (so the breadcrumb and h1 turn dark);
          `.heroWhite` takes its warm off-white ground to pure white. */}
      <div className={`${styles.light} ${cx.heroWhite}`}>
        <section className={cx.lead}>
          <Breadcrumb tone="band" className={cx.crumb} />
          <h1 className={cx.h1}>{contactHeading}</h1>
        </section>
        <ContactChannels />
      </div>
      {/* The offices on the live page's light world-map band; the dark
          awards band then sits between two light ones. */}
      <div className={styles.light}>
        <ContactOffices />
      </div>

      <ContactAwards />

      {/* The homepage's own testimonials section, in the same warm-white band
          the homepage gives it, fed the live contact page's wording. */}
      <div className={styles.light}>
        <Testimonials content={contactTestimonials} />
      </div>
    </>
  );
}
