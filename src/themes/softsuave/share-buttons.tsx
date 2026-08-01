'use client';

import { useEffect, useState, type FunctionComponent } from 'react';
import { CheckIcon, FacebookIcon, LinkedinIcon, LinkIcon, TwitterIcon, WhatsappIcon } from './icons';

const BTN_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-full border text-neutral-600 transition-colors hover:border-[#ff0042] hover:text-[#ff0042]';

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    // Client-only: capture the canonical share URL after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links: [FunctionComponent<{ className?: string }>, string, string][] = [
    [FacebookIcon, `https://www.facebook.com/sharer/sharer.php?u=${u}`, 'Facebook'],
    [LinkedinIcon, `https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${t}`, 'LinkedIn'],
    [TwitterIcon, `https://twitter.com/intent/tweet?url=${u}&text=${t}`, 'X (Twitter)'],
    [WhatsappIcon, `https://wa.me/?text=${t}%20${u}`, 'WhatsApp'],
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — no-op.
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="ss-heading text-sm font-semibold text-neutral-700">Share:</span>
      {links.map(([Icon, href, label]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={BTN_CLASS}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Copied!' : 'Copy link'}
        className={BTN_CLASS}
      >
        {copied ? <CheckIcon className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
