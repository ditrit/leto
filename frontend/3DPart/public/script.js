import * as THREE from './libs/three.js/build/three.module.js';
import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';
import { DragControls } from './libs/three.js/examples/jsm/controls/DragControls.js';
import { EffectComposer } from './libs/three.js/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './libs/three.js/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './libs/three.js/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from './libs/three.js/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from './libs/three.js/examples/jsm/shaders/FXAAShader.js';
import {Vector2, Vector3} from "./libs/three.js/build/three.module.js";
import { FBXLoader } from "./libs/three.js/examples/jsm/loaders/FBXLoader.js";

/// VARIABLES ///
let camera, scene, renderer, orbitControls, dragControls, enableSelection = false, mouse, raycaster,
	selectedTool = 'eyeTool',selectedComponent = null, movingComponent = null, enableAutoFocus = false,
	preventClick = false, needSpacing = false, needRelink = false;
let componentsList, sceneComponentsObj = new THREE.Group(), sceneLinksObj = new THREE.Group();	// Liste de tous les composants existants (palette); liste des composants de la Scene
let nestingLevels = {level0: {width: 1.2, depth: 1.2}};
let objectsPerLevels = new Array([]);
let lastID = 0, lastLinkID = 0, realeaseTimer = null;
let position_array = [];
// postprocessing
let composer, effectFXAA, outlinePass;
let selectedObjects = [];
// config
let config_distance = 5, config_tolerance = 0.2, config_espacement = 1, config_diviseurVitesse = 30, config_focusDistance = 7;
// Loaders
const textureLoaderSky = new THREE.TextureLoader();
textureLoaderSky.setPath( 'public/skybox/' );
// JQuery
const htmlComponentList = $('#componentsSection');
const sceneComponentList = $('.sceneComponentslist');
const pannelSectionID = $('#componentID');
const pannelSectionName = $('#componentName');
const pannelSectionType = $('#componentType');
const pannelSectionLinks = $('#componentLinks');
const rightPannel = $('#rightPannel');
const toolButtons = $('.toolButtons');
const messageBox = $('#messageBox');
messageBox.fadeOut();


/// FONCTIONS DE BASE ///
// Lance le programme
init();
animate();

