const isProd = process.env.NODE_ENV === 'production';
const isGHPages = process.env.GHPAGES === 'yes';

module.exports = {
  pathPrefix: isProd && isGHPages ? '/mes-pronoms' : '',
};
