// Generated from /home/cochard/Dev/leto/TextualPart/leto.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class letoLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, ID=9, 
		STRINGLITERAL=10, LETTRE=11, NUMBER=12, FLOAT=13, COMMENT=14, EOL=15, 
		WS=16;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "ID", 
			"STRINGLITERAL", "LETTRE", "NUMBER", "FLOAT", "COMMENT", "EOL", "WS"
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


	public letoLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "leto.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\22\u009a\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\3\2\3"+
		"\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\5\3\5"+
		"\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\6\3\6\3\6\3\6\3\6\3\6\3"+
		"\7\3\7\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3\n\3\n\7\nS\n\n\f\n\16\nV\13\n\3\13"+
		"\3\13\7\13Z\n\13\f\13\16\13]\13\13\3\13\3\13\3\f\6\fb\n\f\r\f\16\fc\3"+
		"\r\6\rg\n\r\r\r\16\rh\3\r\3\r\7\rm\n\r\f\r\16\rp\13\r\3\16\7\16s\n\16"+
		"\f\16\16\16v\13\16\3\16\3\16\6\16z\n\16\r\16\16\16{\3\16\3\16\6\16\u0080"+
		"\n\16\r\16\16\16\u0081\7\16\u0084\n\16\f\16\16\16\u0087\13\16\3\17\3\17"+
		"\3\17\3\17\7\17\u008d\n\17\f\17\16\17\u0090\13\17\3\20\5\20\u0093\n\20"+
		"\3\20\3\20\3\21\3\21\3\21\3\21\2\2\22\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21"+
		"\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21!\22\3\2\b\4\2C\\c|\5\2\62;"+
		"aac|\5\2\f\f\17\17$$\4\2GGgg\4\2\f\f\17\17\5\2\13\f\17\17\"\"\2\u00a4"+
		"\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2"+
		"\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2"+
		"\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\3#\3\2"+
		"\2\2\5-\3\2\2\2\7\62\3\2\2\2\t\64\3\2\2\2\13A\3\2\2\2\rG\3\2\2\2\17I\3"+
		"\2\2\2\21N\3\2\2\2\23P\3\2\2\2\25W\3\2\2\2\27a\3\2\2\2\31f\3\2\2\2\33"+
		"t\3\2\2\2\35\u0088\3\2\2\2\37\u0092\3\2\2\2!\u0096\3\2\2\2#$\7e\2\2$%"+
		"\7q\2\2%&\7o\2\2&\'\7r\2\2\'(\7q\2\2()\7p\2\2)*\7c\2\2*+\7p\2\2+,\7v\2"+
		"\2,\4\3\2\2\2-.\7h\2\2./\7t\2\2/\60\7q\2\2\60\61\7o\2\2\61\6\3\2\2\2\62"+
		"\63\7=\2\2\63\b\3\2\2\2\64\65\7t\2\2\65\66\7g\2\2\66\67\7n\2\2\678\7c"+
		"\2\289\7v\2\29:\7k\2\2:;\7q\2\2;<\7p\2\2<=\7u\2\2=>\7j\2\2>?\7k\2\2?@"+
		"\7r\2\2@\n\3\2\2\2AB\7c\2\2BC\7u\2\2CD\7u\2\2DE\7g\2\2EF\7v\2\2F\f\3\2"+
		"\2\2GH\7<\2\2H\16\3\2\2\2IJ\7n\2\2JK\7k\2\2KL\7p\2\2LM\7m\2\2M\20\3\2"+
		"\2\2NO\7/\2\2O\22\3\2\2\2PT\t\2\2\2QS\t\3\2\2RQ\3\2\2\2SV\3\2\2\2TR\3"+
		"\2\2\2TU\3\2\2\2U\24\3\2\2\2VT\3\2\2\2W[\7$\2\2XZ\n\4\2\2YX\3\2\2\2Z]"+
		"\3\2\2\2[Y\3\2\2\2[\\\3\2\2\2\\^\3\2\2\2][\3\2\2\2^_\7$\2\2_\26\3\2\2"+
		"\2`b\t\2\2\2a`\3\2\2\2bc\3\2\2\2ca\3\2\2\2cd\3\2\2\2d\30\3\2\2\2eg\4\62"+
		";\2fe\3\2\2\2gh\3\2\2\2hf\3\2\2\2hi\3\2\2\2in\3\2\2\2jk\t\5\2\2km\5\31"+
		"\r\2lj\3\2\2\2mp\3\2\2\2nl\3\2\2\2no\3\2\2\2o\32\3\2\2\2pn\3\2\2\2qs\4"+
		"\62;\2rq\3\2\2\2sv\3\2\2\2tr\3\2\2\2tu\3\2\2\2uw\3\2\2\2vt\3\2\2\2wy\7"+
		"\60\2\2xz\4\62;\2yx\3\2\2\2z{\3\2\2\2{y\3\2\2\2{|\3\2\2\2|\u0085\3\2\2"+
		"\2}\177\t\5\2\2~\u0080\4\62;\2\177~\3\2\2\2\u0080\u0081\3\2\2\2\u0081"+
		"\177\3\2\2\2\u0081\u0082\3\2\2\2\u0082\u0084\3\2\2\2\u0083}\3\2\2\2\u0084"+
		"\u0087\3\2\2\2\u0085\u0083\3\2\2\2\u0085\u0086\3\2\2\2\u0086\34\3\2\2"+
		"\2\u0087\u0085\3\2\2\2\u0088\u0089\7\61\2\2\u0089\u008a\7\61\2\2\u008a"+
		"\u008e\3\2\2\2\u008b\u008d\n\6\2\2\u008c\u008b\3\2\2\2\u008d\u0090\3\2"+
		"\2\2\u008e\u008c\3\2\2\2\u008e\u008f\3\2\2\2\u008f\36\3\2\2\2\u0090\u008e"+
		"\3\2\2\2\u0091\u0093\7\17\2\2\u0092\u0091\3\2\2\2\u0092\u0093\3\2\2\2"+
		"\u0093\u0094\3\2\2\2\u0094\u0095\7\f\2\2\u0095 \3\2\2\2\u0096\u0097\t"+
		"\7\2\2\u0097\u0098\3\2\2\2\u0098\u0099\b\21\2\2\u0099\"\3\2\2\2\16\2T"+
		"[chnt{\u0081\u0085\u008e\u0092\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}