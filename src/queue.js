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
        this.qbucket.push({ message: msg, timestamp: getFormattedDate() });
        this.qdepth++;
    }

    pull() {
        let msg = this.qbucket.shift();;
        if (this.qdepth > 0)
            this.qdepth--;

        return msg;
    }

}

function getFormattedDate() {
    let d = new Date()
    return d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
}

module.exports = Queue;