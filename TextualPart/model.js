export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
    }
}

export class Prog extends ModelNode {
    constructor(prog, ctx) {
        super(ctx)
        this.prog = prog
        this.componants = {}
        this.relationships = {}
        this.assets = {}
        this.links = {}
    }

    toString() {
        return this.prog.toString()
    }
}

export class Line extends ModelNode {
    constructor(line, ctx) {
        super(ctx)
        this.line = line
    }

    toString() {
        return this.line.toString()
    }
}

export class Instructions extends ModelNode {
    constructor(inst,ctx) {
        super(ctx)
        this.inst = inst
    }

    toString() {
        return this.inst.toString()
    }
}

export class Instruction extends ModelNode {
    constructor(instr, ctx) {
        super(ctx)
        this.instr = instr
    }

    toString() {
        return this.instr.toString()
    }
}

export class Definition extends ModelNode {
    constructor(comp , ctx) {
        super(ctx)
        this.comp = comp
    }

    toString() {
        return this.comp.toString()
    }
}

export class Instantiation extends ModelNode {
    constructor(inst, ctx) {
        super(ctx)
        this.inst = inst
    }

    toString() {
        return this.inst.toString()
    }
}

export class Componant extends ModelNode {
    constructor(name, parent, attributes, ctx) {
        super(ctx)
        this.name = name
        this.parent = parent
        this.attributes = attributes
    }

    toString() {
        //return "componant " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + this.attributes.toString() + " ; "
        return "componant " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + ' {' + this.attributes.toString() + '}' + " ; "

    }

}

export class ComponantAttributes extends ModelNode {
    constructor (attrs, ctx) {
        super(ctx)
        this.attrs = attrs
    }

    toString() {
        return this.attrs.toString()
    }
}

export class ComponantAttribute extends ModelNode {
    constructor(attr, ctx) {
        super(ctx)
        this.attr = attr
    }

    toString() {
        return this.attr.toString()
    }
}

export class Logo extends ModelNode {
    constructor(chemin, ctx) {
        super(ctx)
        this.chemin = chemin
    }

    toString() {
        return "logo : " + this.chemin + ";"
    }
}

export class Hosts extends ModelNode {
    constructor(id, ctx) {
        super(ctx)
        this.id = id
    }

    toString() {
        return this.id + ", "
    }
}

export class Relationship extends ModelNode {
    constructor(name, parent, ctx) {
        super(ctx)
        this.name = name
        this.parent = parent
    }

    toString() {
        return "relationship " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + " ; "
    }
}

export class Asset extends ModelNode {
    constructor(id, idConnection, ctx) {
        super(ctx)
        this.id = id
        this.idConnection = idConnection
    }

    toString() {
        return "asset " + this.id.toString() + " : " + this.idConnection.toString() + " ; ";
    }
}

export class Link extends ModelNode {
    constructor(id, idConnection, ctx) {
        super(ctx)
        this.id = id
        this.idConnection = idConnection
    }

    toString() {
        return "link " + this.id.toString() + " - " + this.idConnection.toString() + " ; ";
    }
}

export class Number extends ModelNode {
    constructor(num, ctx) {
        super(ctx)
        this.num = num
    }

    toString(){
        return this.num
    }
}

export class Comment extends ModelNode {
    constructor(com, ctx) {
        super(ctx)
        this.com = com
    }

    toString(){
        return this.com
    }
}

export class Id extends ModelNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name
    }

    toString() {
        return this.name
    }
}

