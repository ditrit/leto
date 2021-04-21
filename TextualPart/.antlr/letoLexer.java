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
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, COMPONANT=7, ID=8, STRINGLITERAL=9, 
		LETTRE=10, NUMBER=11, FLOAT=12, COMMENT=13, EOL=14, WS=15;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "COMPONANT", "ID", "STRINGLITERAL", 
			"LETTRE", "NUMBER", "FLOAT", "COMMENT", "EOL", "WS"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'componant'", "':'", "'->'", "';'", "'asset'", "'is_a'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, "COMPONANT", "ID", "STRINGLITERAL", 
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\21\u00a6\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\3\2\3\2\3\2\3\2"+
		"\3\2\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\4\3\4\3\4\3\5\3\5\3\6\3\6\3\6\3\6\3"+
		"\6\3\6\3\7\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b"+
		"\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3"+
		"\b\5\b[\n\b\3\t\3\t\7\t_\n\t\f\t\16\tb\13\t\3\n\3\n\7\nf\n\n\f\n\16\n"+
		"i\13\n\3\n\3\n\3\13\6\13n\n\13\r\13\16\13o\3\f\6\fs\n\f\r\f\16\ft\3\f"+
		"\3\f\7\fy\n\f\f\f\16\f|\13\f\3\r\7\r\177\n\r\f\r\16\r\u0082\13\r\3\r\3"+
		"\r\6\r\u0086\n\r\r\r\16\r\u0087\3\r\3\r\6\r\u008c\n\r\r\r\16\r\u008d\7"+
		"\r\u0090\n\r\f\r\16\r\u0093\13\r\3\16\3\16\3\16\3\16\7\16\u0099\n\16\f"+
		"\16\16\16\u009c\13\16\3\17\5\17\u009f\n\17\3\17\3\17\3\20\3\20\3\20\3"+
		"\20\2\2\21\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33"+
		"\17\35\20\37\21\3\2\b\4\2C\\c|\5\2\62;aac|\5\2\f\f\17\17$$\4\2GGgg\4\2"+
		"\f\f\17\17\5\2\13\f\17\17\"\"\2\u00b4\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2"+
		"\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2"+
		"\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3"+
		"\2\2\2\2\37\3\2\2\2\3!\3\2\2\2\5+\3\2\2\2\7-\3\2\2\2\t\60\3\2\2\2\13\62"+
		"\3\2\2\2\r8\3\2\2\2\17Z\3\2\2\2\21\\\3\2\2\2\23c\3\2\2\2\25m\3\2\2\2\27"+
		"r\3\2\2\2\31\u0080\3\2\2\2\33\u0094\3\2\2\2\35\u009e\3\2\2\2\37\u00a2"+
		"\3\2\2\2!\"\7e\2\2\"#\7q\2\2#$\7o\2\2$%\7r\2\2%&\7q\2\2&\'\7p\2\2\'(\7"+
		"c\2\2()\7p\2\2)*\7v\2\2*\4\3\2\2\2+,\7<\2\2,\6\3\2\2\2-.\7/\2\2./\7@\2"+
		"\2/\b\3\2\2\2\60\61\7=\2\2\61\n\3\2\2\2\62\63\7c\2\2\63\64\7u\2\2\64\65"+
		"\7u\2\2\65\66\7g\2\2\66\67\7v\2\2\67\f\3\2\2\289\7k\2\29:\7u\2\2:;\7a"+
		"\2\2;<\7c\2\2<\16\3\2\2\2=>\7u\2\2>?\7g\2\2?@\7t\2\2@A\7x\2\2AB\7g\2\2"+
		"B[\7t\2\2CD\7t\2\2DE\7q\2\2EF\7w\2\2FG\7v\2\2GH\7g\2\2H[\7t\2\2IJ\7f\2"+
		"\2JK\7c\2\2KL\7v\2\2LM\7c\2\2MN\7d\2\2NO\7c\2\2OP\7u\2\2P[\7g\2\2QR\7"+
		"c\2\2RS\7r\2\2ST\7c\2\2TU\7e\2\2UV\7j\2\2V[\7g\2\2WX\7r\2\2XY\7j\2\2Y"+
		"[\7r\2\2Z=\3\2\2\2ZC\3\2\2\2ZI\3\2\2\2ZQ\3\2\2\2ZW\3\2\2\2[\20\3\2\2\2"+
		"\\`\t\2\2\2]_\t\3\2\2^]\3\2\2\2_b\3\2\2\2`^\3\2\2\2`a\3\2\2\2a\22\3\2"+
		"\2\2b`\3\2\2\2cg\7$\2\2df\n\4\2\2ed\3\2\2\2fi\3\2\2\2ge\3\2\2\2gh\3\2"+
		"\2\2hj\3\2\2\2ig\3\2\2\2jk\7$\2\2k\24\3\2\2\2ln\t\2\2\2ml\3\2\2\2no\3"+
		"\2\2\2om\3\2\2\2op\3\2\2\2p\26\3\2\2\2qs\4\62;\2rq\3\2\2\2st\3\2\2\2t"+
		"r\3\2\2\2tu\3\2\2\2uz\3\2\2\2vw\t\5\2\2wy\5\27\f\2xv\3\2\2\2y|\3\2\2\2"+
		"zx\3\2\2\2z{\3\2\2\2{\30\3\2\2\2|z\3\2\2\2}\177\4\62;\2~}\3\2\2\2\177"+
		"\u0082\3\2\2\2\u0080~\3\2\2\2\u0080\u0081\3\2\2\2\u0081\u0083\3\2\2\2"+
		"\u0082\u0080\3\2\2\2\u0083\u0085\7\60\2\2\u0084\u0086\4\62;\2\u0085\u0084"+
		"\3\2\2\2\u0086\u0087\3\2\2\2\u0087\u0085\3\2\2\2\u0087\u0088\3\2\2\2\u0088"+
		"\u0091\3\2\2\2\u0089\u008b\t\5\2\2\u008a\u008c\4\62;\2\u008b\u008a\3\2"+
		"\2\2\u008c\u008d\3\2\2\2\u008d\u008b\3\2\2\2\u008d\u008e\3\2\2\2\u008e"+
		"\u0090\3\2\2\2\u008f\u0089\3\2\2\2\u0090\u0093\3\2\2\2\u0091\u008f\3\2"+
		"\2\2\u0091\u0092\3\2\2\2\u0092\32\3\2\2\2\u0093\u0091\3\2\2\2\u0094\u0095"+
		"\7\61\2\2\u0095\u0096\7\61\2\2\u0096\u009a\3\2\2\2\u0097\u0099\n\6\2\2"+
		"\u0098\u0097\3\2\2\2\u0099\u009c\3\2\2\2\u009a\u0098\3\2\2\2\u009a\u009b"+
		"\3\2\2\2\u009b\34\3\2\2\2\u009c\u009a\3\2\2\2\u009d\u009f\7\17\2\2\u009e"+
		"\u009d\3\2\2\2\u009e\u009f\3\2\2\2\u009f\u00a0\3\2\2\2\u00a0\u00a1\7\f"+
		"\2\2\u00a1\36\3\2\2\2\u00a2\u00a3\t\7\2\2\u00a3\u00a4\3\2\2\2\u00a4\u00a5"+
		"\b\20\2\2\u00a5 \3\2\2\2\17\2Z`gotz\u0080\u0087\u008d\u0091\u009a\u009e"+
		"\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}