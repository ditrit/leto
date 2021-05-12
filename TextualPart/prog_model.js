export class ProgModel {
    constructor() {
        this.nodeTypes = {}
        this.relationshipsTypes = {}
        this.nodeTemplates = {}
        this.relationships = {bySrc: {}, byDst: {}, byRel: {}}
        this.instructions = []
        this.update = []
        this.version = 0
    }

    checkType() {
        for (var key in this.nodeTypes) {
            this.nodeTypes[key].checkType(this)
        }
        for (var key in this.relationshipsTypes) {
            this.relationshipsTypes[key].checkType(this)
        }
        for (var key in this.nodeTemplates) {
            this.nodeTemplates[key].checkType(this)
        }
        let srcs = this.relationships.bySrc
        for (var src in srcs) {
            let dsts = srcs[src]
            for(var dst in dsts) {
                let rels = dsts[dst]
                for(var rel in rels) {
                    let labels = rels[rel]
                    for(var label in labels) {
                        this.relationships.bySrc[src][dst][rel][label].checkType(this)
                    }
                }
            }
        }
    }

    toString() {
        return `
    NodeTypes : ` +
        this.nodeTypes + `
    NodeTemplates : ` +
        this.nodeTemplates + `
    RelationshipsTypes : ` +
        this.relationshipsTypes + `
    Relationships : ` +
        this.relationships + `
    Version : ` +
        this.version
    }

    /*
    addNodeType(nodeType) {
        let id = nodeType.id.name
        let nodeTypesList = this.nodeTypes
        if(nodeTypesList[id] == null) {
            nodeTypesList[id] = nodeType
        } else {
            try {
                throw new Error(" ==> the nodeType " + id + " already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }


    addNodeTemplate(nodeTemplate) {
        let id = nodeTemplate.id.name
        let nodeTemplatesList = this.nodeTemplates

        if(nodeTemplatesList[id] == null) {
            nodeTemplatesList[id] = nodeTemplate
        } else {
            try {
                throw new Error(" ==> the nodeTemplate " + id + " already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }

    addRelationshipType(relationshipType) {
        let id = relationshipType.id.name
        let relationshipTypeList = this.relationshipsTypes

        if(relationshipTypeList[id] == null) {
            relationshipTypeList[id] = relationshipType
        } else {
            try {
                throw new Error(" ==> the relationshipType " + id + " already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }
    }

    addRelationship(relationship) {
        let src = relationship.srcName.name
        let dst = relationship.dstName.name
        let rel = relationship.relName.name
        let label  = relationship.label
        let srcRelationships = this.relationships.bySrc
        let dstRelationships = this.relationships.byDst
        let relRelationships = this.relationships.byRel
        if(srcRelationships[src] == null) {
            srcRelationships[src] = {}
        }
        if(srcRelationships[src][dst] == null) {
            srcRelationships[src][dst] = {}
        }
        if(srcRelationships[src][dst][rel] == null) {
            srcRelationships[src][dst][rel] = {}
        }
        if(srcRelationships[src][dst][rel][label] == null) {
            srcRelationships[src][dst][rel][label] = relationship
        } else {
            try {
                throw new Error(" ==> the relationship already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }

        if(dstRelationships[dst] == null) {
            dstRelationships[dst] = {}
        }
        if(dstRelationships[dst][src] == null) {
            dstRelationships[dst][src] = {}
        }
        if(dstRelationships[dst][src][rel] == null) {
            dstRelationships[dst][src][rel] = {}
        }
        if(dstRelationships[dst][src][rel][label] == null) {
            dstRelationships[dst][src][rel][label] = relationship
        } else {
            try {
                throw new Error(" ==> the relationship already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }

        if(relRelationships[rel] == null) {
            relRelationships[rel] = {}
        }
        if(relRelationships[rel][src] == null) {
            relRelationships[rel][src] = {}
        }
        if(relRelationships[rel][src][dst] == null) {
            relRelationships[rel][src][dst] = {}
        }
        if(relRelationships[rel][src][dst][label] == null) {
            relRelationships[rel][src][dst][label] = relationship
        } else {
            try {
                throw new Error(" ==> the relationship already exists")
            } catch (e) {
                console.error(e.name + e.message)
            }
        }  
    }*/
}



