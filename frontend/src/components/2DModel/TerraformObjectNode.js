import LetoObjectNode from "./LetoObjectNode";
import SVGinstanciate from "./svgvar.js";
const d3 = require("d3");

export default class TerraformObjectNode extends LetoObjectNode {
	constructor(terraformTypeNode,instance_name,level){
		super(terraformTypeNode,instance_name,level);
		this.contains=[];
		this.level=level;

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
        let data = { logopath: this.drawingObject.logopath,  width: this.drawingObject.width, height: this.drawingObject.height, name: this.drawingObject.name, type: this.drawingObject.type, id : this.drawingObject.name + "_" + this.drawingObject.type };
        const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
        d3.select(document.querySelector('body')).select("#"+parentName).node().append(svgDom.documentElement);
        const model = document.getElementById(`${this.drawingObject.name}_${this.drawingObject.type}`);

        d3.select(`#${this.drawingObject.name}_${this.drawingObject.type}`)
					.append("svg:image")
					.attr("cursor", "move")
					.attr("x",model.getElementById("logo_frame").getAttribute("width")-30)
					.attr("y",10)
					.attr("width", 30)
					.attr("height", 30)
					.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAqklEQVRIieWVQQ6DIBBFX1wYvFrRy9KF7eWwi0KkiDqSIWnTl8zK+L/OfBj4JwzgQhlt8R64A0uoJzC0Elc3sYAvGHjgpmGQEsXFdNpfIDEwwFihNSFIlwFm3v0tcdQiH97dNcnTctXgNF2ObVJqy0XR5kNO6fn8ixKSZw8O5tB0yKmJrTCwEvEzfuMk54ysl10kXnZ7rbxEnq70QKktntLCUd9qTVfm9/IC8+hUYHPjvWwAAAAASUVORK5CYII=")
					.call(drag.value);

        d3.select(`#${this.drawingObject.name}_${this.drawingObject.type}`).on("click", function() {
            let detailsContainer = document.getElementById("detailsContainer");
            d3.select(detailsContainer).html(formatDatas(this.drawingObject, model.getAttribute('level')).join('<br/>'));
        });

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

        return document.getElementById(this.drawingObject.id);
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
