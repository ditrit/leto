export class ModelNode extends Object {
    constructor(ctx) {
        super();
        this.ctx = ctx
    }
}

export class Instructions extends ModelNode {
    constructor(ctx) {
        super(ctx)
    }

    errorPonctuation() {
        try {
            throw new Error(" ==> Forgotten semicolon \n")
        } catch (e) {
            console.error(e.name + e.message)
        }
    }
}

export class InstructionNode extends ModelNode {
    constructor(ctx) {
        super(ctx)
        this.nodeType = "Instruction"
    }
} 

function updateMaps(prog, event, node, nodeName, current, other, libelle) {
    for(let c in current) {
        try {
            let currentC = current[c]
            let newC = other[c]
            if(newC == null) {
                event.update(nodeName, libelle)
                console.log('Event : the ' + libelle + currentC.name + ' of nodeType ' + nodeName + ' has been deleted')
                delete(current[c])
            } else {
                currentC.update(newC)
            }
        } catch(error){
            event.update(nodeName, libelle)
            console.log('Event : the ' + libelle + 'of nodeType ' + nodeName + ' has been deleted')
            delete(current[c])
        }
    }

    for(let c in other) {
        try {
            let currentC = current[c]
            let newC = other[c]
            if(currentC == null) {
                current[c] = newC
                console.log('Event : the ' + libelle + current[c].name + ' of nodeType ' + nodeName + ' has been added')
                event.update(nodeName, libelle)
            }
        } catch(error){
            if(node == 'nodeType'){
                if(libelle == 'requirement '){
                    prog.nodeTypes[nodeName].requirements = other
                }
                if(libelle == 'capability '){
                    prog.nodeTypes[nodeName].capabilities = other
                }
                if(libelle == 'property '){
                    prog.nodeTypes[nodeName].properties = other
                }
                console.log('Event : the ' + libelle + 'of nodeType ' + nodeName + ' has been added')
                event.update(nodeName, libelle)
            } 
            if(node == 'nodeTemplate') {
                if(libelle == 'requirement '){
                    prog.nodeTemplates[nodeName].requirements = other
                }
                if(libelle == 'property '){
                    prog.nodeTemplates[nodeName].properties = other
                }
                console.log('Event : the ' + libelle + 'of nodeTemplate ' + nodeName + ' has been added')
                event.update(nodeName, libelle)
            }   
        } 
    }
}

export function nodeTypeFactory(prog, event, ctx, id, parentName, clauses) {
    let name = id.name
    let current = prog.nodeTypes[name]
    if (current == null) {
        current = new NodeType(prog, prog.version, name, parentName, clauses, ctx)
        prog.nodeTypes[name] = current
        ctx.model = current
        console.log("Creation : nodeType " + name)
        event.added(name, current)
        return current
    } else {
        return current.update(event, current, prog.version, parentName, clauses)
    }
}

class NodeType extends InstructionNode {
    constructor(prog, version, name, parentName, clauses, ctx) {
        super(ctx)
        this.prog = prog
        this.version = version
        this.start = ctx.start
        this.stop = ctx.stop
        this.id = name
        this.parentName = parentName
        this.parent = null
        this.properties = clauses.properties
        this.capabilities = clauses.capabilities
        this.requirements = clauses.requirements
    }

    update(event, current, version, parentName, clauses) {
        this.version = version
        if(parentName != null && this.parentName != null) {
            if(parentName.name != this.parentName.name) {
                this.parentName = parentName
                console.log('Event : nodeType ' + this.id + ' changed from parent')
                event.update(this.id, 'parentName')
            }
        }

        updateMaps(this.prog, event, 'nodeType', this.id, this.properties, clauses.properties, 'property ')
        updateMaps(this.prog, event, 'nodeType', this.id, this.capabilities, clauses.capabilities, 'capability ')
        updateMaps(this.prog, event, 'nodeType', this.id, this.requirements, clauses.requirements, 'requirement ')
    }