// Initialisation
function init(){
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
	camera.position.set(0, 4, 15);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x132644);
	renderer.id = 'viewCanvas';

	mouse = new THREE.Vector2();
	raycaster = new THREE.Raycaster();

	document.body.appendChild(renderer.domElement);

	// postprocessing
	composer = new EffectComposer( renderer );
	const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );
	outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
	composer.addPass( outlinePass );
	effectFXAA = new ShaderPass( FXAAShader );
	effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
	composer.addPass( effectFXAA );

	// Controles camera
	orbitControls = new OrbitControls( camera, renderer.domElement );
	orbitControls.mouseButtons = {
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: THREE.MOUSE.PAN
	}
	//orbitControls.enablePan = false;
	orbitControls.enableDamping = false;
	orbitControls.minDistance = 2;
	orbitControls.maxDistance = 200;
	orbitControls.target = new THREE.Vector3(0, 1, 0);
	orbitControls.update();

	// Drag control
	initDragControls();
	dragControls.enabled = false;
	dragControls.deactivate();
	document.addEventListener( 'pointerdown', onMouseDown);
	document.addEventListener( 'pointerup', onMouseUp);
	window.addEventListener( 'keydown', onKeyDown );
	window.addEventListener( 'keyup', onKeyUp );

	//mouse position
	window.addEventListener( 'mousemove', onMouseMove, false );

	// ----------------------------------------------
	//initialisation de la liste des composants
	scene.add(sceneComponentsObj);
	scene.add(sceneLinksObj);

	//textures
	// les composants doivent tous avoir des noms différents et hériter de composants existants (ou ne pas hériter du tout)
	componentsList = {
		'root' : { 'name': 'root', 'derivedFrom' : '', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [], 'linkedTo': []} },
		'serveur' : { 'name': 'serveur', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': ['router']} },
		'serveurDeFichier' : { 'name': 'serveur de fichier', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurImpression' : { 'name': 'serveur d\'impression', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'print.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurApplication' : { 'name': 'serveur d\'application', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'menu.webp', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurDNS' : { 'name': 'serveur DNS', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'dns.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurMessagerie' : { 'name': 'serveur de messagerie', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'mail.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurWeb' : { 'name': 'serveur web', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'web.jpg', 'capacities': {'nestedOn': [], 'linkedTo': ['database']}, 'requirements': {'nestedOn': [''], 'linkedTo': ['apache', 'php']} },
		'serveurBDD' : { 'name': 'serveur de bases de données', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#8288a1', 'logo' : 'servBDD.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurVirtuel' : { 'name': 'serveur virtuel', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#404040', 'logo' : 'file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'jetty' : { 'name': 'jetty', 'derivedFrom' : 'serveurVirtuel', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#404040', 'logo' : 'file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [], 'linkedTo': []} },
		'router': { 'name': 'router', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#19bfba', 'logo' : 'wifi.png', 'capacities': {'nestedOn': [], 'linkedTo': ['serveur']}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'apache': { 'name': 'apache', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#a82b18', 'logo' : 'apache.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'php': { 'name': 'php', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#3065ba', 'logo' : 'php.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'database': { 'name': 'database', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#db852a', 'logo' : 'db.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'nodejs': { 'name': 'nodejs', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.9, 'depth' : 1.2, 'color' : '#2cab4c', 'logo' : 'nodejs.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} }
	};

	// génération dynamique de la palette de composants
	let i = 0;
	Object.entries(componentsList).forEach(function(component) {
		if(component[1]['derivedFrom'] === 'root'){
			htmlComponentList.append('<div class="paletteComponent addComponentButtons" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
				'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
				'<span>'+component[1]['name']+'</span>'+
				'</div>'+
				'<button id="showHide'+component[0]+'">+</button>'+
				'<ul id="'+component[0]+'"></ul>');
		}else if(component[1]['derivedFrom'] !== ''){
			$('#'+component[1]['derivedFrom']).append('<div class="paletteComponent addComponentButtons" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
				'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
				'<span>'+component[1]['name']+'</span>'+
				'</div>'+
				'<button id="showHide'+component[0]+'">+</button>'+
				'<ul id="'+component[0]+'"></ul>');
		}
		i++;
	});

	// affichage des bouttons pour afficher/cacher les listes
	htmlComponentList.find('ul').each(function(){
		const associatedButton = $( '#showHide'+$(this).attr('id') );
		const list = $(this);

		if ( list.html() === '' ){
			associatedButton.css('display', 'none');	// hide 'show/hide' button if list's empty
		}else{
			list.css('display', 'none');	// hide list if not empty
			associatedButton.css('display', 'block');	// display 'show/hide' button if list isn't empty
		}

		associatedButton.on('click', function(){
			if( associatedButton.html() === '+' ){
				list.css('display', 'block');
				associatedButton.html('-');
			}else if( associatedButton.html() === '-' ){
				list.css('display', 'none');
				associatedButton.html('+');
			}
		});
	});

	// Skybox
	const DayFront = textureLoaderSky.load('Day-front.png');
	const DayLeft = textureLoaderSky.load('Day-left.png');
	const DayRight = textureLoaderSky.load('Day-right.png');
	const DayBack = textureLoaderSky.load('Day-back.png');
	const DayTop = textureLoaderSky.load('Day-top.png');
	const DayBottom = textureLoaderSky.load('Day-bottom.png');
	const skyboxMaterial = [
		new THREE.MeshBasicMaterial({ map: DayRight, side: THREE.BackSide }),	// Right side
		new THREE.MeshBasicMaterial({ map: DayLeft, side: THREE.BackSide }),	// Left side
		new THREE.MeshBasicMaterial({ map: DayTop, side: THREE.BackSide }),	// Top side
		new THREE.MeshBasicMaterial({ map: DayBottom, side: THREE.BackSide }),	// Bottom side
		new THREE.MeshBasicMaterial({ map: DayFront, side: THREE.BackSide }),	// Front side
		new THREE.MeshBasicMaterial({ map: DayBack, side: THREE.BackSide })	// Back side
	];
	const skybox = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), skyboxMaterial);
	scene.add(skybox);

	const gridHelper = new THREE.GridHelper( 200, 200 );
	gridHelper.position.y = -0.5;
	scene.add( gridHelper );

	// Lights
	const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
	scene.add(ambientLight);
	const pointLight = new THREE.PointLight(0xFFFFFF, 0.5, 1000);
	pointLight.position.set(0, 10, 0);
	scene.add(pointLight);
}

// Mises à jour de l'application
function update(){
	autoFocus();
	//ajustementEspacement();
	if(needRelink){
		sceneLinksObj.children.forEach(function(link){
			relink(link);
		});
		needRelink = false;
	}
	orbitControls.update();
}

// Boucle d'animation
function animate(){
	update();

	// Déclenche l'affichage
	//renderer.render(scene, camera);
	composer.render();

	requestAnimationFrame(animate);
}

function initDragControls(){
	if(dragControls){
		dragControls.deactivate();
		dragControls.enable = false;
	}
	dragControls = new DragControls(sceneComponentsObj.children, camera, renderer.domElement);
	dragControls.addEventListener( 'dragstart', onStartDragging );
	dragControls.addEventListener( 'drag', onDraging );
	dragControls.addEventListener( 'dragend', onDragEnd );
}

function onStartDragging(event){
	movingComponent = event.object;
	// Make transparent incompatible objects
	const cmptCompatibilities = getNestingCompatibilities(event.object.parent.userData.componentType);
	objectsPerLevels.forEach(function(level){
		level.forEach(function(component){
			const parentTypes = getAllObjectTypes(component.userData.componentType);

			let compatible = false;
			for(let compatibility of cmptCompatibilities){
				if(parentTypes.includes(compatibility))
					compatible = true;
			}
			if(!compatible){
				component.children[0].material.forEach(function(face){
					face.transparent = true;
					face.opacity = 0.5;
				});
			}
		});
	});
}

function arrayRemove(arr, value) {
	return arr.filter(function(ele){
		return ele != value;
	});
}

function onDraging(event){
	const cmpnt = event.object;
	//const intersectElements = arrayRemove(sceneComponentsObj.children, cmpnt);
	if(cmpnt.parent.userData.nestingLevel === 0)
		cmpnt.position.y = -0.5 + (cmpnt.geometry.parameters.height/2);

	// align to grid
	/*
	let pos = new THREE.Vector3();
	cmpnt.getWorldPosition(pos);
	pos = cmpnt.parent.parent.worldToLocal(pos);

	cmpnt.parent.position.x = pos.x;
	//cmpnt.parent.position.y = -0.5 + (cmpnt.geometry.parameters.height/2);
	cmpnt.parent.position.z = pos.z;
	// center geometry
	cmpnt.position.x = 0;
	cmpnt.position.y = 0;
	cmpnt.position.z = 0;
	 */
}

function onDragEnd(event) {
	// Make opaque all objects
	objectsPerLevels.forEach(function(level){
		level.forEach(function(component){
			component.children[0].material.forEach(function(face){
				face.opacity = 1;
			});
		});
	});
}

// calculate mouse position in normalized device coordinates
function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onKeyDown( event ) {
	// reset camera's rotation pivot
	/*
	if(event.keyCode === 32)
		orbitControls.target = new THREE.Vector3(0, 1, 0);

	 */
	// camera movements (future enhancement)
	if(selectedComponent){
		if(event.keyCode === 38 ){
			orbitControls.target = new THREE.Vector3(selectedComponent.position.x, selectedComponent.position.y, selectedComponent.position.z);
			camera.position.x -= (camera.position.x - selectedComponent.position.x) / config_diviseurVitesse;
			camera.position.z -= (camera.position.z - selectedComponent.position.z) / config_diviseurVitesse;
		}
		if(event.keyCode === 40){
			orbitControls.target = new THREE.Vector3(selectedComponent.position.x, selectedComponent.position.y, selectedComponent.position.z);
			camera.position.x += (camera.position.x - selectedComponent.position.x) / config_diviseurVitesse;
			camera.position.z += (camera.position.z - selectedComponent.position.z) / config_diviseurVitesse;
		}
	}
}

function onKeyUp() {
	enableSelection = true;
}

function onMouseDown(event){
	realeaseTimer = Date.now();
	/*if(selectedTool === 'moveTool'){
		raycaster.setFromCamera(mouse, camera);
		let intersects = raycaster.intersectObjects(sceneComponentsObj.children, true);
		if(intersects.length > 0) {
			let component = intersects[0].object;
			component.position.y = -0.5 + (component.geometry.parameters.height/2);
		}
	}*/
}

function onMouseUp(event) {
	const delay = Date.now() - realeaseTimer;

	if(preventClick){
		preventClick = false;
		return;
	}
	if(selectedTool === 'moveTool'){
		if(delay < 200){
			selectObject(event);
		}else{	// Attach moving object to a new parent if found
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(sceneComponentsObj.children, true);

			if(intersects.length > 1){	// put component on another
				let itersectIndex = 1;
				if(intersects[0].object != movingComponent){
					itersectIndex = 0;
				}
				// check compatibility
				const cmptCompatibilities = getNestingCompatibilities(movingComponent.parent.userData.componentType);
				const parentTypes = getAllObjectTypes(intersects[itersectIndex].object.parent.userData.componentType);
				let compatible = false;

				for(let compatibility of cmptCompatibilities){
					if(parentTypes.includes(compatibility))
						compatible = true;
				}
				// attach to the new parent
				if(compatible){
					console.log("attach " +movingComponent.parent.userData.componentName+ " to " +intersects[itersectIndex].object.parent.userData.componentName);
					movingComponent.parent.parent.remove(movingComponent.parent);
					intersects[itersectIndex].object.add(movingComponent.parent);

					const oldLevel = movingComponent.parent.userData.nestingLevel;
					const newLevel = intersects[itersectIndex].object.parent.userData.nestingLevel +1;

					updateObjectLevel(oldLevel, movingComponent, newLevel);
					// call organizing function
					checkStrechNeeds(intersects[itersectIndex].object.parent);
				}
			}else if(movingComponent.parent.userData.grid != null){
				// align to grid
				let pos = new THREE.Vector3();
				movingComponent.getWorldPosition(pos);
				pos = movingComponent.parent.parent.worldToLocal(pos);

				movingComponent.parent.position.x = pos.x;
				movingComponent.parent.position.y = -0.5 + (movingComponent.geometry.parameters.height/2);
				movingComponent.parent.position.z = pos.z;
				placeParent(movingComponent.parent);
			}
			// center geometry
			movingComponent.position.x = 0;
			movingComponent.position.y = 0;
			movingComponent.position.z = 0;

			checkShrinkNeeds();
		}
	}else if(selectedTool === 'eyeTool'){
		if(delay < 200)
			selectObject(event);
	}else if(selectedTool === 'linkTool'){
		if(selectedComponent != null){
			const cmpnt1 = selectedComponent;
			if(delay < 200){
				selectObject(event);
				if(selectedComponent != null) {
					const cmpnt2 = selectedComponent;
					if(cmpnt1 != cmpnt2){
						const link = drawLink(cmpnt1, cmpnt2);
						pannelSectionLinks.append('<li>'+link.userData.hoster1.userData.componentName+' - '+link.userData.hoster2.userData.componentName+'</li>');
						selectedTool = 'eyeTool';
						orbitControls.enableRotate = true;
						toolButtons.removeClass('selectedTool');
						$('#eyeTool').addClass('selectedTool');
					}
				}
			}
		}else{
			if(delay < 200)
				selectObject(event);
		}
	}

}

// After moving a component modify it's reference in arrays for it and it's children
function updateObjectLevel(oldLevel, movingComponent, newLevel){
	objectsPerLevels[oldLevel] = arrayRemove(objectsPerLevels[oldLevel], movingComponent.parent);
	movingComponent.parent.userData.nestingLevel = newLevel;
	if(objectsPerLevels.length <= newLevel){
		objectsPerLevels.push([]);
	}
	if(nestingLevels.length <= newLevel){
		nestingLevels.push([]);
	}
	objectsPerLevels[newLevel].push(movingComponent.parent);

	movingComponent.children.forEach(function(child){
		updateObjectLevel(oldLevel+1, child.children[0], newLevel+1)
	});
}

function selectObject(event){
	if(!enableAutoFocus){
		raycaster.setFromCamera(mouse, camera);
		let intersects = raycaster.intersectObjects(sceneComponentsObj.children, true);
		if(intersects.length > 0) {
			selectedComponent = intersects[0].object.parent;
			addSelectedObject( selectedComponent );
			outlinePass.selectedObjects = selectedObjects;
			showComponentInfo(selectedComponent);
		}else{
			outlinePass.selectedObjects = [];
			selectedComponent = null;
			$('.componentLabel').removeClass('selectedComponent');
			rightPannel.css('display', 'none');
		}
	}
}

function showComponentInfo(component){
// right panel completion
	const componentId = component.userData.componentID;
	$('.componentLabel').removeClass('selectedComponent');
	sceneComponentList.find('#c'+componentId).addClass('selectedComponent');
	pannelSectionID.html(component.userData.componentID);
	pannelSectionName.val(component.userData.componentName);
	let derivationInfo = '';
	if(component.userData.derivedFrom !== '')
		derivationInfo = ' (from '+component.userData.derivedFrom+ ')';
	pannelSectionType.html(component.userData.componentType + derivationInfo);
	$('#componentLevel').html(component.userData.nestingLevel);
	$('#componentGridPosition').html('(' +Math.round(component.position.x)+ ';' +Math.round(component.position.y)+ ';' +Math.round(component.position.z)+ ')');
	pannelSectionLinks.html('');
	component.userData.links.forEach(function(link){
		pannelSectionLinks.append('<li>'+link.userData.hoster1.userData.componentName+' - '+link.userData.hoster2.userData.componentName+'</li>');
	});
	const pannelSectionChildren = $('#componentChildren');
	pannelSectionChildren.html('');
	component.children[0].children.forEach(function(child){
		pannelSectionChildren.append('<li>' +child.userData.componentName+ '</li>');
	});
	rightPannel.css('display', 'block');
}

// add object to apply outline effect
function addSelectedObject( object ) {
	selectedObjects = [];
	selectedObjects.push( object );
}

/// FONCTIONS ADDITIONNELLES ///
// espace les composants du niveau 0 entre eux
function realignerGrille(){
	const GRID_MARGIN = 10;
	const GRID_START = 5;	// half of grid margin
	const CELL_WIDTH = nestingLevels['level0']['width'];
	const CELL_DEPTH = nestingLevels['level0']['depth'];
	const CELL_SPACEMENT = 2;
	const NB_COLUMNS = Math.ceil(Math.sqrt(objectsPerLevels[0].length));
	const NB_LINES = Math.ceil(objectsPerLevels[0].length / NB_COLUMNS);
	// initializing a 2D array which describe objects position in our grid
	position_array = Array(NB_COLUMNS + GRID_MARGIN);
	for (let i = 0; i < NB_COLUMNS + GRID_MARGIN; i++) {
		position_array[i] = new Array(NB_LINES + GRID_MARGIN);
		for (let j = 0; j < NB_LINES + GRID_MARGIN; j++) {
			position_array[i][j] = 0;
		}
	}

	// replacing objects
	objectsPerLevels[0].forEach( function(component) {
		// getting object current position
		let pos_x = component.position.x;
		let pos_z = component.position.z;
		let index_x = 0;
		let index_z = 0;

		// if component position is good
		if ((pos_x % (CELL_SPACEMENT+CELL_WIDTH)) == 0 && (pos_z % (CELL_SPACEMENT+CELL_DEPTH)) == 0){
			index_x = (pos_x / (CELL_SPACEMENT+CELL_WIDTH)) + GRID_START;
			index_z = (pos_z / (CELL_SPACEMENT+CELL_DEPTH)) + GRID_START;
			component.position.y = -0.5 + (component.children[0].geometry.parameters.height/2);
		}else if(component.userData.grid != null) {
			index_x = component.userData.grid.x;
			index_z = component.userData.grid.y;
			// move component
			component.position.x = (index_x - GRID_START) * (CELL_SPACEMENT+CELL_WIDTH);
			component.position.y = -0.5 + (component.children[0].geometry.parameters.height/2);
			component.position.z = (index_z - GRID_START) * (CELL_SPACEMENT+CELL_DEPTH);
		}else{	// if the object are not aligned with the grid
				// move component to the nearest blank grid cell
				// find and move component to the first blank grid cell
			index_x = GRID_START-1;
			let trouve = false;
			while (index_x < (NB_COLUMNS+GRID_START) && trouve === false){
				index_x++;
				index_z = GRID_START-1;
				while (index_z < (NB_LINES+GRID_START) && trouve === false){
					index_z++;
					if(position_array[index_x][index_z] === 0)
						trouve = true;
				}
			}
			// move component
			component.position.x = (index_x - GRID_START) * (CELL_SPACEMENT+CELL_WIDTH);
			component.position.y = -0.5 + (component.children[0].geometry.parameters.height/2);
			component.position.z = (index_z - GRID_START) * (CELL_SPACEMENT+CELL_DEPTH);
		}
		// save position in array
		component.userData.grid = new Vector2(index_x, index_z);
		position_array[index_x][index_z] ++;

		// if the cell is already occupied
		if(position_array[index_x][index_z] >= 2){
			position_array[index_x][index_z] --;
			// find and move component to the first blank grid cell
			index_x = GRID_START-1;
			let trouve = false;
			while (index_x < (NB_COLUMNS+GRID_START) && trouve === false){
				index_x++;
				index_z = GRID_START-1;
				while (index_z < (NB_LINES+GRID_START) && trouve === false){
					index_z++;
					if(position_array[index_x][index_z] === 0)
						trouve = true;
				}
			}
			// save position in array
			position_array[index_x][index_z] ++;
			// move component
			component.position.x = (index_x - GRID_START) * (CELL_SPACEMENT+CELL_WIDTH);
			component.position.z = (index_z - GRID_START) * (CELL_SPACEMENT+CELL_DEPTH);
		}
	});
	needRelink = true;
}

// realign a single object with the grid after moving it
function placeParent(component){
	const GRID_MARGIN = 10;
	const GRID_START = 5;	// half of grid margin
	const CELL_WIDTH = nestingLevels['level0']['width'];
	const CELL_DEPTH = nestingLevels['level0']['depth'];
	const CELL_SPACEMENT = 2;
	const NB_COLUMNS = Math.ceil(Math.sqrt(objectsPerLevels[0].length));
	const NB_LINES = Math.ceil(objectsPerLevels[0].length / NB_COLUMNS);
	const pos_x = component.position.x;
	const pos_z = component.position.z;
	// trouver pos_x et pos_z les plus proche tel que :
	// ((pos_x % (CELL_SPACEMENT+CELL_WIDTH)) === 0 && (pos_z % (CELL_SPACEMENT+CELL_DEPTH)) === 0)
	let index_x = Math.round(pos_x / (CELL_SPACEMENT + CELL_WIDTH)) + GRID_START;
	let index_z = Math.round(pos_z / (CELL_SPACEMENT + CELL_DEPTH)) + GRID_START;

	// check if grid overflow, if so check nearest grid border
	if (index_x < 0)
		index_x = 0;
	else if (index_x >= NB_COLUMNS+GRID_MARGIN)
		index_x = (NB_COLUMNS+GRID_MARGIN)-1;
	if (index_z < 0)
		index_z = 0;
	else if (index_z >= NB_LINES+GRID_MARGIN)
		index_z = (NB_LINES+GRID_MARGIN)-1;

	// if cell is not occupied : move component
	if(position_array[index_x][index_z] == 0){
		// update component position in array
		position_array[component.userData.grid.x][component.userData.grid.y] --;
		position_array[index_x][index_z] ++;
		// update component position
		component.position.x = (index_x - GRID_START) * (CELL_SPACEMENT+CELL_WIDTH);
		component.position.z = (index_z - GRID_START) * (CELL_SPACEMENT+CELL_DEPTH);
		component.userData.grid.x = index_x;
		component.userData.grid.y = index_z;

		needRelink = true;

		//realignerGrille();
	}else{
		component.position.x = (component.userData.grid.x - GRID_START) * (CELL_SPACEMENT+CELL_WIDTH);
		component.position.z = (component.userData.grid.y - GRID_START) * (CELL_SPACEMENT+CELL_DEPTH);
	}

}

// zoom sur l'objet séléctionné
function autoFocus(){
	if(enableAutoFocus && selectedComponent){
		const distanceFromeTarget = Math.sqrt(
			Math.pow((camera.position.x - selectedComponent.position.x), 2) +
			Math.pow((camera.position.y - selectedComponent.position.y), 2) +
			Math.pow((camera.position.z - selectedComponent.position.z), 2)
		);

		if(distanceFromeTarget > config_focusDistance + config_tolerance){		// rapprochement
			camera.position.x -= (camera.position.x - selectedComponent.position.x) / config_diviseurVitesse;
			camera.position.y -= (camera.position.y - selectedComponent.position.y) / config_diviseurVitesse;
			camera.position.z -= (camera.position.z - selectedComponent.position.z) / config_diviseurVitesse;
		}else if(distanceFromeTarget <= config_focusDistance){		// eloignement
			camera.position.x += (camera.position.x - selectedComponent.position.x) / config_diviseurVitesse;
			camera.position.y += (camera.position.y - selectedComponent.position.y) / config_diviseurVitesse;
			camera.position.z += (camera.position.z - selectedComponent.position.z) / config_diviseurVitesse;
		}else{
			enableAutoFocus = false;
		}
	}
}

function generateTexture(componentType, name, color, width, height, tagColor, logo, action, component = selectedComponent) {
	width *= 500;
	height *= 500;

	const canvas = document.createElement('canvas');
	canvas.width  = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	// Background
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
	// Label Type
	ctx.font = '70pt Calibri';
	ctx.textAlign = 'left';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(componentsList[componentType]['name'], (height/3)+10, height/6, width-(height/3)-120);
	// Label Name
	ctx.font = '90pt Calibri';
	ctx.textAlign = 'center';
	ctx.fillText(name, width/2, height/2, width-20);
	// TagColor
	ctx.beginPath();
	ctx.rect(width-100, 0, 100, 100);
	ctx.fillStyle = tagColor;
	ctx.fill();
	ctx.closePath();
	// Logo
	const img = new Image();   // Crée un nouvel élément Image
	img.addEventListener('load', function() {
		ctx.drawImage(img, 0, 0, height/3, height/3);

		const texture = new THREE.CanvasTexture(canvas);

		const material = [
			new THREE.MeshStandardMaterial({ map: texture }),	// Right side
			new THREE.MeshStandardMaterial({ map: texture }),	// Left side
			new THREE.MeshStandardMaterial({ color: color }),	// Top side
			new THREE.MeshStandardMaterial({ color: color }),	// Bottom side
			new THREE.MeshStandardMaterial({ map: texture }),	// Front side
			new THREE.MeshStandardMaterial({ map: texture })	// Back side
		];
		if(action === 'createComponent')
			generateComponent(componentType, material);
		else if(action === 'updateTexture')
			regenerateTexture(component, material);

	}, false);
	img.src = './public/textures/logos/'+logo;
}

function generateComponent(componentType, material) {
	let count = 0; // nesting level of added children
	let cmpnt = selectedComponent;
	if(cmpnt !== null)
		cmpnt = cmpnt;
	while(cmpnt != scene && cmpnt !== null){
		cmpnt = cmpnt.parent.parent;
		count ++;
	}
	if(count >= Object.keys(nestingLevels).length){
		nestingLevels["level"+count] = {width: 1.2, depth: 1.2};
	}

	const cWidth = nestingLevels['level'+count]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cDepht = nestingLevels['level'+count]['depth'];

	const finalObject = new THREE.Group();
	let newCmpnt = new THREE.Mesh( new THREE.BoxGeometry( cWidth, cHeight, cDepht ), material );

	finalObject.userData.nestingLevel = count;
	finalObject.userData.componentType = componentType;
	finalObject.userData.componentID = lastID;
	finalObject.userData.links = [];
	const cName = finalObject.userData.componentName = componentsList[componentType]['name'] + lastID;
	const cColor = componentsList[componentType]['color'];
	const cLogo = componentsList[componentType]['logo'];
	const cTagColor = '#70bf3b';

	finalObject.add(newCmpnt);

	const types = getAllObjectTypes(componentType);
	const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.1, 8 );
	const capMaterial = new THREE.MeshStandardMaterial({ color : '#209b20' });
	const reqMaterial = new THREE.MeshStandardMaterial({ color : '#a50404' });
	const capacities = new THREE.Group();
	const requirements = new THREE.Group();
	finalObject.add(capacities);
	finalObject.add(requirements);

	types.forEach(function(type){
		componentsList[type]['capacities']['linkedTo'].forEach(function(capacity){
			const cylinder = new THREE.Mesh( geometry, capMaterial );
			cylinder.userData.capacityName = capacity;
			capacities.add(cylinder);
			cylinder.position.y = -0.3;
			cylinder.rotateX(THREE.Math.degToRad(90));
		});
		componentsList[type]['requirements']['linkedTo'].forEach(function(requirement){
			const cylinder = new THREE.Mesh( geometry, reqMaterial );
			cylinder.userData.requirmentName = requirement;
			requirements.add(cylinder);
			cylinder.position.y = -0.3;
			cylinder.rotateX(THREE.Math.degToRad(90)); // Math.PI / 2; // cylinder.rotation.x = degrees * Math.PI / 180;
		});
	});


	generateTexture(componentType, cName, cColor, cWidth, cHeight, cTagColor, cLogo, 'updateTexture', finalObject);

	if(!selectedComponent)
		sceneComponentsObj.add(finalObject);
	else
		selectedComponent.children[0].add(finalObject);

	if(objectsPerLevels[count] !== undefined) {
		objectsPerLevels[count][objectsPerLevels[count].length] = finalObject;
	}else{
		objectsPerLevels.push([]);
		objectsPerLevels[count][0] = finalObject;
	}


	if(selectedComponent !== null) {
		finalObject.position.y += newCmpnt.geometry.parameters.height;
		placeRequAndCap(finalObject);
		checkStrechNeeds(selectedComponent);
		$('#l' + selectedComponent.userData.componentID).append(
			'<li class="componentlistItem" id="' + lastID + '">' +
			'<div class="componentLabel" id="c' + lastID + '">' + finalObject.userData.componentName + '</div>' +
			'<ul class="sceneComponentslist" id="l' + lastID + '"></ul>' +
			'</li>'
		);
	}else{
		placeRequAndCap(finalObject);
		finalObject.position.set(0, 0, 0.1);
		sceneComponentList.append('<li class="componentlistItem" id="'+lastID+'">'+
			'<div class="componentLabel" id="c'+lastID+'">'+finalObject.userData.componentName+'</div>'+
			'<ul class="sceneComponentslist" id="l'+lastID+'"></ul>'+
			'<br/></li>');
	}
	lastID++;

	initDragControls();
	if(selectedTool !== 'moveTool'){
		dragControls.enabled = false;
		dragControls.deactivate();
	}

	realignerGrille();
}

