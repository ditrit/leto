const path    = require('path')
const lidy = require('lidy')

function parse_src(tosca_file) {

    // currentdir for src file
    let path_src = path.dirname(tosca_file)

    // parse source - first step (yaml parsing)
    let info = lidy.parse_src_yaml({}, tosca_file)

    // extract tosca definition file from source 
    const dsl_version = info && info.src_tree && info.src_tree.get('tosca_definitions_version')
    const dsl_def_file = `tosca/${dsl_version}/dsl/tosca_definition.yaml`

    // parse tosca definition file
    info = lidy.parse_dsl_def(info, dsl_def_file)

    // parse source - second step (dsl parsing)
    info = lidy.parse_src_dsl(info, 'service_template')


    // parse recursive imports
    if (info.nodes && info.nodes.imports) {
        for (const imported of info.nodes.imports) {
            let file_path = (imported.file.startsWith('/') ? imported.file : `${path_src}/${imported.file}`)
            imported.imported_service = parse_src(file_path.toString())
        } 
    }

    return info
}

// source file
const tosca_file = 'tosca/tosca_simple_yaml_1_2/normative_types/tosca_types.yaml'

// parse 
info = parse_src(tosca_file)

