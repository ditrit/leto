const d3 = require("d3");

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