// adapt the requirments and capacities's position proportionally to the components size
function placeRequAndCap(cmpnt){
	let positionX = - (cmpnt.children[0].geometry.parameters.width / 2) + 0.2;
	const positionZ = cmpnt.children[0].geometry.parameters.depth / 2;
	// update positoion of capacities
	cmpnt.children[1].children.forEach(function(capacity){
		capacity.position.x = positionX;
		capacity.position.y = -0.3;
		capacity.position.z = positionZ + (capacity.geometry.parameters.height / 2);
		positionX += 0.25;
	});
	// update positoion of requirments
	cmpnt.children[2].children.forEach(function(requirement){
		requirement.position.x = positionX;
		requirement.position.y = -0.3;
		requirement.position.z = positionZ + (requirement.geometry.parameters.height / 2);
		positionX += 0.25;
	});
}

// adjust children spacement within a component and resize it (stretch or shrink)
function checkStrechNeeds(parentComponent){
	let resizeLevel = false;
	const nbChildren = parentComponent.children[0].children.length+1;
	const nbLines = Math.ceil(Math.sqrt(nbChildren));
	const nbColumn = Math.ceil(nbChildren / nbLines);
	const couche = parentComponent.userData.nestingLevel;
	const coucheEnfant = couche+1;
	if(coucheEnfant >= Object.keys(nestingLevels).length){
		nestingLevels["level"+coucheEnfant] = {width: 1.2, depth: 1.2};
	}
	config_espacement = 0.6;

	let childWidth = nestingLevels['level'+coucheEnfant]['width'];
	let childDepth = nestingLevels['level'+coucheEnfant]['depth'];
	let spacingX = (childWidth * 0.2) + config_espacement;
	let spacingZ = (childDepth * 0.2) + config_espacement;

	// new parent scale
	let newWidth;
	const newHeight = componentsList[parentComponent.userData.componentType]['height'];
	let newDepth;
	newWidth = (childWidth * (nbLines)) + (spacingX * (nbLines-1)) + 0.6;
	newDepth = (childDepth * (nbColumn)) + (spacingZ * (nbColumn-1)) + 0.6;

	if(newWidth > nestingLevels['level'+couche]['width']){
		nestingLevels['level'+couche]['width'] = newWidth;
		resizeLevel = true;
	}
	if(newDepth > nestingLevels['level'+couche]['depth']){
		nestingLevels['level'+couche]['depth'] = newDepth;
		resizeLevel = true;
	}

	// grossissement des composants du même niveau
	if(resizeLevel){
		for (const object of objectsPerLevels[couche]) {
			const cComponentType = object.userData.componentType;
			const cTagColor = '#70bf3b';
			const cColor = componentsList[cComponentType]['color'];
			const cLogo = componentsList[cComponentType]['logo'];
			const cName = object.userData.componentName;
			object.children[0].geometry = new THREE.BoxGeometry(nestingLevels['level'+couche]['width'], newHeight, nestingLevels['level'+couche]['depth']);
			placeRequAndCap(object);
			generateTexture(cComponentType, cName, cColor, nestingLevels['level'+couche]['width'], object.children[0].geometry.parameters.height, cTagColor, cLogo, 'updateTexture', object);
			checkStrechNeeds(object);
		}
	}

	//placement & espacement enfants
	let count = 1;
	parentComponent.children[0].children.forEach(child => {
		const ligneCourante = count % nbColumn;
		const coloneCourante = Math.floor(count / nbColumn);
		child.position.x = (coloneCourante*childWidth) + (spacingX*coloneCourante) - (nestingLevels['level'+couche]['width']/2) + (childWidth/2) + (config_espacement/2);
		child.position.y = 0 + child.children[0].geometry.parameters.height;
		child.position.z = (ligneCourante*childDepth) + (spacingZ*ligneCourante) - (nestingLevels['level'+couche]['depth']/2) + (childDepth/2) + (config_espacement/2);
		count++;
	});
	// respace at level0
	//config_distance = nestingLevels['level0']['width'] + (nestingLevels['level0']['width']/2);
	realignerGrille();

	if(parentComponent.parent.parent != scene && resizeLevel){
		checkStrechNeeds(parentComponent.parent.parent);
	}
}

