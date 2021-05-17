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
        return "componant " + this.id.name + ((this.parent != null) ? (" from " + this.parent.name) : "") + ' {' + this.attributes + '}' + " ; "
    }
}

export class AttributeNode extends ModelNode {
    constructor(ctx) {
        super(ctx)
        this.nodeType = "Attribute"
    }
}

export class Logo extends AttributeNode {
    constructor(path, ctx) {
        super(ctx)
        this.path = path
    }

    toString() {
        return "logo : " + this.path + ";"
    }
}

export function relationshipTypeFactory(prog, ctx, id, parentName) {
    let name = id.name
    let current = prog.relationshipsTypes[name]
    if (current == null) {
        if(parentName != '_default' && prog.nodeTypes[parentName] == null) {
            console.log("Error ==> nodeType " + parentName + " does not exist")
            return
        } else {
            current = new RelationshipType(prog.version, name, parentName, ctx)
            prog.relationshipsTypes[name] = current
            ctx.model = current
            console.log("Creation : relationshipType " + name)
        }
    } else {
        if(parentName != '_default' && prog.nodeTypes[parentName] == null) {
            console.log("Error ==> nodeType " + parentName + " does not exist")
            return
        } else {
            if (parentName != current.parentName) {
                current.parentName = parentName
                current.parent = null
                console.log("Event : relationshipsTypes " + name + " changed from parent")
            }
        }
    }
    current.version = prog.version
}

class RelationshipType extends InstructionNode {
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
                    throw new Error(" ==> relationshipType '" + this.parentName + "' is not defined.")
                } catch (e) {
                    console.error(e.name + e.message)
                }
            }
        }
    }

    errorRelationshipType() {
        try {
            throw new Error(" ==> cannot create a relationshipType, " + this.id + " already exists, or " + this.parentName + " does not exist")
        } catch (e) {
            console.error(e.name + e.message)
            console.error("relationshipType " + this.id.name + ((this.parentName != null) ? (" derived_from " + this.parentName.toString()) : "") + " ; \n")
        }
    }

    toString() {
        return "relationshipType " + this.id.name + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + " ; "
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

export function relationshipFactory(prog, ctx, src, dst, rel) {
    let srcName = src.name
    let dstName = dst.name
    let relName = rel.name
    let current = prog.relationships[srcName]
    if (current == null) {
        current = new Relationship(prog.version, srcName, dstName, relName, ctx)
        prog.relationships[srcName] = current
        ctx.model = current
        console.log("Creation : relationship from " + srcName + " to " + dstName)
    } else {
        if (dstName != current.dstName) {
            current.dstName = dstName
            current.dst = null
            console.log("Event : relationship " + srcName + " changed from destination")
        }
        if (relName != current.relName) {
            current.relName = relName
            current.rel = null
            console.log("Event : relationship " + srcName + " changed from relation")
        }
    }
    current.version = prog.version
}

class Relationship extends InstructionNode {
    constructor(version, srcName, dstName, relName, ctx) {
        super(ctx)
        this.version = version
        this.start = ctx.start
        this.stop = ctx.stop
        this.srcName = srcName
        this.dstName = dstName
        this.relName = relName
        this.label = '_default'
        this.src = null
        this.dst = null
        this.rel = null
    }

    setLabel(str) {
        this.label = str
    }

    checkType(prog) {
        if (this.srcName == null || this.dstName == null || this.relName == null) {
            try {
                throw new Error(" ==> problem about name of parent")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
        this.src = prog.nodeTemplates[this.srcName]
        this.dst = prog.nodeTemplates[this.dstName]
        this.rel = prog.relationshipsTypes[this.relName]
        if (this.src == null || this.dst == null || this.rel == null) {
            try {
                throw new Error(" ==> nodeTemplate :'" + this.src + "," + this.dst + ", or relationshipType :" + this.rel + "is not defined.")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }

    errorRelationship() {
        try {
            throw new Error(" ==> cannot create a relationship, check that nodeTemplates exist : " + this.srcName + ", " + this.dstName + ", or if relationType " + this.relName + " exist")
        } catch (e) {
            console.error(e.name + e.message)
        }
    }

    toString() {
        return "relationship " + this.src.name + " -> " + this.dst.name + " : " + this.rel.name + ";"
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