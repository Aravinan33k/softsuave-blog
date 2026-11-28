// PM2 definition for the new softsuave.com app (Next.js). Listens only on 127.0.0.1:3300;
// Apache decides which URLs reach it (see deploy/apache.softsuave.example.conf).
module.exports = {
  apps: [
    {
      name: 'softsuave-site',
      cwd: '/var/www/softsuave-site/current',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3300 -H 127.0.0.1',
      interpreter: '/opt/node22/bin/node',
      // MALLOC_ARENA_MAX: fewer glibc malloc arenas, the usual fix for RSS growth from sharp (image optimizer).
      env: { NODE_ENV: 'production', MALLOC_ARENA_MAX: '2' },
      node_args: '--max-old-space-size=640',
      max_memory_restart: '1200M',
      out_file: '/var/www/softsuave-site/logs/app-out.log',
      error_file: '/var/www/softsuave-site/logs/app-err.log',
      time: true,
    },
  ],
};
