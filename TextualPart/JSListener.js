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
<<<<<<< HEAD
    console.log("Création de l'id : " + ctx.model);
=======
    console.log("Création de l'id : " + ctx.model)
>>>>>>> 5fbc0f7459abd59cf214db087b3f0252ec5fca6a
};

JSListener.prototype.exitInstantiation = function(ctx) {
};

JSListener.prototype.exitNode_type = function(ctx) {
};

JSListener.prototype.exitRelationship_type = function(ctx) {};


JSListener.prototype.exitNode = function(ctx) {
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


JSListener.prototype.exitRelationship = function(ctx) {};


JSListener.prototype.exitNumber = function(ctx) {
    ctx.model = new model.Number(ctx.getChild(0));
<<<<<<< HEAD
    console.log("Création du nombre : " + ctx.model);
=======
>>>>>>> 5fbc0f7459abd59cf214db087b3f0252ec5fca6a
};


JSListener.prototype.exitComment = function(ctx) {};


JSListener.prototype.exitId = function(ctx) {
    ctx.model = new model.Id(ctx.getChild(0));
<<<<<<< HEAD
    console.log("Création de l'id : " + ctx.model);
=======
    console.log("Création de l'id : " + ctx.model)
>>>>>>> 5fbc0f7459abd59cf214db087b3f0252ec5fca6a
};


JSListener.prototype.exitComponant = function(ctx) {
<<<<<<< HEAD
    ctx.model = new.model.Componant(ctx.getChild(0));
    console.log("Création du composant choisi : " + ctx.model);
};
=======
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

>>>>>>> 5fbc0f7459abd59cf214db087b3f0252ec5fca6a
