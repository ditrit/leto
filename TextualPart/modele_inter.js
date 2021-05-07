import { Prog } from './model.js'

export class modelInter extends Object {
    constructor() {
        super()
        this.progInter = new Prog() 
    }

    modification(prog) {
        let testVide = Object.keys(this.progInter).length
        if(this.progInter != null) {
            for(var nodeType in prog.nodeTypes) {
                this.progInter.nodeTypes[nodeType] = nodeType
            }
            for(var relationshipType in prog.relationshipsTypes) {
                this.progInter.relationshipsTypes[relationshipType] = relationshipType
            }
            for(var nodeTemplate in prog.nodeTemplates) {
                this.progInter.nodeTemplates[nodeTemplate] = nodeTemplate
            }
            for(var relationship in prog.relationships) {
                this.progInter.relationships[relationship] = relationship
            }
        } else {
            for(var nodeType in prog.nodeTypes) {
                for(var nodeTypeInter in this.progInter.nodeTypes) {
                    if(nodeType.name != nodeTypeInter.name) {
                        this.progInter.nodeTypes[nodeType.name] = nodeType
                    }
                }
            }
        } 
    }
}