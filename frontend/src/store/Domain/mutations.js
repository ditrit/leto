export const GET_DOMAINS = (state, domains) => (state.domains = domains);

export const GET_DOMAIN_BY_ID = (state, id) => {
	const index = state.domains.findIndex((domain) => domain.id === id);
	state.domains.splice(index, 1, id);
};

export const NEW_DOMAIN = (state, domain) => state.domains.unshift(domain);

export const UPDATE_DOMAIN = (state, updatedDomain) => {
	const index = state.domains.findIndex(
		(domain) => domain.id === updatedDomain
	);
	state.domains.splice(index, 1, updatedDomain);
};
export const DELETE_DOMAIN = (state, domainIid) =>
	(state.domains = state.domains.filter((domain) => domain.id !== domainIid));
