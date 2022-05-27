const d3 = require("d3");



export function getContent(model,object,panel){
	model.childNodes.forEach(element=>{
		if (element.tagName == "svg"){
		if (element.className.baseVal=="model"){
			var panelObj;

			for (const prop in panel) {
				if (
					panel[prop].type_name ==
					element.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					)
				{
					panelObj = panel[prop];
				}
			}
	var contentObj={
		type_name: element.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, ''),
				instance_name: element.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),
				class: element.getAttribute("class"),
				id: parseInt(element.getAttribute("id")),
		width: element.getElementsByClassName("main")[0].getBoundingClientRect().width,
				logo: d3.select(element).select(".logo").attr("xlink:href"),
				primary_color: element.getElementsByClassName("top")[0].style.fill,
				secondary_color: element.getElementsByClassName("top_path")[0].style.fill,
				level: object.level+1,
				container_height: element.getElementsByClassName("subs_limits")[0].getAttribute("height"),
				content: [],
				requirements: panelObj.requirements,
				capabilities: panelObj.capabilities,
			}
			object.content.push(contentObj);
			getContent(element,contentObj,panel)
		}}
	})
}



export function drawLink(lastArrow,thisArrow,rootID,zoom,translateX,translateY,links){

	function getPos(arrow){
		let pos = [parseFloat(arrow.getAttribute("x")),parseFloat(arrow.getAttribute("y"))];


			function addParentPos(parent,pos){
				console.log(pos)
				pos[0]+=parseFloat(parent.getAttribute("x"));
				pos[1]+=parseFloat(parent.getAttribute("y"));
				console.log(pos)
				if (parent.parentNode.id!="svg0"){
					addParentPos(parent.parentNode,pos)
				}
			}
			addParentPos(arrow.parentNode,pos);

			return pos;

	}

	let lastArrowPos=getPos(lastArrow);
	let thisArrowPos=getPos(thisArrow);

	//console.log(lastArrowPos)
	//console.log(thisArrowPos)

	//parseFloat(lastArrow.getAttribute("x"))+parseFloat(lastArrow.parentNode.getAttribute("x"))


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
							.on("click",function(d)
								{

									this.remove();
									links.splice(links.indexOf(this));
								});
	return id;

}


/*export function click_model(panel,modelArea,event, d) {
	var clickedModel = this;
	console.log("clicked");
	d3.select(this).transition().attr("fill", "black");
	var panelObject;
	for (const prop in panel) {
		if (
			panel[prop].type_name ==
			clickedModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
		) {
			panelObject = panel[prop];
		}
	}
	console.log(panelObject.type_name)

	var currentObj = {
		type_name: panelObject.type_name,
		instance_name: panelObject.instance_name,
		class: this.getAttribute("class"),
		id: Date.now(),
		width: panelObject.width,
		rels_height: panelObject.rels_height,
		container_height: panelObject.container_height,

		logo: panelObject.logo,
		primary_color: panelObject.primary_color,
		secondary_color: panelObject.secondary_color,
		level: 0,
		//containerHeight: 0,
		content: [],
		requirements: panelObject.requirements,
		capabilities: panelObject.capabilities,
	};

	let drawnModel = drawSvg(svgData, currentObj,document.getElementById("svg0"));



	d3.select(drawnModel).attr("x",0).attr("y",0);


	modelArea.data.push(currentObj);
	console.log(modelArea.data);
}*/


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
						//var currentScale =
						//  group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("width")/group.getElementsByClassName("main")[0].getAttribute("width");

						/*d3.select(group.childNodes[prop])
							.attr(
								"transform",
								"scale(" +
								 1+
									")translate(" +
									[
										(parseFloat(group.getElementsByClassName("main")[0].getAttribute("width"))+parseFloat(group.getElementsByClassName("main")[0].getAttribute("x")) -
											parseFloat(group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("width"))-parseFloat(group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("x"))) /
											2
											, height+parseFloat(group.childNodes[prop].getElementsByClassName("top")[0].getAttribute("height"))
												+
												parseFloat(group.getElementsByClassName("main")[0].getAttribute("y"))
												-
												parseFloat(group.childNodes[prop].getElementsByClassName("top")[0].getAttribute("y")) ,
									] +")"
							);*/

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
