import axios from "axios";

export const getMetadatas = async ({ commit }) => {
	let metadatas = await axios.get("../../../public/metadatas.json");
	console.log(metadatas)

	commit("GET_METADATAS",metadatas);
};