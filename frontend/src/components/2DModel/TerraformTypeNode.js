import LetoTypeNode from "./LetoTypeNode";

export default class TerraformTypeNode extends LetoTypeNode {
	constructor(logoPath, type,svgShape,representation,attributes){
		super(logoPath, type,svgShape,representation);
		this.attributes = attributes;
	}
}
