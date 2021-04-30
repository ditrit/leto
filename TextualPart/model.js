export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
    }
}

export class Prog extends ModelNode {
    constructor(ctx) {
        super(ctx)
        this.componants = {}
        this.relationships = {}
        this.assets = {}
        this.links = {bySrc: {}, byDst: {}, byRel: {}}
        this.instructions = []
    }

    addLink(link) {
        let src = link.src.name
        let dst = link.dst.name
        let rel = link.rel.name
        let label  = link.label
        let srcLinks = this.links.bySrc
        let dstLinks = this.links.byDst
        let relLinks = this.links.byRel
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

export class Componant extends InstructionNode {
    constructor(name, parent, attributes, ctx) {
        super(ctx)
        this.id = name
        this.parent = parent
        this.attributes = attributes
    }

    errorComponant() {
        try {
            throw new Error(" ==> cannot create a component, " + this.id + " already exists")
        } catch (e) {
            console.error(e.name + e.message)
            console.error("componant " + this.id.name + ((this.parent != null) ? (" from " + this.parent.name) : "") + ' {' + this.attributes.join(",") + '}' + " ; \n")
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

export class Relationship extends InstructionNode {
    constructor(name, parent, ctx) {
        super(ctx)
        this.id = name
        this.parent = parent
    }

    errorRelationship() {
        try {
            throw new Error(" ==> cannot create a relationship, " + this.id + " already exists")
        } catch (e) {
            console.error(e.name + e.message)
            console.error("relationship " + this.id.name + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + " ; \n")
        }
    }

    toString() {
        return "relationship " + this.id.name + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + " ; "
    }
}

export class Asset extends InstructionNode {
    constructor(name, componant, ctx) {
        super(ctx)
        this.id = name
        this.componant = componant
    }

    errorAsset() {
        try {
            throw new Error(" ==> cannot create an asset, check that the components exist : " + this.id + ", " + this.componant)
        } catch (e) {
            console.error(e.name + e.message)
            console.error("asset " + this.id.name + " : " + this.componant.name + " ; \n")
        }
    }

    toString() {
        return "asset " + this.id.name + " : " + this.componant.name + " ; "
    }
}

export class Link extends InstructionNode {
    constructor(src, dst, rel, ctx) {
        super(ctx)
        this.src = src
        this.dst = dst
        this.rel = rel
        this.label = ""
    }

    errorLink() {
        try {
            throw new Error(" ==> cannot create a link, check that the relationship exist : " + this.src + ", " + this.dst)
        } catch (e) {
            console.error(e.name + e.message)
            console.error("link " + this.src.name + " -> " + this.dst.name + " : " + this.rel.name + ";\n")
        }
    }

    setLabel(str) {
        this.label = str
    }

    toString() {
        return "link " + this.src.name + " -> " + this.dst.name + " : " + this.rel.name + ";"
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
