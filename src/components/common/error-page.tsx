import Image from 'next/image';
import { publicMediaUrl } from '@/lib/media-url';
import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import { SiteLink } from '@/themes/softsuave/site-link';
import home from '@/components/home/home.module.css';
import styles from './error-page.module.css';

/**
 * An error page as the live site draws /404 and /410: the site's header and footer around one
 * signpost illustration and a "Go back to home" link. Shared by both routes, which differ only in
 * their address (the live pages differ in the number on the sign).
 *
 * The band is light so the illustration, drawn on white, melts into it.
 */
export default function ErrorPage({
  image,
  link,
}: {
  image: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  link: { readonly label: string; readonly href: string };
}) {
  return (
    <div className={home.page}>
      <Nav />

      <main id="main" className={`${home.light} ${styles.wrap}`}>
        <Image
          src={publicMediaUrl(image.src)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 520px) 88vw, 480px"
          className={styles.art}
          priority
        />
        <SiteLink href={link.href} className={styles.home}>
          {link.label}
        </SiteLink>
      </main>

      <Footer />
    </div>
  );
}
