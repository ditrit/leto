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
        propertiesNodeType+
    '}')? 
    ('capabilities {' 
        capabilitiesNodeType+
    '}')? 
    ('requirement {' 
        requirementNodeType+
    '}')?  
'}'
;

propertiesNodeType
: id ':' type
;

capabilitiesNodeType
: id ' : ' ('host' | 'connectsTo') 
;

requirementNodeType
: id ':' id 
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
: 'integer' | 'float' | 'boolean' | 'string'
;

/*
*	Regle Lexer 
*/
ID
: [a-zA-Z][a-z0-9_]*
;

FLOAT
: ('0'..'9')*'.'('0'..'9')+(('e'|'E')('0'..'9')+)*
;

STRING
: ('a'..'z'|'A'..'Z')+
;

INTEGER
: ('0'..'9')+
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
