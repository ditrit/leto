import LetoObjectNode from "./LetoObjectNode";
import SVGinstanciate from "./svgvar.js";
const d3 = require("d3");

export default class TerraformObjectNode extends LetoObjectNode {
	constructor(terraformTypeNode,instance_name,level,id){
		super(terraformTypeNode,instance_name,level);
		this.contains=[];
		this.level=level;
		this.id=id;

		this.drawingObject ={
			width:0,
			height:0,
			svg:this.svg,
			type:this.type_name,
			name:this.instance_name,
			logopath: this.logo_path,
			primary_color: this.primary_color,
			secondary_color: this.secondary_color,
            x:0,
            y:0
		}

	}

    drawSVG(svgs, svgParent, parentName, content, level, drag) {
		this.drawingObject.id = Date.now();
        let data = { logopath: this.drawingObject.logopath,  width: this.drawingObject.width, height: this.drawingObject.height, name: this.drawingObject.name, type: this.drawingObject.type, id : this.id };
        const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
        d3.select(document.querySelector('body')).select("#"+parentName).node().append(svgDom.documentElement);
        const model = document.getElementById(`${this.id}`);

        d3.select(`#${this.id}`)
					.append("svg:image")
					.attr("cursor", "move")
					.attr("x",model.getElementById("logo_frame").getAttribute("width")-30)
					.attr("y",10)
					.attr("width", 30)
					.attr("height", 30)
					.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAqklEQVRIieWVQQ6DIBBFX1wYvFrRy9KF7eWwi0KkiDqSIWnTl8zK+L/OfBj4JwzgQhlt8R64A0uoJzC0Elc3sYAvGHjgpmGQEsXFdNpfIDEwwFihNSFIlwFm3v0tcdQiH97dNcnTctXgNF2ObVJqy0XR5kNO6fn8ixKSZw8O5tB0yKmJrTCwEvEzfuMk54ysl10kXnZ7rbxEnq70QKktntLCUd9qTVfm9/IC8+hUYHPjvWwAAAAASUVORK5CYII=")
					.call(drag.value);

				d3.select(`#${this.id}`)
					.append("circle")
					.attr("id","input_anchor")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width"))
					.attr("cy",8)
					.attr("r",7)
					.attr("style","stroke:black; stroke-width:1; fill:red");

				d3.select(`#${this.id}`)
					.append("circle")
					.attr("id","output_anchor")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width"))
					.attr("cy",44)
					.attr("r",7)
					.attr("style","stroke:black; stroke-width:1; fill:blue");

        if(content) {
            svgParent.querySelector("g").appendChild(model);
            model.setAttribute('x', this.drawingObject.x)
            model.setAttribute('y', this.drawingObject.y)
            model.setAttribute('level', level)
        } else {
            document.getElementById(parentName).querySelector("g").appendChild(model)
            model.setAttribute('x', this.drawingObject.x)
            model.setAttribute('y', this.drawingObject.y)
            model.setAttribute('level', level)
        }

        return document.getElementById(`${this.id}`);
    }

    setHeight(height) {
        this.drawingObject.height = height;
    }

    setWidth(width) {
        this.drawingObject.width = width;
    }

    setX(x) {
        this.drawingObject.x = x;
    }

    setY(y) {
        this.drawingObject.y = y;
    }
}
