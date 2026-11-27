import landing from "@/components/landing/landing.module.css";
import Reveal from "./reveal";
import styles from "../rdp.module.css";

/** A small team at the centre, more developers joining around it: [x, y, ring]. */
const NODES: readonly (readonly [number, number, number])[] = [
  [200, 120, 0],
  [130, 80, 1],
  [270, 80, 1],
  [130, 160, 1],
  [270, 160, 1],
  [60, 40, 2],
  [200, 30, 2],
  [340, 40, 2],
  [60, 200, 2],
  [200, 210, 2],
  [340, 200, 2],
];
/** Which node each one links back to. */
const LINKS: readonly (readonly [number, number])[] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [1, 6], [2, 6], [2, 7],
  [3, 8], [3, 9], [4, 9], [4, 10],
];

/**
 * "Scale Your Developer Team On-Demand" (/ad/remote-developers-page): the copy
 * and button on the left, and on the right a drawn network of team nodes that
 * grows outward ring by ring when it scrolls into view (`Reveal`). Decorative,
 * so it is hidden from assistive tech.
 */
export default function ScaleBanner({
  content,
}: {
  content: { readonly title: string; readonly body: string; readonly cta: { readonly label: string; readonly href: string } };
}) {
  return (
    <section className={`${styles.shell} ${styles.scale}`} aria-labelledby="rdp-scale-title">
      <div className={styles.scaleGrid}>
        <div>
          <h2 id="rdp-scale-title" className={styles.bannerTitle}>
            {content.title}
          </h2>
          <p className={styles.bannerBody}>{content.body}</p>
          <a className={`${landing.btn} ${landing.btnPrimary} ${landing.btnLg} ${styles.bannerBtn}`} href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
        <Reveal className={styles.scaleArt}>
          <svg viewBox="0 0 400 240" role="presentation" aria-hidden focusable="false">
            {LINKS.map(([a, b], i) => (
              <line
                key={`${a}-${b}`}
                className={styles.scaleLink}
                style={{ ["--i" as string]: NODES[b][2] * 4 + (i % 4) }}
                x1={NODES[a][0]}
                y1={NODES[a][1]}
                x2={NODES[b][0]}
                y2={NODES[b][1]}
              />
            ))}
            {NODES.map(([x, y, ring], i) => (
              <g
                key={i}
                className={styles.scaleNode}
                data-ring={ring}
                style={{ ["--i" as string]: ring * 4 + (i % 4), transformOrigin: `${x}px ${y}px` }}
              >
                <circle cx={x} cy={y} r={ring === 0 ? 22 : ring === 1 ? 15 : 11} />
                <circle cx={x} cy={y - (ring === 0 ? 6 : 4)} r={ring === 0 ? 6 : 4} className={styles.scaleHead} />
                <path
                  d={`M ${x - (ring === 0 ? 10 : 7)} ${y + (ring === 0 ? 11 : 7)} q ${ring === 0 ? 10 : 7} ${ring === 0 ? -12 : -8} ${ring === 0 ? 20 : 14} 0`}
                  className={styles.scaleBody}
                />
              </g>
            ))}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
