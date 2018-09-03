"use strict";
export default class AutoPlay {
    constructor() {
        this.initialSet = [];
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                for (let k = 1; k < 10; k++) {
                    for (let l = 1; l < 10; l++) {
                        if (i != j && i != k && i != l && j != k && j != l && k != l) {
                            let x = l + k * 10 + j * 100 + i * 1000
                            this.initialSet.push(x);
                        }
                    }
                }
            }
        }
    }
    getInitialSet() {
        return this.initialSet;
    }

}

