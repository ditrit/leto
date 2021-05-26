// const path = require('path')
// const StylelintPlugin = require('stylelint-webpack-plugin')
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  lintOnSave: true,
  // transpileDependencies: [
  //   'vuestic-ui',
  //   'epic-spinners',
  // ],
  // pages: {
  //   index: {
  //     // entry for the page
  //     entry: 'src/app/main.ts',
  //     // the source template
  //     template: 'public/index.html',
  //     // output as dist/index.html
  //     filename: 'index.html',
  //     // when using title option,
  //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'Vuestic Admin',
  //     // chunks to include on this page, by default includes
  //     // extracted common chunks and vendor chunks.
  //     chunks: ['chunk-vendors', 'chunk-common', 'index'],
  //   },
  // },
  configureWebpack: {
    resolve: {
      alias: {
        // vue$: 'vue/dist/vue.esm.js',
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        // '@': path.resolve('src'),
      },
    },
    plugins: [
      new MonacoEditorPlugin({
        // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        // Include a subset of languages support
        // Some language extensions like typescript are so huge that may impact build performance
        // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
        // Languages are loaded on demand at runtime
        languages: ['javascript', 'css', 'html', 'typescript']
      })
    ]
    // plugins: [
    //   ...(
    //     (!lintOnSave && process.env.NODE_ENV === 'development') ? [] : [new StylelintPlugin({
    //       files: ['src/**/*.{vue,htm,html,css,sss,less,scss}'],
    //     })]
    //   ),
    // ],
  },
  css: {
    loaderOptions: {
      sass: {
        // Preload vuestic-ui variables and mixins for every component
      },
    },
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js',
      importWorkboxFrom: 'local',
    },
  },
}
