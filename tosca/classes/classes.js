function _locate(info, range) {
    if (info) {
        let begin = info.index.fromIndex( (range[0] > 1 ) ? range[0] : 0 )
        let end = info.index.fromIndex( (range[1] > 1 ) ? range[1]  : 0 )
        let loc_str = ` at ${begin.line}:${begin.col} <-> ${end.line}:${end.col} ${(info.filename) ? 'in ' + info.filename : '' }`
        return loc_str
    } else return ""
}

class TString extends String {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
    }

    toTosca(imbric=0) {
        return this
    }
}

class TInteger extends Number {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TUnbounded extends Number {
    constructor(args, info=null) {
        super(Infinity)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TBoolean extends Boolean {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
    }

    toTosca(imbric=0) {
        return this
    }
}

class TFloat  extends Number {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TNamespace extends String {
    constructor(args, info=null) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TRange {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.min = args[0]
        this.max = args[1]
        if (this.min == Infinity) this.min = -Infinity
    }

    toTosca(imbric=0) {
        return this
    }
}

class TMetadata {
    constructor(args, info=null) {
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
    constructor(args, info=null) {
        super(args)
        this.range = args.range
    }
    toTosca(imbric) {
        return this
    }
}

class TScalarUnit {
    constructor(args, info=null) {
        this.fromYaml = (typeof args == 'object') 
        this.args  = args
        this.range = (this.fromYaml) ? args.range : null 
        this.value = (this.fromYaml) ? parseFloat(args.parts.value) : Math.abs(args)
        this.sign  = (this.fromYaml) ? ( ( args.parts.sign == '-') ? -1 : 1 ) : Math.sign(args)
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
    constructor(args, info=null){
        super(...args)
        this.args = args
        this.range = args.range
        this.info = info
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

class TMap extends Map {
    constructor(args, info){
        super(args)
        this.args = args
        this.range = args.range
    }

    toTosca(imbric) {
        let indent = '\n' + '  '.repeat(imbric)
        let str = ""
        return str
    }
}

class TValueExpression {
    constructor(args, info) { 
        this.args = args
        this.range = args.range
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
        return this.every(x => x.eval(constrained_value) )
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

    toTosca(imbric=0) { 
        let indent = '\n' + '  '.repeat(imbric)
        let str = `${indent}{ ${this.operator}: ${this.value} }`
        return str
    }
}

class TTypeDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let isMap = args instanceof Map         
        this.type = (isMap) ? args.get('type') : args
        if (!this.type) { throw(`Error : No type field found in a Tosca entity ${_locate(info, args.range)}`) }
        this.description = (isMap) ? this.args.get('description') : null
        this.constraints = (isMap) ? this.args.get('constraints') : null
        let entry_schema = (isMap) ? this.args.get('entry_schema') : null
        if (entry_schema && this.type.valueOf() != 'list' && this.type.valueOf() != 'map' )
            throw(`Error : schema_entry to be provided only for types 'list' or 'map'  ${_locate(info, args.range)}`)
        this.entry_schema = (entry_schema) ? new TTypeDef(entry_schema) : null
        let key_schema = (isMap) ? this.args.get('key_schema') : null
        if (key_schema && this.type.valueOf() != 'map' )
            throw(`Error : key_schema to be provided only for types 'map'  ${_locate(info, args.range)}`)
        this.key_schema = (key_schema) ? new TTypeDef(key_schema) : null
    }
}

class TParameterAssignment {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let isMap = args instanceof Map
        this.value = (isMap) ? args.get('value') : args
        this.description = (isMap) ? args.get('description') : null
    }
    toTosca(imbric=0) {
        return this
    }
}

class TProperty {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.type = new TTypeDef(args)
        this.description = args.get('description')
        this.constraints = args.get('constraints')
        this.required = args.get('required') || false
        this.default = args.get('default')
        this.status = args.get('status')
        this.metadata = args.get('metadata')
    }
    toTosca(imbric=0) {
        return this
    }
}

class TProperties extends TMap {
    constructor(args, info) {
        this.args = args
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TPropertyAssignments extends TMap {
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
        this.type = new TTypeDef(args)
        this.description = args.get('description')
        this.default = args.get('default')
        this.status = args.get('status')
        this.metadata = args.get('metadata')
    }
    toTosca(imbric=0) {
        return this
    }
}

class TAttributes extends TMap {
    constructor(args, info) {
        this.args = args
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TAttributeAssignements extends TMap {
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
        this.type = new TTypeDef(args)
        this.description = args.get('description')
        this.constraints = args.get('constraints')
        this.required = args.get('required') || false
        this.default = args.get('default')
        this.status = args.get('status')
        this.value = args.get('value')
    }

    toTosca(imbric=0) {
        return this
    }
}

class TInputs extends TMap {
    constructor(args, info) {
        this.args = args
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}
class TInputAssignements extends TMap {
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
        this.type = new TTypeDef(args)
        this.description = args.get('description')
        this.constraints = args.get('constraints')
        this.required = args.get('required') || false
        this.default = args.get('default')
        this.status = args.get('status')
        this.value = args.get('value')
    }
    toTosca(imbric=0) {
        return this
    }
}

class TOutputs extends TMap {
    constructor(args, info) {
        this.args = args
        this.range = args.range
    }
    toTosca(imbric=0) {
        return this
    }
}

class TCredential {
    constructor(args, info = null) {
        this.args = args
        this.range = args.range
        if (args instanceof Map) {
          this.token = args.get('token')
          this.protocol = args.get('protocol')
          this.token_type = args.get('token_type')
          this.user = args.get('user')
        } else return null
    }

