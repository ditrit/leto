const path = require('path')
const lidy = require('lidy')
const classes = require('./tosca/classes/classes.js')

const tosca_config = lidy.parseYaml(null, './tosca/config.yaml').tree

function parse_src(tosca_file, versions = []) {
    // DEBUG filename // console.log(`Fichier : ${tosca_file}` )

    // currentdir for src file
    let path_src = path.dirname(tosca_file)

    // parse source - first step (yaml parsing)
    let info = lidy.parse_src_yaml({}, tosca_file)

    // extract tosca definition file from source 
    const dsl_version = info && info.src_tree && info.src_tree.get('tosca_definitions_version')
    const dsl_def_file = `tosca/${dsl_version}/dsl/tosca_definition.yaml`

    // parse tosca definition file
    info = lidy.parse_dsl_def(info, dsl_def_file)

    // use Tosca classes
    info.classes  = classes

    // tosca_version information
    info.tosca_prefix =    tosca_config[dsl_version].prefix
    info.tosca_namespace = tosca_config[dsl_version].uri
    info.definitions = []
    info.parameters = []

    // parse source - second step (dsl parsing)
    info = lidy.parse_src_dsl(info, 'service_template')


    // parse import of normative types 
    if ( ! ( versions.includes(dsl_version) ) ) {
        if (dsl_version in tosca_config) {
            versions.push(dsl_version)
            info.nodes.imported.push( { 
                service:    parse_src(`tosca/${dsl_version}/normative_types/tosca_types.yaml`, versions).nodes, 
                namespace:  info.tosca_namespace,
                prefix:     info.tosca_prefix })
        } else throw(`Error : Unknown dsl Tosca version ${dsl_version}`)
    }

    // parse explicit imports
    if (info.nodes && info.nodes.imports) {
        for (const imported of info.nodes.imports) {
            let file_path = (imported.file.startsWith('/') ? imported.file : `${path_src}/${imported.file}`)
            info.nodes.imported.push( { 
                file_path: file_path,
                service: parse_src(file_path.toString(), versions).nodes, 
                namespace: imported.namespace_uri, 
                prefix:    imported.namespace_prefix } ) 
        } 
    }

    // import types with namespace management
    for ( const imported of info.nodes.imported ) {
        info.nodes.all_types.import(imported.service.all_types, imported.namespace, imported.prefix)
        for (const definition of imported.service.definitions) info.nodes.definitions.push(definition)
        for (const parameter  of imported.service.parameters)  info.nodes.parameters.push(parameter)
    }

    // types derivation and resolution (properties, attributes, interfaces, ...)
    info.nodes.all_types.derives_types()
    info.nodes.parameters.forEach(element => element.resolve_data_type_name())
    info.nodes.definitions.forEach(element => element.resolve_definition_type_name()) 
    info.nodes.topology_template && info.nodes.topology_template.resolve_assignment_type_name() 
    return info
}

function parse_test(str, keyword ) {

    // parse source - first step (yaml parsing)
    let info = lidy.parse_src_yaml({}, null, str)

    // extract tosca definition file from source 
    const dsl_version = 'tosca_simple_yaml_1_2'
    const dsl_def_file = `tosca/${dsl_version}/dsl/tosca_definition.yaml`

    // parse tosca definition file
    info = lidy.parse_dsl_def(info, dsl_def_file)

    // use Tosca classes
    info.classes  = classes

    // 
    info.definitions = []
    info.parameters = []

    // parse source - second step (dsl parsing)
    info = lidy.parse_src_dsl(info, keyword)

    return info
}


exports.parse_test=parse_test
exports.parse_src=parse_src

//////////////////////
// source file
//const tosca_file = '/home/resinsec/dev/leto/tests/simple-topology.yaml'
//let res = parse_src(tosca_file)
let res = parse_src('tests/data/custom-relationship-type.yaml')
console.log('fin')