// for debugging purpose, print 2D array of components into the console
function showArrayComponents(array2D){
	let count = 0;
	array2D.forEach(function (level){
		console.log(count);
		count++;
		level.forEach(function (component){
			console.log("	" +component.userData.componentName);
		});
	});
}

// check if components have to be resized after a component was deleted and respace it's children
function checkShrinkNeeds(){
	// parcours de tous les niveaux d'imbrication en partant du plus haut
	for(let level = (objectsPerLevels.length)-1; level >= 0; level--){

		let resizeLevel = false;	// pass it to true if shrinking is needed
		let biggestComponent = null;
		// get The biggest component of the level
		objectsPerLevels[level].forEach(function(component){
			if(biggestComponent === null)
				biggestComponent = component;
			else if(component.children[0].children.length > biggestComponent.children[0].children.length)
				biggestComponent = component;
		});

		// If there is at list one component on this level
		if(biggestComponent !== null){
			const nbChild = biggestComponent.children[0].children.length + 1;
			let newWidth, newHeight, newDepth;
			const nbLines = Math.ceil(Math.sqrt(nbChild));
			const nbColumn = Math.ceil(nbChild / nbLines);
			const coucheEnfant = level +1;
			let childWidth = 1.2, childDepth = 1.2;
			if(coucheEnfant < Object.keys(nestingLevels).length){
				childWidth = nestingLevels['level'+coucheEnfant]['width'];
				childDepth = nestingLevels['level'+coucheEnfant]['depth'];
			}
			let spacingX = (childWidth * 0.2) + config_espacement;
			let spacingZ = (childDepth * 0.2) + config_espacement;

			// calcul new component's level dimensions
			if((nbChild-1) === 0){
				newWidth = componentsList[biggestComponent.userData.componentType]['width'];
				newHeight = componentsList[biggestComponent.userData.componentType]['height'];
				newDepth = componentsList[biggestComponent.userData.componentType]['depth'];
			}else{
				newWidth = (childWidth * (nbLines)) + (spacingX * (nbLines-1)) + 0.6;
				newHeight = componentsList[biggestComponent.userData.componentType]['height'];
				newDepth = (childDepth * (nbColumn)) + (spacingZ * (nbColumn-1)) + 0.6;
			}
			// Update the level information array "nestingLevels"
			if(newWidth < nestingLevels['level'+level]['width']){
				nestingLevels['level'+level]['width'] = newWidth;
				resizeLevel = true;
			}
			if(newDepth < nestingLevels['level'+level]['depth']){
				nestingLevels['level'+level]['depth'] = newDepth;
				resizeLevel = true;
			}

			// rétressisement des composants du même niveau
				objectsPerLevels[level].forEach(function(component){
					const cComponentType = component.userData.componentType;
					const cTagColor = '#70bf3b';
					const cColor = componentsList[cComponentType]['color'];
					const cLogo = componentsList[cComponentType]['logo'];
					const cName = component.userData.componentName;
					component.children[0].geometry = new THREE.BoxGeometry(nestingLevels['level' + level]['width'], newHeight, nestingLevels['level' + level]['depth']);
					placeRequAndCap(component);
					generateTexture(cComponentType, cName, cColor, nestingLevels['level' + level]['width'], biggestComponent.children[0].geometry.parameters.height, cTagColor, cLogo, 'updateTexture', component);

					//placement & espacement enfants
					let count = 1;
					component.children[0].children.forEach(child => {
						const ligneCourante = count % nbColumn;
						const coloneCourante = Math.floor(count / nbColumn);
						child.position.z = (ligneCourante*childDepth) + (spacingZ*ligneCourante) - (nestingLevels['level'+level]['depth']/2) + (childDepth/2) + (config_espacement/2);
						child.position.x = (coloneCourante*childWidth) + (spacingX*coloneCourante) - (nestingLevels['level'+level]['width']/2) + (childWidth/2) + (config_espacement/2);
						count++;
					});
				});
		}else{	//if there is no component on the level
			nestingLevels['level'+level]['width'] = 1.2;
			nestingLevels['level'+level]['depth'] = 1.2;
		}
	}
	// respace at level0
	config_distance = nestingLevels['level0']['width'] + (nestingLevels['level0']['width']/2);
	//realignerGrille();
}

