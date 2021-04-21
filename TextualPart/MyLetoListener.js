import letoListener from './antlr/letoListener.js';
import { Componant, Id, Number, Relationship, Asset, Link, Definition, Instantiation, Instruction, Prog } from './model.js';

export default class MyLetoListener extends letoListener {
    constructor() {
        super();
    }
 
    exitId(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Id(ctx.getChild(0).getText(), ctx)
        }
    }
    
    exitNumber(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Number(ctx.getChild(0).getText(), ctx)
        }
    }

    exitComponant(ctx) {
        let nbChilds = ctx.getChildCount()
        if (nbChilds == 3 || nbChilds == 5 ) {
            let name = ctx.getChild(1).model
            let parent = ((nbChilds == 5) ? ctx.getChild(3).model : null)
            ctx.model = new Componant(name, parent) 
        }
        console.log( ctx.model.toString() )
    }

    exitRelationship(ctx) {
        let nbChilds = ctx.getChildCount()
        if (nbChilds == 3 || nbChilds == 5 ) {
            let name = ctx.getChild(1).model
            let parent = (nbChilds == 5) ? ctx.getChild(4).model : null
            ctx.model = new Relationship(name, parent) 
        }
        console.log( ctx.model.toString() )
    }

    exitAsset(ctx) {
        let name = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model = new Asset(name, nameConnection) 
        console.log( ctx.model.toString() )
    }

    exitLink(ctx) {
        let name = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model = new Link(name, nameConnection) 
        console.log( ctx.model.toString() )
    }

    exitDefinition(ctx) {
        ctx.model = new Definition()
        console.log( ctx.model.toString() )
    }

    exitInstantiation(ctx) {
        ctx.model = new Instantiation()
        console.log( ctx.model.toString() )
    }

    exitInstruction(ctx) {
        ctx.model = new Instruction()
        console.log( ctx.model.toString() )
    }

    exitProg(ctx) {
        let name = "Prog"
        ctx.model = new Prog(name)
        console.log( ctx.model.toString() )
    }

}
