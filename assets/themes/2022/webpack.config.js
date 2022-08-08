const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const IS_PRODUCTION_MODE = process.env.NODE_ENV === "production";

const ROOT = path.resolve(__dirname);
const SRC = path.resolve(__dirname, "src");
const PRODUCTION_DIST = path.resolve(__dirname, "public");
const DEVELOPMENT_DIST = path.resolve(__dirname, "dist");
const OUTPUT_PATH = IS_PRODUCTION_MODE ? PRODUCTION_DIST : DEVELOPMENT_DIST;

const rules = [
  // js, jsx
  {
    test: /\.(js|jsx)$/,
    exclude: /node_module/,
    use: ["babel-loader"],
  },
  // css,scss
  {
    test: /\.(css|scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      { loader: "css-loader" },
      {
        loader: "postcss-loader",
        options: { implementation: require("postcss") },
      },
      { loader: "sass-loader" },
    ],
  },
  // images
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  },
];

const plugins = [];

plugins.push(
  new CleanWebpackPlugin({
    dry: false,
    verbose: true,
    cleanOnceBeforeBuildPatterns: [
      "**/*",
      "!favicon.ico",
      // "!directoryToExclude/**",
    ],
  })
);

plugins.push(new webpack.ProgressPlugin());
plugins.push(
  new MiniCssExtractPlugin({
    filename: "[name].css",
  })
);
// plugins.push(
//   new CopyPlugin({
//     patterns: [
//       {
//         from: `src/assets`,
//         to: "assets",
//       },
//     ],
//     options: {
//       concurrency: 100,
//     },
//   })
// );
plugins.push(
  new BrowserSyncPlugin(
    {
      host: "localhost",
      port: 3015,
      ui: {
        port: 3016,
      },
      proxy: "http://localhost:1313/",
      files: [
        DEVELOPMENT_DIST + "/*.css",
        // ROOT + "/*.php",
        DEVELOPMENT_DIST + "/*.js",
      ],
      injectCss: false,
    },
    { reload: false }
  )
);

const optimization = IS_PRODUCTION_MODE
  ? {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin(),
      ],
    }
  : {};

const resolve = {
  alias: {
    "@": SRC,
  },
};

module.exports = {
  entry: {
    main: [`./src/js/main.js`, `./src/styles/main.scss`],
    page: ["/src/styles/page.scss"],
    home: ["./src/js/home.js", "/src/styles/home.scss"],
  },
  output: {
    path: OUTPUT_PATH,
    // assetModuleFilename: "assets/images/[name][ext][query]",
  },
  module: {
    rules,
  },
  plugins,
  resolve,
  optimization,
  externals: {
    jquery: "jQuery",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: ROOT,
    hot: true,
  },
};
