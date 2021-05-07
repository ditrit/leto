import { Prog } from './model.js'

export class modelInter extends Object {
    constructor() {
        super()
        this.progInter = new Prog() 
    }

    modification(prog) {
        if(Object.keys(this.progInter.nodeTypes).length == false) {
            for(var nodeType in prog.nodeTypes) {
                this.progInter.nodeTypes[nodeType] = nodeType
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

        if(Object.keys(this.progInter.relationshipsTypes).length == false) {
            for(var relationshipType in prog.relationshipsTypes) {
                this.progInter.relationshipsTypes[relationshipType] = relationshipType
            }
        } else {

        }

        if(Object.keys(this.progInter.nodeTemplates).length == false) {
            for(var nodeTemplate in prog.nodeTemplates) {
                this.progInter.nodeTemplates[nodeTemplate] = nodeTemplate
            }
        } else {

        }

        if(Object.keys(this.progInter.relationships.bySrc).length == false) {
            for(var relationshipSrc in prog.relationships.bySrc) {
                this.progInter.relationships.bySrc[relationshipSrc] = relationshipSrc
            }
        } else {

        }
        if(Object.keys(this.progInter.relationships.byDst).length == false) {
            for(var relationshipDst in prog.relationships.byDst) {
                this.progInter.relationships.byDst[relationshipDst] = relationshipDst
            }
        } else {

        }
        if(Object.keys(this.progInter.relationships.byRel).length == false) {
            for(var relationshipRel in prog.relationships.byRel) {
                this.progInter.relationships.byRel[relationshipRel] = relationshipRel
            }
        } else {

        }
    }
}