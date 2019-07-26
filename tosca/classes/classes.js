function _locate(info, range) {
    let begin = info.index.fromIndex( (range[0] > 1 ) ? range[0] : 0 )
    let end = info.index.fromIndex( (range[1] > 1 ) ? range[1]  : 0 )
    let loc_str = ` at ${begin.line}:${begin.col} <-> ${end.line}:${end.col} ${(info.filename) ? 'in ' + info.filename : '' }`
    return loc_str
}

class TString extends String {
    constructor(args, info) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TInteger extends Number {
    constructor(args, info) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TBoolean extends Boolean {
    constructor(args, info) {
        super(args)
        this.range = args.range
    }

    toTosca(imbric=0) {
        return this
    }
}

class TFloat  extends Number {
    constructor(args, info) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TNamespace extends String {
    constructor(args, info) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TRange {
    constructor(args, info) {
        this.args = args
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TMetadata {
    constructor(args, info) {
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
    constructor(args, info) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric) {
        return this
    }
}

class TScalarUnit {
    constructor(args, info=null) {
        const fromYaml = (typeof args == 'object') 
        this.args  = args
        this.range = (fromYaml) ? args.range : null 
        this.value = (fromYaml) ? parseFloat(args.parts.value) : Math.abs(args)
        this.sign  = (fromYaml) ? ( ( args.parts.sign == '-') ? -1 : 1 ) : Math.sign(args)
        }

    valueOf() { return this.canonic }

    toTosca(imbric=0) {
        let indent = '\n' + '  '.repeat(imbric)
        let str = `${indent}${this.sign}${this.value} ${this.unit}`
        return str
    }
}

class TSize extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (fromYaml) ? args.parts.unit  : 'B'
        this.factor = (fromYaml) ? ({ 'B': 1, 'kB': 1000, 'KiB': 1024, 'MB': 1000000, 'MiB': 1048576, 
            'GB': 1000000000, 'GiB': 1073741824, 'TB': 1000000000000, 'TiB': 1099511627776
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}

class TTime extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (fromYaml) ? args.parts.unit  : 's'
        this.factor = (fromYaml) ? ({ 'd': 86400, 'h': 3600, 'm': 60, 's': 1,  
            'ms': 0.001, 'us': 0.00001, 'ns': 0.000000001
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}
class TFreq extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (fromYaml) ? args.parts.unit  : 'Hz'
        this.factor = (fromYaml) ? ({ 'Hz': 1, 'kHz': 1000,  
            'MHz': 1000000, 'GHz': 1000000000
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}
class TBitrate extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (fromYaml) ? args.parts.unit  : 'bps'
        this.factor = (fromYaml) ? ({ 'bps': 1, 'Kbps': 1000, 'Kibps': 1024, 'Mbps': 1000000, 'Mibps': 1048576, 
            'Gbps': 1000000000, 'Gibps': 1073741824, 'Tbps': 1000000000000, 'Tibps': 1099511627776,
            'Bps': 8, 'KBps': 8000, 'KiBps': 1024*8, 'MBps': 8000000, 'MiBps': 1048576*8, 
            'GBps': 8000000000, 'GiBps': 1073741824*8, 'TBps': 8000000000000, 'TiBps': 1099511627776*8,
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}

class TVersion extends String {
    constructor(args, info) {
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
    constructor(args, info) { 
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
    constructor(args, info){
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
    constructor(args, info) {
        this.args  = args
        this.range = args.range
        let iter = args.entries()
        let [ operator, value ] = iter.next().value
        this.operator = operator
        this.value = value
        if (!['equal', 'greater_than', 'greater_or_equal', 
              'less_than', 'less_or_equal', 'in_range', 
              'valid_values', 'length', 
              'min_length', 'max_length', 'pattern', 'schema'].includes(operator) )
              throw(`Error : '${operator}' is not an allowed operator in a constraint`)
    }

    toTosca(imbric=0) { 
        let indent = '\n' + '  '.repeat(imbric)
        let str = `${indent}{ ${this.operator}: ${this.value} }`
        return str
    }
}

class TProperty {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TPropertyAssignment {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TAttribute {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TAttributeAssignement {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInput {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class Toutput {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRepository {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TArtifactDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}


class TEntity {
    constructor(args, info) {
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
    constructor(args, info) {
        super(args, info)
        this.category = 'datatypes'
    }

    get properties() { return this.args.get('properties') }
    get constraints() { return this.args.get('constraints') }

}

class TArtifactType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'artifacts'
    }

    get properties() { return this.args.get('properties') }
    get mime_type() { return this.args.get('mime_type') }
    get file_ext() { return this.args.get('file_ext') }
    
}

class TCapabilityType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'capabilities'
    }

    get properties() { return this.args.get('properties') }
    get attributes() { return this.args.get('attributes') }
    get valid_source_types() { return this.args.get('valid_source_types') }
    get occurences() { return this.args.get('occurrences') }
}

class TNodeType extends TEntity {
    constructor(args, info) {
        super(args, info)
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
    constructor(args, info) {
        super(args, info)
        this.category = 'relationships'
    }

    get properties()   { return this.args.get('properties') }
    get attributes()   { return this.args.get('attributes') }
    get interfaces()   { return this.args.get('interfaces') }
    get workflows()    { return this.args.get('workflows') }
    get valid_target_types() { return this.args.get('valid_target_types') }
}

class TGroupType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'groups'
    }

    get properties()   { return this.args.get('properties') }
    get capabilities() { return this.args.get('capabilities') }
    get requirements() { return this.args.get('requirements') }
    get interfaces()   { return this.args.get('interfaces') }
    get members()      { return this.args.get('members')}
}

class TPolicyType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'policies'
    }

    get properties()   { return this.args.get('properties') }
    get target() { return this.args.get('target') }
    get triggers() { return this.args.get('triggers') }
}


class TInterfaceType extends TEntity {
    constructor(args, info) {
        super(args, info)
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
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TOperationDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TOperationDefTemplate {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDefTemplate {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityAssignment {
    constructor(args, info) {
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
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TNodeFilter {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRequirementDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TRequirementAssignment {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}
class TSubstitutionMappings {
    constructor(args, info) {
        this.args = args
        this.range = args.range

    }
    toTosca(imbric=0) {
        return this
    }
}

class TTopologyTemplate {
    constructor(args, info) {
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

    set(tname, tentity, tnamespace=null) {
        const namespace = (tnamespace) ? tnamespace : this.default_namespace
        if (tentity instanceof TEntity) {
            let exists = this.entities.get(tname)
            if (exists) {
                const category = tentity.category
                if (exists.find( ele => ele.category == category && ele.namespace == namespace )) 
                    throw(`Error : a ${category} '${tname}' already exists for the namespace '${(namespace) ? namespace : 'default' }'}' `)
            } else {
                exists = [] 
            }
            exists.push(new TType(tname, tentity, namespace))
            this.entities.set(tname, exists)
        } else 
            throw(`Error : '${tentity}' is not a Tosca Entity`)
    }

    set_prefix(prefix, namespace) {
        const prefixed_namespace = this.prefixies.get(prefix)
        if (!prefixed_namespace || ( prefixed_namespace == namespace) )
            this.prefixies.set(prefix, namespace)
        else if ( prefixed_namespace != namespace) 
            throw(`Error : the namespace prefix ${prefix} is already used for namespace ${prefixed_namespace}`)
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
                let new_type = (ttype.namespace) ? ttype : ttype.with_namespace(new_namespace)
                local_ttypes.find(ele => ele.equals(new_type)) || local_ttypes.push(new_type)
            }
            local_entities.set(name, local_ttypes)
        })
        return this
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
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.imported=[]
        this.tosca_entity_types = ['artifact_types', 'data_types', 'capability_types', 'interface_types', 'relationship_types', 'node_types', 'group_types', 'policy_types']
        const all_types = new TTypes(this.args.get('namespace'))
        all_types.set_prefix(info.tosca_prefix, info.tosca_namespace)
        for (const category of this.tosca_entity_types) {
            let types = this.args.get(category) 
            types && types.forEach(function(value, id, map) {
                const id_eles = id.split('.')
                let namespace = all_types.prefixies.get(id_eles[0])
                let id_category = id_eles[1]
                if (namespace && id_category == value.category)
                    all_types.set(id_eles.slice(2).join('.'), value, namespace)
                else 
                    all_types.set(id, value)
            })
        }
        this.all_types = all_types
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

