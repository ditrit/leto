/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />
import {createLexer, createParserFromLexer} from './ParserFacade.js'
import antlr4 from 'antlr4'

export class HclState {
    clone() {
        return new HclState();
    }

    equals(_other) {
        return true;
    }

}

export class HclTokensProvider {
    getInitialState() {
        return new HclState();
    }

    tokenize(line, _state) {
        return tokensForLine(line);
    }

}

const EOF = -1;

class HclToken {
    scopes;
    startIndex;

    constructor(ruleName, startIndex) {
        this.scopes = ruleName.toLowerCase() + ".hcl";
        this.startIndex = startIndex;
    }
}

class HclLineTokens {
    endState;
    tokens;

    constructor(tokens) {
        this.endState = new HclState();
        this.tokens = tokens;
    }
}

export function tokensForLine(input) {
    var errorStartingPoints = []

    class ErrorCollectorListener extends antlr4.error.ErrorListener {
        syntaxError(_recognizer, _offendingSymbol, _line, column, _msg, _e) {
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
                let myToken = new HclToken(tokenTypeName, token.column);
                myTokens.push(myToken);
            }
        }
    } while (!done);

    // Add all errors
    for (let e of errorStartingPoints) {
        myTokens.push(new HclToken("error.hcl", e));
    }
    myTokens.sort((a, b) => (a.startIndex > b.startIndex) ? 1 : -1)

    return new HclLineTokens(myTokens);
}