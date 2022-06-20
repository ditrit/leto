import LetoTypeNode from "./LetoTypeNode";

export default class TerraformTypeNode extends LetoTypeNode {
	constructor(logo_path, type_name, primary_color, secondary_color,svg,attributes){
		super(logo_path, type_name, primary_color, secondary_color,svg);

		this.attributes = attributes;

		this.defaultPalette={
			width:0,
			height:0,
			svg:this.svg,
			type: this.type_name,
			name: this.type_name,
			logopath: this.logo_path,
			primary_color: this.primary_color,
			secondary_color: this.secondary_color,
		}
	}
}
