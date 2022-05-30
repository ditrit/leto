<template>
	<svg id='svg0' />
</template>

<script>
import SVGinstanciate from "./svgvar.js";
import Palette from "./Palette"
import TerraformTypeNode from "./TerraformTypeNode"
import { onMounted } from "vue";
import * as d3 from "d3";
import { ref } from "vue";
import { useStore } from "vuex";
import plugins from '../../../../iactor/src/plugins/terraform/plugins'

export default {
	setup() {
		const store = useStore();
		const monacoSourceData = ref({});
		const svgs = ref({});
		const loading = ref(true);
		let svg;

		function drawSVG(datas, svgParent, parentName, content, provider) {
			datas.forEach( d => {
				let data = { logopath: `logos/${d.icon}`,  width: d.width, height: d.height, name: d.name, type: d.type, id : d.name + "_" + d.type };
				const svgDom = SVGinstanciate(svgs.value["dbtf"], data);
				d3.select(document.querySelector('body')).select("#"+parentName).node().append(svgDom.documentElement)
				const model = document.getElementById(`${d.name}_${d.type}`)
				if(content) {
					svgParent.querySelector("g").appendChild(model)
					model.setAttribute('x', d.x)
					model.setAttribute('y', d.y)
				} else {
					document.getElementById(parentName).querySelector("g").appendChild(model)
					model.setAttribute('x', d.x)
					model.setAttribute('y', d.y)
				}
				if(d.contains) {
					drawSVG(d.contains, model, `${d.name}_${d.type}`, true, provider)  
				}       
			})
			datas.forEach( blockEnd => {
				if(blockEnd.link) {
					blockEnd.link.forEach( blockBegin => {
						let xEnd, yEnd, xBegin, yBegin;
						let endX1, endX2, endY1, endY2;
						const blockEndX = (blockEnd.parentX) ? blockEnd.parentX : blockEnd.x
						const blockEndY = (blockEnd.parentY) ? blockEnd.parentY : blockEnd.y
						const blockBeginX = (blockBegin.parentX) ? blockBegin.parentX : blockBegin.x
						const blockBeginY = (blockBegin.parentY) ? blockBegin.parentY : blockBegin.y
						let blockEndWidth = ((blockEnd.width > 0) ? blockEnd.width + 30 : 160) 
						let blockBeginWidth = ((blockBegin.width > 0) ? blockBegin.width + 30 : 160) 
						let blockEndHeight = ((blockEnd.height > 0) ? blockEnd.height + 30 : 44) 
						let blockBeginHeight = ((blockBegin.height > 0) ? blockBegin.height + 30 : 44) 
						endX1 = blockEndX + blockEndWidth
						endY1 = blockEndY + blockEndHeight
						endX2 = blockBeginX + blockBeginWidth
						endY2 = blockBeginY + blockBeginHeight
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

			const provider = monacoSourceData.value["provider"][0].name;
			const plugin = plugins[provider]
			const meta = require(`../../../../iactor/src/plugins/terraform/${plugin}/metadatas.json`)
			console.log(meta)

			svg = d3.select("#svg0")
					.attr("id", "svg0")
					.attr("width", 2000)
					.attr("height", 2000)
					.attr('xmlns',"http://www.w3.org/2000/svg")
					.attr('xmlns:xlink', "http://www.w3.org/1999/xlink")
					.append("g");

			drawSVG(monacoSourceData.value["resources"], svg, "svg0", false, plugin)

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
		});
	},
};
</script>

<style></style>
