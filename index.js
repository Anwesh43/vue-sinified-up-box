const delay = 20 
const scGap = 0.02 
class Animator {

    start(cb) {
        if (!this.amimated) {
            this.animated = true
            this.interval = setInterval(cb, delay)
        } 
    }

    stop() {
        if (this.animated) {
            this.animated = false 
            clearInterval(this.interval)
        }
    }
}

class State {

    constructor() {
        this.scale = 0 
    }

    update(cb) {
        this.scale += scGap 
        if (this.scale > 1) {
            this.scale = 0 
            cb()
        }
    }
}