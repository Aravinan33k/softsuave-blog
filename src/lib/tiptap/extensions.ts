import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';
import { Callout } from './callout';
import { SmartLink } from './blocks/link';
import { CtaButton } from './blocks/cta-button';
import { CtaSection } from './blocks/cta-section';
import { YoutubeEmbed } from './blocks/youtube';
import { FigureImage } from './blocks/figure-image';
import { Faq, FaqItem } from './blocks/faq';
import { FeatureGrid, StatsBlock, StepsBlock } from './blocks/structured';

// Extension set shared between the client editor and the server-side HTML
// renderer, so the stored contentJson and the rendered contentHtml always agree.
// StarterKit v3 already bundles Link, Underline, lists, code, blockquote, etc.
// Headings are capped at h2–h4: the page/post title is the single <h1> (SEO).
// TableKit adds tables (needed to preserve WordPress comparison tables on import).
//
// The custom block nodes below define schema + parseHTML + renderHTML only (no
// React), so this module stays safe to import on the server (generateHTML). The
// client editor augments specific nodes with React NodeViews via
// lib/tiptap/editor-extensions (never imported on the server).
export const baseExtensions = [
  // Link handled by SmartLink (external-aware) instead of StarterKit's link.
  StarterKit.configure({
    heading: { levels: [2, 3, 4] },
    link: false,
  }),
  SmartLink,
  Image.configure({
    inline: false,
    allowBase64: false,
    // Lazy-load + async-decode content images (they sit below the LCP banner).
    HTMLAttributes: { loading: 'lazy', decoding: 'async' },
  }),
  TableKit.configure({ table: { resizable: true } }),
  Callout,
  CtaButton,
  CtaSection,
  YoutubeEmbed,
  FigureImage,
  Faq,
  FaqItem,
  FeatureGrid,
  StatsBlock,
  StepsBlock,
];