// reaffect a new material(with a new texture) to an existing component
function regenerateTexture(component, material){
	component.children[0].material = material;
}

// delete an object with all its children and their links
function deleteObjectHierarchie(component){
	component.children[0].children.forEach(function(child){
		//deleteLinks(child);
		deleteObjectHierarchie(child);
	});
	deleteLinks(component);

	const lv = component.userData.nestingLevel;
	for( let i = 0; i < objectsPerLevels[lv].length; i++){
		if ( objectsPerLevels[lv][i] === component) {
			objectsPerLevels[lv].splice(i, 1);
		}
	}
	//delete from sceneComponentsObj
	for( let i = 0; i < sceneComponentsObj.length; i++){
		if ( sceneComponentsObj[i] === selectedComponent) {
			sceneComponentsObj.splice(i, 1);
		}
	}
}

// delete all links of a single component
function deleteLinks(component){
	component.userData.links.forEach(function(link){
		let index = null;
		let count = 0;
		if(link.userData.hoster1 != component){
			link.userData.hoster1.userData.links.forEach(function(alink){
				if(alink.userData.hoster1 == link.userData.hoster1 && alink.userData.hoster2 == link.userData.hoster2)
					index = count;
				count++;
			});
			if(index != null)
				link.userData.hoster1.userData.links.splice(index,1);
		}else{
			link.userData.hoster2.userData.links.forEach(function(alink){
				if(alink.userData.hoster1 == link.userData.hoster1 && alink.userData.hoster2 == link.userData.hoster2)
					index = count;
				count++;
			});
			if(index != null)
				link.userData.hoster2.userData.links.splice(index,1);
		}
		sceneLinksObj.remove(link);
	});
}

