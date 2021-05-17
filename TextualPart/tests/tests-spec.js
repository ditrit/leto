import { letoModel } from '../letoModel.js'

let leto = new letoModel()
leto.parse(`nodeType test {logo : test/test.txt};
nodeType testsupp {};
nodeType database derived_from test {};
nodeType server {};
nodeType bdd derived_from database {logo : test/test.txt};
nodeTemplate testsuppr type bdd;
nodeTemplate db type bdd;
nodeTemplate serv type server;
nodeTemplate serv2 type server;
relationshipType testsupp derived_from server;
relationshipType ser derived_from server;
relationshipType der derived_from server;
relationship serv -> db type ser;
relationship serv2 -> db type der;
`) 

console.log('\nTEST MODIFICATION :\n')
leto.parse(`nodeType test2 {};
nodeType database derived_from test2{};
nodeType server derived_from test2{};
nodeType bdd derived_from database {logo : test/test.txt};
nodeTemplate db type bdd;
nodeTemplate serv type test2;
nodeTemplate serv2 type server;
relationshipType ser derived_from database;
relationshipType der derived_from server;
relationship serv -> serv2 type der;
relationship serv2 -> db type ser;`)

console.log('\nTEST MODIFICATION :\n')
leto.parse(`nodeType test {};
nodeType testsupp {};
nodeType database derived_from test {};
nodeType server {};
nodeType bdd derived_from database {logo : test2/test2.txt};
nodeTemplate testsuppr type bdd;
nodeTemplate db type bdd;
nodeTemplate serv type server;
nodeTemplate serv2 type server;
relationshipType testsupp derived_from server;
relationshipType ser derived_from server;
relationshipType der derived_from server;
relationship serv -> db type ser;
relationship serv2 -> db type der;`)

describe("Leto TextualPart -> ", function() {

    describe("test nodeType id : ", function() {
        it("bdd", 
            function () {expect(leto.prog.nodeTypes['bdd'].id).toEqual("bdd")})
    })
    describe("test nodeType parent : ", function() {
        it("bdd", 
            function () {expect(leto.prog.nodeTypes['bdd'].parentName.name).toEqual("database")})
    })
    /*describe("test nodeType properties : ", function() {
        it("bdd", 
            function () {expect(leto.prog.nodeTypes['bdd'].properties).toEqual("[ logo : test2/test2.txt; ]")})
    })*/
})

describe("Leto TextualPart -> ", function() {

    describe("test nodeTemplate id : ", function() {
        it("serv", 
            function () {expect(leto.prog.nodeTemplates['serv'].id).toEqual("serv")})
    })
    describe("test nodeTemplate parent : ", function() {
        it("serv", 
            function () {expect(leto.prog.nodeTemplates['serv'].parentName.name).toEqual("server")})
    })
})

describe("Leto TextualPart -> ", function() {

    describe("test relationshipType id : ", function() {
        it("der", 
            function () {expect(leto.prog.relationshipsTypes['der'].id).toEqual("der")})
    })
    describe("test relationshipType parent : ", function() {
        it("der", 
            function () {expect(leto.prog.relationshipsTypes['der'].parentName.name).toEqual("server")})
    })
})

/*describe("Leto TextualPart -> ", function() {

    describe("test relationship source : ", function() {
        it("serv2", 
            function () {expect(leto.prog.relationships['der'].srcName).toEqual("serv2")})
    })
    describe("test relationship destination : ", function() {
        it("serv2", 
            function () {expect(leto.prog.relationships['der'].dstName).toEqual("db")})
    })
    describe("test relationship relation : ", function() {
        it("serv2", 
            function () {expect(leto.prog.relationships['der'].relName).toEqual("serv")})
    })
})*/