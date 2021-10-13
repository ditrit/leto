

class Grid {
	constructor(items = [],parentItem = null, reserveSlot = false) {
		this.columnCount = Math.max(Math.ceil(Math.sqrt(items.length)) + reserveSlot, 1);
		this.lineCount = Math.ceil(items.length / this.columnCount)
		this.cellWidth = 1
		this.cellDepth = 1
		this.gridSpacing = 2
		this.parentItem = parentItem
		this.reserveSlot = reserveSlot
		this.items = items
		this.grid = new Array(this.columnCount)
		for (let i = 0; i < this.columnCount; ++i) {
			this.grid[i] = (new Array(this.lineCount)).fill(null)
		}
		if (reserveSlot)
			this.grid[0][0] = "reserved"

		for (let item of items) {
			this.placeItemOnGrid(item)
		}

	}
	resizeIfNecessary() {
		const hasEmptySpace = this.grid.some(c => c.some(l => !l))
		console.log('grid', this.grid)
		if (!hasEmptySpace) {
			this.grid.push([])
			this.columnCount += 1
			this.lineCount += 1
			for (let column in this.grid) {
				if (!this.grid[column])
					this.grid[column] = (new Array(this.lineCount)).fill(null)
				if (this.grid[column].length < this.lineCount) {
					for (let i = this.grid[column].length; i < this.lineCount; ++i) {
						this.grid[column][i] = null
					}
				}
			}
		}
	}
	placeItemOnGrid(item) {
		//if (item.parentId) return
		console.log('positioning item', item, this.grid)
		const freeColumnIndex = this.grid.findIndex(c => c.some(l => !l))
		const colWidth = this.parentItem? (this.parentItem.width / this.columnCount) : (this.cellWidth + this.gridSpacing)
		const lineDepth = this.parentItem? (this.parentItem.depth / this.lineCount) : (this.cellDepth + this.gridSpacing)
		console.log('freeColumnIndex', freeColumnIndex)
		const freeSlotIndex = this.grid[freeColumnIndex].findIndex(s => !s)
		this.grid[freeColumnIndex][freeSlotIndex] = item
		item.threeObj.position.x =
			(this.parentItem ? (this.parentItem.threeObj.position.x - this.parentItem.width / 2) : 0) +
			(freeColumnIndex * colWidth) + colWidth/2
		item.threeObj.position.z =
			(this.parentItem ? (this.parentItem.threeObj.position.z - this.parentItem.depth / 2) : 0) +
			(freeSlotIndex * lineDepth) + lineDepth/2
		item.threeObj.position.y = this.parentItem ? this.parentItem.threeObj.position.y + 0.9 : 0
	}
	updatePlacement() {
		const colWidth = this.parentItem? (this.parentItem.width / this.columnCount) : (this.cellWidth + this.gridSpacing)
		const lineDepth = this.parentItem? (this.parentItem.depth / this.lineCount) : (this.cellDepth + this.gridSpacing)
		for (let col in this.grid) {
			for (let line in this.grid[col]) {
				const item = this.grid[col][line]
				console.log("updating item position", col, line, item, this.columnCount, this.lineCount, this.parentItem)

				if (item && item.threeObj) {
					item.threeObj.position.x =
						(this.parentItem ? (this.parentItem.threeObj.position.x - this.parentItem.width / 2) : 0) +
						(col * colWidth) + colWidth/2
					item.threeObj.position.z =
						(this.parentItem ? (this.parentItem.threeObj.position.z - this.parentItem.depth / 2) : 0) +
						(line * lineDepth) + lineDepth/2
					item.threeObj.position.y = this.parentItem ? this.parentItem.threeObj.position.y + 0.9 : 0
				}
			}
		}

	}
}

export {Grid}
