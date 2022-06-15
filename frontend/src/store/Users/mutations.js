export const GET_USERS = (state, user) => (state.theUsers = user);
export const NEW_USER = (state, user) => state.theUsers.unshift(user);

export const UPDATE_USER = (state, updatedUser) => {
	const index = state.theUsers.findIndex((user) => user.ID === updatedUser.ID);
	state.theUsers[index] = updatedUser;
};
export const DELETE_USER = (state, userId) =>
	(state.theUsers = state.theUsers.filter((user) => user.ID !== userId));

export const FIND_USER_BY_ID = (state, id) => {
	const index = state.theUsers.findIndex((user) => user.ID === id);
	state.theUsers.splice(index, 1, id);
};
