import letoListener from './antlr/letoListener.js';
import { Capability, Requirement, Property, nodeTypeFactory, nodeTemplateFactory, Instructions, InstructionNode, IdVal, TypeVal, CommentVal } from './model.js';
import { eventModel } from './model_event.js';

export default class MyLetoListener extends letoListener {
    constructor(progModel) {
        super();
        this.prog = progModel
        this.nbError = 0
        this.event = new eventModel(this.prog)
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

        this.event.toString()
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
        let parentName = null
        let index = 3
        let clauses = null
        let sep = ctx.getChild(2).getText()
        if (sep == 'derived_from') {
            parentName = ctx.getChild(3).model
            index = 5
        }
        clauses = ctx.getChild(index).model
        nodeTypeFactory(this.prog, this.event, ctx, id, parentName, clauses)
    }

    exitClausesNodeType(ctx) {
        let nbChilds = ctx.getChildCount()
        let properties = null
        let capabilities = null
        let requirements = null
        let index = 0
        let sep = ctx.getChild(index).getText()
        for(let i=0; i<nbChilds; i++) {
            if(sep == 'properties {'){
                properties = ctx.getChild(index+1).model
                index = index+3
            }
            if(sep == 'capabilities {'){
                capabilities = ctx.getChild(index+1).model
                index = index+3
            }
            if(sep == 'requirements {'){
                requirements = ctx.getChild(index+1).model
                index = index+3
            }
            if(index < nbChilds) {
                sep = ctx.getChild(index).getText()
            } else {
                sep = null
            }
        }
        ctx.model = {properties, capabilities, requirements}
	}

    exitPropertiesNodeType(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = {}
        for(let i = 0; i<nbChilds; i++) {
            if(ctx.getChild(i).model instanceof Property) {
                let property = ctx.getChild(i).model
                ctx.model[property.name] = property
            }   
        }
    }

    exitPropertyNodeType(ctx) {
        let id = ctx.getChild(0).model
        let type = ctx.getChild(2).model
        ctx.model = new Property('nodeType', id, type, ctx)
    }

    exitCapabilitiesNodeType(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = {}
        for(let i=0; i<nbChilds; i++) {
            if(ctx.getChild(i).model instanceof Capability) {
                let capability = ctx.getChild(i).model
                ctx.model[capability.name] = capability
            }
        }
    }

    exitCapabilityNodeType(ctx) {
        let id = ctx.getChild(0).model
        let type = ctx.getChild(2).model
        ctx.model = new Capability(id, type, ctx)
    }

    exitRequirementsNodeType(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = {}
        for(let i=0; i<nbChilds; i++) {
            if(ctx.getChild(i).model instanceof Requirement) {
                let requirement = ctx.getChild(i).model
                ctx.model[requirement.name] = requirement
            }
        }
    }

    exitRequirementNodeType(ctx) {
        let id = ctx.getChild(0).model
        let node = ctx.getChild(2).model
        ctx.model = new Requirement('nodeType', id, node, ctx)
    }

    exitNodeTemplate(ctx) {
        let id = ctx.getChild(1).model
        let parentName = null
        let index = 3
        let clauses = null
        let sep = ctx.getChild(2).getText()
        if (sep == 'type') {
            parentName = ctx.getChild(3).model
            index = 5
        }
        clauses = ctx.getChild(index).model
        nodeTemplateFactory(this.prog, this.event, ctx, id, parentName, clauses)
    }

    exitClausesNodeTemplate(ctx) {
        let nbChilds = ctx.getChildCount()
        let properties = null
        let requirements = null
        let index = 0
        let sep = ctx.getChild(index).getText()
        for(let i=0; i<nbChilds; i++) {
            if(sep == 'properties {'){
                properties = ctx.getChild(index+1).model
                index = index+3
            }
            if(sep == 'requirements {'){
                requirements = ctx.getChild(index+1).model
                index = index+3
            }
            if(index < nbChilds) {
                sep = ctx.getChild(index).getText()
            } else {
                sep = null
            }
        }
        ctx.model = {properties, requirements}
    }

    exitPropertiesNodeTemplate(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = {}
        for(let i = 0; i<nbChilds; i++) {
            if(ctx.getChild(i).model instanceof Property) {
                let property = ctx.getChild(i).model
                ctx.model[property.name] = property
            }   
        }
    }

    exitPropertyNodeTemplate(ctx) {
        let id = ctx.getChild(0).model
        let type = ctx.getChild(2).model
        ctx.model = new Property('nodeTemplate', id, type, ctx)
	}

    exitRequirementsNodeTemplate(ctx) {
        let nbChilds = ctx.getChildCount()
        ctx.model = {}
        for(let i=0; i<nbChilds; i++) {
            if(ctx.getChild(i).model instanceof Requirement) {
                let requirement = ctx.getChild(i).model
                ctx.model[requirement.name] = requirement
            }
        }
	}

    exitRequirementNodeTemplate(ctx) {
        let id = ctx.getChild(0).model
        let node = ctx.getChild(2).model
        ctx.model = new Requirement('nodeTemplate', id, node, ctx)
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

    exitBaseTypes(ctx) {
        if( ctx.getChildCount() == 1 ) {
            ctx.model = new TypeVal(ctx.getChild(0).getText(), ctx)
        }
	}

}