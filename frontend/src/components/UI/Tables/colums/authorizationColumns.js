const authorizationColumns = [
	{
		name: "Logo",
		required: true,
		label: "Avatar",
		align: "left",
		field: "Logo",
		format: (val) => `${val}`,
		sortable: true,
		classes: "tr_width__actions30",
	},

	{
		name: "User",
		label: "User",
		align: "left",
		field: "User",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "Role",
		label: "Role",
		align: "left",
		field: "Role",
		sortable: true,
		classes: "tr_width ellipsis",
	},
	{
		name: "Domain",
		label: "Domain",
		align: "left",
		field: "Domain",
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
