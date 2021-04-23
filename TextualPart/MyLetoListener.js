import letoListener from './antlr/letoListener.js';
import { Componant, Id, Number, Relationship, Asset, Link, Definition, Instantiation, Instruction, Prog, Logo, Containers, Attributes, ModelNode } from './model.js';

export default class MyLetoListener extends letoListener {
    constructor() {
        super();
    }

    exitContainers(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Containers(ctx.getChild(0).getText(), ctx)
        }
    }

    exitLogo(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Logo(ctx.getChild(0).getText(), ctx)
        }
    }

    exitAttributes(ctx) {
        let chemin = ctx.getChild(0).model
        let contain = ctx.getChild(1).model
        ctx.model = new Attributes(chemin, contain) 
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

    exitLink(ctx) {
        let name = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model = new Link(name, nameConnection) 
        //console.log( ctx.model.toString() )
    }

    exitAsset(ctx) {
        let name = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model = new Asset(name, nameConnection) 
        //console.log( ctx.model.toString() )
    }

    exitRelationship(ctx) {
        let nbChilds = ctx.getChildCount()
        if (nbChilds == 3 || nbChilds == 5 ) {
            let name = ctx.getChild(1).model
            let parent = (nbChilds == 5) ? ctx.getChild(4).model : null
            ctx.model = new Relationship(name, parent) 
        }
        //console.log( ctx.model.toString() )
    }

    exitComponant(ctx) {
        let nbChilds = ctx.getChildCount()
        if (nbChilds == 4 || nbChilds == 6 ) {
            let name = ctx.getChild(1).model
            let parent = ((nbChilds == 6) ? ctx.getChild(3).model : null)
            let attributes = ((nbChilds == 6) ? ctx.getChild(4).model : ctx.getChild(2).model)
            ctx.model = new Componant(name, parent, attributes) 
        }
        //console.log( ctx.model.toString() )
    }

    exitInstantiation(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            let inst = ctx.getChild(i).model
            ctx.model += new Instantiation(inst)
        }
        //console.log( ctx.model.toString() )
    }    

    exitDefinition(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            let comp = ctx.getChild(i).model
            ctx.model += new Definition(comp)
        }
        //console.log( ctx.model.toString() )
    }

    exitInstruction(ctx) {
        let instr = ctx.getChild(0).model
        ctx.model = new Instruction(instr)
        //console.log( ctx.model.toString() )
    }

    exitProg(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = "Mon programme : "
        for(let i = 0; i<nbChilds; i++) {
            if((i%2) != 0) {
                let prog = ctx.getChild(i).model
                ctx.model += new Prog(prog)
            } 
        }
        console.log( ctx.model.toString() )
    }

}
