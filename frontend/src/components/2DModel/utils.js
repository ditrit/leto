const d3 = require("d3");


export default function drawLink(lastArrow,thisArrow,rootID,zoom){
	let id = Date.now();
	d3.select("#"+rootID).append("line")
							.attr("id",id)
							.attr("x1",(lastArrow.getBoundingClientRect().x-document.getElementById(rootID).getBoundingClientRect().x)/zoom)
							.attr("y1",(lastArrow.getBoundingClientRect().y-document.getElementById(rootID).getBoundingClientRect().y)/zoom)
							.attr("x2",(thisArrow.getBoundingClientRect().x-document.getElementById(rootID).getBoundingClientRect().x)/zoom)
							.attr("y2",(thisArrow.getBoundingClientRect().y-document.getElementById(rootID).getBoundingClientRect().y)/zoom)
							.attr("cursor", "pointer")
							.style("stroke", "black")
							.style("stroke-width",3)
							.on("click",function(d)
								{
									thisArrow.remove();
								});
	return id;
}