    checkType(prog) {
        if(this.parentName != null) {
            if (this.parentName == null) {
                try {
                    throw new Error(" : problem about name of parent")
                } catch (e) {
                    console.error(e.name + e.message)
                }
            }
            this.parent = prog.nodeTypes[this.parentName]
            if (this.parent == null) {
                try {
                    throw new Error(" : nodeType '" + this.parentName + "' is not defined.")
                } catch (e) {
                    console.error(e.name + e.message)
                    delete(prog.nodeTypes[this.id])
                }
            }
        }
    }

    errorNodeType() {
        try {
            throw new Error(" ==> cannot create a nodeType, " + this.id + " already exists, or " + this.parentName + " does not exist")
        } catch (e) {
            console.error(e.name + e.message)
            console.error("nodeType " + this.id.name + ((this.parentName != null) ? (" derived_from " + this.parentName.name) : "") + ' {' + this.attributes.join(",") + '}' + " ; \n")
        }
    }
}

export class Capability extends InstructionNode{
    constructor(id, typeName, ctx) {
        super(ctx)
        this.name = id.name
        this.typeName = typeName.name
    }

    update(other) {
        if(this.name == other.name) {
            if(this.equals(other)) {
                this.typeName = other.typeName
                console.log('Event : nodeType ' + this.name + ' changed from capability')
            }
        }
    }

    equals(other) {
        return (this.typeName != other.typeName) || (this.name != other.name)
    }
}

export class Property extends InstructionNode {
    constructor(type, id, typeName, ctx) {
        super(ctx)
        this.type = type
        this.name = id.name
        this.typeName = typeName.name
    }

    update(other) {
        if(this.name == other.name) {
            if(this.equals(other)) {
                this.typeName = other.typeName
                if(this.type == 'nodeType') {
                    console.log('Event : nodeType ' + this.name + ' changed from property')
                } else if(this.type == 'nodeTemplate') {
                    console.log('Event : nodeTemplate ' + this.name + ' changed from property')
                }
            }
        }
    }

    equals(other) {
        return (this.typeName != other.typeName) || (this.name != other.name)
    }
}

export class Requirement extends InstructionNode {
    constructor(type, id, node, ctx) {
        super(ctx)
        this.type = type
        this.name = id.name
        this.nodeName = node.name
    }

    update(other) {
        if(this.name == other.name) {
            if(this.equals(other)) {
                this.nodeName = other.nodeName
                if(this.type == 'nodeType') {
                    console.log('Event : nodeType ' + this.name + ' changed from requirement')
                } else if(this.type == 'nodeTemplate') {
                    console.log('Event : nodeTemplate ' + this.name + ' changed from requirement')
                }
            }
        }
    }

    equals(other) {
        return (this.nodeName != other.nodeName) || (this.name != other.name)
    }
}

export function nodeTemplateFactory(prog, event, ctx, id, parentName, clauses) {
    let name = id.name
    let current = prog.nodeTemplates[name]
    if (current == null) {
        current = new NodeTemplate(prog, prog.version, name, parentName, clauses, ctx)
        prog.nodeTemplates[name] = current
        ctx.model = current
        console.log("Creation : nodeTemplate " + name)
        event.added(name, current)
        return current
    } else {
        return current.update(event, current, prog.version, parentName, clauses)    
    }
}

class NodeTemplate extends InstructionNode {
    constructor(prog, version, name, parentName, clauses, ctx) {
        super(ctx)
        this.prog = prog
        this.version = version
        this.start = ctx.start
        this.stop = ctx.stop
        this.id = name
        this.parentName = parentName
        this.parent = null
        this.properties = clauses.properties
        this.requirements = clauses.requirements
    }

    update(event, current, version, parentName, clauses) {
        this.version = version
        if(parentName != null && this.parentName != null) {
            if(parentName.name != this.parentName.name) {
                this.parentName = parentName
                console.log('Event : nodeTemplate ' + this.id + ' changed from type')
                event.update(this.id, 'parentName')
            }
        }
        updateMaps(this.prog, event, 'nodeTemplate', this.id, this.properties, clauses.properties, 'property ')
        updateMaps(this.prog, event, 'nodeTemplate', this.id, this.requirements, clauses.requirements, 'requirement ')
    }

