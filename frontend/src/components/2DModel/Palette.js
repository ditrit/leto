const d3 = require("d3");

export default class Palette {
	constructor(letoTypeNodeList){
		this.letoTypeNodeList = letoTypeNodeList;
	}

	drawPalette(svgs,panel,modelArea) {

		console.log(this.letoTypeNodeList);

		for (let i=0; i < this.letoTypeNodeList.length; i++){

			let model = this.letoTypeNodeList[i].drawInPanel(50,50+i*150,document.getElementById("svg1"),svgs);


// Function to make it clickable WIP:

			/*d3.select(model).on("click", function(event,d){

				let clickedModel = this;
				console.log("clicked");
				d3.select(this).transition().attr("fill", "black");
				let panelObject;
				for (const prop in panel) {
					if (
						panel[prop].type_name ==
						clickedModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = panel[prop];
					}
				}
				console.log(panelObject.type_name)

				let currentObj = {
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

				let drawnModel = drawSvg( currentObj,document.getElementById("svg0"));
				d3.select(drawnModel).attr("x",0).attr("y",0);
				modelArea.data.push(currentObj);
				console.log(modelArea.data);
			}
			);*/

		}
	}

}
