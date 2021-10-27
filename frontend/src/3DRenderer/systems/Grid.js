

class Grid {
	constructor(items = [],parentItem = null, reserveSlot = false) {
		//this.columnCount = 1//Math.max(Math.ceil(Math.sqrt(items.length)) + reserveSlot, 1);
		//this.lineCount = 1//Math.ceil(items.length / this.columnCount)
		this.cellWidth = 1
		this.cellDepth = 1
		this.gridSpacing = 5
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
	cullEmptyCols() {
		let emptyColIndex = this.grid.findIndex(c => c.every(l => !l))
		while (emptyColIndex !== -1) {
			this.grid.splice(emptyColIndex, 1)
			emptyColIndex = this.grid.findIndex(c => c.every(l => !l))
		}
	}

	resizeIfNecessary() {
		const hasEmptySpace = this.grid.some(c => c.some(l => !l))
		console.log('grid', this.grid)
		if (!hasEmptySpace) {
			console.log("no empty space")
//			this.grid.push([])
			if (this.columnCount > this.lineCount) {
			//	this.lineCount += 1
			} else {
				this.grid.push([])
			}
			for (let column in this.grid) {
				if (!this.grid[column])
					this.grid[column] = (new Array(this.lineCount)).fill(null)
				if (this.grid[column].length < this.lineCount) {
					for (let i = this.grid[column].length; i < this.lineCount; ++i) {
						this.grid[column][i] = null
					}
				}
			}
			return true
		}
		return false
	}
	get columnCount() {
		return Math.max(Math.ceil(Math.sqrt(this.items.length + this.reserveSlot) ) , 1);
	}
	get lineCount() {
		return Math.max(Math.ceil((this.items.length + this.reserveSlot) / this.columnCount), 1)
	}
	get width() {
		return this.colWidth * this.columnCount
	}
	get colWidth() {
		return this.cellWidth +  this.gridSpacing
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
	findItemOnGrid(item) {
		console.log('trying to find item on grid', this, item)
		const columnIndex = this.grid.findIndex(c => c.some(l => l && l.id === item.id))
		if (columnIndex === -1) return null
		console.log('colIndex', columnIndex)
		const slotIndex = this.grid[columnIndex].findIndex(s => s && s.id === item.id)
		if (slotIndex === -1) return null
		return [columnIndex, slotIndex]
	}
	placeItemOnGrid(item) {
		//this.resizeIfNecessary()
	//	console.log('positioning item', item, this.grid)
		/*const freeColumnIndex = this.grid.findIndex(c => c.some(l => !l))
		const freeSlotIndex = this.grid[freeColumnIndex].findIndex(s => !s)
		this.grid[freeColumnIndex][freeSlotIndex] = item*/
		//item.baseWidth = this.cellWidth
		//item.baseDepth = this.cellDepth
		if (!this.items.find(i => i.id === item.id))
			this.items.push(item)
		this.updatePlacement()
	}
	removeItemFromGrid(item) {
		const itemIndex = this.items.findIndex(i => i.id === item.id)
		this.items.splice(itemIndex, 1)

	}
	async updateBlockSize(sizeChart) {


		const index = this.parentItem ? Math.ceil(this.parentItem.threeObj.position.y) + 1 : 0
		this.cellWidth = sizeChart[index] ? sizeChart[index].width : 1
		this.cellDepth = sizeChart[index] ? sizeChart[index].depth : 1
		console.log('sizeChart', sizeChart, this.parentItem ? this.parentItem.threeObj.position.y : 1,index, this.cellWidth, this.cellDepth)
		if (this.parentItem)
			await this.parentItem.resize()

		for (let item of this.items.filter(i => i && typeof i !== 'string')) {
		//	console.log('resizing item', item)
			item.depth = this.cellDepth
			item.width = this.cellWidth
			await item.resize()
		}
		for (let item of this.items.filter(i => i && i.grid)) {
			await item.grid.updateBlockSize( sizeChart)

		}
		this.updatePlacement()


	}
	updatePlacement() {
		for (let col = 0; col < this.columnCount; ++col) {
			for (let line = 0; line < this.lineCount; ++line) {
				const item = this.items[(col * this.lineCount) + line]
				console.log("updating item position", col, line, item, this.columnCount, this.lineCount, this.parentItem)

				if (!item) continue

				if (item && item.threeObj) {
					item.threeObj.position.x =
						((this.parentItem ? this.parentItem.threeObj.position.x : 0) - this.width / 2) +
						this.getUsedWidthAtIndex(col) + this.colWidth/2
					item.threeObj.position.z =
						((this.parentItem ? this.parentItem.threeObj.position.z : 0) - this.depth / 2) +
						this.getUsedDepthAtIndex(line) + this.lineDepth/2
					item.threeObj.position.y = this.parentItem ? this.parentItem.threeObj.position.y + 1 : 0
					item.basePosition = JSON.parse(JSON.stringify(item.threeObj.position))
					item.grid.updatePlacement()
				}
			}
		}

	}
}

export {Grid}