/*
export class modelInter extends Object {
    constructor() {
        super()
        this.progInter = new Prog() 
    }
    addNodeTypeInter(nodeType) {
        this.progInter.nodeTypes[nodeType.id.name] = nodeType
    } 
    modification(prog) {
        let temp = 0
        for(var nodeType in prog.nodeTypes) {
            for(var nodeTypeInter in this.progInter.nodeTypes) {
                if(nodeType == nodeTypeInter) {
                    temp = -1
                    if(prog.nodeTypes[nodeType].start != this.progInter.nodeTypes[nodeTypeInter].start) {
                        this.progInter.nodeTypes[nodeTypeInter].start = prog.nodeTypes[nodeType].start
                    }
                    if(prog.nodeTypes[nodeType].stop != this.progInter.nodeTypes[nodeTypeInter].stop) {
                        this.progInter.nodeTypes[nodeTypeInter].stop = prog.nodeTypes[nodeType].stop
                    }
                    if(prog.nodeTypes[nodeType].derived != this.progInter.nodeTypes[nodeTypeInter].derived) {
                        this.progInter.nodeTypes[nodeTypeInter].derived = prog.nodeTypes[nodeType].derived
                    }
                    if(prog.nodeTypes[nodeType].parentName != this.progInter.nodeTypes[nodeTypeInter].parentName) {
                        this.progInter.nodeTypes[nodeTypeInter].parentName = prog.nodeTypes[nodeType].parentName
                    }
                    if(prog.nodeTypes[nodeType].parent != this.progInter.nodeTypes[nodeTypeInter].parent) {
                        this.progInter.nodeTypes[nodeTypeInter].parent = prog.nodeTypes[nodeType].parent
                    }
                    if(prog.nodeTypes[nodeType].attributes != this.progInter.nodeTypes[nodeTypeInter].attributes) {
                        this.progInter.nodeTypes[nodeTypeInter].attributes = prog.nodeTypes[nodeType].attributes
                    }
                }
            }
            if(temp == 0) {
                this.progInter.nodeTypes[nodeType] = prog.nodeTypes[nodeType]
            } else {
                temp = 0
            }
        }
        
        for(var relationshipType in prog.relationshipsTypes) {
            for(var relationshipTypeInter in this.progInter.relationshipsTypes) {
                if(relationshipType == relationshipTypeInter) {
                    temp = -1
                    if(prog.relationshipsTypes[relationshipType].start != this.progInter.relationshipsTypes[relationshipTypeInter].start) {
                        this.progInter.relationshipsTypes[relationshipTypeInter].start = prog.relationshipsTypes[relationshipType].start
                    }
                    if(prog.relationshipsTypes[relationshipType].stop != this.progInter.relationshipsTypes[relationshipTypeInter].stop) {
                        this.progInter.relationshipsTypes[relationshipTypeInter].stop = prog.relationshipsTypes[relationshipType].stop
                    }
                    if(prog.relationshipsTypes[relationshipType].derived != this.progInter.relationshipsTypes[relationshipTypeInter].derived) {
                        this.progInter.relationshipsTypes[relationshipTypeInter].derived = prog.relationshipsTypes[relationshipType].derived
                    }
                    if(prog.relationshipsTypes[relationshipType].parentName != this.progInter.relationshipsTypes[relationshipTypeInter].parentName) {
                        this.progInter.relationshipsTypes[relationshipTypeInter].parentName = prog.relationshipsTypes[relationshipType].parentName
                    }
                    if(prog.relationshipsTypes[relationshipType].parent != this.progInter.relationshipsTypes[relationshipTypeInter].parent) {
                        this.progInter.relationshipsTypes[relationshipTypeInter].parent = prog.relationshipsTypes[relationshipType].parent
                    }
                }
            }
            if(temp == 0) {
                this.progInter.relationshipsTypes[relationshipType] = prog.relationshipsTypes[relationshipType]
            } else {
                temp = 0
            }
        }
        for(var nodeTemplate in prog.nodeTemplates) {
            for(var nodeTemplateInter in this.progInter.nodeTemplates) {
                if(nodeTemplate == nodeTemplateInter) {
                    temp = -1
                    if(prog.nodeTemplates[nodeTemplate].start != this.progInter.nodeTemplates[nodeTemplateInter].start) {
                        this.progInter.nodeTemplates[nodeTemplateInter].start = prog.nodeTemplates[nodeTemplate].start
                    }
                    if(prog.nodeTemplates[nodeTemplate].stop != this.progInter.nodeTemplates[nodeTemplateInter].stop) {
                        this.progInter.nodeTemplates[nodeTemplateInter].stop = prog.nodeTemplates[nodeTemplate].stop
                    }
                    if(prog.nodeTemplates[nodeTemplate].parentName != this.progInter.nodeTemplates[nodeTemplateInter].parentName) {
                        this.progInter.nodeTemplates[nodeTemplateInter].parentName = prog.nodeTemplates[nodeTemplate].parentName
                    }
                    if(prog.nodeTemplates[nodeTemplate].parent != this.progInter.nodeTemplates[nodeTemplateInter].parent) {
                        this.progInter.nodeTemplates[nodeTemplateInter].parent = prog.nodeTemplates[nodeTemplate].parent
                    }
                }
            }
            if(temp == 0) {
                this.progInter.nodeTemplates[nodeTemplate] = prog.nodeTemplates[nodeTemplate]
            } else {
                temp = 0
            }
        }
        for(var relationship in prog.relationships) {
        }
    
    }
    supression(prog) {
        let temp = -1
        for(var nodeTypeInter in this.progInter.nodeTypes) {
            for(var nodeType in prog.nodeTypes) {
                if(nodeTypeInter == nodeType) {
                    temp = 0
                }
            }
            if(temp == -1) {
                delete(this.progInter.nodeTypes[nodeTypeInter])
            } else {
                temp = -1
            }
        }
        for(var nodeTemplateInter in this.progInter.nodeTemplates) {
            for(var nodeTemplate in prog.nodeTemplates) {
                if(nodeTemplateInter == nodeTemplate) {
                    temp = 0
                }
            }
            if(temp == -1) {
                delete(this.progInter.nodeTemplates[nodeTemplateInter])
            } else {
                temp = -1
            }
        }
        for(var relationshipTypeInter in this.progInter.relationshipsTypes) {
            for(var relationshipType in prog.relationshipsTypes) {
                if(relationshipTypeInter == relationshipType) {
                    temp = 0
                }
            }
            if(temp == -1) {
                delete(this.progInter.relationshipsTypes[relationshipTypeInter])
            } else {
                temp = -1
            }
        }
    }
}*/