export const SET_SOURCE = (state) => {
	state.monacoSource = JSON.parse(localStorage.getItem("monacoSource"));
};
