import { CheckCircle2, XCircle } from 'lucide-react';
import { Fragment } from 'react';
import { ecomPackage, type CellFrag } from '@/lib/home/ecommerce-package-content';
import styles from './ecommerce-package.module.css';

function Frag({ f }: { f: CellFrag }) {
  if (typeof f === 'string') return <>{f}</>;
  if ('icon' in f) {
    return f.icon === 'yes' ? (
      <CheckCircle2 className={styles.yes} size={18} aria-label="Included" role="img" />
    ) : (
      <XCircle className={styles.no} size={18} aria-label="Not included" role="img" />
    );
  }
  if ('br' in f) return <br />;
  if ('star' in f) return <span className={styles.star}>{f.star}</span>;
  if ('small' in f) return <small className={styles.small}>{f.small}</small>;
  return (
    <span className={styles.price}>
      <sup>{f.price.cur}</sup> {f.price.amount}
    </span>
  );
}

function Cell({ frags }: { frags: readonly CellFrag[] }) {
  const lead = frags[0];
  /* A mark on its own line above its text, as the live table sets it; a lone mark stays alone. */
  const markFirst = typeof lead === 'object' && 'icon' in lead;
  return (
    <td className={styles.cell}>
      {frags.map((f, i) => (
        <Fragment key={i}>
          <Frag f={f} />
          {markFirst && i === 0 && frags.length > 1 ? <br /> : null}
        </Fragment>
      ))}
    </td>
  );
}

/** The package and price table: three platforms side by side, grouped by area. */
export default function PackageTable() {
  const t = ecomPackage;
  return (
    <div className={styles.wrap} role="region" aria-label={t.title} tabIndex={0}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.corner} />
            {t.columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((row, i) =>
            'section' in row ? (
              <tr key={i}>
                <th colSpan={4} scope="colgroup" className={styles.section}>
                  {row.section}
                </th>
              </tr>
            ) : (
              row.lines.map((line, li) => (
                <tr key={`${i}-${li}`}>
                  {li === 0 ? (
                    <th scope="row" rowSpan={row.lines.length} className={styles.rowHead}>
                      {row.head}
                    </th>
                  ) : null}
                  {line.map((frags, ci) => (
                    <Cell key={ci} frags={frags} />
                  ))}
                </tr>
              ))
            ),
          )}
        </tbody>
      </table>
      <p className={styles.note}>
        <span className={styles.star}>{t.note.star}</span>
        {t.note.text}
      </p>
    </div>
  );
}
