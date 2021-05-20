import letoListener from './antlr/letoListener.js';
import { CapabilityNodeType, PropertyNodeType, RequirementNodeType, nodeTypeFactory, nodeTemplateFactory, RequirementNodeTemplate, PropertyNodeTemplate, Instructions, InstructionNode, IdVal, TypeVal, CommentVal } from './model.js';

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

    exitNodeType(ctx) {
        let id = ctx.getChild(1).model
        let parentName = '_default'
        let index = 3
        let properties = null
        let capabilities = null
        let requirements = null
        let sep = ctx.getChild(2).getText()
        if (sep == 'derived_from') {
            parentName = ctx.getChild(index+2).model
            index = 5
        }
        sep = ctx.getChild(index).getText()
        if(sep == 'properties {') {
            properties = ctx.getChild(index+2).model
            index = 8
        }
        else if(sep == 'capabilities {') {
            properties = ctx.getChild(index+2).model
            index = 8
        }
        else if(sep == 'requirements {') {
            properties = ctx.getChild(index+2).model
            index = 8
        }
        nodeTypeFactory(this.prog, ctx, id, parentName, properties, capabilities, requirements)
    }

    exitPropertiesNodeType(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i = 0; i<nbChilds; i++) {
            let property = ctx.getChild(i).model
            ctx.model.push(property)
        }
    }

    exitPropertyNodeType(ctx) {
        let id = ctx.getChild(0).model
        let type = ctx.getChild(2).model
        ctx.model = new PropertyNodeType(id, type, ctx)
    }

    exitCapabilitiesNodeType(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i=0; i<nbChilds; i++) {
            let requirement = ctx.getChild(i).model
            ctx.model.push(requirement)
        }
    }

    exitCapabilityNodeType(ctx) {
        let id = ctx.getChild(0).model
        let type = ctx.getChild(2).getText()
        ctx.model = new CapabilityNodeType(id, type, ctx)
    }

    exitRequirementsNodeType(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i=0; i<nbChilds; i++) {
            let requirement = ctx.getChild(i).model
            ctx.model.push(requirement)
        }
    }

    exitRequirementNodeType(ctx) {
        let id = ctx.getChild(0).model
        let node = ctx.getChild(2).model
        ctx.model = new RequirementNodeType(id, node, ctx)
    }

    exitNodeTemplate(ctx) {
        let id = ctx.getChild(1).model
        let parentName =  ctx.getChild(2).model
        let properties = null
        let requirements = null
        let index = 5
        let sep = ctx.getChild(index).getText()
        if(sep == 'properties {') {
            properties = ctx.getChild(6).model
            index = 8
        }
        else if(sep == 'requirements {') {
            requirements = ctx.getChild(6).model
            index = 8
        }
        sep = ctx.getChild(index).getText()
        if(sep == 'properties {') {
            properties = ctx.getChild(6).model
        }
        else if(sep == 'requirements {') {
            requirements = ctx.getChild(6).model
        }
        nodeTemplateFactory(this.prog, ctx, id, parentName, properties, requirements)
    }

    exitPropertiesNodeTemplate(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i=0; i<nbChilds; i++) {
            let property = ctx.getChild(i).model
            ctx.model.push(property)
        }
    }

    exitPropertyNodeTemplate(ctx) {
        let id = ctx.getChild(0).model
        let type = ctx.getChild(2).model
        ctx.model = new PropertyNodeTemplate(id, type, ctx)
	}

    exitRequirementsNodeTemplate(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = []
        for(let i=0; i<nbChilds; i++) {
            let requirement = ctx.getChild(i).model
            ctx.model.push(requirement)
        }
	}

    exitRequirementNodeTemplate(ctx) {
        let id = ctx.getChild(0).model
        let node = ctx.getChild(2).model
        ctx.model = new RequirementNodeTemplate(id, node, ctx)
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

    exitType(ctx) {
        if( ctx.getChildCount() == 1 ) {
            ctx.model = new TypeVal(ctx.getChild(0).getText(), ctx)
        }
	}

}