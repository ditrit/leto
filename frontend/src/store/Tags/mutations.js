export const GET_TAGS_TREE = (state, tags) => (state.tagsTree = tags);

export const GET_TAGS = (state, tags) => (state.tags = tags);

export const NEW_TAG = (state, tag) => state.tags.unshift(tag);

export const UPDATE_TAG = (state, updatedTag) => {
	const index = state.tags.findIndex((tag) => tag.ID === updatedTag.ID);
	state.tags[index] = updatedTag;
};
export const DELETE_TAG = (state, tagIid) =>
	(state.tags = state.tags.filter((tag) => tag.ID !== tagIid));
