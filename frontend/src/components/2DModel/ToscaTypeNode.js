import LetoTypeNode from "./LetoTypeNode";

export default class ToscaTypeNode extends LetoTypeNode {
	constructor(logo_path, type_name, primary_color, secondary_color,svg,requirements,capabilities,instance_name,level,content){
		super(logo_path, type_name, primary_color, secondary_color,svg,instance_name,level);
		this.requirements=requirements;
		this.capabilities=capabilities;
		this.rels_height=20;
		this.container_height=20;
		this.content=content;

		this.defaultPalette={
			width:150,
			rels_height:this.rels_height,
			container_height:this.container_height,
			svg:this.svg,
			type_name: this.type_name,
			instance_name: this.type_name,
			logo: this.logo_path,
			primary_color: this.primary_color,
			secondary_color: this.secondary_color,
		}


	}




}