    toTosca(imbric=0) {
        return this
    }
}

class TRepository {
    constructor(args, info = null) {
        this.args = args
        this.range = args.range
        let isMap = args instanceof Map         
        this.url = (isMap) ? args.get('url') : args
        if (!this.type) { throw(`Error : No type field found in a Tosca entity ${_locate(info, args.range)}`) }
        this.credential = new TCredential(args)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TArtifactDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let isMap = args instanceof Map
        this.file = (isMap) ? args.file : args
        this.type = (isMap) ? args.type : null
        this.repository = (isMap) ? args.repository : null
        this.deploy_path = (isMap) ? args.deploy_path : null
        this.version = (isMap) ? args.version : null
        this.checksum = (isMap) ? args.checksum : null
        this.checksum_algorithm = (isMap) ? args.checksum_algorithm : null
        this.properties = (isMap) ? args.properties : null
    }
    toTosca(imbric=0) {
        return this
    }
}

class TEntity {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.derived_from = args.get('derived_from')
        this.version = args.get('version')
        this.metadata = args.get('metadata')
        this.description = args.get('description')
    }

    toTosca(imbric=0) {
        return this
    }    
}

class TDataType extends TEntity{
    constructor(args, info) {
        super(args, info)
        this.category = 'datatypes'
        this.properties = args.get('properties')
        this.constraints = args.get('constraints')
        this.key_schema = args.get('key_schema')
        this.entry_schema = args.get('key_schema')
        if (this.key_schema && this.derived_from.valueOf() != 'map') {
            throw(`Error : 'key_schema' field is only allowed for data_types derived from 'map' ${_locate(info, args.range)}`) }
        if (this.entry_schema && this.derived_from.valueOf() != 'map' && this.derived_from.valueOf() != 'list') {
            throw(`Error : 'key_schema' field is only allowed for data_types derived from 'map' ${_locate(info, args.range)}`) }
    }

    toTosca(imbric=0) {
        return this
    }    
}

class TDataTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TArtifactType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'artifacts'
        this.properties = this.args.get('properties')
        this.mime_type = this.args.get('mime_type')
        this.file_ext = this.args.get('file_ext')
    }

    toTosca(imbric=0) {
        return this
    }    
}

class TArtifactTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TCapabilityType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'capabilities'
        this.properties =  this.args.get('properties')
        this.attributes =  this.args.get('attributes')
        this.valid_source_types =  this.args.get('valid_source_types')
    }

    toTosca(imbric=0) {
        return this
    }    
}

class TCapabilityTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}


class TInterfaceType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'interfaces'
        this.properties = args.get('properties')
        this.operations = {}
        args.forEach(function(value, key, map){ 
            if (! (['derived_from', 'version', 'metadata', 'description', 'properties'].includes(key)) )
                this.operations[key] = value
         })
    }
}

class TInterfaceTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}


class TImplementation {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let isMap = args instanceof Map
        this.primary = (isMap) ? args.get('primary') : args
        this.dependencies = (isMap) ? args.get('dependencies') : null
    }
    toTosca(imbric=0) {
        return this
    }
}

class TOperationDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.description = args.get('description')
        this.inputs = args.get('inputs')
        this.implementation = args.get('implementation')
    }
    toTosca(imbric=0) {
        return this
    }
}

class TOperationDefTemplate {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.description = args.get('description')
        this.inputs = args.get('inputs')
        this.implementation = args.get('implementation')
    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.type = args.get('type')
        this.inputs = args.get('inputs')
        this.operations = {}
        args.forEach(function(value, key, map){ 
            if (! (['type', 'inputs'].includes(key)) )
                this.operations[key] = value
         })
    }
    toTosca(imbric=0) {
        return this
    }
}
class TInterfaceDefTemplate {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.inputs = args.get('inputs')
        this.operations = {}
        args.forEach(function(value, key, map){ 
            if (! (['inputs'].includes(key)) )
                this.operations[key] = value
         })
    }
    toTosca(imbric=0) {
        return this
    }
}
class TCapabilityDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let isMap = args instanceof Map
        this.type = (isMap) ? args.get('type') : args
        this.description = (isMap) ? args.get('description') : null
        this.properties = (isMap) ? args.get('properties') : null
        this.attributes  = (isMap) ? args.get('attributes') : null
        this.valid_source_types = (isMap) ? args.get('valid_source_types') : null
        this.occurrences = (isMap) ? args.get('occurrences') || new TRange( [ 1, Infinity ]) : null
    }
    toTosca(imbric=0) {
        return this
    }
}

class TCapabilityAssignment {
    constructor(args, info = null) {
        this.args = args
        this.range = args.range
        this.properties = args.get('properties')
        this.attributes = args.get('attributes')
        this.occurrences = args.get('occurrences')
    }
    toTosca(imbric=0) {
        return this
    }
}

class TPropertyFilter {
    constructor(args, info = null) {
        this.args = args
        this.range = args.range
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

    toTosca(imbric=0) {
        return this
    }
}

class TPropertiesFilter extends Array {
    constructor(args, info = null) {
        super(...args)
        this.args = args
        this.range = args.range
    }

    apply(args) {
        return []
    }

    toTosca(imbric=0) {
        return this
    }
}

class TCapabilityFilter {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let [ name, def ] = args.entries().next().value
        this.name = name
        // because of the grammar, 'def' has only one key : 'propertties'
        this.properties = def.values().next().value
    }
    toTosca(imbric=0) {
        return this
    }
}

class TCapabilitiesFilter extends Array {
    constructor(args, info = null) {
        super(...args)
        this.args = args
        this.range = args.range
    }

    apply(args) {
        return []
    }

    toTosca(imbric=0) {
        return this
    }
}

class TNodeFilter {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.properties = args.get('properties')
        this.capabilities = args.get('capabilities')
    }
    toTosca(imbric=0) {
        return this
    }
}

class TRelationshipDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let isMap = def instanceof Map
        this.type = (isMap) ? args.get('type') : args
        this.interfaces = (isMap) ? args.get('interfaces') : null
    }
}
 
class TRelationshipAssignment {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let isMap = def instanceof Map
        this.type = (isMap) ? args.get('type') : args
        this.properties = (isMap) ? args.get('properties') : null
        this.interfaces = (isMap) ? args.get('interfaces') : null
    }
}

class TRequirementDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let [ name, def ] = args.entries().next().value
        this.name = name
        let isMap = def instanceof Map
        this.capability = (isMap) ? def.get('capability') : def
        this.description = (isMap) ? def.get('description') : null
        this.node = (isMap) ? def.get('node') : null
        this.occurrences = (isMap) ? def.get('occurrences') : null
        this.relationship = (isMap) ? def.get('relationship') : null
    }
    toTosca(imbric=0) {
        return this
    }
}

