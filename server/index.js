const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
const Socket = require('./socket');
const Database = require('./database');
const constant = require('./constant');

// Disable console.log and console.error in production
// if (process.env.NODE_ENV !== 'development') {
//   console.log = function () { };
//   console.error = function () { };
// }

console.log(`Environment: ${process.env.NODE_ENV}`);

class Server {

  // Start the server
  async start(port) {

    process.env.PORT = port;
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureHTTPSServer();
    await this.configureDatabase();
    this.configureSocketIO();
    this.server.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  }

  // Configure the middleware
  configureMiddleware() {
    this.app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
    console.log(`Middleware configured`);
  }

  // Configure the routes
  configureRoutes() {
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
    });

    console.log(`Routes configured`);
  }

  // Configure the HTTPS server
  configureHTTPSServer() {
    const { key, cert, passphrase } = constant.https.options;

    this.server = https.createServer({
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
      passphrase: passphrase,
    }, this.app);
    console.log(`HTTPS server configured`);
  }

  // Configure Socket.IO
  configureSocketIO() {
    this.socket = new Socket(this.server, this.db);
    console.log(`Socket.IO configured`);
  }

  // Configure the database
  async configureDatabase() {
    this.db = new Database(...Object.values(constant.database.connection_parameters));
    await this.db.connect();
    await this.db.execute(this.db.drop('users_private')); // For testing purposes
    await this.db.execute(this.db.drop('users_preview')); // For testing purposes
    await this.db.execute(this.db.drop('users_public')); // For testing purposes
    await this.db.execute(this.db.create('users_private', constant.database.users_private.columns));
    await this.db.execute(this.db.create('users_preview', constant.database.users_preview.columns));
    await this.db.execute(this.db.create('users_public', constant.database.users_public.columns));

    console.log(`Database configured`);
  }

  // Close the server
  closeServer(done) {
    this.server.close(done);
    console.log(`Server closed`);
  }
}

const server = new Server();
server.start(constant.https.port);
