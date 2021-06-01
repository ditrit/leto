export class eventModel {
    constructor(prog) {
        this.add = []
        this.deleted = []
        this.updated = []
        this.error = []
        this.prog = prog
    }

    added(name, current) {
        this.add[name] = current
    }

    delete(name, current) {
        this.deleted[name] = current
    }

    update(name, changed, current) {
        this.updated[name] = [changed, current]
    }

    toString() {
        this.prog.remove(this)
        let add = this.add
        let up = this.updated
        let del = this.deleted
        let err = this.error
        return `
    Added : ` +
        this.add + `
    Deleted : ` +
        this.deleted + `
    Updated : ` +
        this.updated + `
    Error : ` +
        this.error
    }

}