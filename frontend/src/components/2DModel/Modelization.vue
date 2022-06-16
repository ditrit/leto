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
import {drawLink,updateLinks} from "./utils"
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
		const terraformPanelList = ref([]);
		const loading = ref(true);
		const links = ref({});
		const rootTreeObject = ref (new LetoObjectNode(new LetoTypeNode("","","","",""),"",-1))
		rootTreeObject.value.setId("0");
		const drag = ref(d3.drag()
							.on("start", dragstarted)
							.on("drag", dragged)
							.on("end", dragended));

		function dragstarted() {
			let currentModel = this.parentNode;
			const datas = monacoSourceData.value["resources"];
			let svg = d3.select('#root');

			if (currentModel.parentNode.getAttribute("id") != "svg0") {
				let ids = getIndex(currentModel, datas, []).reverse();
				store.commit('appMonaco/REMOVE_CONTENT', ids);
				getDatas();
				ids = getIndex(currentModel, datas, []).reverse();
				store.commit('appMonaco/SET_CONTAINER_DRAWING', {ids : ids, remove : true});
				getDatas();
				ids = getIndex(currentModel, datas, []).reverse();
				d3.select('#'+ids[0]).remove()
				document.getElementById("svg0").appendChild(currentModel);
				const resource = getResource(monacoSourceData.value["resources"], ids)
				createTerraformObject(resource, svg, "root", false, 0);
			}
		}

		function getResource(datas, ids, returnResource) {
			datas.forEach(resource => {
				if(resource.name + '_' + resource.type === ids[0]) {
					returnResource = resource;
				} else if(resource.contains) {
					const result = getResource(resource.contains, ids, returnResource);
					returnResource = (result !== null && returnResource === null) ? resource : result;
				}
			});
			return returnResource;
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
			const id = currentGroup.getAttribute('id');
			const x = currentGroup.getAttribute('x');
			const y = currentGroup.getAttribute('y');
			store.commit('appMonaco/SET_COORD', {id : id, x : x, y : y});
			const groups = d3.select('#root').selectAll('svg');
      		let minGroup;
			let svg = d3.select('#root')

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
				d3.select('#'+resource.id).remove();
				if(resource !== null) createTerraformObject(resource, svg, "root", false, 0);
			}

			return;
			updateDrawingInfosInData(rootTreeObject.value,this.parentNode);
		}

		function clickOnPalette() {
			let clickedOnPalette = this;
			let panelObject;
			let svg = d3.select('#root')

			d3.select(this).transition().attr("fill", "black");
			terraformPanelList.value.forEach(element=>{
				if (
					element.type_name ==
					clickedOnPalette.getElementById("type").textContent.replace(/\s+/g, '')
				) {
					panelObject = element;
				}
			})
			let terraformObject = new TerraformObjectNode(panelObject,"myTerraformObjectNode",0,Date.now());

			let drawnModel = terraformObject.drawSVG(svgs, svg, "root", false, 0, drag);
			d3.select(drawnModel).attr("x",-translateX.value/zoom.value).attr("y",-translateY.value/zoom.value);

			if (rootTreeObject.value.contains.length!=0){
				rootTreeObject.value.contains[rootTreeObject.value.contains.length-1].setRightSibling(terraformObject);
			}
			rootTreeObject.value.contains.push(terraformObject);
			console.log(rootTreeObject.value)
		}

		function getIndex(currentModel, container, ids) {
			if(currentModel.getAttribute('id') !== 'root') {
				ids.push(currentModel.getAttribute('id'));
				getIndex(currentModel.parentNode.parentNode, container, ids);
			}
			return ids;
		}

		function drawSVGs(datas, svgParent, parentName, content, level) {
			datas.forEach( SVGData => {
				links.value[SVGData.id]= {
					outputs:[],
					inputs:[]
					}
				const terraformType = new TerraformTypeNode(`logos/${SVGData.icon}`,SVGData.type, "","","dbtf");
				const terraformObject = new TerraformObjectNode(terraformType, SVGData.name, level, SVGData.id);
				terraformObject.setHeight(SVGData.height);
				terraformObject.setWidth(SVGData.width);
				terraformObject.setX(SVGData.x);
				terraformObject.setY(SVGData.y);
				terraformObject.drawSVG(svgs, svgParent, parentName, content, level, drag);
				const model = document.getElementById(`${SVGData.id}`);
				addContentInData(rootTreeObject.value,model,terraformObject);
				if(SVGData.contains) {
          drawSVGs(SVGData.contains, model, `${SVGData.id}`, true, level + 1)
				}
				createTerraformObject(SVGData, svgParent, parentName, content, level);
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

			if(SVGData.contains) {
                const model = document.getElementById(`${SVGData.id}`);
                drawSVGs(SVGData.contains, model, `${SVGData.id}`, true, level + 1)
			}
		}

		function drawLines(datas) {
			datas.forEach( blockEnd => {
				if(blockEnd.link) {
					blockEnd.link.forEach( blockBegin => {
						let endId = blockEnd.id;
						let beginId = blockBegin.id;
						let anchors = TerraformObjectNode.getLinkAnchors(beginId,endId);
						let beginAnchor = anchors[0];
						let endAnchor = anchors[1];
						let linkId = drawLink(beginAnchor,endAnchor,"svg0",links.value,beginId+"_to_"+endId);
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

			const metadatas = require(`../../assets/plugins/terraform/${plugin}/metadatas.json`);
			metadatas.provider.resources.forEach((element) => {
				terraformPanelList.value.push(
					new TerraformTypeNode(`logos/${element.icon}`,element.resourceType, "","","dbtf"));
			});

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
			links,
			rootTreeObject
		};
	}
}
</script>
<style></style>
