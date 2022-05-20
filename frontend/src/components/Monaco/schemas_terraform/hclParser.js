// Generated from hclParser.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
	"\u5964\u0003*\u010e\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
	"\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
	"\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
	"\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
	"\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
	"\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
	"\u0004\u0018\t\u0018\u0003\u0002\u0006\u00022\n\u0002\r\u0002\u000e",
	"\u00023\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
	"\u0003\u0003\u0003\u0003\u0005\u0003=\n\u0003\u0003\u0004\u0003\u0004",
	"\u0003\u0004\u0003\u0004\u0003\u0004\u0006\u0004D\n\u0004\r\u0004\u000e",
	"\u0004E\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005",
	"\u0003\u0005\u0003\u0005\u0006\u0005O\n\u0005\r\u0005\u000e\u0005P\u0003",
	"\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
	"\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
	"\b\u0003\b\u0003\b\u0006\bb\n\b\r\b\u000e\bc\u0003\b\u0003\b\u0003\t",
	"\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003",
	"\n\u0003\n\u0006\ns\n\n\r\n\u000e\nt\u0003\n\u0003\n\u0003\u000b\u0003",
	"\u000b\u0003\u000b\u0003\u000b\u0006\u000b}\n\u000b\r\u000b\u000e\u000b",
	"~\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e",
	"\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
	"\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
	"\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u0098\n",
	"\u000e\u0003\u000f\u0003\u000f\u0006\u000f\u009c\n\u000f\r\u000f\u000e",
	"\u000f\u009d\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0011",
	"\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012",
	"\u0003\u0012\u0003\u0012\u0006\u0012\u00ad\n\u0012\r\u0012\u000e\u0012",
	"\u00ae\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
	"\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u00bb",
	"\n\u0013\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014",
	"\u0003\u0014\u0005\u0014\u00c3\n\u0014\u0003\u0015\u0003\u0015\u0003",
	"\u0015\u0003\u0015\u0003\u0015\u0007\u0015\u00ca\n\u0015\f\u0015\u000e",
	"\u0015\u00cd\u000b\u0015\u0003\u0015\u0005\u0015\u00d0\n\u0015\u0003",
	"\u0015\u0003\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003",
	"\u0016\u0003\u0016\u0006\u0016\u00da\n\u0016\r\u0016\u000e\u0016\u00db",
	"\u0006\u0016\u00de\n\u0016\r\u0016\u000e\u0016\u00df\u0003\u0016\u0003",
	"\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00e8",
	"\n\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016",
	"\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016",
	"\u0007\u0016\u00f5\n\u0016\f\u0016\u000e\u0016\u00f8\u000b\u0016\u0003",
	"\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0007",
	"\u0017\u0100\n\u0017\f\u0017\u000e\u0017\u0103\u000b\u0017\u0003\u0017",
	"\u0005\u0017\u0106\n\u0017\u0003\u0017\u0003\u0017\u0005\u0017\u010a",
	"\n\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0002\u0003*\u0019\u0002",
	"\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e",
	" \"$&(*,.\u0002\u0003\u0004\u0002\u001a\u001a  \u0002\u0122\u00021\u0003",
	"\u0002\u0002\u0002\u0004<\u0003\u0002\u0002\u0002\u0006>\u0003\u0002",
	"\u0002\u0002\bI\u0003\u0002\u0002\u0002\nT\u0003\u0002\u0002\u0002\f",
	"X\u0003\u0002\u0002\u0002\u000e^\u0003\u0002\u0002\u0002\u0010g\u0003",
	"\u0002\u0002\u0002\u0012n\u0003\u0002\u0002\u0002\u0014x\u0003\u0002",
	"\u0002\u0002\u0016\u0082\u0003\u0002\u0002\u0002\u0018\u0084\u0003\u0002",
	"\u0002\u0002\u001a\u0097\u0003\u0002\u0002\u0002\u001c\u009b\u0003\u0002",
	"\u0002\u0002\u001e\u009f\u0003\u0002\u0002\u0002 \u00a3\u0003\u0002",
	"\u0002\u0002\"\u00a8\u0003\u0002\u0002\u0002$\u00ba\u0003\u0002\u0002",
	"\u0002&\u00c2\u0003\u0002\u0002\u0002(\u00c4\u0003\u0002\u0002\u0002",
	"*\u00e7\u0003\u0002\u0002\u0002,\u0109\u0003\u0002\u0002\u0002.\u010b",
	"\u0003\u0002\u0002\u000202\u0005\u0004\u0003\u000210\u0003\u0002\u0002",
	"\u000223\u0003\u0002\u0002\u000231\u0003\u0002\u0002\u000234\u0003\u0002",
	"\u0002\u00024\u0003\u0003\u0002\u0002\u00025=\u0005\f\u0007\u00026=",
	"\u0005\u000e\b\u00027=\u0005\u0010\t\u00028=\u0005\u0012\n\u00029=\u0005",
	"\u0014\u000b\u0002:=\u0005\b\u0005\u0002;=\u0005\u0006\u0004\u0002<",
	"5\u0003\u0002\u0002\u0002<6\u0003\u0002\u0002\u0002<7\u0003\u0002\u0002",
	"\u0002<8\u0003\u0002\u0002\u0002<9\u0003\u0002\u0002\u0002<:\u0003\u0002",
	"\u0002\u0002<;\u0003\u0002\u0002\u0002=\u0005\u0003\u0002\u0002\u0002",
	">?\u0007\u0004\u0002\u0002?@\u0005\u0018\r\u0002@A\u0005\u0016\f\u0002",
	"AC\u0007\u0010\u0002\u0002BD\u0005\u001c\u000f\u0002CB\u0003\u0002\u0002",
	"\u0002DE\u0003\u0002\u0002\u0002EC\u0003\u0002\u0002\u0002EF\u0003\u0002",
	"\u0002\u0002FG\u0003\u0002\u0002\u0002GH\u0007\u0011\u0002\u0002H\u0007",
	"\u0003\u0002\u0002\u0002IJ\u0007\u0003\u0002\u0002JK\u0005\u0016\f\u0002",
	"KN\u0007\u0010\u0002\u0002LO\u0005\n\u0006\u0002MO\u0005\u001c\u000f",
	"\u0002NL\u0003\u0002\u0002\u0002NM\u0003\u0002\u0002\u0002OP\u0003\u0002",
	"\u0002\u0002PN\u0003\u0002\u0002\u0002PQ\u0003\u0002\u0002\u0002QR\u0003",
	"\u0002\u0002\u0002RS\u0007\u0011\u0002\u0002S\t\u0003\u0002\u0002\u0002",
	"TU\u0007\u0005\u0002\u0002UV\u0007\u0012\u0002\u0002VW\u0007\u001f\u0002",
	"\u0002W\u000b\u0003\u0002\u0002\u0002XY\u0007\u0006\u0002\u0002YZ\u0005",
	"\u0016\f\u0002Z[\u0007\u0010\u0002\u0002[\\\u0005\u001c\u000f\u0002",
	"\\]\u0007\u0011\u0002\u0002]\r\u0003\u0002\u0002\u0002^_\u0007\u0007",
	"\u0002\u0002_a\u0007\u0010\u0002\u0002`b\u0005\u001c\u000f\u0002a`\u0003",
	"\u0002\u0002\u0002bc\u0003\u0002\u0002\u0002ca\u0003\u0002\u0002\u0002",
	"cd\u0003\u0002\u0002\u0002de\u0003\u0002\u0002\u0002ef\u0007\u0011\u0002",
	"\u0002f\u000f\u0003\u0002\u0002\u0002gh\u0007\b\u0002\u0002hi\u0005",
	"\u0018\r\u0002ij\u0005\u0016\f\u0002jk\u0007\u0010\u0002\u0002kl\u0005",
	"\u001c\u000f\u0002lm\u0007\u0011\u0002\u0002m\u0011\u0003\u0002\u0002",
	"\u0002no\u0007\t\u0002\u0002op\u0005\u0016\f\u0002pr\u0007\u0010\u0002",
	"\u0002qs\u0005\u001c\u000f\u0002rq\u0003\u0002\u0002\u0002st\u0003\u0002",
	"\u0002\u0002tr\u0003\u0002\u0002\u0002tu\u0003\u0002\u0002\u0002uv\u0003",
	"\u0002\u0002\u0002vw\u0007\u0011\u0002\u0002w\u0013\u0003\u0002\u0002",
	"\u0002xy\u0007\n\u0002\u0002yz\u0005\u0016\f\u0002z|\u0007\u0010\u0002",
	"\u0002{}\u0005\u001c\u000f\u0002|{\u0003\u0002\u0002\u0002}~\u0003\u0002",
	"\u0002\u0002~|\u0003\u0002\u0002\u0002~\u007f\u0003\u0002\u0002\u0002",
	"\u007f\u0080\u0003\u0002\u0002\u0002\u0080\u0081\u0007\u0011\u0002\u0002",
	"\u0081\u0015\u0003\u0002\u0002\u0002\u0082\u0083\u0007\u001f\u0002\u0002",
	"\u0083\u0017\u0003\u0002\u0002\u0002\u0084\u0085\u0007\u001f\u0002\u0002",
	"\u0085\u0019\u0003\u0002\u0002\u0002\u0086\u0098\u0007\u001d\u0002\u0002",
	"\u0087\u0098\u0007\u000b\u0002\u0002\u0088\u0089\u0007\u000b\u0002\u0002",
	"\u0089\u008a\u0007\u0013\u0002\u0002\u008a\u008b\u0005\u001a\u000e\u0002",
	"\u008b\u008c\u0007\u0014\u0002\u0002\u008c\u0098\u0003\u0002\u0002\u0002",
	"\u008d\u008e\u0007\f\u0002\u0002\u008e\u008f\u0007\u0013\u0002\u0002",
	"\u008f\u0090\u0005\u001a\u000e\u0002\u0090\u0091\u0007\u0014\u0002\u0002",
	"\u0091\u0098\u0003\u0002\u0002\u0002\u0092\u0093\u0007\r\u0002\u0002",
	"\u0093\u0094\u0007\u0013\u0002\u0002\u0094\u0095\u0005\u001c\u000f\u0002",
	"\u0095\u0096\u0007\u0014\u0002\u0002\u0096\u0098\u0003\u0002\u0002\u0002",
	"\u0097\u0086\u0003\u0002\u0002\u0002\u0097\u0087\u0003\u0002\u0002\u0002",
	"\u0097\u0088\u0003\u0002\u0002\u0002\u0097\u008d\u0003\u0002\u0002\u0002",
	"\u0097\u0092\u0003\u0002\u0002\u0002\u0098\u001b\u0003\u0002\u0002\u0002",
	"\u0099\u009c\u0005 \u0011\u0002\u009a\u009c\u0005\u001e\u0010\u0002",
	"\u009b\u0099\u0003\u0002\u0002\u0002\u009b\u009a\u0003\u0002\u0002\u0002",
	"\u009c\u009d\u0003\u0002\u0002\u0002\u009d\u009b\u0003\u0002\u0002\u0002",
	"\u009d\u009e\u0003\u0002\u0002\u0002\u009e\u001d\u0003\u0002\u0002\u0002",
	"\u009f\u00a0\u0007\u001e\u0002\u0002\u00a0\u00a1\u0007\u0012\u0002\u0002",
	"\u00a1\u00a2\u0005&\u0014\u0002\u00a2\u001f\u0003\u0002\u0002\u0002",
	"\u00a3\u00a4\u0007\u001e\u0002\u0002\u00a4\u00a5\u0007\u0010\u0002\u0002",
	"\u00a5\u00a6\u0005\u001c\u000f\u0002\u00a6\u00a7\u0007\u0011\u0002\u0002",
	"\u00a7!\u0003\u0002\u0002\u0002\u00a8\u00a9\u0007\u0010\u0002\u0002",
	"\u00a9\u00aa\u0007\u000e\u0002\u0002\u00aa\u00ac\u0007\u0012\u0002\u0002",
	"\u00ab\u00ad\u0005$\u0013\u0002\u00ac\u00ab\u0003\u0002\u0002\u0002",
	"\u00ad\u00ae\u0003\u0002\u0002\u0002\u00ae\u00ac\u0003\u0002\u0002\u0002",
	"\u00ae\u00af\u0003\u0002\u0002\u0002\u00af\u00b0\u0003\u0002\u0002\u0002",
	"\u00b0\u00b1\u0007\u000f\u0002\u0002\u00b1\u00b2\u0007\u0012\u0002\u0002",
	"\u00b2\u00b3\u0007\u001f\u0002\u0002\u00b3\u00b4\u0007\u0011\u0002\u0002",
	"\u00b4#\u0003\u0002\u0002\u0002\u00b5\u00bb\u0007\u001f\u0002\u0002",
	"\u00b6\u00bb\u0007 \u0002\u0002\u00b7\u00bb\u0007\u001c\u0002\u0002",
	"\u00b8\u00bb\u0007\u001b\u0002\u0002\u00b9\u00bb\u0005(\u0015\u0002",
	"\u00ba\u00b5\u0003\u0002\u0002\u0002\u00ba\u00b6\u0003\u0002\u0002\u0002",
	"\u00ba\u00b7\u0003\u0002\u0002\u0002\u00ba\u00b8\u0003\u0002\u0002\u0002",
	"\u00ba\u00b9\u0003\u0002\u0002\u0002\u00bb%\u0003\u0002\u0002\u0002",
	"\u00bc\u00c3\u0007 \u0002\u0002\u00bd\u00c3\u0007\u001c\u0002\u0002",
	"\u00be\u00c3\u0005,\u0017\u0002\u00bf\u00c3\u0005*\u0016\u0002\u00c0",
	"\u00c3\u0007\u001f\u0002\u0002\u00c1\u00c3\u0005\u001a\u000e\u0002\u00c2",
	"\u00bc\u0003\u0002\u0002\u0002\u00c2\u00bd\u0003\u0002\u0002\u0002\u00c2",
	"\u00be\u0003\u0002\u0002\u0002\u00c2\u00bf\u0003\u0002\u0002\u0002\u00c2",
	"\u00c0\u0003\u0002\u0002\u0002\u00c2\u00c1\u0003\u0002\u0002\u0002\u00c3",
	"\'\u0003\u0002\u0002\u0002\u00c4\u00c5\u0007\u001e\u0002\u0002\u00c5",
	"\u00c6\u0007\u0013\u0002\u0002\u00c6\u00cb\u0005&\u0014\u0002\u00c7",
	"\u00c8\u0007\u0017\u0002\u0002\u00c8\u00ca\u0005&\u0014\u0002\u00c9",
	"\u00c7\u0003\u0002\u0002\u0002\u00ca\u00cd\u0003\u0002\u0002\u0002\u00cb",
	"\u00c9\u0003\u0002\u0002\u0002\u00cb\u00cc\u0003\u0002\u0002\u0002\u00cc",
	"\u00cf\u0003\u0002\u0002\u0002\u00cd\u00cb\u0003\u0002\u0002\u0002\u00ce",
	"\u00d0\u0007\u0017\u0002\u0002\u00cf\u00ce\u0003\u0002\u0002\u0002\u00cf",
	"\u00d0\u0003\u0002\u0002\u0002\u00d0\u00d1\u0003\u0002\u0002\u0002\u00d1",
	"\u00d2\u0007\u0014\u0002\u0002\u00d2)\u0003\u0002\u0002\u0002\u00d3",
	"\u00d4\b\u0016\u0001\u0002\u00d4\u00e8\u0007\u001e\u0002\u0002\u00d5",
	"\u00dd\u0007%\u0002\u0002\u00d6\u00de\u0007&\u0002\u0002\u00d7\u00de",
	"\u0007)\u0002\u0002\u00d8\u00da\u0007\'\u0002\u0002\u00d9\u00d8\u0003",
	"\u0002\u0002\u0002\u00da\u00db\u0003\u0002\u0002\u0002\u00db\u00d9\u0003",
	"\u0002\u0002\u0002\u00db\u00dc\u0003\u0002\u0002\u0002\u00dc\u00de\u0003",
	"\u0002\u0002\u0002\u00dd\u00d6\u0003\u0002\u0002\u0002\u00dd\u00d7\u0003",
	"\u0002\u0002\u0002\u00dd\u00d9\u0003\u0002\u0002\u0002\u00de\u00df\u0003",
	"\u0002\u0002\u0002\u00df\u00dd\u0003\u0002\u0002\u0002\u00df\u00e0\u0003",
	"\u0002\u0002\u0002\u00e0\u00e1\u0003\u0002\u0002\u0002\u00e1\u00e8\u0007",
	"*\u0002\u0002\u00e2\u00e3\u0007\u001f\u0002\u0002\u00e3\u00e4\u0005",
	"*\u0016\u0002\u00e4\u00e5\u0007\u001f\u0002\u0002\u00e5\u00e8\u0003",
	"\u0002\u0002\u0002\u00e6\u00e8\u0005(\u0015\u0002\u00e7\u00d3\u0003",
	"\u0002\u0002\u0002\u00e7\u00d5\u0003\u0002\u0002\u0002\u00e7\u00e2\u0003",
	"\u0002\u0002\u0002\u00e7\u00e6\u0003\u0002\u0002\u0002\u00e8\u00f6\u0003",
	"\u0002\u0002\u0002\u00e9\u00ea\f\b\u0002\u0002\u00ea\u00eb\u0007\u0018",
	"\u0002\u0002\u00eb\u00f5\u0005*\u0016\t\u00ec\u00ed\f\u0007\u0002\u0002",
	"\u00ed\u00ee\u0007\u0015\u0002\u0002\u00ee\u00ef\u0005.\u0018\u0002",
	"\u00ef\u00f0\u0007\u0016\u0002\u0002\u00f0\u00f5\u0003\u0002\u0002\u0002",
	"\u00f1\u00f2\f\u0006\u0002\u0002\u00f2\u00f3\u0007\u0018\u0002\u0002",
	"\u00f3\u00f5\u0005.\u0018\u0002\u00f4\u00e9\u0003\u0002\u0002\u0002",
	"\u00f4\u00ec\u0003\u0002\u0002\u0002\u00f4\u00f1\u0003\u0002\u0002\u0002",
	"\u00f5\u00f8\u0003\u0002\u0002\u0002\u00f6\u00f4\u0003\u0002\u0002\u0002",
	"\u00f6\u00f7\u0003\u0002\u0002\u0002\u00f7+\u0003\u0002\u0002\u0002",
	"\u00f8\u00f6\u0003\u0002\u0002\u0002\u00f9\u00fa\u0007\u0015\u0002\u0002",
	"\u00fa\u010a\u0007\u0016\u0002\u0002\u00fb\u00fc\u0007\u0015\u0002\u0002",
	"\u00fc\u0101\u0005&\u0014\u0002\u00fd\u00fe\u0007\u0017\u0002\u0002",
	"\u00fe\u0100\u0005&\u0014\u0002\u00ff\u00fd\u0003\u0002\u0002\u0002",
	"\u0100\u0103\u0003\u0002\u0002\u0002\u0101\u00ff\u0003\u0002\u0002\u0002",
	"\u0101\u0102\u0003\u0002\u0002\u0002\u0102\u0105\u0003\u0002\u0002\u0002",
	"\u0103\u0101\u0003\u0002\u0002\u0002\u0104\u0106\u0007\u0017\u0002\u0002",
	"\u0105\u0104\u0003\u0002\u0002\u0002\u0105\u0106\u0003\u0002\u0002\u0002",
	"\u0106\u0107\u0003\u0002\u0002\u0002\u0107\u0108\u0007\u0016\u0002\u0002",
	"\u0108\u010a\u0003\u0002\u0002\u0002\u0109\u00f9\u0003\u0002\u0002\u0002",
	"\u0109\u00fb\u0003\u0002\u0002\u0002\u010a-\u0003\u0002\u0002\u0002",
	"\u010b\u010c\t\u0002\u0002\u0002\u010c/\u0003\u0002\u0002\u0002\u001b",
	"3<ENPct~\u0097\u009b\u009d\u00ae\u00ba\u00c2\u00cb\u00cf\u00db\u00dd",
	"\u00df\u00e7\u00f4\u00f6\u0101\u0105\u0109"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class hclParser extends antlr4.Parser {

	static grammarFileName = "hclParser.g4";
	static literalNames = [ null, "'module'", "'data'", "'source'", "'provider'", 
		"'terraform'", "'resource'", "'variable'", "'output'", 
		"'list'", "'map'", "'object'", "'condition'", 
		"'error_message'", "'{'", "'}'", "'='", "'('", 
		"')'", "'['", "']'", "','", "'.'", "'-'", "'*'", 
		null, null, null, null, null, null, null, null, 
		null, null, "'<<EOF'", null, null, null, null, 
		"'EOF'" ];
	static symbolicNames = [ null, "MODULE", "DATA", "SOURCE", "PROVIDER", 
		"TERRAFORM", "RESOURCE", "VARIABLE", "OUTPUT", 
		"LIST", "MAP", "OBJECT", "CONDITION", "ERROR", 
		"AO", "AF", "EQUAL", "PO", "PF", "CO", "CF", 
		"VIRG", "POINT", "TIRET", "MULT", "BOOLEANOP", 
		"BOOLEAN", "TYPE", "IDENTIFIER", "STRING", 
		"NUMBER", "COMMENT", "LINE_COMMENT", "HAS_COMMENT", 
		"WS", "OPEN", "IDENTIFIERS", "WSS", "NUMBERS", 
		"AUTRE", "CLOSE" ];
	static ruleNames = [ "file", "directive", "dataDirective", "moduleDirective", 
		"moduleSource", "providerDirective", "terraformDirective", 
		"resourceDirective", "variableDirective", "outputDirective", 
		"name", "providerType", "type", "object", "field", 
		"complexField", "validation", "condition", "expression", 
		"functionCall", "complexExpression", "array", "index" ];

	constructor(input) {
		super(input);
		this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
		this.ruleNames = hclParser.ruleNames;
		this.literalNames = hclParser.literalNames;
		this.symbolicNames = hclParser.symbolicNames;
	}

	get atn() {
		return atn;
	}

	sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 20:
    	    		return this.complexExpression_sempred(localctx, predIndex);
		default:
			throw "No predicate with index:" + ruleIndex;
		}
	}

	complexExpression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 6);
    		case 1:
    			return this.precpred(this._ctx, 5);
    		case 2:
    			return this.precpred(this._ctx, 4);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
	};




	file() {
	    let localctx = new FileContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, hclParser.RULE_file);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 47; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 46;
	            this.directive();
	            this.state = 49; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hclParser.MODULE) | (1 << hclParser.DATA) | (1 << hclParser.PROVIDER) | (1 << hclParser.TERRAFORM) | (1 << hclParser.RESOURCE) | (1 << hclParser.VARIABLE) | (1 << hclParser.OUTPUT))) !== 0));
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



	directive() {
	    let localctx = new DirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, hclParser.RULE_directive);
	    try {
	        this.state = 58;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case hclParser.PROVIDER:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 51;
	            this.providerDirective();
	            break;
	        case hclParser.TERRAFORM:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 52;
	            this.terraformDirective();
	            break;
	        case hclParser.RESOURCE:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 53;
	            this.resourceDirective();
	            break;
	        case hclParser.VARIABLE:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 54;
	            this.variableDirective();
	            break;
	        case hclParser.OUTPUT:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 55;
	            this.outputDirective();
	            break;
	        case hclParser.MODULE:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 56;
	            this.moduleDirective();
	            break;
	        case hclParser.DATA:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 57;
	            this.dataDirective();
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



	dataDirective() {
	    let localctx = new DataDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, hclParser.RULE_dataDirective);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 60;
	        this.match(hclParser.DATA);
	        this.state = 61;
	        this.providerType();
	        this.state = 62;
	        this.name();
	        this.state = 63;
	        this.match(hclParser.AO);
	        this.state = 65; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 64;
	            this.object();
	            this.state = 67; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===hclParser.IDENTIFIER);
	        this.state = 69;
	        this.match(hclParser.AF);
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



	moduleDirective() {
	    let localctx = new ModuleDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, hclParser.RULE_moduleDirective);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 71;
	        this.match(hclParser.MODULE);
	        this.state = 72;
	        this.name();
	        this.state = 73;
	        this.match(hclParser.AO);
	        this.state = 76; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 76;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case hclParser.SOURCE:
	                this.state = 74;
	                this.moduleSource();
	                break;
	            case hclParser.IDENTIFIER:
	                this.state = 75;
	                this.object();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 78; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===hclParser.SOURCE || _la===hclParser.IDENTIFIER);
	        this.state = 80;
	        this.match(hclParser.AF);
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



	moduleSource() {
	    let localctx = new ModuleSourceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, hclParser.RULE_moduleSource);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 82;
	        this.match(hclParser.SOURCE);
	        this.state = 83;
	        this.match(hclParser.EQUAL);
	        this.state = 84;
	        this.match(hclParser.STRING);
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



	providerDirective() {
	    let localctx = new ProviderDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, hclParser.RULE_providerDirective);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 86;
	        this.match(hclParser.PROVIDER);
	        this.state = 87;
	        this.name();
	        this.state = 88;
	        this.match(hclParser.AO);
	        this.state = 89;
	        this.object();
	        this.state = 90;
	        this.match(hclParser.AF);
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



	terraformDirective() {
	    let localctx = new TerraformDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, hclParser.RULE_terraformDirective);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 92;
	        this.match(hclParser.TERRAFORM);
	        this.state = 93;
	        this.match(hclParser.AO);
	        this.state = 95; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 94;
	            this.object();
	            this.state = 97; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===hclParser.IDENTIFIER);
	        this.state = 99;
	        this.match(hclParser.AF);
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



	resourceDirective() {
	    let localctx = new ResourceDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, hclParser.RULE_resourceDirective);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 101;
	        this.match(hclParser.RESOURCE);
	        this.state = 102;
	        this.providerType();
	        this.state = 103;
	        this.name();
	        this.state = 104;
	        this.match(hclParser.AO);
	        this.state = 105;
	        this.object();
	        this.state = 106;
	        this.match(hclParser.AF);
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



	variableDirective() {
	    let localctx = new VariableDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, hclParser.RULE_variableDirective);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 108;
	        this.match(hclParser.VARIABLE);
	        this.state = 109;
	        this.name();
	        this.state = 110;
	        this.match(hclParser.AO);
	        this.state = 112; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 111;
	            this.object();
	            this.state = 114; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===hclParser.IDENTIFIER);
	        this.state = 116;
	        this.match(hclParser.AF);
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



	outputDirective() {
	    let localctx = new OutputDirectiveContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, hclParser.RULE_outputDirective);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 118;
	        this.match(hclParser.OUTPUT);
	        this.state = 119;
	        this.name();
	        this.state = 120;
	        this.match(hclParser.AO);
	        this.state = 122; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 121;
	            this.object();
	            this.state = 124; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===hclParser.IDENTIFIER);
	        this.state = 126;
	        this.match(hclParser.AF);
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



	name() {
	    let localctx = new NameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, hclParser.RULE_name);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 128;
	        this.match(hclParser.STRING);
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



	providerType() {
	    let localctx = new ProviderTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, hclParser.RULE_providerType);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 130;
	        this.match(hclParser.STRING);
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



	type() {
	    let localctx = new TypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, hclParser.RULE_type);
	    try {
	        this.state = 149;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 132;
	            this.match(hclParser.TYPE);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 133;
	            this.match(hclParser.LIST);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 134;
	            this.match(hclParser.LIST);
	            this.state = 135;
	            this.match(hclParser.PO);
	            this.state = 136;
	            this.type();
	            this.state = 137;
	            this.match(hclParser.PF);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 139;
	            this.match(hclParser.MAP);
	            this.state = 140;
	            this.match(hclParser.PO);
	            this.state = 141;
	            this.type();
	            this.state = 142;
	            this.match(hclParser.PF);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 144;
	            this.match(hclParser.OBJECT);
	            this.state = 145;
	            this.match(hclParser.PO);
	            this.state = 146;
	            this.object();
	            this.state = 147;
	            this.match(hclParser.PF);
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



	object() {
	    let localctx = new ObjectContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, hclParser.RULE_object);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 153; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 153;
	        		this._errHandler.sync(this);
	        		var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        		switch(la_) {
	        		case 1:
	        		    this.state = 151;
	        		    this.complexField();
	        		    break;

	        		case 2:
	        		    this.state = 152;
	        		    this.field();
	        		    break;

	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 155; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,10, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
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



	field() {
	    let localctx = new FieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, hclParser.RULE_field);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this.match(hclParser.IDENTIFIER);
	        this.state = 158;
	        this.match(hclParser.EQUAL);
	        this.state = 159;
	        this.expression();
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



	complexField() {
	    let localctx = new ComplexFieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, hclParser.RULE_complexField);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 161;
	        this.match(hclParser.IDENTIFIER);
	        this.state = 162;
	        this.match(hclParser.AO);
	        this.state = 163;
	        this.object();
	        this.state = 164;
	        this.match(hclParser.AF);
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



	validation() {
	    let localctx = new ValidationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, hclParser.RULE_validation);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 166;
	        this.match(hclParser.AO);
	        this.state = 167;
	        this.match(hclParser.CONDITION);
	        this.state = 168;
	        this.match(hclParser.EQUAL);
	        this.state = 170; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 169;
	            this.condition();
	            this.state = 172; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hclParser.BOOLEANOP) | (1 << hclParser.BOOLEAN) | (1 << hclParser.IDENTIFIER) | (1 << hclParser.STRING) | (1 << hclParser.NUMBER))) !== 0));
	        this.state = 174;
	        this.match(hclParser.ERROR);
	        this.state = 175;
	        this.match(hclParser.EQUAL);
	        this.state = 176;
	        this.match(hclParser.STRING);
	        this.state = 177;
	        this.match(hclParser.AF);
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



	condition() {
	    let localctx = new ConditionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, hclParser.RULE_condition);
	    try {
	        this.state = 184;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case hclParser.STRING:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 179;
	            this.match(hclParser.STRING);
	            break;
	        case hclParser.NUMBER:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 180;
	            this.match(hclParser.NUMBER);
	            break;
	        case hclParser.BOOLEAN:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 181;
	            this.match(hclParser.BOOLEAN);
	            break;
	        case hclParser.BOOLEANOP:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 182;
	            this.match(hclParser.BOOLEANOP);
	            break;
	        case hclParser.IDENTIFIER:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 183;
	            this.functionCall();
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



	expression() {
	    let localctx = new ExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, hclParser.RULE_expression);
	    try {
	        this.state = 192;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 186;
	            this.match(hclParser.NUMBER);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 187;
	            this.match(hclParser.BOOLEAN);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 188;
	            this.array();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 189;
	            this.complexExpression(0);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 190;
	            this.match(hclParser.STRING);
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 191;
	            this.type();
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



	functionCall() {
	    let localctx = new FunctionCallContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, hclParser.RULE_functionCall);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 194;
	        this.match(hclParser.IDENTIFIER);
	        this.state = 195;
	        this.match(hclParser.PO);
	        this.state = 196;
	        this.expression();
	        this.state = 201;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 197;
	                this.match(hclParser.VIRG);
	                this.state = 198;
	                this.expression(); 
	            }
	            this.state = 203;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,14,this._ctx);
	        }

	        this.state = 205;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===hclParser.VIRG) {
	            this.state = 204;
	            this.match(hclParser.VIRG);
	        }

	        this.state = 207;
	        this.match(hclParser.PF);
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


	complexExpression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ComplexExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 40;
	    this.enterRecursionRule(localctx, 40, hclParser.RULE_complexExpression, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 229;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 210;
	            this.match(hclParser.IDENTIFIER);
	            break;

	        case 2:
	            this.state = 211;
	            this.match(hclParser.OPEN);
	            this.state = 219; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 219;
	                this._errHandler.sync(this);
	                switch(this._input.LA(1)) {
	                case hclParser.IDENTIFIERS:
	                    this.state = 212;
	                    this.match(hclParser.IDENTIFIERS);
	                    break;
	                case hclParser.AUTRE:
	                    this.state = 213;
	                    this.match(hclParser.AUTRE);
	                    break;
	                case hclParser.WSS:
	                    this.state = 215; 
	                    this._errHandler.sync(this);
	                    var _alt = 1;
	                    do {
	                    	switch (_alt) {
	                    	case 1:
	                    		this.state = 214;
	                    		this.match(hclParser.WSS);
	                    		break;
	                    	default:
	                    		throw new antlr4.error.NoViableAltException(this);
	                    	}
	                    	this.state = 217; 
	                    	this._errHandler.sync(this);
	                    	_alt = this._interp.adaptivePredict(this._input,16, this._ctx);
	                    } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	                    break;
	                default:
	                    throw new antlr4.error.NoViableAltException(this);
	                }
	                this.state = 221; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(((((_la - 36)) & ~0x1f) == 0 && ((1 << (_la - 36)) & ((1 << (hclParser.IDENTIFIERS - 36)) | (1 << (hclParser.WSS - 36)) | (1 << (hclParser.AUTRE - 36)))) !== 0));
	            this.state = 223;
	            this.match(hclParser.CLOSE);
	            break;

	        case 3:
	            this.state = 224;
	            this.match(hclParser.STRING);
	            this.state = 225;
	            this.complexExpression(0);
	            this.state = 226;
	            this.match(hclParser.STRING);
	            break;

	        case 4:
	            this.state = 228;
	            this.functionCall();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 244;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 242;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ComplexExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, hclParser.RULE_complexExpression);
	                    this.state = 231;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 232;
	                    this.match(hclParser.POINT);
	                    this.state = 233;
	                    this.complexExpression(7);
	                    break;

	                case 2:
	                    localctx = new ComplexExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, hclParser.RULE_complexExpression);
	                    this.state = 234;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 235;
	                    this.match(hclParser.CO);
	                    this.state = 236;
	                    this.index();
	                    this.state = 237;
	                    this.match(hclParser.CF);
	                    break;

	                case 3:
	                    localctx = new ComplexExpressionContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, hclParser.RULE_complexExpression);
	                    this.state = 239;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 240;
	                    this.match(hclParser.POINT);
	                    this.state = 241;
	                    this.index();
	                    break;

	                } 
	            }
	            this.state = 246;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	array() {
	    let localctx = new ArrayContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, hclParser.RULE_array);
	    var _la = 0; // Token type
	    try {
	        this.state = 263;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 247;
	            this.match(hclParser.CO);
	            this.state = 248;
	            this.match(hclParser.CF);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 249;
	            this.match(hclParser.CO);
	            this.state = 250;
	            this.expression();
	            this.state = 255;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 251;
	                    this.match(hclParser.VIRG);
	                    this.state = 252;
	                    this.expression(); 
	                }
	                this.state = 257;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
	            }

	            this.state = 259;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===hclParser.VIRG) {
	                this.state = 258;
	                this.match(hclParser.VIRG);
	            }

	            this.state = 261;
	            this.match(hclParser.CF);
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



	index() {
	    let localctx = new IndexContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, hclParser.RULE_index);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 265;
	        _la = this._input.LA(1);
	        if(!(_la===hclParser.MULT || _la===hclParser.NUMBER)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
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


}

