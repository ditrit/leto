var antlr4 = require('antlr4/index');
const letoListener = require('./antlr/letoListener.js').letoListener;
const fs = require("fs");
const model = require("./model.js")

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
    ctx.model = ctx.getChild(0).model
    console.log("Création de l'id : " + ctx.model)
};

JSListener.prototype.exitInstantiation = function(ctx) {
};

JSListener.prototype.exitNode_type = function(ctx) {
    var comp = model.newComponant(ctx.getChild(1), ctx.getChild(2), ctx.getChild(3));
};

JSListener.prototype.exitRelationship_type = function(ctx) {};


JSListener.prototype.exitNode = function(ctx) {
   ass = model.newAsset(ctx.getChild(1), ctx.getChild(3))
};


JSListener.prototype.exitRelationship = function(ctx) {};


JSListener.prototype.exitNumber = function(ctx) {
    ctx.model = new model.Number(ctx.getChild(0));
};


JSListener.prototype.exitComment = function(ctx) {};


JSListener.prototype.exitId = function(ctx) {
    ctx.model = new model.Id(ctx.getChild(0));
    console.log("Création de l'id : " + ctx.model)
};


JSListener.prototype.exitComponant = function(ctx) {
    idComponant = ctx.getChild(0).model
    idParent = ctx.getChild(1) 
    if (idParent != null) {
        idParent = idParent.model
    } else {
        idParent = null
    }
    ctx.model = new model.Componant(idComponant, idParent);
    console.log("Création du composant : " + ctx.model)
};

