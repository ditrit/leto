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
        let srcs = this.relationships.bySrc
        for (var src in srcs) {
            let dsts = srcs[src]
            for(var dst in dsts) {
                let rels = dsts[dst]
                for(var rel in rels) {
                    let labels = rels[rel]
                    for(var label in labels) {
                        this.relationships.bySrc[src][dst][rel][label].checkType(this)
                    }
                }
            }
        }
    }

    addNodeType(nodeType) {
        let id = nodeType.id.name
        let nodeTypesList = this.nodeTypes

        if(nodeTypesList[id] == null) {
            nodeTypesList[id] = nodeType
        } else {
            try {
                throw new Error(" ==> the nodeType " + id + " already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }

    addNodeTemplate(nodeTemplate) {
        let id = nodeTemplate.id.name
        let nodeTemplatesList = this.nodeTemplates

        if(nodeTemplatesList[id] == null) {
            nodeTemplatesList[id] = nodeTemplate
        } else {
            try {
                throw new Error(" ==> the nodeTemplate " + id + " already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }

    addRelationshipType(relationshipType) {
        let id = relationshipType.id.name
        let relationshipTypeList = this.relationshipsTypes

        if(relationshipTypeList[id] == null) {
            relationshipTypeList[id] = relationshipType
        } else {
            try {
                throw new Error(" ==> the relationshipType " + id + " already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }

    addRelationship(relationship) {
        let src = relationship.srcName.name
        let dst = relationship.dstName.name
        let rel = relationship.relName.name
        let label  = relationship.label
        let srcRelationships = this.relationships.bySrc
        let dstRelationships = this.relationships.byDst
        let relRelationships = this.relationships.byRel
        if(srcRelationships[src] == null) {
            srcRelationships[src] = {}
        }
        if(srcRelationships[src][dst] == null) {
            srcRelationships[src][dst] = {}
        }
        if(srcRelationships[src][dst][rel] == null) {
            srcRelationships[src][dst][rel] = {}
        }
        if(srcRelationships[src][dst][rel][label] == null) {
            srcRelationships[src][dst][rel][label] = relationship
        } else {
            try {
                throw new Error(" ==> the relationship already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }

        if(dstRelationships[dst] == null) {
            dstRelationships[dst] = {}
        }
        if(dstRelationships[dst][src] == null) {
            dstRelationships[dst][src] = {}
        }
        if(dstRelationships[dst][src][rel] == null) {
            dstRelationships[dst][src][rel] = {}
        }
        if(dstRelationships[dst][src][rel][label] == null) {
            dstRelationships[dst][src][rel][label] = relationship
        } else {
            try {
                throw new Error(" ==> the relationship already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }

        if(relRelationships[rel] == null) {
            relRelationships[rel] = {}
        }
        if(relRelationships[rel][src] == null) {
            relRelationships[rel][src] = {}
        }
        if(relRelationships[rel][src][dst] == null) {
            relRelationships[rel][src][dst] = {}
        }
        if(relRelationships[rel][src][dst][label] == null) {
            relRelationships[rel][src][dst][label] = relationship
        } else {
            try {
                throw new Error(" ==> the relationship already exists")
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
