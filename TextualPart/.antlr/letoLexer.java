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
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, PATH=14, ID=15, STRINGLITERAL=16, 
		LETTRE=17, NUMBER=18, FLOAT=19, COMMENT=20, WS=21;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
			"T__9", "T__10", "T__11", "T__12", "PATH", "ID", "STRINGLITERAL", "LETTRE", 
			"NUMBER", "FLOAT", "COMMENT", "WS"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "';'", "'componant'", "'from'", "'{'", "'}'", "'logo'", "':'", 
			"'host'", "','", "'relationship'", "'asset'", "'link'", "'-'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, "PATH", "ID", "STRINGLITERAL", "LETTRE", "NUMBER", "FLOAT", 
			"COMMENT", "WS"
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\27\u00be\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\3\2\3\2\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3"+
		"\7\3\7\3\7\3\b\3\b\3\t\3\t\3\t\3\t\3\t\3\n\3\n\3\13\3\13\3\13\3\13\3\13"+
		"\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\f\3\f\3\f\3\f\3\f\3\f\3\r\3"+
		"\r\3\r\3\r\3\r\3\16\3\16\3\17\6\17l\n\17\r\17\16\17m\3\17\6\17q\n\17\r"+
		"\17\16\17r\3\17\6\17v\n\17\r\17\16\17w\3\20\3\20\7\20|\n\20\f\20\16\20"+
		"\177\13\20\3\21\3\21\7\21\u0083\n\21\f\21\16\21\u0086\13\21\3\21\3\21"+
		"\3\22\6\22\u008b\n\22\r\22\16\22\u008c\3\23\6\23\u0090\n\23\r\23\16\23"+
		"\u0091\3\23\3\23\7\23\u0096\n\23\f\23\16\23\u0099\13\23\3\24\7\24\u009c"+
		"\n\24\f\24\16\24\u009f\13\24\3\24\3\24\6\24\u00a3\n\24\r\24\16\24\u00a4"+
		"\3\24\3\24\6\24\u00a9\n\24\r\24\16\24\u00aa\7\24\u00ad\n\24\f\24\16\24"+
		"\u00b0\13\24\3\25\3\25\3\25\3\25\7\25\u00b6\n\25\f\25\16\25\u00b9\13\25"+
		"\3\26\3\26\3\26\3\26\2\2\27\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25"+
		"\f\27\r\31\16\33\17\35\20\37\21!\22#\23%\24\'\25)\26+\27\3\2\t\7\2/\60"+
		"\62;C\\aac|\4\2C\\c|\5\2\62;aac|\5\2\f\f\17\17$$\4\2GGgg\4\2\f\f\17\17"+
		"\5\2\13\f\17\17\"\"\2\u00ca\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3"+
		"\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2"+
		"\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37"+
		"\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3"+
		"\2\2\2\3-\3\2\2\2\5/\3\2\2\2\79\3\2\2\2\t>\3\2\2\2\13@\3\2\2\2\rB\3\2"+
		"\2\2\17G\3\2\2\2\21I\3\2\2\2\23N\3\2\2\2\25P\3\2\2\2\27]\3\2\2\2\31c\3"+
		"\2\2\2\33h\3\2\2\2\35p\3\2\2\2\37y\3\2\2\2!\u0080\3\2\2\2#\u008a\3\2\2"+
		"\2%\u008f\3\2\2\2\'\u009d\3\2\2\2)\u00b1\3\2\2\2+\u00ba\3\2\2\2-.\7=\2"+
		"\2.\4\3\2\2\2/\60\7e\2\2\60\61\7q\2\2\61\62\7o\2\2\62\63\7r\2\2\63\64"+
		"\7q\2\2\64\65\7p\2\2\65\66\7c\2\2\66\67\7p\2\2\678\7v\2\28\6\3\2\2\29"+
		":\7h\2\2:;\7t\2\2;<\7q\2\2<=\7o\2\2=\b\3\2\2\2>?\7}\2\2?\n\3\2\2\2@A\7"+
		"\177\2\2A\f\3\2\2\2BC\7n\2\2CD\7q\2\2DE\7i\2\2EF\7q\2\2F\16\3\2\2\2GH"+
		"\7<\2\2H\20\3\2\2\2IJ\7j\2\2JK\7q\2\2KL\7u\2\2LM\7v\2\2M\22\3\2\2\2NO"+
		"\7.\2\2O\24\3\2\2\2PQ\7t\2\2QR\7g\2\2RS\7n\2\2ST\7c\2\2TU\7v\2\2UV\7k"+
		"\2\2VW\7q\2\2WX\7p\2\2XY\7u\2\2YZ\7j\2\2Z[\7k\2\2[\\\7r\2\2\\\26\3\2\2"+
		"\2]^\7c\2\2^_\7u\2\2_`\7u\2\2`a\7g\2\2ab\7v\2\2b\30\3\2\2\2cd\7n\2\2d"+
		"e\7k\2\2ef\7p\2\2fg\7m\2\2g\32\3\2\2\2hi\7/\2\2i\34\3\2\2\2jl\t\2\2\2"+
		"kj\3\2\2\2lm\3\2\2\2mk\3\2\2\2mn\3\2\2\2no\3\2\2\2oq\7\61\2\2pk\3\2\2"+
		"\2qr\3\2\2\2rp\3\2\2\2rs\3\2\2\2su\3\2\2\2tv\t\2\2\2ut\3\2\2\2vw\3\2\2"+
		"\2wu\3\2\2\2wx\3\2\2\2x\36\3\2\2\2y}\t\3\2\2z|\t\4\2\2{z\3\2\2\2|\177"+
		"\3\2\2\2}{\3\2\2\2}~\3\2\2\2~ \3\2\2\2\177}\3\2\2\2\u0080\u0084\7$\2\2"+
		"\u0081\u0083\n\5\2\2\u0082\u0081\3\2\2\2\u0083\u0086\3\2\2\2\u0084\u0082"+
		"\3\2\2\2\u0084\u0085\3\2\2\2\u0085\u0087\3\2\2\2\u0086\u0084\3\2\2\2\u0087"+
		"\u0088\7$\2\2\u0088\"\3\2\2\2\u0089\u008b\t\3\2\2\u008a\u0089\3\2\2\2"+
		"\u008b\u008c\3\2\2\2\u008c\u008a\3\2\2\2\u008c\u008d\3\2\2\2\u008d$\3"+
		"\2\2\2\u008e\u0090\4\62;\2\u008f\u008e\3\2\2\2\u0090\u0091\3\2\2\2\u0091"+
		"\u008f\3\2\2\2\u0091\u0092\3\2\2\2\u0092\u0097\3\2\2\2\u0093\u0094\t\6"+
		"\2\2\u0094\u0096\5%\23\2\u0095\u0093\3\2\2\2\u0096\u0099\3\2\2\2\u0097"+
		"\u0095\3\2\2\2\u0097\u0098\3\2\2\2\u0098&\3\2\2\2\u0099\u0097\3\2\2\2"+
		"\u009a\u009c\4\62;\2\u009b\u009a\3\2\2\2\u009c\u009f\3\2\2\2\u009d\u009b"+
		"\3\2\2\2\u009d\u009e\3\2\2\2\u009e\u00a0\3\2\2\2\u009f\u009d\3\2\2\2\u00a0"+
		"\u00a2\7\60\2\2\u00a1\u00a3\4\62;\2\u00a2\u00a1\3\2\2\2\u00a3\u00a4\3"+
		"\2\2\2\u00a4\u00a2\3\2\2\2\u00a4\u00a5\3\2\2\2\u00a5\u00ae\3\2\2\2\u00a6"+
		"\u00a8\t\6\2\2\u00a7\u00a9\4\62;\2\u00a8\u00a7\3\2\2\2\u00a9\u00aa\3\2"+
		"\2\2\u00aa\u00a8\3\2\2\2\u00aa\u00ab\3\2\2\2\u00ab\u00ad\3\2\2\2\u00ac"+
		"\u00a6\3\2\2\2\u00ad\u00b0\3\2\2\2\u00ae\u00ac\3\2\2\2\u00ae\u00af\3\2"+
		"\2\2\u00af(\3\2\2\2\u00b0\u00ae\3\2\2\2\u00b1\u00b2\7\61\2\2\u00b2\u00b3"+
		"\7\61\2\2\u00b3\u00b7\3\2\2\2\u00b4\u00b6\n\7\2\2\u00b5\u00b4\3\2\2\2"+
		"\u00b6\u00b9\3\2\2\2\u00b7\u00b5\3\2\2\2\u00b7\u00b8\3\2\2\2\u00b8*\3"+
		"\2\2\2\u00b9\u00b7\3\2\2\2\u00ba\u00bb\t\b\2\2\u00bb\u00bc\3\2\2\2\u00bc"+
		"\u00bd\b\26\2\2\u00bd,\3\2\2\2\20\2mrw}\u0084\u008c\u0091\u0097\u009d"+
		"\u00a4\u00aa\u00ae\u00b7\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}