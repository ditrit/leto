export class ProgModel {
    constructor() {
        this.nodeTypes = {}
        this.nodeTemplates = {}
        this.instructions = []
        this.version = 0
    }

    checkType() {
        for (var key in this.nodeTypes) {
            this.nodeTypes[key].checkType(this)
        }
        for (var key in this.nodeTemplates) {
            this.nodeTemplates[key].checkType(this)
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
        for(var nodetemplate in this.nodeTemplates) {
            let versionNode = this.nodeTemplates[nodetemplate].version
            let version = this.version
            if(versionNode != version) {
                delete(this.nodeTemplates[nodetemplate])
            }
        }
    }

    toString() {
        let nodetype = this.nodeTypes
        let nodetemplate = this.nodeTemplates
        return `
    NodeTypes : ` +
        this.nodeTypes + `
    NodeTemplates : ` +
        this.nodeTemplates + `
    Version : ` +
        this.version
    }
}