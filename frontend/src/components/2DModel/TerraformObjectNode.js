import LetoObjectNode from "./LetoObjectNode";
import SVGinstanciate from "./svgvar.js";
import { getModelAbsPos } from "./utils";
const d3 = require("d3");

export default class TerraformObjectNode extends LetoObjectNode {
	constructor(terraformTypeNode,instance_name,level,id){
		super(terraformTypeNode,instance_name,level,id);
		this.contains=[];
		this.level=level;
		this.attributes = terraformTypeNode.attributes;

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
      y:0,
			id: this.id
		}

	}

    drawSVG(svgs, svgParent, parentName, content, level, drag) {

        let data = { logopath: this.drawingObject.logopath,  width: this.drawingObject.width, height: this.drawingObject.height, name: this.drawingObject.name, type: this.drawingObject.type, id : this.id };
        const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
        d3.select(document.querySelector('body')).select("#"+parentName).node().append(svgDom.documentElement);
        const model = document.getElementById(`${this.id}`);

        d3.select(model)
					.append("svg:image")
					.attr("cursor", "move")
					.attr("x",model.getElementById("logo_frame").getAttribute("width")-35)
					.attr("y",10)
					.attr("width", 30)
					.attr("height", 30)
					.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAqklEQVRIieWVQQ6DIBBFX1wYvFrRy9KF7eWwi0KkiDqSIWnTl8zK+L/OfBj4JwzgQhlt8R64A0uoJzC0Elc3sYAvGHjgpmGQEsXFdNpfIDEwwFihNSFIlwFm3v0tcdQiH97dNcnTctXgNF2ObVJqy0XR5kNO6fn8ixKSZw8O5tB0yKmJrTCwEvEzfuMk54ysl10kXnZ7rbxEnq70QKktntLCUd9qTVfm9/IC8+hUYHPjvWwAAAAASUVORK5CYII=")
					.call(drag.value);

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"input_anchor_bottom")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width")*(3/5))
					.attr("cy",50)
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"output_anchor_bottom")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width")*(2/5))
					.attr("cy",50)
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"input_anchor_top")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width")*(3/5))
					.attr("cy",2)
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"output_anchor_top")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width")*(2/5))
					.attr("cy",2)
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"input_anchor_left")
					.attr("cx",3)
					.attr("cy",model.getElementById("logo_frame").getAttribute("height")*(1/4))
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"output_anchor_left")
					.attr("cx",3)
					.attr("cy",model.getElementById("logo_frame").getAttribute("height")*(3/4))
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"input_anchor_right")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width"))
					.attr("cy",model.getElementById("logo_frame").getAttribute("height")*(1/4))
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

				d3.select(model)
					.append("circle")
					.attr("id",this.id+"output_anchor_right")
					.attr("cx",model.getElementById("logo_frame").getAttribute("width"))
					.attr("cy",model.getElementById("logo_frame").getAttribute("height")*(3/4))
					.attr("r",2)
					.attr("style","stroke:none; stroke-width:1; fill:none");

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

		static getLinkAnchors(beginId,endId){

			let beginPos = getModelAbsPos(document.getElementById(beginId));
			let endPos = getModelAbsPos(document.getElementById(endId));
			let xDiff = beginPos[0]-endPos[0];
			let yDiff = beginPos[1]-endPos[1];
			console.log(xDiff,yDiff)
			let beginAnchor;
			let endAnchor;
			if (Math.abs(xDiff)>=Math.abs(yDiff) && xDiff>=0){
				beginAnchor = document.getElementById(beginId).getElementById(beginId+"output_anchor_left");
				endAnchor = document.getElementById(endId).getElementById(endId+"input_anchor_right");
			}
			else if(Math.abs(xDiff)<Math.abs(yDiff) && yDiff>=0){
				beginAnchor = document.getElementById(beginId).getElementById(beginId+"output_anchor_top");
				endAnchor = document.getElementById(endId).getElementById(endId+"input_anchor_bottom");
			}
			else if (Math.abs(xDiff)>=Math.abs(yDiff) && xDiff<=0){
				beginAnchor = document.getElementById(beginId).getElementById(beginId+"output_anchor_right");
				endAnchor = document.getElementById(endId).getElementById(endId+"input_anchor_left");
			}
			else if(Math.abs(xDiff)<Math.abs(yDiff) && yDiff<=0){
				beginAnchor = document.getElementById(beginId).getElementById(beginId+"output_anchor_bottom");
				endAnchor = document.getElementById(endId).getElementById(endId+"input_anchor_top");
			}
			return [beginAnchor,endAnchor];
		}
}
