/* test 1
componant serv (from server) test/test2/ containers;
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
: line+ 
;

line
: instructions comment? 
| comment
;

instructions
: instruction (';' instruction)* ';'? 
;

instruction 
: definition | instantiation 
;

definition
: componant | relationship
;

instantiation
: asset | link
;

componant 
: 'componant' id ('from' id)? '{' componant_attributes '}'
;

componant_attributes
: componant_attribute (';' componant_attribute)* ';'?  comment?
| comment?
;

componant_attribute
: logo | hosts
;

logo
: 'logo' ':' PATH 
;

hosts
: 'host' ':' ID (',' ID)*  
;

relationship
: 'relationship' id ('from' id)?
;

asset 
: 'asset' id ':' id 
;

link 
: 'link' id '-' id
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
PATH
: ( [a-zA-Z0-9_.-]+ '/' )+ [a-zA-Z0-9_.-]+
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

WS
: [ \t\r\n]->skip
;