import { parse } from "./TextualPart/index.js";

console.log('test :')
parse(`componant toto from serv {logo : test/test.txt; host : test};  
componant tutu {logo : test/test.txt; host : test, test2};
relationship titi from tata
link tata - test;
link tutu - serv;
asset bdd : titi`)
/*
console.log('test 2 :')
parse(`componant toto from serv {}`)

console.log('test 3 :')
parse(`componant toto {logo : test/test.txt; host : test};`)

console.log('test 4 :')
parse(`componant toto {};`)

console.log('test 5 :')
parse(`componant toto {logo : test/test.txt; host : test}; link toto - test; asset bdd : titi`)

console.log('test 6 :')
parse(`componant toto {logo : test/test.txt; host : test, test2};`)

console.log('test 7 :')
parse(`componant test {}; asset testi : toto`)
*/