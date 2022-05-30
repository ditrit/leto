// Generated from c:\Users\nolwe\Documents\Stage\test_antlr\hcl\schemas\hclLexer.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class hclLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		MODULE=1, DATA=2, SOURCE=3, PROVIDER=4, TERRAFORM=5, RESOURCE=6, VARIABLE=7, 
		OUTPUT=8, LIST=9, MAP=10, OBJECT=11, CONDITION=12, ERROR=13, AO=14, AF=15, 
		EQUAL=16, PO=17, PF=18, CO=19, CF=20, VIRG=21, POINT=22, TIRET=23, MULT=24, 
		BOOLEANOP=25, BOOLEAN=26, TYPE=27, IDENTIFIER=28, STRING=29, NUMBER=30, 
		COMMENT=31, LINE_COMMENT=32, HAS_COMMENT=33, WS=34, OPEN=35, IDENTIFIERS=36, 
		WSS=37, NUMBERS=38, AUTRE=39, CLOSE=40;
	public static final int
		SCRIPT=1;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE", "SCRIPT"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"MODULE", "DATA", "SOURCE", "PROVIDER", "TERRAFORM", "RESOURCE", "VARIABLE", 
			"OUTPUT", "LIST", "MAP", "OBJECT", "CONDITION", "ERROR", "AO", "AF", 
			"EQUAL", "PO", "PF", "CO", "CF", "VIRG", "POINT", "TIRET", "MULT", "BOOLEANOP", 
			"BOOLEAN", "TYPE", "IDENTIFIER", "LetterOrDigit", "Letter", "STRING", 
			"ESC", "UNICODE", "HEX", "SAFECODEPOINT", "NUMBER", "COMMENT", "LINE_COMMENT", 
			"HAS_COMMENT", "WS", "OPEN", "IDENTIFIERS", "WSS", "HEXS", "SAFECODEPOINTS", 
			"NUMBERS", "AUTRE", "CLOSE"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'module'", "'data'", "'source'", "'provider'", "'terraform'", 
			"'resource'", "'variable'", "'output'", "'list'", "'map'", "'object'", 
			"'condition'", "'error_message'", "'{'", "'}'", "'='", "'('", "')'", 
			"'['", "']'", "','", "'.'", "'-'", "'*'", null, null, null, null, null, 
			null, null, null, null, null, "'<<EOF'", null, null, null, null, "'EOF'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "MODULE", "DATA", "SOURCE", "PROVIDER", "TERRAFORM", "RESOURCE", 
			"VARIABLE", "OUTPUT", "LIST", "MAP", "OBJECT", "CONDITION", "ERROR", 
			"AO", "AF", "EQUAL", "PO", "PF", "CO", "CF", "VIRG", "POINT", "TIRET", 
			"MULT", "BOOLEANOP", "BOOLEAN", "TYPE", "IDENTIFIER", "STRING", "NUMBER", 
			"COMMENT", "LINE_COMMENT", "HAS_COMMENT", "WS", "OPEN", "IDENTIFIERS", 
			"WSS", "NUMBERS", "AUTRE", "CLOSE"
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


	public hclLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "hclLexer.g4"; }

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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2*\u01a4\b\1\b\1\4"+
		"\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n"+
		"\4\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t"+
		" \4!\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t"+
		"+\4,\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\3\2\3\2\3\2\3\2\3\2\3\2"+
		"\3\2\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3"+
		"\5\3\5\3\5\3\5\3\5\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\7\3\7\3\7"+
		"\3\7\3\7\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3"+
		"\t\3\t\3\t\3\t\3\t\3\n\3\n\3\n\3\n\3\n\3\13\3\13\3\13\3\13\3\f\3\f\3\f"+
		"\3\f\3\f\3\f\3\f\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\16\3\16\3\16"+
		"\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\17\3\17\3\20"+
		"\3\20\3\21\3\21\3\22\3\22\3\23\3\23\3\24\3\24\3\25\3\25\3\26\3\26\3\27"+
		"\3\27\3\30\3\30\3\31\3\31\3\32\3\32\3\32\3\32\3\32\3\32\3\32\5\32\u00e9"+
		"\n\32\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33"+
		"\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\33\5\33\u0101\n\33\3\34\3\34"+
		"\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34"+
		"\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34"+
		"\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\3\34\5\34\u012c\n\34"+
		"\3\35\3\35\7\35\u0130\n\35\f\35\16\35\u0133\13\35\3\36\3\36\5\36\u0137"+
		"\n\36\3\37\3\37\3\37\3\37\5\37\u013d\n\37\3 \3 \3 \7 \u0142\n \f \16 "+
		"\u0145\13 \3 \3 \3!\3!\3!\5!\u014c\n!\3\"\3\"\3\"\3\"\3\"\3\"\3#\3#\3"+
		"$\3$\3%\3%\3%\7%\u015b\n%\f%\16%\u015e\13%\5%\u0160\n%\3&\3&\3&\3&\7&"+
		"\u0166\n&\f&\16&\u0169\13&\3&\3&\3&\3&\3&\3\'\3\'\3\'\3\'\7\'\u0174\n"+
		"\'\f\'\16\'\u0177\13\'\3\'\3\'\3(\3(\7(\u017d\n(\f(\16(\u0180\13(\3(\3"+
		"(\3)\6)\u0185\n)\r)\16)\u0186\3)\3)\3*\3*\3*\3*\3*\3*\3*\3*\3+\3+\3,\3"+
		",\3-\3-\3.\3.\3/\3/\3\60\3\60\3\61\3\61\3\61\3\61\3\61\3\61\3\u0167\2"+
		"\62\4\3\6\4\b\5\n\6\f\7\16\b\20\t\22\n\24\13\26\f\30\r\32\16\34\17\36"+
		"\20 \21\"\22$\23&\24(\25*\26,\27.\30\60\31\62\32\64\33\66\348\35:\36<"+
		"\2>\2@\37B\2D\2F\2H\2J L!N\"P#R$T%V&X\'Z\2\\\2^(`)b*\4\2\3\21\6\2((>>"+
		"@@~~\4\2--\61\61\3\2\62;\7\2&&\60\60C\\aac|\4\2\2\u0081\ud802\udc01\3"+
		"\2\ud802\udc01\3\2\udc02\ue001\n\2$$\61\61^^ddhhppttvv\5\2\62;CHch\5\2"+
		"\2!$$^^\3\2\63;\4\2\f\f\17\17\5\2\13\f\17\17\"\"\3\2c|\b\2#&/\61??aa}"+
		"}\177\177\2\u01b5\2\4\3\2\2\2\2\6\3\2\2\2\2\b\3\2\2\2\2\n\3\2\2\2\2\f"+
		"\3\2\2\2\2\16\3\2\2\2\2\20\3\2\2\2\2\22\3\2\2\2\2\24\3\2\2\2\2\26\3\2"+
		"\2\2\2\30\3\2\2\2\2\32\3\2\2\2\2\34\3\2\2\2\2\36\3\2\2\2\2 \3\2\2\2\2"+
		"\"\3\2\2\2\2$\3\2\2\2\2&\3\2\2\2\2(\3\2\2\2\2*\3\2\2\2\2,\3\2\2\2\2.\3"+
		"\2\2\2\2\60\3\2\2\2\2\62\3\2\2\2\2\64\3\2\2\2\2\66\3\2\2\2\28\3\2\2\2"+
		"\2:\3\2\2\2\2@\3\2\2\2\2J\3\2\2\2\2L\3\2\2\2\2N\3\2\2\2\2P\3\2\2\2\2R"+
		"\3\2\2\2\2T\3\2\2\2\3V\3\2\2\2\3X\3\2\2\2\3^\3\2\2\2\3`\3\2\2\2\3b\3\2"+
		"\2\2\4d\3\2\2\2\6k\3\2\2\2\bp\3\2\2\2\nw\3\2\2\2\f\u0080\3\2\2\2\16\u008a"+
		"\3\2\2\2\20\u0093\3\2\2\2\22\u009c\3\2\2\2\24\u00a3\3\2\2\2\26\u00a8\3"+
		"\2\2\2\30\u00ac\3\2\2\2\32\u00b3\3\2\2\2\34\u00bd\3\2\2\2\36\u00cb\3\2"+
		"\2\2 \u00cd\3\2\2\2\"\u00cf\3\2\2\2$\u00d1\3\2\2\2&\u00d3\3\2\2\2(\u00d5"+
		"\3\2\2\2*\u00d7\3\2\2\2,\u00d9\3\2\2\2.\u00db\3\2\2\2\60\u00dd\3\2\2\2"+
		"\62\u00df\3\2\2\2\64\u00e8\3\2\2\2\66\u0100\3\2\2\28\u012b\3\2\2\2:\u012d"+
		"\3\2\2\2<\u0136\3\2\2\2>\u013c\3\2\2\2@\u013e\3\2\2\2B\u0148\3\2\2\2D"+
		"\u014d\3\2\2\2F\u0153\3\2\2\2H\u0155\3\2\2\2J\u015f\3\2\2\2L\u0161\3\2"+
		"\2\2N\u016f\3\2\2\2P\u017a\3\2\2\2R\u0184\3\2\2\2T\u018a\3\2\2\2V\u0192"+
		"\3\2\2\2X\u0194\3\2\2\2Z\u0196\3\2\2\2\\\u0198\3\2\2\2^\u019a\3\2\2\2"+
		"`\u019c\3\2\2\2b\u019e\3\2\2\2de\7o\2\2ef\7q\2\2fg\7f\2\2gh\7w\2\2hi\7"+
		"n\2\2ij\7g\2\2j\5\3\2\2\2kl\7f\2\2lm\7c\2\2mn\7v\2\2no\7c\2\2o\7\3\2\2"+
		"\2pq\7u\2\2qr\7q\2\2rs\7w\2\2st\7t\2\2tu\7e\2\2uv\7g\2\2v\t\3\2\2\2wx"+
		"\7r\2\2xy\7t\2\2yz\7q\2\2z{\7x\2\2{|\7k\2\2|}\7f\2\2}~\7g\2\2~\177\7t"+
		"\2\2\177\13\3\2\2\2\u0080\u0081\7v\2\2\u0081\u0082\7g\2\2\u0082\u0083"+
		"\7t\2\2\u0083\u0084\7t\2\2\u0084\u0085\7c\2\2\u0085\u0086\7h\2\2\u0086"+
		"\u0087\7q\2\2\u0087\u0088\7t\2\2\u0088\u0089\7o\2\2\u0089\r\3\2\2\2\u008a"+
		"\u008b\7t\2\2\u008b\u008c\7g\2\2\u008c\u008d\7u\2\2\u008d\u008e\7q\2\2"+
		"\u008e\u008f\7w\2\2\u008f\u0090\7t\2\2\u0090\u0091\7e\2\2\u0091\u0092"+
		"\7g\2\2\u0092\17\3\2\2\2\u0093\u0094\7x\2\2\u0094\u0095\7c\2\2\u0095\u0096"+
		"\7t\2\2\u0096\u0097\7k\2\2\u0097\u0098\7c\2\2\u0098\u0099\7d\2\2\u0099"+
		"\u009a\7n\2\2\u009a\u009b\7g\2\2\u009b\21\3\2\2\2\u009c\u009d\7q\2\2\u009d"+
		"\u009e\7w\2\2\u009e\u009f\7v\2\2\u009f\u00a0\7r\2\2\u00a0\u00a1\7w\2\2"+
		"\u00a1\u00a2\7v\2\2\u00a2\23\3\2\2\2\u00a3\u00a4\7n\2\2\u00a4\u00a5\7"+
		"k\2\2\u00a5\u00a6\7u\2\2\u00a6\u00a7\7v\2\2\u00a7\25\3\2\2\2\u00a8\u00a9"+
		"\7o\2\2\u00a9\u00aa\7c\2\2\u00aa\u00ab\7r\2\2\u00ab\27\3\2\2\2\u00ac\u00ad"+
		"\7q\2\2\u00ad\u00ae\7d\2\2\u00ae\u00af\7l\2\2\u00af\u00b0\7g\2\2\u00b0"+
		"\u00b1\7e\2\2\u00b1\u00b2\7v\2\2\u00b2\31\3\2\2\2\u00b3\u00b4\7e\2\2\u00b4"+
		"\u00b5\7q\2\2\u00b5\u00b6\7p\2\2\u00b6\u00b7\7f\2\2\u00b7\u00b8\7k\2\2"+
		"\u00b8\u00b9\7v\2\2\u00b9\u00ba\7k\2\2\u00ba\u00bb\7q\2\2\u00bb\u00bc"+
		"\7p\2\2\u00bc\33\3\2\2\2\u00bd\u00be\7g\2\2\u00be\u00bf\7t\2\2\u00bf\u00c0"+
		"\7t\2\2\u00c0\u00c1\7q\2\2\u00c1\u00c2\7t\2\2\u00c2\u00c3\7a\2\2\u00c3"+
		"\u00c4\7o\2\2\u00c4\u00c5\7g\2\2\u00c5\u00c6\7u\2\2\u00c6\u00c7\7u\2\2"+
		"\u00c7\u00c8\7c\2\2\u00c8\u00c9\7i\2\2\u00c9\u00ca\7g\2\2\u00ca\35\3\2"+
		"\2\2\u00cb\u00cc\7}\2\2\u00cc\37\3\2\2\2\u00cd\u00ce\7\177\2\2\u00ce!"+
		"\3\2\2\2\u00cf\u00d0\7?\2\2\u00d0#\3\2\2\2\u00d1\u00d2\7*\2\2\u00d2%\3"+
		"\2\2\2\u00d3\u00d4\7+\2\2\u00d4\'\3\2\2\2\u00d5\u00d6\7]\2\2\u00d6)\3"+
		"\2\2\2\u00d7\u00d8\7_\2\2\u00d8+\3\2\2\2\u00d9\u00da\7.\2\2\u00da-\3\2"+
		"\2\2\u00db\u00dc\7\60\2\2\u00dc/\3\2\2\2\u00dd\u00de\7/\2\2\u00de\61\3"+
		"\2\2\2\u00df\u00e0\7,\2\2\u00e0\63\3\2\2\2\u00e1\u00e9\t\2\2\2\u00e2\u00e9"+
		"\5\"\21\2\u00e3\u00e4\7?\2\2\u00e4\u00e9\7?\2\2\u00e5\u00e9\5\62\31\2"+
		"\u00e6\u00e9\5\60\30\2\u00e7\u00e9\t\3\2\2\u00e8\u00e1\3\2\2\2\u00e8\u00e2"+
		"\3\2\2\2\u00e8\u00e3\3\2\2\2\u00e8\u00e5\3\2\2\2\u00e8\u00e6\3\2\2\2\u00e8"+
		"\u00e7\3\2\2\2\u00e9\65\3\2\2\2\u00ea\u00eb\7v\2\2\u00eb\u00ec\7t\2\2"+
		"\u00ec\u00ed\7w\2\2\u00ed\u0101\7g\2\2\u00ee\u00ef\7$\2\2\u00ef\u00f0"+
		"\7v\2\2\u00f0\u00f1\7t\2\2\u00f1\u00f2\7w\2\2\u00f2\u00f3\7g\2\2\u00f3"+
		"\u0101\7$\2\2\u00f4\u00f5\7h\2\2\u00f5\u00f6\7c\2\2\u00f6\u00f7\7n\2\2"+
		"\u00f7\u00f8\7u\2\2\u00f8\u0101\7g\2\2\u00f9\u00fa\7$\2\2\u00fa\u00fb"+
		"\7h\2\2\u00fb\u00fc\7c\2\2\u00fc\u00fd\7n\2\2\u00fd\u00fe\7u\2\2\u00fe"+
		"\u00ff\7g\2\2\u00ff\u0101\7$\2\2\u0100\u00ea\3\2\2\2\u0100\u00ee\3\2\2"+
		"\2\u0100\u00f4\3\2\2\2\u0100\u00f9\3\2\2\2\u0101\67\3\2\2\2\u0102\u0103"+
		"\7u\2\2\u0103\u0104\7v\2\2\u0104\u0105\7t\2\2\u0105\u0106\7k\2\2\u0106"+
		"\u0107\7p\2\2\u0107\u012c\7i\2\2\u0108\u0109\7$\2\2\u0109\u010a\7u\2\2"+
		"\u010a\u010b\7v\2\2\u010b\u010c\7t\2\2\u010c\u010d\7k\2\2\u010d\u010e"+
		"\7p\2\2\u010e\u010f\7i\2\2\u010f\u012c\7$\2\2\u0110\u0111\7p\2\2\u0111"+
		"\u0112\7w\2\2\u0112\u0113\7o\2\2\u0113\u0114\7d\2\2\u0114\u0115\7g\2\2"+
		"\u0115\u012c\7t\2\2\u0116\u0117\7$\2\2\u0117\u0118\7p\2\2\u0118\u0119"+
		"\7w\2\2\u0119\u011a\7o\2\2\u011a\u011b\7d\2\2\u011b\u011c\7g\2\2\u011c"+
		"\u011d\7t\2\2\u011d\u012c\7$\2\2\u011e\u011f\7d\2\2\u011f\u0120\7q\2\2"+
		"\u0120\u0121\7q\2\2\u0121\u012c\7n\2\2\u0122\u0123\7$\2\2\u0123\u0124"+
		"\7d\2\2\u0124\u0125\7q\2\2\u0125\u0126\7q\2\2\u0126\u0127\7n\2\2\u0127"+
		"\u012c\7$\2\2\u0128\u0129\7c\2\2\u0129\u012a\7p\2\2\u012a\u012c\7{\2\2"+
		"\u012b\u0102\3\2\2\2\u012b\u0108\3\2\2\2\u012b\u0110\3\2\2\2\u012b\u0116"+
		"\3\2\2\2\u012b\u011e\3\2\2\2\u012b\u0122\3\2\2\2\u012b\u0128\3\2\2\2\u012c"+
		"9\3\2\2\2\u012d\u0131\5>\37\2\u012e\u0130\5<\36\2\u012f\u012e\3\2\2\2"+
		"\u0130\u0133\3\2\2\2\u0131\u012f\3\2\2\2\u0131\u0132\3\2\2\2\u0132;\3"+
		"\2\2\2\u0133\u0131\3\2\2\2\u0134\u0137\5>\37\2\u0135\u0137\t\4\2\2\u0136"+
		"\u0134\3\2\2\2\u0136\u0135\3\2\2\2\u0137=\3\2\2\2\u0138\u013d\t\5\2\2"+
		"\u0139\u013d\n\6\2\2\u013a\u013b\t\7\2\2\u013b\u013d\t\b\2\2\u013c\u0138"+
		"\3\2\2\2\u013c\u0139\3\2\2\2\u013c\u013a\3\2\2\2\u013d?\3\2\2\2\u013e"+
		"\u0143\7$\2\2\u013f\u0142\5B!\2\u0140\u0142\5H$\2\u0141\u013f\3\2\2\2"+
		"\u0141\u0140\3\2\2\2\u0142\u0145\3\2\2\2\u0143\u0141\3\2\2\2\u0143\u0144"+
		"\3\2\2\2\u0144\u0146\3\2\2\2\u0145\u0143\3\2\2\2\u0146\u0147\7$\2\2\u0147"+
		"A\3\2\2\2\u0148\u014b\7^\2\2\u0149\u014c\t\t\2\2\u014a\u014c\5D\"\2\u014b"+
		"\u0149\3\2\2\2\u014b\u014a\3\2\2\2\u014cC\3\2\2\2\u014d\u014e\7w\2\2\u014e"+
		"\u014f\5F#\2\u014f\u0150\5F#\2\u0150\u0151\5F#\2\u0151\u0152\5F#\2\u0152"+
		"E\3\2\2\2\u0153\u0154\t\n\2\2\u0154G\3\2\2\2\u0155\u0156\n\13\2\2\u0156"+
		"I\3\2\2\2\u0157\u0160\7\62\2\2\u0158\u015c\t\f\2\2\u0159\u015b\t\4\2\2"+
		"\u015a\u0159\3\2\2\2\u015b\u015e\3\2\2\2\u015c\u015a\3\2\2\2\u015c\u015d"+
		"\3\2\2\2\u015d\u0160\3\2\2\2\u015e\u015c\3\2\2\2\u015f\u0157\3\2\2\2\u015f"+
		"\u0158\3\2\2\2\u0160K\3\2\2\2\u0161\u0162\7\61\2\2\u0162\u0163\7,\2\2"+
		"\u0163\u0167\3\2\2\2\u0164\u0166\13\2\2\2\u0165\u0164\3\2\2\2\u0166\u0169"+
		"\3\2\2\2\u0167\u0168\3\2\2\2\u0167\u0165\3\2\2\2\u0168\u016a\3\2\2\2\u0169"+
		"\u0167\3\2\2\2\u016a\u016b\7,\2\2\u016b\u016c\7\61\2\2\u016c\u016d\3\2"+
		"\2\2\u016d\u016e\b&\2\2\u016eM\3\2\2\2\u016f\u0170\7\61\2\2\u0170\u0171"+
		"\7\61\2\2\u0171\u0175\3\2\2\2\u0172\u0174\n\r\2\2\u0173\u0172\3\2\2\2"+
		"\u0174\u0177\3\2\2\2\u0175\u0173\3\2\2\2\u0175\u0176\3\2\2\2\u0176\u0178"+
		"\3\2\2\2\u0177\u0175\3\2\2\2\u0178\u0179\b\'\2\2\u0179O\3\2\2\2\u017a"+
		"\u017e\7%\2\2\u017b\u017d\n\r\2\2\u017c\u017b\3\2\2\2\u017d\u0180\3\2"+
		"\2\2\u017e\u017c\3\2\2\2\u017e\u017f\3\2\2\2\u017f\u0181\3\2\2\2\u0180"+
		"\u017e\3\2\2\2\u0181\u0182\b(\2\2\u0182Q\3\2\2\2\u0183\u0185\t\16\2\2"+
		"\u0184\u0183\3\2\2\2\u0185\u0186\3\2\2\2\u0186\u0184\3\2\2\2\u0186\u0187"+
		"\3\2\2\2\u0187\u0188\3\2\2\2\u0188\u0189\b)\2\2\u0189S\3\2\2\2\u018a\u018b"+
		"\7>\2\2\u018b\u018c\7>\2\2\u018c\u018d\7G\2\2\u018d\u018e\7Q\2\2\u018e"+
		"\u018f\7H\2\2\u018f\u0190\3\2\2\2\u0190\u0191\b*\3\2\u0191U\3\2\2\2\u0192"+
		"\u0193\t\17\2\2\u0193W\3\2\2\2\u0194\u0195\5R)\2\u0195Y\3\2\2\2\u0196"+
		"\u0197\5F#\2\u0197[\3\2\2\2\u0198\u0199\5H$\2\u0199]\3\2\2\2\u019a\u019b"+
		"\5J%\2\u019b_\3\2\2\2\u019c\u019d\t\20\2\2\u019da\3\2\2\2\u019e\u019f"+
		"\7G\2\2\u019f\u01a0\7Q\2\2\u01a0\u01a1\7H\2\2\u01a1\u01a2\3\2\2\2\u01a2"+
		"\u01a3\b\61\4\2\u01a3c\3\2\2\2\23\2\3\u00e8\u0100\u012b\u0131\u0136\u013c"+
		"\u0141\u0143\u014b\u015c\u015f\u0167\u0175\u017e\u0186\5\2\3\2\7\3\2\6"+
		"\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}