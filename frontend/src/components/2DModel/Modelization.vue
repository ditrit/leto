<template>
	<div  id="myDataViz"></div>
</template>

<script>
import { defineComponent, computed, onMounted, ref, onBeforeMount } from "vue";
const d3 = require("d3");
import axios from "axios";
import { date } from "quasar";
import {drawLink,getContent} from "./utils";
import SVGinstanciate from "./svgvar"
import Parse from "parse";
import { useStore } from "vuex";
import SettingsNav from '../UI/Navigation/SettingsNav.vue';
import { clone } from 'mathjs';
export default {
	setup() {
		const store = useStore();
		const loading = ref(true);
		const svgs = ref({});
		const links = ref([]);
		const panel = ref({
			server: {
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
		const modelArea = ref({
			levels: [2.75, 2.5, 2.25, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5],
      widthLevel : [230,200,170,140,110,80],
			data: [],
		});

		function replaceComponents(group) {
      var i = 0;
      var height =
      	parseFloat(group.getElementsByClassName("top")[0].getAttribute("height") *1.1)
        +
        parseFloat(group.getElementsByClassName("middle")[0].getAttribute("height"))


        for (const prop in group.childNodes) {
          if (group.childNodes[prop].tagName == "g") {
            if (
              group.childNodes[prop].className.baseVal == "model" &&
              group.childNodes[prop].getAttribute("id") != "svg0"
              )
							{
                i++;
                var currentScale =
                  group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("width")/group.getElementsByClassName("main")[0].getAttribute("width");

                d3.select(group.childNodes[prop])
                  .attr(
                    "transform",
                    "scale(" +
                     1+
                      ")translate(" +
                      [
                        (parseFloat(group.getElementsByClassName("main")[0].getAttribute("width"))+parseFloat(group.getElementsByClassName("main")[0].getAttribute("x")) -
                          parseFloat(group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("width"))-parseFloat(group.childNodes[prop].getElementsByClassName("main")[0].getAttribute("x"))) /
                          2
                          , height+parseFloat(group.childNodes[prop].getElementsByClassName("top")[0].getAttribute("height"))
														+
														parseFloat(group.getElementsByClassName("main")[0].getAttribute("y"))
														-
														parseFloat(group.childNodes[prop].getElementsByClassName("top")[0].getAttribute("y")) ,
                      ] +")"
                  );

                height +=
                  parseFloat(group.childNodes[prop]
                    .getElementsByClassName("top")[0]
                    .getAttribute("height"))
									+
                  parseFloat(group.childNodes[prop]
                    .getElementsByClassName("main")[0]
                    .getAttribute("height"))

              }
            }
          }
          if (
            group.parentNode.className.baseVal == "model" &&
            group.parentNode.getAttribute("id") != "svg0"
          ) {
            replaceComponents(group.parentNode);
          }
        }

		const getSVGS = async () => {
			await store.dispatch("appSVGs/loadPath");
			(svgs.value = await store.getters["appSVGs/allSvgs"]);
			loading.value = await store.getters["appSVGs/loading"]


			return svgs.value;
		};


		onMounted(async () => {

			await getSVGS();

			const domParser = new DOMParser();
			const svgData = svgs.value["server"];

			function drawSvg(svgData, object,parent) {
				if (!loading.value) {
					object.type_name=object.type_name.replace(/\s+/g, '')

          let nCapa = object.capabilities.length;
          let nReq = object.requirements.length;
          object.rels_height=Math.max(nCapa,nReq)*10;
          object.width = modelArea.value.widthLevel[object.level]
					const svgDom = SVGinstanciate(svgs.value[object.type_name], object);
					//const svgDom = domParser.parseFromString(svgTxt, "image/svg+xml");
					var newSvg = d3.select(parent).node().append(svgDom.documentElement);
          var model = document.getElementById(object.id)


					document
						.getElementById(parent.id)
						.appendChild(model);

					document.getElementById("1").remove()



          // Draw the arrows
          let i=0;
					let j=0;
					let txt;
					let x = model.getElementsByClassName("main")[0].getAttribute("x");
					let width = model.getElementsByClassName("main")[0].getAttribute("width");
					let height = model.getElementsByClassName("rels_limit")[0].getAttribute("y")
											- model.getElementsByClassName("main")[0].getAttribute("y")
											+ model.getElementsByClassName("top_path")[0].getBoundingClientRect().height/zoom
											+7;
						object.requirements.forEach(element => {
							d3.select(model).select("#rels").select("#arrows")
								.append("path")
								.attr("d","m"+[x-4]+" "+[height+7*i]+" 4 3.22-4 3.4h10l2.5-2.12c1.45-1.08.735-1.8-.0234-2.52l-2.47-2z")
								.attr("style","fill-rule:evenodd;fill:#12ed00;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:.259;stroke:#000");
							txt=d3.select(model).select("#rels").select("#arrows")
								.append("text").attr("style","text-align:right;font-family:Alef;font-size:5px;")
								.attr("xml:space","preserve");
							txt.append("tspan")
      					 .attr("x", x-4+16)
      					 .attr("y", height+3 + i * 7)
      					 .attr("style", "stroke-width:.265")
      					 .text(object.requirements[i].name);
							d3.select(model).append("rect").attr("x",x-4).attr("y",height+7*i).attr("width",12).attr("height",6.75).attr("fill","#12ed00").attr("style","opacity:0.0").attr("class","input").attr("cursor", "pointer").on("click",clickArrow);

							i++
						});

						object.capabilities.forEach(element => {
							d3.select(model).select("#rels").select("#arrows")
								.append("path")
								.attr("d","m"+[parseFloat(x)-4+parseFloat(width)-5]+" "+[height+7*j]+" 4 3.22-4 3.4h10l2.5-2.12c1.45-1.08.735-1.8-.0233-2.52l-2.47-2z")
								.attr("style","fill-rule:evenodd;fill:#12ed00;paint-order:stroke fill markers;stroke-linecap:round;stroke-linejoin:round;stroke-width:.259;stroke:#000");
							txt=d3.select(model).select("#rels").select("#arrows")
								.append("text").attr("style","text-align:right;font-family:Alef;font-size:5px;")
								.attr("xml:space","preserve");
							txt.append("tspan")
      					 .attr("x", parseFloat(x)-4+parseFloat(width) -40)
      					 .attr("y", height+3 + j * 7)
      					 .attr("style", "stroke-width:.265")
      					 .text(object.capabilities[j].name);

							d3.select(model).append("rect").attr("x",parseFloat(x)-4+parseFloat(width)-5).attr("y",height+7*j).attr("width",12).attr("height",6.75).attr("fill","#12ed00").attr("style","opacity:0.0").attr("class","output").attr("cursor", "pointer").on("click",clickArrow);

							j++
						});

						if(object.content.length == 0 && model.parentNode.className.baseVal == "model"){
							replaceComponents(model)
						}
						if(!object.isPanel){
						d3.select(model)
						.append("svg:image")
						.attr("cursor", "move")
						.attr("x",object.width-28)
						.attr("y",model.getElementsByClassName("info_limits")[0].getAttribute("y"))
						.attr("width", 30)
						.attr("height", 30)
						.attr("xlink:href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAqklEQVRIieWVQQ6DIBBFX1wYvFrRy9KF7eWwi0KkiDqSIWnTl8zK+L/OfBj4JwzgQhlt8R64A0uoJzC0Elc3sYAvGHjgpmGQEsXFdNpfIDEwwFihNSFIlwFm3v0tcdQiH97dNcnTctXgNF2ObVJqy0XR5kNO6fn8ixKSZw8O5tB0yKmJrTCwEvEzfuMk54ysl10kXnZ7rbxEnq70QKktntLCUd9qTVfm9/IC8+hUYHPjvWwAAAAASUVORK5CYII=")
						.call(drag);

						d3.select(model).select(".top").attr("cursor", "pointer").on("click",click)
						}


						object.content.forEach(element =>{
							drawSvg(svgData,element,document.getElementById(object.id));
						})
						return document.getElementById(object.id);
					}
					else {
						console.log("wait for loading");
					}
			}

			var zoom = 1;
			var translateX = 0;
			var translateY = 0;
			//Create SVG element on the center page
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
							console.log(event.transform);
							zoom = event.transform.k;
							translateX = event.transform.x;
							translateY = event.transform.y;
							svg.attr("transform", event.transform);
						})
				)
				.append("g")
				.attr("id", "svg0");

			var currentParent;
			var defaultx;
			var defaulty;

			// Define drag and drop functions ----------------------------------------
			function dragstarted(event, d) {
      let currentID = parseInt(this.parentNode.getAttribute("id"));
      var currentModel = this.parentNode;
      var currentLevel;
      var parent = this.parentNode.parentNode;
			currentParent = this.parentNode.parentNode;


      for (let el0 of modelArea.value.data) {
        if (el0.id === currentID) {
          currentLevel = 0;

          modelArea.value.data.splice(modelArea.value.data.indexOf(el0), 1);
          break;
        }
        for (let el1 of el0.content) {
          if (el1.id === currentID) {
            currentLevel = 1;

            el0.content.splice(el0.content.indexOf(el1), 1);
            break;
          }
          for (let el2 of el1.content) {
            if (el2.id === currentID) {
              currentLevel = 2;

              el1.content.splice(el1.content.indexOf(el2), 1);
              break;
            }
            for (let el3 of el2.content) {
              if (el3.id === currentID) {
                currentLevel = 3;

                el2.content.splice(el2.content.indexOf(el3), 1);
                break;
              }
							for (let el4 of el3.content) {
              	if (el4.id === currentID) {
                	currentLevel = 4;

                	el3.content.splice(el3.content.indexOf(el4), 1);
                	break;
              	}
								for (let el4 of el5.content) {
              		if (el5.id === currentID) {
                		currentLevel = 5;

                		el4.content.splice(el4.content.indexOf(el5), 1);
                		break;
              		}
            		}
            	}
            }
          }
        }
      }
      if (currentModel.parentNode.getAttribute("id") != "svg0") {

				var panelObj;

      			for (const prop in panel.value) {
        			if (
          			panel.value[prop].type_name ==
          			currentModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
        			)
							{
          			panelObj = panel.value[prop];
        			}
      			}

				var currentObj ={
					type_name: currentModel.getElementsByClassName("type_name")[0].textContent,
        			instance_name: currentModel.getElementsByClassName("instance_name")[0].textContent,
       				class: currentModel.getAttribute("class"),
        			id: parseInt(currentModel.getAttribute("id")),
					width: currentModel.getElementsByClassName("main")[0].getAttribute("width"),
        			logo: d3.select(currentModel).select(".logo").attr("xlink:href"),
        			primary_color: currentModel.getElementsByClassName("top")[0].style.fill,
        			secondary_color: currentModel.getElementsByClassName("top_path")[0].style.fill,
        			level: currentLevel,
        			container_height:
					parseFloat((currentModel).getElementsByClassName("subs_limits")[0].getAttribute("height")),
        			content: [],
        			requirements: panelObj.requirements,
        			capabilities: panelObj.capabilities,
				}
				getContent(currentModel,currentObj,panel.value)

				parent.removeChild(currentModel);
				document.getElementById("svg0").appendChild(currentModel);
				//d3.select(this).attr("transform","translate("+[-parent.getBoundingClientRect().x,-parent.getBoundingClientRect().y]+")")


				function redrawStack(group,removedComponent){
					var panelObj;

      				for (const prop in panel.value) {
        				if (
          					panel.value[prop].type_name ==
          					group.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
        				)
						{
          					panelObj = panel.value[prop];
        				}
      				}

					var obj ={
						type_name: group.getElementsByClassName("type_name")[0].textContent,
        				instance_name: group.getElementsByClassName("instance_name")[0].textContent,
       					class: group.getAttribute("class"),
        				id: parseInt(group.getAttribute("id")),
						width: group.getElementsByClassName("main")[0].getAttribute("width"),
        				logo: d3.select(group).select(".logo").attr("xlink:href"),
        				primary_color: group.getElementsByClassName("top")[0].style.fill,
        				secondary_color: group.getElementsByClassName("top_path")[0].style.fill,
        				level: 0,
        				container_height:
							parseFloat(group.getElementsByClassName("subs_limits")[0].getAttribute("height"))
							- parseFloat(removedComponent.getElementsByClassName("main")[0].getAttribute("height"))
							- parseFloat(removedComponent.getElementsByClassName("middle")[0].getAttribute("height"))
							- parseFloat(removedComponent.getElementsByClassName("top_path")[0].getBoundingClientRect().height/zoom)
							- parseFloat(removedComponent.getElementsByClassName("bottom_path")[0].getBoundingClientRect().height/zoom
							),
        				content: [],
        				requirements: panelObj.requirements,
        				capabilities: panelObj.capabilities,
					}
					getContent(group,obj,panel.value)
					obj.content.forEach(element => {
						if (element.id==currentObj.id){
							obj.content.splice(obj.content.indexOf(element))
						}
					});
					let parentId = group.parentNode.id;
					var transform = group.getAttribute("transform");
					console.log("group transform",transform)
					group.parentNode.removeChild(group);

					var cloneParent = drawSvg(svgData,obj,document.getElementById(parentId));


					if (parentId != "svg0"){
						redrawStack(cloneParent.parentNode,removedComponent);
					}
					else{
						d3.select(cloneParent).attr("transform",transform);
					}

				}

				redrawStack(parent,currentModel);


        //d3.select("#"+currentModel.id).call(drag).on("click", click);

				//console.log("parent",document.getElementById(currentModel.id))
        replaceComponents(document.getElementById(parent.id));
				//document.getElementById(parentId).removeChild(currentModel);

      }

      console.log(modelArea.value.data);

    }
    function dragged(event, d) {

      var currentGroup = this.parentNode;
      var coord = d3.pointer(event);


	  var rootx=document.getElementById("root").getBoundingClientRect().x;
	  var rooty = document.getElementById("root").getBoundingClientRect().y;


      if (
        currentGroup.className.baseVal == "model" &&
        currentGroup.getAttribute("id") != "svg0"
      ) {
        d3.select(currentGroup)
          .raise()
          .attr(
            "transform",
            "translate(" +
              [
                (coord[0]-rootx-(parseFloat(this.getAttribute("x"))+parseFloat(this.getAttribute("width"))/2)*zoom-translateX)/zoom,
                (coord[1] -rooty-(parseFloat(this.getAttribute("y"))+parseFloat(this.getAttribute("height"))/2)*zoom-translateY)/zoom,
              ] +
              ")"
          );
      }

			d3.selectAll(".link").remove();
			links.value.forEach(element=>{
				drawLink(element.target,element.source,"svg0",zoom,translateX,translateY,links.value);
			})
      /*var groups = d3.selectAll(".model");
      groups.each(function (groups, i) {
        if (this.getAttribute("id") != "svg0") {
          var groupRect =
            this.getElementsByClassName("main")[0].getBoundingClientRect();
          if (
            coord[0] > groupRect.x &&
            coord[0] < groupRect.x + groupRect.width &&
            coord[1] > groupRect.y &&
            coord[1] < groupRect.y + groupRect.height &&
            currentGroup != this
          ) {
            //console.log("dragover" + this.getAttribute("id"));
          } else {
          }
        }
      });*/
    }
    function dragended(event, d) {
      var currentGroup = this.parentNode;
      var panelObject;

			for (const prop in panel.value) {


        if (
          panel.value[prop].type_name ==
          currentGroup.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
        ) {
          panelObject = panel.value[prop];
        }
      }
      var currentObj = {
        type_name: currentGroup.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, ''),
        instance_name: currentGroup.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),
        class: currentGroup.getAttribute("class"),
        id: parseInt(currentGroup.getAttribute("id")),
				width: currentGroup.getElementsByClassName("main")[0].getAttribute("width"),
        logo: d3.select(currentGroup).select(".logo").attr("xlink:href"),
        primary_color: currentGroup.getElementsByClassName("top")[0].style.fill,
        secondary_color: currentGroup.getElementsByClassName("top_path")[0].style.fill,
        level: 0,
        container_height: currentGroup.getElementsByClassName("subs_limits")[0].getAttribute("height"),
        content: [],
        requirements: panelObject.requirements,
        capabilities: panelObject.capabilities,
      };

      var coord = d3.pointer(event);
      var reDrawn = false;
      var component = currentGroup;
      var minWidth = 350;
      var minGroup;
      var groups = d3.selectAll(".model");
      console.log(groups._groups[0]);
      groups.each(function (groups, i) {
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
              console.log(this.getAttribute("id") + " " + groupRect.width);
              minGroup = this;
            }
          }
        }
      });
      if (minGroup != null && minGroup != this) {
        console.log("in a new group" + minGroup.getAttribute("id"));


        for (let el0 of modelArea.value.data) {
          console.log(el0.id);
          if (el0.id == parseInt(minGroup.getAttribute("id"))) {
            currentObj.level = 1;
            el0.content.push(currentObj);
            break;
          }
          for (let el1 of el0.content) {
            if (el1.id == parseInt(minGroup.getAttribute("id"))) {
              currentObj.level = 2;
              el1.content.push(currentObj);
              break;
            }
            for (let el2 of el1.content) {
              if (el2.id == parseInt(minGroup.getAttribute("id"))) {
                currentObj.level = 3;
                el2.content.push(currentObj);
                break;
              }
              for (let el3 of el2.content) {
                if (el3.id == parseInt(minGroup.getAttribute("id"))) {
                  currentObj.level = 4;
                  el3.content.push(currentObj);
                  break;
                }
              }
            }
          }
        }
			getContent(currentGroup,currentObj,panel.value);



			component.parentNode.removeChild(component);
			var cloneComponent = drawSvg(svgData,currentObj,document
        .getElementById(minGroup.getAttribute("id")));


function redrawStack(group,addedComponent){
	var panelObj;

      for (const prop in panel.value) {
        if (
          panel.value[prop].type_name ==
          d3.select(group).selectAll("text")._groups[0][1].textContent.replace(/\s+/g, '')
        )
				{
          panelObj = panel.value[prop];
        }
      }

		var obj ={
			type_name: group.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, ''),
        	instance_name: group.getElementsByClassName("instance_name")[0].textContent.replace(/\s+/g, ''),
        	class: group.getAttribute("class"),
        	id: parseInt(group.getAttribute("id")),
			width: group.getElementsByClassName("main")[0].getAttribute("width"),
        	logo: d3.select(group).select(".logo").attr("xlink:href"),
        	primary_color: group.getElementsByClassName("top")[0].style.fill,
        	secondary_color: group.getElementsByClassName("top_path")[0].style.fill,
        	level: 0,
        	container_height:
				parseFloat(group.getElementsByClassName("subs_limits")[0].getAttribute("height"))
				+ parseFloat(addedComponent.getElementsByClassName("main")[0].getAttribute("height"))
				+ parseFloat(addedComponent.getElementsByClassName("middle")[0].getAttribute("height"))
				+ parseFloat(addedComponent.getElementsByClassName("top_path")[0].getBoundingClientRect().height/zoom)
				+ parseFloat(addedComponent.getElementsByClassName("bottom_path")[0].getBoundingClientRect().height/zoom)
				,
        	content: [],
        	requirements: panelObj.requirements,
        	capabilities: panelObj.capabilities,
		}
		getContent(group,obj,panel.value)
		let parentId = group.parentNode.id;
		var transform = group.getAttribute("transform")

		group.parentNode.removeChild(group);
			var cloneParent = drawSvg(svgData,obj,document
        .getElementById(parentId));

	if (parentId != "svg0"){
		redrawStack(cloneParent.parentNode,addedComponent);
	}
	else{
		d3.select(cloneParent).attr("transform",transform);
	}
}

