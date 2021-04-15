// Root Mixin and class for tosca objects

const MixinTRoot = Base => class extends Base {
    initRoot(args, info) {
        this.args = args
        this.range = args.range
        this.info = info
        this.argsIsMap = args instanceof Map 
    }

    _locate() {
        if (this.info) {
            let begin = this.info.index.fromIndex( (this.range[0] > 1 ) ? this.range[0] : 0 )
            let end = this.info.index.fromIndex( (this.range[1] > 1 ) ? this.range[1]  : 0 )
            let loc_str = ` at ${begin.line}:${begin.col} <-> ${end.line}:${end.col} ${(this.info.filename) ? 'in ' + this.info.filename : '' }`
            return loc_str
        } else return ""
    }
}

class TRoot extends MixinTRoot(Object) {
    constructor(args, info) {
        super()
        super.initRoot(args, info)
    }
 
    set_member( member_name, options={} ) {
        let from = options.from || this.args
        let default_val = options.default || null
        let is_map = from instanceof Map
        this[member_name] = (is_map) ? from.get(member_name) : default_val
//        if (this[member_name] && this[member_name].member_of && (!this instanceof TTypeDef))
//            console.log("DEJA UN PARENT !!!!")
//        this[member_name] && (this[member_name].member_of = this)
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
        if (this.type)
            this.type.resolve_data_type_name(this.info.nodes.all_types)
    }
}

// Parent of all Tosca Definitions
class TDefinition extends TRoot {
    constructor(args, info) {
        super(args, info)
        info.definitions.push(this)
    }

    resolve_definition_type_name() {}

    derives_member_from_type(member) {
        let this_member = this[member]
        let type_member = this.type.value[member]
        let classname = type_member && type_member.constructor.name
        if (classname) {
            let this_member_array = [...(this_member||[])]
            let type_member_array = [...(type_member||[])]
            let type_member_array_no_override = (type_member instanceof Map)  ?
                    type_member_array.filter(ele => !(this_member && this_member.has(ele[1]))) :
                    type_member_array
            this[member] = new this.info.classes[classname]([...type_member_array_no_override , ...this_member_array])
        }
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
        if (classname) {
            let this_member_array = [...(this_member||[])]
            let parent_member_array = [...(parent_member||[])]
            let parent_member_array_no_override = (parent_member instanceof Map)  ?
                    parent_member_array.filter(ele => !(this_member && this_member.has(ele[0]))) :
                    parent_member_array
            this[member] = new this.info.classes[classname]([...parent_member_array_no_override , ...this_member_array])
        }
    }

    equals(other) {
        return (this.info.filename == other.info.filename && 
            this.range[0] == other.range[0] && 
            this.range[1] == other.range[1])
    }

    subtype_of(ancestor) {
        if (this.equals(ancestor)) return true 
        if (!this.derived_from) return false
        return this.derived_from.value.subtype_of(ancestor)
    }

    derive_type_for_ele_in_member(name, member) {
        let ele = this[member] && this[member].get(name)
        if (ele && ele.type) {
            return ele.type
        } else {
            let ele_type = (this.derived_from && this.derived_from.value && this.derived_from.value.derive_type_for_ele_in_member(name, member)) || name
            ele && (ele.type = ele_type)
            return ele_type
        }
    }

    derive_type_in_member(member) {
        this[member] && this[member].forEach( (member_ele, ele_name, member_map) => this.derive_type_for_ele_in_member(ele_name, member) )

    }

}

/////////////////////////////////////////////////////////
// Tosca Types management  

// Tosca DataType type definition (simple and complex types)
class TTypeDef extends TRoot {
    constructor(args, info) {
        super(args, info)
        this.set_members(['type', 'description', 'constraints', 'entry_schema', 'key_schema'])
        if (!this.type) { throw(`Error : No type field found in a Tosca entity ${this._locate()}`) }
        if (this.entry_schema && this.type.valueOf() != 'list' && this.type.valueOf() != 'map' )
            throw(`Error : schema_entry to be provided only for types 'list' or 'map'  ${this._locate()}`)
        this.entry_schema = (this.entry_schema) ? new TTypeDef(this.entry_schema) : null
        if (this.key_schema && this.type.valueOf() != 'map' )
            throw(`Error : key_schema to be provided only for types 'map'  ${this._locate()}`)
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
        this.type.name = tname.valueOf()
        this.type.namespace = (namespace) ? namespace.valueOf() : null
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
        this.by_category = new Map()
    }

