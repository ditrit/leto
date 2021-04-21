export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
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

export class Componant extends ModelNode {
    constructor(name, parent, ctx) {
        super(ctx)
        this.name = name
        this.parent = parent
    }

    toString() {
        return "componant " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + ";"
    }

}

