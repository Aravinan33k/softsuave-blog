import { FooterBottom } from '@/components/home/footer';
import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

export default function AdLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className={`${home.page} ${styles.copyrightBar}`} style={{ paddingBottom: 28 }}>
        <FooterBottom />
      </div>
    </>
  );
}
