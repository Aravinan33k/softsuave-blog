'use client';

import { useEffect, useReducer, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import type { JSONContent } from '@tiptap/core';
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Lightbulb,
  Link2,
  Link2Off,
  ImageIcon,
  Image as ImageFrame,
  Table as TableIcon,
  Table2,
  Columns3,
  Rows3,
  Film,
  Star,
  Images,
  ListCollapse,
  BookOpen,
  Undo2,
  Redo2,
  Plus,
  Minus,
  Video,
  LayoutGrid,
  BarChart3,
  ListChecks,
  HelpCircle,
  MousePointerClick,
  Megaphone,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { editorExtensions } from '@/lib/tiptap/editor-extensions';
import { CALLOUT_VARIANTS } from '@/lib/tiptap/callout';
import { CTA_VARIANTS } from '@/lib/tiptap/blocks/cta-button';
import { parseYouTubeId } from '@/lib/tiptap/blocks/youtube';
import { parseVimeoId } from '@/lib/tiptap/blocks/vimeo';
import { TABLE_STYLES, comparisonTable } from '@/lib/tiptap/blocks/table-style';
import { MediaPicker } from '@/components/admin/media/media-picker';

const EMPTY_DOC: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] };

export function RichEditor({
  value,
  onChange,
}: {
  value: JSONContent | null;
  onChange: (json: JSONContent) => void;
}) {
  const [, forceUpdate] = useReducer((n: number) => n + 1, 0);

  const editor = useEditor({
    extensions: [...editorExtensions, Placeholder.configure({ placeholder: 'Write your content…' })],
    content: value ?? EMPTY_DOC,
    immediatelyRender: false, // avoid SSR hydration mismatch in Next
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: { attributes: { class: 'ProseMirror focus:outline-none' } },
  });

  // Re-render the toolbar as selection/marks change.
  useEffect(() => {
    if (!editor) return;
    const update = () => forceUpdate();
    editor.on('transaction', update);
    return () => {
      editor.off('transaction', update);
    };
  }, [editor]);

  if (!editor) return <div className="min-h-64 rounded-md border" />;

  return (
    <div className="rounded-md border">
      <Toolbar editor={editor} />
      <div className="px-3 py-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded hover:bg-accent disabled:opacity-40',
        active && 'bg-accent text-accent-foreground',
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const [insertOpen, setInsertOpen] = useState(false);

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const insertYoutube = () => {
    const url = window.prompt('YouTube URL or video ID');
    if (!url) return;
    const id = parseYouTubeId(url);
    if (!id) {
      window.alert('Could not read a YouTube video id from that link.');
      return;
    }
    editor.chain().focus().insertContent({ type: 'youtubeEmbed', attrs: { videoId: id } }).run();
  };

  const insertVimeo = () => {
    const url = window.prompt('Vimeo URL or video ID');
    if (!url) return;
    const parsed = parseVimeoId(url);
    if (!parsed) {
      window.alert('Could not read a Vimeo video id from that link.');
      return;
    }
    editor
      .chain()
      .focus()
      .insertContent({ type: 'vimeoEmbed', attrs: { videoId: parsed.id, videoHash: parsed.hash } })
      .run();
  };

  type InsertItem = { label: string; icon: React.ElementType; run: () => void };

  const calloutItems: InsertItem[] = [
    {
      label: 'TL;DR',
      icon: Zap,
      run: () =>
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'callout',
            attrs: { variant: 'tldr' },
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'TL;DR', marks: [{ type: 'bold' }] }] },
              {
                type: 'bulletList',
                content: [
                  { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Key point…' }] }] },
                ],
              },
            ],
          })
          .run(),
    },
    {
      label: 'Callout',
      icon: Lightbulb,
      run: () =>
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'callout',
            attrs: { variant: 'note' },
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Key takeaway…' }] }],
          })
          .run(),
    },
  ];

  const tableItems: InsertItem[] = [
    {
      label: 'Comparison table',
      icon: Columns3,
      run: () =>
        editor.chain().focus().insertContent(comparisonTable(['Criteria', 'Option A', 'Option B'], 3)).run(),
    },
    {
      label: 'Vendor table',
      icon: Table2,
      run: () =>
        editor
          .chain()
          .focus()
          .insertContent(comparisonTable(['Company', 'Rating', 'Reviews', 'Key strengths', 'Best for'], 3))
          .run(),
    },
    {
      label: 'Plain table',
      icon: Rows3,
      run: () =>
        editor
          .chain()
          .focus()
          .insertContent(
            comparisonTable(['Company', 'Headquarters', 'Focus areas', 'Engagement models'], 4, 'plain'),
          )
          .run(),
    },
  ];

  const sectionItems: InsertItem[] = [
    { label: 'Feature grid', icon: LayoutGrid, run: () => editor.chain().focus().insertContent({ type: 'featureGrid' }).run() },
    { label: 'Stats counter', icon: BarChart3, run: () => editor.chain().focus().insertContent({ type: 'statsBlock' }).run() },
    { label: 'Steps', icon: ListChecks, run: () => editor.chain().focus().insertContent({ type: 'stepsBlock' }).run() },
    { label: 'Rating', icon: Star, run: () => editor.chain().focus().insertContent({ type: 'ratingBlock' }).run() },
    {
      label: 'FAQ',
      icon: HelpCircle,
      run: () =>
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'faq',
            content: [
              {
                type: 'faqItem',
                attrs: { question: 'What is…?' },
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Answer…' }] }],
              },
            ],
          })
          .run(),
    },
    {
      label: 'Accordion',
      icon: ListCollapse,
      run: () =>
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'accordion',
            content: [
              {
                type: 'accordionItem',
                attrs: { title: 'Section title' },
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Details…' }] }],
              },
            ],
          })
          .run(),
    },
  ];

  const mediaItems: InsertItem[] = [
    { label: 'YouTube', icon: Video, run: insertYoutube },
    { label: 'Vimeo', icon: Film, run: insertVimeo },
    {
      label: 'Image gallery',
      icon: Images,
      run: () => editor.chain().focus().insertContent({ type: 'imageGallery', attrs: { items: [] } }).run(),
    },
  ];

  const conversionItems: InsertItem[] = [
    {
      label: 'CTA button',
      icon: MousePointerClick,
      run: () =>
        editor
          .chain()
          .focus()
          .insertContent({ type: 'ctaButton', attrs: { href: '#', variant: 'primary' }, content: [{ type: 'text', text: 'Get Started' }] })
          .run(),
    },
    {
      label: 'CTA section',
      icon: Megaphone,
      run: () => editor.chain().focus().insertContent({ type: 'ctaSection' }).run(),
    },
    {
      label: 'Related reading',
      icon: BookOpen,
      run: () => editor.chain().focus().insertContent({ type: 'relatedPost' }).run(),
    },
  ];

  // Grouped so the menu stays navigable — it carries 19 blocks now.
  const insertGroups: { label: string; items: InsertItem[] }[] = [
    { label: 'Callouts', items: calloutItems },
    { label: 'Tables', items: tableItems },
    { label: 'Sections', items: sectionItems },
    { label: 'Media', items: mediaItems },
    { label: 'Conversion', items: conversionItems },
    {
      label: 'Other',
      items: [{ label: 'Divider', icon: Minus, run: () => editor.chain().focus().setHorizontalRule().run() }],
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b p-1">
      <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" />

      <ToolbarButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Ordered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-border" />

      <ToolbarButton label="Add link" active={editor.isActive('link')} onClick={setLink}>
        <Link2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Remove link" disabled={!editor.isActive('link')} onClick={() => editor.chain().focus().unsetLink().run()}>
        <Link2Off className="h-4 w-4" />
      </ToolbarButton>
      <MediaPicker onSelect={(m) => editor.chain().focus().setImage({ src: m.url, alt: m.altText }).run()}>
        <ToolbarButton label="Insert image" onClick={() => {}}>
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
      </MediaPicker>
      <MediaPicker
        onSelect={(m) =>
          editor
            .chain()
            .focus()
            .insertContent({ type: 'figureImage', attrs: { src: m.url, alt: m.altText }, content: [{ type: 'text', text: 'Caption' }] })
            .run()
        }
      >
        <ToolbarButton label="Image with caption" onClick={() => {}}>
          <ImageFrame className="h-4 w-4" />
        </ToolbarButton>
      </MediaPicker>
      <ToolbarButton
        label="Insert table"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <TableIcon className="h-4 w-4" />
      </ToolbarButton>

      {/* Insert-block menu */}
      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setInsertOpen((o) => !o)}
          className="flex h-8 items-center gap-1 rounded px-2 text-sm hover:bg-accent"
          title="Insert block"
        >
          <Plus className="h-4 w-4" /> Insert <ChevronDown className="h-3 w-3" />
        </button>
        {insertOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setInsertOpen(false)} />
            <div className="absolute left-0 top-9 z-20 max-h-[70vh] w-56 overflow-y-auto rounded-md border bg-popover p-1 shadow-md">
              {insertGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-2 pb-0.5 pt-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </p>
                  {group.items.map((it) => (
                    <button
                      key={it.label}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        it.run();
                        setInsertOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-accent"
                    >
                      <it.icon className="h-4 w-4 text-muted-foreground" /> {it.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Context controls for the current block */}
      {editor.isActive('callout') && (
        <select
          value={(editor.getAttributes('callout').variant as string) ?? 'note'}
          onChange={(e) => editor.chain().focus().updateAttributes('callout', { variant: e.target.value }).run()}
          className="ml-1 h-8 rounded border bg-background px-1 text-xs"
          title="Callout style"
        >
          {CALLOUT_VARIANTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      )}
      {editor.isActive('ctaButton') && (
        <>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const prev = (editor.getAttributes('ctaButton').href as string) ?? '#';
              const url = window.prompt('Button link URL', prev);
              if (url !== null) editor.chain().focus().updateAttributes('ctaButton', { href: url }).run();
            }}
            className="ml-1 h-8 rounded border px-2 text-xs hover:bg-accent"
          >
            Set URL
          </button>
          <select
            value={(editor.getAttributes('ctaButton').variant as string) ?? 'primary'}
            onChange={(e) => editor.chain().focus().updateAttributes('ctaButton', { variant: e.target.value }).run()}
            className="h-8 rounded border bg-background px-1 text-xs"
            title="Button style"
          >
            {CTA_VARIANTS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </>
      )}

      {editor.isActive('table') && (
        <>
          <select
            value={(editor.getAttributes('table').variant as string) ?? 'brand'}
            onChange={(e) => editor.chain().focus().updateAttributes('table', { variant: e.target.value }).run()}
            className="ml-1 h-8 rounded border bg-background px-1 text-xs"
            title="Table style"
          >
            {TABLE_STYLES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().addColumnAfter().run()} className="rounded px-1.5 text-xs hover:bg-accent" title="Add column">+Col</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().addRowAfter().run()} className="rounded px-1.5 text-xs hover:bg-accent" title="Add row">+Row</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().deleteColumn().run()} className="rounded px-1.5 text-xs hover:bg-accent" title="Delete column">−Col</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().deleteRow().run()} className="rounded px-1.5 text-xs hover:bg-accent" title="Delete row">−Row</button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().deleteTable().run()} className="rounded px-1.5 text-xs text-destructive hover:bg-accent" title="Delete table">✕Table</button>
        </>
      )}

      <span className="mx-1 h-5 w-px bg-border" />

      <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}