function drawLink(cmpnt1, cmpnt2){
	const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const points = [];
	let globalPos1 = new Vector3();
	let globalPos2 = new Vector3();

	// cmpnt1 compatible avec cmpnt2 ?
	let hub1 = null;
	let hub2 = null;
	//const types1 = getAllObjectTypes(cmpnt1);
	//const types2 = getAllObjectTypes(cmpnt2);

	let i = 0;
	let j = 0;
	let trouve = false;
	// check each capacities of cmpnt1
	while(i < cmpnt1.children[1].children.length && trouve === false){
		// get all types of current cmpnt1's hub capacities
		let types1 = getAllObjectSuccessor(cmpnt1.children[1].children[i].userData.capacityName);
		let cName1 = cmpnt1.userData.componentType;
		let cName2 = cmpnt2.userData.componentType;
		if(types1.includes(cName2)){
			hub1 = cmpnt1.children[1].children[i];

			while(j < cmpnt2.children[1].children.length && trouve === false){
				let types2 = getAllObjectSuccessor(cmpnt2.children[1].children[j].userData.capacityName);
				if(types2.includes(cName1)){
					hub2 = cmpnt2.children[1].children[j];
					trouve = true;
					console.log('C to C cor');
				}
				j++;
			}
			j = 0;
			while(j < cmpnt2.children[2].children.length && trouve === false){
				let types2 = getAllObjectSuccessor(cmpnt2.children[2].children[j].userData.requirmentName);
				if(types2.includes(cName1)){
					hub2 = cmpnt2.children[2].children[j];
					trouve = true;
					console.log('C to R cor');
				}
				j++;
			}
			j = 0;
		}
		i++;
	}
	i = 0;
	j = 0;
	// check each requirements of cmpnt1
	while(i < cmpnt1.children[2].children.length && trouve === false){
		// get all types of current cmpnt1's hub capacities
		let types1 = getAllObjectSuccessor(cmpnt1.children[2].children[i].userData.requirmentName);
		let cName1 = cmpnt1.userData.componentType;
		let cName2 = cmpnt2.userData.componentType;
		if(types1.includes(cName2)){
			hub1 = cmpnt1.children[2].children[i];

			while(j < cmpnt2.children[1].children.length && trouve === false){
				let types2 = getAllObjectSuccessor(cmpnt2.children[1].children[j].userData.capacityName);
				if(types2.includes(cName1)){
					hub2 = cmpnt2.children[1].children[j];
					trouve = true;
					console.log('R to C cor');
				}
				j++;
			}
			j = 0;
			while(j < cmpnt2.children[2].children.length && trouve === false){
				let types2 = getAllObjectSuccessor(cmpnt2.children[2].children[j].userData.requirmentName);
				if(types2.includes(cName1)){
					hub2 = cmpnt2.children[2].children[j];
					trouve = true;
					console.log('R to R cor');
				}
				j++;
			}
			j = 0;
		}
		i++;
	}

	if(hub1 != null && hub2 != null){
		const xMoves = cmpnt1.userData.grid.x - cmpnt2.userData.grid.x;
		const zMoves = cmpnt1.userData.grid.y - cmpnt2.userData.grid.y;

		console.log(xMoves+ ' ; ' +zMoves);

		let startPos = new Vector3();
		let endPos = new Vector3();
		let hub1Pos = new Vector3();
		let hub2Pos = new Vector3();
		let xPos = 0;
		let xTarget = 0;
		let zPos = 0;
		let zTarget = 0;
		let link = new THREE.Group();

		// determine start and target position then draw link in two fragment
		cmpnt1.getWorldPosition(startPos);
		cmpnt2.getWorldPosition(endPos);
		hub1.getWorldPosition(hub1Pos);
		hub2.getWorldPosition(hub2Pos);

		zPos = startPos.z + 1 + (cmpnt1.children[0].geometry.parameters.depth / 2);
		zTarget = endPos.z + 1 + (cmpnt2.children[0].geometry.parameters.depth / 2);

		if(xMoves > 0){
			console.log('xMoves > 0');
			xPos = startPos.x - 1 - (cmpnt1.children[0].geometry.parameters.width / 2);
			xTarget = endPos.x + 1 + (cmpnt2.children[0].geometry.parameters.width / 2);
			addCornerPipe(new Vector3(hub1Pos.x, hub1Pos.y, hub1Pos.z + 1 - 0.05), link, false);
			addCornerPipe(new Vector3(hub2Pos.x, hub2Pos.y, hub2Pos.z + 1 - 0.05), link, true);
			// pipe that link corners & middle path
			addStraightPipe(new Vector3(hub1Pos.x - 0.36, hub1Pos.y, hub1Pos.z + 1 - 0.05), new Vector3(xPos, hub1Pos.y, zPos), link, true);
			addStraightPipe(new Vector3(hub2Pos.x + 0.36, hub2Pos.y, hub2Pos.z + 1 - 0.05), new Vector3(xTarget, hub2Pos.y, zTarget), link, true);
		}else if (xMoves < 0){
			console.log('xMoves < 0');
			xPos = startPos.x + 1 + (cmpnt1.children[0].geometry.parameters.width / 2);
			xTarget = endPos.x - 1 - (cmpnt2.children[0].geometry.parameters.width / 2);
			addCornerPipe(new Vector3(hub1Pos.x, hub1Pos.y, hub1Pos.z + 1 - 0.05), link, true);
			addCornerPipe(new Vector3(hub2Pos.x, hub2Pos.y, hub2Pos.z + 1 - 0.05), link, false);
			// pipe that link corners & middle path
			addStraightPipe(new Vector3(hub1Pos.x + 0.36, hub1Pos.y, hub1Pos.z + 1 - 0.05), new Vector3(xPos, hub1Pos.y, zPos), link, true);
			addStraightPipe(new Vector3(hub2Pos.x - 0.36, hub2Pos.y, hub2Pos.z + 1 - 0.05), new Vector3(xTarget, hub2Pos.y, zTarget), link, true);
		}else{	// xMoves === 0
			console.log('xMoves === 0');
			xPos = startPos.x - 1 - (cmpnt1.children[0].geometry.parameters.width / 2);
			xTarget = endPos.x - 1 - (cmpnt2.children[0].geometry.parameters.width / 2);
			addCornerPipe(new Vector3(hub1Pos.x, hub1Pos.y, hub1Pos.z + 1 - 0.05), link, false);
			addCornerPipe(new Vector3(hub2Pos.x, hub2Pos.y, hub2Pos.z + 1 - 0.05), link, false);
			// pipe that link corners & middle path
			addStraightPipe(new Vector3(hub1Pos.x - 0.36, hub1Pos.y, hub1Pos.z + 1 - 0.05), new Vector3(xPos, hub1Pos.y, zPos), link, true);
			addStraightPipe(new Vector3(hub2Pos.x - 0.36, hub2Pos.y, hub2Pos.z + 1 - 0.05), new Vector3(xTarget, hub2Pos.y, zTarget), link, true);
		}

		startPos.x = xPos;
		startPos.y = hub1Pos.y;
		startPos.z = zPos;
		endPos.x = xTarget;
		endPos.y = hub2Pos.y;
		endPos.z = zTarget;
		// pipe that link corners & hubs
		addStraightPipe(new Vector3(hub1Pos.x, hub1Pos.y, hub1Pos.z + 0.05), new Vector3(hub1Pos.x, hub1Pos.y, hub1Pos.z + 0.6), link, false);
		addStraightPipe(new Vector3(hub2Pos.x, hub2Pos.y, hub2Pos.z + 0.05), new Vector3(hub2Pos.x, hub2Pos.y, hub2Pos.z + 0.6), link, false);

		/*while(xPos !== xTarget || zPos !== zTarget){

		}*/
		//path
		if(xMoves > 1)
			addStraightPipe(startPos, new Vector3(endPos.x, endPos.y, startPos.z), link, true);
		if(zMoves > 1)
			addStraightPipe(new Vector3(endPos.x, endPos.y, startPos.z), endPos, link, false);

		if(link){
			//const line = loadStraightPipe(hub1.getWorldPosition(globalPos1), hub2.getWorldPosition(globalPos2));
			link.userData.linkId = lastLinkID;
			lastLinkID++;
			link.userData.hoster1 = cmpnt1;
			link.userData.hub1 = hub1;
			link.userData.hoster2 = cmpnt2;
			link.userData.hub2 = hub2;
			cmpnt1.userData.links.push(link);
			cmpnt2.userData.links.push(link);
			sceneLinksObj.add(link);
		}
		return link;
	}else{
		customAlert('impossible de lier ' +cmpnt1.userData.componentName+ ' et ' +cmpnt2.userData.componentName);
	}

}

