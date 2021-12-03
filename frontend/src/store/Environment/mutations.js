export const GET_ENVIRONMENT = (state, environment) =>
	(state.environments = environment);

export const GET_ENVIRONMENT_BY_ID = (state, id) => {
	const index = state.environments.findIndex(
		(environment) => environment.id === id
	);
	state.environments.splice(index, 1, id);
};

export const NEW_ENVIRONMENT = (state, environment) =>
	state.environments.unshift(environment);

export const UPDATE_ENVIRONMENT = (state, updatedEnvironment) => {
	const index = state.environments.findIndex(
		(environment) => environment.id === updatedEnvironment
	);
	state.environments.splice(index, 1, updatedEnvironment);
};
export const DELETE_ENVIRONMENT = (state, environmentId) =>
	(state.environments = state.environments.filter(
		(environment) => environment.id !== environmentId
	));
