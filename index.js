const delay = 20 
const scGap = 0.02 
const w = window.innerWidth 
const h = window.innerHeight

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
const animator = new Animator()

Vue.component('sinified-up-box', {
    template: '<div><button  @click="start">start</button><div :style = "barstyle"></div>',
    data() {
        return {
            state: new State()
        }
    }, 
    methods: {
        start() {
            animator.start(() => {
                this.state.update(() => {
                    animator.stop()
                })
            })
        }
    },
    computed: {
        barStyle() {
            const sf = ScaleUtil.sinify(scale)
            const sf1 = ScaleUtil.divideScale(sf, 0, 2)
            const sf2 = ScaleUtil.divideScale(sf, 1, 2)
            const hSize = h / 8 
            const left = `${w / 2}px`
            const top = `${h / 2 - hSize * sf1}px`
        }
    }
})