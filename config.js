const isProd = process.env.NODE_ENV === 'production';
const isGHPages = process.env.GHPAGES === 'yes';

module.exports = {
  pathPrefix: isProd && isGHPages ? '/mes-pronoms' : '',
  baseURL: isProd ? (
    isGHPages ? 'https://louisbrunner.github.io/mes-pronoms' : 'https://mes-pronoms.vercel.app'
  ) : 'http://localhost:3000',
};
