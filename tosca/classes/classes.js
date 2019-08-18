// Locate error in source file
function _locate(info, range) {
    if (info) {
        let begin = info.index.fromIndex( (range[0] > 1 ) ? range[0] : 0 )
        let end = info.index.fromIndex( (range[1] > 1 ) ? range[1]  : 0 )
        let loc_str = ` at ${begin.line}:${begin.col} <-> ${end.line}:${end.col} ${(info.filename) ? 'in ' + info.filename : '' }`
        return loc_str
    } else return ""
}

// Root class for tosca objects
class TRoot {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.argsIsMap = args instanceof Map 
    }

    set_member( member_name, options={} ) {
        let from = options.from || this.args
        let default_val = options.default || null
        let is_map = from instanceof Map
        this[member_name] = (is_map) ? from.get(member_name) : default_val
    }

    set_members( member_names, options={} ) {
        member_names.forEach( member_name => this.set_member(member_name, options))
    }

}

// Parent of all parameters (inputs, outputs, properties, attributes)
class TParameter extends TRoot {
    constructor(args, info) {
        super(args, info)
        info.parameters.push(this)
    }

    resolve_data_type_name() {
        this.type.resolve_data_type_name(this.info.nodes.all_types)
    }
}

// Parent of all Tosca Definitions
class TDefinition extends TRoot {
    constructor(args, info) {
        super(args, info)
        info.definitions.push(this)
    }

    resolve_definition_type_names() {}

    derives_member_from_type(member) {
        let this_member = this[member]
        let type_member = this.type.value[member]
        let classname = type_member && type_member.constructor.name
        if (classname)
            this[member] = new this.info.classes[classname]([...(type_member||[]) , ...(this_member||[])])
    }
}

// Parent of all Tosca Types 
class TEntity extends TRoot {
    constructor(args, info) {
        super(args, info)
        this.set_members([ 'derived_from', 'version', 'metadata', 'description' ])
    }

    derives(all_types) {
        if (this.is_derived ) return 
        if (!this.derived_from || (this.derived_from.valueOf() == 'tosca.entity.Root')) {
            this.derived_from = null
            this.is_derived = true
            return 
        }
        let parent_entity = all_types.get(this.derived_from, this.category)
        if (parent_entity instanceof TEntity) parent_entity.derives(all_types)
        this.derived_from.value = parent_entity
        this.is_derived = true
        this.derives_from_parent()
    }

    derives_member_from_parent(member) {
        let this_member = this[member]
        let parent_member = this.derived_from.value[member]
        let classname = (this_member && this_member.constructor.name) || (parent_member && parent_member.constructor.name)
        if (classname)
            this[member] = new this.info.classes[classname]([...(parent_member||[]) , ...(this_member||[])])
    }

    subtype_of(ancestor) {
        if (ancestor == this) return true 
        if (!this.derived_of) return false
        return this.derived_of.value.subtype_of(ancestor)
    }
}

/////////////////////////////////////////////////////////
// Tosca Types management  

// Tosca DataType type definition (simple and complex types)
class TTypeDef extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['type', 'description', 'constraints', 'entry_schema', 'key_schema'])
        if (!this.type) { throw(`Error : No type field found in a Tosca entity ${_locate(info, args.range)}`) }
        if (this.entry_schema && this.type.valueOf() != 'list' && this.type.valueOf() != 'map' )
            throw(`Error : schema_entry to be provided only for types 'list' or 'map'  ${_locate(info, args.range)}`)
        this.entry_schema = (this.entry_schema) ? new TTypeDef(this.entry_schema) : null
        if (this.key_schema && this.type.valueOf() != 'map' )
            throw(`Error : key_schema to be provided only for types 'map'  ${_locate(info, args.range)}`)
        this.key_schema = (this.key_schema) ? new TTypeDef(this.key_schema) : null
    }

    resolve_data_type_name(all_types) {
        if (this.is_resolved) return
        if (this.entry_schema instanceof TTypeDef) this.entry_schema.resolve_data_type_name(all_types)
        if (this.key_schema instanceof TTypeDef) this.key_schema.resolve_data_type_name(all_types)
        this.type.value = all_types.get(this.type, 'datatypes')
        this.is_resolved = true
    }

}

// Associate tosca types with alias and namespaces 
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
        return this.namespace == other.namespace && this.name == other.name &&
               this.type.info.filename == other.type.info.filename &&
               this.type.range[0] == other.type.range[0] &&
               this.type.range[1] == other.type.range[1]
    }
}