    checkType(prog) {
        if (this.parentName == null) {
            try {
                throw new Error(" : problem about name of parent")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
        this.parent = prog.nodeTypes[this.parentName]
        if (this.parent == null) {
            try {
                throw new Error(" : nodeType '" + this.parentName + "' is not defined.")
            } catch (e) {
                console.error(e.name + e.message)
                delete(prog.nodeTemplates[this.id])
            }
        }
        
        if(this.parent != null) {
            let i = 0
            for(let p in this.parent.properties) {
                i+=1
                for(let p2 in this.properties) {
                    if(p == p2) {
                        i+=-1
                    }
                }
            }
            if(i!=0) {
                try {
                    throw new Error(" : the properties of " + this.id + ' are different from the properties of parents ' + this.parentName)
                } catch (e) {
                    console.error(e.name + e.message)
                    delete(prog.nodeTemplates[this.id])
                }
            }

            for(let p in this.parent.properties) {
                let type = this.parent.properties[p].typeName
                let test = this.properties[p].typeName
                if(type == 'boolean') {
                    if(test != '0' && test != '1') {
                        try {
                            throw new Error(" : property " + this.properties[p].name + ' about nodeTemplate ' + this.id + ' is not a boolean type')
                        } catch (e) {
                            console.error(e.name + e.message)
                            delete(prog.nodeTemplates[this.id])
                        }
                    }
                }
                if(type == 'integer') {
                    for(let i=0; i<test.length-1; i++) {
                        if(test[i] == '.') {
                            try {
                                throw new Error(" : property " + this.properties[p].name + ' about nodeTemplate ' + this.id + ' is not an integer type')
                            } catch (e) {
                                console.error(e.name + e.message)
                                delete(prog.nodeTemplates[this.id])
                            }
                            return
                        }
                    }
                    test = parseInt(test)
                    if(isNaN(test)) {
                        try {
                            throw new Error(" : property " + this.properties[p].name + ' about nodeTemplate ' + this.id + ' is not an integer type')
                        } catch (e) {
                            console.error(e.name + e.message)
                            delete(prog.nodeTemplates[this.id])
                        }
                    }
                }
                if(type == 'string') {
                    if(test[0] != '"' || test[test.length-1] != '"') {
                        try {
                            throw new Error(" : property " + this.properties[p].name + ' about nodeTemplate ' + this.id + ' is not an string type')
                        } catch (e) {
                            console.error(e.name + e.message)
                            delete(prog.nodeTemplates[this.id])
                        }
                    }
                }
                if(type == 'float') {
                    test = parseFloat(test)
                    if(isNaN(test)) {
                        try {
                            throw new Error(" : property " + this.properties[p].name + ' about nodeTemplate ' + this.id + ' is not a float type')
                        } catch (e) {
                            console.error(e.name + e.message)
                            delete(prog.nodeTemplates[this.id])
                        }
                    }
                }
            }
        }  
    }

    errorNodeTemplate() {
        try {
            throw new Error(" ==> cannot create a nodeTemplate, check that the nodeType exist : " + this.parentName)
        } catch (e) {
            console.error(e.name + e.message)
            console.error("nodeTemplate " + this.id.name + " type " + this.parentName.name + " ; \n")
        }
    }
}

export class TerminalNode extends ModelNode {
    constructor(ctx) {
        super(ctx)
        this.nodeType = "Terminal"
    }
}

export class NumVal extends TerminalNode {
    constructor(num, ctx) {
        super(ctx)
        this.num = Number(num)
    }

    toString(){
        return String(this.num)
    }
}

export class StrVal extends TerminalNode {
    constructor(val, ctx) {
        super(ctx)
        this.str = String(val)
    }

    toString(){
        return this.str
    }
}

export class CommentVal extends TerminalNode {
    constructor(comment, ctx) {
        super(ctx)
        this.text = comment
    }

    toString(){
        return this.comment
    }
}

export class IdVal extends TerminalNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name
    }

    toString() {
        return this.name
    }
}

export class TypeVal extends TerminalNode {
    constructor(name, ctx) {
        super(ctx)
        this.name = name
    }

    toString() {
        return this.name
    }
}