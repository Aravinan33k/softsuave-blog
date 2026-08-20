// Archive grids are 1-up on mobile, 2-up at md and 3-up at lg, so the page size
// has to be a common multiple of those column counts. A size like 10 leaves an
// orphan row of one card mid-list while more posts are still behind Load More;
// 12 fills every row that isn't the true end of the list.
export const ARCHIVE_PAGE_SIZE = 12;