// Manage aliases and namespaces for all tosca types 
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
        switch (id.valueOf()) {
            case 'string':
            case 'tag:yaml.org,2002:str':
                return  TString
            case 'integer': 
            case 'tag:yaml.org,2002:int':
                return TInteger
            case 'float': 
            case 'tag:yaml.org,2002:float':
                return TFloat
            case 'boolean': 
            case 'tag:yaml.org,2002:bool':
                return TBoolean 
            case 'timestamp': 
            case 'tag:yaml.org,2002:timestamp':
                return TTimestamp
            case 'null':
            case 'tag:yaml.org,2002:null':
                return TNull
            case 'version':
            case 'tosca:version':
                return TVersion
            case 'range':
            case 'tosca:range':
                return TRange
            case 'list':
            case 'tosca:list':
                return TList
            case 'map':
            case 'tosca:map':
                return TMap
            case 'size':
            case 'scalar-unit.size':
            case 'tosca:size':
                return TSize
            case 'time':
            case 'scalar-unit.time':
            case 'tosca:time':
                return TTime
            case 'frequency':
            case 'scalar-unit.frequency':
            case 'tosca:frequency':
                return TFreq
            case 'bitrate':
            case 'scalar-unit.bitrate':
            case 'tosca:bitrate':
                return TBitrate
        }
        const id_eles = id.split('.')
        const default_namespace = this.default_namespace
        let found = null
        if (id_eles.length > 2) {
            const prefix = id_eles[0]
            const category = id_eles[1]
            const typename = id_eles.slice(2).join('.')
            const namespace = this.prefixies.get(prefix)
            const types = this.entities.get(typename)
            found = (types) ? types.filter( ele => ele.category == category && ele.namespace == namespace ) : null
            if ( expected_category && (expected_category != category) )
                throw(`Error : provided identifier ${id} is incompatible with expected category ${expected_category} ${_locate(id.info, id.range)}`)
            if (found && found.length == 1 ) return found[0].type
            if (found && found.length == 0) throw(`Error : ${(expected_category) ? expected_category : ''} type found for id ${id} ${_locate(id.info, id.range)}`)
        }
        if (!found) {
            found = this.entities.get(id.valueOf())
            if (!found) found = this.entities.get(id.valueOf())
            if (!found) {
                let entries_found = [...this.entities].filter( x => x[0].endsWith(`.${id}`) )
                found = [].concat(entries_found.map(x => x[1]))
            }
            if (!found) throw(`Error : no type found for id ${id} ${_locate(id.info, id.range)}`)
            if (found.length == 1) return found[0].type
            found = found.filter( e => e.category == expected_category )
            if (found.length == 1) return found[0].type
            if (found.length == 0) throw(`Error : no ${(expected_category) ? expected_category : ''} type found for id ${id} ${_locate(id.info, id.range)}`)
            found = found.filter( e => e.namespace == default_namespace )
            if (found.length == 1) return found[0].type
            if (found.length == 0) throw(`Error : no ${(expected_category) ? expected_category : ''} type found for id ${id} ${_locate(id.info, id.range)}`)
        }
        throw(`Error : several ${(expected_category) ? expected_category : ''} types found for id ${id} ${_locate(id.info, id.range)}`)
    }

    derives_types() {
        let all_types = this
        this.entities.forEach(function (entities_by_name, name, map) {
            entities_by_name.forEach(function( entity) {
                entity.type.derives(all_types)
            })
        })
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

/////////////////////////////////////////////////////////
// Atomic types
//

class TString extends String {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        this.info = info
    }
}

class TInteger extends Number {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        this.info = info
    }
}

class TUnbounded extends Number {
    constructor(args, info=null) {
        super(Infinity)
        this.range = args.range
        this.info = info
    }
}

class TBoolean extends Boolean {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        this.info = info
    }
}

class TFloat  extends Number {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        this.info = info
    }
}

class TTimestamp extends Date {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        this.info = info
    }
}

class TNamespace extends String {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        this.info = info
    }
}

class TNull {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
    }

    valueOf() {
        return null
    }
}

class TRange extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.min = args[0]
        this.max = args[1]
        if (this.min == Infinity) this.min = -Infinity
    }
}

class TUrl extends String {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        this.info = info
    }
}

class TScalarUnit extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.fromYaml = (typeof args == 'object') 
        this.range = (this.fromYaml) ? args.range : null 
        this.value = (this.fromYaml) ? parseFloat(args.parts.value) : Math.abs(args)
        this.sign  = (this.fromYaml) ? ( ( args.parts.sign == '-') ? -1 : 1 ) : Math.sign(args)
        }

    valueOf() { return this.canonic }
}

