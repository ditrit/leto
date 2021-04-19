var antlr4 = require('antlr4/index');
const letoListener = require('./letoListener.js').letoListener;
const fs = require("fs");

const print = console.log;

// include directly the implementation of the compiler

eval(fs.readFileSync("implement.js", "UTF-8"));

JSListener = function () {
	letoListener.call(this);
	return this;
}

JSListener.prototype = Object.create(letoListener.prototype);
JSListener.prototype.constructor = JSListener;

JSListener.tFileName = "test";

JSListener.prototype.enterProg = function(ctx) {
    // create the target file
    openTarget();
};

JSListener.prototype.exitProg = function(ctx) {
    // fill the target file and close it
    closeTarget();
};


JSListener.prototype.enterInstruction = function(ctx) {

};

JSListener.prototype.exitInstruction = function(ctx) {

};


JSListener.prototype.enterDefinition = function(ctx) {

};

JSListener.prototype.exitDefinition = function(ctx) {

};


JSListener.prototype.enterInstantiation = function(ctx) {

};

JSListener.prototype.exitInstantiation = function(ctx) {

};


JSListener.prototype.enterNode_type = function(ctx) { 
};

//componant(bdd (: serv))
JSListener.prototype.exitNode_type = function(ctx) {
   var temp = "console.log(";
   temp += ctx.getChild(1).getText();
   if(ctx.getChild(2)==':' || ctx.getChild(2)=='->'){
        temp += "(";
        temp += ctx.getChild(2);
        temp += ctx.getChild(3);
        temp += ")";
   }
   temp += ")";
   write(temp);
};


JSListener.prototype.enterRelationship_type = function(ctx) {
};

JSListener.prototype.exitRelationship_type = function(ctx) {
};

//asset(bdd is_a database)
JSListener.prototype.enterNode = function(ctx) {
    var temp = "console.log(";
    temp += getChild(1).getText();
    temp += getChild(2).getText();
    temp += getChild(3).getText();
    temp += ")";
    write(temp);
};

JSListener.prototype.exitNode = function(ctx) {
   
};


JSListener.prototype.enterRelationship = function(ctx) {
  
};

JSListener.prototype.exitRelationship = function(ctx) {
    
};


JSListener.prototype.enterNumber = function(ctx) {
  
};

JSListener.prototype.exitNumber = function(ctx) {
    
};


JSListener.prototype.enterComment = function(ctx) {
  
};

JSListener.prototype.exitComment = function(ctx) {
    
};


JSListener.prototype.enterId = function(ctx) {
  
};

JSListener.prototype.exitId = function(ctx) {
    
};


JSListener.prototype.enterComponant = function(ctx) {
  
};

JSListener.prototype.exitComponant = function(ctx) {
    
};

