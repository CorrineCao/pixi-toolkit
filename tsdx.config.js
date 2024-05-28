const postcss = require('rollup-plugin-postcss');
const images = require('@rollup/plugin-image');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      postcss({
        inject: true,
        extract: !!options.writeMeta,
        modules: true,
        namedExport: true,
        camelCase: true,
        // sass: true,
        // less: true,
        autoModules: true,
        namedExports(name) {
          return name.replace(/-/g, '_');
        },
      }),
      images({
        include: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.ico', '**/*.gif'],
      }),
      ...config.plugins,
    ];
    return config;
  },
};
