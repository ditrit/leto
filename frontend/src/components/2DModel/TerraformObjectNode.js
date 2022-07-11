import { LetoObjectNode } from "leto-module-client/src";
import SVGinstanciate from "./svgvar.js";
import { getModelAbsPos, getAttributesInData } from "./utils";
const d3 = require("d3");

export default class TerraformObjectNode extends LetoObjectNode {
	constructor(terraformType,instance_name, id, parentId, objects){
		super(terraformType, instance_name, id, parentId);
		this.parentId = parentId;
		// this.attributes = terraformType.attributes;
		this.objects = (objects) ? objects : [];
	}

    drawSVG(svgs, svgParent, parentName, content, dragList, dataList) {
			let drag = dragList[0];
			let dragLink = dragList[1];
			let rootTreeObject = dataList[0];
			let drawingLink = dataList[1];
        let data = { logopath: this.letoType.logoPath,  width: this.width, height: this.height, name: this.name, type: this.letoType.type, id : this.id };
        const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
        d3.select(document.querySelector('body')).select("#"+parentName).node().append(svgDom.documentElement);
        const model = document.getElementById(`${this.id}`);

				d3.select(model.getElementById("logo_frame")).call(dragLink.value);

				d3.select(model.getElementById("logo_frame"))
					.on("contextmenu",(e) => {
						e.preventDefault();
						const groups = d3.select('#root').selectAll('svg');
						d3.selectAll(groups).select('#logo_frame').attr("fill","white");
						let menu = document
                    .getElementById("contextMenu");
						let list = document.getElementById("contextMenuList");

						d3.selectAll(list.children).remove();

						let rootx = document.getElementById("root").getBoundingClientRect().x;
						let rooty = document.getElementById("root").getBoundingClientRect().y;
            menu.style.left = e.pageX-rootx + "px";
            menu.style.top = e.pageY-rooty/2 + "px";

						// let currentLetoObj = {
						// 	attributes:null,
						// }
						// getAttributesInData(rootTreeObject,this.id,currentLetoObj);
						let nLinkAttr = 0;
						if(this.letoType.attributes){
							this.letoType.attributes.forEach(attribute => {
								if(attribute.representation == "link" || attribute.representation == "inverseLink"){
									nLinkAttr ++;
									let listElem = document.createElement("li");
									let listElemText = document.createElement("a");
									d3.select(listElemText).on("click",function(){
										menu.style.display = "none"
										d3.select(model.getElementById("logo_frame")).attr("fill","green");
										drawingLink.resourceType = this.textContent;
										drawingLink.variableName = attribute.variableName;
										drawingLink.multiple = attribute.array;
										drawingLink.required = attribute.required;
										drawingLink.representation = attribute.representation;
									})
									let text = document.createTextNode(attribute.resourceType);
									listElemText.appendChild(text);
									listElem.appendChild(listElemText);
									list.appendChild(listElem);
								}
							})
						}
						if(nLinkAttr>0){
							menu.style.display = 'block';
						}
						else{
							menu.style.display = 'none';
						}
					})

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
            model.setAttribute('x', this.x)
            model.setAttribute('y', this.y)
        } else {
            document.getElementById(parentName).querySelector("g").appendChild(model)
            model.setAttribute('x', this.x)
            model.setAttribute('y', this.y)
        }

        return document.getElementById(`${this.id}`);
    }



		static getLinkAnchors(beginId,endId){
			let beginPos = getModelAbsPos(document.getElementById(beginId));
			let endPos = getModelAbsPos(document.getElementById(endId));
			let xDiff = beginPos[0]-endPos[0];
			let yDiff = beginPos[1]-endPos[1];
			let beginAnchor;
			let endAnchor;
			if (Math.abs(xDiff)>=Math.abs(yDiff) && xDiff>=0){
				beginAnchor = document.getElementById(beginId+"output_anchor_left");
				endAnchor = document.getElementById(endId+"input_anchor_right");
			}
			else if(Math.abs(xDiff)<Math.abs(yDiff) && yDiff>=0){
				beginAnchor = document.getElementById(beginId+"output_anchor_top");
				endAnchor = document.getElementById(endId+"input_anchor_bottom");
			}
			else if (Math.abs(xDiff)>=Math.abs(yDiff) && xDiff<=0){
				beginAnchor = document.getElementById(beginId+"output_anchor_right");
				endAnchor = document.getElementById(endId+"input_anchor_left");
			}
			else if(Math.abs(xDiff)<Math.abs(yDiff) && yDiff<=0){
				beginAnchor = document.getElementById(beginId+"output_anchor_bottom");
				endAnchor = document.getElementById(endId+"input_anchor_top");
			}
			return [beginAnchor,endAnchor];
		}
}
