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

class TBoolean extends Boolean {
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
        this.args = args
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
        let indent = '\n' + '  '.repeat(imbric)
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
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TTime {
    constructor(args) {
        this.args = args
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TFreq {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TBitrate {
    constructor(args) {
        this.args = args
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
        this.args = args
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
        this.args = args
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
                    cthis.namespace_uri = val.get('namespace_uri')
                }
            })
        }
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
        this.args = args
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
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}

class TProperty {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TPropertyAssignment {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TAttribute {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TAttributeAssignement {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInput {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class Toutput {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRepository {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TArtifactDef {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}


class TEntity {
    constructor(args) {
        this.args = args
        this.range = args.range

    }

    get derived_from() { return this.args.get('derived_from') }
    get version() { return this.args.get('version') }
    get metadata() { return this.args.get('metadata') }
    get description() { return this.args.get('description') }

    toTosca(imbric=0) {
        return this
    }    
}

class TDataType extends TEntity{
    constructor(args) {
        super(args)
        this.category = 'datatypes'
    }

    get properties() { return this.args.get('properties') }
    get constraints() { return this.args.get('constraints') }

}

class TArtifactType extends TEntity {
    constructor(args) {
        super(args)
        this.category = 'artifacts'
    }

    get properties() { return this.args.get('properties') }
    get mime_type() { return this.args.get('mime_type') }
    get file_ext() { return this.args.get('file_ext') }
    
}

class TCapabilityType extends TEntity {
    constructor(args) {
        super(args)
        this.category = 'capabilities'
    }

    get properties() { return this.args.get('properties') }
    get attributes() { return this.args.get('attributes') }
    get valid_source_types() { return this.args.get('valid_source_types') }
    get occurences() { return this.args.get('occurrences') }
}

class TNodeType extends TEntity {
    constructor(args) {
        super(args)
        this.category = 'nodes'
    }

    get properties()   { return this.args.get('properties') }
    get attributes()   { return this.args.get('attributes') }
    get occurences()   { return this.args.get('occurrences') }
    get capabilities() { return this.args.get('capabilities') }
    get requirements() { return this.args.get('requirements') }
    get interfaces()   { return this.args.get('interfaces') }
    get workflows()    { return this.args.get('workflows') }
}

class TRelationshipType extends TEntity {
    constructor(args) {
        super(args)
        this.category = 'relationships'
    }

    get properties()   { return this.args.get('properties') }
    get attributes()   { return this.args.get('attributes') }
    get interfaces()   { return this.args.get('interfaces') }
    get workflows()    { return this.args.get('workflows') }
    get valid_target_types() { return this.args.get('valid_target_types') }
}

class TGroupType extends TEntity {
    constructor(args) {
        super(args)
        this.category = 'groups'
    }

    get properties()   { return this.args.get('properties') }
    get capabilities() { return this.args.get('capabilities') }
    get requirements() { return this.args.get('requirements') }
    get interfaces()   { return this.args.get('interfaces') }
    get members()      { return this.args.get('members')}
}

class TPolicyType extends TEntity {
    constructor(args) {
        super(args)
        this.category = 'policies'
    }

    get properties()   { return this.args.get('properties') }
    get target() { return this.args.get('target') }
    get triggers() { return this.args.get('triggers') }
}


class TInterfaceType extends TEntity {
    constructor(args) {
        super(args)
        this.category = 'interfaces'
    }

    get properties() { return this.args.get('properties') }
    getOperation(name) { 
        if (this.args.has(name))
            return this.args.get(name) 
        else return null
    }
}

class TImplementation {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TOperationDef {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TOperationDefTemplate {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDef {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDefTemplate {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityDef {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityAssignment {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TPropertyFilter {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityFilter {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TNodeFilter {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRequirementDef {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRequirementAssignment {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TSubstitutionMappings {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}

class TTopologyTemplate {
    constructor(args) {
        this.args = args
        this.range = args.range

    }
    toTosca(iimbric=0) {
        return this
    }
}

class TType {
    constructor(tname, ttype, namespace) {
        this.category = ttype.category
        this.type = ttype
        this.name = tname
        this.namespace = namespace
    }

    with_namespace(namespace = null) {
        if (this.namespace == namespace) return this
        if (this.namespace && namespace)
            throw(`Error : can not import a type changing explicit namespace`)
        return new TType(this.name, this.type, namespace)
    }

    equals(other) {
        return this.type === other.type && this.namespace == other.namespace && this.name == other.name
    }
}

class TTypes {
    constructor(tnamespace) {
        this.entities = new Map()
        this.prefixies = new Map()
        this.default_namespace = tnamespace
    }

