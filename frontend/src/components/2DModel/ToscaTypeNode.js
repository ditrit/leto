import LetoTypeNode from "./LetoTypeNode";

export default class ToscaTypeNode extends LetoTypeNode {
	constructor(logo_path, type_name, primary_color, secondary_color,svg){
		super(logo_path, type_name, primary_color, secondary_color,svg);

		this.defaultPanel={
			width:150,
			rels_height:20,
			container_height:20,
			svg:this.svg,
			type_name: this.type_name,
			instance_name: this.type_name,
			logo: this.logo_path,
			primary_color: this.primary_color,
			secondary_color: this.secondary_color,
		}
	}




}
