import { parse } from "./TextualPart/index.js";

console.log('TEST :\n')
parse(`nodeType test {};
nodeType database derived_from test{};
nodeType server {};
nodeType bdd derived_from database {logo : test/test.txt};

nodeTemplate db type bdd;
nodeTemplate serv type server;
nodeTemplate serv2 type server;

relationshipType ser derived_from server;
relationshipType der derived_from server;

relationship serv -> db type ser;
relationship serv2 -> db type der;
`) 

/*
console.log('TEST 2 :\n')
parse(`
nodeType server {};
nodeType server derived_from database {logo : test/test.txt};

nodeTemplate db type bdd;   
nodeTemplate serv type server;

relationshipType ser derived_from database;

//relationship serv -> db type ser;
`) */
