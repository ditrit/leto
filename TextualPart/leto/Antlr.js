import { createServer } from 'http';
import antlr4 from 'antlr4';
const { CommonTokenStream, InputStream } = antlr4;
import letoLexer from './letoLexer.js';
import letoParser from './letoParser.js';
import HtmlletoListener from './HtmlletoListener.js';

createServer((req, res) => {
   
   res.writeHead(200, {
       'Content-Type': 'text/html',        
   });

   res.write('<html><head><meta charset="UTF-8"/></head><body>');
   
   var input = "asset serv is_a server;\n";
   var chars = new InputStream(input, true)   
   var lexer = new letoLexer(chars);
   var tokens  = new CommonTokenStream(lexer);
   var parser = new letoParser(tokens);
      
   parser.buildParseTrees = true;   
   var tree = parser.leto();   
   var htmlleto = new HtmlletoListener(res);
   antlr4.tree.ParseTreeWalker.DEFAULT.walk(htmlleto, tree);
   
   res.write('</body></html>');
   res.end();

}).listen(1337);