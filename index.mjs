import { parse } from "./TextualPart/index.js";


console.log('TEST :')
parse(`
componant bdd : serv {logo : test/test.txt};
asset toto : bdd;
relationship tutu : serv;
relationship tata : serv;
relationship titi : serv;
link tutu -> tata : der;
link tutu -> titi : der;
`)
/*
console.log('TEST 2 :')
parse(`
componant test {};
componant test {logo : test/text.txt};
asset toto : titi;

relationship tutu : serv
relationship tutu : rout;
link tutu -> test : der;
`)
*/