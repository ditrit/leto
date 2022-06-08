import LetoObjectNode from "./LetoObjectNode";

export default class TerraformObjectNode extends LetoObjectNode {
	constructor(terraformTypeNode,instance_name,level){
		super(terraformTypeNode,instance_name,level);
		this.contains=[];
		this.level=level;

		this.drawingObject ={
			width:0,
			height:0,
			svg:this.svg,
			type:this.type_name,
			name:this.instance_name,
			logopath: this.logo_path,
			primary_color: this.primary_color,
			secondary_color: this.secondary_color,
		}

	}

    drawSVGs(svgParent, parentName, content, provider, level) {
		this.drawingObject.id = Date.now();
        let data = { logopath: `logos/${this.drawingObject.icon}`,  width: this.drawingObject.width, height: this.drawingObject.height, name: this.drawingObject.name, type: this.drawingObject.type, id : this.drawingObject.name + "_" + this.drawingObject.type };
        const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
        d3.select(document.querySelector('body')).select("#"+parentName).node().append(svgDom.documentElement);
        const model = document.getElementById(`${this.drawingObject.name}_${this.drawingObject.type}`);
        d3.select(`#${this.drawingObject.name}_${this.drawingObject.type}`).on("click", function() {
            let detailsContainer = document.getElementById("detailsContainer");
            d3.select(detailsContainer).html(formatDatas(this.drawingObject, model.getAttribute('level')).join('<br/>'));
        });
        if(content) {
            svgParent.querySelector("g").appendChild(model);
            model.setAttribute('x', this.drawingObject.x)
            model.setAttribute('y', this.drawingObject.y)
            model.setAttribute('level', level)
        } else {
            document.getElementById(parentName).querySelector("g").appendChild(model)
            model.setAttribute('x', this.drawingObject.x)
            model.setAttribute('y', this.drawingObject.y)
            model.setAttribute('level', level)
        }   
        if(this.drawingObject.contains) {
            drawSVGs(this.drawingObject.contains, model, `${this.drawingObject.name}_${this.drawingObject.type}`, true, provider, level + 1)  
        }  

        return document.getElementById(this.drawingObject.id);
    }

}
