const requirementColumns = [
	{
		name: "name",
		required: true,
		label: "Name",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
		classes: "tr_width__avatar",
	},

	{
		name: "active",
		label: "Active",
		align: "left",
		field: "active",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "required",
		label: "Required",
		align: "left",
		field: "required",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
	{
		name: "dataType",
		label: "Data Type",
		align: "left",
		field: "dataType",
		sortable: true,
		classes: "tr_width__email ellipsis",
	},
	{
		name: "valueType",
		label: "Value Type",
		align: "left",
		field: "valueType",
		sortable: false,
		classes: "tr_width ellipsis",
	},
	{
		name: "possibleValue",
		label: "Possible Value",
		align: "left",
		field: "possibleValue",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "widget",
		label: "Widget",
		align: "left",
		field: "widget",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "min_value",
		label: "Min Value",
		align: "left",
		field: "min_value",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
	{
		name: "max_value",
		label: "Max Value",
		align: "left",
		field: "max_value",
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
export default requirementColumns;