    set(tname, tentity, tnamespace=null) {
        const namespace = (tnamespace) ? tnamespace : this.default_namespace
        if (tentity instanceof TEntity) {
            let exists = this.entities.get(tname)
            const category = tentity.category
            if (exists) {
                if (exists.find( ele => ele.category == category && ele.namespace == namespace )) 
                    throw(`Error : a ${category} '${tname}' already exists for the namespace '${(namespace) ? namespace : 'default' }'}' `)
            } else {
                exists = [] 
            }
            this.push_by_category(tentity)
            exists.push(new TType(tname, tentity, namespace))
            this.entities.set(tname, exists)
        } else 
            throw(`Error : '${tentity}' is not a Tosca Entity`)
    }

    push_by_category(tentity) {
        const category = tentity.category
        const category_types = this.by_category.get(category)
        if (category_types) {
            if ( !category_types.some(ele => ele.equals(tentity)) )
                category_types.push(tentity) 
        } else {
            this.by_category.set(category, [ tentity ])
        }
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
        imported_entities.forEach((imported_ttypes, name, map) => {
            let local_ttypes = local_entities.get(name) || []
            for (const ttype of imported_ttypes) {
                let new_type = (ttype.namespace) ? ttype : ttype.with_namespace(new_namespace)
                local_ttypes.find(ele => ele.equals(new_type)) || ( local_ttypes.push(new_type) && this.push_by_category(new_type.type) )
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
//            if ( expected_category && (expected_category != category) )
//                throw(`Error : provided identifier ${id} is incompatible with expected category ${expected_category} ${id._locate()}`)
            if (found && found.length == 1 ) return found[0].type
            if (found && found.length == 0) throw(`Error : No ${(expected_category) ? expected_category : ''} type found for id ${id} ${id._locate()}`)
        }
        
        if (!found) {
            found = this.entities.get(id.valueOf())
            if (!found) found = this.entities.get(id.valueOf())
            if (!found) {
//                let entries_found = [...this.entities].filter( x => x[0].endsWith(`.${id}`) )
                let entries_found = [...this.entities].filter( x => x[0].endsWith(`.${id}`) )
                found = []
                entries_found.forEach(x => found = found.concat(x[1]))
            }
            if (!found) throw(`Error : no type found for id ${id} ${id._locate()}`)
            if (found.length == 1) return found[0].type
            found = found.filter( e => e.category == expected_category )
            if (found.length == 1) return found[0].type
            if (found.length == 0) throw(`Error : no ${(expected_category) ? expected_category : ''} type found for id ${id} ${id._locate()}`)
            found = found.filter( e => e.namespace == default_namespace )
            if (found.length == 1) return found[0].type
            if (found.length == 0) throw(`Error : no ${(expected_category) ? expected_category : ''} type found for id ${id} ${id._locate()}`)
        }
        throw(`Error : several ${(expected_category) ? expected_category : ''} types found for id ${id} ${id._locate()}`)
    }

    get_types_of_the_category(category) {
        return this.by_category.get(category)
    }

    derives_types() {
        let all_types = this
        this.entities.forEach( (entities_by_name, name, map) => {
            entities_by_name.forEach(entity => { entity.type.derives(all_types) })
        })
    }

}

/////////////////////////////////////////////////////////
// Atomic types
//



class TString extends MixinTRoot(String) {
    constructor(args, info=null) {
        super(args)
        super.initRoot(args, info)
    }
}

class TInteger extends MixinTRoot(Number) {
    constructor(args, info=null) {
        super(args)
        super.initRoot(args, info)
    }
}

class TUnbounded extends MixinTRoot(Number) {
    constructor(args, info=null) {
        super(Infinity)
        super.initRoot(args, info)
    }
}

class TBoolean extends MixinTRoot(Boolean) {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
        super.initRoot(args, info)
    }
}

class TFloat  extends MixinTRoot(Number) {
    constructor(args, info=null) {
        super(args)
        super.initRoot(args, info)
    }
}

class TTimestamp extends MixinTRoot(Date) {
    constructor(args, info=null) {
        super(args)
        super.initRoot(args, info)
    }
}

class TNamespace extends MixinTRoot(String) {
    constructor(args, info=null) {
        super(args)
        super.initRoot(args, info)
    }
}

class TNull extends MixinTRoot(Object) {
    constructor(args, info=null) {
        super.initRoot(args, info)
    }

