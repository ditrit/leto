import letoListener from './antlr/letoListener.js';
import { NodeTypeFactory, Instructions, InstructionNode, IdVal, NumVal, CommentVal, Logo, RelationshipType, NodeTemplate, Relationship } from './model.js';

export default class MyLetoListener extends letoListener {
    constructor(progModel) {
        super();
        this.prog = progModel
        this.nbError = 0
    }

    exitProg(ctx) {
        let nbChilds = ctx.getChildCount()

        for(let i = 0; i<nbChilds; i++) {
            let ele = ctx.getChild(i).model
            if (ele instanceof Array) {
                this.prog.instructions = this.prog.instructions.concat(ele)
            }
        }

        if(this.nbError != 0) {
            console.error("errors")
            return;
        }
    }

    exitLine(ctx) {
        let ele = ctx.getChild(0).model
        if (ele instanceof Array) {
            ctx.model = ele
        } else {
            ctx.model = []
        }
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

    exitInstruction(ctx) {
        ctx.model = ctx.getChild(0).model
    }

    exitDefinition(ctx) {
        ctx.model = ctx.getChild(0).model
    }

    exitInstantiation(ctx) {
        ctx.model = ctx.getChild(0).model
    }


    exitNodeType(ctx) {
        let id = ctx.getChild(1).model
        let parentName = null
        let index = 3
        let sep = ctx.getChild(2).getText()
        if (sep == 'derived_from') {
            parentName = ctx.getChild(3).model
            index = 5
        }
        let properties = ctx.getChild(index).model
        if(! (properties instanceof IdVal)) {
            properties = null
        }

        nodeTypeFactory(this.prog, ctx, id, parent, properties)
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
        if(this.prog.relationshipsTypes[id.name] != null || this.prog.nodeTypes[parent.name] == null) {
            ctx.model.errorRelationshipType()
            this.nbError ++
        } else {
            ctx.model.equals(this.prog)
            //this.prog.addRelationshipType(ctx.model)
        }
    }

    exitNodeTemplate(ctx) {
        let start = ctx.start
        let stop = ctx.stop
        let id = ctx.getChild(1).model
        let nodeType = ctx.getChild(3).model
        ctx.model = new NodeTemplate(start, stop, id, nodeType, ctx)
        if(this.prog.nodeTypes[nodeType.name] != null) {
            ctx.model.equals(this.prog)
            //this.prog.addNodeTemplate(ctx.model)
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
        if(this.prog.nodeTemplates[src.name] != null && this.prog.nodeTemplates[dst.name] != null) {
            ctx.model.equals(this.prog)
            //this.prog.addRelationship(ctx.model)
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