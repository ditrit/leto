const authorizationColumns = [
	{
		name: "avatar",
		required: true,
		label: "Avatar",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
		classes: "tr_width__actions30",
	},

	{
		name: "user",
		label: "User",
		align: "left",
		field: "user",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "role",
		label: "Role",
		align: "left",
		field: "role",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "domain",
		label: "Domain",
		align: "left",
		field: "domain",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
		classes: "tr_width__actions40",
	},
];
export default authorizationColumns;
