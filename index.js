const delay = 30 
const scGap = 0.02 
const w = window.innerWidth 
const h = window.innerHeight

class ScaleUtil {

    static maxScale(scale, i, n) {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale, i, n) {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
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

const component1 = Vue.component('sinified-up-box', {
    template: '<div><button  @click="start">start</button><div :style = "barStyle"></div></div>',
    data() {
        return {
            state: new State(), 
            sf : 0
        }
    }, 
    methods: {
        start() {
            animator.start(() => {
                this.sf = ScaleUtil.sinify(this.state.scale)
                this.state.update(() => {
                    animator.stop()
                    this.sf = 0
                })
            })
        }
    },
    computed: {
        barStyle() {
            const sf = this.sf 
            const sf1 = ScaleUtil.divideScale(sf, 0, 2)
            const sf2 = ScaleUtil.divideScale(sf, 1, 2)
            const hSize = h / 8 
            const left = `${w / 2}px`
            const top = `${h / 2 - hSize * sf1}px`
            const height = `${hSize * (sf1 - sf2)}px`
            const width = `${w / 20}px`
            const position = 'absolute'
            const background = 'indigo'
            console.log(left, top, position, width, height, background)
            return {left, top, position, width, height, background}
        }
    }
})

const vueInstance = new Vue({
    el : '#app'
})