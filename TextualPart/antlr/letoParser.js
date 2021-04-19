// Generated from leto.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import letoListener from './letoListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0011c\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0003\u0002\u0005\u0002\u001c\n\u0002\u0003\u0002\u0006",
    "\u0002\u001f\n\u0002\r\u0002\u000e\u0002 \u0003\u0003\u0003\u0003\u0005",
    "\u0003%\n\u0003\u0003\u0004\u0003\u0004\u0006\u0004)\n\u0004\r\u0004",
    "\u000e\u0004*\u0003\u0004\u0005\u0004.\n\u0004\u0003\u0004\u0005\u0004",
    "1\n\u0004\u0003\u0005\u0003\u0005\u0006\u00055\n\u0005\r\u0005\u000e",
    "\u00056\u0003\u0005\u0005\u0005:\n\u0005\u0003\u0005\u0005\u0005=\n",
    "\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006C",
    "\n\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0005\u0007K\n\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003",
    "\r\u0003\r\u0003\r\u0002\u0002\u000e\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u0002\u0003\u0003\u0002\u0004\u0005\u0002c",
    "\u0002\u001e\u0003\u0002\u0002\u0002\u0004$\u0003\u0002\u0002\u0002",
    "\u00060\u0003\u0002\u0002\u0002\b<\u0003\u0002\u0002\u0002\n>\u0003",
    "\u0002\u0002\u0002\fF\u0003\u0002\u0002\u0002\u000eN\u0003\u0002\u0002",
    "\u0002\u0010T\u0003\u0002\u0002\u0002\u0012Z\u0003\u0002\u0002\u0002",
    "\u0014\\\u0003\u0002\u0002\u0002\u0016^\u0003\u0002\u0002\u0002\u0018",
    "`\u0003\u0002\u0002\u0002\u001a\u001c\u0005\u0004\u0003\u0002\u001b",
    "\u001a\u0003\u0002\u0002\u0002\u001b\u001c\u0003\u0002\u0002\u0002\u001c",
    "\u001d\u0003\u0002\u0002\u0002\u001d\u001f\u0007\u0010\u0002\u0002\u001e",
    "\u001b\u0003\u0002\u0002\u0002\u001f \u0003\u0002\u0002\u0002 \u001e",
    "\u0003\u0002\u0002\u0002 !\u0003\u0002\u0002\u0002!\u0003\u0003\u0002",
    "\u0002\u0002\"%\u0005\u0006\u0004\u0002#%\u0005\b\u0005\u0002$\"\u0003",
    "\u0002\u0002\u0002$#\u0003\u0002\u0002\u0002%\u0005\u0003\u0002\u0002",
    "\u0002&)\u0005\n\u0006\u0002\')\u0005\f\u0007\u0002(&\u0003\u0002\u0002",
    "\u0002(\'\u0003\u0002\u0002\u0002)*\u0003\u0002\u0002\u0002*(\u0003",
    "\u0002\u0002\u0002*+\u0003\u0002\u0002\u0002+-\u0003\u0002\u0002\u0002",
    ",.\u0005\u0014\u000b\u0002-,\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002",
    "\u0002.1\u0003\u0002\u0002\u0002/1\u0005\u0014\u000b\u00020(\u0003\u0002",
    "\u0002\u00020/\u0003\u0002\u0002\u00021\u0007\u0003\u0002\u0002\u0002",
    "25\u0005\u000e\b\u000235\u0005\u0010\t\u000242\u0003\u0002\u0002\u0002",
    "43\u0003\u0002\u0002\u000256\u0003\u0002\u0002\u000264\u0003\u0002\u0002",
    "\u000267\u0003\u0002\u0002\u000279\u0003\u0002\u0002\u00028:\u0005\u0014",
    "\u000b\u000298\u0003\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:=\u0003",
    "\u0002\u0002\u0002;=\u0005\u0014\u000b\u0002<4\u0003\u0002\u0002\u0002",
    "<;\u0003\u0002\u0002\u0002=\t\u0003\u0002\u0002\u0002>?\u0007\u0003",
    "\u0002\u0002?B\u0005\u0016\f\u0002@A\t\u0002\u0002\u0002AC\u0005\u0016",
    "\f\u0002B@\u0003\u0002\u0002\u0002BC\u0003\u0002\u0002\u0002CD\u0003",
    "\u0002\u0002\u0002DE\u0007\u0006\u0002\u0002E\u000b\u0003\u0002\u0002",
    "\u0002FG\u0007\u0003\u0002\u0002GJ\u0005\u0016\f\u0002HI\t\u0002\u0002",
    "\u0002IK\u0005\u0016\f\u0002JH\u0003\u0002\u0002\u0002JK\u0003\u0002",
    "\u0002\u0002KL\u0003\u0002\u0002\u0002LM\u0007\u0006\u0002\u0002M\r",
    "\u0003\u0002\u0002\u0002NO\u0007\u0007\u0002\u0002OP\u0005\u0016\f\u0002",
    "PQ\u0007\b\u0002\u0002QR\u0005\u0018\r\u0002RS\u0007\u0006\u0002\u0002",
    "S\u000f\u0003\u0002\u0002\u0002TU\u0007\u0007\u0002\u0002UV\u0005\u0016",
    "\f\u0002VW\u0007\b\u0002\u0002WX\u0005\u0018\r\u0002XY\u0007\u0006\u0002",
    "\u0002Y\u0011\u0003\u0002\u0002\u0002Z[\u0007\r\u0002\u0002[\u0013\u0003",
    "\u0002\u0002\u0002\\]\u0007\u000f\u0002\u0002]\u0015\u0003\u0002\u0002",
    "\u0002^_\u0007\n\u0002\u0002_\u0017\u0003\u0002\u0002\u0002`a\u0007",
    "\t\u0002\u0002a\u0019\u0003\u0002\u0002\u0002\u000f\u001b $(*-0469<",
    "BJ"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class letoParser extends antlr4.Parser {

    static grammarFileName = "leto.g4";
    static literalNames = [ null, "'componant'", "':'", "'->'", "';'", "'asset'", 
                            "'is_a'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, "COMPONANT", 
                             "ID", "STRINGLITERAL", "LETTRE", "NUMBER", 
                             "FLOAT", "COMMENT", "EOL", "WS" ];
    static ruleNames = [ "prog", "instruction", "definition", "instantiation", 
                         "node_type", "relationship_type", "node", "relationship", 
                         "number", "comment", "id", "componant" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = letoParser.ruleNames;
        this.literalNames = letoParser.literalNames;
        this.symbolicNames = letoParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	prog() {
	    let localctx = new ProgContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, letoParser.RULE_prog);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 28; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 25;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << letoParser.T__0) | (1 << letoParser.T__4) | (1 << letoParser.COMMENT))) !== 0)) {
	                this.state = 24;
	                this.instruction();
	            }

	            this.state = 27;
	            this.match(letoParser.EOL);
	            this.state = 30; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << letoParser.T__0) | (1 << letoParser.T__4) | (1 << letoParser.COMMENT) | (1 << letoParser.EOL))) !== 0));
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	instruction() {
	    let localctx = new InstructionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, letoParser.RULE_instruction);
	    try {
	        this.state = 34;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 32;
	            this.definition();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 33;
	            this.instantiation();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	definition() {
	    let localctx = new DefinitionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, letoParser.RULE_definition);
	    var _la = 0; // Token type
	    try {
	        this.state = 46;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case letoParser.T__0:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 38; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 38;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	                switch(la_) {
	                case 1:
	                    this.state = 36;
	                    this.node_type();
	                    break;

	                case 2:
	                    this.state = 37;
	                    this.relationship_type();
	                    break;

	                }
	                this.state = 40; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===letoParser.T__0);
	            this.state = 43;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===letoParser.COMMENT) {
	                this.state = 42;
	                this.comment();
	            }

	            break;
	        case letoParser.COMMENT:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 45;
	            this.comment();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	instantiation() {
	    let localctx = new InstantiationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, letoParser.RULE_instantiation);
	    var _la = 0; // Token type
	    try {
	        this.state = 58;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case letoParser.T__4:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 50; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 50;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	                switch(la_) {
	                case 1:
	                    this.state = 48;
	                    this.node();
	                    break;

	                case 2:
	                    this.state = 49;
	                    this.relationship();
	                    break;

	                }
	                this.state = 52; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===letoParser.T__4);
	            this.state = 55;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===letoParser.COMMENT) {
	                this.state = 54;
	                this.comment();
	            }

	            break;
	        case letoParser.COMMENT:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 57;
	            this.comment();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	node_type() {
	    let localctx = new Node_typeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, letoParser.RULE_node_type);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 60;
	        this.match(letoParser.T__0);
	        this.state = 61;
	        this.id();
	        this.state = 64;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===letoParser.T__1 || _la===letoParser.T__2) {
	            this.state = 62;
	            _la = this._input.LA(1);
	            if(!(_la===letoParser.T__1 || _la===letoParser.T__2)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 63;
	            this.id();
	        }

	        this.state = 66;
	        this.match(letoParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	relationship_type() {
	    let localctx = new Relationship_typeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, letoParser.RULE_relationship_type);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 68;
	        this.match(letoParser.T__0);
	        this.state = 69;
	        this.id();
	        this.state = 72;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===letoParser.T__1 || _la===letoParser.T__2) {
	            this.state = 70;
	            _la = this._input.LA(1);
	            if(!(_la===letoParser.T__1 || _la===letoParser.T__2)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 71;
	            this.id();
	        }

	        this.state = 74;
	        this.match(letoParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	node() {
	    let localctx = new NodeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, letoParser.RULE_node);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 76;
	        this.match(letoParser.T__4);
	        this.state = 77;
	        this.id();
	        this.state = 78;
	        this.match(letoParser.T__5);
	        this.state = 79;
	        this.componant();
	        this.state = 80;
	        this.match(letoParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	relationship() {
	    let localctx = new RelationshipContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, letoParser.RULE_relationship);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 82;
	        this.match(letoParser.T__4);
	        this.state = 83;
	        this.id();
	        this.state = 84;
	        this.match(letoParser.T__5);
	        this.state = 85;
	        this.componant();
	        this.state = 86;
	        this.match(letoParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, letoParser.RULE_number);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 88;
	        this.match(letoParser.NUMBER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	comment() {
	    let localctx = new CommentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, letoParser.RULE_comment);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 90;
	        this.match(letoParser.COMMENT);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	id() {
	    let localctx = new IdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, letoParser.RULE_id);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 92;
	        this.match(letoParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	componant() {
	    let localctx = new ComponantContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, letoParser.RULE_componant);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 94;
	        this.match(letoParser.COMPONANT);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

letoParser.EOF = antlr4.Token.EOF;
letoParser.T__0 = 1;
letoParser.T__1 = 2;
letoParser.T__2 = 3;
letoParser.T__3 = 4;
letoParser.T__4 = 5;
letoParser.T__5 = 6;
letoParser.COMPONANT = 7;
letoParser.ID = 8;
letoParser.STRINGLITERAL = 9;
letoParser.LETTRE = 10;
letoParser.NUMBER = 11;
letoParser.FLOAT = 12;
letoParser.COMMENT = 13;
letoParser.EOL = 14;
letoParser.WS = 15;

letoParser.RULE_prog = 0;
letoParser.RULE_instruction = 1;
letoParser.RULE_definition = 2;
letoParser.RULE_instantiation = 3;
letoParser.RULE_node_type = 4;
letoParser.RULE_relationship_type = 5;
letoParser.RULE_node = 6;
letoParser.RULE_relationship = 7;
letoParser.RULE_number = 8;
letoParser.RULE_comment = 9;
letoParser.RULE_id = 10;
letoParser.RULE_componant = 11;

class ProgContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_prog;
    }

	EOL = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(letoParser.EOL);
	    } else {
	        return this.getToken(letoParser.EOL, i);
	    }
	};


	instruction = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(InstructionContext);
	    } else {
	        return this.getTypedRuleContext(InstructionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterProg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitProg(this);
		}
	}


}



class InstructionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_instruction;
    }

	definition() {
	    return this.getTypedRuleContext(DefinitionContext,0);
	};

	instantiation() {
	    return this.getTypedRuleContext(InstantiationContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterInstruction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitInstruction(this);
		}
	}


}



class DefinitionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_definition;
    }

	node_type = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Node_typeContext);
	    } else {
	        return this.getTypedRuleContext(Node_typeContext,i);
	    }
	};

	relationship_type = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Relationship_typeContext);
	    } else {
	        return this.getTypedRuleContext(Relationship_typeContext,i);
	    }
	};

	comment() {
	    return this.getTypedRuleContext(CommentContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterDefinition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitDefinition(this);
		}
	}


}



class InstantiationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_instantiation;
    }

	node = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NodeContext);
	    } else {
	        return this.getTypedRuleContext(NodeContext,i);
	    }
	};

	relationship = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(RelationshipContext);
	    } else {
	        return this.getTypedRuleContext(RelationshipContext,i);
	    }
	};

	comment() {
	    return this.getTypedRuleContext(CommentContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterInstantiation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitInstantiation(this);
		}
	}


}



class Node_typeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_node_type;
    }

	id = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(IdContext);
	    } else {
	        return this.getTypedRuleContext(IdContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterNode_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitNode_type(this);
		}
	}


}



class Relationship_typeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_relationship_type;
    }

	id = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(IdContext);
	    } else {
	        return this.getTypedRuleContext(IdContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterRelationship_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitRelationship_type(this);
		}
	}


}



class NodeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_node;
    }

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	componant() {
	    return this.getTypedRuleContext(ComponantContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterNode(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitNode(this);
		}
	}


}



class RelationshipContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_relationship;
    }

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	componant() {
	    return this.getTypedRuleContext(ComponantContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterRelationship(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitRelationship(this);
		}
	}


}



class NumberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_number;
    }

	NUMBER() {
	    return this.getToken(letoParser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitNumber(this);
		}
	}


}



class CommentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_comment;
    }

	COMMENT() {
	    return this.getToken(letoParser.COMMENT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterComment(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitComment(this);
		}
	}


}



class IdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_id;
    }

	ID() {
	    return this.getToken(letoParser.ID, 0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterId(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitId(this);
		}
	}


}



class ComponantContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = letoParser.RULE_componant;
    }

	COMPONANT() {
	    return this.getToken(letoParser.COMPONANT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.enterComponant(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof letoListener ) {
	        listener.exitComponant(this);
		}
	}


}




letoParser.ProgContext = ProgContext; 
letoParser.InstructionContext = InstructionContext; 
letoParser.DefinitionContext = DefinitionContext; 
letoParser.InstantiationContext = InstantiationContext; 
letoParser.Node_typeContext = Node_typeContext; 
letoParser.Relationship_typeContext = Relationship_typeContext; 
letoParser.NodeContext = NodeContext; 
letoParser.RelationshipContext = RelationshipContext; 
letoParser.NumberContext = NumberContext; 
letoParser.CommentContext = CommentContext; 
letoParser.IdContext = IdContext; 
letoParser.ComponantContext = ComponantContext; 
