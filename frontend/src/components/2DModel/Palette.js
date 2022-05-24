const d3 = require("d3");

export default class Palette {
	constructor(letoTypeNodeList){
		this.letoTypeNodeList = letoTypeNodeList;
	}

	drawPalette(svgs,panel,modelArea,click_model) {
		for (let i=0; i < this.letoTypeNodeList.length; i++){
			let model = this.letoTypeNodeList[i].drawInPanel(50,50+i*150,document.getElementById("svg1"),svgs);
			//the click_model function works only with tosca for now
			d3.select(model).attr("cursor","pointer").on("click", click_model);
		}
	}
}
