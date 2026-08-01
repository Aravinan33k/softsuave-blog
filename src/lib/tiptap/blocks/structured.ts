import { Node, mergeAttributes } from '@tiptap/core';
import type { DOMOutputSpec } from '@tiptap/pm/model';

// Structured, data-driven blocks (Feature Grid, Stats, Steps). Each stores an
// `items` array in contentJson and builds its published HTML dynamically in
// renderHTML. They are atoms in the document; their content is edited through a
// small React NodeView form (see components/admin/editor/node-views). No parseHTML
// is needed — these are authored in the editor, not parsed from imported HTML.

export interface FeatureItem { icon: string; title: string; desc: string }
export interface StatItem { value: string; label: string }
export interface StepItem { title: string; desc: string }

const s = (v: unknown) => String(v ?? '');

export const FeatureGrid = Node.create({
  name: 'featureGrid',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      items: {
        default: [
          { icon: '⚡', title: 'Fast', desc: '' },
          { icon: '🔒', title: 'Secure', desc: '' },
          { icon: '🤖', title: 'AI', desc: '' },
          { icon: '☁', title: 'Cloud', desc: '' },
        ] as FeatureItem[],
        rendered: false,
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const items = (node.attrs.items as FeatureItem[]) ?? [];
    const children: DOMOutputSpec[] = items.map((it) => {
      const cell: DOMOutputSpec[] = [
        ['div', { class: 'feature-ico' }, s(it.icon)],
        ['p', { class: 'feature-title' }, s(it.title)],
      ];
      if (it.desc) cell.push(['p', { class: 'feature-desc' }, s(it.desc)]);
      return ['div', { class: 'feature' }, ...cell] as unknown as DOMOutputSpec;
    });
    return ['div', mergeAttributes(HTMLAttributes, { class: 'feature-grid' }), ...children] as unknown as DOMOutputSpec;
  },
});

export const StatsBlock = Node.create({
  name: 'statsBlock',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      items: {
        default: [
          { value: '15K+', label: 'Customers' },
          { value: '120+', label: 'Countries' },
          { value: '99.9%', label: 'Uptime' },
        ] as StatItem[],
        rendered: false,
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const items = (node.attrs.items as StatItem[]) ?? [];
    const children: DOMOutputSpec[] = items.map(
      (it) =>
        [
          'div',
          { class: 'stat' },
          ['span', { class: 'stat-num' }, s(it.value)],
          ['span', { class: 'stat-label' }, s(it.label)],
        ] as unknown as DOMOutputSpec,
    );
    return ['div', mergeAttributes(HTMLAttributes, { class: 'stats' }), ...children] as unknown as DOMOutputSpec;
  },
});

export const StepsBlock = Node.create({
  name: 'stepsBlock',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      items: {
        default: [
          { title: 'Install', desc: '' },
          { title: 'Configure', desc: '' },
          { title: 'Deploy', desc: '' },
        ] as StepItem[],
        rendered: false,
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const items = (node.attrs.items as StepItem[]) ?? [];
    const children: DOMOutputSpec[] = items.map((it, i) => {
      const body: DOMOutputSpec[] = [['p', { class: 'step-title' }, s(it.title)]];
      if (it.desc) body.push(['p', { class: 'step-desc' }, s(it.desc)]);
      return [
        'li',
        { class: 'step' },
        ['span', { class: 'step-n' }, String(i + 1)],
        ['div', { class: 'step-body' }, ...body],
      ] as unknown as DOMOutputSpec;
    });
    return ['ol', mergeAttributes(HTMLAttributes, { class: 'steps' }), ...children] as unknown as DOMOutputSpec;
  },
});
