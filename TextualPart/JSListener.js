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
    nbChild = childElementCount;
    for(let i=0; i<nbChild; i++){
        child = ctx.getChild(i).model;
        ctx.model = new model.definition(child);
        console.log("création d'une definition : " + ctx.model);
    }
    
};

JSListener.prototype.exitInstantiation = function(ctx) {
    nbChild = childElementCount;
    for(let i=0; i<nbChild; i++){
        child = ctx.getChild(i).model;
        ctx.model = new model.instruction(child);
        console.log("création d'une instantiation : " + ctx.model);
    }
};

JSListener.prototype.exitComponant = function(ctx) {
    idComponant = ctx.getChild(1).model;
    idParent = ctx.getChild(3); 
    if (idParent != null) {
        idParent = idParent.model;
    } else {
        idParent = null;
    }
    ctx.model = new model.Componant(idComponant, idParent);
    console.log("Création du composant : " + ctx.model);
};

JSListener.prototype.exitRelationship = function(ctx) {
    idComponant = ctx.getChild(1).model;
    idParent = ctx.getChild(3);
    if (idParent != null) {
        idParent = idParent.model;
    } else {
        idParent = null;
    }
    ctx.model = new model.RelationShip(idComponant, idParent);
    console.log("Création d'une relationShip : " + ctx.model);
};

JSListener.prototype.exitAsset = function(ctx) {
    idComponant = ctx.getChild(1).model;
    connexion = ctx.getChild(2).model;
    idConnexion = ctx.getChild(3).model;

    ctx.model = new model.Asset(idComponant, connexion, idConnexion);
    console.log("Création d'un asset : " + ctx.model);
};

JSListener.prototype.exitLink = function(ctx) {
    idComponant = ctx.getChild(1).model;
    connexion = ctx.getChild(2).model;
    idConnexion = ctx.getChild(3).model;

    ctx.model = new model.Link(idComponant, connexion, idConnexion);
    console.log("Création d'un link : " + ctx.model);
};

JSListener.prototype.exitNumber = function(ctx) {
    ctx.model = new model.Number(ctx.getChild(0));
    console.log("Création d'un nombre : " + ctx.model);
};


JSListener.prototype.exitComment = function(ctx) {};


JSListener.prototype.exitId = function(ctx) {
    ctx.model = new model.Id(ctx.getChild(0));
    console.log("Création de l'id : " + ctx.model);
};









/*
JSListener.prototype.exitNode = function(ctx) {
    idComponant = ctx.getChild(1).model;
    idParent = ctx.getChild(0); 
    if (idParent != null) {
        idParent = idParent.model;
    } else {
        idParent = null;
    }
    ctx.model = new model.Componant(idComponant, idParent);
    console.log("Création du composant : " + ctx.model);
};
*/

/*
JSListener.prototype.exitComponant = function(ctx) {
    ctx.model = new.model.Componant(ctx.getChild(0));
    console.log("Création du composant choisi : " + ctx.model);
};
*/