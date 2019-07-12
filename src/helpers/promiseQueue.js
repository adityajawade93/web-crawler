/**
 * a promise queue to maintain the required concurrency levels
 * 
 * it keeps track of all pending promises , also applies a resolve action on them on resolving 
 */
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
        return (this.totalPendingRequests < this.maxConcurrentRequests) && this.queue.length > 0
    }

    run() {
        const self = this
        while(self.runAnother()) {
            const requestPromise = self.queue.shift()
            self.totalPendingRequests++
            requestPromise()
                .then(body => {
                    self.resolveAction(body, self)
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