import { calcul_dimensions, calcul_xy_container} from '../../components/Monaco/svg_maths'

export const SET_SOURCE = (state) => {
	state.monacoSource = JSON.parse(localStorage.getItem("monacoSource"));
};

export const SET_RESOURCES = (state) => {
	state.monacoSource["resources"] = JSON.parse(localStorage.getItem("monacoSource"));
	window.localStorage.setItem("monacoSource", JSON.stringify(state.monacoSource));
};

export const GET_METADATAS = (state, metadata) =>
	(state.metadatas = metadata);

export const REMOVE_CONTENT = (state, ids) => {
	const resource = removeContent(state.monacoSource["resources"], ids);
	state.monacoSource["resources"].push(resource[0]);
};

export const ADD_CONTENT = (state, ids) => {
	const container = getContainer(state.monacoSource["resources"], ids.idContainer).container;
	const datas = getContainer(state.monacoSource["resources"], ids.idResource);
	const resource = datas.container;
	const index = datas.index;
	(container.value) ? container.value.contains.push(resource) : container.contains.push(resource);
	state.monacoSource["resources"].splice(index, 1);
};

export const ADD_CONTENT_IN_ROOT = (state, resource)=>{
	state.monacoSource["resources"].push(resource);
}

export const GET_MONACOSOURCE_PROVIDER = (state)=>{
	return state.monacoSource["provider"][0].name;
}

function removeContent(datas, ids) {
	let removeResource = [];
	datas.forEach(r => {
		const resource = (r.value) ? r.value : r;
		if(resource.name + '_' + resource.type === ids[0]) {
			if(ids.length > 1) {
				ids.shift();
				removeResource = removeContent(resource.contains, ids);
			}
			else {
				const index = datas.indexOf(resource);
				removeResource = datas.splice(index, 1);
			}
		}
	});
	return removeResource;
}

function getContainer(datas, id) {
	let container = null;
	let index = -1;

	for(let i = 0; i < datas.length; i++) {
		const resource = (datas[i].value) ? datas[i].value : datas[i];
		if(resource.name + '_' + resource.type === id) {
			container = datas[i];
			index = i;
		}
		if(resource.contains) {
			const object = getContainer(resource.contains, id).container;
			if(object !== null)  {
				container = object;
				index = i;
			}
		}
	}
	return {container, index};
}

export const SET_CONTAINER_DRAWING = (state, datas) => {
	const container = getContainer(state.monacoSource["resources"], datas.ids[0]).container;
	const dimensions = calcul_dimensions(container, 0, 1000,  datas.remove);
	if(container != null && container.inContainer) container.inContainer = false;
	calcul_xy_container(container, container.x, container.y, 1000);
	container.height = dimensions.height + 20;
	container.width = dimensions.width;
};

export const SET_COORD = (state, resource) => {
	const index = getContainer(state.monacoSource["resources"], resource.id).index;
	if(state.monacoSource["resources"][index].value) {
		state.monacoSource["resources"][index].value.x = resource.x;
		state.monacoSource["resources"][index].value.y = resource.y;
	} else {
		state.monacoSource["resources"][index].x = resource.x;
		state.monacoSource["resources"][index].y = resource.y;
	}
};