class TSize extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (this.fromYaml) ? args.parts.unit  : 'B'
        this.factor = (this.fromYaml) ? ({ 'B': 1, 'kB': 1000, 'KiB': 1024, 'MB': 1000000, 'MiB': 1048576, 
            'GB': 1000000000, 'GiB': 1073741824, 'TB': 1000000000000, 'TiB': 1099511627776
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}

class TTime extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (this.fromYaml) ? args.parts.unit  : 's'
        this.factor = (this.fromYaml) ? ({ 'd': 86400, 'h': 3600, 'm': 60, 's': 1,  
            'ms': 0.001, 'us': 0.00001, 'ns': 0.000000001
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}
class TFreq extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (this.fromYaml) ? args.parts.unit  : 'Hz'
        this.factor = (this.fromYaml) ? ({ 'Hz': 1, 'kHz': 1000,  
            'MHz': 1000000, 'GHz': 1000000000
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}
class TBitrate extends TScalarUnit {
    constructor(args, info=null) {
        super(args, info)
        this.unit  = (this.fromYaml) ? args.parts.unit  : 'bps'
        this.factor = (this.fromYaml) ? ({ 'bps': 1, 'Kbps': 1000, 'Kibps': 1024, 'Mbps': 1000000, 'Mibps': 1048576, 
            'Gbps': 1000000000, 'Gibps': 1073741824, 'Tbps': 1000000000000, 'Tibps': 1099511627776,
            'Bps': 8, 'KBps': 8000, 'KiBps': 1024*8, 'MBps': 8000000, 'MiBps': 1048576*8, 
            'GBps': 8000000000, 'GiBps': 1073741824*8, 'TBps': 8000000000000, 'TiBps': 1099511627776*8,
            })[this.unit] : 1
        this.canonic = this.sign * this.value * this.factor
        }
}

class TVersion extends String {
    constructor(args, info=null) {
        let range = args.range
        let version_parts = args.split(/\.|-/)
        let major = version_parts[0] || 0
        let minor = "." + (version_parts[1] || 0)
        let fix   = "." + (version_parts[2] || 0)
        let qualifier = (version_parts[3]) ? "." + version_parts[3] : ""
        let build = (version_parts[4]) ? "-" + version_parts[4] : ""
        super(`${major}${minor}${fix}${qualifier}${build}`)
        this.args = args
        this.info = info
        this.range = range
        this.major = major
        this.minor = minor
        this.fix   = fix
        this.qualifier = qualifier
        this.build = build
        this.canonic = this.major.toString().padStart(6,' ') 
               + '.' + this.minor.toString().padStart(6,' ')
               + '.' + this.fix.toString().padStart(6,' ')
               + '.' + this.qualifier.padStart(15,' ')
               + '.' + this.build.toString().padStart(10,' ')
    }

    valueOf() { return this.canonic }
}

class TList extends Array {
    constructor(args, info=null){
        super(...args)
        this.args = args
        this.range = args.range
        this.info = info
    }
}

class TMap extends Map {
    constructor(args, info=null){
        super(args)
        this.args = args
        this.range = args.range
        this.info = info
        this.by_str = new Map()
        this.forEach((value, key, map) => this.by_str.set((key) ? key.valueOf() : key, value))
    }

    set_member( member_name, options={} ) {
        let from = options.from || this.args
        let default_val = options.default || null
        let is_map = from instanceof Map
        this[member_name] = (is_map) ? from.get(member_name) : default_val
    }

    set_members( member_names, options={} ) {
        member_names.forEach( member_name => this.set_member(member_name, options))
    }

    set(key, value) {
        super.set(key, value)
        this.by_str && this.by_str.set((key) ? key.valueOf() : key, value)
    }

    get(key) {
        return this.by_str.get(key.valueOf())
    }
}

// Tosca expressions
class TValueExpression extends TRoot {
    constructor(args, info=null) { 
        super(args, info)
        let iter = args.entries()
        let [ operator, value ] = iter.next().value
        this.keyword = keyword
        this.value = value
        if (!['concat', 'get_input', 'get_nodes_of_type', 
              'token', 'join', 'get_property', 
              'get_attribute', 'get_operation_output', 
              'get_artifact'].includes(keyword) )
              throw(`Error : '${keyword}' is not an allowed operator for value expression`)
    }

    eval() {
        let val = ( typeof this.value == 'object' ) ? this.value.valueOf() : this.value

        try {
        switch (this.keyword) {
            case 'concat':
                let evaluated = val.map(x => (x instanceof TValueExpression) ? x.eval() : x )
                if (evaluated.some(x => !( typeof x == 'string' || (x instanceof String ))))
                    throw(`Error : concat function accepts only strings as argument ${_locate(info, args.range)}`)
                return evaluated.join('')
            case 'get_input':
                return null 
            case 'get_nodes_of_type':
                return null 
            case 'token':
                let tokenized = val[0]
                let sep_chars = val[1]
                let token_idx = val[2]
                let str_regxp = sep_chars.split('').map( x => ("+?.*\()|".includes(x)) ? "\\" + x : x ).join('|')
                let sep_regxp = new RegExp(str_regxp)
                let tokens    = tokenized.split(sep_regxp)
                let token     = tokens[token_idx]
                return token
            case 'join':
                let list_eles = val[0]
                let sep = val[1] || ''
                let evaluated = list_eles.map(x => (x instanceof TValueExpression) ? x.eval() : x )
                if (evaluated.some(x => !( typeof x == 'string' || (x instanceof String ))))
                    throw(`Error : join function accepts only strings as argument ${_locate(info, args.range)}`)
                return evaluated.join(sep)
            case 'get_property':
                return null
            case 'get_attribute':
                return null
            case 'get_operation_output':
                return null
            case 'get_artifact':
                return null
            default:
                throw(`Error : '${keyword}' is not an allowed keyword in a constraint`)
        }
        } catch(e) { throw(`Error ${e.name} : function { ${this.keyword}: ${this.value} } can not be evaluated (${e.message})`) }
    }

}

/////////////////////////////////////////////////////////
// Utils

// Service template import
class TImport extends TRoot {
    constructor(args, info=null) { 
        super(args, info)
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
                    this.set_members(['file', 'repository', 
                        'namespace_prefix', 'namespace_uri'], {from_val: cthis} )
                }
            })
        }
    }
}



// Tosca constraints

class TConstraints extends TList {
    constructor(args, info=null){
        super(args)
        this.args.forEach(
            function(value) {
                if (! value instanceof TConstraint ) { throw (`Error : '${value}' is not a constraint in '${args}' ${_locate(info, value.range)}`)}
            }
        )
    }
    eval(constrained_value) {
        return this.every( x => x.eval(constrained_value) )
    }

}

class TConstraint extends TRoot {
    constructor(args, info=null) {
        super(args, info)
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

    eval(constrained_value) {
        let constrained = ( typeof constrained_value == 'object' ) ? constrained_value.valueOf() : constrained_value
        let val = ( typeof this.value == 'object' ) ? this.value.valueOf() : this.value

        try {
        switch (this.operator) {
            case 'equal':
                return constrained == val 
            case 'greater_than':
                return constrained > val 
            case 'greater_or_equal':
                return constrained >= val 
            case 'less_than':
                return constrained < val
            case 'less_or_equal':
                return constrained <= val
            case 'in_range':
                return constrained >= val.min && constrained <= val.max
            case 'valid_values':
                return val.map(x=> x.valueOf()).includes(constrained)
            case 'length':
                return constrained.length == val
            case 'min_length':
                return constrained.length >= val
            case 'max_length':
                return constrained.length <= val
            case 'pattern':
                let expr = val
                let re = new RegExp(expr)
                return !!re.exec(constrained)
            case 'schema':
                // TOBE DONE 'libxmljs' et 'ajv'
                break;
            default:
                throw(`Error : '${operator}' is not an allowed operator in a constraint`)
        }
        } catch(e) { throw(`Error : constraint { ${this.operator}: ${this.value} } can not be applied on ${constrained_value}`) }
    }
}


// Tosca Parameters


class TProperty extends TParameter {
    constructor(args, info=null) {
        super(args, info)
        this.type = new TTypeDef(args)
        this.set_members([ 'description', 'constraints', 'default', 'status','metadata' ])
        this.set_member('required', { default: false } )
    }
}

class TProperties extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}


class TAttribute extends TParameter {
    constructor(args, info=null) {
        super(args, info)
        this.type = new TTypeDef(args)
        this.set_members([ 'description', 'default', 'status','metadata' ])
    }
}

class TAttributes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TInput extends TParameter {
    constructor(args, info=null) {
        super(args, info)
        this.type = new TTypeDef(args)
        this.set_members([ 'description', 'constraints', 'default', 'status','value' ])
        this.set_member('required', { default: false } )
    }
}

class TInputs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class Toutput extends TParameter {
    constructor(args, info=null) {
        super(args, info)
        this.type = new TTypeDef(args)
        this.set_members([ 'description', 'constraints', 'default', 'status','value' ])
        this.set_member('required', { default: false } )
    }
}

class TOutputs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

/////////////////////////////////////////////////////////
// Tosca definitions

