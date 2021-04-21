class Model {
    constructor(name, myType) {
        this.name = name;
        this.myType = myType;
    }
}

class Componant extends Model {
    constructor(Id, IdParent) {
        super(Id.name, "componant");
<<<<<<< HEAD
        this.Id = Id;
        this.parent = IdParent;
    }
}

class Componant extends Model {
    constructor(componant) {
        super(componant, "componant")
=======
        this.Id = Id
        this.parent = IdParent
>>>>>>> 5fbc0f7459abd59cf214db087b3f0252ec5fca6a
    }
}

class Id extends Model {
    constructor(id) {
        super(id, "id")
    }
<<<<<<< HEAD
}

class Number extends Model {
    constructor(number) {
        super(number, "number")
    }
=======
>>>>>>> 5fbc0f7459abd59cf214db087b3f0252ec5fca6a
}