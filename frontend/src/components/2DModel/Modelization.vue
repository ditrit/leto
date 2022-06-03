<template>

	<div  id="myDataViz">
		<pre>{{ monacoSourceData }}</pre>
	</div>
</template>

<script>
import { onMounted, ref } from "vue";
const d3 = require("d3");
import Palette from "./Palette"
import {drawLink,getContent,replaceComponents} from "./utils";
import SVGinstanciate from "./svgvar"
import ToscaTypeNode from "./ToscaTypeNode"
import ToscaObjectNode from "./ToscaObjectNode";
import { useStore } from "vuex";
import { forEach } from 'mathjs';

export default {

	setup() {
		//const monacoSourceData = ref({});
		const lastArrow = ref(null);
		const zoom = ref(1);
		const translateX = ref(0);
		const translateY = ref(0);
		const store = useStore();
		const loading = ref(true);
		const svgs = ref({});
		const links = ref([]);
		const drag = ref(d3.drag()
											.on("start", dragstarted)
											.on("drag", dragged)
											.on("end", dragended));
		const panel = ref({

			server: {
				svg:"server",
				//name: "Apache",
				width: 120,
				rels_height: 30,
				container_height: 20,
				instance_name: "R2D2",
				type_name: "server",
				logo: "https://img.icons8.com/ios/50/000000/database.png",
				//color: "blue",
				primary_color: "#d3eaf2",
				secondary_color: "#bae0ed",
				kind: "service",
				requirements: [
					{
						name: "data source",
						typeof: "connects to",
					},
					{
						name: "data source 2",
						typeof: "connects to",
					},
					{
						name: "Input",
						typeof: "connects to",
					},
				],
				capabilities: [
					{
						name: "Output",
						typeof: "connects to",
					},
					{
						name: "Output",
						typeof: "connects to",
					},
					{
						name: "Output",
						typeof: "connects to",
					},
					{
						name: "Output",
						typeof: "connects to",
					},
				],
			},
			database: {
				svg:"database",
				//name: "Apache",
				width: 120,
				rels_height: 30,
				container_height: 20,
				instance_name: "C3PO",
				type_name: "database",
				logo: "https://img.icons8.com/ios/50/000000/database.png",
				//color: "blue",
				primary_color: "#d3eaf2",
				secondary_color: "#bae0ed",
				kind: "service",
				requirements: [
					{
						name: "data source",
						typeof: "connects to",
					},
					{
						name: "data source 2",
						typeof: "connects to",
					},
					{
						name: "Input",
						typeof: "connects to",
					},
					{
						name: "Input",
						typeof: "connects to",
					},
					{
						name: "Input",
						typeof: "connects to",
					},
					{
						name: "Input",
						typeof: "connects to",
					},
					{
						name: "Input",
						typeof: "connects to",
					},
				],
				capabilities: [
					{
						name: "Output",
						typeof: "connects to",
					},
					{
						name: "Output",
						typeof: "connects to",
					},
					{
						name: "Output",
						typeof: "connects to",
					},
					{
						name: "Output",
						typeof: "connects to",
					},
				],
			},

		});
		const toscaPanelList = ref([]);
		const rootTreeObject = ref ({
			content: [],
			drawingObject:{},
			level:-1,
			rightSibling:null,
		})
		const modelArea = ref({
			levels: [2.75, 2.5, 2.25, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5],
      widthLevel : [230,200,170,140,110,80],
		});

		/*
		<<<<<<<<<< From iactormonaco

		//let arg = process.argv.slice(2).toString();
		const datas = get_datas('../tests/tf');
		let resources = calcul_attributes_objects(datas)

		//const res = fs.readFileSync('../svg/resource.svg').toString()

		function drawSVG(datas, parentDatas, svgParent, parentName, content) {
			datas.forEach( d => {
				let data = { logopath: 'logos/' + d.icon,  width: d.width, height: d.height, name: d.name, type: d.type, id : d.name + "_" + d.type };
				const svgDom = SVGinstanciate(res, data, dom);
				body.select("#"+parentName).node().append(svgDom.documentElement)
				var model = dom.window.document.getElementById(d.name + "_" + d.type)
				if(content) {
					svgParent.querySelector("g").appendChild(model)
					model.setAttribute('x', d.x)
					model.setAttribute('y', d.y)
					d.x = parentDatas.x + d.x
					d.y = parentDatas.y + d.y
				} else {
					dom.window.document.getElementById(parentName).querySelector("g").appendChild(model)
					model.setAttribute('x', d.x)
					model.setAttribute('y', d.y)
				}
				if(d.contains) {
					drawSVG(d.contains, d, model, d.name + "_" + d.type, true)
				}
			})
			datas.forEach( blockEnd => {
				if(blockEnd.link) {
					blockEnd.link.forEach( blockBegin => {
						let xEnd, yEnd, xBegin, yBegin;
						let blockEndWidth = ((blockEnd.width > 0) ? blockEnd.width + 30 : 160)
						let blockBeginWidth = ((blockBegin.width > 0) ? blockBegin.width + 30 : 160)
						let blockEndHeight = ((blockEnd.height > 0) ? blockEnd.height + 30 : 44)
						let blockBeginHeight = ((blockBegin.height > 0) ? blockBegin.height + 30 : 44)
						let endX1 = blockEnd.x + blockEndWidth
						let endX2 = blockBegin.x + blockBeginWidth
						let endY1 = blockEnd.y + blockEndHeight
						let endY2 = blockBegin.y + blockBeginHeight
						if(blockBegin.y == blockEnd.y && blockBeginHeight == blockEndHeight) {
							yEnd = blockEnd.y + blockEndHeight/2
							yBegin = blockBegin.y + blockBeginHeight/2
							if(blockBegin.x > blockEnd.x) {
								yEnd+= 10
								yBegin+= 10
								xEnd = endX1 + 10
								xBegin = blockBegin.x + 4
							} else {
								yEnd-= 10
								yBegin-= 10
								xEnd = blockEnd.x
								xBegin = endX2 + 4
							}
						} else if(blockBegin.x == blockEnd.x && blockBeginWidth == blockEndWidth){
							xEnd = blockEnd.x + blockEndWidth/2
							xBegin = blockBegin.x + blockBeginWidth/2
							if(blockBegin.y > blockEnd.y) {
								xEnd+= 10
								xBegin+= 10
								yEnd = endY1 + 10
								yBegin = blockBegin.y + 4
							} else {
								xEnd-= 10
								xBegin-= 10
								yEnd = blockEnd.y
								yBegin = endY2 + 4
							}
						} else {
							if(blockEndWidth > blockBegin.x && blockEndWidth > endX2) {
								xEnd = blockEnd.x + blockEndWidth/2 + 5 - 10
								xBegin = blockBegin.x + blockBeginWidth/2 + 10
								yEnd = endY1 - 10
								yBegin = blockBegin.y + 4
							} else if(endX2 > endX1 && endY2 > endY1) {
								xEnd = endX1 + 8
								xBegin = blockBegin.x + blockBeginWidth/2 - 10
								yEnd = blockEnd.y + blockEndHeight/2 + 10
								yBegin = blockBegin.y + 4
							} else if(endX2 > endX1 && endY2 < endY1) {
								xEnd = endX1 + 8
								xBegin = blockBegin.x + blockBeginWidth/2 - 10
								yEnd = blockEnd.y + blockEndHeight/2 - 10
								yBegin = endY2 + 4
							} else if(endX2 < endX1 && endY2 < endY1) {
								xEnd = blockEnd.x + blockEndWidth/2 - 10
								xBegin = endX2 + 4
								yEnd = blockEnd.y
								yBegin = blockBegin.y + blockBeginHeight/2 - 10
							} else {
								xEnd = blockEnd.x
								xBegin = blockBegin.x + blockBeginWidth/2 + 10
								yEnd = blockEnd.y + blockEndHeight/2 + 10
								yBegin = blockBegin.y + 4
							}
						}
						svg.append("line")
							.attr("x1",xEnd)
							.attr("y1",yEnd)
							.attr("x2",xBegin)
							.attr("y2",yBegin)
							.attr("stroke","black")
							.attr("stroke-width",1)
							.attr("marker-start","url(#arrow)");
					})
				}
			})
		}*/

		//Define all interaction functions ---------------------------------------------

		function clickArrow(){

				if(lastArrow.value==null)
				{
					lastArrow.value=this;
				}
				else
				{
					console.log("lastArrow:"+lastArrow.value.className.baseVal+" thisArrow:"+this.className.baseVal)
					if((lastArrow.value.className.baseVal=="input"&&this.className.baseVal=="output")
						||(lastArrow.value.className.baseVal=="output"&&this.className.baseVal=="input"))
						{
							let linkID=drawLink(lastArrow.value,this,"svg0",zoom.value,translateX.value,translateY.value,links.value);

							let sourceID,targetID,sourceArrow,targetArrow;
							if(lastArrow.value.className=="input")
							{
								sourceID=this.parentNode.id;
								sourceArrow=this.id;
								targetID=lastArrow.value.parentNode.id;
								targetArrow=lastArrow.value.id;
							}
							else
							{
								sourceID=lastArrow.value.parentNode.id;
								sourceArrow=lastArrow.value.id;
								targetID=this.parentNode.id;
								targetArrow=this.id;
							}
							links.value.push({
								sourceID: sourceID,
								sourceArrow: sourceArrow,
								targetID: targetID,
								targetArrow: targetArrow,
								id: linkID
							})
						}
						lastArrow.value=null;
				}
		}

		function click() {
				console.log("click "+this.parentNode.parentNode.parentNode.getAttribute("id"));
				let detailsContainer = document.getElementById("detailsContainer");
				d3.selectAll(detailsContainer.childNodes).remove();

				let currentID = parseInt(this.parentNode.parentNode.parentNode.getAttribute("id"));
				let currentLevel;
				let currentModel = this.parentNode.parentNode.parentNode;
				let parent = currentModel.parentNode;


				function traverseData(node){
				if (node == null) return;

				else if(node.drawingObject.id == parseInt(currentModel.getAttribute("id"))){
					currentLevel= node.level;
				}
				traverseData(node.content[0]);
				traverseData(node.rightSibling);
			}
			traverseData(rootTreeObject.value);


				let panelObj;
      	for (const prop in panel.value)
				{
        	if (panel.value[prop].type_name ==currentModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, ''))
					{
        		panelObj = panel.value[prop];
        	}
      	}

				let currentObj ={
					type_name: currentModel.getElementsByClassName("type_name")[0].textContent,
        	instance_name: currentModel.getElementsByClassName("instance_name")[0].textContent,
        	id: parseInt(currentModel.getAttribute("id")),
					//width: currentModel.getElementsByClassName("main")[0].getAttribute("width"),
        	//logo: d3.select(currentModel).select(".logo").attr("xlink:href"),
        	//primary_color: currentModel.getElementsByClassName("top")[0].style.fill,
        	//secondary_color: currentModel.getElementsByClassName("top_path")[0].style.fill,
        	level: currentLevel,
        	//container_height:
					//parseFloat((currentModel).getElementsByClassName("subs_limits")[0].getAttribute("height")),
        	//content: [],
        	requirements: panelObj.requirements,
        	capabilities: panelObj.capabilities,
				}

				let p=document.createElement("p");
				p.appendChild(document.createTextNode("	Name :"+currentObj.instance_name));
				document.getElementById("detailsContainer").appendChild(p);

				p=document.createElement("p");
				p.appendChild(document.createTextNode("	Type :"+currentObj.type_name));
				document.getElementById("detailsContainer").appendChild(p);

				p=document.createElement("p");
				p.appendChild(document.createTextNode("	Level :"+currentObj.level));
				document.getElementById("detailsContainer").appendChild(p);

				p=document.createElement("p");
				p.appendChild(document.createTextNode("	ID :"+currentObj.id));
				document.getElementById("detailsContainer").appendChild(p);

				p=document.createElement("p");
				p.appendChild(document.createTextNode("	Capabilities :"));
				document.getElementById("detailsContainer").appendChild(p);

				p=document.createElement("ul");
				currentObj.capabilities.forEach(el =>{
					p.appendChild(document.createElement("li").appendChild(document.createTextNode("- "+el.name+" -> type: "+el.typeof)));
					p.appendChild(document.createElement("br"))
				})
				document.getElementById("detailsContainer").appendChild(p);

				p=document.createElement("p");
				p.appendChild(document.createTextNode("	Requirements :"));
				document.getElementById("detailsContainer").appendChild(p);

				p=document.createElement("ul");
				currentObj.requirements.forEach(el =>{
					p.appendChild(document.createElement("li").appendChild(document.createTextNode("- "+el.name+" -> type: "+el.typeof)));
					p.appendChild(document.createElement("br"))
				})
				document.getElementById("detailsContainer").appendChild(p);

		}

		function click_model() {
				var clickedModel = this;
				d3.select(this).transition().attr("fill", "black");
				var panelObject;
				console.log(toscaPanelList.value)
				toscaPanelList.value.forEach(element=>{
					if (
						element.type_name ==
						clickedModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = element;
					}
				})


				let toscaObject = new ToscaObjectNode(panelObject,"myToscaObjectNode",0);
				console.log(toscaObject)
				let drawnModel = toscaObject.drawInWorkshop(document.getElementById("svg0"),svgs.value,modelArea.value,zoom.value,clickArrow,click,drag.value);
				d3.select(drawnModel).attr("x",-translateX.value/zoom.value).attr("y",-translateY.value/zoom.value);

				if (rootTreeObject.value.content.length!=0){
					rootTreeObject.value.content[rootTreeObject.value.content.length-1].rightSibling = toscaObject;
				}
				rootTreeObject.value.content.push(toscaObject);
				console.log(rootTreeObject.value.content);

		}

		function dragstarted() {
      		let currentID = parseInt(this.parentNode.getAttribute("id"));
      		var currentModel = this.parentNode;
      		var currentLevel;
      		var parent = this.parentNode.parentNode;


			function traverseData(node){
				if (node == null) return;

				else if(node.drawingObject.id == parseInt(parent.getAttribute("id"))||(parent.getAttribute("id")=="svg0"&&node.level==-1)){
					currentLevel= node.level+1;
					for(let ele of node.content){
						if( ele.drawingObject.id == currentID){
							if(node.content.indexOf(ele)>=1){
								node.content[node.content.indexOf(ele)-1].rightSibling=node.content[node.content.indexOf(ele)+1];
							}
							node.content.splice(node.content.indexOf(ele),1);
							return;
						}
					}
					if (node.content.length!=0){

					}
				}
				traverseData(node.content[0]);
				traverseData(node.rightSibling);
			}
			traverseData(rootTreeObject.value)



      if (currentModel.parentNode.getAttribute("id") != "svg0") {

				let panelObject;

				toscaPanelList.value.forEach(ele=>{
					if (
						ele.type_name ==
						currentModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = ele;
					}
				})

				let currentObj = new ToscaObjectNode(panelObject,currentModel.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),0);
				currentObj.setId(parseInt(currentModel.getAttribute("id")));
				currentObj.setLevel(currentLevel);
				currentObj.setContainer_height(parseFloat((currentModel).getElementsByClassName("subs_limits")[0].getAttribute("height")))



				getContent(currentModel,currentObj,toscaPanelList.value)

				parent.removeChild(currentModel);
				document.getElementById("svg0").appendChild(currentModel);


				function redrawStack(group,removedComponent){

					let panelObject;

					toscaPanelList.value.forEach(element=>{
					if (
						element.type_name ==
						group.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = element;
					}
				})

				let obj = new ToscaObjectNode(panelObject,group.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),0);
				obj.setId(parseInt(group.getAttribute("id")));
				obj.setContainer_height(parseFloat(group.getElementsByClassName("subs_limits")[0].getAttribute("height"))
							- parseFloat(removedComponent.getElementsByClassName("main")[0].getAttribute("height"))
							- parseFloat(removedComponent.getElementsByClassName("middle")[0].getAttribute("height"))
							- parseFloat(removedComponent.getElementsByClassName("top_path")[0].getBoundingClientRect().height/zoom.value)
							- parseFloat(removedComponent.getElementsByClassName("bottom_path")[0].getBoundingClientRect().height/zoom.value
							))


					getContent(group,obj,toscaPanelList.value)
					obj.content.forEach(element => {
						if (element.drawingObject.id==currentObj.drawingObject.id){
							obj.content.splice(obj.content.indexOf(element))
						}
					});
					let parentId = group.parentNode.id;
					console.log(parentId);
					let xGroup = group.getAttribute("x");
					let yGroup = group.getAttribute("y");

					group.parentNode.removeChild(group);

					let cloneParent = obj.drawInWorkshop(document.getElementById(parentId),svgs.value,modelArea.value,zoom.value,clickArrow,click,drag.value)



					if (parentId != "svg0"){
						redrawStack(cloneParent.parentNode,removedComponent);
					}
					else{
						d3.select(cloneParent).attr("x",xGroup).attr("y",yGroup);
					}

				}

				redrawStack(parent,currentModel);
				console.log(parent.id)

        replaceComponents(document.getElementById(parent.id));
      }

      console.log(rootTreeObject.value.content);

    }

		function dragged(event) {

      //var currentGroup = this.parentNode;
      var coord = d3.pointer(event);


	  var rootx=document.getElementById("root").getBoundingClientRect().x;
	  var rooty = document.getElementById("root").getBoundingClientRect().y;


			d3.select(this.parentNode)
			.raise()
			.attr("x",coord[0]/zoom.value-rootx/zoom.value-parseFloat(this.getAttribute("x"))-parseFloat(this.getAttribute("width")/2) - translateX.value/zoom.value)
			.attr("y",coord[1]/zoom.value-rooty/zoom.value-parseFloat(this.getAttribute("y"))-parseFloat(this.getAttribute("height")/2) - translateY.value/zoom.value);

			links.value.forEach(element=>{

				if(element.sourceID==this.parentNode.id)
				{
					let currentLink = document.getElementById(element.id.toString());
					d3.select(currentLink)
					.attr("x1",(parseFloat(document.getElementById(element.sourceID).getAttribute("x")))+parseFloat(this.parentNode.getElementById(element.sourceArrow).getAttribute("x")))
					.attr("y1",(parseFloat(document.getElementById(element.sourceID).getAttribute("y")))+parseFloat(this.parentNode.getElementById(element.sourceArrow).getAttribute("y")))
				}
				else if(element.targetID==this.parentNode.id){
					let currentLink = document.getElementById(element.id.toString());
					d3.select(currentLink)
					.attr("x2",parseFloat(document.getElementById(element.targetID).getAttribute("x"))+parseFloat(this.parentNode.getElementById(element.targetArrow).getAttribute("x")))
					.attr("y2",parseFloat(document.getElementById(element.targetID).getAttribute("y"))+parseFloat(this.parentNode.getElementById(element.targetArrow).getAttribute("y")))

				}
			})
    }

		function dragended(event) {
      let currentGroup = this.parentNode;


      let panelObject;


			toscaPanelList.value.forEach(element=>{
					if (
						element.type_name ==
						currentGroup.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = element;
					}
				})

				let currentObj = new ToscaObjectNode(panelObject,currentGroup.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),0);
				currentObj.setId(parseInt(currentGroup.getAttribute("id")));
				currentObj.setContainer_height(currentGroup.getElementsByClassName("subs_limits")[0].getAttribute("height"));


      var coord = d3.pointer(event);
      var reDrawn = false;
      var component = currentGroup;
      var minWidth = 350;
      var minGroup;
      var groups = d3.selectAll(".model");
      groups.each(function () {
        //For each group on the window but the main container
        if (this.getAttribute("id") != "svg0") {
          var groupRect =
            this.getElementsByClassName("main")[0].getBoundingClientRect(); //Get the rect of the group
          if (
            //Test if the cursor is inside the group
            coord[0] > groupRect.x &&
            coord[0] < groupRect.x + groupRect.width &&
            coord[1] > groupRect.y &&
            coord[1] < groupRect.y + groupRect.height &&
            this != currentGroup
          ) {
            if (groupRect.width < minWidth) {
              minGroup = this;
            }
          }
        }
      });
      if (minGroup != null && minGroup != this) {
        console.log("in a new group" + minGroup.getAttribute("id"));

			function traverseData(node){
				if (node == null) return;

				else if(node.drawingObject.id == minGroup.getAttribute("id")){
					currentObj.setLevel(node.level+1);
					if (node.content.length!=0){
						node.content[node.content.length-1].rightSibling = currentObj;
					}
					node.content.push(currentObj)
					return;
				}
				traverseData(node.content[0]);
				traverseData(node.rightSibling);
			}
			traverseData(rootTreeObject.value.content[0])


			getContent(currentGroup,currentObj,toscaPanelList.value);



			component.parentNode.removeChild(component);
			let cloneComponent=currentObj.drawInWorkshop(document.getElementById(minGroup.getAttribute("id")),svgs.value,modelArea.value,zoom.value,clickArrow,click,drag.value)


		function redrawStack(group,addedComponent){
		let panelObject;

	toscaPanelList.value.forEach(element=>{
					if (
						element.type_name ==
						group.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = element;
					}
				})

				let obj = new ToscaObjectNode(panelObject,group.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),0);
				obj.setId(parseInt(group.getAttribute("id")));
				obj.setContainer_height(	parseFloat(group.getElementsByClassName("subs_limits")[0].getAttribute("height"))
				+ parseFloat(addedComponent.getElementsByClassName("main")[0].getAttribute("height"))
				+ parseFloat(addedComponent.getElementsByClassName("middle")[0].getAttribute("height"))
				+ parseFloat(addedComponent.getElementsByClassName("top_path")[0].getBoundingClientRect().height/zoom.value)
				+ parseFloat(addedComponent.getElementsByClassName("bottom_path")[0].getBoundingClientRect().height/zoom.value))


		getContent(group,obj,toscaPanelList.value)
		let parentId = group.parentNode.id;
		let xGroup = group.getAttribute("x");
		let yGroup = group.getAttribute("y");
		group.parentNode.removeChild(group);
		let cloneParent = obj.drawInWorkshop(document.getElementById(parentId),svgs.value,modelArea.value,zoom.value,clickArrow,click,drag.value)


	if (parentId != "svg0"){
		redrawStack(cloneParent.parentNode,addedComponent);
	}
	else{
		d3.select(cloneParent).attr("x",xGroup).attr("y",yGroup);
	}
}

