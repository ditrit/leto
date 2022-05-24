const Logo = [
	{
		name: "Logo",
		required: true,
		label: "Avatar",
		align: "left",
		field: "Logo",
		sortable: true,
		classes: "tr_width__actions30",
	},
];
const User = [
	{
		name: "User",
		label: "User",
		align: "left",
		field: "User",
		sortable: true,
		classes: "tr_width ellipsis",
	},
];
const Name = [
	{
		name: "Name",
		label: "Name",
		align: "left",
		field: "Name",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
];
const Role = [
	{
		name: "Role",
		label: "Role",
		align: "left",
		field: "Role",
		sortable: true,
		classes: "tr_width ellipsis",
	},
];
const Domain = [
	{
		name: "Domain",
		label: "Domain",
		align: "left",
		field: "Domain",
		sortable: true,
		classes: "tr_width ellipsis",
	},
];
const actionButtons = [
	{
		name: "actionsButtons",
		label: "",
		align: "left",
		field: "actionsButtons",
		sortable: false,
		classes: "tr_width__actions",
	},
];
const ShortDescription = [
	{
		name: "ShortDescription",
		label: "Short Description",
		align: "left",
		field: "ShortDescription",
		sortable: true,
		classes: "tr_width__shortdesc ellipsis",
	},
];
const Description = [
	{
		name: "Description",
		label: "Description",
		align: "left",
		field: "Description",
		sortable: true,
		classes: "tr_width__descr ellipsis",
	},
];
const FirstName = [
	{
		name: "FirstName",
		label: "First Name",
		align: "left",
		field: "FirstName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
];
const LastName = [
	{
		name: "LastName",
		label: "Last Name",
		align: "left",
		field: "LastName",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
];
const Email = [
	{
		name: "Email",
		label: "Email",
		align: "left",
		field: "Email",
		sortable: true,
		classes: "tr_width__email ellipsis",
	},
];
const Password = [
	{
		name: "Password",
		label: "Password",
		align: "left",
		field: "Password",
		sortable: false,
		classes: "tr_width ellipsis",
	},
];
const Required = [
	{
		name: "required",
		label: "Required",
		align: "left",
		field: "required",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
];
const Active = [
	{
		name: "active",
		label: "Active",
		align: "left",
		field: "active",
		sortable: true,
		classes: "tr_width__name ellipsis",
	},
];
const DataType = [
	{
		name: "dataType",
		label: "Data Type",
		align: "left",
		field: "dataType",
		sortable: true,
		classes: "tr_width__email ellipsis",
	},
];
const ValueType = [
	{
		name: "valueType",
		label: "Value Type",
		align: "left",
		field: "valueType",
		sortable: false,
		classes: "tr_width ellipsis",
	},
];
const PossibleValue = [
	{
		name: "possibleValue",
		label: "Possible Value",
		align: "left",
		field: "possibleValue",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
];
const Widget = [
	{
		name: "widget",
		label: "Widget",
		align: "left",
		field: "widget",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
];
const MinValue = [
	{
		name: "min_value",
		label: "Min Value",
		align: "left",
		field: "min_value",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
];
const MaxValue = [
	{
		name: "max_value",
		label: "Max Value",
		align: "left",
		field: "max_value",
		sortable: false,
		classes: "tr_width__descr ellipsis",
	},
];

let colUsers = [
	...new Set([
		...Logo,
		...FirstName,
		...LastName,
		...Email,
		...Password,
		...Description,
		...actionButtons,
	]),
];
let colRoles = [
	...new Set([
		...Logo,
		...Name,
		...ShortDescription,
		...Description,
		...actionButtons,
	]),
];
let colAuthorizations = [
	...new Set([...Logo, ...User, ...Role, ...Domain, ...actionButtons]),
];
let colRequirements = [
	...new Set([
		...Name,
		...Active,
		...Required,
		...DataType,
		...ValueType,
		...PossibleValue,
		...Widget,
		...MinValue,
		...MaxValue,
	]),
];
export default {
	colUsers,
	colRoles,
	colAuthorizations,
	colRequirements,
};
