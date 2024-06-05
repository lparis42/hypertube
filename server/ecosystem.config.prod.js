const os = require('os');

module.exports = {
    apps : [{
      name: "server",
      script: "index.js",
      instances: os.cpus().length,
      watch: false,
      env: {
        NODE_ENV: "production",
      }
    }]
  }