import type { ArchiveViewProps } from '../_contract';
import { MinimalPostCard } from './post-card';

export function MinimalArchiveView({ heading, description, posts }: ArchiveViewProps) {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        {description && <p className="mt-2 text-neutral-600">{description}</p>}
      </header>
      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet.</p>
      ) : (
        <div>
          {posts.map((p) => (
            <MinimalPostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
