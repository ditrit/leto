class Model {
    constructor(name, myType) {
        this.name = name;
        this.myType = myType;
    }
}

class Componant extends Model {
    constructor(Id, IdParent) {
        super(Id.name, "componant");
        this.Id = Id;
        this.parent = IdParent;
    }
}

class Componant extends Model {
    constructor(componant) {
        super(componant, "componant")
    }
}

class Id extends Model {
    constructor(id) {
        super(id, "id")
    }
}

class Number extends Model {
    constructor(number) {
        super(number, "number")
    }
}