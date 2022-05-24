import SVGinstanciate from "./svgvar";
const d3 = require("d3");

export default class LetoTypeNode{
	constructor(logo_path, type_name, primary_color, secondary_color,svg){
		this.svg = svg;
		this.logo_path=logo_path;
		this.type_name=type_name;
		this.primary_color=primary_color;
		this.secondary_color=secondary_color;
	}

	defaultPanel={}

	drawInPanel(x,y,parent,svgs){
		this.defaultPanel.id = Date.now();
		const svgDom = SVGinstanciate(svgs[this.defaultPanel.svg], this.defaultPanel);
		let newSvg = d3.select(parent).node().append(svgDom.documentElement);
		let model = document.getElementById(this.defaultPanel.id);

		model.setAttribute("x",x);
		model.setAttribute("y",y);

		return model;
	}
}
