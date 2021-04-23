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
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, LOGO=9, 
		CONTAINERS=10, ID=11, STRINGLITERAL=12, LETTRE=13, NUMBER=14, FLOAT=15, 
		COMMENT=16, EOL=17, WS=18;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "LOGO", 
			"CONTAINERS", "ID", "STRINGLITERAL", "LETTRE", "NUMBER", "FLOAT", "COMMENT", 
			"EOL", "WS"
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
			null, null, null, null, null, null, null, null, null, "LOGO", "CONTAINERS", 
			"ID", "STRINGLITERAL", "LETTRE", "NUMBER", "FLOAT", "COMMENT", "EOL", 
			"WS"
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\24\u00c0\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\3"+
		"\3\3\3\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\6"+
		"\3\6\3\6\3\6\3\6\3\6\3\7\3\7\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3\n\6\nV\n\n"+
		"\r\n\16\nW\3\n\6\n[\n\n\r\n\16\n\\\3\n\6\n`\n\n\r\n\16\na\3\n\6\ne\n\n"+
		"\r\n\16\nf\5\ni\n\n\3\13\3\13\7\13m\n\13\f\13\16\13p\13\13\3\13\6\13s"+
		"\n\13\r\13\16\13t\3\f\3\f\7\fy\n\f\f\f\16\f|\13\f\3\r\3\r\7\r\u0080\n"+
		"\r\f\r\16\r\u0083\13\r\3\r\3\r\3\16\6\16\u0088\n\16\r\16\16\16\u0089\3"+
		"\17\6\17\u008d\n\17\r\17\16\17\u008e\3\17\3\17\7\17\u0093\n\17\f\17\16"+
		"\17\u0096\13\17\3\20\7\20\u0099\n\20\f\20\16\20\u009c\13\20\3\20\3\20"+
		"\6\20\u00a0\n\20\r\20\16\20\u00a1\3\20\3\20\6\20\u00a6\n\20\r\20\16\20"+
		"\u00a7\7\20\u00aa\n\20\f\20\16\20\u00ad\13\20\3\21\3\21\3\21\3\21\7\21"+
		"\u00b3\n\21\f\21\16\21\u00b6\13\21\3\22\5\22\u00b9\n\22\3\22\3\22\3\23"+
		"\3\23\3\23\3\23\2\2\24\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27"+
		"\r\31\16\33\17\35\20\37\21!\22#\23%\24\3\2\n\5\2\62;C\\c|\4\2C\\c|\4\2"+
		"\62;c|\5\2\62;aac|\5\2\f\f\17\17$$\4\2GGgg\4\2\f\f\17\17\5\2\13\f\17\17"+
		"\"\"\2\u00d1\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2"+
		"\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2"+
		"\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2"+
		"\2\2\2#\3\2\2\2\2%\3\2\2\2\3\'\3\2\2\2\5\61\3\2\2\2\7\66\3\2\2\2\t8\3"+
		"\2\2\2\13E\3\2\2\2\rK\3\2\2\2\17M\3\2\2\2\21R\3\2\2\2\23h\3\2\2\2\25r"+
		"\3\2\2\2\27v\3\2\2\2\31}\3\2\2\2\33\u0087\3\2\2\2\35\u008c\3\2\2\2\37"+
		"\u009a\3\2\2\2!\u00ae\3\2\2\2#\u00b8\3\2\2\2%\u00bc\3\2\2\2\'(\7e\2\2"+
		"()\7q\2\2)*\7o\2\2*+\7r\2\2+,\7q\2\2,-\7p\2\2-.\7c\2\2./\7p\2\2/\60\7"+
		"v\2\2\60\4\3\2\2\2\61\62\7h\2\2\62\63\7t\2\2\63\64\7q\2\2\64\65\7o\2\2"+
		"\65\6\3\2\2\2\66\67\7=\2\2\67\b\3\2\2\289\7t\2\29:\7g\2\2:;\7n\2\2;<\7"+
		"c\2\2<=\7v\2\2=>\7k\2\2>?\7q\2\2?@\7p\2\2@A\7u\2\2AB\7j\2\2BC\7k\2\2C"+
		"D\7r\2\2D\n\3\2\2\2EF\7c\2\2FG\7u\2\2GH\7u\2\2HI\7g\2\2IJ\7v\2\2J\f\3"+
		"\2\2\2KL\7<\2\2L\16\3\2\2\2MN\7n\2\2NO\7k\2\2OP\7p\2\2PQ\7m\2\2Q\20\3"+
		"\2\2\2RS\7/\2\2S\22\3\2\2\2TV\t\2\2\2UT\3\2\2\2VW\3\2\2\2WU\3\2\2\2WX"+
		"\3\2\2\2XY\3\2\2\2Y[\7\61\2\2ZU\3\2\2\2[\\\3\2\2\2\\Z\3\2\2\2\\]\3\2\2"+
		"\2]i\3\2\2\2^`\t\2\2\2_^\3\2\2\2`a\3\2\2\2a_\3\2\2\2ab\3\2\2\2bc\3\2\2"+
		"\2ce\7^\2\2d_\3\2\2\2ef\3\2\2\2fd\3\2\2\2fg\3\2\2\2gi\3\2\2\2hZ\3\2\2"+
		"\2hd\3\2\2\2i\24\3\2\2\2jn\t\3\2\2km\t\4\2\2lk\3\2\2\2mp\3\2\2\2nl\3\2"+
		"\2\2no\3\2\2\2oq\3\2\2\2pn\3\2\2\2qs\7\60\2\2rj\3\2\2\2st\3\2\2\2tr\3"+
		"\2\2\2tu\3\2\2\2u\26\3\2\2\2vz\t\3\2\2wy\t\5\2\2xw\3\2\2\2y|\3\2\2\2z"+
		"x\3\2\2\2z{\3\2\2\2{\30\3\2\2\2|z\3\2\2\2}\u0081\7$\2\2~\u0080\n\6\2\2"+
		"\177~\3\2\2\2\u0080\u0083\3\2\2\2\u0081\177\3\2\2\2\u0081\u0082\3\2\2"+
		"\2\u0082\u0084\3\2\2\2\u0083\u0081\3\2\2\2\u0084\u0085\7$\2\2\u0085\32"+
		"\3\2\2\2\u0086\u0088\t\3\2\2\u0087\u0086\3\2\2\2\u0088\u0089\3\2\2\2\u0089"+
		"\u0087\3\2\2\2\u0089\u008a\3\2\2\2\u008a\34\3\2\2\2\u008b\u008d\4\62;"+
		"\2\u008c\u008b\3\2\2\2\u008d\u008e\3\2\2\2\u008e\u008c\3\2\2\2\u008e\u008f"+
		"\3\2\2\2\u008f\u0094\3\2\2\2\u0090\u0091\t\7\2\2\u0091\u0093\5\35\17\2"+
		"\u0092\u0090\3\2\2\2\u0093\u0096\3\2\2\2\u0094\u0092\3\2\2\2\u0094\u0095"+
		"\3\2\2\2\u0095\36\3\2\2\2\u0096\u0094\3\2\2\2\u0097\u0099\4\62;\2\u0098"+
		"\u0097\3\2\2\2\u0099\u009c\3\2\2\2\u009a\u0098\3\2\2\2\u009a\u009b\3\2"+
		"\2\2\u009b\u009d\3\2\2\2\u009c\u009a\3\2\2\2\u009d\u009f\7\60\2\2\u009e"+
		"\u00a0\4\62;\2\u009f\u009e\3\2\2\2\u00a0\u00a1\3\2\2\2\u00a1\u009f\3\2"+
		"\2\2\u00a1\u00a2\3\2\2\2\u00a2\u00ab\3\2\2\2\u00a3\u00a5\t\7\2\2\u00a4"+
		"\u00a6\4\62;\2\u00a5\u00a4\3\2\2\2\u00a6\u00a7\3\2\2\2\u00a7\u00a5\3\2"+
		"\2\2\u00a7\u00a8\3\2\2\2\u00a8\u00aa\3\2\2\2\u00a9\u00a3\3\2\2\2\u00aa"+
		"\u00ad\3\2\2\2\u00ab\u00a9\3\2\2\2\u00ab\u00ac\3\2\2\2\u00ac \3\2\2\2"+
		"\u00ad\u00ab\3\2\2\2\u00ae\u00af\7\61\2\2\u00af\u00b0\7\61\2\2\u00b0\u00b4"+
		"\3\2\2\2\u00b1\u00b3\n\b\2\2\u00b2\u00b1\3\2\2\2\u00b3\u00b6\3\2\2\2\u00b4"+
		"\u00b2\3\2\2\2\u00b4\u00b5\3\2\2\2\u00b5\"\3\2\2\2\u00b6\u00b4\3\2\2\2"+
		"\u00b7\u00b9\7\17\2\2\u00b8\u00b7\3\2\2\2\u00b8\u00b9\3\2\2\2\u00b9\u00ba"+
		"\3\2\2\2\u00ba\u00bb\7\f\2\2\u00bb$\3\2\2\2\u00bc\u00bd\t\t\2\2\u00bd"+
		"\u00be\3\2\2\2\u00be\u00bf\b\23\2\2\u00bf&\3\2\2\2\27\2UW\\_afhntz\u0081"+
		"\u0089\u008e\u0094\u009a\u00a1\u00a7\u00ab\u00b4\u00b8\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}