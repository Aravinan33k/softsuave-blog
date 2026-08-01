import { ReactNodeViewRenderer } from '@tiptap/react';
import { Node, type NodeViewRenderer } from '@tiptap/core';
import { baseExtensions } from './extensions';
import { FaqItemView } from '@/components/admin/editor/node-views/faq-item-view';
import { FeatureGridView, StatsView, StepsView } from '@/components/admin/editor/node-views/structured-views';
import { CtaSectionView } from '@/components/admin/editor/node-views/cta-section-view';

// Client-only editor extension list. It reuses the shared, server-safe
// baseExtensions and attaches React NodeViews to the nodes that need a custom
// editing UI. The server HTML renderer never imports this module, so no client
// code leaks into generateHTML.
const nodeViews: Record<string, () => NodeViewRenderer> = {
  faqItem: () => ReactNodeViewRenderer(FaqItemView),
  featureGrid: () => ReactNodeViewRenderer(FeatureGridView),
  statsBlock: () => ReactNodeViewRenderer(StatsView),
  stepsBlock: () => ReactNodeViewRenderer(StepsView),
  ctaSection: () => ReactNodeViewRenderer(CtaSectionView),
};

export const editorExtensions = baseExtensions.map((ext) => {
  const make = nodeViews[ext.name];
  // Only nodes are extended here; cast narrows the mixed extension union so
  // `.extend` resolves to a single (callable) signature.
  return make ? (ext as unknown as Node).extend({ addNodeView: make }) : ext;
});
