import API from "../../services/index";

export const fetchAllProducts = async ({ commit }) => {
	let response = await API.get("/product");
	commit("GET_PRODUCT", response.data);
};

export const fetchProductyId = async ({ commit }, id) => {
	let response = await API.get(`/product/${id}`);
	commit("GET_PRODUCT_BY_ID", response.data);
};

export const addProduct = async ({ commit }, product) => {
	let response = await API.post(`/product/${product.domainID}`, product);
	commit("NEW_PRODUCT", response.data);
};
export const updateProduct = async ({ commit }, product) => {
	let response = await API.put(`/product/${product.id}`, product);
	commit("UPDATE_PRODUCT", response.data);
};

export const removeProduct = async ({ commit }, id) => {
	await API.delete(`/product/${id}`);
	commit("DELETE_PRODUCT", id);
};
