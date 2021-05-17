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
        propertiesNodeType
    '}')? 
    ('capabilities {' 
        capabilitiesNodeType
    '}')? 
    ('requirement {' 
        requirementNodeType 
    '}')?  
'}'
;

propertiesNodeType
: id ':' type (', 'id ':' type)*
;

capabilitiesNodeType
: id ' : ' ('host' | 'connectsTo') (', ' id ' : ' ('host' | 'connectsTo'))*
;

requirementNodeType
: id ':' id (', ' id ':' id )*
;

nodeTemplate 
: 'nodeTemplate' id 'type' id '{'
    ('properties {'
        propertiesNodeTemplate
    '}')?
    ('requirement {' 
        requirementNodeTemplate
    '}')?
'}'
;

propertiesNodeTemplate
: id ':' id (', ' id ':' id)*
;

requirementNodeTemplate
: id ':' id (', ' id ':' id )*
;

comment
: COMMENT
;

id 
: ID
;

type
: integer | number | bool | ('"' string '"') 
;

integer
: INTEGER
;

string 
: STRING
;

number
: FLOAT
;

bool
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

COMMENT
: '//'~[\r\n]*
;

WS
: [ \t\r\n]->skip
;
