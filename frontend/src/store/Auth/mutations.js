export const SET_TOKEN = (state, token) => (state.token = token);
export const SET_USER = (state, data) => (state.registerdUser = data);

// export const SET_REFRESH_TOKEN = (state, refreshToken) =>
// 	(state.refresh_token = refreshToken);

// export const SET_ACCESS_TOKEN = (state, accessToken) =>
// 	(state.access_token = accessToken);

// sets state with user information and toggles
// isAuthenticated from false to true
export const SET_LOGGED_IN_USER = (state, user) => {
	state.loggedInUser = user;
	state.isAuthenticated = true;
};

// delete all auth and user information from the state
export const CLEAR_USER_DATA = (state) => {
	state.refresh_token = "";
	state.access_token = "";
	state.loggedInUser = {};
	state.isAuthenticated = false;
};
