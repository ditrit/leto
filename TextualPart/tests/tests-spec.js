import { letoModel } from '../letoModel.js'

let leto = new letoModel()

describe("Leto TextualPart -> ", function() {

    describe("test nodeType : ", function() {
        it("erreur", 
            function () {expect(leto.parse(`nodeType database {};`).prog.nodeTypes[0].getChild(0).value).toEqual('database')})
    })
})