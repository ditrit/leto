import letoListener from './antlr/letoListener.js';
import { Componant, Id } from './model.js';

export default class MyLetoListener extends letoListener {
    constructor() {
        super();
    }

    exitId(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Id(ctx.getChild(0).getText(), ctx)
        }
    }

    exitComponant(ctx) {
        let nbChilds = ctx.getChildCount()
        if (nbChilds > 1 && nbChilds < 6 ) {
            let name = ctx.getChild(1).model
            let parent = (nbChilds == 5) ? ctx.getChild(4).model : null
            ctx.model = new Componant(name, parent) 
        }
        console.log( ctx.model.toString() )
    }
}


