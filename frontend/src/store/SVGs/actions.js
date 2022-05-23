import axios from "axios";

const getPaths = async () => {
	let paths = await axios.get("paths.json");
	return paths;
};

export const loadPath = async ({ commit }) => {
	let fpaths = await getPaths();
	let keys =[];

	let p =[];

	for(let key in fpaths.data){
		keys.push(key);
		p.push(await axios.get(`svgs/${fpaths.data[key]}`));
	}
	let svgs = {};
	Promise.all(p).then(values =>{
		for(let i in values){
			svgs[keys[i]] = values[i].data;
		}

		commit("GET_SVGS",svgs);
		commit("SET_LOADED");
	})
}
