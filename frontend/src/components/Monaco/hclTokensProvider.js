/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />
import {createLexer, createParserFromLexer} from './ParserFacade.js'
import antlr4 from 'antlr4'

export class hclState {
    clone() {
        return new hclState();
    }

    equals(other) {
        return true;
    }

}

export class hclTokensProvider {
    getInitialState() {
        return new hclState();
    }

    tokenize(line, state) {
        return tokensForLine(line);
    }

}

const EOF = -1;

class hclToken {
    scopes;
    startIndex;

    constructor(ruleName, startIndex) {
        this.scopes = ruleName.toLowerCase() + ".hcl";
        this.startIndex = startIndex;
    }
}

class hclLineTokens {
    endState;
    tokens;

    constructor(tokens) {
        this.endState = new hclState();
        this.tokens = tokens;
    }
}

export function tokensForLine(input) {
    var errorStartingPoints = []

    class ErrorCollectorListener extends antlr4.error.ErrorListener {
        syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
            errorStartingPoints.push(column)
        }
    }

    const lexer = createLexer(input);
    lexer.removeErrorListeners();
    let errorListener = new ErrorCollectorListener();
    lexer.addErrorListener(errorListener);
    let done = false;
    let myTokens = [];
    const parser = createParserFromLexer(input);
    do {
        let token = lexer.nextToken();
        if (token == null) {
            done = true
        } else {
            if (token.type == EOF) {
                done=true
            } else {
                let tokenTypeName = parser.symbolicNames[token.type];
                let myToken = new hclToken(tokenTypeName, token.column);
                myTokens.push(myToken);
            }
        }
    } while (!done);

    // Add all errors
    for (let e of errorStartingPoints) {
        myTokens.push(new hclToken("error.hcl", e));
    }
    myTokens.sort((a, b) => (a.startIndex > b.startIndex) ? 1 : -1)

    return new hclLineTokens(myTokens);
}