const os = require('os');

module.exports = {
  apps: [
    {
      name: 'server-prod',
      script: './index.js',
      instances: 1, //os.cpus().length,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G', //Math.floor(os.totalmem() / 1024 / 1024 / 1024) + 'G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};