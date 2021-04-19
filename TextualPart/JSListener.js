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

//MyModele instantiation ( bdd database ) ( serv server ) definition ( bdd : serv )
class Model{
    constructor(chaine){
        this.chaine = chaine;
    }

    init(){
        this.chaine = "MyModele ";
    }
    newInst(){
        this.chaine += "instantiation";
    }
    newAsset(id, comp){
        this.chaine += " ( " + id + " " + comp + " ) ";
    }
    newDef(){
        this.chaine += "definition";
    }
    newComponant(id, lien, id2){
        this.chaine += " ( " + id + " " + lien + " " + id2 + " ) ";
    }
}


JSListener.prototype.exitProg = function(ctx) {
    
};

JSListener.prototype.exitInstruction = function(ctx) {
    model = new Model("");
    model.init();
};

JSListener.prototype.exitDefinition = function(ctx) {
    model.newDef();
};


JSListener.prototype.exitInstantiation = function(ctx) {
    model.newInst();
};


JSListener.prototype.exitNode_type = function(ctx) {
    id = ctx.getChild(1);
    lien = ctx.getChild(2);
    id2 = ctx.getChild(3);
    model.newComponant(id, lien, id2);
};


JSListener.prototype.exitRelationship_type = function(ctx) {};


JSListener.prototype.exitNode = function(ctx) {
    id = ctx.getChild(1);
    comp = ctx.getChild(3);
    model.newAsset(id, comp);
};


JSListener.prototype.exitRelationship = function(ctx) {};


JSListener.prototype.exitNumber = function(ctx) {
    num = ctx.getChild(0);
    return num;
};


JSListener.prototype.exitComment = function(ctx) {};


JSListener.prototype.exitId = function(ctx) {
    id = ctx.getChild(0);
    return id;
};


JSListener.prototype.exitComponant = function(ctx) {
    componant = ctx.getChild(0);
    return componant ;
};

