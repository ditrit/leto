import antlr4 from 'antlr4';
import MyGrammarLexer from './antlr/letoLexer.js';
import MyGrammarParser from './antlr/letoParser.js';
import MyLetoListener from './MyLetoListener.js';


export function parse() {
    const input = `componant toto ; 
    `;
    const chars = new antlr4.InputStream(input);
    const lexer = new MyGrammarLexer(chars);
    const tokens  = new antlr4.CommonTokenStream(lexer);
    const parser = new MyGrammarParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.prog();
    const myListener = new MyLetoListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(myListener, tree)
}

parse()