class TRequirementAssignment {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        let [ name, def ] = args.entries().next().valueoperator = 
        this.name = name
        let isMap = def instanceof Map
        this.node = (isMap) ? def.get('node') : def
        this.relationship = (isMap) ? def.get('relationship') : null
        this.capability = (isMap) ? def.get('capability') : null
        this.range = (isMap) ? def.get('range') : null
        this.node_filter = (isMap) ? def.get('node_filter') : null
    }
    toTosca(imbric=0) {
        return this
    }
}

class TWorkflowConditionOperator {
    constructor(args, info=null) {
        this.args  = args
        this.range = args.range
        this.info = info
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

class TWorkflowConditionClause extends Array {
    constructor(args, info=null) {
        super(...args, info)
        this.args  = args
        this.range = args.range
    }

    eval(entity) {
        return this.every( value => value.eval(entity) )
    }
}

class TWorkflowPrecondition {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.target = args.get('target')
        this.target_relationship = args.get('target_relationship')
        this.condition = args.get('condition')
    }
}

class TWorkflowPreconditions extends TList {
    constructor(args, info=null) {
        super(args)
    }

}

class TWorkflowActivity {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.delegate = args.get('delegate')
        this.set_state = args.get('set_state')
        this.call_operation = args.get('call_operation')
        this.inline = args.get('inline')
    }
}

class TWorkflowActivities extends TList {
    constructor(args, info=null) {
        super(args)
    }
}

class TWorkflowStep extends TMap {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.info = info
        this.target = args.get('target')
        this.target_relationship = args.get('target_relationship')
        this.filter = args.get('filter')
        this.activities = args.get('activities')
        this.operation_host = args.get('operation_host')
        this.on_success = args.get('on_success')
        this.on_success = (this.on_success instanceof Array) ? this.on_success : [ this.on_success ] 
        this.on_failure = args.get('on_failure')
        this.on_failure = (this.on_failure instanceof Array) ? this.on_failure : [ this.on_failure ] 
    }
    toTosca(imbric=0) {
        return this
    }
}

class TWorkflowSteps extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TWorkflowSourceWeaving {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.after = args.get('after')
        this.before = args.get('before')
        this.wait_target = args.get('wait_target')
        this.activity = args.get('activity')
    }
}

class TWorkflowSourceWeavingList extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TWorkflowTargetWeaving {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.after = args.get('after')
        this.before = args.get('before')
        this.wait_source = args.get('wait_source')
        this.activity = args.get('activity')
    }
}

class TWorkflowTargetWeavingList extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TDeclarativeWorkflowNodeDef {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.description = args.get('description')
        this.metadata = args.get('metadata')
        this.inputs = args.get('inputs')
        this.preconditions = args.get('preconditions')
        this.steps = args.get('steps')
    }
}

class TDeclarativeWorkflowNodeDefs extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TDeclarativeWorkflowRelDef {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.description = args.get('description')
        this.metadata = args.get('metadata')
        this.inputs = args.get('inputs')
        this.preconditions = args.get('preconditions')
        this.source_weaving = args.get('source_weaving')
        this.target_weaving = args.get('target_weaving')
    }
}

class TDeclarativeWorkflowRelDefs extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TImperativeWorkflowDef {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.description = args.get('description')
        this.metadata = args.get('metadata')
        this.inputs = args.get('inputs')
        this.preconditions = args.get('preconditions')
        this.steps = args.get('steps')
    }
}

class TImperativeWorkflowDefs extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TNodeType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'nodes'
        this.properties = this.args.get('properties')
        this.attributes = this.args.get('attributes')
        this.capabilities = this.args.get('capabilities')
        this.requirements = this.args.get('requirements')
        this.interfaces = this.args.get('interfaces')
        this.workflows = this.args.get('workflows')
    }
}

class TNodeTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TRelationshipType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'relationships'
        this.properties = this.args.get('properties')
        this.attributes = this.args.get('attributes')
        this.interfaces = this.args.get('interfaces')
        this.workflows = this.args.get('workflows')
        this.valid_target_types = this.args.get('valid_target_types')
    
    }
}

class TRelationshipTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TGroupType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'groups'
        this.properties = this.args.get('properties')
        this.capabilities = this.args.get('capabilities')
        this.requirements = this.args.get('requirements')
        this.interfaces = this.args.get('interfaces')
        this.members = this.args.get('members')
    }

}

class TGroupTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TGroupDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.info = info
        this.type = args.get('type')
        this.description = this.args.get('description')
        this.properties = this.args.get('properties')
        this.interfaces = this.args.get('interfaces')
        this.members = this.args.get('members')
    }
}

class TGroupDefs extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TEvent {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        let isMap = args instanceof Map
        this.type = (isMap) ? args.entries().next().value : args
    }
}

class TTargetFilter {
    constructor(args, info=null) {
        this.args = args
        this.range = args.range
        this.info = info
        this.node = args.get('node')
        this.requirement = args.get('requirement')
        this.capability = args.get('capability')
    }
}

class TTriggerDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.info = info
        let [ name, def ] = args.entries().next().value
        this.name = name
        this.description = def.get('description')
        this.event = def.get('event')
        this.schedule = def.get('schedule')
        this.target_filter = def.get('target_filter')
        let condition =  def.get('target_filter')
        this.condition = (condition instanceof TConstraint) ? condition : condition.values().next().value
        this.period = def.get('period')
        this.evaluations = def.get('evaluations')
        this.method = def.get('method')
        this.action = def.get('action')
    }
}

class TTriggerDefs extends TList {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TPolicyType extends TEntity {
    constructor(args, info) {
        super(args, info)
        this.category = 'policies'
        this.properties = this.args.get('properties')
        this.target = this.args.get('target')
        this.triggers = this.args.get('triggers')
    }
}

class TPolicyTypes extends TMap {
    constructor(args, info) {
        super(args, info)
    }
    toTosca(imbric=0) {
        return this
    }
}

class TPolicyDef {
    constructor(args, info) {
        this.args = args
        this.range = args.range
        this.info = info
        let [ name, def ] = args.entries().next().value
        this.name = name
        this.type = def.get('type')
        this.description = def.get('description')
        this.properties = def.get('properties')
        this.targets = def.get('targets')
        this.triggers = def.get('triggers')
    }
}

class TPolicyDefs extends TMap {
    constructor(args, info) {
        super(args, info)
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
    TUnbounded,
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
    TValueExpression,
    TImport,
    TConstraint,
    TConstraints,
    TTypeDef,
    TParameterAssignment,
    TProperty,
    TProperties,
    TPropertyAssignments,
    TAttribute,
    TAttributes,
    TAttributeAssignements,
    TInput,
    TInputs,
    TInputAssignements,
    Toutput,
    TOutputs,
    TCredential,
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
    TPropertiesFilter,
    TCapabilityFilter,
    TCapabilitiesFilter,
    TNodeFilter,
    TRelationshipAssignment,
    TRelationshipDef,
    TRequirementDef,
    TRequirementAssignment,
    TSubstitutionMappings,
    TTopologyTemplate,
    TServiceTemplate,
    TDataType,
    TDataTypes,
    TArtifactType,
    TArtifactTypes,
    TCapabilityType,
    TCapabilityTypes,
    TInterfaceType,
    TInterfaceTypes,
    TWorkflowConditionClause,
    TWorkflowConditionOperator,
    TWorkflowPrecondition,
    TWorkflowPreconditions,
    TWorkflowActivity,
    TWorkflowActivities,
    TWorkflowStep,
    TWorkflowSteps,
    TWorkflowSourceWeaving,
    TWorkflowSourceWeavingList,
    TWorkflowTargetWeaving,
    TWorkflowTargetWeavingList,
    TDeclarativeWorkflowNodeDef,
    TDeclarativeWorkflowNodeDefs,
    TDeclarativeWorkflowRelDefs,
    TDeclarativeWorkflowRelDef,
    TImperativeWorkflowDefs,
    TImperativeWorkflowDef,
    TNodeType,
    TNodeTypes,
    TRelationshipType,
    TRelationshipTypes,
    TGroupType,
    TGroupTypes,
    TGroupDef,
    TGroupDefs,
    TEvent,
    TTargetFilter,
    TTriggerDef,
    TTriggerDefs,
    TPolicyType,
    TPolicyDef,
    TPolicyDefs,
    TPolicyTypes
}

Object.freeze(classes)

module.exports = classes