hclParser.EOF = antlr4.Token.EOF;
hclParser.MODULE = 1;
hclParser.DATA = 2;
hclParser.SOURCE = 3;
hclParser.PROVIDER = 4;
hclParser.TERRAFORM = 5;
hclParser.RESOURCE = 6;
hclParser.VARIABLE = 7;
hclParser.OUTPUT = 8;
hclParser.LIST = 9;
hclParser.MAP = 10;
hclParser.OBJECT = 11;
hclParser.CONDITION = 12;
hclParser.ERROR = 13;
hclParser.AO = 14;
hclParser.AF = 15;
hclParser.EQUAL = 16;
hclParser.PO = 17;
hclParser.PF = 18;
hclParser.CO = 19;
hclParser.CF = 20;
hclParser.VIRG = 21;
hclParser.POINT = 22;
hclParser.TIRET = 23;
hclParser.MULT = 24;
hclParser.BOOLEANOP = 25;
hclParser.BOOLEAN = 26;
hclParser.TYPE = 27;
hclParser.IDENTIFIER = 28;
hclParser.STRING = 29;
hclParser.NUMBER = 30;
hclParser.COMMENT = 31;
hclParser.LINE_COMMENT = 32;
hclParser.HAS_COMMENT = 33;
hclParser.WS = 34;
hclParser.OPEN = 35;
hclParser.IDENTIFIERS = 36;
hclParser.WSS = 37;
hclParser.NUMBERS = 38;
hclParser.AUTRE = 39;
hclParser.CLOSE = 40;

