/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />

import antlr4 from 'antlr4'
import hclLexer from './schemas_terraform/hclLexer.js';
import hclParser from "./schemas_terraform/hclParser.js";

class MyErrorListener extends antlr4.error.ErrorListener {    
    syntaxError(_recognizer, _offendingSymbol, _line, _column, msg, _e) {
        console.log("ERROR " + msg);
    }
}

export function createLexer(input) {
    const chars = new antlr4.InputStream(input);
    return new hclLexer(chars);
}

export function getTokens(input) {
    return createLexer(input).getAllTokens()
}

function createParser(input) {
    const lexer = createLexer(input);
    return createParserFromLexer(lexer);
}

export function createParserFromLexer(lexer) {
    const tokens = new antlr4.CommonTokenStream(lexer);
    return new hclParser(tokens);
}

function parseTree(input) {
    const parser = createParser(input);
    return parser.compilationUnit();
}

export function parseTreeStr(input) {
    const lexer = createLexer(input);
    lexer.removeErrorListeners();
    lexer.addErrorListener(new MyErrorListener());
    const parser = createParserFromLexer(lexer);
    parser.removeErrorListeners();
    parser.addErrorListener(new MyErrorListener());
    const tree = parser.compilationUnit();
    return tree.toStringTree(parser.ruleNames);
}

export class Error {
    startLine;
    endLine;
    startCol;
    endCol;
    message;

    constructor(startLine, endLine, startCol, endCol, message) {
        this.startLine = startLine;
        this.endLine = endLine;
        this.startCol = startCol;
        this.endCol = endCol;
        this.message = message;
    }
}

class CollectorErrorListener extends antlr4.error.ErrorListener {
    constructor(errors) {
        super()
        this.errors = errors
    }

    syntaxError(_recognizer, offendingSymbol, line, column, msg, _e) {
        var endColumn = column + 1;
        if (offendingSymbol._text !== null) {
            endColumn = column + offendingSymbol._text.length;
        }
        this.errors.push(new Error(line, line, column, endColumn, msg));
    }
}

export function validate(input) {
    let errors = []

    const lexer = createLexer(input);
    lexer.removeErrorListeners();
    lexer.addErrorListener(new MyErrorListener());

    const parser = createParserFromLexer(lexer);
    parser.removeErrorListeners();
    parser.addErrorListener(new CollectorErrorListener(errors));
    parser._errHandler = new HclErrorStrategy();

    return errors;
}

class HclErrorStrategy extends antlr4.error.DefaultErrorStrategy {
    constructor() {
        super()
    }

    reportUnwantedToken(recognizer) {
        return super.reportUnwantedToken(recognizer);
    }

    getExpectedTokens = function(recognizer) {
       return recognizer.getExpectedTokens();
    };
   
    reportMatch = function(recognizer) {
       this.endErrorCondition(recognizer);
    };

    singleTokenDeletion(recognizer) {
       var nextTokenType = recognizer.getTokenStream().LA(2);
       if (recognizer.getTokenStream().LA(1) == hclParser.NL) {
           return null;
       }
       var expecting = this.getExpectedTokens(recognizer);
       if (expecting.contains(nextTokenType)) {
           this.reportUnwantedToken(recognizer);
           recognizer.consume();
           var matchedSymbol = recognizer.getCurrentToken();
           this.reportMatch(recognizer); 
           return matchedSymbol;
       } else {
           return null;
       }
    }
}