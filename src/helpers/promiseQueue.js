class PromiseQueue {
    constructor(maxConcurrentRequests=5, resolveAction) {
        this.maxConcurrentRequests = maxConcurrentRequests
        this.totalPendingRequests = 0
        this.queue = []
        this.resolveAction = resolveAction
    }

    add(requestPromise) {
        this.queue.push(requestPromise)
        this.run()
    }

    runAnother() {
        return (this.totalPendingRequests < this.maxConcurrentRequests) && this.queue.length
    }

    run() {
        const self = this
        while(self.runAnother()) {
            const requestPromise = self.queue.shift()
            self.totalPendingRequests++
            requestPromise()
                .then(body => {
                    self.resolveAction(body)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    self.totalPendingRequests--
                    self.run()
                })
        }
    }
}

module.exports = function (maxConcurrentRequests, resolveAction) {
    return new PromiseQueue(maxConcurrentRequests, resolveAction)
}