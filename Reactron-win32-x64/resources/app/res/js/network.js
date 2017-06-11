const net = require('net');
const Config = require('../Config');

class Network {
    constructor(ip, port) {
        this.callbacks = [];
        this.connection = net.connect({
            port: Config.port,
            host: Config.ip
        }, (res) => {
            // console.log(res);
            // console.log("socket connected");
        });
        this.connection.on('data', (res) => {
            console.log(res.toString());
            let messages = res.toString().split("\n");
            // console.log(messages);

            for (let i = 0; i < messages.length; i++) {
                let parsedMessage;
                try {
                    parsedMessage = JSON.parse(messages[i]);
                    this.callbacks[parsedMessage.type](parsedMessage);
                } catch (e) {
                    // console.error(e);
                }
            }
        });
        this.addCallbacks = this.addCallbacks.bind(this);
    }

    addCallbacks(newCallbacks) {
        Object.assign(this.callbacks, newCallbacks);
        console.log(this.callbacks);
    }

    sendJson(json) {
        this.connection.write(JSON.stringify(json) + '*');
    }
}

const connection = new Network();
module.exports = connection;
