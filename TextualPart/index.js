import antlr4 from 'antlr4';
import MyGrammarLexer from './antlr/letoLexer.js';
import MyGrammarParser from './antlr/letoParser.js';
import MyLetoListener from './MyLetoListener.js';
import {modelInter} from './modele_inter.js';

let model = new modelInter()

export function parse(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new MyGrammarLexer(chars);
    const tokens  = new antlr4.CommonTokenStream(lexer);
    const parser = new MyGrammarParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.prog();
    const myListener = new MyLetoListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(myListener, tree)
    let myProg = tree.prog
    myProg.checkType()
    console.log('NodeTypes ')
    console.log(myProg.nodeTypes)
    console.log('NodeTemplates ')
    console.log(myProg.nodeTemplates)
    console.log('RelationshipsTypes ')
    console.log(myProg.relationshipsTypes)
    console.log('Relationships ')
    console.log(myProg.relationships)
    console.log('Version : ' + myProg.version)
    
    /*model.modification(myProg)
    model.supression(myProg)
    console.log('NodeTypes ')
    console.log(model.progInter.nodeTypes)
    console.log('NodeTemplates ')
    console.log(model.progInter.nodeTemplates)
    console.log('RelationshipsTypes ')
    console.log(model.progInter.relationshipsTypes)
    console.log('Relationships ')
    console.log(model.progInter.relationships)*/

}
