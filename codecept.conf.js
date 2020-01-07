exports.config = {
  tests: "./tests/*_test.js",
  output: "./output",
  helpers: {
    Protractor: {
      url: "http://localhost:8100",
      driver: "hosted",
      browser: "chrome",
      rootElement: "body",
      capabilities: {
        browserName: "chrome",
        chromeOptions: { args: ["--headless", "--disable-gpu", "--window-size=800,600"] }
      }
    }
  },
  include: {
    I: "./steps_file.js"
  },
  bootstrap: null,
  mocha: {},
  name: "ITC-Yelp",
  plugins: {
    wdio: {
      enabled: true,
      services: ["selenium-standalone"]
    }
  }
};
