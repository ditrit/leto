/*import { parse } from "./TextualPart/index.js";
import { prog } from "./TextualPart/model.js"

console.log('TEST :\n')

let modelIntermediaire = {}

parse(`nodeType test {};
nodeType testsupp{};
nodeType database derived_from test{};
nodeType server {};
nodeType bdd derived_from database {logo : test/test.txt};
nodeTemplate testsupp type bdd;
nodeTemplate db type bdd;
nodeTemplate serv type server;
nodeTemplate serv2 type server;
relationshipType testsupp derived_from server;
relationshipType ser derived_from server;
relationshipType der derived_from server;
relationship serv -> db type ser;
relationship serv2 -> db type der;
`, modelIntermediaire) 

console.log('\nTEST MODIFICATION :\n')
parse(`nodeType test2 {};
nodeType database derived_from test2{};
nodeType server derived_from test2{};
nodeType bdd derived_from database {logo : test/test.txt};
nodeTemplate db type bdd;
nodeTemplate serv type test2;
nodeTemplate serv2 type server;
relationshipType ser derived_from database;
relationshipType der derived_from server;
relationship serv -> serv2 type der;
relationship serv2 -> db type ser;`, modelIntermediaire)*/