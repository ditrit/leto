import { letoModel } from '../letoModel.js'

let leto = new letoModel()
leto.parse(`nodeType database {};`)

describe("Leto TextualPart -> ", function() {

    describe("test nodeType : ", function() {
        it("erreur", 
            function () {expect(leto.toString()).toEqual(`
    NodeTypes : [object Object]
    NodeTemplates : [object Object]
    RelationshipsTypes : [object Object]
    Relationships : [object Object]
    Version : 1`)})
    })
})