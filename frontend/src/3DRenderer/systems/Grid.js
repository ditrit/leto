

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
	get width() {
		return this.colWidth * this.columnCount
	}
	get colWidth() {
		return this.cellWidth + this.gridSpacing
		/*return Math.max(
			...this.grid.map(col => col.reduce((a, l) => (l && l.width ? Math.max(l.width, a) : a) ,this.cellWidth + this.gridSpacing))
		)*/
	}
	get lineDepth() {
	/*	let maxLineDepth = this.cellDepth + this.gridSpacing
		for (let line = 0; line < this.lineCount; ++line) {
			for (let col = 0; col < this.columnCount; ++col) {
				const item = this.grid[col][line]
				if (item && item.depth) {
					maxLineDepth = Math.max(maxLineDepth, item.depth)
				}
			}
		}
		return maxLineDepth*/
		return this.cellDepth + this.gridSpacing
	}
	get depth() {
		return this.lineDepth * this.lineCount
	}
	getUsedWidthAtIndex(colIndex) {
		return colIndex * this.colWidth
	}
	getUsedDepthAtIndex(lineIndex) {
		return lineIndex * this.lineDepth
	}
	placeItemOnGrid(item) {
		//if (item.parentId) return
		console.log('positioning item', item, this.grid)
		const freeColumnIndex = this.grid.findIndex(c => c.some(l => !l))
		//const colWidth = this.parentItem? (this.parentItem.width / this.columnCount) : (this.cellWidth + this.gridSpacing)
		//const lineDepth = this.parentItem? (this.parentItem.depth / this.lineCount) : (this.cellDepth + this.gridSpacing)
		console.log('freeColumnIndex', freeColumnIndex)
		const freeSlotIndex = this.grid[freeColumnIndex].findIndex(s => !s)
		this.grid[freeColumnIndex][freeSlotIndex] = item
		item.threeObj.position.x =
			(this.parentItem ? (this.parentItem.threeObj.position.x - this.width / 2) : 0) +
			this.getUsedWidthAtIndex(freeColumnIndex) + this.colWidth/2
		item.threeObj.position.z =
			(this.parentItem ? (this.parentItem.threeObj.position.z - this.depth / 2) : 0) +
			this.getUsedDepthAtIndex(freeSlotIndex, freeColumnIndex) + this.lineDepth/2
		item.threeObj.position.y = this.parentItem ? this.parentItem.threeObj.position.y + 0.9 : 0
		item.baseWidth = this.cellWidth
		item.baseDepth = this.cellDepth
		this.items.push(item)
	}
	async updateBlockSize() {
		for (let item of this.items.filter(i => i && i.grid)) {
			await item.grid.updateBlockSize()

		}
		this.cellWidth = Math.max(this.cellWidth, ...this.items.map(i => (i && i.width) ? i.width : 1))
		this.cellDepth = Math.max(this.cellDepth, ...this.items.map(i => (i && i.depth) ? i.depth: 1))
		for (let item of this.items.filter(i => i && typeof i !== 'string')) {
			console.log('resizing item', item)
			item.baseDepth = this.cellDepth
			item.baseWidth = this.cellWidth
			await item.resize()
		}
		this.updatePlacement()

	}
	updatePlacement() {
		for (let col in this.grid) {
			for (let line in this.grid[col]) {
				const item = this.grid[col][line]
				console.log("updating item position", col, line, item, this.columnCount, this.lineCount, this.parentItem)

				if (item && item.threeObj) {
					item.threeObj.position.x =
						(this.parentItem ? (this.parentItem.threeObj.position.x - this.width / 2) : 0) +
						this.getUsedWidthAtIndex(col) + this.colWidth/2
					item.threeObj.position.z =
						(this.parentItem ? (this.parentItem.threeObj.position.z - this.depth / 2) : 0) +
						this.getUsedDepthAtIndex(line, col) + this.lineDepth/2
					item.threeObj.position.y = this.parentItem ? this.parentItem.threeObj.position.y + 0.9 : 0
					item.grid.updatePlacement()
				}
			}
		}

	}
}

export {Grid}
