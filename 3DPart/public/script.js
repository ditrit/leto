import * as THREE from './libs/three.js/build/three.module.js';
import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';
import { DragControls } from './libs/three.js/examples/jsm/controls/DragControls.js';
import { EffectComposer } from './libs/three.js/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './libs/three.js/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './libs/three.js/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from './libs/three.js/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from './libs/three.js/examples/jsm/shaders/FXAAShader.js';
import {Object3D, Vector3} from "./libs/three.js/build/three.module.js";

/// VARIABLES ///
let camera, scene, renderer, orbitControls, dragControls, enableSelection = false, mouse, raycaster,
	selectedTool = 'eyeTool',selectedComponent = null, enableAutoFocus = false,
	preventClick = false, needSpacing = false, needRelink = false;
let componentsList, sceneComponentsObj = new THREE.Group(), sceneLinksObj = new THREE.Group();	// Liste de tous les composants existants (palette); liste des composants de la Scene
let nestingLevels = {level0: {width: 1.2, depth: 1.2}};
let objectsPerLevels = new Array([]);
let lastID = 0, lastLinkID = 0, realeaseTimer = null;
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
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement);
	dragControls.deactivate();
	document.addEventListener( 'click', onClick );
	document.addEventListener( 'pointerdown', onMouseDown);
	document.addEventListener( 'pointerup', onMouseUp);
	window.addEventListener( 'keydown', onKeyDown );
	window.addEventListener( 'keyup', onKeyUp );

	// ----------------------------------------------
	//initialisation de la liste des composants
	scene.add(sceneComponentsObj);
	scene.add(sceneLinksObj);

	//textures
	// les composants doivent tous avoir des noms différents et hériter de composants existants (ou ne pas hériter du tout)
	componentsList = {
		'root' : { 'name': 'root', 'derivedFrom' : '', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'requirements': {'nestedOn': [], 'linkedTo': []} },
		'serveur' : { 'name': 'serveur', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'requirements': {'nestedOn': [''], 'linkedTo': ['serveur']} },
		'serveurDeFichier' : { 'name': 'serveur de fichier', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurImpression' : { 'name': 'serveur d\'impression', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'print.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurApplication' : { 'name': 'serveur d\'application', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'menu.webp', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurDNS' : { 'name': 'serveur DNS', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'dns.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurMessagerie' : { 'name': 'serveur de messagerie', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'mail.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurWeb' : { 'name': 'serveur web', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'web.jpg', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurBDD' : { 'name': 'serveur de bases de données', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'servBDD.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurVirtuel' : { 'name': 'serveur virtuel', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#404040', 'logo' : 'file.jpg', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'jetty' : { 'name': 'jetty', 'derivedFrom' : 'serveurVirtuel', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#404040', 'logo' : 'file.jpg', 'requirements': {'nestedOn': [], 'linkedTo': []} },
		'router': { 'name': 'router', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#19bfba', 'logo' : 'wifi.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'apache': { 'name': 'apache', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#a82b18', 'logo' : 'apache.png', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'php': { 'name': 'php', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#3065ba', 'logo' : 'php.png', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'database': { 'name': 'database', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#db852a', 'logo' : 'db.png', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'nodejs': { 'name': 'nodejs', 'derivedFrom' : 'root', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#2cab4c', 'logo' : 'nodejs.jpg', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} }
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
	ajustementEspacement();
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


/// FONCTIONS ADDITIONNELLES ///
// espace les composants du niveau 0 entre eux
function ajustementEspacement(){
	if (needSpacing){
		let spacingFinished = true;
		sceneComponentsObj.children.forEach(component => {
			let haveNeighbour = false;
			let lastDistance = null;
			let nearestNeighbour = null;
			component.position.y = -0.5 + (component.geometry.parameters.height/2);
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
						spacingFinished = false;
						haveNeighbour = true;
					}else if(distance <= config_distance){		// eloignement
						component.position.x += (component.position.x - neighbour.position.x) / config_diviseurVitesse;
						component.position.z += (component.position.z - neighbour.position.z) / config_diviseurVitesse;
						haveNeighbour = true;
						spacingFinished = false;
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
				spacingFinished = false;
			}
		});
		if(spacingFinished){
			needSpacing = false;
			needRelink = true;
		}
	}
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
	enableSelection = true;
}

function onClick( event ) {
	/*if(preventClick){
		preventClick = false;
		return;
	}
	if(selectedTool === 'moveTool'){
		needSpacing = true;
	}else if(selectedTool === 'eyeTool'){
		selectObject(event);
	}else if(selectedTool === 'linkTool'){
		if(selectedComponent != null){
			const cmpnt1 = selectedComponent;
			selectObject(event);
			const cmpnt2 = selectedComponent;
			drawLink(cmpnt1, cmpnt2);
		}else{
			selectObject(event);
		}
	}*/
}

function onMouseDown(event){
	realeaseTimer = Date.now();
}

function onMouseUp(event) {
	const delay = Date.now() - realeaseTimer;

	if(preventClick){
		preventClick = false;
		return;
	}
	if(selectedTool === 'moveTool'){
		if(delay < 200)
			selectObject(event);
		needSpacing = true;
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
					const link = drawLink(cmpnt1, cmpnt2);
					pannelSectionLinks.append('<li>'+link.userData.hoster1.userData.componentName+' - '+link.userData.hoster2.userData.componentName+'</li>');
					selectedTool = 'eyeTool';
					dragControls.deactivate();
					orbitControls.enableRotate = true;
					toolButtons.removeClass('selectedTool');
					$('#eyeTool').addClass('selectedTool');
				}
			}
		}else{
			if(delay < 200)
				selectObject(event);
		}
	}

}

function selectObject(event){
	if(!enableAutoFocus){
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		let intersects = raycaster.intersectObjects(sceneComponentsObj.children, true);
		if(intersects.length > 0) {
			selectedComponent = intersects[0].object;
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
	const componentId = selectedComponent.userData.componentID;
	$('.componentLabel').removeClass('selectedComponent');
	sceneComponentList.find('#c'+componentId).addClass('selectedComponent');
	pannelSectionID.html(component.userData.componentID);
	pannelSectionName.val(component.userData.componentName);
	let derivationInfo = '';
	if(component.userData.derivedFrom !== '')
		derivationInfo = ' (from '+component.userData.derivedFrom+ ')';
	pannelSectionType.html(component.userData.componentType + derivationInfo);
	pannelSectionLinks.html('');
	component.userData.links.forEach(function(link){
		pannelSectionLinks.append('<li>'+link.userData.hoster1.userData.componentName+' - '+link.userData.hoster2.userData.componentName+'</li>');
	});
	rightPannel.css('display', 'block');
}

// add object to apply outline effect
function addSelectedObject( object ) {
	selectedObjects = [];
	selectedObjects.push( object );
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
	// Label
	ctx.font = '90px serif';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(name, 105, 70, width-110);
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
	while(cmpnt != sceneComponentsObj && cmpnt != null){
		cmpnt = cmpnt.parent;
		count ++;
	}
	if(count >= Object.keys(nestingLevels).length){
		nestingLevels["level"+count] = {width: 1.2, depth: 1.2};
	}

	const cWidth = nestingLevels['level'+count]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cDepht = nestingLevels['level'+count]['depth'];

	let newCmpnt = new THREE.Mesh( new THREE.BoxGeometry( cWidth, cHeight, cDepht ), material );
	newCmpnt.userData.nestingLevel = count;
	newCmpnt.userData.componentType = componentType;
	newCmpnt.userData.componentID = lastID;
	newCmpnt.userData.links = [];
	newCmpnt.userData.componentName = componentsList[componentType]['name'] + lastID;
	if(!selectedComponent)
		sceneComponentsObj.add(newCmpnt);
	else
		selectedComponent.add(newCmpnt);

	if(objectsPerLevels[count] !== undefined) {
		objectsPerLevels[count][objectsPerLevels[count].length] = newCmpnt;
	}else{
		objectsPerLevels.push([]);
		objectsPerLevels[count][0] = newCmpnt;
	}


	if(selectedComponent !== null) {
		newCmpnt.position.y += (newCmpnt.geometry.parameters.height/2) + (newCmpnt.parent.geometry.parameters.height/2);
		childrenSpacing(selectedComponent, count - 1, true);
		$('#l' + selectedComponent.userData.componentID).append(
			'<li class="componentlistItem" id="' + lastID + '">' +
			'<div class="componentLabel" id="c' + lastID + '">' + newCmpnt.userData.componentName + '</div>' +
			'<ul class="sceneComponentslist" id="l' + lastID + '"></ul>' +
			'</li>'
		);
	}else{
		newCmpnt.position.set(Math.random(), 0, Math.random());
		sceneComponentList.append('<li class="componentlistItem" id="'+lastID+'">'+
			'<div class="componentLabel" id="c'+lastID+'">'+newCmpnt.userData.componentName+'</div>'+
			'<ul class="sceneComponentslist" id="l'+lastID+'"></ul>'+
			'</li><br/>');
	}
	lastID++;

	dragControls.dispose();
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
	if(selectedTool !== 'moveTool')
		dragControls.deactivate();

	needSpacing = true;
}

function childrenSpacing(parentComponent, couche){
	let resizeLevel = false;
	const nbLines = Math.ceil(Math.sqrt(parentComponent.children.length));
	const nbColumn = Math.ceil(parentComponent.children.length / nbLines);
	const coucheEnfant = couche+1;
	config_espacement = 0.6;
	let childWidth = nestingLevels['level'+coucheEnfant]['width'];
	let childDepth = nestingLevels['level'+coucheEnfant]['depth'];
	let spacingX = (childWidth * 0.2) + config_espacement;
	let spacingZ = (childDepth * 0.2) + config_espacement;

	// new parent scale
	const newWidth = (childWidth * (nbLines)) + (spacingX * (nbLines-1)) + 0.6;
	const newHeight = componentsList[parentComponent.userData.componentType]['height'];
	const newDepth = (childDepth * (nbColumn)) + (spacingZ * (nbColumn-1)) + 0.6;

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
			const cTagColor = '#7d2f9e';
			const cColor = componentsList[cComponentType]['color'];
			const cLogo = componentsList[cComponentType]['logo'];
			const cName = object.userData.componentName;
			object.geometry = new THREE.BoxGeometry(nestingLevels['level'+couche]['width'], newHeight, nestingLevels['level'+couche]['depth']);
			generateTexture(cComponentType, cName, cColor, nestingLevels['level'+couche]['width'], selectedComponent.geometry.parameters.height, cTagColor, cLogo, 'updateTexture', object);
			childrenSpacing(object, couche);
		}
	}

	//placement & espacement enfants
	let count = 0;
	parentComponent.children.forEach(child => {
		const ligneCourante = count % nbColumn;
		const coloneCourante = Math.floor(count / nbColumn);
		child.position.z = (ligneCourante*childDepth) + (spacingZ*ligneCourante) - (nestingLevels['level'+couche]['depth']/2) + (childDepth/2) + (config_espacement/2);
		child.position.x = (coloneCourante*childWidth) + (spacingX*coloneCourante) - (nestingLevels['level'+couche]['width']/2) + (childWidth/2) + (config_espacement/2);
		count++;
	});

	if(parentComponent.parent != sceneComponentsObj){
		childrenSpacing(parentComponent.parent, couche-1);
	}

	if(nestingLevels['level'+coucheEnfant]['nbEleMax'] < parentComponent.children.length){
		nestingLevels['level'+coucheEnfant]['nbEleMax'] = parentComponent.children.length;
		childrenSpacing(parentComponent.parent, couche-1);

	}

	config_distance = nestingLevels['level0']['width'] + (nestingLevels['level0']['width']/2);
	needSpacing = true;
}

// reaffect a new texture to an existing component
function regenerateTexture(component, material){
	component.material = material;
}

// delete an object with all its children
function deleteObjectHierarchie(component){
	component.children.forEach(function(child){
		deleteObjectHierarchie(child);
	});

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

function drawLink(cmpnt1, cmpnt2){
	const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const points = [];
	let globalPos1 = new Vector3();
	let globalPos2 = new Vector3();
	points.push( cmpnt1.getWorldPosition(globalPos1) );
	points.push( cmpnt2.getWorldPosition(globalPos2) );

	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, material );

	line.userData.linkId = lastLinkID;
	lastLinkID++;
	line.userData.hoster1 = cmpnt1;
	line.userData.hoster2 = cmpnt2;
	cmpnt1.userData.links.push(line);
	cmpnt2.userData.links.push(line);
	sceneLinksObj.add(line);

	return line;
}

// replace a link after the parents moved position
function relink(link){
	const host1 = link.userData.hoster1;
	const host2 = link.userData.hoster2;

	const points = [];
	let globalPos1 = new Vector3();
	let globalPos2 = new Vector3();
	points.push( host1.getWorldPosition(globalPos1) );
	points.push( host2.getWorldPosition(globalPos2) );

	link.geometry = new THREE.BufferGeometry().setFromPoints( points );
}

// show a stylised alert
function customAlert(message){
	messageBox.css('opacity', 1);
	messageBox.fadeToggle(100);
	messageBox.html(message);
	messageBox.fadeToggle(2500);
}

// gather the component nesting compatibilities with the ones inherited by its parent
function getNestingCompatibilities(componentType, cmptCompatibilities = []){
	componentsList[componentType]['requirements']['nestedOn'].forEach(function(compatibility){
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
			customAlert('Ce ne peut pas être imbriqué sur un '+componentsList[selectedComponent.userData.componentType]['name']);
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
				orbitControls.target = new THREE.Vector3(selectedComponent.position.x, selectedComponent.position.y, selectedComponent.position.z);

				showComponentInfo(selectedComponent);
				enableAutoFocus = true;

				return false;
			}
		});
	});
});
// switch selected tool
toolButtons.on('click', function () {
	selectedTool = $(this).attr("id");

	switch($(this).attr("id")){
		case 'eyeTool':
			dragControls.deactivate();
			orbitControls.enableRotate = true;
			toolButtons.removeClass('selectedTool');
			$('#eyeTool').addClass('selectedTool');
			break;
		case 'moveTool':
			dragControls.activate();
			orbitControls.enableRotate = false;
			toolButtons.removeClass('selectedTool');
			$('#moveTool').addClass('selectedTool');
			break;
		case 'linkTool':
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
	const cWidth = componentsList[componentType]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cColor = componentsList[componentType]['color'];
	const cTagColor = componentsList[componentType]['tagColor'];
	const cLogo = componentsList[componentType]['logo'];
	generateTexture(componentType, selectedComponent.userData.componentName, cColor, cWidth, cHeight, cTagColor, cLogo, 'updateTexture');
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

		dragControls.dispose();
		dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
		if(selectedTool !== 'moveTool')
			dragControls.deactivate();
	}
});

// Affichage framerate (debug)
//(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
