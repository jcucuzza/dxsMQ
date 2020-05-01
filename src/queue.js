class Queue {

    constructor(name) {
        this.qname = name;
        this.qbucket = [];
        this.qdepth = 0;
    }

    name() {
        return this.qname;
    }

    bucket() {
        return this.qbucket;
    }

    depth() {
        return this.qdepth;
    }

    add(msg) {
        this.qbucket.push(msg);
        this.qdepth++;
    }

    pull() {
        let msg = this.qbucket[0];
        this.qbucket.unshift();
        this.qdepth--;
        return msg;
    }

}

module.exports = Queue;