class TArtifactDef extends TDefinition {
    constructor(args, info) {
        super(args, info)
        this.set_members(['file', 'type', 'repository','deploy_path',
            'version', 'checksum', 'checksum_algorithm', 'properties'])
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.type.value = info.nodes.all_types.get(this.type, 'artifacts')
        // TODO: repository
        this.is_revolved = true
        this.derives_member_from_type('properties')
    }

}

class TArtifactDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TRelationshipDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_member('type', { default: args})
        this.set_member('interfaces')
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'relationships')
        this.derives_member_from_type('interfaces')
        this.is_resolved = true
    }

}

class TRequirementDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        let [ name, def ] = args.entries().next().value
        this.name = name
        let isMap = def instanceof Map
        this.set_member('capability', { from: def, default: def} )
        this.set_members(['description', 'node', 'occurrences', "relationship"])
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.capability && (this.capability.value = this.info.nodes.all_types.get(this.capability, 'capabilities'))
        this.node && (this.node.value = this.info.nodes.all_types.get(this.node, 'nodes'))
        this.is_resolved = true
    }
}

class TRequirementDefs extends TList {
    constructor(args, info=null) {
        super(args, info)
    }    
    
}

class TDeclarativeWorkflowRelDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['description', 'metadata', 'inputs', 'preconditions', 
            'source_weaving', 'target_weaving'])
    }
    
}

class TDeclarativeWorkflowRelDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TImperativeWorkflowDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['description', 'metadata', 'inputs', 'preconditions', 'steps'])
    }

}

class TImperativeWorkflowDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TOperationDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['description', 'inputs', 'implementation' ])
    }

}

class TOperationDefTemplate extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['description', 'inputs', 'implementation' ])
    }

}

class TInterfaceDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['type', 'inputs', 'outputs', 'operations', 'notifications'])
        if (!this.operations) {
            let operations = new TMap(new Map(), info)
            args.forEach((value, key, map) => {
                if (! (['type', 'inputs', 'notifications', 'operations'].includes(key)) )
                    operations.set(key, value) }
            )
        }
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'interfaces')
        this.derives_member_from_type('inputs')
        this.derives_member_from_type('outputs')
        this.derives_member_from_type('operations')        
        this.derives_member_from_type('notifications')        
        this.is_resolved = true
    }


}

class TInterfaceDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}


class TImplementation extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        let isMap = args instanceof Map
        this.set_member('primary', {default: args} )
        this.set_members('dependencies')
    }
}

class TCapabilityDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_member('type', { default: args})
        this.set_members(['description', 'properties', 'attributes', 
                'valid_source_types'])
        this.set_member('occurrences', {default: new TRange( [ 1, Infinity ]) })
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        // type resolution
        this.type.value = this.info.nodes.all_types.get(this.type, 'capabilities')
        // source_types resolution
        if (this.valid_source_types) {
            this.valid_source_types.map(type_name => type_name.value = this.info.nodes.all_types.get(type_name, 'nodes'))
        }
        this.derives_member_from_type('properties')        
        this.derives_member_from_type('attributes')     
        // a priori, pas a dervier ? // this.derives_member_from_type('valid_sources_types')        
        this.is_resolved = true
    }

}

class TCapabilityDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TDeclarativeWorkflowNodeDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['description', 'metadata', 'inputs', 'preconditions', 'steps'])
    }

}

class TDeclarativeWorkflowNodeDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TGroupDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['type', 'description', 'properties', 'interfaces', 'members'])
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'groups')
        this.is_resolved = true
    }

    resolve_assignments_type_names() {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
        this.interfaces && this.interfaces.resolve_assignment_type(this.type.value.interfaces)
    }

}

class TGroupDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignments_type_names() {
        this.forEach((value, key, map) => value.resolve_assignments_type_names() )
    }

}

class TTriggerDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        let [ name, def ] = args.entries().next().value
        this.name = name
        this.set_members(['description', 'event', 'schedule', 'target_filter', 'condition',
                          'period', 'evaluations', 'method', 'action' ])
        this.condition = (this.condition instanceof TConstraint) ? this.condition : this.condition.values().next().value
    }
}

class TTriggerDefs extends TList {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TTargetFilter extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['node', 'requirement', 'capability'])
    }
}

class TEvent extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        let isMap = args instanceof Map
        this.type = (isMap) ? args.entries().next().value : args
    }
}

class TPolicyDef extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        let [ name, def ] = args.entries().next().value
        this.name = name
        this.set_members(['type', 'description', 'properties', 'targets', 'triggers'], {from: def})
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'policies')
        this.is_resolved = true
    }

    resolve_assignments_type_names() {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
    }


}

class TPolicyDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignments_type_names() {
        this.forEach((value, key, map) => value.resolve_assignments_type_names() )
    }

}

/////////////////////////////////////////////////////////
// Tosca entity types

class TDataType extends TEntity{
    constructor(args, info=null) {
        super(args, info)
        this.category= 'datatypes'
        this.set_members(['properties', 'constraints', 'key_schema', 'key_schema'])
        if (this.key_schema && this.derived_from.valueOf() != 'map') {
            throw(`Error : 'key_schema' field is only allowed for data_types derived from 'map' ${_locate(info, args.range)}`) }
        if (this.entry_schema && this.derived_from.valueOf() != 'map' && this.derived_from.valueOf() != 'list') {
            throw(`Error : 'key_schema' field is only allowed for data_types derived from 'map' ${_locate(info, args.range)}`) }
    }

    derives_from_parent() {
        this.derives_member_from_parent('properties')
        this.derives_member_from_parent('constraints')
    }
}

class TDataTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TArtifactType extends TEntity {
    constructor(args, info=null) {
        super(args, info)
        this.category = 'artifacts'
        this.set_members(['properties', 'mime_type', 'file_ext'])
    }

    derives_from_parent() {
        this.derives_member_from_parent('properties')
    }

}

class TArtifactTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TCapabilityType extends TEntity {
    constructor(args, info=null) {
        super(args, info)
        this.category = 'capabilities'
        this.set_members(['properties', 'attributes', 'valid_source_types'])
    }

