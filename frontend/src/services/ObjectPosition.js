/**
 * @typedef { import("src/components/2DModel/LetoObjectNode") } LetoObjectNode
 */

const STORAGE_KEY = "graphPositions";

/**
 * @param {LetoObjectNode} root
 * @param {Record<string, { x: number, y: number }>} positions
 */
function getPositions(root, positions = {}) {
	walkTree(root, node => {
		positions[node.id] = { x: node.y, y: node.y };
	});
	return positions;
}

/**
 * @param {LetoObjectNode} node
 * @param {(node: LetoObjectNode) => void} callback
 */
function walkTree(node, callback) {
	if (!node) {
		return;
	}
	walkTree(node.rightSibling, callback);
	walkTree(node.contains[0], callback);
	callback(node);
}

export default {
	/** @param {LetoObjectNode} root */
	save(root) {
		const positions = getPositions(root);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
	},
	get() {
		const data = localStorage.getItem(STORAGE_KEY) ?? "null";
		return JSON.parse(data);
	},
	/** @param {LetoObjectNode} root */
	hydrate(root) {
		const data = this.get();
		if (!data) {
			return;
		}
		walkTree(root, node => {
			const savedNode = data[node.id];
			if (savedNode) {
				node.x = savedNode.x;
				node.y = savedNode.y;
			}
		});
	}
};
