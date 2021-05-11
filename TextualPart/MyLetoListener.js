import letoListener from './antlr/letoListener.js';
import { Prog, Instructions, InstructionNode, IdVal, NumVal, CommentVal, Logo, RelationshipType, NodeTemplate, Relationship, NodeType } from './model.js';

export default class MyLetoListener extends letoListener {
    constructor() {
        super();
        this.nbError = 0
        this.version = 0
    }

    propagateProg(ctx) { 
        for(let i=0; i<ctx.getChildCount(); i++) {
            let child = ctx.getChild(i)
            child.prog = ctx.prog
        }
    }

    enterProg(ctx) {
        ctx.prog = new Prog(ctx, this.version)
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

        if(this.nbError != 0) {
            ctx.prog.nodeTypes = {}
            ctx.prog.relationshipsTypes = {}
            ctx.prog.relationships = {bySrc: {}, byDst: {}, byRel: {}}
            ctx.prog.nodeTemplates = {}
            return;
        }
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
                if (i==nbChilds-1 && ctx.getChild(i).getText() != ';') {
                    ctx.model = new Instructions(ctx)
                    ctx.model.errorPonctuation()
                    this.nbError ++
                }
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


    enterNodeType(ctx) {
        this.propagateProg(ctx)
    }

    exitNodeType(ctx) {
        let start = ctx.start
        let stop = ctx.stop
        let id = ctx.getChild(1).model
        let parent = null
        let properties = null
        let index = 3
        let ele = ctx.getChild(index).model
        let derived = ctx.getChild(2).getText()
        if(ele instanceof IdVal) {
            parent = ele
            index = 5
        } 
        ele = ctx.getChild(index).model
        if(ele != null) {
            properties = ele
        }
        ctx.model = new NodeType(start, stop, id, derived, parent, properties, ctx)
        if(ctx.prog.nodeTypes[id.name] != null || (parent != null && ctx.prog.nodeTypes[parent.name] == null)) {
            ctx.model.errorNodeType()
            this.nbError ++
        } else {
            ctx.model.equals(ctx.prog)
            this.version ++
            //ctx.prog.addNodeType(ctx.model)
        }
    }

    exitProperties(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i = 0; i<nbChilds; i++) {
            let attr = ctx.getChild(i).model
            ctx.model.push(attr)
        }
    }

    exitProperty(ctx) {
        let attr = ctx.getChild(0).model
        ctx.model = attr
    }

    exitLogo(ctx) {
        let path = ctx.getChild(2).getText()
        ctx.model = new Logo(path, ctx)
    }

    exitRelationshipType(ctx) {
        let start = ctx.start
        let stop = ctx.stop
        let id = ctx.getChild(1).model
        let parent = null
        let derived = ctx.getChild(2).getText()
        let ele = ctx.getChild(3).model
        if (ele instanceof IdVal) {
            parent = ele
        }
        ctx.model = new RelationshipType(start, stop, id, derived, parent, ctx)
        if(ctx.prog.relationshipsTypes[id.name] != null || ctx.prog.nodeTypes[parent.name] == null) {
            ctx.model.errorRelationshipType()
            this.nbError ++
        } else {
            ctx.model.equals(ctx.prog)
            //ctx.prog.addRelationshipType(ctx.model)
        }
    }

    exitNodeTemplate(ctx) {
        let start = ctx.start
        let stop = ctx.stop
        let id = ctx.getChild(1).model
        let nodeType = ctx.getChild(3).model
        ctx.model = new NodeTemplate(start, stop, id, nodeType, ctx)
        if(ctx.prog.nodeTypes[nodeType.name] != null) {
            ctx.model.equals(ctx.prog)
            //ctx.prog.addNodeTemplate(ctx.model)
        } else {
            ctx.model.errorNodeTemplate()
            this.nbError ++
        }
    }

    exitRelationship(ctx) {
        let start = ctx.start
        let stop = ctx.stop
        let src = ctx.getChild(1).model
        let dst = ctx.getChild(3).model
        let rel = ctx.getChild(5).model
        ctx.model = new Relationship(start, stop, src, dst, rel, ctx) 
        if(ctx.prog.nodeTemplates[src.name] != null && ctx.prog.nodeTemplates[dst.name] != null) {
            ctx.model.equals(ctx.prog)
            //ctx.prog.addRelationship(ctx.model)
        } else {
            ctx.model.errorRelationship()
            this.nbError ++
        }
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