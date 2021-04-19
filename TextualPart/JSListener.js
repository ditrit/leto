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

JSListener.prototype.exitInstantiation = function(ctx) {

};

JSListener.prototype.exitNode_type = function(ctx) {
  
};

JSListener.prototype.exitRelationship_type = function(ctx) {
};

JSListener.prototype.exitNode = function(ctx) {
   
};

JSListener.prototype.exitRelationship = function(ctx) {
    
};

JSListener.prototype.exitNumber = function(ctx) {
    
};

JSListener.prototype.exitComment = function(ctx) {
    
};

JSListener.prototype.exitId = function(ctx) {
    
};

JSListener.prototype.exitComponant = function(ctx) {
    
};

