export default class GaussianDistribution {
    constructor (
        public mean: number = 0.0,
        public std: number = 1.0,
    ) { }

    next(n: number) {
        let array = this.new_variate(n);
        return array.map(x => this.mean + (x * this.std));
    }

    private new_variate(n: number) {
        if (n % 2 == 0) {
            let array: number[] = [];
            for (let i = 0; i < n / 2; i++) {
                array = array.concat(this.box_muller())
                //this.box_muller().map(e => array.push(e))
            }
            return array;
        }
        else {
            let array: number[] = [];
            for (let i = 0; i < (n + 1) / 2; i++) {
                array = array.concat(this.box_muller())
            }
            array.splice(1, 1)
            return array;
        }

    }

    private box_muller() {
        let u = 0.0, v = 0.0, w = 0.0, c = 0.0;
        do {
            u = Math.random() * 2 - 1.0;
            v = Math.random() * 2 - 1.0;
            w = u * u + v * v;
        }
        while (w == 0.0 || w >= 1.0)
        //Box-Muller Transform
        c = Math.sqrt((-2 * Math.log(w)) / w);
        return [u * c, v * c];
    }
}