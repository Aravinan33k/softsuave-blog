import type { ArchiveViewProps } from '../_contract';
import { MagazinePostCard } from './post-card';

export function MagazineArchiveView({ heading, description, posts }: ArchiveViewProps) {
  return (
    <div>
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-black tracking-tight">{heading}</h1>
        {description && <p className="mt-2 text-neutral-600">{description}</p>}
      </header>
      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <MagazinePostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
