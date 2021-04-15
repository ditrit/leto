/* test 
asset serv is_a server;
asset bdd is_a database;
componant bdd : serv;
asset rout is_a router;
componant rout -> serv;
*/


grammar leto;


/*
*	Regle de l'analyseur
*/


prog 
: (instruction? EOL)+
;

instruction 
: definition | instantiation
;

definition
: (node_type | relationship_type)+ comment? | comment
;

instantiation
: (node | relationship)+ comment? | comment 
;

node_type 
: 'componant' id ((':' | '->') id)?';'
;

//a modifier plus tard
relationship_type 
: 'componant' id ((':' | '->') id)?';'
;

node 
: 'asset' id 'is_a' componant';'
;

//a modifier plus tard
relationship 
: 'asset' id 'is_a' componant';'
;

number 
: NUMBER
;

comment
: COMMENT
;

id 
: ID
;

componant
: COMPONANT
;



/*
*	Regle Lexer 
*/


COMPONANT 
: 'server' | 'router' | 'database' | 'apache' | 'php'
;

ID
: [a-zA-Z][a-z0-9_]*
;

STRINGLITERAL
: '"'~["\r\n]*'"'
;

LETTRE
: ('a'..'z'|'A'..'Z')+
;

NUMBER
: ('0'..'9')+(('e'|'E')NUMBER)*
;

FLOAT
: ('0'..'9')*'.'('0'..'9')+(('e'|'E')('0'..'9')+)*
;

COMMENT
: '//'~[\r\n]*
;

EOL
: '\r'?'\n'
;

WS
: [ \t\r\n]->skip
;