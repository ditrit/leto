import { calcul_dimensions, calcul_xy_container} from '../../components/Monaco/svg_maths'

export const SET_SOURCE = (state) => {
	state.monacoSource = JSON.parse(localStorage.getItem("monacoSource"));
};

export const GET_METADATAS = (state, metadata) =>
	(state.metadatas = metadata);

export const REMOVE_CONTENT = (state, ids) => {
	const resource = removeContent(state.monacoSource["resources"], ids);
	state.monacoSource["resources"].push(resource[0]);
};

export const ADD_CONTENT = (state, ids) => {
	const container = getContainer(state.monacoSource["resources"], ids.idContainer);
	const resource = getContainer(state.monacoSource["resources"], ids.idResource);
	const index = state.monacoSource["resources"].indexOf(resource);
	container.contains.push(resource);
	state.monacoSource["resources"].splice(index, 1);
};

export const ADD_CONTENT_IN_ROOT = (state,resource)=>{
	state.monacoSource["resources"].push(resource);
}

function removeContent(datas, ids) {
	let removeResource = [];
	datas.forEach(resource => {
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
	datas.forEach(resource => {
		if(resource.name + '_' + resource.type === id) {
			container = resource;
		}
		if(resource.contains) {
			const object = getContainer(resource.contains, id);
			if(object !== null) container = object;
		}
	});
	return container;
}

export const SET_CONTAINER_DRAWING = (state, datas) => {
	const container = getContainer(state.monacoSource["resources"], datas.ids[0]);
	const dimensions = calcul_dimensions(container, 0, 1000,  datas.remove);
	if(container != null && container.inContainer) container.inContainer = false;
	calcul_xy_container(container, container.x, container.y, 1000);
	container.height = dimensions.height + 20;
	container.width = dimensions.width;
};

export const SET_COORD = (state, resource) => {
	const container = getContainer(state.monacoSource["resources"], resource.id);
	const index = state.monacoSource["resources"].indexOf(container);
	state.monacoSource["resources"][index].x = resource.x;
	state.monacoSource["resources"][index].y = resource.y;
};
