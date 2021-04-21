import * as THREE from './libs/three.js/build/three.module.js';
import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';
import { DragControls } from './libs/three.js/examples/jsm/controls/DragControls.js';
import { EffectComposer } from './libs/three.js/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './libs/three.js/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './libs/three.js/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from './libs/three.js/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from './libs/three.js/examples/jsm/shaders/FXAAShader.js';

/// VARIABLES ///

let camera, scene, renderer, orbitControls, dragControls, enableSelection = false, mouse, raycaster,
	selectedTool = 'eyeTool', paletteChild = null,selectedComponent = null, enableAutoFocus = false,
	preventClick = false;
let componentsList, sceneComponentsObj = new THREE.Group();	// Liste de tous les composants existants (palette); liste des composants de la Scene
// postprocessing
let composer, effectFXAA, outlinePass;
let selectedObjects = [];
// config
let config_distance = 5, config_tolerance = 0.2, config_diviseurVitesse = 30, config_focusDistance = 7;
// Loaders
const textureLoaderSky = new THREE.TextureLoader();
textureLoaderSky.setPath( 'public/skybox/' );
// JQuery
const htmlComponentList = $('#componentsSection');
const sceneComponentList = $('#sceneComponentslist');
const pannelSectionID = $('#componentID');
const pannelSectionName = $('#componentName');
const pannelSectionType = $('#componentType');
const rightPannel = $('#rightPannel');
const toolButtons = $('.toolButtons');


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
		LEFT: THREE.MOUSE.PAN,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: THREE.MOUSE.ROTATE
	}
	orbitControls.enablePan = false;
	orbitControls.enableDamping = true;
	orbitControls.minDistance = 2;
	orbitControls.maxDistance = 200;
	orbitControls.target = new THREE.Vector3(0, 1, 0);
	orbitControls.update();

	// Drag control
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement);
	dragControls.deactivate();
	document.addEventListener( 'click', onClick );
	window.addEventListener( 'keydown', onKeyDown );
	window.addEventListener( 'keyup', onKeyUp );

	// ----------------------------------------------
	//initialisation de la liste des composants
	scene.add(sceneComponentsObj);

	//new THREE.MeshStandardMaterial({ color: 0x8288a1 })

	//textures

	componentsList = {
		'serveur' : { 'derivedFrom' : '', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'file.jpg' },
		'serveur de fichier' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'file.jpg' },
		'serveur d\'impression' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'print.png' },
		'serveur d\'application' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'menu.webp' },
		'serveur DNS' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'dns.png' },
		'serveur de messagerie' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'mail.png' },
		'serveur web' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'web.jpg' },
		'serveur de bases de données' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'servBDD.png' },
		'serveur virtuel' : { 'derivedFrom' : 'serveur', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'file.jpg' },
		'jetty' : { 'derivedFrom' : 'serveur virtuel', 'width' : 1, 'height' : 1, 'depht' : 1, 'color' : '#8288a1', 'logo' : 'file.jpg' },
		'router': { 'derivedFrom' : '', 'width' : 1, 'height' : 0.4, 'depht' : 1, 'color' : '#19bfba', 'logo' : 'wifi.png' },
		'apache': { 'derivedFrom' : 'child', 'width' : 1.3, 'height' : 0.2, 'depht' : 1.3, 'color' : '#a82b18', 'logo' : 'apache.png' },
		'php': { 'derivedFrom' : 'child', 'width' : 1.3, 'height' : 0.2, 'depht' : 1.3, 'color' : '#3065ba', 'logo' : 'php.png' },
		'database': { 'derivedFrom' : 'child', 'width' : 1.3, 'height' : 0.2, 'depht' : 1.3, 'color' : '#db852a', 'logo' : 'db.png' },
		'nodejs': { 'derivedFrom' : 'child', 'width' : 1.3, 'height' : 0.2, 'depht' : 1.3, 'color' : '#2cab4c', 'logo' : 'nodejs.jpg' }
	};

	let i = 0;
	Object.entries(componentsList).forEach(function(component) {
		if(component[1]['derivedFrom'] === 'child'){
			htmlComponentList.append('<div class="paletteComponent addChildButtons" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
										'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
										'<span>'+component[0]+'</span>'+
									'</div><br/>');
		}
		else if(component[1]['derivedFrom'] === ''){
			htmlComponentList.append('<div class="paletteComponent addComponentButtons" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
				'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
				'<span>'+component[0]+'</span>'+
				'</div><br/>');
		}
		else if(componentsList[ component[1]['derivedFrom'] ]['derivedFrom'] === ''){
			htmlComponentList.append('<div class="paletteComponent addComponentButtons derivedComponent" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
				'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
				'<span>'+component[0]+'</span>'+
				'</div><br/>');
		}
		else{
			htmlComponentList.append('<div class="paletteComponent addComponentButtons derivedComponent2" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
				'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
				'<span>'+component[0]+'</span>'+
				'</div><br/>');
		}
		
		i++;
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
	ajustementEspacement();
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


/// FONCTIONS ADDITIONNELLES ///
// espace les composants entre eux
function ajustementEspacement(){
	sceneComponentsObj.children.forEach(component => {
		let haveNeighbour = false;
		let lastDistance = null;
		let nearestNeighbour = null;
		component.position.y = 0.2*component.children.length;
		sceneComponentsObj.children.forEach(neighbour => {
			if(component !== neighbour){
				let distance = Math.sqrt(
					Math.pow((component.position.x - neighbour.position.x), 2) +
					Math.pow((component.position.z - neighbour.position.z), 2)
					);
				if(nearestNeighbour == null){
					lastDistance = distance;
					nearestNeighbour = neighbour;
				}else if(distance < lastDistance){
					lastDistance = distance;
					nearestNeighbour = neighbour;
				}

				if(distance === 0){
					component.position.x += Math.random();
					component.position.z += Math.random();
					haveNeighbour = true;
				}else if(distance <= config_distance){		// eloignement
					component.position.x += (component.position.x - neighbour.position.x) / config_diviseurVitesse;
					component.position.z += (component.position.z - neighbour.position.z) / config_diviseurVitesse;
					haveNeighbour = true;
				} else if(distance >= config_distance - config_tolerance && distance <= config_distance + config_tolerance){
					haveNeighbour = true;
				}
			}
		});
		// rapprochement
		if(!haveNeighbour && nearestNeighbour){	// nearestNeighbour will be replaced with parent element in futur update
			if(lastDistance > config_distance + config_tolerance){
				component.position.x -= (component.position.x - nearestNeighbour.position.x) / config_diviseurVitesse;
				component.position.z -= (component.position.z - nearestNeighbour.position.z) / config_diviseurVitesse;
			}
		}
	});
}

// zoom sur l'objet séléctionné
function autoFocus(){
	if(enableAutoFocus && selectedComponent){
		let distanceFromeTarget = Math.sqrt(
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

function onKeyDown( event ) {
	// reset camera's rotation pivot
	if(event.keyCode === 32)
		orbitControls.target = new THREE.Vector3(0, 1, 0);
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
	if(dragControls.enabled)
		enableSelection = false;
}

function onClick( event ) {
	if(preventClick){
		preventClick = false;
		return;
	}
	if(paletteChild && selectedComponent){
		const pComponentType = selectedComponent.userData.componentType;
		const pTagColor = '#FF0000';
		const pColor = componentsList[pComponentType]['color'];
		const pLogo = componentsList[pComponentType]['logo'];

		let componentType = paletteChild.userData.componentType;
		selectedComponent.add(paletteChild);
		selectedComponent.geometry = new THREE.BoxGeometry(1, 1 + (0.4*selectedComponent.children.length), 1);
		generateTexture(pComponentType, pColor, 1, 1 + (0.4*selectedComponent.children.length), pTagColor, pLogo, false);
		selectedComponent.position.y = (0.2 * selectedComponent.children.length);
		let childIndex = selectedComponent.children.length - 1;
		let arithmeticSeries = (0.2 * selectedComponent.children.length); // arithmeticSeries's Uo

		selectedComponent.children.forEach(child => {
			child.position.y = arithmeticSeries;
			// Un = (Un-1) - r - 0.2
			arithmeticSeries = arithmeticSeries - (0.2) - 0.2;
		});

		$('#'+selectedComponent.userData.componentID).append(
			'<li class="childListItem" id="p'+selectedComponent.userData.componentID+'c'+childIndex+'" data-value="'+componentType+' '+childIndex+'">'
				+componentType+
			'</li>'
		);

		dragControls.dispose();
		dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
		if(selectedTool !== 'moveTool')
			dragControls.deactivate();
		
			
		$('.selectedChild').removeClass('selectedChild').addClass( 'addChildButtons' );
		paletteChild = null;

		return;
	}
	if(selectedTool === 'moveTool'){
		event.preventDefault();

		if( enableSelection === true ) {
			const draggableObjects = dragControls.getObjects();
			draggableObjects.length = 0;
			console.log(draggableObjects.length);

			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			raycaster.setFromCamera( mouse, camera );
			const intersections = raycaster.intersectObjects( sceneComponentsObj.children, true );

			if ( intersections.length > 0 ) {
				const object = intersections[ 0 ].object;

				if ( group.children.includes( object ) === true ) {
					object.material.emissive.set( 0x000000 );
					scene.attach( object );
				} else {
					object.material.emissive.set( 0xaaaaaa );
					group.attach( object );
				}
				dragControls.transformGroup = true;
				draggableObjects.push( group );
			}

			if ( group.children.length === 0 ) {
				dragControls.transformGroup = false;
				draggableObjects.push( ...sceneComponentsObj.children );
			}
		}
	}else if(selectedTool === 'eyeTool'){
		if(!enableAutoFocus){
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);
			let intersects = raycaster.intersectObjects(sceneComponentsObj.children);
			if(intersects.length > 0) {
				selectedComponent = intersects[0].object;
				addSelectedObject( selectedComponent );
				outlinePass.selectedObjects = selectedObjects;
				const componentId = selectedComponent.userData.componentID;
				$('.componentLabel').removeClass('selectedComponent');
				sceneComponentList.find('#c'+componentId).addClass('selectedComponent');
				pannelSectionID.html(selectedComponent.userData.componentID);
				pannelSectionName.val(selectedComponent.userData.componentName);
				let derivationInfo = '';
				if(selectedComponent.userData.derivedFrom !== '')
					derivationInfo = ' (from '+selectedComponent.userData.derivedFrom+ ')';
				pannelSectionType.html(selectedComponent.userData.componentType + derivationInfo);
				rightPannel.css('display', 'block');
			}else{
				outlinePass.selectedObjects = [];
				selectedComponent = null;
				$('.componentLabel').removeClass('selectedComponent');
				$('.addChildButtons').removeClass('selectedChild');
				rightPannel.css('display', 'none');
			}
		}
	}
}

function addSelectedObject( object ) {
	selectedObjects = [];
	selectedObjects.push( object );
}

function generateTexture(componentType, color, width, height, tagColor, logo, generateComponnent) {
	width *= 500;
	height *= 500;

	const canvas2 = document.createElement('canvas');
	canvas2.width  = width;
	canvas2.height = height;
	const ctx2 = canvas2.getContext("2d");
	// Background
	ctx2.beginPath();
	ctx2.rect(0, 0, width, height);
	ctx2.fillStyle = color;
	ctx2.fill();
	ctx2.closePath();

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
	// Label
	ctx.font = '90px serif';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(componentType, 105, 70, width-110);
	// TagColor
	ctx.beginPath();
	ctx.rect(width-100, 0, 100, 100);
	ctx.fillStyle = tagColor;
	ctx.fill();
	ctx.closePath();
	// Logo
	const img = new Image();   // Crée un nouvel élément Image
	img.addEventListener('load', function() {
		ctx.drawImage(img, 0, 0, 100, 100);

		const texture = new THREE.CanvasTexture(canvas);
		const texture2 = new THREE.CanvasTexture(canvas2);

		const material = [
			new THREE.MeshStandardMaterial({ map: texture }),	// Right side
			new THREE.MeshStandardMaterial({ map: texture }),	// Left side
			new THREE.MeshStandardMaterial({ map: texture2 }),	// Top side
			new THREE.MeshStandardMaterial({ map: texture2 }),	// Bottom side
			new THREE.MeshStandardMaterial({ map: texture }),	// Front side
			new THREE.MeshStandardMaterial({ map: texture })	// Back side
		];
		if(componentsList[componentType]['derivedFrom'] === 'child')
			generateComponnentChildren(componentType, material);
		else if(generateComponnent)
			generateComponentParent(componentType, material);
		else
			regenerateTexture(material);

	}, false);
	img.src = './public/textures/logos/'+logo;
}

function generateComponentParent(componentType, material) {
	const cWidth = componentsList[componentType]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cDepht = componentsList[componentType]['depht'];

	const geometry = new THREE.BoxGeometry( cWidth, cHeight, cDepht );
	const index = sceneComponentsObj.children.length;
	let ncID = 0;
	if(index > 0)
		ncID = sceneComponentsObj.children[index-1].userData.componentID+1;
	sceneComponentsObj.add( new THREE.Mesh(geometry, material) );
	sceneComponentsObj.children[index].position.set(Math.random(), 0, Math.random());
	sceneComponentsObj.children[index].userData.componentType = componentType;
	sceneComponentsObj.children[index].userData.componentID = ncID;
	sceneComponentsObj.children[index].userData.componentName = componentType + ncID;
	sceneComponentsObj.children[index].userData.derivedFrom = componentsList[componentType]['derivedFrom'];

	sceneComponentList.append('<li class="componentlistItem" data-value="'+ncID+'">'+
										'<div class="componentLabel" data-value="'+ncID+'" id="c'+ncID+'">'+componentType + ncID +'</div>'+
										'<ul class="childList" id="'+ncID+'"></ul>'+
									'</li>');
	dragControls.dispose();
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
	if(selectedTool !== 'moveTool')
		dragControls.deactivate();
}

function generateComponnentChildren(componentType, material) {
	const cWidth = componentsList[componentType]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cDepht = componentsList[componentType]['depht'];

	paletteChild = new THREE.Mesh( new THREE.BoxGeometry( cWidth, cHeight, cDepht ), material );
	paletteChild.userData.componentType = componentType;

	if(!selectedComponent)
		return;

	const pComponentType = selectedComponent.userData.componentType;
	const pTagColor = '#FF0000';
	const pColor = componentsList[pComponentType]['color'];
	const pLogo = componentsList[pComponentType]['logo'];
	selectedComponent.add(paletteChild);
	selectedComponent.geometry = new THREE.BoxGeometry(1, 1 + (0.4*selectedComponent.children.length), 1);
	generateTexture(pComponentType, pColor, 1, 1 + (0.4*selectedComponent.children.length), pTagColor, pLogo, false);
	selectedComponent.position.y = 0.2 * selectedComponent.children.length;
	let childIndex = selectedComponent.children.length - 1;
	//selectedComponent.children[childIndex].position.z += 0.3;
	let arithmeticSeries = 0.2 * selectedComponent.children.length; // arithmeticSeries's Uo

	selectedComponent.children.forEach(child => {
		child.position.y = arithmeticSeries;
		// Un = (Un-1) - r - 0.2
		arithmeticSeries = arithmeticSeries - (0.2) - 0.2;
	});

	$('#'+selectedComponent.userData.componentID).append(
		'<li class="childListItem" id="p'+selectedComponent.userData.componentID+'c'+childIndex+'" data-value="'+componentType+' '+childIndex+'">'
		+componentType+
		'</li>'
	);

	dragControls.dispose();
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
	if(selectedTool !== 'moveTool')
		dragControls.deactivate();


	$('.selectedChild').removeClass('selectedChild').addClass( 'addChildButtons' );
	paletteChild = null;
}

function regenerateTexture(material){
	selectedComponent.material = material;
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
$('.addComponentButtons').on('click', function () {
	const componentType = this.dataset.value;
	const cWidth = componentsList[componentType]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cColor = componentsList[componentType]['color'];
	const cLogo = componentsList[componentType]['logo'];

	generateTexture(componentType, cColor, cWidth, cHeight, '#ff0000', cLogo, true);
});
// select child to add to a Component
htmlComponentList.on('click', '.addChildButtons', function () {
	$('.selectedChild').removeClass("selectedChild").addClass( "addChildButtons" );
	$(this).removeClass("addChildButtons").addClass( "selectedChild" );

	const componentType = this.dataset.value;
	const cWidth = componentsList[componentType]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cColor = componentsList[componentType]['color'];
	const cLogo = componentsList[componentType]['logo'];

	generateTexture(componentType, cColor, cWidth, cHeight, '#FF0000', cLogo, false);
});
$('#conponentsSection').on('click', '.selectedChild', function () {
	$(this).removeClass("selectedChild").addClass( "addChildButtons" );
	paletteChild = null;
});
// Select component (activate auto-focus)
sceneComponentList.on('click', "div.componentLabel", function () {
	let cpID = $(this).attr('data-value');
	let cIndex = 0;

	sceneComponentsObj.children.forEach(function(component){
		if( cpID == component.userData.componentID ){
			selectedComponent = sceneComponentsObj.children[cIndex];

			addSelectedObject( selectedComponent );
			outlinePass.selectedObjects = selectedObjects;
			orbitControls.target = new THREE.Vector3(selectedComponent.position.x, selectedComponent.position.y, selectedComponent.position.z);

			$('.componentLabel').removeClass('selectedComponent');
			sceneComponentList.find('#c'+selectedComponent.userData.componentID).addClass('selectedComponent');
			pannelSectionID.html(selectedComponent.userData.componentID);
			pannelSectionName.val(selectedComponent.userData.componentName);
			let derivationInfo = '';
			if(selectedComponent.userData.derivedFrom !== '')
				derivationInfo = ' (from '+selectedComponent.userData.derivedFrom+ ')';
			pannelSectionType.html(selectedComponent.userData.componentType + derivationInfo);
			rightPannel.css('display', 'block');
			enableAutoFocus = true;

			return false;
		}
		cIndex++;
	});
});
// Select child (activate auto-focus)
/*sceneComponentList.on('click', "li.childListItem", function () {
	console.log('child clicked !');
	let parentIndex = this.id.charAt(1);
	let childIndex = this.dataset.value.split(' ')[1];
	console.log('ParentId :' + parentIndex + '; ChildId :' +childIndex);

	selectedComponent = sceneComponents[parentIndex].children[childIndex];
	console.log('component :'+selectedComponent);

	addSelectedObject( selectedComponent );
	outlinePass.selectedObjects = selectedObjects;
	orbitControls.target = new THREE.Vector3(selectedComponent.position.x, selectedComponent.position.y, selectedComponent.position.z);
	enableAutoFocus = true;
});*/
// switch selected tool
toolButtons.on('click', function () {
	selectedTool = $(this).attr("id");

	switch($(this).attr("id")){
		case 'eyeTool':
			dragControls.deactivate();
			toolButtons.removeClass('selectedTool');
			$('#eyeTool').addClass('selectedTool');
			break;
		case 'moveTool':
			dragControls.activate();
			toolButtons.removeClass('selectedTool');
			$('#moveTool').addClass('selectedTool');
			break;
		case 'linkTool':
			dragControls.deactivate();
			toolButtons.removeClass('selectedTool');
			$('#linkTool').addClass('selectedTool');
			break;
	}
});
// prevent UI's clicks to have effects on the scene
$('.UI').on('click', function(){
	preventClick = true;
});
// update name when input
pannelSectionName.on('input', function(){
	const newLabel = $(this).val();
	$('#c'+ selectedComponent.userData.componentID ).html(newLabel);
	selectedComponent.userData.componentName = newLabel;
});
// supprimer un objet
$('#deleteButton').on('click', function(){
	if(selectedComponent){
		$('.componentlistItem').each(function(){
			if( $(this).attr('data-value') == selectedComponent.userData.componentID ){
				$(this).remove();
				sceneComponentsObj.remove(selectedComponent);
				selectedComponent = null;

				dragControls.dispose();
				dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
				if(selectedTool !== 'moveTool')
					dragControls.deactivate();

				return false;
			}
		});
	}
});

// Affichage framerate (debug)
//(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
