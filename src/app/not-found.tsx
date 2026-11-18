import type { Metadata } from 'next';
import { marketingFontVariables } from '@/lib/home/marketing-fonts';
import ScrollProvider from '@/components/home/scroll-provider';
import { notFoundContent, notFoundMeta } from '@/lib/home/not-found-content';
import ErrorPage from '@/components/common/error-page';
import './(marketing)/home.css';

/**
 * The site-wide 404: any URL no route (and no published post or page) answers lands here, with the
 * same designed page as /404 and the marketing header and footer, instead of Next's bare default.
 * It sits outside the (marketing) layout, so the fonts, theme tokens and scroll provider are
 * applied here. The response status stays 404.
 */
export const metadata: Metadata = {
  title: { absolute: notFoundMeta.title },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={`${marketingFontVariables} theme-four`}>
      <ScrollProvider>
        <ErrorPage image={notFoundContent.image} link={notFoundContent.link} />
      </ScrollProvider>
    </div>
  );
}
