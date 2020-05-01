const Queue = require('./queue');

class Broker {

    constructor(credentials, port) {
        this.broker = {
            credentials: {
                username: credentials['username'],
                password: credentials['password']
            },
            qcount: 0
        };
        this.portnumber = port;
        this.queues = [];
    }

    static create(credentials, port) {
        if (!this.broker) {
            this.broker = new Broker(credentials, port);
        }
        return this.broker;
    }

    port() {
        return this.portnumber;
    }

    setPort(port) {
        this.portnumber = port;
    }

    getQueueCount() {
        return this.broker['qcount'];
    }

    createQueue(name) {
        let bool = false;
        this.queues.forEach(queue => {
            if (queue.name() == name) {
                bool = true;
            }
        });
        if (!bool) {
            let q = new Queue(name);
            this.queues.push(q);
        }
    }

    addToQueue(name, message) {
        this.queues.forEach(queue => {
            if (queue.name() == name) {
                queue.add(message);
            }
        });
    }

    pullFromQueue(name) {
        let msg = '';
        this.queues.forEach(queue => {
            if (queue.name() == name) {
                msg = queue.pull();
            }
        });
        return msg;
    }

    getQueuesDepth(name) {
        let depth = 0;
        this.queues.forEach(queue => {
            if (queue.name() == name) {
                depth = queue.depth();
            }
        });
        return depth;
    }

    getAllMessagesFromQueue(name) {
        return this.broker['queues'][name].all();
    }

    getNamesOfAllQueues() {
        return Object.keys(this.broker['queues']);
    }

    getAllQueues() {
        return this.queues;
    }
}

module.exports = Broker;
