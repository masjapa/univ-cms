// import path from 'path';

// export default ({ env }) => {
//   const client = env('DATABASE_CLIENT', 'sqlite');

//   const connections = {
//     mysql: {
//       connection: {
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 3306),
//         database: env('DATABASE_NAME', 'strapi'),
//         user: env('DATABASE_USERNAME', 'strapi'),
//         password: env('DATABASE_PASSWORD', 'strapi'),
//         // ssl: env.bool('DATABASE_SSL', false) && {
//         //   key: env('DATABASE_SSL_KEY', undefined),
//         //   cert: env('DATABASE_SSL_CERT', undefined),
//         //   ca: env('DATABASE_SSL_CA', undefined),
//         //   capath: env('DATABASE_SSL_CAPATH', undefined),
//         //   cipher: env('DATABASE_SSL_CIPHER', undefined),
//         //   rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
//         // },
//       },
//       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
//     },
//     postgres: {
//       connection: {
//         connectionString: env('DATABASE_URL'),
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 5432),
//         database: env('DATABASE_NAME', 'strapi'),
//         user: env('DATABASE_USERNAME', 'strapi'),
//         password: env('DATABASE_PASSWORD', 'strapi'),
//         ssl: env.bool('DATABASE_SSL', false) && {
//           key: env('DATABASE_SSL_KEY', undefined),
//           cert: env('DATABASE_SSL_CERT', undefined),
//           ca: env('DATABASE_SSL_CA', undefined),
//           capath: env('DATABASE_SSL_CAPATH', undefined),
//           cipher: env('DATABASE_SSL_CIPHER', undefined),
//           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
//         },
//         schema: env('DATABASE_SCHEMA', 'public'),
//       },
//       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
//     },
//     sqlite: {
//       connection: {
//         filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//       },
//       useNullAsDefault: true,
//     },
//   };

//   return {
//     connection: {
//       client,
//       ...connections[client],
//       acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
//     },
//   };
// };

import path from 'path';
import { parse } from 'url';
import type { UrlWithStringQuery } from 'url';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const mysqlUrl = env('DATABASE_URL');

  // Parse the Railway MySQL URL (e.g., mysql://user:pass@host:port/db)
  const parsed = mysqlUrl ? (parse(mysqlUrl) as UrlWithStringQuery) : undefined;

  const [username, password] = parsed?.auth?.split(':') || [];
  const database = parsed?.pathname?.slice(1) || 'strapi';
  const host = parsed?.hostname || 'localhost';
  const port = parsed?.port ? parseInt(parsed.port, 10) : 3306;

  const connections = {
    mysql: {
      connection: {
        host,
        port,
        database,
        user: username,
        password,
        ssl: false, // Railway MySQL doesn't require SSL by default
      },
      pool: {
        min: 2,
        max: 10,
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: 60000,
    },
  };
};
