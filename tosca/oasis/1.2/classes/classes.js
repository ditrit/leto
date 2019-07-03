class TString extends String {
    constructor(args) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TInteger extends Number {
    constructor(args) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TFloat  extends Number {
    constructor(args) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TNamespace extends String {
    constructor(args) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TRange {
    constructor(args) {
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
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
    toTosca(imbric=0) {
        let indent = "\n" + "  ".repeat(imbric)
        let str = ""
        this.args.forEach(
            function(value, key, map) {
                str += `${indent}${key}: ${value.toTosca(imbric + 1)}`
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
    toTosca(imbric) {
        return this
    }
}
class TSize {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TTime {
    constructor(args) {
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TFreq {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TBitrate {
    constructor(args) {
        this.range = args.range 

    }
    toTosca(imbric) {
        return this
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
        this.minor = minor
        this.fix   = fix
        this.qualifier = qualifier
        this.build = build
    }

    toTosca(imbric=0) {
        return `${this.major}${this.minor}${this.fix}${this.qualifier}${this.build}`
    }
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

    parse() {
        console.log(`parsing de : ${this.file}`)
        return this.toTosca()
    }

    toTosca(imbric=0) {
        let indent = '\n' + '  '.repeat(imbric)
        let str = ""
        if (this.label) str += `${indent}${this.label}:` 
        str += `${indent}  file: ${this.file}`
        if (this.repository) str += `${indent}  repository: ${this.repository}`
        if (this.namespace_prefix) str += `${indent}  namespace_prefix: ${this.namespace_prefix}`
        if (this.namespace_uri) str += `${indent}  namespace_uri: ${this.namespace_uri}`
        return str
    }
}

class TList extends Array {
    constructor(args){
        super(...args)
        this.range = args.range
    }
    toTosca(imbric) {
        let indent = '\n' + '  '.repeat(imbric)
        let str = ""
        this.forEach(
            function(value) { 
                str += `${value.toTosca(imbric + 1)}`
            })
        return str
    }
}

class TConstraint {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}

class TProperty {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TPropertyAssignment {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TAttribute {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TAttributeAssignement {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInput {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class Toutput {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRepository {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TArtifactDef {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TArtifactType {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TImplementation {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TOperationDef {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TOperationDefTemplate {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDef {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDefTemplate {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityType {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityDef {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityAssignment {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TPropertyFilter {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityFilter {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TNodeFilter {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRequirementDef {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRequirementAssignment {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TSubstitutionMappings {
    constructor(args) {
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TTopologyTemplate {
    constructor(args) {
        this.range = args.range

    }
    toTosca(iimbric=0) {
        return this
    }
}
class TServiceTemplate {
    constructor(args) {
        this.args = args
        this.range = args.range
        this.imported=[]
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

    toTosca(imbric=0) { 
        let indent = '\n' + '  '.repeat(imbric)
        let str = ""
        this.args.forEach(
            function(value, key, map) { 
                str += (value) ? `${indent}${key}: ${value.toTosca(imbric + 1)}` : ''
            })
        return str
    }

    doImports() {
        for (let one_import of this.imports) {
            this.imported.push(one_import.parse())
        }
        return this.imported
    }
}

const classes = {
    TString,
    TInteger,
    TFloat,
    TList,
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

