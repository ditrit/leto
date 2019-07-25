const path    = require('path')
const lidy = require('lidy')
const classes = require('./tosca/classes/classes.js')

const tosca_config = lidy.parseYaml(null, './tosca/config.yaml').tree

function parse_src(tosca_file, versions = []) {
    console.log(`Fichier : ${tosca_file}` )

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

    // parse source - second step (dsl parsing)
    info = lidy.parse_src_dsl(info, 'service_template')

    // parse import of normative types 
    if ( ! ( versions.includes(dsl_version) ) ) {
        if (dsl_version in tosca_config) {
            versions.push(dsl_version)
            info.nodes.imported.push( { 
                service:    parse_src(`tosca/${dsl_version}/normative_types/tosca_types.yaml`, versions).nodes, 
                namespace:  tosca_config[dsl_version].uri,
                prefix:     tosca_config[dsl_version].prefix })
        } else throw(`Error : Unknown dsl Tosca version ${dsl_version}`)
    }

    // parse explicit imports
    if (info.nodes && info.nodes.imports) {
        for (const imported of info.nodes.imports) {
            let file_path = (imported.file.startsWith('/') ? imported.file : `${path_src}/${imported.file}`)
            info.nodes.imported.push( { 
                service: parse_src(file_path.toString(), versions).nodes, 
                namespace: imported.namespace_uri, 
                prefix: imported.namespace_prefix } ) 
        } 
    }

    // import types with namespace management
    for ( const service of info.nodes.imported ) {
        info.nodes.entities.import(service.entities)
    }

    return info
}

// source file
const tosca_file = 'tests/test.yaml'

// parse 
info = parse_src(tosca_file)

