// Generated from /home/cochard/Dev/leto/TextualPart/leto.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class letoParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, ID=9, 
		STRINGLITERAL=10, LETTRE=11, NUMBER=12, FLOAT=13, COMMENT=14, EOL=15, 
		WS=16;
	public static final int
		RULE_prog = 0, RULE_instruction = 1, RULE_definition = 2, RULE_instantiation = 3, 
		RULE_componant = 4, RULE_relationship = 5, RULE_asset = 6, RULE_link = 7, 
		RULE_number = 8, RULE_comment = 9, RULE_id = 10;
	private static String[] makeRuleNames() {
		return new String[] {
			"prog", "instruction", "definition", "instantiation", "componant", "relationship", 
			"asset", "link", "number", "comment", "id"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'componant'", "'from'", "';'", "'relationship'", "'asset'", "':'", 
			"'link'", "'-'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, "ID", "STRINGLITERAL", 
			"LETTRE", "NUMBER", "FLOAT", "COMMENT", "EOL", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "leto.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public letoParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ProgContext extends ParserRuleContext {
		public List<TerminalNode> EOL() { return getTokens(letoParser.EOL); }
		public TerminalNode EOL(int i) {
			return getToken(letoParser.EOL, i);
		}
		public List<InstructionContext> instruction() {
			return getRuleContexts(InstructionContext.class);
		}
		public InstructionContext instruction(int i) {
			return getRuleContext(InstructionContext.class,i);
		}
		public ProgContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_prog; }
	}

	public final ProgContext prog() throws RecognitionException {
		ProgContext _localctx = new ProgContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_prog);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(26); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(23);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__3) | (1L << T__4) | (1L << T__6) | (1L << COMMENT))) != 0)) {
					{
					setState(22);
					instruction();
					}
				}

				setState(25);
				match(EOL);
				}
				}
				setState(28); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__3) | (1L << T__4) | (1L << T__6) | (1L << COMMENT) | (1L << EOL))) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InstructionContext extends ParserRuleContext {
		public DefinitionContext definition() {
			return getRuleContext(DefinitionContext.class,0);
		}
		public InstantiationContext instantiation() {
			return getRuleContext(InstantiationContext.class,0);
		}
		public InstructionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_instruction; }
	}

	public final InstructionContext instruction() throws RecognitionException {
		InstructionContext _localctx = new InstructionContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_instruction);
		try {
			setState(32);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(30);
				definition();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(31);
				instantiation();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DefinitionContext extends ParserRuleContext {
		public List<ComponantContext> componant() {
			return getRuleContexts(ComponantContext.class);
		}
		public ComponantContext componant(int i) {
			return getRuleContext(ComponantContext.class,i);
		}
		public List<RelationshipContext> relationship() {
			return getRuleContexts(RelationshipContext.class);
		}
		public RelationshipContext relationship(int i) {
			return getRuleContext(RelationshipContext.class,i);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public DefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_definition; }
	}

	public final DefinitionContext definition() throws RecognitionException {
		DefinitionContext _localctx = new DefinitionContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_definition);
		int _la;
		try {
			setState(44);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
			case T__3:
				enterOuterAlt(_localctx, 1);
				{
				setState(36); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					setState(36);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case T__0:
						{
						setState(34);
						componant();
						}
						break;
					case T__3:
						{
						setState(35);
						relationship();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					setState(38); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==T__0 || _la==T__3 );
				setState(41);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==COMMENT) {
					{
					setState(40);
					comment();
					}
				}

				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(43);
				comment();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InstantiationContext extends ParserRuleContext {
		public List<AssetContext> asset() {
			return getRuleContexts(AssetContext.class);
		}
		public AssetContext asset(int i) {
			return getRuleContext(AssetContext.class,i);
		}
		public List<LinkContext> link() {
			return getRuleContexts(LinkContext.class);
		}
		public LinkContext link(int i) {
			return getRuleContext(LinkContext.class,i);
		}
		public CommentContext comment() {
			return getRuleContext(CommentContext.class,0);
		}
		public InstantiationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_instantiation; }
	}

	public final InstantiationContext instantiation() throws RecognitionException {
		InstantiationContext _localctx = new InstantiationContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_instantiation);
		int _la;
		try {
			setState(56);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__4:
			case T__6:
				enterOuterAlt(_localctx, 1);
				{
				setState(48); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					setState(48);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case T__4:
						{
						setState(46);
						asset();
						}
						break;
					case T__6:
						{
						setState(47);
						link();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					setState(50); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==T__4 || _la==T__6 );
				setState(53);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==COMMENT) {
					{
					setState(52);
					comment();
					}
				}

				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(55);
				comment();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ComponantContext extends ParserRuleContext {
		public List<IdContext> id() {
			return getRuleContexts(IdContext.class);
		}
		public IdContext id(int i) {
			return getRuleContext(IdContext.class,i);
		}
		public ComponantContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_componant; }
	}

	public final ComponantContext componant() throws RecognitionException {
		ComponantContext _localctx = new ComponantContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_componant);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(58);
			match(T__0);
			setState(59);
			id();
			setState(62);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__1) {
				{
				setState(60);
				match(T__1);
				setState(61);
				id();
				}
			}

			setState(64);
			match(T__2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RelationshipContext extends ParserRuleContext {
		public List<IdContext> id() {
			return getRuleContexts(IdContext.class);
		}
		public IdContext id(int i) {
			return getRuleContext(IdContext.class,i);
		}
		public RelationshipContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_relationship; }
	}

	public final RelationshipContext relationship() throws RecognitionException {
		RelationshipContext _localctx = new RelationshipContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_relationship);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(66);
			match(T__3);
			setState(67);
			id();
			setState(70);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__1) {
				{
				setState(68);
				match(T__1);
				setState(69);
				id();
				}
			}

			setState(72);
			match(T__2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssetContext extends ParserRuleContext {
		public List<IdContext> id() {
			return getRuleContexts(IdContext.class);
		}
		public IdContext id(int i) {
			return getRuleContext(IdContext.class,i);
		}
		public AssetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_asset; }
	}

	public final AssetContext asset() throws RecognitionException {
		AssetContext _localctx = new AssetContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_asset);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(74);
			match(T__4);
			setState(75);
			id();
			setState(76);
			match(T__5);
			setState(77);
			id();
			setState(78);
			match(T__2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LinkContext extends ParserRuleContext {
		public List<IdContext> id() {
			return getRuleContexts(IdContext.class);
		}
		public IdContext id(int i) {
			return getRuleContext(IdContext.class,i);
		}
		public LinkContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_link; }
	}

	public final LinkContext link() throws RecognitionException {
		LinkContext _localctx = new LinkContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_link);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(80);
			match(T__6);
			setState(81);
			id();
			setState(82);
			match(T__7);
			setState(83);
			id();
			setState(84);
			match(T__2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NumberContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(letoParser.NUMBER, 0); }
		public NumberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_number; }
	}

	public final NumberContext number() throws RecognitionException {
		NumberContext _localctx = new NumberContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_number);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(86);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CommentContext extends ParserRuleContext {
		public TerminalNode COMMENT() { return getToken(letoParser.COMMENT, 0); }
		public CommentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment; }
	}

	public final CommentContext comment() throws RecognitionException {
		CommentContext _localctx = new CommentContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_comment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(88);
			match(COMMENT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(letoParser.ID, 0); }
		public IdContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_id; }
	}

	public final IdContext id() throws RecognitionException {
		IdContext _localctx = new IdContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_id);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(90);
			match(ID);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\22_\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t\13\4"+
		"\f\t\f\3\2\5\2\32\n\2\3\2\6\2\35\n\2\r\2\16\2\36\3\3\3\3\5\3#\n\3\3\4"+
		"\3\4\6\4\'\n\4\r\4\16\4(\3\4\5\4,\n\4\3\4\5\4/\n\4\3\5\3\5\6\5\63\n\5"+
		"\r\5\16\5\64\3\5\5\58\n\5\3\5\5\5;\n\5\3\6\3\6\3\6\3\6\5\6A\n\6\3\6\3"+
		"\6\3\7\3\7\3\7\3\7\5\7I\n\7\3\7\3\7\3\b\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3"+
		"\t\3\t\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\f\2\2\r\2\4\6\b\n\f\16\20\22"+
		"\24\26\2\2\2`\2\34\3\2\2\2\4\"\3\2\2\2\6.\3\2\2\2\b:\3\2\2\2\n<\3\2\2"+
		"\2\fD\3\2\2\2\16L\3\2\2\2\20R\3\2\2\2\22X\3\2\2\2\24Z\3\2\2\2\26\\\3\2"+
		"\2\2\30\32\5\4\3\2\31\30\3\2\2\2\31\32\3\2\2\2\32\33\3\2\2\2\33\35\7\21"+
		"\2\2\34\31\3\2\2\2\35\36\3\2\2\2\36\34\3\2\2\2\36\37\3\2\2\2\37\3\3\2"+
		"\2\2 #\5\6\4\2!#\5\b\5\2\" \3\2\2\2\"!\3\2\2\2#\5\3\2\2\2$\'\5\n\6\2%"+
		"\'\5\f\7\2&$\3\2\2\2&%\3\2\2\2\'(\3\2\2\2(&\3\2\2\2()\3\2\2\2)+\3\2\2"+
		"\2*,\5\24\13\2+*\3\2\2\2+,\3\2\2\2,/\3\2\2\2-/\5\24\13\2.&\3\2\2\2.-\3"+
		"\2\2\2/\7\3\2\2\2\60\63\5\16\b\2\61\63\5\20\t\2\62\60\3\2\2\2\62\61\3"+
		"\2\2\2\63\64\3\2\2\2\64\62\3\2\2\2\64\65\3\2\2\2\65\67\3\2\2\2\668\5\24"+
		"\13\2\67\66\3\2\2\2\678\3\2\2\28;\3\2\2\29;\5\24\13\2:\62\3\2\2\2:9\3"+
		"\2\2\2;\t\3\2\2\2<=\7\3\2\2=@\5\26\f\2>?\7\4\2\2?A\5\26\f\2@>\3\2\2\2"+
		"@A\3\2\2\2AB\3\2\2\2BC\7\5\2\2C\13\3\2\2\2DE\7\6\2\2EH\5\26\f\2FG\7\4"+
		"\2\2GI\5\26\f\2HF\3\2\2\2HI\3\2\2\2IJ\3\2\2\2JK\7\5\2\2K\r\3\2\2\2LM\7"+
		"\7\2\2MN\5\26\f\2NO\7\b\2\2OP\5\26\f\2PQ\7\5\2\2Q\17\3\2\2\2RS\7\t\2\2"+
		"ST\5\26\f\2TU\7\n\2\2UV\5\26\f\2VW\7\5\2\2W\21\3\2\2\2XY\7\16\2\2Y\23"+
		"\3\2\2\2Z[\7\20\2\2[\25\3\2\2\2\\]\7\13\2\2]\27\3\2\2\2\17\31\36\"&(+"+
		".\62\64\67:@H";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}