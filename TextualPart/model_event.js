export class eventModel {
    constructor(prog) {
        this.add = []
        this.deleted = []
        this.updated = []
        this.prog = prog
    }

    added(name, current) {
        this.add[name] = current
    }

    delete(name, current) {
        this.deleted[name] = current
    }

    update(name, current) {
        this.updated[name] = current
    }

    toString() {
        this.prog.remove(this)
        let add = this.add
        let up = this.updated
        let del = this.deleted

        return `
    Added : ` +
        this.add + `
    Deleted : ` +
        this.deleted + `
    Updated : ` +
        this.updated 

    }

}