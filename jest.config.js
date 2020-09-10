module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  },
  verbose: true,
  bail: true,
};
