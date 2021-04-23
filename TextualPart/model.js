export class ModelNode extends Object {
    constructor(name, expression, ctx) {
        super();
        this.ctx = ctx
        this.expression = expression
        this.name = name
        var tabDef = []
        var tabInst = []
    }
}

export class Containers extends ModelNode {
    constructor(contain, ctx) {
        super(ctx)
        this.contain = contain
    }

    toString() {
        return this.contain
    }
}

export class Logo extends ModelNode {
    constructor(chemin, ctx) {
        super(ctx)
        this.chemin = chemin
    }

    toString() {
        return this.chemin
    }
}

export class Attributes extends ModelNode {
    constructor(chemin, contain, ctx) {
        super(ctx)
        this.chemin = chemin
        this.contain = contain
    }

    toString() {
       return " " + this.chemin.toString() + " " + this.contain.toString()
    
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

export class Number extends ModelNode {
    constructor(num, ctx) {
        super(ctx)
        this.num = num
    }

    toString(){
        return this.num
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

export class Relationship extends ModelNode {
    constructor(name, parent, ctx) {
        super(ctx)
        this.name = name
        this.parent = parent
    }

    toString() {
        return "relationShip " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + " ; "
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
        return "componant " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + this.attributes.toString() + " ; "
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

export class Definition extends ModelNode {
    constructor(comp , ctx) {
        super(ctx)
        this.comp = comp
    }

    toString() {
        return this.comp.toString()
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

export class Prog extends ModelNode {
    constructor(programme, ctx) {
        super(ctx)
        this.programme = programme
    }

    toString() {
        return this.programme.toString()  
    }
}