    derives_from_parent() {
        this.derives_member_from_parent('properties')
        this.derives_member_from_parent('attributes')
        if (this.valid_source_types) {
            let types = this.valid_source_types.map(type_name => this.info.nodes.all_types.get(type_name, 'nodes'))
            this.valid_source_types = new TList(types, this.valid_source_types.info)
        }
    }
}

class TCapabilityTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TInterfaceType extends TEntity {
    constructor(args, info=null) {
        super(args, info)
        this.category = 'interfaces'
        this.set_members(['operations', 'notifications', 'inputs' ])
        if (!this.operations) {
            let operations = new TMap(new Map(), info)
            args.forEach((value, key, map) => { 
                if (! (['derived_from', 'version', 'metadata', 'description', 'operations', 'notifications', 'inputs'].includes(key.valueOf())) )
                    operations.set(key, value) }
            )
            this.operations  = operations
        }
    }

    derives_from_parent() {
        this.derives_member_from_parent('inputs')
        this.derives_member_from_parent('operations')
        this.derives_member_from_parent('notifications')
    }

}

class TInterfaceTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TNodeType extends TEntity {
    constructor(args, info=null) {
        super(args, info)
        this.category = 'nodes'
        this.set_members([ 'properties', 'attributes', 'capabilities',
                        'requirements', 'interfaces', 'workflows' ])
    }

    derives_from_parent() {
        this.derives_member_from_parent('properties')
        this.derives_member_from_parent('attributes')
        this.derives_member_from_parent('capabilities')
        this.derives_member_from_parent('requirements')
        this.derives_member_from_parent('interfaces')
        this.derives_member_from_parent('workflows')
    }
}

class TNodeTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TRelationshipType extends TEntity {
    constructor(args, info=null) {
        super(args, info)
        this.category = 'relationships'
        this.set_members(['properties', 'attributes', 'interfaces', 'workflows', 'valid_target_types'])
    
    }

    derives_from_parent() {
        this.derives_member_from_parent('properties')
        this.derives_member_from_parent('attributes')
        this.derives_member_from_parent('interfaces')
        this.derives_member_from_parent('workflows')
    }
}

class TRelationshipTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TGroupType extends TEntity {
    constructor(args, info=null) {
        super(args, info)
        this.category = 'groups'
        this.set_members(['properties', 'capabilities', 'requirements', 'interfaces', 'members'])
    }

    derives_from_parent() {
        this.derives_member_from_parent('properties')
        this.derives_member_from_parent('capabilities')
        this.derives_member_from_parent('requirements')
        this.derives_member_from_parent('interfaces')
        this.derives_member_from_parent('members')
    }

}

class TGroupTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TPolicyType extends TEntity {
    constructor(args, info=null) {
        super(args, info)
        this.category = 'policies'
        this.set_members([ 'policies', 'properties', 'target', 'triggers'])
    }

    derives_from_parent() {
        this.derives_member_from_parent('properties')
        this.derives_member_from_parent('triggers')
    }

}

class TPolicyTypes extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

/////////////////////////////////////////////////////////
// Substitutions mapping

class TPropertyMapping extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['mapping', 'value'], { default: args})
        if (this.mapping instanceof Array) {
            switch (this.mapping.length) {
                case 1:
                    this.input_name = this.mapping[0]
                    break;
                case 2: 
                    this.node_template_name = this.mapping[0]
                    this.node_template_property = this.mapping[1]
                    break;
                case 3:
                    this.node_template_name = this.mapping[0]
                    this.node_template_cap_or_req = this.mapping[1]
                    this.node_template_property = this.mapping[2]
                    break;
                }
        }
    }
}

class TPropertiesMapping extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TAttributeMapping extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['mapping', 'value'], { default: args})
        if (this.mapping instanceof Array) {
            switch (this.mapping.length) {
                case 1:
                    this.input_name = this.mapping[0]
                    break;
                case 2: 
                    this.node_template_name = this.mapping[0]
                    this.node_template_property = this.mapping[1]
                    break;
                case 3:
                    this.node_template_name = this.mapping[0]
                    this.node_template_cap_or_req = this.mapping[1]
                    this.node_template_property = this.mapping[2]
                    break;
                }
        }
        this.value = (args instanceof Map && args.get('value')) || args
    }
}

class TAttributesMapping extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TCapabilityMapping extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_member('mapping', {default: args })   
        this.node_template_name = this.mapping && this.mapping[0] 
        this.capability_name = this.mapping && this.mapping[1]
        this.set_members(['properties', 'attributes'])
    }
}

class TCapabilitiesMapping extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TRequirementMapping extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_member('mapping', {default: args })   
        this.node_template_name = this.mapping && this.mapping[0] 
        this.capability_name = this.mapping && this.mapping[1]
        this.set_members(['properties', 'attributes'])
    }
}

class TRequirementsMapping extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TInterfaceMapping extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        [ this.operation_name, this.workflow_name ] = args.entries().next().value
    }
}

class TInterfacesMapping extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TSubstitutionMappings extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['node_type', 'substitution_filter', 'properties', 'attributes',
                            'capabilities', 'requirements', 'interfaces'])
    }
}



/////////////////////////////////////////////////////////
// Assignments

class TParameterAssignment extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_member('value', { default: args } )
        this.set_member('description')
    }

    resolve_assignment_type(parameter_name, parameter_def) {
        if (!parameter_def) throw(`No definition found for ${parameter_name} in assignment ${_locate(this.info, this.range)}`)
        this.type = parameter_def.type
    }
}

class TAssignments extends TMap {
    constructor(args, info=null) {
        super(args,  info)
    }

    resolve_assignment_type(definitions) {
        this.forEach(
            (assignment, name, map) => 
                assignment.resolve_assignment_type(name,definitions.get(name.valueOf())))
    }
}

class TPropertyAssignments extends TAssignments {
    constructor(args, info=null) {
        super(args,  info)
    }
}

class TAttributeAssignments extends TAssignments {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TInputAssignments extends TAssignments {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TCapabilityAssignment extends TRoot {
    constructor(args, info = null) {
        super(args, info)
        this.set_members( ['properties', 'attributes', 'occurrences'] )
    }

