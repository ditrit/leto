<template>
	<div id="myDataViz">

	</div>
</template>

<script>
import SVGinstanciate from "./svgvar.js";
import { onMounted, ref } from "vue";
const d3 = require("d3");
import Palette from './Palette'
import TerraformTypeNode from './TerraformTypeNode'
import TerraformObjectNode from './TerraformObjectNode'
import {getObjectInTree} from "./utils"
import { useStore } from "vuex";
import plugins from '../../assets/plugins/terraform/plugins'


export default {
	setup() {


		const zoom = ref(1);
		const translateX = ref(0);
		const translateY = ref(0);
		const store = useStore();
		const monacoSourceData = ref({});
		const svgs = ref({});
		const rootTreeObject = ref ({
			content: [],
			drawingObject:{},
			level:-1,
			rightSibling:null,
		})


		function displayConfig() {

				let detailsContainer = document.getElementById("detailsContainer");
				d3.selectAll(detailsContainer.childNodes).remove();

				let currentModel = this.parentNode.parentNode.parentNode;

				let currentObject = getObjectInTree(rootTreeObject.value,currentModel);
				let currentLevel = currentObject.level;

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
        	level: currentLevel,
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


		const terraformPanelList = ref([]);
		const loading = ref(true);
		let svg;

		function formatDatas(datas, level) {
			let result = [`Name : ${datas.name}`, `Type : ${datas.type}`, `Level : ${level}`];

			return result;
		}

		function drawSVGs(datas, svgParent, parentName, content, provider, level) {
			datas.forEach( SVGData => {
				let data = { logopath: `logos/${SVGData.icon}`,  width: SVGData.width, height: SVGData.height, name: SVGData.name, type: SVGData.type, id : SVGData.name + "_" + SVGData.type };
				const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
				d3.select(document.querySelector('body')).select("#"+parentName).node().append(svgDom.documentElement);
				const model = document.getElementById(`${SVGData.name}_${SVGData.type}`);
				d3.select(`#${SVGData.name}_${SVGData.type}`).on("click", function() {
					let detailsContainer = document.getElementById("detailsContainer");
					d3.select(detailsContainer).html(formatDatas(SVGData, model.getAttribute('level')).join('<br/>'));
				});
				if(content) {
					svgParent.querySelector("g").appendChild(model);
					model.setAttribute('x', SVGData.x)
					model.setAttribute('y', SVGData.y)
					model.setAttribute('level', level)
				} else {
					document.getElementById(parentName).querySelector("g").appendChild(model)
					model.setAttribute('x', SVGData.x)
					model.setAttribute('y', SVGData.y)
					model.setAttribute('level', level)
				}   
				if(SVGData.contains) {
					drawSVGs(SVGData.contains, model, `${SVGData.name}_${SVGData.type}`, true, provider, level + 1)  
				}  
			})
			drawLines(datas)
		}
		
		function drawLines(datas) {
			datas.forEach( blockEnd => {
				if(blockEnd.link) {
					blockEnd.link.forEach( blockBegin => {
						let xEnd, yEnd, xBegin, yBegin;
						const blockEndX = (blockEnd.parentX) ? blockEnd.parentX : blockEnd.x
						const blockEndY = (blockEnd.parentY) ? blockEnd.parentY : blockEnd.y
						const blockBeginX = (blockBegin.parentX) ? blockBegin.parentX : blockBegin.x
						const blockBeginY = (blockBegin.parentY) ? blockBegin.parentY : blockBegin.y
						let blockEndWidth = ((blockEnd.width > 0) ? blockEnd.width + 30 : 220) 
						let blockBeginWidth = ((blockBegin.width > 0) ? blockBegin.width + 30 : 220) 
						let blockEndHeight = ((blockEnd.height > 0) ? blockEnd.height + 30 : 44) 
						let blockBeginHeight = ((blockBegin.height > 0) ? blockBegin.height + 30 : 44) 
						let endX1 = blockEndX + blockEndWidth
						let endY1 = blockEndY + blockEndHeight
						let endX2 = blockBeginX + blockBeginWidth
						let endY2 = blockBeginY + blockBeginHeight
						if(blockBeginY == blockEndY && blockBeginHeight == blockEndHeight) {
							yEnd = blockEndY + blockEndHeight/2
							yBegin = blockBeginY + blockBeginHeight/2
							if(blockBeginX > blockEndX) {
								yEnd+= 10
								yBegin+= 10
								xEnd = endX1 + 10
								xBegin = blockBeginX + 4
							} else {
								yEnd-= 10
								yBegin-= 10
								xEnd = blockEndX
								xBegin = endX2 + 4
							}
						} else if(blockBeginX == blockEndX && blockBeginWidth == blockEndWidth){
							xEnd = blockEndX + blockEndWidth/2
							xBegin = blockBeginX + blockBeginWidth/2
							if(blockBeginY > blockEndY) {
								xEnd+= 10
								xBegin+= 10
								yEnd = endY1 + 10
								yBegin = blockBeginY + 4
							} else {
								xEnd-= 10
								xBegin-= 10
								yEnd = blockEndY
								yBegin = endY2 + 4
							}
						} else { 
							if(blockEndWidth > blockBeginX && blockEndWidth > endX2) {
								xEnd = blockEndX + blockEndWidth/2 - 5
								xBegin = blockBeginX + blockBeginWidth/2 + 10
								yEnd = endY1 - 10
								yBegin = blockBeginY + 4
							} else if(endX2 > endX1 && endY2 > endY1) {
								xEnd = blockEndX + blockEndWidth/2 - 10
								xBegin = blockBeginX + blockBeginWidth/2 + 10
								yEnd = endY1 + 8
								yBegin = blockBeginY + 4
							} else if(endX2 > endX1 && endY2 < endY1) {
								xEnd = endX1 + 8
								xBegin = blockBeginX + blockBeginWidth/2 - 10
								yEnd = blockEndY + blockEndHeight/2 - 10
								yBegin = endY2 + 4
							} else if(endX2 < endX1 && endY2 < endY1) {
								xEnd = blockEndX + blockEndWidth/2 - 10
								xBegin = endX2 + 4
								yEnd = blockEndY
								yBegin = blockBeginY + blockBeginHeight/2 - 10
							} else {
								xEnd = blockEndX + blockEndWidth/2 - 10
								xBegin = blockBeginX + blockBeginWidth/2 + 10
								yEnd = endY1 + 8
								yBegin = blockBeginY + 4
							}
						}
						d3.select('#svg0').append("line")
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
		}
		const getDatas = async () => {
			monacoSourceData.value = await store.getters["appMonaco/allMonacoSource"];
			return monacoSourceData.value;
		}

		const getSVGS = async () => {
			await store.dispatch("appSVGs/loadPath");
			svgs.value = await store.getters["appSVGs/allSvgs"];
			loading.value = await store.getters["appSVGs/loading"]

			return svgs.value;
		};


		onMounted(async () => {

			await getDatas();
			await getSVGS();
			
			const provider = monacoSourceData.value["provider"][0].name;
			const plugin = plugins[provider];

			d3.select("#myDataViz")
				.append("svg")
				.attr("id", "root")
				.attr("width", 2000)
				.attr("height", 2000)
				.call(
					d3.zoom()
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

			let svg = d3.select('#root')

			drawSVGs(monacoSourceData.value["resources"], svg, "root", false, plugin, 0);
			drawLines(monacoSourceData.value["resources"]);

			d3.select('#svg0')
				.append('svg:defs')
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

			d3.select("#drawerContent")
				.append("svg")
				.attr("id", "svg1")
				.attr("width", 250)
				.attr("height", 2000);
			
			const metadatas = require(`../../assets/plugins/terraform/${plugin}/metadatas.json`);
			metadatas.provider.resources.forEach((element) => {
				terraformPanelList.value.push(
					new TerraformTypeNode(`logos/${element.icon}`,element.resourceType, "","","dbtf"));
			});
			
			let palette = new Palette(terraformPanelList.value);
			palette.drawPalette(svgs.value);
		});

		return {
			svgs,
			loading,
			store,
			getSVGS,
			monacoSourceData: store.getters["appMonaco/allMonacoSource"],
			zoom,
			translateX,
			translateY,
			displayConfig,
			rootTreeObject
		};
	}
}
</script>
<style></style>