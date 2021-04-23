export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
        var tabDef = []
        var tabInst = []
        let i = 1
    }

    tab(name) {
        if(name == "definition") {
            tabDef[i] == i
        }
        else if(name == "instantiation") {
            tabInst[i] == i
        }
        this.i += 1 
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

export class Relationship extends ModelNode {
    constructor(name, parent, ctx) {
        super(ctx)
        this.name = name
        this.parent = parent
    }

    toString() {
        return "relationShip " + this.name.toString() + ((this.parent != null) ? (" from " + this.parent.toString()) : "") + ";"
    }

}

export class Asset extends ModelNode {
    constructor(id, idConnection, ctx) {
        super(ctx)
        this.id = id
        this.idConnection = idConnection
    }

    toString() {
        return "asset " + this.id.toString() + " : " + this.idConnection.toString() + ";";
    }
}

export class Link extends ModelNode {
    constructor(id, idConnection, ctx) {
        super(ctx)
        this.id = id
        this.idConnection = idConnection
    }

    toString() {
        return "link " + this.id.toString() + " - " + this.idConnection.toString() + ";";
    }
}

export class Definition extends ModelNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name;
    }

    toString() {
        super.tab("Definition")
        return "Definition " 
    }
}

export class Instantiation extends ModelNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name;
    }

    toString() {
        super.tab("Instantiation")
        return "Instantiation"
    }
}

export class Instruction extends ModelNode {
    constructor( ctx) {
        super(ctx)
    }

    toString() {
        return "Instruction"
    }
}

export class Prog extends ModelNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name
    }

    toString() {
        return "Prog" 
    }
}


