module.exports = {
    apps : [{
      name: "server",
      script: "index.js",
      instances: 1,
      watch: true,
      env: {
        NODE_ENV: "development",
      }
    }]
  }