    valueOf() {
        return null
    }
}

class TUrl extends MixinTRoot(String) {
    constructor(args, info=null) {
        super(args)
        super.initRoot(args, info)
    }
}

class TVersion extends MixinTRoot(String) {
    constructor(args, info=null) {
        let version_parts = args.split(/\.|-/)
        let major = version_parts[0] || 0
        let minor = "." + (version_parts[1] || 0)
        let fix   = "." + (version_parts[2] || 0)
        let qualifier = (version_parts[3]) ? "." + version_parts[3] : ""
        let build = (version_parts[4]) ? "-" + version_parts[4] : ""
        super(`${major}${minor}${fix}${qualifier}${build}`)
        super.initRoot(args, info)
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

class TList extends  MixinTRoot(Array) {
    constructor(args, info){
        super(...args)
        super.initRoot(args, info)
    }
}

class TMap extends  MixinTRoot(Map) {
    constructor(args, info){
        super(args)
        super.initRoot(args, info)
        this.by_str = new Map()
        this.forEach((value, key, map) => {
            let key_str = (key) ? key.valueOf() : key
            value && (value.name = key_str)
            this.by_str.set(key_str, value)
        })
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

    has(key) {
        return this.by_str.has(key.valueOf())
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
                    throw(`Error : concat function accepts only strings as argument ${this._locate()}`)
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
                    throw(`Error : join function accepts only strings as argument ${this._locate()}`)
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
        if (args instanceof TString) {
            this.file = args
        } else if (args instanceof Map) {
            args.forEach( (val, key, map) => {
                this.label = key
                if (val instanceof TString) {
                    this.file = val
                } else if (val instanceof Map) {
                    this.set_members(['file', 'repository', 
                        'namespace_prefix', 'namespace_uri'], {from_val: this} )
                }
            })
        }
    }
}



// Tosca constraints

class TConstraints extends TList {
    constructor(args, info=null){
        super(args)
        this.args.forEach( value => { if (! value instanceof TConstraint ) { throw (`Error : '${value}' is not a constraint in '${args}' ${this._locate()}`)} })
    }

    eval(constrained_value) { return this.every( x => x.eval(constrained_value) ) }
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

class TOutput extends TParameter {
    constructor(args, info) {
        super(args, info)
        this.type = (args.type) ? new TTypeDef(args) : null
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

    resolve_definition_type_name() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'artifacts')
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

    resolve_definition_type_name() {
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

    resolve_definition_type_name() {
        if (this.is_resolved) return
        this.capability && (this.capability.value = this.info.nodes.all_types.get(this.capability, 'capabilities'))
        this.node && (this.node.value = this.info.nodes.all_types.get(this.node, 'nodes'))
        this.is_resolved = true
    }
}

class TRequirementDefs extends TList {
    constructor(args, info=null) {
        super(args, info)
        this.by_name = {}
        this.forEach(def => this.by_name[def.name.valueOf()] = def)
    }

    get(name) {
        return this.by_name[name.valueOf()]
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
        this.set_member('implementation', { default: args} )
        this.set_members(['description', 'inputs' ])
    }

}

class TOperationDefTemplate extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_member('implementation', { default: args} )
        this.set_members(['description', 'inputs' ])
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

    resolve_definition_type_name() {
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
        this.set_member('dependencies')
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

    resolve_definition_type_name() {
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

    resolve_definition_type_name() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'groups')
        this.is_resolved = true
    }

    resolve_assignment_type_name() {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
        this.interfaces && this.interfaces.resolve_assignment_type(this.type.value.interfaces)
    }

}

class TGroupDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignment_type_name() {
        this.forEach((value, key, map) => value.resolve_assignment_type_name() )
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

    resolve_definition_type_name() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'policies')
        this.is_resolved = true
    }

    resolve_assignment_type_name() {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
    }


}

class TPolicyDefs extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignment_type_name() {
        this.forEach((value, key, map) => value.resolve_assignment_type_name() )
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
            throw(`Error : 'key_schema' field is only allowed for data_types derived from 'map' ${this._locate()}`) }
        if (this.entry_schema && this.derived_from.valueOf() != 'map' && this.derived_from.valueOf() != 'list') {
            throw(`Error : 'key_schema' field is only allowed for data_types derived from 'map' ${this._locate()}`) }
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
        this.derive_type_in_member('interfaces')
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
    constructor(args, info) {
        super(args, info)
        this.category = 'relationships'
        this.set_members(['properties', 'attributes', 'interfaces', 'workflows', 'valid_target_types'])
    
    }

    derives_interfaces_from_parent() {
        this.interfaces.forEach((interface_def, interface_name, map) => this.derives_interface_from_parent(interface_name))
    }


    derives_from_parent() {
        this.derives_member_from_parent('properties')
        this.derives_member_from_parent('attributes')
        this.derive_type_in_member('interfaces')
        this.derives_member_from_parent('interfaces')
        this.derives_member_from_parent('workflows')
        if (this.valid_target_types) { 
            this.valid_target_types.forEach(type => type.value = this.info.nodes.all_types.get(type, 'capabilities'))
        } else {
            let parent_valid_target_type = this.derived_from.value.valid_target_types
            this.valid_target_types = parent_valid_target_type
        }
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
        this.derive_type_in_member('interfaces')
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
        if (!parameter_def) throw(`No definition found for ${parameter_name} in assignment ${this._locate()}`)
        this.type = parameter_def.type
    }

}


class TAssignments extends TMap {
    constructor(args, info) {
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
        args.forEach((value, key, map) => { 
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
        let [ name, def ] = args.entries().next().value        
        this.name = name
        if (def instanceof Map)
            this.set_member('node', { from: def })
        else 
            this.node = def
        this.set_members(['relationship', 'capability', 'occurrences', 'node_filter'], { from: def} )
    }

    resolve_assignment_type(requirement_def) {

        if (!requirement_def)
            throw(`Error : no related requirement_def for requirement assignment ${this.name} ${this._locate()}`)
        let capability_in_def   = requirement_def.capability
        let node_in_def         = requirement_def.node
        let relationship_in_def = requirement_def.relationship
        let topology            = this.info.nodes.topology_template

        // evaluation des differents elements de l'affectation
        //
        let node_templates = null

        // Si 'this.node' référence un node_template, 'node_templates' est la liste ce cet élément
        if (this.node) {
            let node_template = topology.node_templates.get(this.node)
            // coherence
            if (node_template && node_in_def)
                if (node_template.type.value.subtype_of(node_in_def.type.value) == false) 
                    throw(`Error : the type of the node_template in requirement assignment (${this.node}) is not a subtype of the node type in the requirement definition (${node_in_def}) ${this._locate()})}`)
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
                    throw(`Error : the type of the node in requirement assignment (${this.node}) is not a subtype of the node type in the requirement definition (${node_in_def}) ${this._locate()})}`)
            // resultat
            node_templates = (node_type) ? [...(topology.nodes_templates)].filter(ele => ele[1].type.value(subtype_of(node_type))) : null 
        }
        // Si 'nodes_templates' est une liste vide, l'assignation n'est pas possible
        if (node_templates && node_templates.length == 0) throw(`Error : no node_template matching the expected node value ${(this.node) ? this.node : node_in_def}`)
        // Si 'nodes_templates' est 'null', utiliser l'ensemble des noeuds de la topologie
        if (!node_templates) node_templates = [...(topology.node_templates)]

        let templates_with_capability = null
        // Si une capacité nommée de la définition est référencée, déterminer la liste de templates la possédant
        if (this.capability) {
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
                    node.capabilities && node.capabilities.forEach((capability, capability_name, capabilities) => {
                        if (capability.type.value.subtype_of(capability_type))
                            templates_with_capability.push({ node_name, node, capability_name, capability })
                        })
                    if ((templates_with_capability.length == 0) && node.type.value) {
                        node.type.value.capabilities.forEach((capability, capability_name, capabilities) => {
                            if (capability.type.value.subtype_of(capability_type))
                                templates_with_capability.push({ node_name, node, capability_name, capability })
                            })
                    }
                })
            }
        }
        // coherence
        if (templates_with_capability && capability_in_def)
            templates_with_capability = templates_with_capability.filter(ele => {
                let capability_type_name = ele.capability.type 
                return capability_type_name.value.subtype_of(capability_in_def.value) })
        // si la liste des templates possédant la capacité est vide, alors l'assignation est impossible
        if (templates_with_capability && (templates_with_capability.length == 0)) 
            throw(`Error : no node_template matching the expected capability value ${(this.capability) ? this.capability : capability_in_def}`)

