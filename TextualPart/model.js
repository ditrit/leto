export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
    }
}

export class Instructions extends ModelNode {
    constructor(ctx) {
        super(ctx)
    }

    errorPonctuation() {
        try {
            throw new Error(" ==> Forgotten semicolon \n")
        } catch (e) {
            console.error(e.name + e.message)
        }
    }
}

export class InstructionNode extends ModelNode {
    constructor(ctx) {
        super(ctx)
        this.nodeType = "Instruction"
    }
}   

export function nodeTypeFactory(prog, ctx, id, parentName, properties) {
    let name = id.name
    let current = prog.nodeTypes[name]
    if (current == null) {
        if(parentName != '_default' && prog.nodeTypes[parentName] == null) {
            console.log("Error ==> nodeType " + parentName + " does not exist")
            return
        } else {
            current = new NodeType(prog.version, name, parentName, properties, ctx)
            prog.nodeTypes[name] = current
            ctx.model = current
            console.log("Creation : nodeType " + name)
        }
    } else {
        if(parentName != '_default' && prog.nodeTypes[parentName] == null) {
            console.log("Error ==> nodeType " + parentName + " does not exist")
            return
        } else {
            if (parentName != current.parentName) {
                current.parentName = parentName
                current.parent = null
                console.log("Event : nodeType " + name + " changed from parent")
            }
            if (properties != current.properties) {
                current.properties = properties
                console.log("Event : nodeType " + name + " changed its properties")
            }
        } 
    }
    current.version = prog.version
}

class NodeType extends InstructionNode {
    constructor(version, name, parentName, properties, ctx) {
        super(ctx)
        this.version = version
        this.start = ctx.start
        this.stop = ctx.stop
        this.id = name
        this.parentName = parentName
        this.parent = null
        this.properties = properties
    }

    checkType(prog) {
        if(this.parentName != '_default') {
            if (this.parentName == null) {
                try {
                    throw new Error(" ==> problem about name of parent")
                } catch (e) {
                    console.error(e.name + e.message)
                }
            }
            this.parent = prog.nodeTypes[this.parentName]
            if (this.parent == null) {
                try {
                    throw new Error(" ==> nodeType '" + this.parentName + "' is not defined.")
                } catch (e) {
                    console.error(e.name + e.message)
                }
            }
        }
    }

    errorNodeType() {
        try {
            throw new Error(" ==> cannot create a nodeType, " + this.id + " already exists, or " + this.parentName + " does not exist")
        } catch (e) {
            console.error(e.name + e.message)
            console.error("nodeType " + this.id.name + ((this.parentName != null) ? (" derived_from " + this.parentName.name) : "") + ' {' + this.attributes.join(",") + '}' + " ; \n")
        }
    }

    toString() {
        return "nodeType " + this.id + ((this.parentName != '_default') ? (" from " + this.parentName) : "") + ((this.properties != null) ? (" {" + this.properties + " }") : " {}") + " ;"
    }
}

export class CapabilityNodeType extends InstructionNode{
    constructor(id, type, ctx) {
        super(ctx)
        this.name = id.name
        this.typeName = type.name
    }
}

export class PropertyNodeType extends InstructionNode {
    constructor(id, type, ctx) {
        super(ctx)
        this.name = id.name
        this.typeName = type.name
    }
}

export class RequirementNodeType extends InstructionNode {
    constructor(id, node, ctx) {
        super(ctx)
        this.name = id.name
        this.nodeName = node.name
    }
}


export function nodeTemplateFactory(prog, ctx, id, parentName) {
    let name = id.name
    let current = prog.nodeTemplates[name]
    if (current == null) {
        if(parentName != '_default' && prog.nodeTypes[parentName] == null) {
            console.log("Error ==> nodeType " + parentName + " does not exist")
            return 
        } else {
            current = new NodeTemplate(prog.version, name, parentName, ctx)
            prog.nodeTemplates[name] = current
            ctx.model = current
            console.log("Creation : nodeTemplate " + name)
        }
        
    } else {
        if(parentName != '_default' && prog.nodeTypes[parentName] == null) {
            console.log("Error ==> nodeType " + parentName + " does not exist")
            return
        } else {
            if (parentName != current.parentName) {
                current.parentName = parentName
                current.parent = null
                console.log("Event : nodeTemplate " + name + " changed from parent")
            }
        }
    }
    current.version = prog.version
}

class NodeTemplate extends InstructionNode {
    constructor(version, name, parentName, ctx) {
        super(ctx)
        this.version = version
        this.start = ctx.start
        this.stop = ctx.stop
        this.id = name
        this.parentName = parentName
        this.parent = null
    }

    checkType(prog) {
        if (this.parentName == null) {
            try {
                throw new Error(" ==> problem about name of parent")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
        this.parent = prog.nodeTypes[this.parentName]
        if (this.parent == null) {
            try {
                throw new Error(" ==> nodeType '" + this.parentName + "' is not defined.")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }

    errorNodeTemplate() {
        try {
            throw new Error(" ==> cannot create a nodeTemplate, check that the nodeType exist : " + this.parentName)
        } catch (e) {
            console.error(e.name + e.message)
            console.error("nodeTemplate " + this.id.name + " type " + this.parentName.name + " ; \n")
        }
    }

    toString() {
        return "asset " + this.id.name + " : " + this.componant.name + " ; "
    }
}

export class RequirementNodeTemplate extends InstructionNode {
    constructor(id, node, ctx) {
        super(ctx)
        this.name = id.name
        this.nodeName = node.name
    }
}

export class PropertyNodeTemplate extends InstructionNode{
    constructor(id, type, ctx) {
        super(ctx)
        this.name = id.name
        this.typeName = type.name
    }
}


export class TerminalNode extends ModelNode {
    constructor(ctx) {
        super(ctx)
        this.nodeType = "Terminal"
    }
}

export class NumVal extends TerminalNode {
    constructor(num, ctx) {
        super(ctx)
        this.num = Number(num)
    }

    toString(){
        return String(this.num)
    }
}

export class StrVal extends TerminalNode {
    constructor(val, ctx) {
        super(ctx)
        this.str = String(val)
    }

    toString(){
        return this.str
    }
}

export class CommentVal extends TerminalNode {
    constructor(comment, ctx) {
        super(ctx)
        this.text = comment
    }

    toString(){
        return this.comment
    }
}

export class IdVal extends TerminalNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name
    }

    toString() {
        return this.name
    }
}

export class TypeVal extends TerminalNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name
    }

    toString() {
        return this.name
    }
}