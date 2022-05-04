const userColumns = [
	{
		name: "Logo",
		required: true,
		label: "Avatar",
		align: "left",
		field: "Logo",
		format: (val) => `${val}`,
		sortable: true,
		classes: "tr_width__avatar",
	},

	{
		name: "FirstName",
		label: "First Name",
		align: "left",
		field: "FirstName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "LastName",
		label: "Last Name",
		align: "left",
		field: "LastName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "Email",
		label: "Email",
		align: "left",
		field: "Email",
		sortable: true,
		classes: "tr_width__email ellipsis",
	},
	{
		name: "Password",
		label: "Password",
		align: "left",
		field: "Password",
		sortable: false,
		classes: "tr_width ellipsis",
	},
	{
		name: "Description",
		label: "Description",
		align: "left",
		field: "Description",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},

	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
		classes: "tr_width__actions",
	},
];
export default userColumns;
