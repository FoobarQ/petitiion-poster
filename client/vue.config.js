/* eslint-disable */
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/build/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3080",
      },
    },
  },
};