// load the link's 3D model at the right position
function addStraightPipe(point1, point2, link, isOnXAxis){
	let distance;
	if (isOnXAxis){
		distance = point1.x - point2.x;
	}else{
		distance = point1.z - point2.z;
	}

	const geometry = new THREE.CylinderGeometry( 0.1, 0.1, distance, 8 );
	const material = new THREE.MeshStandardMaterial({ color : '#0365ff', side: THREE.DoubleSide });
	const line = new THREE.Mesh( geometry, material );
	line.position.x = (point1.x + point2.x) / 2;
	line.position.y = (point1.y + point2.y) / 2;
	line.position.z = (point1.z + point2.z) / 2;
	line.rotateX(THREE.Math.degToRad(90));
	if(isOnXAxis)
		line.rotateZ(THREE.Math.degToRad(90));

	link.add(line);
}

// load the link's 3D model at the right position
function addCornerPipe(position, link, faceRight){
	const loader = new FBXLoader();
	loader.load( './public/3DModels/Pipes_Corner_baseV3.fbx', function ( object ) {

		object.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
				child.material = new THREE.MeshStandardMaterial({ color : '#0365ff', side: THREE.DoubleSide });
			}
		} );

		object.rotateX(THREE.Math.degToRad(90));
		if(!faceRight)
			object.rotateY(THREE.Math.degToRad(180));
		object.position.x = position.x;
		object.position.y = position.y;
		object.position.z = position.z;
		object.scale.x = 0.001;
		object.scale.y = 0.001;
		object.scale.z = 0.001;

		link.add(object);
	}, undefined, function ( error ) {
		console.error( error );
	} );
}

