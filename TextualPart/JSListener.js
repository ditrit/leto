var antlr4 = require('antlr4/index');
const letoListener = require('./antlr/letoListener.js').letoListener;
const fs = require("fs");

const print = console.log;

// include directly the implementation of the compiler


JSListener = function () {
	letoListener.call(this);
	return this;
}

JSListener.prototype = Object.create(letoListener.prototype);
JSListener.prototype.constructor = JSListener;

//MyModele((bdd:serv)(bdd database))
class model{
    constructor(chaine){
        this.chaine = chaine;
    }

    init(){
        this.chaine = "MyModele(";
    }
    newAsset(id, comp){
        this.chaine += "(" + id + " " + comp + ")";
    }
    newComponant(id, lien, id2){
        this.chaine += "(" + id + " " +lien + " " + id2 + ")";
    }

}


JSListener.prototype.exitProg = function(ctx) {
    
};

JSListener.prototype.exitInstruction = function(ctx) {

};

JSListener.prototype.exitDefinition = function(ctx) {

};

class getInstantiation{
    constructor(node)
    {
        this.node = new getNode(node);
    }
}
JSListener.prototype.exitInstantiation = function(ctx) {
    const Myinstant = new getInstantiation(ctx.getChild(0));
};


class getNodeType{
    constructor(id, id2)
    {
        this.id = new getId(id);
        this.id2 = new getComponant(id2);
    }
}
JSListener.prototype.exitNode_type = function(ctx) {
    const myNodeType = new getNodeType(ctx.getChild(1), ctx.getChild(3))
};


JSListener.prototype.exitRelationship_type = function(ctx) {};


class getNode{
    constructor(id, comp)
    {
        this.id = new getId(id);
        this.comp = new getComponant(comp);
    }
}
JSListener.prototype.exitNode = function(ctx) {
   const myNode = new getNode(ctx.getChild(1), ctx.getChild(3))
};


JSListener.prototype.exitRelationship = function(ctx) {};


class getNumber {
    constructor(num) {
        this.num = num;
    }
}
JSListener.prototype.exitNumber = function(ctx) {
    const myNum = new getNumber(ctx.getChild(0));
};


JSListener.prototype.exitComment = function(ctx) {};


class getId {
    constructor(name) {
        this.name = name;
    }
}
JSListener.prototype.exitId = function(ctx) {
    const myId = new getId(ctx.getChild(0));
};


class getComponant {
    constructor(comp) {
        this.comp = comp;
    }
}
JSListener.prototype.exitComponant = function(ctx) {
    const myComponant = new getComponant(ctx.getChild(0));
};

