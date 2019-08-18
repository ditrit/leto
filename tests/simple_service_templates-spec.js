basedir=process.cwd()

app = require(basedir + '/index.js')

describe("Simple service template ->", function() {

    describe("Minimal service template : ", function() {

        it("Just load normative types",
            function() { expect(  app.parse_src('tests/data/test.yaml') ) })

    })
    
    describe("Simple topology : ", function() {

        it("One node template",
            function() { expect(  app.parse_src('tests/data/simple-topology.yaml')) })
    })


})
