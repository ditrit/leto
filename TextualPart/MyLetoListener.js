import letoListener from './antlr/letoListener.js';
import { Prog, InstructionNode, IdVal, NumVal, CommentVal, Logo, Relationship, Asset, Link, Componant } from './model.js';

export default class MyLetoListener extends letoListener {
    constructor() {
        super();
    }

    propagateProg(ctx) { 
        for(let i=0; i<ctx.getChildCount(); i++) {
            let child = ctx.getChild(i)
            child.prog =ctx.prog
        }
    }

    enterProg(ctx) {
        ctx.prog = new Prog(ctx)
        this.propagateProg(ctx)
    }

    exitProg(ctx) {
        let nbChilds = ctx.getChildCount()

        for(let i = 0; i<nbChilds; i++) {
            let ele = ctx.getChild(i).model
            if (ele instanceof Array) {
                ctx.prog.instructions = ctx.prog.instructions.concat(ele)
            }
        }

        console.log('Componants ')
        console.log(ctx.prog.componants)

        console.log('Relationships ')
        console.log(ctx.prog.relationships)

        console.log('Assets ')
        console.log(ctx.prog.assets)
        
        console.log('Links ')
        console.log(ctx.prog.links)
    }


    enterLine(ctx) {
        this.propagateProg(ctx)
    }

    exitLine(ctx) {
        let ele = ctx.getChild(0).model
        if (ele instanceof Array) {
            ctx.model = ele
        } else {
            ctx.model = []
        }
    }


    enterInstructions(ctx) {
        this.propagateProg(ctx)
    }

    exitInstructions(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i = 0; i<nbChilds; i++) {
            let ele = ctx.getChild(i).model
            if (ele instanceof InstructionNode) {
                ctx.model.push(ele)
            }
        }
    }

    enterInstruction(ctx) {
        this.propagateProg(ctx)
    }

    exitInstruction(ctx) {
        ctx.model = ctx.getChild(0).model
    }

    enterDefinition(ctx) {
        this.propagateProg(ctx)
    }

    exitDefinition(ctx) {
        ctx.model = ctx.getChild(0).model
    }

    enterInstantiation(ctx) {
        this.propagateProg(ctx)
    }

    exitInstantiation(ctx) {
        ctx.model = ctx.getChild(0).model
    }


    enterComponant(ctx) {
        this.propagateProg(ctx)
    }

    exitComponant(ctx) {
        let id = ctx.getChild(1).model
        let parent = null
        let attributes = null
        let index = 3
        let ele = ctx.getChild(index).model
        if(ele instanceof IdVal) {
            parent = ele
            index = 5
        } 
        ele = ctx.getChild(index).model
        if(ele != null) {
            attributes = ele
        }
        ctx.model = new Componant(id, parent, attributes, ctx)
        ctx.prog.componants[id.name] = ctx.model
    }

    exitComponant_attributes(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i = 0; i<nbChilds; i++) {
            let attr = ctx.getChild(i).model
            ctx.model.push(attr)
        }
    }

    exitComponant_attribute(ctx) {
        let attr = ctx.getChild(0).model
        ctx.model = attr
    }

    exitLogo(ctx) {
        let path = ctx.getChild(2).getText()
        ctx.model = new Logo(path, ctx)
    }

    enterRelationship(ctx) {
    }

    exitRelationship(ctx) {
        let id = ctx.getChild(1).model
        let parent = null
        let ele = ctx.getChild(3)
        if (ele instanceof IdVal) {
            parent = ele
        }
        ctx.model = new Relationship(id, parent, ctx)
        ctx.prog.relationships[id.name] = ctx.model 
    }


    enterAsset(ctx) {
    }

    exitAsset(ctx) {
        let id = ctx.getChild(1).model
        let componant = ctx.getChild(3).model
        ctx.model = new Asset(id, componant, ctx)
        ctx.prog.assets[id.name] = ctx.model
    }


    enterLink(ctx) {
    }

    exitLink(ctx) {
        let src = ctx.getChild(1).model
        let dst = ctx.getChild(3).model
        let rel = ctx.getChild(5).model
        ctx.model = new Link(src, dst, rel, ctx) 
        ctx.prog.links[src.name] = ctx.model
    }

    exitNumber(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new NumVal(ctx.getChild(0).getText(), ctx)
        }
    }


    exitComment(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new CommentVal(ctx.getChild(0).getText(), ctx)
        }
    }

    exitId(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new IdVal(ctx.getChild(0).getText(), ctx)
        }
    }

}