class TString extends String {
    constructor(args) {
        super(args)
        this.range = args.range
    }
}
class TInteger extends Number {
    constructor(args) {
        super(args)
        this.range = args.range
    }
}
class TFloat  extends Number {
    constructor(args) {
        super(args)
        this.range = args.range
    }
}
class TNamespace extends String {
    constructor(args) {
        super(args)
        this.range = args.range
    }
}
class TRange {
    constructor(args) {
        this.range = args.range
    }
}

class TMetadata {
    constructor(args) {
        this.args = args
        this.range = args.range
        let metadata = this
        args.forEach(
            function(value, key, map) {
                metadata[key] = value
            }
        )
    }

    toString() {
        let str = `TMetadata`
        this.args.forEach(
            function(value, key, map) {
                str += `
                ${key}: ${value}`
            }
        ) 
        return str
    }
}
class TUrl extends String {
    constructor(args) {
        super(args)
        this.range = args.range
    }
}
class TSize {
    constructor(args) {
        this.range = args.range

    }
}
class TTime {
    constructor(args) {
        this.range = args.range
    }
}
class TFreq {
    constructor(args) {
        this.range = args.range

    }
}
class TBitrate {
    constructor(args) {
        this.range = args.range 

    }
}

class TVersion extends String {
    constructor(args) {
        let range = args.range
        let version_parts = args.split(/\.|-/)
        let major = version_parts[0] || 0
        let minor = "." + (version_parts[1] || 0)
        let fix   = "." + (version_parts[2] || 0)
        let qualifier = (version_parts[3]) ? "." + version_parts[3] : ""
        let build = (version_parts[4]) ? "-" + version_parts[4] : ""
        super(`${major}${minor}${fix}${qualifier}${build}`)
        this.range = range
        this.major = major
        this.fix   = fix
        this.qualifier = qualifier
        this.build = build
    }

//    toString() {
//        return `${this.major}${this.minor}${this.fix}${this.qualifier}${this.build}`
//    }
}

class TImport {
    constructor(args) { 
        this.range = args.range
        this.label = null
        this.repository = null
        this.namespace_prefix = null
        this.namespace_uri = null
        let cthis = this
        if (args instanceof TString) {
            cthis.file = args
        } else if (args instanceof Map) {
            args.forEach( function(val, key, map) {
                cthis.label = key
                if (val instanceof TString) {
                    cthis.file = val
                } else if (val instanceof Map) {
                    cthis.file = val.get('file')
                    cthis.repository = val.get('repository')
                    cthis.namespace_prefix = val.get('namespace_prefix')
                    cthis.namespace_uri = val('namespace_uri')
                }
            })
        }
    }

    toString() {
        let str = 'TImport {'
        if (this.label) str += `
        ${this.label}:` 
        str += `
        file: ${this.file}`
        if (this.repository) str += `
        repository: ${this.repository}`
        if (this.namespace_prefix) str += `
        repository: ${this.namespace_prefix}`
        if (this.namespace_uri) str += `
        repository: ${this.namespace_uri}`
        return str + '}'
    }
}

class TConstraint {
    constructor(args) {
        this.range = args.range

    }
}
class TProperty {
    constructor(args) {
        this.range = args.range

    }
}
class TPropertyAssignment {
    constructor(args) {
        this.range = args.range

    }
}
class TAttribute {
    constructor(args) {
        this.range = args.range

    }
}
class TAttributeAssignement {
    constructor(args) {
        this.range = args.range

    }
}
class TInput {
    constructor(args) {
        this.range = args.range

    }
}
class Toutput {
    constructor(args) {
        this.range = args.range

    }
}
class TRepository {
    constructor(args) {
        this.range = args.range

    }
}
class TArtifactDef {
    constructor(args) {
        this.range = args.range

    }
}
class TArtifactType {
    constructor(args) {
        this.range = args.range

    }
}
class TImplementation {
    constructor(args) {
        this.range = args.range

    }
}
class TOperationDef {
    constructor(args) {
        this.range = args.range

    }
}
class TOperationDefTemplate {
    constructor(args) {
        this.range = args.range

    }
}
class TInterfaceDef {
    constructor(args) {
        this.range = args.range

    }
}
class TInterfaceDefTemplate {
    constructor(args) {
        this.range = args.range

    }
}
class TCapabilityType {
    constructor(args) {
        this.range = args.range

    }
}
class TCapabilityDef {
    constructor(args) {
        this.range = args.range

    }
}
class TCapabilityAssignment {
    constructor(args) {
        this.range = args.range

    }
}
class TPropertyFilter {
    constructor(args) {
        this.range = args.range

    }
}
class TCapabilityFilter {
    constructor(args) {
        this.range = args.range

    }
}
class TNodeFilter {
    constructor(args) {
        this.range = args.range

    }
}
class TRequirementDef {
    constructor(args) {
        this.range = args.range

    }
}
class TRequirementAssignment {
    constructor(args) {
        this.range = args.range

    }
}
class TSubstitutionMappings {
    constructor(args) {
        this.range = args.range

    }
}
class TTopologyTemplate {
    constructor(args) {
        this.range = args.range

    }
}
class TServiceTemplate {
    constructor(args) {
        this.args = args
        this.range = args.range
        if ( ! this.args.get('namespace') ) {
            this.args.set('namespace', new TUrl("http://doc.leto.org/tosca"))
        }
    }

    get description() { return this.args.get('description') }
    get tosca_definitions_version() { return this.args.get('tosca_definitions_version') }
    get namespace() { return this.args.get('namespace') }
    get metadata() { return this.args.get('metadata') }
    get repositories() { return this.args.get('repositories') }
    get imports() { return this.args.get('imports') }
    get artifact_types() { return this.args.get('artifact_types') }
    get data_types() { return this.args.get('data_types') }
    get capability_types() { return this.args.get('capability_types') }
    get interface_types() { return this.args.get('interface_types') }
    get relationship_types() { return this.args.get('relationship_types') }
    get node_types() { return this.args.get('node_types') }
    get group_types() { return this.args.get('group_types') }
    get policy_types() { return this.args.get('policy_types') }
    get topology_template() { return this.args.get('topology_template') }

    toString() {        
        let str = `TServiceTemplate`
        this.args.forEach(
            function(value, key, map) {
                str += (value) ? `
                ${key}: ${value}` : ''
            })
        return str
    }
}

const classes = {
    TString,
    TInteger,
    TFloat,
    TNamespace,
    TRange,
    TMetadata,
    TUrl,
    TSize,
    TTime,
    TFreq,
    TBitrate,
    TVersion,
    TImport,
    TConstraint,
    TProperty,
    TPropertyAssignment,
    TAttribute,
    TAttributeAssignement,
    TInput,
    Toutput,
    TRepository,
    TArtifactDef,
    TArtifactType,
    TImplementation,
    TOperationDef,
    TOperationDefTemplate,
    TInterfaceDef,
    TInterfaceDefTemplate,
    TCapabilityType,
    TCapabilityDef,
    TCapabilityAssignment,
    TPropertyFilter,
    TCapabilityFilter,
    TNodeFilter,
    TRequirementDef,
    TRequirementAssignment,
    TSubstitutionMappings,
    TTopologyTemplate,
    TServiceTemplate
}

module.exports = classes