    resolve_assignment_type(parameter_name, capability_def) {
        this.properties && this.properties.resolve_assignment_type(capability_def.properties)
        this.attributes && this.attributes.resolve_assignment_type(capability_def.attributes)
    }

}

class TCapabilityAssignments extends TAssignments {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TInterfaceAssignment extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['inputs', 'notifications', 'operations'])
        this.operations || (this.operations = new TMap(new Map(), info))
        args.forEach(function(value, key, map){ 
            if (! (['inputs', 'notifications', 'operations'].includes(key)) )
                this.operations.set(key, value)
         })
    }

    resolve_assignment_type(parameter_name, inteface_def) {
        this.inputs && this.inputs.resolve_assignment_type(inteface_def.inputs)
        this.attributes && this.attributes.resolve_assignment_type(capability_def.attributes)
    }

}

class TInterfaceAssignments extends TAssignments {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TRelationshipAssignment extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_member('type', { default: args})
        this.set_members(['interfaces', 'properties'])
    }
}


class TRequirementAssignment extends TRoot {
    constructor(args, info) {
        super(args, info)
        let [ name, def ] = args.entries().next().valueoperator = 
        this.name = name
        if (def instanceof Map)
            this.set_member('node', { from: def })
        else 
            this.node = def
        this.set_members(['relationship', 'capability', 'range', 'node_filter'], { from: def} )
    }

    resolve_assignments_type_names(requirement_def, topology) {
        // 'topology.nodes_templates' ne peut être vide (l'assignation d'un requirement est dans le contexte d'un node_template)

        // elements de la definition
        let capability_in_def   = requirement_def.capability
        let node_in_def         = requirement_def.node
        let relationship_in_def = requirement_def.relationship

        // evaluation des differents elements de l'affectation
        //
        let node_templates = null

        // Si 'this.node' référence un node_template, 'node_templates' est la liste ce cet élément
        if (this.node) {
            let node_template = topology.node_templates.get(this.node)
            // coherence
            if (node_template && node_in_def)
                if (node_template.type.value.subtype_of(node_in_def.type.value) == false) 
                    throw(`Error : the type of the node_template in requirement assignment (${this.node}) is not a subtype of the node type in the requirement definition (${node_in_def}) ${_locate(info, this.range)})}`)
            // resultat
            node_templates = (node_template) ? [[this.node, node_template]] : null
        }

        // Si non, si un type de noeud est référencé (par l'assignation ou par la definition), 'node_templates' est la liste des templates sous-types de ce type.
        if (!node_templates) {
            let node_type_name = this.node || node_in_def
            let node_type = (node_type_name) ? this.info.nodes.all_types.get(node_type_name, 'nodes') : null
            // coherence
            if (this.node && node_in_def)
                if (node_type.subtype_of(node_in_def.type.value) == false) 
                    throw(`Error : the type of the node in requirement assignment (${this.node}) is not a subtype of the node type in the requirement definition (${node_in_def}) ${_locate(info, this.range)})}`)
            // resultat
            node_templates = (node_type) ? [...(topology.nodes_templates)].filter(ele => ele[1].type.value(subtype_of(node_type))) : null 
        }
        // Si 'nodes_templates' est une liste vide, l'assignation n'est pas possible
        if (node_templates && node_templates.length == 0) throw(`Error : no node_template matching the expected node value ${(this.node) ? this.node : node_in_def}`)
        // Si 'nodes_templates' est 'null', utiliser l'ensemble des noeuds de la topologie
        if (!node_templates) node_templates = [...(topology.node_templates)]

        let templates_with_capability = null
        // Si une capacité nommée de la définition est référencée, déterminer la liste de templates la possédant
        if (this.capacity) {
            templates_with_capability = node_templates.map(ele => (ele[1].has(this.capability)) ? 
                { node_name: ele[0], node: ele[1], capability_name: this.capability, capability: ele[1].capabilities.get(this.capability) } : false).filter(x = !!x ) 
            if (templates_with_capability.length == 0) templates_with_capability = null
        } 
        // Si non, si un type de capacité est référencé (par l'assignation ou par la definition), identifier la liste des templates possédant une capacité sous-types de ce type.
        if (! templates_with_capability) {
            let capability_type_name = this.capability || capability_in_def
            let capability_type = (capability_type_name) ? this.info.nodes.all_types.get(capability_type_name, 'capabilities') : null
            if (capability_type) {
                templates_with_capability = []
                node_templates.forEach(ele => {
                    let node_name = ele[0]
                    let node = ele[1]
                    node.capabilities.forEach((capability_name, capability, capabilities) => {
                        if (capability.type.value.subtype_of(capability_type))
                            templates_with_capability.push({ node_name, node, capability_name, capability })
                    })
                })
            }
        }
        // coherence
        if (templates_with_capability && capability_in_def)
            templates_with_capability = templates_with_capability.filter(ele => ele.capability.subtype_of(capability_in_def.type.value))
        // si la liste des templates possédant la capacité est vide, alors l'assignation est impossible
        if (templates_with_capability && (templates_with_capability.length == 0)) 
            throw(`Error : no node_template matching the expected capability value ${(this.capability) ? this.capability : capability_in_def}`)

        // identifier la relation ... // todo: cas ou this.relationship est un relationship assignment
        let relationship_template = null 
        if (this.relationship) {
            relationship_template = topology.relationship_templates.get(this.relationship)
            //coherence
            if (relationship_template && relationship_in_def)
                if (relationship_template.type.value.subtype_of(relationship_in_def.type.value == false))
                    throw(`Error : the type of the relationship_template in requirement assignment (${this.relationship}) is not a subtype of the relationship type in the requirement definition (${node_in_def}) ${_locate(info, this.range)})}`)
        }

        let relationship_types = null
        if (!relationship_template) {
            let relationship_type_name = this.relationship || relationship_in_def
            let relationship_type = (relationship_type_name) ? this.info.nodes.all_types.get(node_type_name, 'relationships') : null
            // coherence
            if (relationship_type && relationship_in_def)
                if (relationship_type.value.subtype_of(relationship_in_def.type.value == false))
                    throw(`Error : the type of the relationship in requirement assignment (${this.relationship}) is not a subtype of the relationship type in the requirement definition (${node_in_def}) ${_locate(info, this.range)})}`)
            relationship_types = (relationship_type) ? [ [node_type_name, relationship_type] ] : null
        }
        if (!relationship_types) relationship_types = [ ...(this.info.nodes.relationship_types)]
        
        // filtrer les nodes_templates.capabilities selon les valid_target_types des relations possibles et si pas ou plus d'une possibilité, alors erreur
        let results = []
        if (templates_with_capability && relationship_template) {
            templates_with_capability.forEach(ele => {
                let capability_type = ele.capability.type
                let valid_target_types = relationship_template.type.value.valid_source_types
                if (valid_target_types && valid_target_types.length > 0) {
                    valid_target_types.forEach(valid_capability_type => {
                        if (capability_type.value.subtype_of(valid_capability_type.value)) {
                            results.push({  node_name: ele.node_name, 
                                            node: ele.node, 
                                            capability: ele.capability, 
                                            capability_type: ele.capability.value,
                                            relationship_template: relationship_template, 
                                            relationship_type_name: relationship_template.type, 
                                            relationship_type: relationship_template.type.value 
                            })
        }
                    })
                }
            })
        }
        if (templates_with_capability && relationship_types) {
            templates_with_capability.forEach(ele => {
                let capability_type = ele.capability.type
                relationship_types.forEach(relationship_type => {
                    let valid_target_types = relationship_type[1].valid_source_types
                    if (valid_target_types && valid_target_types.length > 0) {
                        valid_target_types.forEach(valid_capability_type => {
                            if (capability_type.value.subtype_of(valid_capability_type.value)) {
                                results.push({  node_name: ele.node_name, 
                                                node: ele.node, 
                                                capability: ele.capability,
                                                capability_type: ele.capability.value,
                                                relationship_template: null, 
                                                relationship_type_name: relationship_type[0], 
                                                relationship_type: relationship_type[1] 
                                            })
                            }
                        })
                    }    
                })
            })
        }
        switch (results.length) {
            case 1:
                this.node_name = result[0].node_name
                this.node                   = result[0].node
                this.capability_name        = result[0].capability_name
                this.capability             = result[0].capability
                this.relationship_template  = result[0].relationship_template
                this.relationship_type_name =  result[0].relationship_type_name
                this.relationship_type      = result[0].relationship_type
                break; 
            case 0:
                throw(`Error : No node template matches the reqauirement assignment ${_locate(this.info, this.range)}`)
            default: 
                throw(`Error : More than 1 template (${results.map(ele => ele.node_name)}) matches the requirement assignment ${_locate(this.info, this.range)}`)
        }

        // todo : traiter les node_filter
    }
    
}

