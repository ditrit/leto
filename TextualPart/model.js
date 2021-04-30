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
        this.links = {}
        this.instructions = []
    }
}

export class Instructions extends ModelNode {
    constructor(ctx) {
        super(ctx)
    }

    errorPonctuation() {
        try {
            throw new Error(" ==> Attention oublis d'un point-virgule")
        } catch (e) {
            console.log(e.name + e.message)
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
            throw new Error(" ==> impossible de créer un componant, " + this.id + " existe deja")
        } catch (e) {
            console.log(e.name + e.message)
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
            throw new Error(" ==> impossible de créer une relationship, " + this.id + " existe deja")
        } catch (e) {
            console.log(e.name + e.message)
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
            throw new Error(" ==> impossible de créer un asset, vérifiez que les composants existent : " + this.id + ", " + this.componant)
        } catch (e) {
            console.log(e.name + e.message)
        }
    }

    toString() {
        return "asset " + this.id.name + " : " + this.componant.name + " ; ";
    }
}

export class Link extends InstructionNode {
    constructor(src, dst, rel, ctx) {
        super(ctx)
        this.src = src
        this.dst = dst
        this.rel = rel
    }

    errorLink() {
        try {
            throw new Error(" ==> impossible de créer un link, vérifiez que les relationships existent : " + this.src + ", " + this.dst)
        } catch (e) {
            console.log(e.name + e.message)
        }
    }

    toString() {
        return "link " + this.src.name + " -> " + this.dst.name + " : " + this.rel.name + ";";
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