redrawStack(minGroup,cloneComponent);


        replaceComponents(document.getElementById(currentObj.drawingObject.id));


        reDrawn = true;
      }
      if (!reDrawn) {
        console.log("on svg");
				currentObj.width=230;
				getContent(currentGroup,currentObj,toscaPanelList.value);
				component.parentNode.removeChild(component);
				let xComponent = component.getAttribute("x");
				let yComponent = component.getAttribute("y");
				let cloneComponent = currentObj.drawInWorkshop(document.getElementById("svg0"),svgs.value,modelArea.value,zoom.value,clickArrow,click,drag.value);

				d3.select(cloneComponent).attr("x",xComponent).attr("y",yComponent);

				if(rootTreeObject.value.content.length!=0)
				{
					rootTreeObject.value.content[rootTreeObject.value.content.length-1].rightSibling=currentObj;
				}
        rootTreeObject.value.content.push(currentObj);
      }
			d3.selectAll(".link").raise();

      console.log(rootTreeObject.value.content);

    }

	//End of interaction functions definition -------------------------------------------------

	//Loading svgs function definition
		const getSVGS = async () => {
			await store.dispatch("appSVGs/loadPath");
			(svgs.value = await store.getters["appSVGs/allSvgs"]);
			loading.value = await store.getters["appSVGs/loading"]

			return svgs.value;
		};
	//End of loading svgs definition


		onMounted(async () => {

			//Load the svgs
			await getSVGS();
		/*
		<<<<<<<< From iactormonaco
			var svg = d3.select("#myDataViz")
						.append("svg")
						.attr("id", "svg0")
						.attr("width", 2000)
						.attr("height", 2000)
						.attr('xmlns',"http://www.w3.org/2000/svg")
						.attr('xmlns:xlink', "http://www.w3.org/1999/xlink")
						.append("g");

		drawSVG(resources, [], svg, "svg0")

		svg.append('svg:defs')
			.append('svg:marker')
			.attr('id', 'arrow')
			.attr('viewBox', [0, 0, 12, 12])
			.attr('refX', 6)
			.attr('refY', 6)
			.attr('markerWidth', 12)
			.attr('markerHeight', 12)
			.attr('orient', 'auto-start-reverse')
			.append('svg:path')
			.attr('d', "M2,2 L10,6 L2,10 L6,6 L2,2")
			.attr('stroke', 'black');
		*/

			//const domParser = new DOMParser();

			//Create the root node SVG element on the center area


			var svg = d3
				.select("#myDataViz")
				.append("svg")
				.attr("id", "root")
				.attr("width", 2000)
				.attr("height", 2000)
				.call(
					d3
						.zoom()
						.scaleExtent([0.25, 2])
						.on("zoom", function (event) {
							zoom.value = event.transform.k;
							translateX.value = event.transform.x;
							translateY.value = event.transform.y;
							svg.attr("transform", event.transform);
						})
				)
				.append("g")
				.attr("id", "svg0");


			// Draw the palette in the left drawer -------------------------------------------------------

			d3.select("#drawerContent")
					.append("svg")
					.attr("id", "svg1")
					.attr("width", 250)
					.attr("height", 2000);

			// Create a list of tosca object while we don't have the compiler to provide it

			Object.values(panel.value).forEach((element) => {

					toscaPanelList.value.push(
					new ToscaTypeNode(element.logo,element.type_name,element.primary_color,element.secondary_color,element.svg,element.requirements,element.capabilities));
			});

			// Create and draw the Palette with the object list (Tosca or Tf)
			let palette = new Palette(toscaPanelList.value);

			palette.drawPalette(svgs.value,click_model);


			//----------------------------------------------------------------------------
		});

		return {
			svgs,
			loading,
			store,
			panel,
			modelArea,
			links,
			getSVGS,
			replaceComponents,
			getContent,
			monacoSourceData: store.getters["appMonaco/allMonacoSource"],
			lastArrow,
			clickArrow,
			zoom,
			translateX,
			translateY,
			click,
			//drawSvg,
			toscaPanelList,
			rootTreeObject
		};
	}
}
</script>
