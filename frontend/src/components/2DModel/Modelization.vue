<template>
	<div id="myDataViz">

	</div>
</template>

<script>
import SVGinstanciate from "./svgvar.js";
import { onMounted } from "vue";
import * as d3 from "d3";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();
		const monacoSourceData = ref({});
		const svgs = ref({});
		const loading = ref(true);
		let svg;

		function drawSVG(datas, parentDatas, svgParent, parentName, content) {
			datas.forEach( d => {
				console.log(d.icon)
				let data = { /*logopath: 'logos/' + d.icon,*/  width: d.width, height: d.height, name: d.name, type: d.type, id : d.name + "_" + d.type };
				const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
				d3.select("#"+parentName).node().append(svgDom.documentElement)
				var model = document.getElementById(d.name + "_" + d.type)
				if(content) {
					svgParent.querySelector("g").appendChild(model)
					model.setAttribute('x', d.x)
					model.setAttribute('y', d.y)
					d.x = parentDatas.x + d.x
					d.y = parentDatas.y + d.y
				} else {
					// document.getElementById(parentName).querySelector("g").appendChild(model)
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

		onMounted( async () => {
			await getDatas();
			await getSVGS();

			svg = d3.select("#myDataViz")
						.append("svg")
						.attr("width", 2000)
						.attr("height", 2000)
						.attr('xmlns',"http://www.w3.org/2000/svg")
						.attr('xmlns:xlink', "http://www.w3.org/1999/xlink")
						.append("g")
							.attr("id", "svg0");

			drawSVG(monacoSourceData.value["resources"], [], svg, "svg0")

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
		})
	},
};
</script>

<style></style>
