const d3 = require("d3");
import TerraformObjectNode from "./TerraformObjectNode";

export function storeOutputLinkInData(node,currentModelId,link){
	if (node == null){
		 return;
	}

	else if(node.drawingObject.id == currentModelId){
		node.addOutputLink(link);
	}

	storeOutputLinkInData(node.contains[0],currentModelId,link);
	storeOutputLinkInData(node.rightSibling,currentModelId,link);
}

export function storeInputLinkInData(node,currentModelId,link){
	if (node == null){
		 return;
	}

	else if(node.drawingObject.id == currentModelId){
		node.addInputLink(link);
	}

	storeInputLinkInData(node.contains[0],currentModelId,link);
	storeInputLinkInData(node.rightSibling,currentModelId,link);
}

export function replaceComponents(group) {
	let i = 0;
	let height =
		parseFloat(group.getElementsByClassName("top")[0].getAttribute("height") *2)
		+
		parseFloat(group.getElementsByClassName("middle")[0].getAttribute("height"))


		for (const prop in group.childNodes) {
			if (group.childNodes[prop].tagName == "svg") {
				if (
					group.childNodes[prop].className.baseVal == "model" &&
					group.childNodes[prop].getAttribute("id") != "svg0"
					)
					{
						i++;

						let width = parseFloat(group.getElementsByClassName("main")[0].getAttribute("width"))+parseFloat(group.getElementsByClassName("main")[0].getAttribute("x"));
						let widthChild = parseFloat(group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("width"))+parseFloat(group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("x"));

						d3.select(group.childNodes[prop])
						.attr("x",(width-widthChild) /2)
						.attr("y",height)

						height +=
							parseFloat(group.childNodes[prop]
								.getElementsByClassName("top")[0]
								.getAttribute("height"))
							+
							parseFloat(group.childNodes[prop]
								.getElementsByClassName("main")[0]
								.getAttribute("height"))

					}
				}
			}
			if (
				group.parentNode.className.baseVal == "model" &&
				group.parentNode.getAttribute("id") != "svg0"
			) {
				replaceComponents(group.parentNode);
			}
		}

		function addParentPos(parent,pos){

			pos[0]+=parseFloat(parent.getAttribute("x"));
			pos[1]+=parseFloat(parent.getAttribute("y"));

			if (parent.parentNode.id!="svg0")
			{
				if (parent.parentNode.tagName == "g"){
					parent = parent.parentNode;
				}
				addParentPos(parent.parentNode,pos)
			}
		}

		export function getAnchorAbsPos(anchor){
			let pos = [parseFloat(anchor.getAttribute("cx")),parseFloat(anchor.getAttribute("cy"))];
				addParentPos(anchor.parentNode,pos);
				return pos;
		}

		export function drawLink(beginAnchor,endAnchor,rootID,_links,id){

			let beginAnchorPos=getAnchorAbsPos(beginAnchor);
			let endAnchorPos=getAnchorAbsPos(endAnchor);

			d3.select("#"+rootID).append("line")
									.attr("id",id)
									.attr("class","link")
									.attr("x1",endAnchorPos[0])
									.attr("y1",endAnchorPos[1])
									.attr("x2",beginAnchorPos[0])
									.attr("y2",beginAnchorPos[1])
									.attr("cursor", "pointer")
									.attr("stroke","black")
									.attr("stroke-width",1)
									.attr("marker-start","url(#arrow)")
									.on("click",function()
										{

											this.remove();

										});
			return id;
		}

		export function updateLinks(links,model){

			links[model.id].outputs.forEach(link => {
				let arrow = document.getElementById(link.id);
				let beginId = model.id;
				let endId = link.targetId
				let anchors = TerraformObjectNode.getLinkAnchors(beginId,endId);
				let beginAnchor = anchors[0];

				let beginAnchorPos = getAnchorAbsPos(beginAnchor);
				d3.select(arrow)
					.attr("x2",beginAnchorPos[0])
					.attr("y2",beginAnchorPos[1])
			})

			links[model.id].inputs.forEach(link => {
				let arrow = document.getElementById(link.id);
				let endId = model.id;
				let beginId = link.sourceId
				let anchors = TerraformObjectNode.getLinkAnchors(beginId,endId);
				let endAnchor = anchors[1];

				let endAnchorPos = getAnchorAbsPos(endAnchor);
				d3.select(arrow)
					.attr("x1",endAnchorPos[0])
					.attr("y1",endAnchorPos[1])
			})

			model.childNodes.forEach(element =>{
				if(element.tagName == "g"){
					element.childNodes.forEach(childModel => {
						if(childModel.tagName == "svg"){
							updateLinks(links,childModel)
						}
					})
				}
			})
		}

		export function getModelAbsPos(model){
			let pos = [parseFloat(model.getAttribute("x")),parseFloat(model.getAttribute("y"))];
				addParentPos(model,pos);
				return pos;
		}
