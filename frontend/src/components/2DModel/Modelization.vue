<template>
	<div id="myDataViz">
		<div
			id="contextMenu"
			class="context-menu"
			style="display: none; max-width: 150px; background-color: white"
		>
			<ul
				id="contextMenuList"
				dense
				bordered
				padding
				class="rounded-borders"
			></ul>
		</div>
	</div>
</template>

<script>
import { onMounted, ref } from "vue";
const d3 = require("d3");
import TerraformTypeNode from "src/components/2DModel/TerraformTypeNode";
import TerraformObjectNode from "src/components/2DModel/TerraformObjectNode";
import {
	drawLink,
	updateLinks,
	updateDrawingInfosInData,
	addContentInData,
	storeOutputLinkInData,
	storeInputLinkInData,
	removeContentInData,
	getLetoTypeNodeFromData,
	getParent,
	getAnchorAbsPos,
	fillAbleToLinkList,
	fillAbleToDropList,
	getNode,
} from "./utils";
import { useStore } from "vuex";
import plugins from "src/assets/plugins/terraform/plugins";
import LetoTypeNode from "src/components/2DModel/LetoTypeNode";
import LetoObjectNode from "src/components/2DModel/LetoObjectNode";
import {
	calcul_dimensions,
	calcul_xy_container,
} from "src/components/Monaco/svg_maths";
import EventBus from "src/services/EventBus";

/**
 * Makes an hexadecimal string of the specified length
 * @param {number} length
 */
function randomHexString(length) {
	const buffer = new Uint32Array(length);
	window.crypto.getRandomValues(buffer);
	return Array.from(buffer, i => (i % 16).toString(16)).join("");
}

