basedir=process.cwd()

app = require(basedir + '/index.js')

describe("Tosca properties ->", function() {

    describe("simple property : ", function() {

        it("simple property with simple type",
            function() { expect(  app.parse_test('type: string}', 'property') ) })

        it("simple property with bad complex type, TTypeDef should throw an error",
            function() { expect(  () => app.parse_test(`
                type: string
                entry_schema:
                  type: integer`, 'property') ).toThrow() })

        it("simple property with complex type, TTypeDef should throw an error",
            function() { expect(  app.parse_test(`
                type: map
                entry_schema:
                  type: list
                  entry_schema: 
                    type: integer`, 'property') ) })
    })

    describe("simple property : ", function() {

        it("simple property with complex type, TTypeDef should throw an error",
            function() { expect(  app.parse_test(`
                description: un type 'complexe' en exemple
                required: true
                default: { un: [ 1, 2 ] }
                status: supported
                metadata:
                  complex: 'true'
                  version: '2'
                type: map
                entry_schema:
                  type: list
                  entry_schema: 
                    type: integer
            `, 'property') ) })
    
    })

})
