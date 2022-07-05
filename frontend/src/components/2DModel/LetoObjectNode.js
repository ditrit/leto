import SVGinstanciate from "./svgvar";
import { replaceComponents } from "./utils";
const d3 = require("d3");

export default class LetoObjectNode{
	constructor(letoType,name,id){
		this.letoType = letoType;
		this.name=name;
		this.rightSibling=null;
		this.contains = [];
		this.id=id;
		this.attributes_output_links = [];
		this.attributes_input_links = [];

	}

	setLevel(level){
		this.level=level;
	}

	setOutputs(outputs){
		this.attributes_output_links = outputs;
	}

	setInputs(inputs){
		this.attributes_input_links = inputs;
	}

	setId(id){
		this.id = id;
	}

	setRightSibling(rightSibling){
		this.rightSibling = rightSibling;
	}

	setContains(contains){
		this.contains = contains;
	}

	addContent(letoContentObject){
		if (this.contains.length!=0){
			if(this.contains[this.contains.length-1].value){
				this.contains[this.contains.length-1].value.setRightSibling(letoContentObject);
			}
			else{
				this.contains[this.contains.length-1].setRightSibling(letoContentObject);
			}
		}
		this.contains.push(letoContentObject);
	}

	getContains(){
		return this.contains;
	}

	getLevel(){
		return this.level;
	}

	getOutputs(){
		return this.attributes_output_links;
	}

	getInputs(){
		return this.attributes_input_links;
	}

	addOutputLink(link){
		this.attributes_output_links.push(link);
	}

	addInputLink(link){
		this.attributes_input_links.push(link);
	}

	removeOutputLink(linkId){
		let outputs = this.attributes_output_links;
		outputs.forEach(link =>{
			if(link.id == linkId){
				outputs.splice(outputs.indexOf(link));
			}
		})
	}

	removeInputLink(linkId){
		let inputs = this.attributes_input_links;
		inputs.forEach(link =>{
			if(link.id == linkId){
				inputs.splice(inputs.indexOf(link));
			}
		})
	}

	static walkTree(node,callback){
		if (node == null){
			return;
		}
		node = (node.value) ? node.value : node;
		this.walkTree(node.rightSibling,callback);
		this.walkTree(node.contains[0],callback);
		callback(node);
	}
}
