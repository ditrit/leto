import { Prog } from './model.js'

export class modelInter extends Object {
    constructor() {
        super()
        this.progInter = new Prog() 
    }

    modification(prog) {
        let temp = 0
        for(var nodeType in prog.nodeTypes) {
            for(var nodeTypeInter in this.progInter.nodeTypes) {
                if(nodeType == nodeTypeInter) {
                    temp = -1
                    if(nodeType.start != nodeTypeInter.start) {
                        this.progInter.nodeTypes[nodeType.name].start = nodeType.start
                    }
                    if(nodeType.stop != nodeTypeInter.stop) {
                        this.progInter.nodeTypes[nodeType.name].stop = nodeType.stop
                    } 
                    if(nodeType.derived != nodeTypeInter.derived) {
                        this.progInter.nodeTypes[nodeType.name].derived = nodeType.derived
                    }
                    if(nodeType.parentName != nodeTypeInter.parentName) {
                        this.progInter.nodeTypes[nodeType.name].parentName = nodeType.parentName
                    }
                    if(nodeType.parent != nodeTypeInter.parent) {
                        this.progInter.nodeTypes[nodeType.name].parent = nodeType.parent
                    }
                    if(nodeType.attributes != nodeTypeInter.attributes) {
                        this.progInter.nodeTypes[nodeType.name].attributes = nodeType.attributes
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
                    if(relationshipType.start != relationshipTypeInter.start) {
                        this.progInter.relationshipsTypes[relationshipType.name].start = relationshipType.start
                    }
                    if(relationshipType.stop != relationshipTypeInter.stop) {
                        this.progInter.relationshipsTypes[relationshipType.name].stop = relationshipType.stop
                    } 
                    if(relationshipType.derived != relationshipTypeInter.derived) {
                        this.progInter.relationshipsTypes[relationshipType.name].derived = relationshipType.derived
                    }
                    if(relationshipType.parentName != relationshipTypeInter.parentName) {
                        this.progInter.relationshipsTypes[relationshipType.name].parentName = relationshipType.parentName
                    }
                    if(relationshipType.parent != relationshipTypeInter.parent) {
                        this.progInter.relationshipsTypes[relationshipType.name].parent = relationshipType.parent
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
                    if(nodeTemplate.start != relationshipTypeInter.start) {
                        this.progInter.relationshipsTypes[nodeTemplate.name].start = nodeTemplate.start
                    }
                    if(nodeTemplate.stop != nodeTemplateInter.stop) {
                        this.progInter.nodeTemplates[nodeTemplate.name].stop = nodeTemplate.stop
                    } 
                    if(nodeTemplate.parentName != nodeTemplateInter.parentName) {
                        this.progInter.nodeTemplates[nodeTemplate.name].parentName = nodeTemplate.parentName
                    }
                    if(nodeTemplate.parent != nodeTemplateInter.parent) {
                        this.progInter.nodeTemplates[nodeTemplate.name].parent = nodeTemplate.parent
                    }
                }
            }
            if(temp == 0) {
                this.progInter.nodeTemplates[nodeTemplate] = prog.nodeTemplates[nodeTemplate]
            } else {
                temp = 0
            }
        }
    }
}