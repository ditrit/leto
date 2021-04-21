export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
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

export class RelationShip extends ModelNode {
    constructor(name, parent, ctx) {
        super(ctx)
        this.name = name
        this.parent = parent
    }

    toString() {
        return "relationShip " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + ";"
    }

}

export class Link extends ModelNode {
    constructor(id, connection, id2, ctx) {
        super(ctx)
        this.id = id
        this.connection = connection
        this.id2 = id2
    }

    toString() {
        return "link " + this.id.toString() + " " + this.connection.toString() + " " + this.id2.toString() + ";";
    }
}

export class Asset extends ModelNode {
    constructor(id, connection, id2, ctx) {
        super(ctx)
        this.id = id
        this.connection = connection
        this.id2 = id2
    }

    toString() {
        return "asset " + this.id.toString() + " " + this.connection.toString() + " " + this.id2.toString() + ";";
    }
}

export class Definition extends ModelNode {
    constructor() {

    }
}

export class Instantiation extends ModelNode {
    constructor() {

    }
}

export class Prog extends ModelNode {
    constructor() {

    }
}