        // identifier la relation ... // todo: cas ou this.relationship est un relationship assignment
        let relationship_template = null 
        if (this.relationship) {
            relationship_template = (topology.relationship_templates) ? topology.relationship_templates.get(this.relationship) : null
            //coherence
            if (relationship_template && relationship_in_def)
                if (relationship_template.type.value.subtype_of(relationship_in_def.type.value == false))
                    throw(`Error : the type of the relationship_template in requirement assignment (${this.relationship}) is not a subtype of the relationship type in the requirement definition (${node_in_def}) ${this._locate()})}`)
        }

        let relationship_types = null
        if (!relationship_template) {
            let relationship_type_name = this.relationship || relationship_in_def
            let relationship_type = (relationship_type_name) ? this.info.nodes.all_types.get(relationship_type_name, 'relationships') : null
            // coherence
            if (relationship_type && relationship_in_def)
                if (relationship_type.value.subtype_of(relationship_in_def.type.value == false))
                    throw(`Error : the type of the relationship in requirement assignment (${this.relationship}) is not a subtype of the relationship type in the requirement definition (${node_in_def}) ${this._locate()})}`)
            relationship_types = (relationship_type) ? [ [relationship_type_name, relationship_type] ] : null
        }
        if (!relationship_template && !relationship_types) relationship_types = this.info.nodes.all_types.get_types_of_the_category('relationships')
        
