const delay = 20 
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