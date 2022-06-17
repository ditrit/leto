<template>
	<div id="myDataViz">

	</div>
</template>

<script>
import { onMounted, ref } from "vue";
const d3 = require("d3");
import Palette from './Palette'
import TerraformTypeNode from './TerraformTypeNode'
import TerraformObjectNode from './TerraformObjectNode'
import {drawLink,updateLinks,updateDrawingInfosInData,addContentInData, storeOutputLinkInData, storeInputLinkInData,removeContentInData, getLetoTypeNodeFromData, getParent} from "./utils"
import { useStore } from "vuex";
import plugins from '../../assets/plugins/terraform/plugins'
import LetoTypeNode from './LetoTypeNode';
import LetoObjectNode from './LetoObjectNode';
import { calcul_dimensions, calcul_xy_container} from '../Monaco/svg_maths'

export default {
	setup() {
		const zoom = ref(1);
		const translateX = ref(0);
		const translateY = ref(0);
		const store = useStore();
		const monacoSourceData = ref({});
		const svgs = ref({});
		const terraformPanelList = ref([]);
		const loading = ref(true);
		const rootTreeObject = ref (new LetoObjectNode(new LetoTypeNode("","","","",""),"",-1))
		rootTreeObject.value.setId("svg0");
		const drag = ref(d3.drag()
							.on("start", dragstarted)
							.on("drag", dragged)
							.on("end", dragended));

		function dragstarted() {
			let currentModel = this.parentNode;
			let svg = d3.select('#root');
			let currentTfTypeNode = getLetoTypeNodeFromData(terraformPanelList.value,currentModel.getElementById("type").textContent.replace(/\s+/g, ''));
			let currentTfObjectNode = new TerraformObjectNode(currentTfTypeNode,currentModel.getElementById("name").textContent.replace(/\s+/g, ''),0,currentModel.id,currentModel.parentNode.parentNode.id);

			if (currentModel.parentNode.getAttribute("id") != "svg0") {
				let parent = getParent(rootTreeObject.value,currentModel.parentNode.parentNode.id);
				removeContentInData(rootTreeObject.value,currentModel.parentNode.parentNode.id,currentTfObjectNode);
				addContentInData(rootTreeObject.value,"svg0",currentTfObjectNode);
				const dimensions = calcul_dimensions(parent.drawingObject, 0, 1000,  true, parent.contains);
				calcul_xy_container(parent.drawingObject, parent.drawingObject.x, parent.drawingObject.y, 1000, parent.contains);
				parent.drawingObject.height = dimensions.height + 20;
				parent.drawingObject.width = dimensions.width;
				d3.select('#'+parent.id).remove()
				document.getElementById("svg0").appendChild(currentModel);
				let terraformType = getLetoTypeNodeFromData(terraformPanelList.value,parent.type_name)
				const terraformObject = new TerraformObjectNode(terraformType, parent.instance_name, 0, parent.id, 'svg0');
				createTerraformObject(terraformObject,parent, svg, "root", false, 0);

				let children = currentModel.parentNode.getElementsByTagName("svg")
				for(let child in children){
					updateLinks(rootTreeObject.value,children[child]);
				}
			}
		}

		function dragged(event) {
			let coord = d3.pointer(event);
			let rootx = document.getElementById("root").getBoundingClientRect().x;
			let rooty = document.getElementById("root").getBoundingClientRect().y;

			d3.select(this.parentNode)
				.raise()
				.attr("x",coord[0]/zoom.value-rootx/zoom.value-parseFloat(this.getAttribute("x"))-parseFloat(this.getAttribute("width")/2) - translateX.value/zoom.value)
				.attr("y",coord[1]/zoom.value-rooty/zoom.value-parseFloat(this.getAttribute("y"))-parseFloat(this.getAttribute("height")/2) - translateY.value/zoom.value);

			updateLinks(rootTreeObject.value,this.parentNode);
		}

		function dragended() {
    		const currentGroup = this.parentNode;
			const x = currentGroup.getAttribute('x');
			const y = currentGroup.getAttribute('y');
			const groups = d3.select('#root').selectAll('svg');
      		let minGroup;
			let svg = d3.select('#root')
			let currentTfTypeNode = getLetoTypeNodeFromData(terraformPanelList.value,currentGroup.getElementById("type").textContent.replace(/\s+/g, ''));
			let currentTfObjectNode = new TerraformObjectNode(currentTfTypeNode,currentGroup.getElementById("name").textContent.replace(/\s+/g, ''),0,currentGroup.id,currentGroup.parentNode.parentNode.id);

			groups.each(function () {
				if (this.getAttribute("id") != "svg0") {
					const groupRect = this.getElementById("content");
					const groupRectX = parseInt(this.getAttribute('x'));
					const groupRectY = parseInt(this.getAttribute('y'));
					const groupRectWidth = parseInt(groupRect.getAttribute('width'));
					const groupRectHeight = parseInt(groupRect.getAttribute('height'));
					if (
						x > groupRectX &&
						x < groupRectX + groupRectWidth &&
						y > groupRectY &&
						y < groupRectY + groupRectHeight &&
						this != currentGroup
					) {
						minGroup = this;
					}
				}
			});

			if (minGroup != null && minGroup != this) {
				const resource = getResource(monacoSourceData.value["resources"], [minGroup.getAttribute('id')], null);
				store.commit('appMonaco/ADD_CONTENT', {idContainer : minGroup.getAttribute('id'), idResource : currentGroup.getAttribute('id')});
				store.commit('appMonaco/SET_CONTAINER_DRAWING', {ids : [resource.id], remove : false});
				getDatas();
				d3.select('#'+currentGroup.getAttribute('id')).remove();
				d3.select('#'+parent.id).remove();
				let terraformType = getLetoTypeNodeFromData(terraformPanelList.value,parent.type_name)
				const terraformObject = new TerraformObjectNode(terraformType, parent.instance_name, 0, parent.id, 'svg0');
				createTerraformObject(terraformObject,parent, svg, "root", false, 0);

				let children = minGroup.getElementsByTagName("svg")
				for(let child in children) {
					updateLinks(rootTreeObject.value,children[child]);
				}
			}
			updateLinks(rootTreeObject.value,this.parentNode)
			updateDrawingInfosInData(rootTreeObject.value,this.parentNode);
			return;
		}

		function clickOnPalette() {
			let clickedOnPalette = this;
			let panelObject = getLetoTypeNodeFromData(terraformPanelList.value,clickedOnPalette.getElementById("type").textContent.replace(/\s+/g, ''));
			let svg = d3.select('#root')

			d3.select(this).transition().attr("fill", "black");
			let terraformObject = new TerraformObjectNode(panelObject,"myTerraformObjectNode",0,panelObject.type_name, 'svg0');
			let monacoObj = {
				containers : [],
				contains : [],
				datasName : [],
				datasObject : [],
				fileName : monacoSourceData.value["resources"][0].fileName,
				height: 0,
				width: 0,
				icon: terraformObject.logo_path.replace("logos/",""),
				type: terraformObject.type_name,
				name: terraformObject.instance_name,
				id:  terraformObject.instance_name+"_"+ terraformObject.type_name,
				link: [],
				parentX: 0,
				parentY: 0,
				representation: "block",
				x: -translateX.value/zoom.value,
				y: -translateY.value/zoom.value
			}
			terraformObject.id = terraformObject.instance_name+"_"+ terraformObject.type_name;
			store.commit('appMonaco/ADD_CONTENT_IN_ROOT',monacoObj)

			let drawnModel = terraformObject.drawSVG(svgs, svg, "root", false, 0, drag);
			d3.select(drawnModel).attr("x",-translateX.value/zoom.value).attr("y",-translateY.value/zoom.value);

			if (rootTreeObject.value.contains.length!=0){
				rootTreeObject.value.contains[rootTreeObject.value.contains.length-1].setRightSibling(terraformObject);
			}
			rootTreeObject.value.contains.push(terraformObject);
		}

		function fillDataStorage(datas,parentId,level){
			datas.forEach(SVGData => {

				const data = (SVGData.value) ? SVGData.value : SVGData;
				let terraformType = getLetoTypeNodeFromData(terraformPanelList.value,data.type);
				const terraformObject = new TerraformObjectNode(terraformType, data.name, level, data.id,parentId);
				addContentInData(rootTreeObject.value,parentId,terraformObject);
				if(data.contains) {
          			fillDataStorage(data.contains,data.id, level + 1)
				}
			})
		}

		function drawSVGs(datas, svgParent, parentName, content, level) {
			datas.forEach( SVGData => {
				let terraformType, terraformObject, data;
				if(!SVGData.drawingObject){
					data = (SVGData.value) ? SVGData.value : SVGData;
					terraformType = getLetoTypeNodeFromData(terraformPanelList.value,data.type);
					terraformObject = new TerraformObjectNode(terraformType, data.name, level, data.id, parentName);
				} else {
					data = SVGData;
					terraformObject = SVGData;
				}
				createTerraformObject(terraformObject,data, svgParent, parentName, content, level);
			})
		}

		function createTerraformObject(SVGData, svgParent, parentName, content, level) {
			const terraformType = new TerraformTypeNode(`logos/${SVGData.icon}`,SVGData.type, "","","dbtf");
			const terraformObject = new TerraformObjectNode(terraformType, SVGData.name, level, SVGData.id);
			terraformObject.setHeight(SVGData.height);
			terraformObject.setWidth(SVGData.width);
			terraformObject.setX(SVGData.x);
			terraformObject.setY(SVGData.y);
			terraformObject.drawSVG(svgs, svgParent, parentName, content, level, drag);
			const model = document.getElementById(`${object.id}`);
			if(SVGData.contains) {
          		drawSVGs(SVGData.contains, model, `${object.id}`, true, level + 1)
			}
		}

		function drawLines(datas) {
			datas.forEach( blockEnd => {
				const objectLinks = (blockEnd.value) ? blockEnd.value.link : blockEnd.link;
				if(objectLinks) {
					objectLinks.forEach( blockBegin => {
						let endId = (blockEnd.value) ? blockEnd.value.id : blockEnd.id;
						let beginId = (blockBegin.value) ? blockBegin.value.id : blockBegin.id;
						let anchors = TerraformObjectNode.getLinkAnchors(beginId,endId);
						let beginAnchor = anchors[0];
						let endAnchor = anchors[1];
						let linkId = drawLink(beginAnchor,endAnchor,"svg0",beginId+"_to_"+endId);
						let link = {
							targetId : endId,
							sourceId : beginId,
							id : linkId,
						}
						storeOutputLinkInData(rootTreeObject.value,beginId,link);
						storeInputLinkInData(rootTreeObject.value,endId,link)
					})
				}
				if (blockEnd.contains){
					drawLines(blockEnd.contains);
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

			const metadatas = require(`../../assets/plugins/terraform/${plugin}/metadatas.json`);
			metadatas.provider.resources.forEach((element) => {
				terraformPanelList.value.push(
					new TerraformTypeNode(`logos/${element.icon}`,element.resourceType, "","","dbtf",element.attributes));
			});

			let svg0 = d3.select("#myDataViz")
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
							svg0.attr("transform", event.transform);
						})
				)
				.append("g")
				.attr("id", "svg0");

			let svg = d3.select('#root')

			drawSVGs(monacoSourceData.value["resources"], svg, "root", false, 0);
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

			let palette = new Palette(terraformPanelList.value);
			palette.drawPalette(svgs.value, clickOnPalette);
		});

		return {
			svgs,
			loading,
			store,
			getSVGS,
			clickOnPalette,
			monacoSourceData: store.getters["appMonaco/allMonacoSource"],
			zoom,
			translateX,
			translateY,
			rootTreeObject
		};
	}
}
</script>
<style></style>