    set(tname, ttype, tnamespace=null) {
        const namespace = (tnamespace) ? tnamespace : this.default_namespace
        if (ttype instanceof TEntity) {
            const exists = this.entities.get(tname)
            if (exists) {
                const category = ttype.category
                if (exists.find( ele => ele.category == category && ele.namespace == namespace )) 
                    throw(`Error : a ${category} '${tname}' already exists for the namespace '${(namespace) ? namespace : 'default' }'}' `)
            } else {
                exists = [] 
            }
            exists.push(new TType(tname, ttype, namespace))
        } else throw(`Error : '${ttype}' is not a Tosca Entity`)
    }

    set_prefix(prefix, namespace) {
        const prefixed_namespace = this.prefixes.get(prefix)
        if (prefixed_namespace != namespace) 
            throw(`Error : the namespace prefix ${prefix} is already used for namespace ${prefixed_namespace}`)
        if (! prefixed_namespace) this.prefixies.set(prefix, namespace)
    }

    import(other, with_namespace, with_prefix) {
        const local_entities = this.entities
        const imported_entities = other.entities
        let new_namespace = imported_entities.default_namesapce || with_namespace

        if (imported_entities.default_namespace && with_namespace && (imported_entities.default_namespace != with_namespace))
            throw(`Error : explicitly defined namespace can not be changed during import`)
        if (with_prefix) {
            if (! new_namespace) throw(`Error : namespace prefix can not be applied to a not named namespace`)
            this.set_prefix(with_prefix, new_namespace)
        }
        imported_entities.forEach(function(imported_ttypes, name, map) {
            let local_ttypes = local_entities.get(name) || []
            for (const ttype of imported_ttypes) {
                new_type = (ttype.namespace) ? ttype : ttype.with_namespace(new_namespace)
                local_ttypes.find(ele => ele.equals(new_type)) || local_ttypes.push(new_type)
            }
            local_entities.set(name, local_ttypes)
        })
    }

    get(id, expected_category=null) {
        const id_eles = id.split('.')
        const default_namespace = this.default_namespace
        let found = null
        if (id_eles > 2) {
            const prefix = id_eles[0]
            const category = id_eles[1]
            const typename = id_eles.slice(2).join('.')
            const namespace = this.prefixies.get(prefix)
            const types = this.entities.get(typename)
            found = (types) ? types.find( ele => ele.category == category && ele.namespace == namespace ) : null
            if ( expected_category && (expected_category != category) ) found = null
        }
        if (!found) {
            found = this.entities.get(typename)
            if (!found) throw(`Error : no ${(expected_category) ? expected_category : ''} type found for id ${id}`)
            if (found.length == 1) return found[0]
            found = found.filter( e => e.category == expected_category )
            if (found.length == 1) return found[0]
            if (found.length == 0) throw(`Error : no ${(expected_category) ? expected_category : ''} type found for id ${id}`)
            found = found.filter( e => e.namespace == default_namespace )
            if (found.length == 1) return found[0]
            if (found.length == 0) throw(`Error : no ${(expected_category) ? expected_category : ''} type found for id ${id}`)
            throw(`Error : several ${(expected_category) ? expected_category : ''} types found for id ${id}`)
        }
    }

    toTosca(imbric=0) { 
        let indent = '\n' + '  '.repeat(imbric)
        let str = ""
        this.entities.forEach(
            function(values, key, map) { 
                if (values) {
                    for (value of values) {
                        str += `${indent}name: ${value.name}, namespace: ${value.namespace}, prefix: ${value.prefix}`
                    }
                }
            })
        return str
    }

}

class TServiceTemplate {
    constructor(args) {
        this.args = args
        this.range = args.range
        this.imported=[]
        this.tosca_entity_types = ['artifact_types', 'data_types', 'capability_types', 'interface_types', 'relationship_types', 'node_types', 'group_types', 'policy_types']
        const entities = new TTYpes(this.args.get('namespace'))
        for (const category of this.tosca_entity_types) {
            this.args.get(category).forEach(function(value, key, map) {
                entities.set(key, value)
            })
        }
        this.entities = entities
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
}


const classes = {
    TString,
    TInteger,
    TBoolean,
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
    TImplementation,
    TOperationDef,
    TOperationDefTemplate,
    TInterfaceDef,
    TInterfaceDefTemplate,
    TCapabilityDef,
    TCapabilityAssignment,
    TPropertyFilter,
    TCapabilityFilter,
    TNodeFilter,
    TRequirementDef,
    TRequirementAssignment,
    TSubstitutionMappings,
    TTopologyTemplate,
    TServiceTemplate,

    TDataType,
    TArtifactType,
    TCapabilityType,
    TInterfaceType,
    TNodeType,
    TRelationshipType,
    TGroupType,
    TPolicyType
}

Object.freeze(classes)

module.exports = classes


