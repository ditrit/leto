const d3 = require("d3");
import ToscaObjectNode from "./ToscaObjectNode";


export function getContent(model,object,toscaPanelList){
	model.childNodes.forEach(element=>{
		if (element.tagName == "svg"){
			if (element.className.baseVal=="model"){

				let panelObject;

				toscaPanelList.forEach(ele=>{
					if (
						ele.type_name ==
						element.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = ele;
					}
				})

				let contentObj = new ToscaObjectNode(panelObject,element.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),0);
				contentObj.setId(parseInt(element.getAttribute("id")));
				contentObj.setContainer_height(element.getElementsByClassName("subs_limits")[0].getAttribute("height"))
				contentObj.setLevel(object.level+1)
				if (object.content.length!=0){
					object.content[object.content.length-1].rightSibling = contentObj;
				}

				object.content.push(contentObj);
				getContent(element,contentObj,toscaPanelList)
			}
		}
	})
}


export function drawLink(lastArrow,thisArrow,rootID,links){

	function getPos(arrow){
		let pos = [parseFloat(arrow.getAttribute("x")),parseFloat(arrow.getAttribute("y"))];

			function addParentPos(parent,position){
				console.log(position)
				pos[0]+=parseFloat(parent.getAttribute("x"));
				pos[1]+=parseFloat(parent.getAttribute("y"));
				console.log(position)
				if (parent.parentNode.id!="svg0")
				{
					addParentPos(parent.parentNode,pos)
				}
			}
			addParentPos(arrow.parentNode,pos);
			return pos;
	}

	let lastArrowPos=getPos(lastArrow);
	let thisArrowPos=getPos(thisArrow);

	let id = Date.now();
	d3.select("#"+rootID).append("line")
							.attr("id",id)
							.attr("class","link")
							.attr("x1",lastArrowPos[0])
							.attr("y1",lastArrowPos[1])
							.attr("x2",thisArrowPos[0])
							.attr("y2",thisArrowPos[1])
							.attr("cursor", "pointer")
							.style("stroke", "black")
							.style("stroke-width",3)
							.on("click",function()
								{

									this.remove();
									links.splice(links.indexOf(this));
								});
	return id;
}


export function replaceComponents(group) {
	var i = 0;
	var height =
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