class TRequirementAssignments extends TList {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignments_type_names(requirement_defs, topology) {
        this.forEach((value, key, map) => value.resolve_assignments_type_names(requirement_defs.get(key), topology ))
    }

}

/////////////////////////////////////////////////////////
// Node filtering

class TPropertyFilter extends TRoot {
    constructor(args, info = null) {
        super(args, info)
        let [ name, def ] = args.entries().next().value
        this.name = name
        if ( def instanceof Array )
            this.filter = def
        else 
            this.filter = [ def ]
    }

    apply(args) {
        return []
    }
}

class TPropertiesFilter extends TList {
    constructor(args, info = null) {
        super(args, info)
    }

    apply(args) {
        return []
    }
}

class TCapabilityFilter extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        let [ name, def ] = args.entries().next().value
        this.name = name
        // because of the grammar, 'def' has only one key : 'propertties'
        this.properties = def.values().next().value
    }
}

class TCapabilitiesFilter extends TList {
    constructor(args, info = null) {
        super(args, info)
    }

    apply(args) {
        return []
    }
}

class TNodeFilter extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['properties', 'capabilities'])
    }
}


/////////////////////////////////////////////////////////
// Workflow language

class TWorkflowConditionOperator extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        let [ operator, clause] = args.entries().next().value
        this.operator = (['and', 'not', 'or', 'assert'].includes(operator)) ? operator : 'filter'
        this.clause = clause
        this.attribute = (this.operator == 'filter') ? operator : null
    }

    eval(entity) {
        switch (operator) {
            case 'and':
            case 'assert': 
                return this.clause.every( value => value.eval(entity) )
            case 'or': 
                return this.clause.some( value => value.eval(entity) )
            case 'not': 
                return this.clause.some( value => !value.eval(entity) )
            case 'filter':
                let attribute_val = entity.get_attribute(this.attribute)
                let constraints = this.clause
                return attribute_val && constraints.eval(attribute_val)
            default:
                throw (`Error : ${operator} is not an allowed operator in a workflow condition ${_locate(this.info, this.range)}`)
        }
    }
}

class TWorkflowConditionClause extends TList {
    constructor(args, info=null) {
        super(args, info)
    }

    eval(entity) {
        return this.every( value => value.eval(entity) )
    }
}

class TWorkflowPrecondition extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['target', 'target_relationship', 'condition'])
    }
}

class TWorkflowPreconditions extends TList {
    constructor(args, info=null) {
        super(args, info)
    }

}

class TWorkflowActivity extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['delegate', 'set_state', 'call_operation','inline'])
    }
}

class TWorkflowActivities extends TList {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TWorkflowStep extends TMap {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['target', 'target_relationship', 'filter',
                'activities', 'operation_host', 'on_success', 'on_failure'])
        this.on_success = (this.on_success instanceof Array) ? this.on_success : [ this.on_success ] 
        this.on_failure = (this.on_failure instanceof Array) ? this.on_failure : [ this.on_failure ] 
    }
}

class TWorkflowSteps extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TWorkflowSourceWeaving extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['after', 'before', 'wait_target', 'activity'])
    }
}

class TWorkflowSourceWeavingList extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

class TWorkflowTargetWeaving extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['after', 'before', 'wait_source', 'activity'])
    }
}

class TWorkflowTargetWeavingList extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}

/////////////////////////////////////////////////////////
// Tosca Templates

