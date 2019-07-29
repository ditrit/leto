basedir=process.cwd()

app = require(basedir + '/index.js')

describe("Tosca Constraints ->", function() {

    describe("equal constraint : ", function() {

        it("simple integer comparaison",
            function() { expect(  app.parse_test('{ equal: 4}', 'constraint').nodes.eval(4)).toBeTruthy() })

    })
    
    describe("greater_than constraint : ", function() {

        it("float comparaison",
            function() { expect(  app.parse_test('{ greater_than: 5.78}', 'constraint').nodes.eval(6)).toBeTruthy() })
    })


    describe("greater_or_equal constraint : ", function() {

        it("scalar-unit comparaison",
            function() { expect(  app.parse_test('{ greater_or_equal: 4 B}', 'constraint').nodes.eval(4)).toBeTruthy() })
    })

    describe("less_than constraint : ", function() {

        it("scalar-unit comparaison",
            function() { expect(  app.parse_test('{ less_than: 1 m}', 'constraint').nodes.eval(59)).toBeTruthy() })
    })

    describe("less_or_equal constraint : ", function() {

        it("string comparaison",
            function() { expect(  app.parse_test('{ less_or_equal: togodo}', 'constraint').nodes.eval("tagada")).toBeTruthy() })
    })

    describe("in_range constraint : ", function() {

        it("scalar-units comparaison",
            function() { expect(  app.parse_test('{ in_range: [ 1 m, 1 h ] }', 'constraint').nodes.eval(120)).toBeTruthy() })
    })

    describe("valid_values constraint : ", function() {

        it("list of string comparaison",
            function() { expect(  app.parse_test('{ valid_values: [ alpha, beta, gamma, delta ] }', 'constraint').nodes.eval("beta")).toBeTruthy() })
    })

    describe("length constraint : ", function() {

        it("string comparaison",
            function() { expect(  app.parse_test('{ length: 4 }', 'constraint').nodes.eval("azer")).toBeTruthy() })
    })

    describe("min_length constraint : ", function() {

        it("string comparaison",
            function() { expect(  app.parse_test('{ min_length: 2 }', 'constraint').nodes.eval("zeertyui")).toBeTruthy() })
    })

    describe("max_length constraint : ", function() {

        it("string comparaison",
            function() { expect(  app.parse_test('{ max_length: 2 }', 'constraint').nodes.eval("ok")).toBeTruthy() })
    })

    describe("pattern constraint : ", function() {

        it("simple comparaison",
            function() { expect(  app.parse_test('{ pattern: test }', 'constraint').nodes.eval("this test if ok")).toBeTruthy() })
    })

    describe("set of constraints : ", function() {

        it("simple comparaison",
            function() { expect(  app.parse_test(`
- pattern: test
- min_length: 10
`, 'constraints').nodes.eval("this test if ok")).toBeTruthy() })
    })


})
