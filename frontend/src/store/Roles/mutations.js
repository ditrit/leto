export const GET_ROLES = (state, role) => (state.roles = role);

export const GET_ROLE_BY_ID = (state, id) => {
	const index = state.roles.findIndex((role) => role.ID === id);
	state.roles.splice(index, 1, id);
};

export const NEW_ROLE = (state, role) => state.roles.unshift(role);

export const UPDATE_ROLE = (state, updatedRole) => {
	const index = state.roles.findIndex((role) => role.ID === updatedRole.ID);
	state.roles.splice(index, 1, updatedRole);
};
export const DELETE_ROLE = (state, roleId) =>
	(state.roles = state.roles.filter((role) => role.id !== roleId));
