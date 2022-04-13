export const GET_PRODUCT = (state, product) => (state.products = product);

export const GET_PRODUCT_BY_ID = (state, id) => {
	const index = state.products.findIndex((product) => product.id === id);
	state.products.splice(index, 1, id);
};

export const NEW_PRODUCT = (state, product) => state.products.unshift(product);

export const UPDATE_PRODUCT = (state, updatedProduct) => {
	const index = state.products.findIndex(
		(product) => product.id === updatedProduct
	);
	state.products.splice(index, 1, updatedProduct);
};
export const DELETE_PRODUCT = (state, productId) =>
	(state.products = state.products.filter(
		(product) => product.id !== productId
	));
