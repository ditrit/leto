import { parse } from "./TextualPart/index.js";

console.log('test 1 :')
parse('componant toto{}')

console.log('test 2 :')
parse('componant toto{};')

console.log('test 3 :')
parse(`componant toto {
    
}; 
componant tata{}`)
