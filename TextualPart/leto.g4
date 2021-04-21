/* test 1
componant serv (from server); //test
componant bdd (from database);
componant rout (from router);
asset bdd : serv;
link rout -> serv;
*/
/* test 2
componant serv (from server); componant bdd (from database);
componant rout (from router);
asset bdd : serv; link rout -> serv;
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
: (componant | relationship)+ comment? | comment
;

instantiation
: (asset | link)+ comment? | comment 
;

componant 
: 'componant' id ('from' id)?';'
;

relationship
: 'relationship' id ('from' id)?';'
;

asset 
: 'asset' id ':' id ';'
;

link 
: 'link' id '-' id';'
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

/*
*	Regle Lexer 
*/

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