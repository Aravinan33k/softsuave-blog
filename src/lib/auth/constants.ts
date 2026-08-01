// Cookie names and scoping shared across the auth layer.
// Short, non-descriptive names avoid advertising the framework.
export const ACCESS_COOKIE = 'sb_at';
export const REFRESH_COOKIE = 'sb_rt';
export const CSRF_COOKIE = 'sb_csrf';
export const CSRF_HEADER = 'x-csrf-token';

// The refresh cookie is only ever sent to the auth endpoints, limiting its
// exposure on every other request.
export const REFRESH_COOKIE_PATH = '/api/v1/auth';
