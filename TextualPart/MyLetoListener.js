import letoListener from './antlr/letoListener.js';
import {Prog, Line, Instructions, Instruction, Definition, Instantiation, Componant, ComponantAttributes, ComponantAttribute, Logo, Hosts, Relationship, Asset, Link, Number, Comment, Id} from './model.js';

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
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            let prog = ctx.getChild(i).model
            ctx.model += new Prog(prog, ctx)
        }
        console.log(ctx.prog.componants)
        console.log(ctx.prog.relationships)
        console.log(ctx.prog.assets)
        console.log(ctx.prog.links)
    }


    enterLine(ctx) {
        this.propagateProg(ctx)
    }

    exitLine(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            let line = ctx.getChild(i).model
            ctx.model += new Line(line, ctx)
        }
    }


    enterInstructions(ctx) {
        this.propagateProg(ctx)
    }

    exitInstructions(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            if(i%2 == 0) {
                let inst = ctx.getChild(i).model
                ctx.model += new Instructions(inst, ctx)
            }  
        }
    }


    enterInstruction(ctx) {
        this.propagateProg(ctx)
    }

    exitInstruction(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            let instr = ctx.getChild(i).model
            ctx.model += new Instruction(instr, ctx)
        }
    }


    enterDefinition(ctx) {
        this.propagateProg(ctx)
    }

    exitDefinition(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            let comp = ctx.getChild(i).model
            ctx.model += new Definition(comp, ctx)
        }
    }


    enterInstantiation(ctx) {
        this.propagateProg(ctx)
    }

    exitInstantiation(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            let inst = ctx.getChild(i).model
            ctx.model += new Instantiation(inst, ctx)
        }
    }


    enterComponant(ctx) {
        this.propagateProg(ctx)
    }

    exitComponant(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        let nameId = ctx.getChild(1).model
        let parentId = null
        let attributes = null
        let index = 3
        let value = ctx.getChild(index).model
        if(value instanceof Id) {
            parentId = value
            index = 5
        } 
        value = ctx.getChild(index).model
        if(value != null) {
            attributes = value
        }
        ctx.model += new Componant(nameId, parentId, attributes, ctx)
        ctx.prog.componants[nameId.name] = ctx.model
    }


    exitComponant_attributes(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = ""
        for(let i = 0; i<nbChilds; i++) {
            if(i%2 == 0) {
                let attrs = ctx.getChild(i).model
                ctx.model += new ComponantAttributes(attrs, ctx)
                ctx.model += " "
            }
        }
    }


    exitComponant_attribute(ctx) {
        ctx.model = ''
        let attr = ctx.getChild(0).model
        ctx.model += new ComponantAttribute(attr, ctx)
    }


    exitLogo(ctx) {
        let path = ctx.getChild(2).getText()
        ctx.model = new Logo(path, ctx)
    }


    exitHosts(ctx) {
        ctx.model = 'host : '
        for(let i = 2; i< ctx.getChildCount(); i++) {
            if(i%2 == 0) {
                let host = ctx.getChild(i).getText()
                ctx.model += new Hosts(host, ctx)
            }
        }
    }


    enterRelationship(ctx) {
        this.propagateProg(ctx)
    }

    exitRelationship(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model =''
        if (nbChilds == 2) {
            let nameId = ctx.getChild(1).model
            let parentId = null
            ctx.model += new Relationship(nameId, parentId, ctx)
            ctx.prog.relationships[nameId.name] = ctx.model 
        }
        else if(nbChilds == 4) {
            let nameId = ctx.getChild(1).model
            let parentId = ctx.getChild(3).model
            ctx.model += new Relationship(nameId, parentId, ctx)
            ctx.prog.relationships[nameId.name] = ctx.model 
        }
    }


    enterAsset(ctx) {
        this.propagateProg(ctx)
    }

    exitAsset(ctx) {
        ctx.model = ''
        let nameId = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model += new Asset(nameId, nameConnection, ctx)
        ctx.prog.assets[nameId.name] = ctx.model
    }


    enterLink(ctx) {
        this.propagateProg(ctx)
    }

    exitLink(ctx) {
        ctx.model = ''
        let nameId = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model += new Link(nameId, nameConnection, ctx) 
        ctx.prog.links[nameId.name] = ctx.model
    }


    exitNumber(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Number(ctx.getChild(0).getText(), ctx)
        }
    }


    exitComment(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Comment(ctx.getChild(0).getText(), ctx)
        }
    }


    exitId(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Id(ctx.getChild(0).getText(), ctx)
        }
    }

}