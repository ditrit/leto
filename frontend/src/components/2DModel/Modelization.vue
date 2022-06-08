<template>
	<div id="myDataViz">

	</div>
</template>

<script>
import { onMounted, ref } from "vue";
const d3 = require("d3");
import {getObjectInTree} from "./utils"
import { useStore } from "vuex";


export default {

	setup() {


		const zoom = ref(1);
		const translateX = ref(0);
		const translateY = ref(0);
		const store = useStore();
		const loading = ref(true);
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


		const getSVGS = async () => {
			await store.dispatch("appSVGs/loadPath");
			(svgs.value = await store.getters["appSVGs/allSvgs"]);
			loading.value = await store.getters["appSVGs/loading"]

			return svgs.value;
		};


		onMounted(async () => {

			await getSVGS();

			let svg = d3
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
