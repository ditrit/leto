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
: 'nodeType' id ('derived_from' id)? ' {' clausesNodeType '}'
;

clausesNodeType 
: (('properties {' propertiesNodeType '}') 
| ('capabilities {' capabilitiesNodeType '}')
| ('requirements {' requirementsNodeType '}') )*
;

propertiesNodeType
: propertyNodeType (',' propertyNodeType)* ','?
;

propertyNodeType
: id ' : ' baseTypes
;

capabilitiesNodeType
: capabilityNodeType (',' capabilityNodeType)* ','?
;

capabilityNodeType
: id ' : ' id 
;

requirementsNodeType
: requirementNodeType (',' requirementNodeType)* ','?
;

requirementNodeType
: id ' : ' id 
;

nodeTemplate 
: 'nodeTemplate' id 'type' id ' {' clausesNodeTemplate '}'
;

clausesNodeTemplate
: (('properties {' propertiesNodeTemplate '}')
| ('requirements {' requirementsNodeTemplate '}'))*
;

propertiesNodeTemplate
: propertyNodeTemplate (',' propertyNodeTemplate)* ','?
;

propertyNodeTemplate
: id ' : ' id
;

requirementsNodeTemplate
: requirementNodeTemplate (',' requirementNodeTemplate)* ','?
;

requirementNodeTemplate
: id ' : ' id 
;

comment
: COMMENT
;

id 
: ID
;

baseTypes
: 'integer' | 'float' | 'boolean' | 'string'
;

/*
*	Regle Lexer 
*/
ID
: ('a'..'z'|'A'..'Z'|'0'..'9'|[_".])+
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
: [ \t\r\n"]->skip
;