        // filtrer les nodes_templates.capabilities selon les valid_target_types des relations possibles et si pas ou plus d'une possibilité, alors erreur
        let results = []
        if (templates_with_capability && relationship_template) {
            templates_with_capability.forEach(ele => {
                let capability_def = ele.capability
                let capability_type = ele.capability.type.value
                let node = ele.node
                let candidate_relationships = []
                let valid_target_types = relationship_template.type.value.valid_target_types
                if (valid_target_types && valid_target_types.length > 0) {
                    valid_target_types.forEach(valid_capability_type => {
                        if (capability_type.subtype_of(valid_capability_type.value))
                            candidate_relationships.push(relationship_template)
                    })
                } else {
                    candidate_relationships.push(relationship_template)
                }
                let result = {  
                    node:           node, 
                    capability_def: capability_def, 
                    capability_type: capability_type, 
                    relationships: candidate_relationships
                }
                results.push(result)
            })
        }
        if (templates_with_capability && relationship_types) {
            templates_with_capability.forEach(ele => {
                let capability_def = ele.capability
                let capability_type = ele.capability.type.value
                let node = ele.node
                let candidate_relationships = []
                relationship_types.forEach(relationship_type => {
                    let valid_target_types = relationship_type.valid_target_types
                    if (valid_target_types && valid_target_types.length > 0) {
                        valid_target_types.forEach(valid_capability_type => {
                            if (capability_type.subtype_of(valid_capability_type.value))
                                candidate_relationships.push(relationship_type)
                        })
                    } else {
                        candidate_relationships.push(relationship_type)
                    }
                })
                let result = {  
                    node:               node, 
                    capability_def:     capability_def,
                    capability_type:    capability_type,
                    relationships:      candidate_relationships.filter(relationship_type => relationship_type.name != "Root")
                }
                results.push(result)
            })
        }
        switch (results.length) {
            case 1:
                this.node                   = results[0].node
                this.capability_def         = results[0].capability_def
                this.capability_type        = results[0].capability_type
                this.relationships          = results[0].relationships
                break; 
            case 0:
                throw(`Error : No node template matches the requirement assignment ${this._locate()}`)
            default: 
                throw(`Error : More than 1 template (${results.map(ele => ele.node.name)}) matches the requirement assignment ${this._locate()}`)
        }

