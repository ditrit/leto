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

    remove() {
        for(var nodetype in this.nodeTypes) {
            let versionNode = this.nodeTypes[nodetype].version
            let version = this.version
            if(versionNode != version) {
                delete(this.nodeTypes[nodetype])
            }
        }
        for(var relationshipType in this.relationshipsTypes) {
            let versionNode = this.relationshipsTypes[relationshipType].version
            let version = this.version
            if(versionNode != version) {
                delete(this.relationshipsTypes[relationshipType])
            }
        }
        for(var nodetemplate in this.nodeTemplates) {
            let versionNode = this.nodeTemplates[nodetemplate].version
            let version = this.version
            if(versionNode != version) {
                delete(this.nodeTemplates[nodetemplate])
            }
        }
        for(var relationship in this.relationships) {
            let versionNode = this.relationships[relationship].version
            let version = this.version
            if(versionNode != version) {
                delete(this.relationships[relationship])
            }
        }
    }

    toString() {
        let nodetype = this.nodeTypes
        let nodetemplate = this.nodeTemplates
        let relationshiptype = this.relationshipsTypes
        let relationship = this.relationships
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
}