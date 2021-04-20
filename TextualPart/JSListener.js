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


JSListener.prototype.exitProg = function(ctx) { 
};

JSListener.prototype.exitInstruction = function(ctx) {
};

JSListener.prototype.exitDefinition = function(ctx) {
};

class Model{
    init(){
        m = "MyModele ";
    }
    newAsset(id, comp){
        a = foncAsset(id, comp);
    }
    newComponant(id, lien, id2){
        c = foncComponant(id, lien, id2);
    }
}

class getInstantiation{
    constructor(node)
    {
        this.node = new getNode(node);
    }
}
JSListener.prototype.exitInstantiation = function(ctx) {
    Myinstant = new getInstantiation(ctx.getChild(0));
};


function foncComponant (id, lien, id2) {
    this.id = id;
    this.lien = lien;
    this.id2 = id2;
    this.string = function() {
        alert(id + ' ' + lien + ' ' + id2 );
    }
}

 
JSListener.prototype.exitNode_type = function(ctx) {
    var comp = model.newComponant(ctx.getChild(1), ctx.getChild(2), ctx.getChild(3));
};


JSListener.prototype.exitRelationship_type = function(ctx) {};


function foncAsset (id, comp) {
    this.id = id;
    this.comp = comp;
    this.string = function() {
        alert(id + ' ' + comp);
    }
}
JSListener.prototype.exitNode = function(ctx) {
   ass = model.newAsset(ctx.getChild(1), ctx.getChild(3))
};


JSListener.prototype.exitRelationship = function(ctx) {};


class getNumber {
    constructor(num) {
        this.num = num;
    }
}
JSListener.prototype.exitNumber = function(ctx) {
    myNum = new getNumber(ctx.getChild(0));
};


JSListener.prototype.exitComment = function(ctx) {};


class getId {
    constructor(name) {
        this.name = name;
    }
}
JSListener.prototype.exitId = function(ctx) {
    myId = new getId(ctx.getChild(0));
};


class getComponant {
    constructor(comp) {
        this.comp = comp;
    }
}
JSListener.prototype.exitComponant = function(ctx) {
    myComponant = new getComponant(ctx.getChild(0));
};

