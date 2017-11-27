const { resolve } = require('path');
const appRoutes = require('./routes');

module.exports = {
  srcDir: resolve(__dirname, '../'),
  mode: 'universal',
  router: {
    extendRoutes(routes) {
      routes.length = 0;
      routes.push(
        ...appRoutes.map(r => {
          r.component = resolve(__dirname, '../pages/' + r.component);
          return r;
        })
      );
    }
  },
  build: {
    vendor: ['axios']
  },
  modules: [resolve(__dirname, 'modules/typescript')],
  plugins: [
    resolve(__dirname, 'plugins/filters'),
    resolve(__dirname, 'plugins/directives'),
    { src: resolve(__dirname, 'plugins/ui-vendors'), ssr: false },
    { src: resolve(__dirname, 'plugins/vuex-browser-init'), ssr: false },
    { src: resolve(__dirname, 'plugins/facebook'), ssr: false },
    { src: resolve(__dirname, 'plugins/vue-plugins'), ssr: false }
  ],
  head: {
    titleTemplate: '%s - Site',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=' + Date.now() }],
    script: [
      {
        async: 'async',
        src:
          '//platform-api.sharethis.com/js/sharethis.js#property=5a09da4605073300123e3959&product=inline-share-buttons'
      }
    ]
  },
  loading: { color: '#252021' }
};
