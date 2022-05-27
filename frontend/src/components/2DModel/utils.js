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


	let id = Date.now();
	d3.select("#"+rootID).append("line")
							.attr("id",id)
							.attr("class","link")
							.attr("x1",parseFloat(lastArrow.getAttribute("x"))+parseFloat(lastArrow.parentNode.getAttribute("x")))
							.attr("y1",parseFloat(lastArrow.getAttribute("y"))+parseFloat(lastArrow.parentNode.getAttribute("y")))
							.attr("x2",parseFloat(thisArrow.getAttribute("x"))+parseFloat(thisArrow.parentNode.getAttribute("x")))
							.attr("y2",parseFloat(thisArrow.getAttribute("y"))+parseFloat(thisArrow.parentNode.getAttribute("y")))
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