class TNodeTemplate extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['type', 'metadata', 'description', 'directives',
                         'properties', 'attributes', 'capabilities', 'requirements',
                         'interfaces', 'artifacts', 'node_filter', 'copy'])
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'nodes')
        this.is_resolved = true
    }

    resolve_assignments_type_names(topology) {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
        this.attributes && this.attributes.resolve_assignment_type(this.type.value.attributes)
        this.capabilities && this.capabilities.resolve_assignment_type(this.type.value.capabilities)
        this.interfaces && this.interfaces.resolve_assignment_type(this.type.value.interfaces)
        this.requirements && this.requirements.resolve_assignment_type(this.type.value.requirements, topology)
    }
}

class TNodeTemplates extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignments_type_names(topology) {
        this.forEach((value, key, map) => value.resolve_assignments_type_names(topology) )
    }

}

class TRelationshipTemplate extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['type', 'metadata', 'description', 'properties', 'attributes', 'interfaces', 'copy'])
    }

    resolve_definition_type_names() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'relationships')
        this.is_resolved = true
    }

    resolve_assignments_type_names() {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
        this.attributes && this.attributes.resolve_assignment_type(this.type.value.attributes)
        this.interfaces && this.interfaces.resolve_assignment_type(this.type.value.interfaces)
    }

}

class TRelationshipTemplates extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignments_type_names() {
        this.forEach((value, key, map) => value.resolve_assignments_type_names() )
    }
}

class TTopologyTemplate extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.imported=[]
        this.set_members(['description', 'inputs', 'outputs', 'node_templates', 'relationship_templates',
                            'groups', 'policies', 'substitution_mappings', 'workflows'])
    }

    resolve_assignments_type_names() {
        this.groups && this.groups.resolve_assignments_type_names()
        this.policies && this.policies.resolve_assignments_type_names()
        this.node_templates && this.node_templates.resolve_assignments_type_names(this)
        this.relationship_templates && this.relationship_templates.resolve_assignments_type_names()
    }
}

class TServiceTemplate extends TRoot {
    constructor(args, info) {
        super(args, info)
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
                let idname = 
                    (namespace && id_category == value.category) 
                    ? id_eles.slice(2).join('.')
                    : id.valueOf()
                all_types.set(idname, value, namespace)
            })
        }
        this.all_types = all_types
        this.set_members(['description', 'tosca_definitions_version', 'namespace', 'metadata', 'repositories',
                        'imports', 'artifact_types', 'data_types', 'capability_types', 'interface_types',
                        'relationship_types', 'node_types', 'group_types', 'policy_types', 'topology_template'])
        this.parameters = info.parameters
        this.definitions = info.definitions
    }
}

/////////////////////////////////////////////////////////
// Other tosca objects  


class TMetadata extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        let metadata = this
        args.forEach(
            function(value, key, map) {
                metadata[key] = value
            }
        )
    }
}

class TCredential extends TRoot {
    constructor(args, info = null) {
        super(args, info)
        this.set_members(['token', 'protocol', 'token_type', 'user'])
    }
}

class TRepository extends TRoot {
    constructor(args, info = null) {
        super(args, info)
        this.set_member('url', { default: args })
        this.set_member('description')
        this.set_member('credential')
        this.credential = (this.credential) ? new TCredential(this.credential) : null
    }
}

class TRepositories extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }
}



/////////////////////////////////////////////////////////
// Export  

const classes = {
    TString, TInteger, TBoolean, TFloat, TTimestamp, TNull, TUnbounded, TRange, TVersion, TList, TMap,
    TNamespace, TMetadata, TUrl, TSize, TTime, TFreq, TBitrate, TValueExpression,
    TImport, TConstraint, TConstraints, TTypeDef, TParameterAssignment,
    TProperty, TProperties, TPropertyAssignments, TAttribute, TAttributes, TAttributeAssignments,
    TInput, TInputs, TInputAssignments, Toutput, TOutputs, TCredential, TRepository, TRepositories,
    TArtifactDef, TArtifactDefs, TImplementation, TOperationDef, TOperationDefTemplate,
    TInterfaceDef, TInterfaceDefs, TInterfaceAssignment, TInterfaceAssignments,
    TCapabilityDef, TCapabilityDefs, TCapabilityAssignment, TCapabilityAssignments,
    TPropertyFilter, TPropertiesFilter, TCapabilityFilter, TCapabilitiesFilter, TNodeFilter,
    TRelationshipAssignment, TRelationshipDef, TRequirementDef, TRequirementDefs, 
    TRequirementAssignment, TRequirementAssignments,
    TDataType, TDataTypes, TArtifactType, TArtifactTypes,
    TCapabilityType, TCapabilityTypes, TInterfaceType, TInterfaceTypes,
    TWorkflowConditionClause, TWorkflowConditionOperator, TWorkflowPrecondition, TWorkflowPreconditions,
    TWorkflowActivity, TWorkflowActivities, TWorkflowStep, TWorkflowSteps,
    TWorkflowSourceWeaving, TWorkflowSourceWeavingList, TWorkflowTargetWeaving, TWorkflowTargetWeavingList,
    TDeclarativeWorkflowNodeDef, TDeclarativeWorkflowNodeDefs, TDeclarativeWorkflowRelDefs, TDeclarativeWorkflowRelDef,
    TImperativeWorkflowDefs, TImperativeWorkflowDef,
    TNodeType, TNodeTypes, TNodeTemplate, TNodeTemplates, TRelationshipType, TRelationshipTypes,
    TRelationshipTemplate, TRelationshipTemplates, TGroupType, TGroupTypes, TGroupDef, TGroupDefs,
    TEvent,TTargetFilter, TTriggerDef, TTriggerDefs, TPolicyType, TPolicyDef, TPolicyDefs, TPolicyTypes,
    TPropertyMapping, TPropertiesMapping, TAttributeMapping, TAttributesMapping, TCapabilityMapping,
    TCapabilitiesMapping, TRequirementMapping, TRequirementsMapping, TInterfaceMapping, TInterfacesMapping,
    TSubstitutionMappings, TTopologyTemplate, TServiceTemplate
}

Object.freeze(classes)
module.exports = classes