        // todo : traiter les node_filter
    }
    
}

class TRequirementAssignments extends TList {
    constructor(args, info=null) {
        super(args, info)
        this.by_name = {}
        this.forEach(def => this.by_name[def.name.valueOf()] = def)
    }


    get(name) {
        return this.by_name(name.valueOf())
    }

    resolve_assignment_type(requirement_defs) {
        this.forEach((value) => value.resolve_assignment_type(requirement_defs.get(value.name) ))
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
                throw (`Error : ${operator} is not an allowed operator in a workflow condition ${this._locate()}`)
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
        if (args.has('set_state')) {
            this.type_activity = 'set_state'
            this.set_member('set_state')
        } else {
            let delegate = args.get('delegate')
            if (delegate) {
                this.type_activity = 'delegate'
                this.set_member('workflow', {from: delegate, default: delegate})
                this.set_member('inputs', {from: delegate})
            } else {
                let inline = args.get('inline')
                if (inline) {
                    this.type_activity = 'inline'
                    this.set_member('workflow', {from: inline, default: inline})
                    this.set_member('inputs', {from: delegate})
                } else {
                    let call_operation = args.get('call_operation')
                    if (call_operation) {
                        this.type_activity = 'call_operation'
                        this.set_member('operation', {from: call_operation, default: call_operation})
                        this.set_member('inputs', {from: delegate})
                        let idx = this.operation.lastIndexOf('.')
                        if (idx > -1) {
                            this.operation_name = this.operation.substr(idx+1)
                            this.interface_name = this.operation.substr(0, idx)
                        } else throw(`Error : call_operation value '${this.operation}' non valide (doit être de la forme <nom_interface>.<nom_operation> ${this._locate()})`)
                    }
                }
            }
        }
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

class TWorkflowSourceWeavingList extends TList {
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

class TWorkflowTargetWeavingList extends TList {
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

    resolve_definition_type_name() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'nodes')
        this.is_resolved = true
    }

    resolve_assignment_type_name() {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
        this.attributes && this.attributes.resolve_assignment_type(this.type.value.attributes)
        this.capabilities && this.capabilities.resolve_assignment_type(this.type.value.capabilities)
    }

    resolve_requirement_assignment_type_name() {
        this.requirements && this.requirements.resolve_assignment_type(this.type.value.requirements)
    }

}

class TNodeTemplates extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignment_type_name() {
        this.forEach((value, key, map) => value.resolve_assignment_type_name() )
        this.forEach((value, key, map) => value.resolve_requirement_assignment_type_name() )
    }

}

class TRelationshipTemplate extends TDefinition {
    constructor(args, info=null) {
        super(args, info)
        this.set_members(['type', 'metadata', 'description', 'properties', 'attributes', 'interfaces', 'copy'])
    }

    resolve_definition_type_name() {
        if (this.is_resolved) return
        this.type.value = this.info.nodes.all_types.get(this.type, 'relationships')
        this.is_resolved = true
    }

    resolve_assignment_type_name() {
        this.properties && this.properties.resolve_assignment_type(this.type.value.properties)
        this.attributes && this.attributes.resolve_assignment_type(this.type.value.attributes)
        this.interfaces && this.interfaces.resolve_assignment_type(this.type.value.interfaces)
    }

}

class TRelationshipTemplates extends TMap {
    constructor(args, info=null) {
        super(args, info)
    }

    resolve_assignment_type_name() {
        this.forEach((value, key, map) => value.resolve_assignment_type_name() )
    }
}

class TTopologyTemplate extends TRoot {
    constructor(args, info=null) {
        super(args, info)
        this.imported=[]
        this.set_members(['description', 'inputs', 'outputs', 'node_templates', 'relationship_templates',
                            'groups', 'policies', 'substitution_mappings', 'workflows'])
    }

    resolve_assignment_type_name() {
        this.groups && this.groups.resolve_assignment_type_name()
        this.policies && this.policies.resolve_assignment_type_name()
        this.relationship_templates && this.relationship_templates.resolve_assignment_type_name()
        this.node_templates && this.node_templates.resolve_assignment_type_name()
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
            types && types.forEach( (value, id, map) => {
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
        args.forEach( (value, key, map) => this[key] = value )
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
    TInput, TInputs, TInputAssignments, TOutput, TOutputs, TCredential, TRepository, TRepositories,
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