// replace a link after the parents moved position
function relink(link){
	/*
	const hub1 = link.userData.hub1;
	const hub2 = link.userData.hub2;

	let globalPos1 = new Vector3();
	let globalPos2 = new Vector3();
	const point1 = hub1.getWorldPosition(globalPos1);
	const point2 = hub2.getWorldPosition(globalPos2);
	let distance = Math.sqrt(
		Math.pow((point1.x - point2.x), 2) +
		Math.pow((point1.y - point2.y), 2)+
		Math.pow((point1.z - point2.z), 2)
	);
	const geometry = new THREE.CylinderGeometry( 0.1, 0.1, distance, 8 );
	link.geometry = geometry;
	link.position.x = (point1.x + point2.x) / 2;
	link.position.y = (point1.y + point2.y) / 2;
	link.position.z = (point1.z + point2.z) / 2;
	*/
}

// show a stylised alert
function customAlert(message){
	messageBox.css('opacity', 1);
	messageBox.fadeToggle(100);
	messageBox.html(message);
	messageBox.fadeToggle(2500);
}

// gather the component nesting compatibilities with the ones inherited by its parent
function getlinkingCompatibilities(componentType, cmptCompatibilities = []){
	componentsList[componentType]['requirements']['linkedTo'].forEach(function(compatibility){
		cmptCompatibilities.push(compatibility);
	});
	componentsList[componentType]['capacities']['linkedTo'].forEach(function(compatibility){
		cmptCompatibilities.push(compatibility);
	});
	if(componentsList[componentType]['derivedFrom'] !== ''){
		cmptCompatibilities = getlinkingCompatibilities(componentsList[componentType]['derivedFrom'], cmptCompatibilities);
	}
	return cmptCompatibilities;
}

// gather the component nesting compatibilities with the ones inherited by its parent
function getNestingCompatibilities(componentType, cmptCompatibilities = []){
	componentsList[componentType]['requirements']['nestedOn'].forEach(function(compatibility){
		cmptCompatibilities.push(compatibility);
	});
	componentsList[componentType]['capacities']['nestedOn'].forEach(function(compatibility){
		cmptCompatibilities.push(compatibility);
	});
	if(componentsList[componentType]['derivedFrom'] !== ''){
		cmptCompatibilities = getNestingCompatibilities(componentsList[componentType]['derivedFrom'], cmptCompatibilities);
	}
	return cmptCompatibilities;
}

// get all derived types of an object
function getAllObjectTypes(componentType){
	let types = [componentType];
	while(componentsList[componentType]['derivedFrom'] !== ''){
		types.push(componentsList[componentType]['derivedFrom']);
		componentType = componentsList[componentType]['derivedFrom'];
	}
	return types;
}

// get all object types that inherit from componentType
function getAllObjectSuccessor(componentType, types = []){
	types.push(componentType);

	Object.entries(componentsList).forEach(function(entry){
		if(entry[1]['derivedFrom'] === componentType){
			types = getAllObjectSuccessor(entry[0], types);
		}
	});

	return types;
}

/// EVENEMENTS ///
// Met à jour la taille de la vue si la fenêtre est redimentionée
window.addEventListener('resize', function(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	composer.setSize( window.innerWidth, window.innerHeight );
	effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
});
// add Component
htmlComponentList.on('click', '.paletteComponent', function () {
	const componentType = this.dataset.value;
	const cWidth = nestingLevels['level0']['width'];
	const cHeight = componentsList[componentType]['height'];
	const cColor = componentsList[componentType]['color'];
	const cLogo = componentsList[componentType]['logo'];
	const index = sceneComponentsObj.children.length;
	let ncID = 0;
	if(index > 0)
		ncID = sceneComponentsObj.children[index-1].userData.componentID+1;

	if(selectedComponent == null){
		if(componentsList[componentType]['requirements']['nestedOn'].includes('')){
			generateTexture(componentType, componentType+ncID, cColor, cWidth, cHeight, '#7d2f9e', cLogo, 'createComponent');
		}else{
			customAlert('Ce composant doit être imbriqué');
		}
	}else{
		// gather the component compatibilities with the ones inherited by its parent
		const cmptCompatibilities = getNestingCompatibilities(componentType);
		const parentTypes = getAllObjectTypes(selectedComponent.userData.componentType);

		let compatible = false;
		for(let compatibility of cmptCompatibilities){
			if(parentTypes.includes(compatibility))
				compatible = true;
		}

		if( compatible ){
			generateTexture(componentType, componentType+ncID, cColor, cWidth, cHeight, '#7d2f9e', cLogo, 'createComponent');
		}else{
			customAlert('Ce composant ne peut pas être imbriqué sur '+componentsList[selectedComponent.userData.componentType]['name']);
		}
	}
});
// Select component (activate auto-focus)
$('#hierarchieSection').on('click', "li", function () {
	const cpID = $(this).attr('id');

	objectsPerLevels.forEach(function(level){
		level.forEach(function(component){
			if( cpID == component.userData.componentID ){
				selectedComponent = component;

				addSelectedObject( selectedComponent );
				outlinePass.selectedObjects = selectedObjects;
				orbitControls.target = new THREE.Vector3(component.position.x, component.position.y, component.position.z);

				showComponentInfo(component);
				enableAutoFocus = true;

				return false;
			}
		});
	});
});
// switch selected tool
toolButtons.on('click', function () {
	selectedTool = $(this).attr("id");

	switch(selectedTool){
		case 'eyeTool':
			dragControls.enabled = false;
			dragControls.deactivate();
			orbitControls.enableRotate = true;
			toolButtons.removeClass('selectedTool');
			$('#eyeTool').addClass('selectedTool');
			break;
		case 'moveTool':
			dragControls.enabled = true;
			dragControls.activate();
			orbitControls.enableRotate = false;
			toolButtons.removeClass('selectedTool');
			$('#moveTool').addClass('selectedTool');
			break;
		case 'linkTool':
			dragControls.enabled = false;
			dragControls.deactivate();
			orbitControls.enableRotate = true;
			toolButtons.removeClass('selectedTool');
			$('#linkTool').addClass('selectedTool');
			break;
	}
});
// prevent UI's clicks to have effects on the scene
$('.UI').on('pointerdown', function(){
	preventClick = true;
});
// update name when input
pannelSectionName.on('input', function(){
	const newLabel = $(this).val();
	$('#c'+ selectedComponent.userData.componentID ).html(newLabel);
	selectedComponent.userData.componentName = newLabel;

	const componentType = selectedComponent.userData.componentType;
	const level = selectedComponent.userData.nestingLevel;
	const cWidth = nestingLevels['level'+level]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cColor = componentsList[componentType]['color'];
	const cTagColor = '#70bf3b';
	const cLogo = componentsList[componentType]['logo'];
	generateTexture(componentType, selectedComponent.userData.componentName, cColor, cWidth, cHeight, cTagColor, cLogo, 'updateTexture', selectedComponent);
});
// supprimer un objet
$('#deleteButton').on('click', function(){
	if(selectedComponent){
		$('#'+selectedComponent.userData.componentID).remove();
		//delete from objectsPerLevels
		deleteObjectHierarchie(selectedComponent);
		selectedComponent.parent.remove(selectedComponent);
		selectedComponent = null;
		rightPannel.css('display', 'none');

		checkShrinkNeeds();

		initDragControls();
		if(selectedTool !== 'moveTool'){
			dragControls.enabled = false;
			dragControls.deactivate();
		}
	}
});

// Affichage framerate (debug)
//(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
