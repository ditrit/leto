basedir=process.cwd()

app = require(basedir + '/index.js')

describe("Tosca Scalar-Units ->", function() {

    describe("scalar-units.size : ", function() {

        it("simple integer value",
            function() { expect(  app.parse_test('4 kB', 'size').nodes.canonic ).toEqual(4000) })

        it("signed integer value with lot of spaces...",
            function() { expect(  app.parse_test('-4    KiB', 'size').nodes.canonic ).toEqual(-4096) })

        it("signed float value...",
            function() { expect( app.parse_test('+4323.56    KiB', 'size').nodes.canonic ).toEqual(4427325.44) })

        it("bad value ...",
            function() { expect( () => app.parse_test('+34.4e GB', 'size' ) ).toThrow() })

        it("bad unit ...",
            function() { expect( () => app.parse_test('3 gb', 'size' ) ).toThrow() })

        it("using long type name",
            function() { expect(  app.parse_test('44 kB', 'scalar-unit.size').nodes.canonic ).toEqual(44000) })

    })

    describe("scalar-units.time : ", function() {

        it("simple integer value",
            function() { expect(  app.parse_test('44 s', 'time').nodes.canonic ).toEqual(44) })

        it("signed integer value with lot of spaces...",
            function() { expect(  app.parse_test('-4    h', 'time').nodes.canonic ).toEqual(-14400) })

        it("signed float value...",
            function() { expect( app.parse_test('+4323.21    ms', 'time').nodes.canonic ).toEqual(4.32321) })

        it("bad value ...",
            function() { expect( () => app.parse_test('+34.4e s', 'time' ) ).toThrow() })

        it("bad unit ...",
            function() { expect( () => app.parse_test('3 H', 'time' ) ).toThrow() })

        it("using long type name",
            function() { expect(  app.parse_test('44 s', 'scalar-unit.time').nodes.canonic ).toEqual(44) })

    })

    describe("scalar-units.frequency : ", function() {

        it("simple integer value",
            function() { expect(  app.parse_test('44 Hz', 'frequency').nodes.canonic ).toEqual(44) })

        it("signed integer value with lot of spaces...",
            function() { expect(  app.parse_test('-4    kHz', 'frequency').nodes.canonic ).toEqual(-4000) })

        it("signed float value...",
            function() { expect( app.parse_test('+4.32    GHz', 'frequency').nodes.canonic ).toEqual(4320000000) })

        it("bad value ...",
            function() { expect( () => app.parse_test('+34.4e Hz', 'frequency' ) ).toThrow() })

        it("bad unit ...",
            function() { expect( () => app.parse_test('3 H', 'frequency' ) ).toThrow() })

        it("using long type name",
            function() { expect(  app.parse_test('44 Hz', 'scalar-unit.frequency').nodes.canonic ).toEqual(44) })
            

    })

})
