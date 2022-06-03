const d3 = require("d3");

export default class Palette {
	constructor(letoTypeNodeList){
		this.letoTypeNodeList = letoTypeNodeList;
	}

	drawPalette(svgs,click_model) {
		for (let i=0; i < this.letoTypeNodeList.length; i++){
			let model = this.letoTypeNodeList[i].drawInPanel(50,50+i*150,document.getElementById("svg1"),svgs);
			//WIP: click_model function and all interactions behaviors
			d3.select(model).attr("cursor","pointer").on("click", click_model);
		}
	}
}