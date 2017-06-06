const net = require('net');
const Config = require('../Config');

class Network {
    constructor(ip, port) {
        this.callbacks = [];
        this.connection = net.connect({
            port: Config.port,
            host: Config.ip
        }, (res) => {
            console.log(res);
            console.log("socket connected");
        });

        this.connection.on('data', (res) => {
            const parsedData = JSON.parse(res);
            console.log(parsedData);
            this.callbacks[parsedData.type](parsedData);
        });
        this.addCallbacks = this.addCallbacks.bind(this);
    }

    addCallbacks(newCallbacks) {
        Object.assign(this.callbacks, newCallbacks);
    }

    sendJson(json) {
        this.connection.write(JSON.stringify(json) + '\r\n');
    }
}

const connection = new Network();
module.exports = connection;
