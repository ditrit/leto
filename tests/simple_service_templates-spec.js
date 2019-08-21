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

    describe("Simple topology with input / outputs: ", function() {

        it("One node template",
            function() { expect(  app.parse_src('tests/data/topology-with-intputs-outputs.yaml')) })
    })

    describe("Simple topology with simple relationship: ", function() {

        it("Mysql DB on compute ",
            function() { expect(  app.parse_src('tests/data/simple-db-on-compute.yaml')) })
    })

    describe("Simple topology with three layers relationships: ", function() {

        it("DB content on Mysql DBMS on compute ",
            function() { expect(  app.parse_src('tests/data/dbcontent-on-db-on-compute.yaml')) })
    })

})

describe("Realistic service templates ->", function() {

        describe("Service templates with multiple relationships : ", function() {
    
            it("Two tier deployment",
                function() { expect(  app.parse_src('tests/data/two-tier-application.yaml') ) })
        })
})
