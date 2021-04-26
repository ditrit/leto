import letoListener from './antlr/letoListener.js';
import {Prog, Line, Instructions, Instruction, Definition, Instantiation, Componant, ComponantAttributes, ComponantAttribute, Logo, Hosts, Relationship, Asset, Link, Number, Comment, Id} from './model.js';

export default class MyLetoListener extends letoListener {
    constructor() {
        super();
    }

	enterProg(ctx) {
        ctx.prog = new Prog(ctx)
        let nbChild = ctx.getChildCount()
        for(let i=0; i<nbChild; i++) {
            let child = ctx.getChild(i).model
            
        }
	}

	exitProg(ctx) {
	}


	enterLine(ctx) {
        let nbChild = ctx.getChildCount()
        for(let i=0; i<nbChild; i++) {

        }
	}

	exitLine(ctx) {
	}


	enterInstructions(ctx) {
        let num = ctx.getChildCount()
        for(let i=0; i<num; i++) {
            
        }
	}

	exitInstructions(ctx) {
	}


	enterInstruction(ctx) {
        let num = ctx.getChildCount()
        for(let i=0; i<num; i++) {
            
        }
	}

	exitInstruction(ctx) {
        let instr = ctx.getChild(0).model
        ctx.model = new Instruction(instr)
        //console.log( ctx.model.toString() )
	}


	enterDefinition(ctx) {
        let num = ctx.getChildCount()
        for(let i=0; i<num; i++) {
            
        }
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


	enterInstantiation(ctx) {
        let num = ctx.getChildCount()
        for(let i=0; i<num; i++) {
            
        }
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


	enterComponant(ctx) {
	}

	exitComponant(ctx) {
        let nbChilds = ctx.getChildCount()
        let name = ctx.getChild(1).model
        let parent = null
        let attributes = null
        let index = 3
        let value = ctx.getChild(index).model
        if(value instanceof Id) {
            parent = value
            index = 5
        } 
        value = ctx.getChild(index).model
        if(value instanceof ComponantAttributes) {
            attributes = value
        }
	}


	enterComponant_attributes(ctx) {
	}

	exitComponant_attributes(ctx) {
        ctx.model = new ComponantAttributes(ctx)
	}


	enterComponant_attribute(ctx) {
	}

	exitComponant_attribute(ctx) {
	}


	enterLogo(ctx) {
	}

	exitLogo(ctx) {
        let path = ctx.getChild(2).getText()
        ctx.model = new Logo(path, ctx)
	}


	enterHosts(ctx) {
	}

	exitHosts(ctx) {
        let nbChild = ctx.getChildCount()
        for(let i=2; i<nbChild; i++) {
            ctx.model = new Hosts(ctx.getChild(i), ctx)
        }
	}


	enterRelationship(ctx) {
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


	enterAsset(ctx) {
	}

	exitAsset(ctx) {
        let name = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model = new Asset(name, nameConnection) 
        //console.log( ctx.model.toString() )
	}


	enterLink(ctx) {
	}

	exitLink(ctx) {
        let name = ctx.getChild(1).model
        let nameConnection = ctx.getChild(3).model
        ctx.model = new Link(name, nameConnection) 
        //console.log( ctx.model.toString() )
	}


	enterNumber(ctx) {
	}

	exitNumber(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Number(ctx.getChild(0).getText(), ctx)
        }
	}


	enterComment(ctx) {
	}

	exitComment(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Comment(ctx.getChild(0).getText(), ctx)
        }
	}


	enterId(ctx) {
	}

	exitId(ctx) {
        if ( ctx.getChildCount() == 1 ) {
            ctx.model = new Id(ctx.getChild(0).getText(), ctx)
        }
	}

}