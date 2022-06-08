import LetoObjectNode from "./LetoObjectNode";

export default class ToscaObjectNode extends LetoObjectNode {
	constructor(toscaTypeNode,instance_name,level){
		super(toscaTypeNode,instance_name,level);
		this.requirements = toscaTypeNode.requirements;
		this.capabilities = toscaTypeNode.capabilities;
		this.rels_height = toscaTypeNode.rels_height;
		this.container_height = toscaTypeNode.container_height;
		this.content=[];
		this.rightSibling=null;
		this.level=level;

		this.drawingObject ={
			width: 150,
			requirements:this.requirements,
			capabilities:this.capabilities,
			rels_height:this.rels_height,
			container_height:this.container_height,
			logo: this.logo_path,
			primary_color:this.primary_color,
			secondary_color:this.secondary_color,
			svg:this.svg,
			type_name:this.type_name,
			instance_name:this.instance_name,
			level:this.level
		}
	}
	setContainerHeight(height){
		this.container_height=height;
		this.drawingObject.container_height=height;
	}

}
