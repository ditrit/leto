export const GET_USERS = (state, theUsers) => (state.theUsers = theUsers);

export const NEW_USER = (state, user) => state.theUsers.unshift(user);

export const UPDATE_USER = (state, updatedUser) => {
	const index = state.theUsers.findIndex((user) => user.ID === updatedUser.ID);
	if(index === -1) {
		return;
	}
	state.theUsers[index] = updatedUser;
};

export const DELETE_USER = (state, userId) =>
	(state.theUsers = state.theUsers.filter((user) => user.ID !== userId));
