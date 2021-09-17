export const authenticated = (state) => state.token && state.registerdUser;
export const registerdUser = (state) => state.registerdUser;

export const loggedInUser = (state) => state.loggedInUser;
export const isAuthenticated = (state) => state.isAuthenticated;
export const accessToken = (state) => state.token;
export const refreshToken = (state) => state.refresh_token;