hclParser.RULE_file = 0;
hclParser.RULE_directive = 1;
hclParser.RULE_dataDirective = 2;
hclParser.RULE_moduleDirective = 3;
hclParser.RULE_moduleSource = 4;
hclParser.RULE_providerDirective = 5;
hclParser.RULE_terraformDirective = 6;
hclParser.RULE_resourceDirective = 7;
hclParser.RULE_variableDirective = 8;
hclParser.RULE_outputDirective = 9;
hclParser.RULE_name = 10;
hclParser.RULE_providerType = 11;
hclParser.RULE_type = 12;
hclParser.RULE_object = 13;
hclParser.RULE_field = 14;
hclParser.RULE_complexField = 15;
hclParser.RULE_validation = 16;
hclParser.RULE_condition = 17;
hclParser.RULE_expression = 18;
hclParser.RULE_functionCall = 19;
hclParser.RULE_complexExpression = 20;
hclParser.RULE_array = 21;
hclParser.RULE_index = 22;

class FileContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_file;
	}

	directive = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DirectiveContext);
	    } else {
	        return this.getTypedRuleContext(DirectiveContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterFile(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitFile(this);
		}
	}


}



class DirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_directive;
	}

	providerDirective() {
	    return this.getTypedRuleContext(ProviderDirectiveContext,0);
	};

	terraformDirective() {
	    return this.getTypedRuleContext(TerraformDirectiveContext,0);
	};

	resourceDirective() {
	    return this.getTypedRuleContext(ResourceDirectiveContext,0);
	};

	variableDirective() {
	    return this.getTypedRuleContext(VariableDirectiveContext,0);
	};

	outputDirective() {
	    return this.getTypedRuleContext(OutputDirectiveContext,0);
	};

	moduleDirective() {
	    return this.getTypedRuleContext(ModuleDirectiveContext,0);
	};

	dataDirective() {
	    return this.getTypedRuleContext(DataDirectiveContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitDirective(this);
		}
	}


}



class DataDirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_dataDirective;
	}

	DATA() {
	    return this.getToken(hclParser.DATA, 0);
	};

	providerType() {
	    return this.getTypedRuleContext(ProviderTypeContext,0);
	};

	name() {
	    return this.getTypedRuleContext(NameContext,0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	object = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    } else {
	        return this.getTypedRuleContext(ObjectContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterDataDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitDataDirective(this);
		}
	}


}



class ModuleDirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_moduleDirective;
	}

	MODULE() {
	    return this.getToken(hclParser.MODULE, 0);
	};

	name() {
	    return this.getTypedRuleContext(NameContext,0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	moduleSource = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ModuleSourceContext);
	    } else {
	        return this.getTypedRuleContext(ModuleSourceContext,i);
	    }
	};

	object = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    } else {
	        return this.getTypedRuleContext(ObjectContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterModuleDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitModuleDirective(this);
		}
	}


}



class ModuleSourceContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_moduleSource;
	}

	SOURCE() {
	    return this.getToken(hclParser.SOURCE, 0);
	};

	EQUAL() {
	    return this.getToken(hclParser.EQUAL, 0);
	};

	STRING() {
	    return this.getToken(hclParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterModuleSource(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitModuleSource(this);
		}
	}


}



class ProviderDirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_providerDirective;
	}

	PROVIDER() {
	    return this.getToken(hclParser.PROVIDER, 0);
	};

	name() {
	    return this.getTypedRuleContext(NameContext,0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	object() {
	    return this.getTypedRuleContext(ObjectContext,0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterProviderDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitProviderDirective(this);
		}
	}


}



class TerraformDirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_terraformDirective;
	}

	TERRAFORM() {
	    return this.getToken(hclParser.TERRAFORM, 0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	object = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    } else {
	        return this.getTypedRuleContext(ObjectContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterTerraformDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitTerraformDirective(this);
		}
	}


}



class ResourceDirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_resourceDirective;
	}

	RESOURCE() {
	    return this.getToken(hclParser.RESOURCE, 0);
	};

	providerType() {
	    return this.getTypedRuleContext(ProviderTypeContext,0);
	};

	name() {
	    return this.getTypedRuleContext(NameContext,0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	object() {
	    return this.getTypedRuleContext(ObjectContext,0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterResourceDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitResourceDirective(this);
		}
	}


}



class VariableDirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_variableDirective;
	}

	VARIABLE() {
	    return this.getToken(hclParser.VARIABLE, 0);
	};

	name() {
	    return this.getTypedRuleContext(NameContext,0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	object = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    } else {
	        return this.getTypedRuleContext(ObjectContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterVariableDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitVariableDirective(this);
		}
	}


}



class OutputDirectiveContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_outputDirective;
	}

	OUTPUT() {
	    return this.getToken(hclParser.OUTPUT, 0);
	};

	name() {
	    return this.getTypedRuleContext(NameContext,0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	object = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ObjectContext);
	    } else {
	        return this.getTypedRuleContext(ObjectContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterOutputDirective(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitOutputDirective(this);
		}
	}


}



class NameContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_name;
	}

	STRING() {
	    return this.getToken(hclParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitName(this);
		}
	}


}



class ProviderTypeContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_providerType;
	}

	STRING() {
	    return this.getToken(hclParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterProviderType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitProviderType(this);
		}
	}


}



class TypeContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_type;
	}

	TYPE() {
	    return this.getToken(hclParser.TYPE, 0);
	};

	LIST() {
	    return this.getToken(hclParser.LIST, 0);
	};

	PO() {
	    return this.getToken(hclParser.PO, 0);
	};

	type() {
	    return this.getTypedRuleContext(TypeContext,0);
	};

	PF() {
	    return this.getToken(hclParser.PF, 0);
	};

	MAP() {
	    return this.getToken(hclParser.MAP, 0);
	};

	OBJECT() {
	    return this.getToken(hclParser.OBJECT, 0);
	};

	object() {
	    return this.getTypedRuleContext(ObjectContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitType(this);
		}
	}


}



class ObjectContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_object;
	}

	complexField = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ComplexFieldContext);
	    } else {
	        return this.getTypedRuleContext(ComplexFieldContext,i);
	    }
	};

	field = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldContext);
	    } else {
	        return this.getTypedRuleContext(FieldContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterObject(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitObject(this);
		}
	}


}



class FieldContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_field;
	}

	IDENTIFIER() {
	    return this.getToken(hclParser.IDENTIFIER, 0);
	};

	EQUAL() {
	    return this.getToken(hclParser.EQUAL, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterField(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitField(this);
		}
	}


}



class ComplexFieldContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_complexField;
	}

	IDENTIFIER() {
	    return this.getToken(hclParser.IDENTIFIER, 0);
	};

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	object() {
	    return this.getTypedRuleContext(ObjectContext,0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterComplexField(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitComplexField(this);
		}
	}


}



class ValidationContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_validation;
	}

	AO() {
	    return this.getToken(hclParser.AO, 0);
	};

	CONDITION() {
	    return this.getToken(hclParser.CONDITION, 0);
	};

	EQUAL = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(hclParser.EQUAL);
	    } else {
	        return this.getToken(hclParser.EQUAL, i);
	    }
	};


	ERROR() {
	    return this.getToken(hclParser.ERROR, 0);
	};

	STRING() {
	    return this.getToken(hclParser.STRING, 0);
	};

	AF() {
	    return this.getToken(hclParser.AF, 0);
	};

	condition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    } else {
	        return this.getTypedRuleContext(ConditionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterValidation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitValidation(this);
		}
	}


}



class ConditionContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_condition;
	}

	STRING() {
	    return this.getToken(hclParser.STRING, 0);
	};

	NUMBER() {
	    return this.getToken(hclParser.NUMBER, 0);
	};

	BOOLEAN() {
	    return this.getToken(hclParser.BOOLEAN, 0);
	};

	BOOLEANOP() {
	    return this.getToken(hclParser.BOOLEANOP, 0);
	};

	functionCall() {
	    return this.getTypedRuleContext(FunctionCallContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterCondition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitCondition(this);
		}
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_expression;
	}

	NUMBER() {
	    return this.getToken(hclParser.NUMBER, 0);
	};

	BOOLEAN() {
	    return this.getToken(hclParser.BOOLEAN, 0);
	};

	array() {
	    return this.getTypedRuleContext(ArrayContext,0);
	};

	complexExpression() {
	    return this.getTypedRuleContext(ComplexExpressionContext,0);
	};

	STRING() {
	    return this.getToken(hclParser.STRING, 0);
	};

	type() {
	    return this.getTypedRuleContext(TypeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitExpression(this);
		}
	}


}



class FunctionCallContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_functionCall;
	}

	IDENTIFIER() {
	    return this.getToken(hclParser.IDENTIFIER, 0);
	};

	PO() {
	    return this.getToken(hclParser.PO, 0);
	};

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	PF() {
	    return this.getToken(hclParser.PF, 0);
	};

	VIRG = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(hclParser.VIRG);
	    } else {
	        return this.getToken(hclParser.VIRG, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterFunctionCall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitFunctionCall(this);
		}
	}


}



class ComplexExpressionContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_complexExpression;
	}

	IDENTIFIER() {
	    return this.getToken(hclParser.IDENTIFIER, 0);
	};

	OPEN() {
	    return this.getToken(hclParser.OPEN, 0);
	};

	CLOSE() {
	    return this.getToken(hclParser.CLOSE, 0);
	};

	IDENTIFIERS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(hclParser.IDENTIFIERS);
	    } else {
	        return this.getToken(hclParser.IDENTIFIERS, i);
	    }
	};


	AUTRE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(hclParser.AUTRE);
	    } else {
	        return this.getToken(hclParser.AUTRE, i);
	    }
	};


	WSS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(hclParser.WSS);
	    } else {
	        return this.getToken(hclParser.WSS, i);
	    }
	};


	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(hclParser.STRING);
	    } else {
	        return this.getToken(hclParser.STRING, i);
	    }
	};


	complexExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ComplexExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ComplexExpressionContext,i);
	    }
	};

	functionCall() {
	    return this.getTypedRuleContext(FunctionCallContext,0);
	};

	POINT() {
	    return this.getToken(hclParser.POINT, 0);
	};

	CO() {
	    return this.getToken(hclParser.CO, 0);
	};

	index() {
	    return this.getTypedRuleContext(IndexContext,0);
	};

	CF() {
	    return this.getToken(hclParser.CF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterComplexExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitComplexExpression(this);
		}
	}


}



class ArrayContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_array;
	}

	CO() {
	    return this.getToken(hclParser.CO, 0);
	};

	CF() {
	    return this.getToken(hclParser.CF, 0);
	};

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	VIRG = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(hclParser.VIRG);
	    } else {
	        return this.getToken(hclParser.VIRG, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterArray(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitArray(this);
		}
	}


}



class IndexContext extends antlr4.ParserRuleContext {

	constructor(parser, parent, invokingState) {
		if(parent===undefined) {
			parent = null;
		}
		if(invokingState===undefined || invokingState===null) {
			invokingState = -1;
		}
		super(parent, invokingState);
		this.parser = parser;
		this.ruleIndex = hclParser.RULE_index;
	}

	NUMBER() {
	    return this.getToken(hclParser.NUMBER, 0);
	};

	MULT() {
	    return this.getToken(hclParser.MULT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.enterIndex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof hclParserListener ) {
	        listener.exitIndex(this);
		}
	}


}




hclParser.FileContext = FileContext; 
hclParser.DirectiveContext = DirectiveContext; 
hclParser.DataDirectiveContext = DataDirectiveContext; 
hclParser.ModuleDirectiveContext = ModuleDirectiveContext; 
hclParser.ModuleSourceContext = ModuleSourceContext; 
hclParser.ProviderDirectiveContext = ProviderDirectiveContext; 
hclParser.TerraformDirectiveContext = TerraformDirectiveContext; 
hclParser.ResourceDirectiveContext = ResourceDirectiveContext; 
hclParser.VariableDirectiveContext = VariableDirectiveContext; 
hclParser.OutputDirectiveContext = OutputDirectiveContext; 
hclParser.NameContext = NameContext; 
hclParser.ProviderTypeContext = ProviderTypeContext; 
hclParser.TypeContext = TypeContext; 
hclParser.ObjectContext = ObjectContext; 
hclParser.FieldContext = FieldContext; 
hclParser.ComplexFieldContext = ComplexFieldContext; 
hclParser.ValidationContext = ValidationContext; 
hclParser.ConditionContext = ConditionContext; 
hclParser.ExpressionContext = ExpressionContext; 
hclParser.FunctionCallContext = FunctionCallContext; 
hclParser.ComplexExpressionContext = ComplexExpressionContext; 
hclParser.ArrayContext = ArrayContext; 
hclParser.IndexContext = IndexContext; 
