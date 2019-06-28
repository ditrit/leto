lidy = require('lidy')

const dsl_def='tosca/oasis/1.2/dsl/tosca_definition.yaml'


// const args = process.argv
// if (args.length != 3) throw( SyntaxError("Usage: node index.js path_to_tosca_file"))
// const tosca_file=args[2]

const tosca_file = 'tosca/oasis/1.2/normative_types/tosca_types.yaml'

let objs = lidy.parse_file(tosca_file, dsl_def, 'service_template')

//console.log(`objs : ${JSON.stringify(objs.args)}`)



