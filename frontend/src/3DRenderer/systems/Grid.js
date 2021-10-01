
const GRID_SPACING = 2

class Grid {
	constructor(items = []) {
		this.columnCount = Math.ceil(Math.sqrt(items.length));
		this.lineCount = Math.ceil(items.length / this.columnCount)
		this.cellWidth = 1
		this.cellDepth = 1
		this.items = items
		this.grid = new Array(this.columnCount)
		for (let i = 0; i < this.columnCount; ++i) {
			this.grid[i] = (new Array(this.lineCount)).fill(null)
		}

		for (let item of items) {
			this.placeItemOnGrid(item)
		}

	}
	placeItemOnGrid(item) {
		console.log('positioning item', item, this.grid)
		const freeColumnIndex = this.grid.findIndex(c => c.some(l => !l))
		console.log('freeColumnIndex', freeColumnIndex)
		const freeSlotIndex = this.grid[freeColumnIndex].findIndex(s => !s)
		this.grid[freeColumnIndex][freeSlotIndex] = item
		item.threeObj.position.x = freeColumnIndex * (this.cellWidth + GRID_SPACING)
		item.threeObj.position.z = freeSlotIndex * (this.cellDepth + GRID_SPACING)
	}
	update() {

	}
}

export {Grid}
