const d3 = require("d3");

export default class Palette {
	constructor(letoTypeNodeList){
		this.letoTypeNodeList = letoTypeNodeList;
	}

	drawPalette(svgs,click_model) {
		console.log(this.letoTypeNodeList)
		for (let i=0; i < this.letoTypeNodeList.length; i++){
			let model = this.letoTypeNodeList[i].drawInPanel(25,50+i*100,document.getElementById("svg1"),svgs);

			d3.select(model).attr("cursor","pointer").on("click", click_model);
		}
	}
}
