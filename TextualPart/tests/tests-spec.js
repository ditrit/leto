importe { parse } from '../index.js'

describe("Leto TextualPart -> ", function() {
    describe("test erreur : ", function() {
        it("erreur", 
            function () {expect(parse(`nodeType database derived_from test2{};`).getChild(0).value).toEqual('database')})
    })


})