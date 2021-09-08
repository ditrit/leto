export const GET_USERS = (state, theUsers) => (state.theUsers = theUsers);
export const NEW_USER = (state, user) => state.theUsers.unshift(user);
export const UPDATE_USER = (state, updatedUser) => {
	const index = state.theUsers.findIndex((user) => user.id === updatedUser);
	state.theUsers.splice(index, 1, updatedUser);
};
export const DELETE_USER = (state, userId) =>
	(state.theUsers = state.theUsers.filter((user) => user.id !== userId));

export const LOGIN_USER = (state, user) => state.appUsers.unshift(user);

export const GET_LOGIN_USERS = (state, logedUsers) =>
	(state.logedUsers = logedUsers);
