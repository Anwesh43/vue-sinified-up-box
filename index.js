const delay = 20 
const scGap = 0.02 

class ScaleUtil {

    static maxScale(scale, i, n) {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale, i, n) {
        return Math.min(1 / n, ScaleUtil.divideScale(scale, i, n)) * n 
    }

    static sinify(scale) {
        return Math.sin(scale * Math.PI)
    }
}
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