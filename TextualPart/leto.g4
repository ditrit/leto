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
: nodeType | relationshipType
;

instantiation
: nodeTemplate | relationship
;

nodeType 
: 'nodeType' id ('derived_from' id)? '{' properties '}'
;

properties
: property (';' property)* ';'?  comment?
| comment?
;

property
: logo 
;

logo
: 'logo' ':' PATH 
;

relationshipType
: 'relationshipType' id ('derived_from' id)?
;

nodeTemplate 
: 'nodeTemplate' id 'type' id 
;

relationship 
: 'relationship'  id '->' id 'type' id
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
