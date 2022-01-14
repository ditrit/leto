export const emailValidation = (val) => {
	const emailPattern =
		/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
	return emailPattern.test(val) || "Invalid email";
};

export const pageSizeTweak = (offset) => {
	return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
};
