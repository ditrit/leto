

class Grid {
	constructor(items = [],parentItem = null, reserveSlot = false) {
		//this.columnCount = 1//Math.max(Math.ceil(Math.sqrt(items.length)) + reserveSlot, 1);
		//this.lineCount = 1//Math.ceil(items.length / this.columnCount)
		this.cellWidth = 1
		this.width = 1
		this.cellDepth = 3
		this.baseWidth = 3
		this.gridSpacing = 1
		this.maxCount = 1
		this.baseDepth = 1
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
	get lineCount() {
		return this.parentItem ? 1 : Math.max(Math.ceil(Math.sqrt(this.itemCount)) , 1);
	}
	get columnCount() {
		return this.parentItem ? this.itemCount : Math.max(Math.ceil((this.itemCount) / this.lineCount), 1)
	}
	/*get width() {
		return this.colWidth * this.columnCount
	}*/
	get colWidth() {
		return this.cellWidth + this.gridSpacing
		/*return Math.max(
			...this.grid.map(col => col.reduce((a, l) => (l && l.width ? Math.max(l.width, a) : a) ,this.cellWidth + this.gridSpacing))
		)*/
	}
	get itemCount() {
		//	return Math.max(this.items.length, this.maxCount)
		return this.items.length + this.reserveSlot
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
	/*get depth() {
		return this.lineDepth * this.lineCount
	}*/
	getUsedWidthAtIndex(colIndex) {
		if (this.parentItem) {
			let res = (this.baseWidth + this.gridSpacing) * this.reserveSlot
			for (let i = 0; i < (colIndex - this.reserveSlot); ++i) {
				const item = this.items[i]
				res += item.width + this.gridSpacing

			}
			return res
		}
		return (colIndex) * this.colWidth
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
		item.threeObj.position.y = this.parentItem ? this.parentItem.threeObj.position.y + this.parentItem.height : 0
		//this.updatePlacement()
	}
	removeItemFromGrid(item) {
		const itemIndex = this.items.findIndex(i => i.id === item.id)
		this.items.splice(itemIndex, 1)

	}
	buildItemCountChart(itemCountChart) {
		for (let item of this.items.filter(i => i && i.grid)) {
			item.grid.buildItemCountChart(itemCountChart)
		}
		const currentIndex = this.parentItem ? this.parentItem.threeObj.position.y : -1
		const maxCount = Math.max(this.items.length, itemCountChart[currentIndex] ? itemCountChart[currentIndex] : 1)
		itemCountChart[currentIndex] = maxCount
	}
	updateBlockSize(cellSizeChart, itemCountChart) {
		for (let item of this.items.filter(i => i && i.grid)) {
			item.grid.updateBlockSize( cellSizeChart, itemCountChart)

		}
		this.width = this.items.reduce((a,i) => a + i.width, this.reserveSlot * this.baseWidth) + (this.gridSpacing * this.itemCount)
		this.cellDepth = Math.max(...this.items.map(i => i.depth), 3)
		this.cellWidth = Math.max(...this.items.map(i => i.width), 3)
		this.depth =  this.cellDepth + this.gridSpacing
		if (this.parentItem)
			this.items.forEach(i => i.grid.depth = this.cellDepth)
		//this.cellWidth = Math.max(...this.items.map(i => i.width), 1)
		/*	const currentIndex = this.parentItem ? Math.ceil(this.parentItem.threeObj.position.y) : -1
			const cellIndex = this.parentItem ? Math.ceil(this.parentItem.threeObj.position.y) + 1 : 0
			this.cellWidth = cellSizeChart[cellIndex] ? cellSizeChart[cellIndex].width : 1

		//	this.gridSpacing = cellSizeChart[currentIndex] && cellSizeChart[currentIndex].laneWidth ? cellSizeChart[currentIndex].laneWidth : this.gridSpacing

			this.cellDepth = cellSizeChart[cellIndex] ? cellSizeChart[cellIndex].depth : 1

			this.baseWidth = cellSizeChart[currentIndex] ? cellSizeChart[currentIndex].width : 1
			this.baseDepth = cellSizeChart[currentIndex] ? cellSizeChart[currentIndex].depth : 1
			this.maxCount = itemCountChart[currentIndex] ? itemCountChart[currentIndex] : 0
	*/

		//this.updatePlacement()


	}
	updatePlacement() {
		for (let col = this.reserveSlot; col < this.columnCount; ++col) {
			for (let line = 0; line < this.lineCount; ++line) {
				const item = this.items[((col * this.lineCount) + line) - this.reserveSlot]
				console.log("updating item position", col, line, item, this.columnCount, this.lineCount, this.parentItem)

				if (!item) continue

				if (item && item.threeObj) {
					if (this.parentItem) {
						item.threeObj.position.x =
							(this.parentItem.threeObj.position.x  - (this.width / 2)) +
							this.getUsedWidthAtIndex(col) + item.width/2
						item.threeObj.position.z =  this.parentItem.threeObj.position.z
						item.threeObj.position.y =  this.parentItem.threeObj.position.y + this.parentItem.height
					} else {
						item.threeObj.position.x =  this.getUsedWidthAtIndex(col) + this.colWidth/2 - ((this.colWidth * this.columnCount) / 2)
						item.threeObj.position.z = ( this.getUsedDepthAtIndex(line) + this.lineDepth/2 -((this.lineDepth * this.lineCount) / 2))
						item.threeObj.position.y  = 0
					}
					item.basePosition = JSON.parse(JSON.stringify(item.threeObj.position))
					item.grid.updatePlacement()
					item.updateSpritePosition()
				}
			}
		}

	}
}

export {Grid}
