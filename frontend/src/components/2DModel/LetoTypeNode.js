import SVGinstanciate from "./svgvar";
import { replaceComponents } from "./utils";
const d3 = require("d3");

export default class LetoTypeNode {
	defaultPalette = {}

	constructor(logo_path, type_name, primary_color, secondary_color, svg) {
		this.svg = svg;
		this.logo_path = logo_path;
		this.type_name = type_name;
		this.primary_color = primary_color;
		this.secondary_color = secondary_color;
	}

	drawInPanel(x, y, parent, svgs) {
		this.defaultPalette.id = this.defaultPalette.type;
		const svgDom = SVGinstanciate(svgs[this.defaultPalette.svg], this.defaultPalette);
		d3.select(parent).node().append(svgDom.documentElement);
		let model = document.getElementById(this.defaultPalette.id);

		model.setAttribute("x", x);
		model.setAttribute("y", y);

		return model;
	}
}
