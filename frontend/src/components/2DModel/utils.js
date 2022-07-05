const d3 = require("d3");
import TerraformObjectNode from "./TerraformObjectNode";

export function storeOutputLinkInData(node,currentModelId,link){
	if (node == null){
		 return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == currentModelId){
		node.addOutputLink(link);
	}

	storeOutputLinkInData(node.contains[0],currentModelId,link);
	storeOutputLinkInData(node.rightSibling,currentModelId,link);
}

export function storeInputLinkInData(node,currentModelId,link){
	if (node == null){
		 return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == currentModelId){
		node.addInputLink(link);
	}

	storeInputLinkInData(node.contains[0],currentModelId,link);
	storeInputLinkInData(node.rightSibling,currentModelId,link);
}

export function removeInputLinkInData(node,currentModelId,linkId){
	if (node == null){
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == currentModelId){
		node.removeInputLink(linkId);
	}
	removeInputLinkInData(node.contains[0],currentModelId,linkId);
	removeInputLinkInData(node.rightSibling,currentModelId,linkId);
}

export function removeOutputLinkInData(node,currentModelId,linkId){
	if (node == null){
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == currentModelId){
		node.removeOutputLink(linkId);
	}
	removeOutputLinkInData(node.contains[0],currentModelId,linkId);
	removeOutputLinkInData(node.rightSibling,currentModelId,linkId);
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

export function drawLink(beginAnchor,endAnchor,rootID,id,rootTreeObject){

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
											removeInputLinkInData(rootTreeObject,endAnchor.parentNode.id,id);
											removeOutputLinkInData(rootTreeObject,beginAnchor.parentNode.id,id)
										});
			return id;
}

export function updateLinks(node,model){
			if (node == null){
				return;
			}
			node = (node.value) ? node.value : node;
			if (node.id == model.id){

				node.attributes_output_links.forEach(link => {
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

				node.attributes_input_links.forEach(link => {
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
								updateLinks(node,childModel)
							}
						})
					}
				})
			}
			updateLinks(node.contains[0],model);
			updateLinks(node.rightSibling,model);
}

export function getModelAbsPos(model){
			let pos = [parseFloat(model.getAttribute("x")),parseFloat(model.getAttribute("y"))];
				addParentPos(model,pos);
				return pos;
}

export function updateDrawingInfosInData(node,currentModel){
	if (node == null){
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == (currentModel.getAttribute("id"))){
		node.setX(parseFloat(currentModel.getAttribute("x")));
		node.setY(parseFloat(currentModel.getAttribute("y")));
	}
	updateDrawingInfosInData(node.contains[0],currentModel);
	updateDrawingInfosInData(node.rightSibling,currentModel);
}

export function addContentInData(node,parentId,letoObjectNode){

	if (node == null) {
		return;
	}
	node = (node.value) ? node.value : node;
	if ((parentId) == "svg0"){
		node.addContent(letoObjectNode);
		return;
	}
	else if(node.id == (parentId)){
		node.addContent(letoObjectNode);
	}

	addContentInData(node.contains[0],parentId,letoObjectNode);
	addContentInData(node.rightSibling,parentId,letoObjectNode);
}

export function removeContentInData(node,parentId,letoObjectNode){
	if (node == null) {
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == (parentId)){
		node.contains.forEach(letoNode =>{
			let letoNodeVal = (letoNode.value) ? letoNode.value : letoNode;
			if(letoNodeVal.id == letoObjectNode.id){
				if(node.contains[node.contains.indexOf(letoNode)-1]){
					node.contains[node.contains.indexOf(letoNode)-1]=(node.contains[node.contains.indexOf(letoNode)-1].value)?node.contains[node.contains.indexOf(letoNode)-1].value : node.contains[node.contains.indexOf(letoNode)-1];
					node.contains[node.contains.indexOf(letoNode)-1].setRightSibling(null);
				}
				let nextSibling = letoNodeVal.rightSibling;
				letoObjectNode.setContains(letoNodeVal.getContains());
				letoObjectNode.setOutputs(letoNodeVal.getOutputs());
				letoObjectNode.setInputs(letoNodeVal.getInputs());
				node.contains.splice(node.contains.indexOf(letoNode));

				while (nextSibling){
					node.addContent(nextSibling);
					nextSibling = (nextSibling.value) ? nextSibling.value : nextSibling;
					nextSibling = nextSibling.rightSibling;
				}
			}
		})
	}
	removeContentInData(node.contains[0],parentId,letoObjectNode);
	removeContentInData(node.rightSibling,parentId,letoObjectNode);
}

export function getLetoTypeNodeFromData(panelList,modelType){
	let letoType;
	panelList.forEach(element=>{
		if (
			element.type ==
			modelType
		) {
			letoType = element;
		}
	})
	return letoType;
}

export function getParent(node,parentId){
	if (node == null) {
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == (parentId)){
		return node;
	}
	let result = getParent(node.contains[0],parentId);
	if(result === undefined){
		result = getParent(node.rightSibling,parentId);
	}
	else if(node.id !== 'svg0'){
		result = node;
	}
	return result;
}

export function getNode(node,id){
	if (node == null) {
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.id === id){
		return node;
	}
	let result = getNode(node.contains[0],id);
	if(result === undefined) result = getNode(node.rightSibling,id);
	return result;
}

export function getAttributesInData(node,currentModelId,letoObject){
	if(node == null){
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.id == currentModelId){
		letoObject.attributes = node.getAttributes();
	}
	getAttributesInData(node.contains[0],currentModelId,letoObject);
	getAttributesInData(node.rightSibling,currentModelId,letoObject);
}

export function fillAbleToLinkList(node,attribute,ableToLinkList){
	if (node == null){
		return;
	}
	node = (node.value) ? node.value : node;
		if(node.letoType.type == attribute.resourceType){
			let count = 0;
			node.getLinks().outputs.forEach(link=>{
				if(link.variableName == attribute.variableName){
					count ++;
				}
			})
			if(count==0 || (count>0 && attribute.multiple !== undefined)){
				ableToLinkList.push(node.id);
			}
		}
	fillAbleToLinkList(node.contains[0],attribute,ableToLinkList)
	fillAbleToLinkList(node.rightSibling,attribute,ableToLinkList)
}

export function fillAbleToDropList(node,attribute,ableToDropList){
	if (node == null){
		return;
	}
	node = (node.value) ? node.value : node;
	if(node.letoType.representation == "container" && (attribute.resourceType == node.letoType.type || attribute.resourceType == null )){
			ableToDropList.push(node.id);
	}
	fillAbleToDropList(node.contains[0],attribute,ableToDropList)
	fillAbleToDropList(node.rightSibling,attribute,ableToDropList)
}