export default {
	emits: ["getTreeObjects"],
	setup(_props, { emit }) {
		const zoom = ref(1);
		const translateX = ref(0);
		const translateY = ref(0);
		const store = useStore();
		const monacoSourceData = ref({});
		const svgs = ref({});
		const terraformPanelList = ref([]);
		const loading = ref(true);
		const rootTreeObject = ref(
			new LetoObjectNode(new LetoTypeNode("", "", "", "", ""), "", -1)
		);
		rootTreeObject.value.setId("svg0");
		EventBus.on("selected:component", (component) => {
			clickOnPalette(component);
		});
		const drag = ref(
			d3
				.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended)
		);
		const dragLink = ref(
			d3
				.drag()
				.on("start", dragLinkStarted)
				.on("drag", draggedLink)
				.on("end", dragLinkEnded)
		);
		const drawingLink = ref({
			source: null,
			resourceType: null,
			id: null,
			target: null,
			variableName: null,
			multiple: null,
			representation: null,
			required: null,
		});

		function dragstarted() {
			let currentModel = this.parentNode;
			let svg = d3.select("#root");
			let currentTfTypeNode = getLetoTypeNodeFromData(
				terraformPanelList.value,
				currentModel.getElementById("type").textContent.replace(/\s+/g, "")
			);
			let currentTfObjectNode = new TerraformObjectNode(
				currentTfTypeNode,
				currentModel.getElementById("name").textContent.replace(/\s+/g, ""),
				0,
				currentModel.id,
				currentModel.parentNode.parentNode.id
			);
			currentTfObjectNode.setHeight(currentModel.getAttribute("height"));
			currentTfObjectNode.setWidth(currentModel.getAttribute("width"));
			let ableToDropList = [];
			if (currentTfObjectNode.attributes) {
				currentTfObjectNode.attributes.forEach((attribute) => {
					if (
						attribute.representation == "contained" ||
						attribute.representation == "containedInOtherContainer"
					) {
						fillAbleToDropList(rootTreeObject.value, attribute, ableToDropList);
					}
				});
			}
			if (currentModel.parentNode.getAttribute("id") != "svg0") {
				let parent = getParent(rootTreeObject.value, currentModel.id);
				let node = getNode(rootTreeObject.value, currentModel.id);
				currentTfObjectNode.setObjects(node.objects);
				removeContentInData(
					rootTreeObject.value,
					currentModel.parentNode.parentNode.id,
					currentTfObjectNode
				);
				addContentInData(rootTreeObject.value, "svg0", currentTfObjectNode);
				const dimensions = calcul_dimensions(
					parent.drawingObject,
					0,
					1000,
					true,
					parent.contains
				);
				calcul_xy_container(
					parent.drawingObject,
					parent.drawingObject.x,
					parent.drawingObject.y,
					1000,
					parent.contains
				);
				parent.drawingObject.height = dimensions.height + 20;
				parent.drawingObject.width = dimensions.width;
				d3.select("#" + parent.id).remove();
				document.getElementById("svg0").appendChild(currentModel);
				let terraformType = getLetoTypeNodeFromData(
					terraformPanelList.value,
					parent.type_name
				);
				const terraformObject = new TerraformObjectNode(
					terraformType,
					parent.instance_name,
					0,
					parent.id,
					"svg0",
					parent.objects
				);
				createTerraformObject(terraformObject, parent, svg, "root", false, 0);

				let children = currentModel.parentNode.getElementsByTagName("svg");
				for (let child in children) {
					updateLinks(rootTreeObject.value, children[child]);
				}
			}
			const groups = d3.select("#root").selectAll("svg");
			groups.each(function () {
				if (ableToDropList.includes(this.id)) {
					d3.select("#" + this.id)
						.select("#logo_frame")
						.attr("fill", "green");
				}
			});
		}

		function dragged(event) {
			let coord = d3.pointer(event);
			let rootx = document.getElementById("root").getBoundingClientRect().x;
			let rooty = document.getElementById("root").getBoundingClientRect().y;

			d3.select(this.parentNode)
				.raise()
				.attr(
					"x",
					coord[0] / zoom.value -
						rootx / zoom.value -
						parseFloat(this.getAttribute("x")) -
						parseFloat(this.getAttribute("width") / 2) -
						translateX.value / zoom.value
				)
				.attr(
					"y",
					coord[1] / zoom.value -
						rooty / zoom.value -
						parseFloat(this.getAttribute("y")) -
						parseFloat(this.getAttribute("height") / 2) -
						translateY.value / zoom.value
				);

			updateLinks(rootTreeObject.value, this.parentNode);
		}

		function dragended() {
			const currentGroup = this.parentNode;
			const x = currentGroup.getAttribute("x");
			const y = currentGroup.getAttribute("y");
			const groups = d3.select("#root").selectAll("svg");
			let minGroup;
			let svg = d3.select("#root");
			let currentTfTypeNode = getLetoTypeNodeFromData(
				terraformPanelList.value,
				currentGroup.getElementById("type").textContent.replace(/\s+/g, "")
			);
			let currentTfObjectNode = new TerraformObjectNode(
				currentTfTypeNode,
				currentGroup.getElementById("name").textContent.replace(/\s+/g, ""),
				0,
				currentGroup.id,
				currentGroup.parentNode.parentNode.id
			);

			groups.each(function () {
				if (this.getAttribute("id") != "svg0") {
					const groupRect = this.getElementById("content");
					const groupRectX = parseInt(this.getAttribute("x"));
					const groupRectY = parseInt(this.getAttribute("y"));
					const groupRectWidth = parseInt(groupRect.getAttribute("width"));
					const groupRectHeight = parseInt(groupRect.getAttribute("height"));
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

			if (minGroup != null) {
				if(minGroup.getElementById("logo_frame").getAttribute("fill")=="green"){
					let parent = getParent(
						rootTreeObject.value,
						minGroup.getAttribute('id')
						);
					let node = getNode(
						rootTreeObject.value,
						currentGroup.id
						);
					if(node){
						currentTfObjectNode.setObjects(node.objects);
					}
					removeContentInData(
						rootTreeObject.value,
						"svg0",
						currentTfObjectNode
						);
					addContentInData(
						rootTreeObject.value,
						minGroup.id,
						currentTfObjectNode
						);
					const dimensions = calcul_dimensions(
						parent.drawingObject,
						 0,
						 1000,
						 false,
						 parent.contains
						 );
					calcul_xy_container(
						parent.drawingObject,
						parent.drawingObject.x,
						parent.drawingObject.y,
						1000, parent.contains
						);
					parent.drawingObject.height = dimensions.height + 20;
					parent.drawingObject.width = dimensions.width;

					d3.select('#'+currentGroup.getAttribute('id')).remove();
					d3.select('#'+parent.id).remove();
					let terraformType = getLetoTypeNodeFromData(
						terraformPanelList.value,
						parent.type_name
						);
					const terraformObject = new TerraformObjectNode(
						terraformType,
						parent.instance_name,
						0,
						parent.id,
						'svg0',
						parent.objects
						);
					createTerraformObject(terraformObject,parent, svg, "root", false, 0);

					let children = minGroup.getElementsByTagName("svg")
					for(let child in children) {
						updateLinks(rootTreeObject.value,children[child]);
					}
				}
			}
			updateLinks(rootTreeObject.value,this.parentNode)
			updateDrawingInfosInData(rootTreeObject.value,this.parentNode);
			d3.selectAll(groups).select('#logo_frame').attr("fill","white");
			return;
		}

		function dragLinkStarted(event) {
			let coord = d3.pointer(event);
			let rootx = document.getElementById("root").getBoundingClientRect().x;
			let rooty = document.getElementById("root").getBoundingClientRect().y;
			let currentModel = this.parentNode.parentNode;
			if (d3.select(this).attr("fill") == "green") {
				let ableToLinkList = [];
				fillAbleToLinkList(
					rootTreeObject.value,
					drawingLink.value,
					ableToLinkList
				);

				drawingLink.value.source = currentModel;
				let id = Date.now();
				drawingLink.value.id = id;
				let beginAnchor = document.getElementById(
					currentModel.id + "output_anchor_right"
				);
				let beginAnchorPos = getAnchorAbsPos(beginAnchor);
				d3.select("#svg0")
					.append("line")
					.attr("id", id)
					.attr("class", "link")
					.attr("x1", beginAnchorPos[0])
					.attr("y1", beginAnchorPos[1])
					.attr(
						"x2",
						coord[0] / zoom.value -
							rootx / zoom.value -
							translateX.value / zoom.value
					)
					.attr(
						"y2",
						coord[1] / zoom.value -
							rooty / zoom.value -
							translateY.value / zoom.value
					)
					.attr("cursor", "pointer")
					.attr("stroke", "black")
					.attr("stroke-width", 1)
					.attr("marker-end", "url(#arrow)")
					.on("click", function () {
						this.remove();
					});
				const groups = d3.select("#root").selectAll("svg");
				groups.each(function () {
					let sameLink = document.getElementById(
						currentModel.id + "_to_" + this.id
					);
					if (
						sameLink == null &&
						this != currentModel &&
						ableToLinkList.includes(this.id)
					) {
						d3.select(this).select("#logo_frame").attr("fill", "green");
					} else {
						d3.select(this).select("#logo_frame").attr("fill", "grey");
					}
				});
			}
		}

		function draggedLink(event) {
			let coord = d3.pointer(event);
			let rootx = document.getElementById("root").getBoundingClientRect().x;
			let rooty = document.getElementById("root").getBoundingClientRect().y;
			if (drawingLink.value.id) {
				let link = document.getElementById(drawingLink.value.id);
				d3.select(link)
					.raise()
					.attr(
						"x2",
						coord[0] / zoom.value -
							rootx / zoom.value -
							translateX.value / zoom.value
					)
					.attr(
						"y2",
						coord[1] / zoom.value -
							rooty / zoom.value -
							translateY.value / zoom.value
					);
			}
		}

		function dragLinkEnded() {
			let currentModel = this.parentNode.parentNode;
			let rootx = document.getElementById("root").getBoundingClientRect().x;
			let rooty = document.getElementById("root").getBoundingClientRect().y;
			const groups = d3.select("#root").selectAll("svg");
			let minGroup;

			if (drawingLink.value.id) {
				let link = document.getElementById(drawingLink.value.id);
				groups.each(function () {
					if (this.getAttribute("id") != "svg0") {
						const groupRect = this.getElementById("logo_frame");
						const groupRectX = parseInt(
							this.getBoundingClientRect().x / zoom.value -
								rootx / zoom.value -
								translateX.value / zoom.value
						);
						const groupRectY = parseInt(
							this.getBoundingClientRect().y / zoom.value -
								rooty / zoom.value -
								translateY.value / zoom.value
						);
						const groupRectWidth = parseInt(groupRect.getAttribute("width"));
						const groupRectHeight = parseInt(groupRect.getAttribute("height"));
						if (
							link.getAttribute("x2") > groupRectX &&
							link.getAttribute("x2") < groupRectX + groupRectWidth &&
							link.getAttribute("y2") > groupRectY &&
							link.getAttribute("y2") < groupRectY + groupRectHeight &&
							this != currentModel
						) {
							minGroup = this;
						}
					}
				});
				if (
					minGroup != null &&
					minGroup.getElementById("logo_frame").getAttribute("fill") == "green"
				) {
					let beginId = currentModel.id;
					let beginName = currentModel
						.getElementById("name")
						.textContent.replace(/\s+/g, "");
					let beginType = currentModel
						.getElementById("type")
						.textContent.replace(/\s+/g, "");
					let endId = minGroup.id;
					let endName = minGroup
						.getElementById("name")
						.textContent.replace(/\s+/g, "");
					let endType = minGroup
						.getElementById("type")
						.textContent.replace(/\s+/g, "");
					let anchors = TerraformObjectNode.getLinkAnchors(beginId, endId);
					let beginAnchor = anchors[0];
					let endAnchor = anchors[1];
					let linkId = drawLink(
						beginAnchor,
						endAnchor,
						"svg0",
						beginId + "_to_" + endId,
						rootTreeObject.value
					);
					let linkObj = {
						targetId: endId,
						targetName: endName,
						targetType: endType,
						sourceId: beginId,
						sourceName: beginName,
						sourceType: beginType,
						required: drawingLink.value.required,
						representation: drawingLink.value.representation,
						id: linkId,
						multiple: drawingLink.value.multiple,
						resourceType: drawingLink.value.resourceType,
						variableName: drawingLink.value.variableName,
					};
					storeOutputLinkInData(rootTreeObject.value, beginId, linkObj);
					storeInputLinkInData(rootTreeObject.value, endId, linkObj);
				}
				d3.selectAll(groups).select("#logo_frame").attr("fill", "white");
				d3.select(link).remove();
				drawingLink.value.id = null;
				drawingLink.value.source = null;
				drawingLink.value.target = null;
				drawingLink.value.resourceType = null;
				drawingLink.value.variableName = null;
				drawingLink.value.multiple = null;
				drawingLink.value.required = null;
				drawingLink.value.representation = null;
			}
		}

		function clickOnPalette(clickedType) {
			let clickedOnPalette = this;
			let panelObject = getLetoTypeNodeFromData(
				terraformPanelList.value,
				clickedType
			);
			let svg = d3.select("#root");
			if (panelObject) {
				d3.select(this).transition().attr("fill", "black");
				let terraformObject = new TerraformObjectNode(
					panelObject,
					`${panelObject.type_name}_${randomHexString(4)}`,
					0,
					panelObject.type_name,
					"svg0",
					{ value: [`name ="${panelObject.type_name}"`] }
				);
				terraformObject.setId(
					terraformObject.instance_name + "_" + terraformObject.type_name
				);

				let drawnModel = terraformObject.drawSVG(
					svgs,
					svg,
					"root",
					false,
					0,
					[drag, dragLink],
					[rootTreeObject.value, drawingLink.value]
				);
				d3.select(drawnModel)
					.attr("x", -translateX.value / zoom.value)
					.attr("y", -translateY.value / zoom.value);

				if (rootTreeObject.value.contains.length != 0) {
					rootTreeObject.value.contains[
						rootTreeObject.value.contains.length - 1
					].setRightSibling(terraformObject);
				}
				rootTreeObject.value.contains.push(terraformObject);
			} else {
				alert("This provider has not been loaded");
			}
		}

		function fillDataStorage(datas, parentId, level) {
			datas.forEach((SVGData) => {
				const data = SVGData.value ? SVGData.value : SVGData;
				let terraformType = getLetoTypeNodeFromData(
					terraformPanelList.value,
					data.type
				);
				const terraformObject = new TerraformObjectNode(
					terraformType,
					data.name,
					level,
					data.id,
					parentId,
					data.objects
				);
				terraformObject.setHeight(data.height);
				terraformObject.setWidth(data.width);
				terraformObject.setX(data.x);
				terraformObject.setY(data.y);
				terraformObject.setAttributes(data.attributes);
				addContentInData(rootTreeObject.value, parentId, terraformObject);
				if (data.contains) {
					fillDataStorage(data.contains, data.id, level + 1);
				}
			});
		}

		function drawSVGs(datas, svgParent, parentName, content, level) {
			datas.forEach((SVGData) => {
				let terraformType, terraformObject, data;
				if (!SVGData.drawingObject) {
					data = SVGData.value ? SVGData.value : SVGData;
					terraformType = getLetoTypeNodeFromData(
						terraformPanelList.value,
						data.type
					);
					terraformObject = new TerraformObjectNode(
						terraformType,
						data.name,
						level,
						data.id,
						parentName,
						data.objects
					);
				} else {
					data = SVGData;
					terraformObject = SVGData;
				}
				createTerraformObject(
					terraformObject,
					data,
					svgParent,
					parentName,
					content,
					level
				);
			});
			emit("getTreeObjects", rootTreeObject.value);
		}

		function createTerraformObject(
			terraformObject,
			SVGData,
			svgParent,
			parentName,
			content,
			level
		) {
			const object = SVGData.drawingObject ? SVGData.drawingObject : SVGData;
			terraformObject.setHeight(object.height);
			terraformObject.setWidth(object.width);
			terraformObject.setX(object.x);
			terraformObject.setY(object.y);
			terraformObject.setAttributes(object.attributes);
			terraformObject.drawSVG(
				svgs,
				svgParent,
				parentName,
				content,
				level,
				[drag, dragLink],
				[rootTreeObject.value, drawingLink.value]
			);
			const model = document.getElementById(`${object.id}`);
			if (SVGData.contains) {
				drawSVGs(SVGData.contains, model, `${object.id}`, true, level + 1);
			}
		}

		function drawLines(datas) {
			datas.forEach((blockE) => {
				const blockEnd = blockE.value ? blockE.value : blockE;
				if (blockEnd.link) {
					blockEnd.link.forEach((blockB) => {
						const blockBegin = blockB.value ? blockB.value : blockB;
						const endId = blockEnd.id;
						const endName = blockEnd.name;
						const endType = blockEnd.type;
						const beginId = blockBegin.id;
						const beginName = blockBegin.name;
						const beginType = blockBegin.type;
						const anchors = TerraformObjectNode.getLinkAnchors(beginId, endId);
						const beginAnchor = anchors[0];
						const endAnchor = anchors[1];
						const linkId = drawLink(
							beginAnchor,
							endAnchor,
							"svg0",
							beginId + "_to_" + endId,
							rootTreeObject.value
						);
						const link = {
							targetId: endId,
							targetName: endName,
							targetType: endType,
							sourceId: beginId,
							sourceName: beginName,
							sourceType: beginType,
							id: linkId,
							variableName: blockB.name,
							required: blockB.required,
							multiple: blockB.multiple,
							representation: blockB.representation,
						};
						storeOutputLinkInData(rootTreeObject.value, beginId, link);
						storeInputLinkInData(rootTreeObject.value, endId, link);
					});
				}
				if (blockEnd.contains) {
					drawLines(blockEnd.contains);
				}
			});
		}

		const getDatas = async () => {
			monacoSourceData.value = await store.getters["appMonaco/allMonacoSource"];
			return monacoSourceData.value;
		};

		const getSVGS = async () => {
			await store.dispatch("appSVGs/loadPath");
			svgs.value = await store.getters["appSVGs/allSvgs"];
			loading.value = await store.getters["appSVGs/loading"];

			return svgs.value;
		};

		onMounted(async () => {
			await getDatas();
			await getSVGS();

			const provider = monacoSourceData.value["provider"][0].name;
			const plugin = plugins[provider];

			const metadatas = require(`src/assets/plugins/terraform/${plugin}/metadatas.json`);
			metadatas.provider.resources.forEach((element) => {
				terraformPanelList.value.push(
					new TerraformTypeNode(
						`logos/${element.icon}`,
						element.resourceType,
						"",
						"",
						"dbtf",
						element.attributes,
						element.representation
					)
				);
			});

			let svg0 = d3
				.select("#myDataViz")
				.append("svg")
				.attr("id", "root")
				.attr("width", "100%")
				.attr("height", "100vh")
				.call(
					d3
						.zoom()
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

			let svg = d3.select("#root").on("click", (e) => {
				e.preventDefault();
				let menu = document.getElementById("contextMenu");
				menu.style.display = "none";
			});

			fillDataStorage(monacoSourceData.value["resources"], "svg0", 0);
			drawSVGs(monacoSourceData.value["resources"], svg, "root", false, 0);
			drawLines(monacoSourceData.value["resources"]);

			d3.select("#svg0")
				.append("svg:defs")
				.append("svg:marker")
				.attr("id", "arrow")
				.attr("viewBox", [0, 0, 12, 12])
				.attr("refX", 6)
				.attr("refY", 6)
				.attr("markerWidth", 12)
				.attr("markerHeight", 12)
				.attr("orient", "auto-start-reverse")
				.append("svg:path")
				.attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
				.attr("stroke", "black");

			d3.select("#drawerContent")
				.append("svg")
				.attr("id", "svg1")
				.attr("width", 250)
				.attr("height", 2000);
		});

		return {
			svgs,
			loading,
			store,
			getSVGS,
			clickOnPalette,
			monacoSourceData,
			zoom,
			translateX,
			translateY,
			rootTreeObject,
			drawingLink,
		};
	},
};
</script>

<style lang="scss">
.context-menu {
	position: absolute;
	text-align: center;
	background: lightgray;
	border: 1px solid black;
}
a:hover {
	background: darkgray;
	cursor: pointer;
}
.context-menu ul {
	padding: 0px;
	margin: 0px;
	min-width: 150px;
	list-style: none;
}
.context-menu ul li {
	padding-bottom: 7px;
	padding-top: 7px;
	border: 1px solid black;
}
#myDataViz {
	border: 0.5px solid $primary;
}
</style>
