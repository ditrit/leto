export const GET_TAGS_TREE = (state, tags) => (state.tagsTree = tags);
export const GET_TAGS = (state, tags) => (state.tags = tags);

export const GET_TAG_BY_ID = (state, id) => {
	const index = state.tags.findIndex((tag) => tag.id === id);
	state.tags.splice(index, 1, id);
};

export const NEW_TAG = (state, tag) => state.tags.unshift(tag);

export const UPDATE_TAG = (state, updatedTag) => {
	const index = state.tags.findIndex((tag) => tag.id === updatedTag.id);
	state.tags.splice(index, 1, updatedTag);
};
export const DELETE_TAG = (state, tagIid) =>
	(state.tags = state.tags.filter((tag) => tag.id !== tagIid));
