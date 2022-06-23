import SVGinstanciate from "./svgvar";
import { replaceComponents } from "./utils";
const d3 = require("d3");

export default class LetoObjectNode{
	constructor(letoTypeNode,instance_name,level,id){
		this.svg = letoTypeNode.svg;
		this.logo_path=letoTypeNode.logo_path;
		this.type_name=letoTypeNode.type_name;
		this.primary_color=letoTypeNode.primary_color;
		this.secondary_color=letoTypeNode.secondary_color;
		this.instance_name=instance_name;
		this.level=level;
		this.rightSibling=null;
		this.contains = [];
		this.links = {
			outputs : [],
			inputs : [],
		}
		this.id=id;

	}

	drawingObject ={}

	setLevel(level){
		this.level=level;
		this.drawingObject.level=level;
	}

	setLinks(links){
		this.links = links;
	}

	setId(id){
		this.drawingObject.id=id;
	}

	setRightSibling(rightSibling){
		this.rightSibling = rightSibling;
	}

	setContains(contains){
		this.contains = contains;
	}

	addContent(letoContentObject){
		if (this.contains.length!=0){
			this.contains[this.contains.length-1].setRightSibling(letoContentObject);
		}
		this.contains.push(letoContentObject);
	}

	getContains(){
		return this.contains;
	}

	getLinks (){
		return this.links;
	}

	getLevel(){
		return this.level;
	}

	addOutputLink(link){
		this.links.outputs.push(link);
	}

	addInputLink(link){
		this.links.inputs.push(link);
	}

	removeOutputLink(linkId){
		let outputs = this.links.outputs;
		outputs.forEach(link =>{
			if(link.id == linkId){
				outputs.splice(outputs.indexOf(link));
			}
		})
	}

	removeInputLink(linkId){
		let inputs = this.links.inputs;
		inputs.forEach(link =>{
			if(link.id == linkId){
				inputs.splice(inputs.indexOf(link));
			}
		})
	}

	drawInWorkshop(parent,svgs,modelArea,zoom,clickArrow,click,drag){
		if(this.drawingObject.id==null){
			this.drawingObject.id = Date.now();
		}


		let nCapa = this.drawingObject.capabilities.length;
    let nReq = this.drawingObject.requirements.length;
    this.drawingObject.rels_height=Math.max(nCapa,nReq)*10;

		this.drawingObject.width = modelArea.widthLevel[this.drawingObject.level];

		const svgDom = SVGinstanciate(svgs[this.drawingObject.svg], this.drawingObject);
		d3.select(parent).node().append(svgDom.documentElement);
		let model = document.getElementById(this.drawingObject.id);

		if(this.drawingObject.rels_height!=null){

			let i=0;
			let j=0;
			let txt;
			let x = model.getElementsByClassName("main")[0].getAttribute("x");
			let width = model.getElementsByClassName("main")[0].getAttribute("width");
			let height = model.getElementsByClassName("rels_limit")[0].getAttribute("y")
									- model.getElementsByClassName("main")[0].getAttribute("y")
									+ model.getElementsByClassName("top_path")[0].getBoundingClientRect().height/zoom
									+7;
				this.drawingObject.requirements.forEach(element => {
					d3.select(model).select("#rels").select("#arrows")
						.append("path")
						.attr("d","m"+[x-4]+" "+[height+7*i]+" 4 3.22-4 3.4h10l2.5-2.12c1.45-1.08.735-1.8-.0234-2.52l-2.47-2z")
						.attr("style","fill-rule:evenodd;fill:#12ed00;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:.259;stroke:#000");
					txt=d3.select(model).select("#rels").select("#arrows")
						.append("text").attr("style","text-align:right;font-family:Alef;font-size:5px;")
						.attr("xml:space","preserve");
					txt.append("tspan")
						 .attr("x", x-4+16)
						 .attr("y", height+3 + i * 7)
						 .attr("style", "stroke-width:.265")
						 .text(this.drawingObject.requirements[i].name);
					d3.select(model)
						 .append("rect")
						 .attr("x",x-4).attr("y",height+7*i)
						 .attr("width",12).attr("height",6.75)
						 .attr("fill","#12ed00").attr("style","opacity:0.0")
						 .attr("class","input")
						 .attr("id","input"+i.toString())
						 .attr("cursor", "pointer")
						 .on("click",clickArrow);

					i++
				});

				this.drawingObject.capabilities.forEach(element => {
					d3.select(model).select("#rels").select("#arrows")
						.append("path")
						.attr("d","m"+[parseFloat(x)-4+parseFloat(width)-5]+" "+[height+7*j]+" 4 3.22-4 3.4h10l2.5-2.12c1.45-1.08.735-1.8-.0233-2.52l-2.47-2z")
						.attr("style","fill-rule:evenodd;fill:#12ed00;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:.259;stroke:#000");
					txt=d3.select(model).select("#rels").select("#arrows")
						.append("text").attr("style","text-align:right;font-family:Alef;font-size:5px;")
						.attr("xml:space","preserve");
					txt.append("tspan")
						 .attr("x", parseFloat(x)-4+parseFloat(width) -40)
						 .attr("y", height+3 + j * 7)
						 .attr("style", "stroke-width:.265")
						 .text(this.drawingObject.capabilities[j].name);

					d3.select(model)
						.append("rect")
						.attr("x",parseFloat(x)-4+parseFloat(width)-5)
						.attr("y",height+7*j).attr("width",12)
						.attr("height",6.75)
						.attr("fill","#12ed00").attr("style","opacity:0.0")
						.attr("class","output")
						.attr("id","output"+j.toString())
						.attr("cursor", "pointer")
						.on("click",clickArrow);

					j++
				});

				if(this.content.length == 0 && model.parentNode.className.baseVal == "model"){
					replaceComponents(model)
				}

				d3.select(model)
				.append("svg:image")
				.attr("cursor", "move")
				.attr("x",this.drawingObject.width-28)
				.attr("y",model.getElementsByClassName("info_limits")[0].getAttribute("y"))
				.attr("width", 30)
				.attr("height", 30)
				.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAqklEQVRIieWVQQ6DIBBFX1wYvFrRy9KF7eWwi0KkiDqSIWnTl8zK+L/OfBj4JwzgQhlt8R64A0uoJzC0Elc3sYAvGHjgpmGQEsXFdNpfIDEwwFihNSFIlwFm3v0tcdQiH97dNcnTctXgNF2ObVJqy0XR5kNO6fn8ixKSZw8O5tB0yKmJrTCwEvEzfuMk54ysl10kXnZ7rbxEnq70QKktntLCUd9qTVfm9/IC8+hUYHPjvWwAAAAASUVORK5CYII=")
				.call(drag);

				d3.select(model).select(".top").attr("cursor", "pointer").on("click",click)

				this.content.forEach(element =>{
					element.drawInWorkshop(document.getElementById(this.drawingObject.id),svgs,modelArea,zoom,clickArrow,click,drag);
				})
				return document.getElementById(this.drawingObject.id);
			}
	}
}
