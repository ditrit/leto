import { calcul_dimensions, calcul_xy_container} from '../../components/Monaco/svg_maths'

export const SET_SOURCE = (state) => {
	state.monacoSource = JSON.parse(localStorage.getItem("monacoSource"));
};

export const GET_METADATAS = (state, metadata) =>
	(state.metadatas = metadata);

export const UPDATE_SOURCE = (state, ids) => { 
	const resource = removeContent(state.monacoSource["resources"], ids);
	state.monacoSource["resources"].push(resource[0]);
};

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

export const SET_DATAS_DRAWING = (state, ids) => { 
	const container = getContainer(state.monacoSource["resources"], ids[0]);
	const index = state.monacoSource["resources"].indexOf(container);
	const dimensions = calcul_dimensions(container, 0, 1000, true);
	if(container != null && container.inContainer) container.inContainer = false;
	calcul_xy_container(container, container.x, container.y);
	state.monacoSource["resources"][index].height = dimensions.height + 20;
	state.monacoSource["resources"][index].width = dimensions.width;
};

export const SET_COORD = (state, resource) => { 
	const container = getContainer(state.monacoSource["resources"], resource.id);
	const index = state.monacoSource["resources"].indexOf(container);
	state.monacoSource["resources"][index].x = resource.x;
	state.monacoSource["resources"][index].y = resource.y;
};