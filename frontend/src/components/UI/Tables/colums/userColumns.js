const userColumns = [
	{
		name: "avatar",
		required: true,
		label: "Avatar",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
		classes: "tr_width__avatar",
	},

	{
		name: "firstName",
		label: "First Name",
		align: "left",
		field: "firstName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "lastName",
		label: "Last Name",
		align: "left",
		field: "lastName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "email",
		label: "Email",
		align: "left",
		field: "email",
		sortable: true,
		classes: "tr_width__email ellipsis",
	},
	{
		name: "password",
		label: "Password",
		align: "left",
		field: "password",
		sortable: false,
		classes: "tr_width ellipsis",
	},
	{
		name: "description",
		label: "Description",
		align: "left",
		field: "description",
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
