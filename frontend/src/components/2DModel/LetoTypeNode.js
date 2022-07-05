import SVGinstanciate from "./svgvar";
import { replaceComponents } from "./utils";
const d3 = require("d3");

export default class LetoTypeNode{
	constructor(logoPath, type,svgShape,representation){
		this.svgShape = svgShape;
		this.logoPath=logoPath;
		this.type=type;
		this.representation = representation;
	}
}
