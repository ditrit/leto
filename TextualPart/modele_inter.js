import { Prog } from './model.js'
import MyLetoListener from './MyLetoListener.js'

export class ModelInter extends MyLetoListener {
    constructor() {
        super()
        this.prog = new Prog()
    }
}

export class ProgInter extends ModelInter {
    constructor() {
        
    }
}








