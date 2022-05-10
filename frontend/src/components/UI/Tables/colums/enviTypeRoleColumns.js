export const columns = [
	{
		name: "Logo",
		required: true,
		label: "Avatar",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
		classes: "tr_width__avatar",
	},

	{
		name: "Name",
		label: "Name",
		align: "left",
		field: "Name",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},

	{
		name: "ShortDescription",
		label: "Short Description",
		align: "left",
		field: "ShortDescription",
		sortable: true,
		classes: "tr_width__shortdesc ellipsis",
	},
	{
		name: "Description",
		label: "Description",
		align: "left",
		field: "Description",
		sortable: true,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
		classes: "tr_width__actions70",
	},
];
export default columns;
