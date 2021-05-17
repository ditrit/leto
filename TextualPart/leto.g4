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
: nodeType | nodeTemplate 
;

nodeType 
: 'nodeType' id ('derived_from' id)? '{' 
    ('properties {' 
        id ':' type
        (', 'id ':' type)*
    '}')? 
    ('capabilities {' 
        id ' : ' ('host' | 'connectsTo')
        (', ' id ' : ' ('host' | 'connectsTo'))*
    '}')? 
    ('requirement {' 
        id ':' id
        (', ' id ':' id )* 
    '}')?  
'}'
;

nodeTemplate 
: 'nodeTemplate' id 'type' id '{'
    ('properties {'
        id ':' type 
        (', ' id ':' type)*
    '}')?
    ('requirement {' 
        id ':' id
        (', ' id ':' id )* 
    '}')?
'}'
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

type
: integer | float | boolean | ('"' string '"') 
;

integer
: INTEGER
;

string 
: STRING
;

float
: FLOAT
;

boolean
: 'true' | 'false'
;


/*
*	Regle Lexer 
*/

FLOAT
: ('0'..'9')*'.'('0'..'9')+(('e'|'E')('0'..'9')+)*
;

STRING
: ('a'..'z'|'A'..'Z')+
;

INTEGER
: ('0'..'9')+
;

ID
: [a-zA-Z][a-z0-9_]*
;

STRINGLITERAL
: '"'~["\r\n]*'"'
;

NUMBER
: ('0'..'9')+(('e'|'E')NUMBER)*
;

COMMENT
: '//'~[\r\n]*
;

WS
: [ \t\r\n]->skip
;
