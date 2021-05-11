import antlr4 from 'antlr4';
import MyGrammarLexer from './antlr/letoLexer.js';
import MyGrammarParser from './antlr/letoParser.js';
import MyLetoListener from './MyLetoListener.js';
import {ProgModel} from './prog_model.js';

export class letoModel {
    constructor() {
        this.prog = new ProgModel()
    }

    parse(input) {
        this.prog.version += 1
        const chars = new antlr4.InputStream(input);
        const lexer = new MyGrammarLexer(chars);
        const tokens  = new antlr4.CommonTokenStream(lexer);
        const parser = new MyGrammarParser(tokens);
        parser.buildParseTrees = true;
        const tree = parser.prog();
        const myListener = new MyLetoListener(this.prog);
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(myListener, tree)
        this.prog.checkType()
    }


    toString()  {
        return this.prog.toString
    }

}

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