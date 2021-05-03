export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
    }
}

export class Prog extends ModelNode {
    constructor(ctx) {
        super(ctx)
        this.nodeTypes = {}
        this.relationshipsTypes = {}
        this.nodeTemplates = {}
        this.relationships = {bySrc: {}, byDst: {}, byRel: {}}
        this.instructions = []
    }

    checkType() {
        for (var key in this.nodeTypes) {
            this.nodeTypes[key].checkType(this)
        }
        for (var key in this.relationshipsTypes) {
            this.relationshipsTypes[key].checkType(this)
        }
        for (var key in this.nodeTemplates) {
            this.nodeTemplates[key].checkType(this)
        }
        for (var key in this.relationships.bySrc) {
            for (var key2 in this.relationships.byDst) {
                for (var key3 in this.relationships.byRel) {
                    this.relationships[key][key2][key3].checkType(this)
                }
            }
        }
    }

    addRelationship(link) {
        let src = link.srcName.name
        let dst = link.dstName.name
        let rel = link.relName.name
        let label  = link.label
        let srcLinks = this.relationships.bySrc
        let dstLinks = this.relationships.byDst
        let relLinks = this.relationships.byRel
        if(srcLinks[src] == null) {
            srcLinks[src] = {}
        }
        if(srcLinks[src][dst] == null) {
            srcLinks[src][dst] = {}
        }
        if(srcLinks[src][dst][rel] == null) {
            srcLinks[src][dst][rel] = {}
        }
        if(srcLinks[src][dst][rel][label] == null) {
            srcLinks[src][dst][rel][label] = link
        } else {
            try {
                throw new Error(" ==> the link already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }

        if(dstLinks[dst] == null) {
            dstLinks[dst] = {}
        }
        if(dstLinks[dst][src] == null) {
            dstLinks[dst][src] = {}
        }
        if(dstLinks[dst][src][rel] == null) {
            dstLinks[dst][src][rel] = {}
        }
        if(dstLinks[dst][src][rel][label] == null) {
            dstLinks[dst][src][rel][label] = link
        } else {
            try {
                throw new Error(" ==> the link already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }

        if(relLinks[rel] == null) {
            relLinks[rel] = {}
        }
        if(relLinks[rel][src] == null) {
            relLinks[rel][src] = {}
        }
        if(relLinks[rel][src][dst] == null) {
            relLinks[rel][src][dst] = {}
        }
        if(relLinks[rel][src][dst][label] == null) {
            relLinks[rel][src][dst][label] = link
        } else {
            try {
                throw new Error(" ==> the link already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }  
        
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

export class NodeType extends InstructionNode {
    constructor(name, derived, parentName, attributes, ctx) {
        super(ctx)
        this.id = name
        this.derived = derived
        this.parentName = parentName
        this.parent = null
        this.attributes = attributes
    }

    checkType(prog) {
        if (this.parentName == null && this.derived == "derived_from") {
            try {
                throw new Error(" ==> problem about name of parent")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
        this.parent = prog.nodeTypes[this.parentName]
        if (this.parent == null && this.derived == "derived_from") {
            try {
                throw new Error(" ==> nodeType '" + this.parentName + "' is not defined.")
            } catch (e) {
                console.error(e.name + e.message)
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
        return "componant " + this.id.name + ((this.parent != null) ? (" from " + this.parent.name) : "") + ' {' + this.attributes.join(",") + '}' + " ; "
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

export class RelationshipType extends InstructionNode {
    constructor(name, derived, parentName, ctx) {
        super(ctx)
        this.id = name
        this.derived = derived
        this.parentName = parentName
        this.parent = null
    }

    checkType(prog) {
        if (this.parentName == null && this.derived == "derived_from") {
            try {
                throw new Error(" ==> problem about name of parent")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
        this.parent = prog.nodeTypes[this.parentName]
        if (this.parent == null && this.derived == "derived_from") {
            try {
                throw new Error(" ==> relationshipType '" + this.parentName + "' is not defined.")
            } catch (e) {
                console.error(e.name + e.message)
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

export class NodeTemplate extends InstructionNode {
    constructor(name, parentName, ctx) {
        super(ctx)
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

export class Relationship extends InstructionNode {
    constructor(srcName, dstName, relName, ctx) {
        super(ctx)
        this.srcName = srcName
        this.dstName = dstName
        this.relName = relName
        this.label = ""
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
            throw new Error(" ==> cannot create a relationship, check that the relationship exist : " + this.src + ", " + this.dst)
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
