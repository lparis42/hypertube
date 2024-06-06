const socketIo = require('socket.io');
const Email = require('./email');

class Socket {
    constructor(server, db) {
        this.io = socketIo(server);
        this.db = db;
        this.email = new Email(require('nodemailer').createTransport(require('./constant').nodemailer));
        this.session_store = {};
        this.configureMiddleware();
        this.configureBinds();
        this.handleClientConnection();
    }

    configureMiddleware() {
        this.io.use((socket, next) => {
            socket.use((packet, nextPacket) => {

                nextPacket();
            });

            next();
        });
    }

    configureBinds() {
        // const eventHandlers = [
        //     '...',
        // ];

        // eventHandlers.forEach(handler => {
        //     this[handler] = require(`./socket.events/${handler}`).bind(this);
        // });
    }

    async configureSession(socket) {
        const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
        const session_token = socket.handshake.auth.token;
        // Check if the session already exists
        if (this.session_store[session_token]) {
            console.log(`${session_token}:${socket.id} - Reconnected from ${ip}`);
        }
        // Create a new session if it does not exist
        else if (!this.session_store[session_token]) {
            const random_auth_token = this.generateSecurePassword(20);
            socket.handshake.auth.token = random_auth_token;
            this.session_store[random_auth_token] = { account: null };
            console.log(`${random_auth_token}:${socket.id} - Connected from ${ip}`);
            socket.emit('server:session', random_auth_token);
        }
        // Join the room of the session
        socket.join(socket.handshake.auth.token);
    }

    handleClientConnection() {
        this.io.on('connection', async (socket) => {

            // Configure the session
            await this.configureSession(socket);

            // Handle the client events
            // socket.on('...', (data, cb) => { this....(socket, data, cb) });

            // Handle the client disconnection
            socket.on('disconnect', () => {
                socket.leave(socket.handshake.auth.token);
                console.log(`${socket.handshake.auth.token}:${socket.id} - Disconnected`);
            });
        });
    }

    // ** Helper functions ** //

    // Generate a secure password
    generateSecurePassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
}

module.exports = Socket;