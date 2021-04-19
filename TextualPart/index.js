const antlr4 = require("antlr4/index")
const fs = require("fs")
const letoLexer = require("./letoLexer.js")
const letoParser = require("./letoParser.js")
const JSListener = require("./JSListener.js").JSListener

const iName = process.argv[2]
JSListener.tFileName = iName.replace(".leto", ".js")
console.log("Compiling " + iName + " to " + JSListener.tFileName)

var input = fs.readFileSync(iName, 'UTF-8')
var chars = new antlr4.InputStream(input)
var lexer = new letoLexer.letoLexer(chars)
var tokens  = new antlr4.CommonTokenStream(lexer)
var parser = new letoParser.letoParser(tokens)
parser.buildParseTrees = true
var tree = parser.program()

var extractor = new JSListener()
antlr4.tree.ParseTreeWalker.DEFAULT.walk(extractor, tree)