redrawStack(minGroup,cloneComponent);


        replaceComponents(document.getElementById(currentObj.id));

        reDrawn = true;
      }
      if (!reDrawn) {
				var xParent;
				var yParent;

			var hasParent;
			var rootx=document.getElementById("root").getBoundingClientRect().x;
			var rooty = document.getElementById("root").getBoundingClientRect().y;

			if(currentParent.id != "svg0"){
				xParent=//document.getElementById("root").getBoundingClientRect().x+
				document.getElementById(currentParent.id).getBoundingClientRect().x;
				yParent=//document.getElementById("root").getBoundingClientRect().y+
				document.getElementById(currentParent.id).getBoundingClientRect().y;
			  console.log("xParent",document.getElementById(currentParent.id).getBoundingClientRect().x)
			  console.log("xroot",xParent)
			  console.log("eventx",event.x)
			  console.log("eventy",event.y)
			  hasParent=1;

			}
			else{
				xParent=0;
				yParent=0;
				hasParent=0;

			}
        console.log("on svg");
				currentObj.width=230;
				getContent(currentGroup,currentObj,panel.value);
				component.parentNode.removeChild(component);
				var cloneComponent = drawSvg(svgData,currentObj,document.getElementById("svg0"));

				d3.select(cloneComponent)
          .raise()
          .attr(
            "transform",
            "translate(" +
              [
                (coord[0]-rootx-(parseFloat(this.getAttribute("x"))+parseFloat(this.getAttribute("width"))/2)*zoom-translateX)/zoom,
                (coord[1] -rooty-(parseFloat(this.getAttribute("y"))+parseFloat(this.getAttribute("height"))/2)*zoom-translateY)/zoom,
              ] +
              ")"
          );

        modelArea.value.data.push(currentObj);
      }
			d3.selectAll(".link").raise();
      console.log(modelArea.value.data);

    }
			//End of drag and drop functions -------------------------------------------
			//Click event
			function click(event, d) {
				console.log("click"+this.parentNode.parentNode.parentNode.getAttribute("id"))
				let i=document.getElementById("detailsContainer").childNodes.length;
				while(i>0){
					document.getElementById("detailsContainer").childNodes[i-1].remove();
					i--;
				}

				let currentID = parseInt(this.parentNode.parentNode.parentNode.getAttribute("id"));
				let currentLevel;
				let currentModel = this.parentNode.parentNode.parentNode;
				for (let el0 of modelArea.value.data) {
        			if (el0.id === currentID) {
          				currentLevel = 0;
          				break;
        			}
        			for (let el1 of el0.content) {
          				if (el1.id === currentID) {
            				currentLevel = 1;
									break;
          				}
          				for (let el2 of el1.content) {
            				if (el2.id === currentID) {
              					currentLevel = 2;
                        		break;
            				}
            				for (let el3 of el2.content) {
              					if (el3.id === currentID) {
                					currentLevel = 3;
                					break;
              					}
												for (let el4 of el3.content) {
              						if (el4.id === currentID) {
                						currentLevel = 4;
                						break;
              						}
													for (let el5 of el4.content) {
              							if (el5.id === currentID) {
                						currentLevel = 5;
                						break;
              							}
            							}
            						}
            				}
          				}
        			}
     			}

				var panelObj;

      			for (const prop in panel.value) {
        			if (
          			panel.value[prop].type_name ==
          			currentModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
        			)
							{
          			panelObj = panel.value[prop];
        			}
      			}

				var currentObj ={
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
			var lastArrow = null;
			function clickArrow(event,d){
				console.log(lastArrow)
				if(lastArrow==null){
					lastArrow=this;
				}
				else{
					console.log("lastArrow:"+lastArrow.className.baseVal+" thisArrow:"+this.className.baseVal)
					if((lastArrow.className.baseVal=="input"&&this.className.baseVal=="output")
						||(lastArrow.className.baseVal=="output"&&this.className.baseVal=="input"))
						{
							let linkID=drawLink(lastArrow,this,"svg0",zoom,translateX,translateY,links.value);

							let source,target;
							if(lastArrow.className=="input"){
								source=this;
								target=lastArrow;
							}
							else{
								source=lastArrow;
								target=this;
							}
							links.value.push({
								source: source,
								target: target,
								id: linkID
							})
						}
						lastArrow=null;
				}
				console.log(links.value)
			}

			function click_model(event, d) {
				var clickedModel = this;
				console.log("clicked");
				d3.select(this).transition().attr("fill", "black");
				var panelObject;
				for (const prop in panel.value) {
					if (
						panel.value[prop].type_name ==
						clickedModel.getElementsByClassName("type_name")[0].textContent.replace(/\s+/g, '')
					) {
						panelObject = panel.value[prop];
					}
				}
				console.log(panelObject.type_name)

				var currentObj = {
					type_name: panelObject.type_name,
					instance_name: panelObject.instance_name,
					class: this.getAttribute("class"),
					id: Date.now(),
					width: panelObject.width,
					rels_height: panelObject.rels_height,
					container_height: panelObject.container_height,

					logo: panelObject.logo,
					primary_color: panelObject.primary_color,
					secondary_color: panelObject.secondary_color,
					level: 0,
					//containerHeight: 0,
					content: [],
					requirements: panelObject.requirements,
					capabilities: panelObject.capabilities,
				};

				var drawnModel = drawSvg(svgData, currentObj,document.getElementById("svg0"));

				defaultx = drawnModel.getBoundingClientRect().x;
				defaulty = drawnModel.getBoundingClientRect().y;


				modelArea.value.data.push(currentObj);
				console.log(modelArea.value.data);
			}
			const drag = d3
				.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended);
			// Draw some svg items in the drawer -------------------------------------------------------
			let i =0;
			Object.values(panel.value).forEach((element) => {
				i++;

				var panelObj = {
					type_name: element.type_name,
					instance_name: element.instance_name,
					//class: this.getAttribute("class"),
					id: Date.now(),
					width: 50,
					rels_height: 10,
					container_height: 10,
					isPanel:true,
					logo: element.logo,
					primary_color: element.primary_color,
					secondary_color: element.secondary_color,
					level: 3,
					//containerHeight: 0,
					content: [],
					requirements: [],
					capabilities: [],
				}


				var drawerItem = d3
					.select("#drawerContent")
					.append("svg")
					.attr("id", "svg1")
					.attr("width", 250)
					.attr("height", 2000);

				var drawnModel = drawSvg(svgData, panelObj,document.getElementById("svg1"));

				d3.select(drawnModel)
				.attr("transform","translate("+[140-drawnModel.getBoundingClientRect().x,100*i-drawnModel.getBoundingClientRect().y]+")")
				.on("click", click_model);

			});

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
		}}}
	</script>
