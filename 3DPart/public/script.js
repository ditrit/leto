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
	preventClick = false, needSpacing = false;
let componentsList, sceneComponentsObj = new THREE.Group();	// Liste de tous les composants existants (palette); liste des composants de la Scene
let nestingLevels = {level0: {width: 1.2, depth: 1.2}};
let objectsPerLevels = new Array([]);
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
const sceneComponentList = $('#sceneComponentslist');
const pannelSectionID = $('#componentID');
const pannelSectionName = $('#componentName');
const pannelSectionType = $('#componentType');
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
	orbitControls.enableDamping = true;
	orbitControls.minDistance = 2;
	orbitControls.maxDistance = 200;
	orbitControls.target = new THREE.Vector3(0, 1, 0);
	orbitControls.update();

	// Drag control
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement);
	dragControls.deactivate();
	document.addEventListener( 'click', onClick );
	document.addEventListener( 'onmouseup', onMouseRealease );
	window.addEventListener( 'keydown', onKeyDown );
	window.addEventListener( 'keyup', onKeyUp );

	// ----------------------------------------------
	//initialisation de la liste des composants
	scene.add(sceneComponentsObj);

	//textures
	// les composants doivent tous avoir des noms différents et hériter de composants existants (ou ne pas hériter du tout)
	componentsList = {
		'serveur' : { 'name': 'serveur', 'derivedFrom' : '', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurDeFichier' : { 'name': 'serveur de fichier', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurImpression' : { 'name': 'serveur d\'impression', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'print.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurApplication' : { 'name': 'serveur d\'application', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'menu.webp', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurDNS' : { 'name': 'serveur DNS', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'dns.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurMessagerie' : { 'name': 'serveur de messagerie', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'mail.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurWeb' : { 'name': 'serveur web', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'web.jpg', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurBDD' : { 'name': 'serveur de bases de données', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'servBDD.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'serveurVirtuel' : { 'name': 'serveur virtuel', 'derivedFrom' : 'serveur', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'jetty' : { 'name': 'jetty', 'derivedFrom' : 'serveurVirtuel', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'file.jpg', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'router': { 'name': 'router', 'derivedFrom' : '', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#19bfba', 'logo' : 'wifi.png', 'requirements': {'nestedOn': [''], 'linkedTo': []} },
		'child' : { 'name': 'child', 'derivedFrom' : '', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#8288a1', 'logo' : 'db.png', 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
		'apache': { 'name': 'apache', 'derivedFrom' : 'child', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#a82b18', 'logo' : 'apache.png', 'requirements': {'nestedOn': ['serveur', 'jetty', 'serveurVirtuel'], 'linkedTo': []} },
		'php': { 'name': 'php', 'derivedFrom' : 'child', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#3065ba', 'logo' : 'php.png', 'requirements': {'nestedOn': ['serveur', 'jetty', 'serveurVirtuel'], 'linkedTo': []} },
		'database': { 'name': 'database', 'derivedFrom' : 'child', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#db852a', 'logo' : 'db.png', 'requirements': {'nestedOn': ['serveur', 'jetty', 'serveurVirtuel'], 'linkedTo': []} },
		'nodejs': { 'name': 'nodejs', 'derivedFrom' : 'child', 'width' : 1.2, 'height' : 0.3, 'depht' : 1.2, 'color' : '#2cab4c', 'logo' : 'nodejs.jpg', 'requirements': {'nestedOn': ['serveur', 'jetty', 'serveurVirtuel'], 'linkedTo': []} }
	};

	// génération dynamique de la palette de composants
	let i = 0;
	Object.entries(componentsList).forEach(function(component) {
		if(component[1]['derivedFrom'] === 'child'){
			$('#child').append('<div class="paletteComponent addChildButtons" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
				'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
				'<span>'+component[1]['name']+'</span>'+
				'</div>'+
				'<button id="showHide'+component[0]+'">+</button>'+
				'<ul id="'+component[0]+'"></ul>');
		}
		else if(component[1]['derivedFrom'] === ''){
			htmlComponentList.append('<br/><div class="paletteComponent addComponentButtons" data-value="'+component[0]+'" style="background-color: '+component[1]['color']+'">' +
				'<img src="./public/textures/logos/'+component[1]['logo']+'">'+
				'<span>'+component[1]['name']+'</span>'+
				'</div>'+
				'<button id="showHide'+component[0]+'">+</button>'+
				'<ul id="'+component[0]+'"></ul>');
		}
		else{
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
	if(preventClick){
		preventClick = false;
		return;
	}
	if(paletteChild && selectedComponent){
		/*const pComponentType = selectedComponent.userData.componentType;
		const pTagColor = '#7d2f9e';
		const pColor = componentsList[pComponentType]['color'];
		const pLogo = componentsList[pComponentType]['logo'];

		let componentType = paletteChild.userData.componentType;
		selectedComponent.add(paletteChild);
		selectedComponent.geometry = new THREE.BoxGeometry(1, 1 + (0.4*selectedComponent.children.length), 1);
		generateTexture(pComponentType, pColor, 1, 1 + (0.4*selectedComponent.children.length), pTagColor, pLogo, 'createChild');
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

		return;*/
	}
	if(selectedTool === 'moveTool'){
		event.preventDefault();

		if( enableSelection === true ) {
			const draggableObjects = dragControls.getObjects();
			draggableObjects.length = 0;

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
			needSpacing = true;
		}
	}else if(selectedTool === 'eyeTool'){
		if(!enableAutoFocus){
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);
			let intersects = raycaster.intersectObjects(sceneComponentsObj.children, true);
			if(intersects.length > 0) {
				selectedComponent = intersects[0].object;
				addSelectedObject( selectedComponent );
				outlinePass.selectedObjects = selectedObjects;
				// right panel completion
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
function onMouseRealease() {
	console.log('mouse released');
	if(dragControls.enabled){
		needSpacing = true;
	}
}

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
		if(action === 'createChild')
			generateComponnentChildren(componentType, material);
		else if(action === 'createComponent')
			generateComponentParent(componentType, material);
		else if(action === 'updateTexture')
			regenerateTexture(component, material);

	}, false);
	img.src = './public/textures/logos/'+logo;
}

function generateComponentParent(componentType, material) {
	const cWidth = nestingLevels['level0']['width'];
	const cHeight = componentsList[componentType]['height'];
	const cDepht = nestingLevels['level0']['depth'];

	const geometry = new THREE.BoxGeometry( cWidth, cHeight, cDepht );
	const index = sceneComponentsObj.children.length;
	let ncID = 0;
	if(index > 0)
		ncID = sceneComponentsObj.children[index-1].userData.componentID+1;
	sceneComponentsObj.add( new THREE.Mesh(geometry, material) );

	const newObj = sceneComponentsObj.children[index];
	newObj.position.set(Math.random(), 0, Math.random());
	newObj.userData.componentType = componentType;
	newObj.userData.componentID = ncID;
	newObj.userData.componentName = componentType + ncID;
	newObj.userData.derivedFrom = componentsList[componentType]['derivedFrom'];
	newObj.position.y = -0.5 + (newObj.geometry.parameters.height/2);
	objectsPerLevels[0][objectsPerLevels[0].length] = newObj;

	sceneComponentList.append('<li class="componentlistItem" data-value="'+ncID+'">'+
		'<div class="componentLabel" data-value="'+ncID+'" id="c'+ncID+'">'+componentType + ncID +'</div>'+
		'<ul class="childList" id="'+ncID+'"></ul>'+
		'</li>');
	dragControls.dispose();
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
	if(selectedTool !== 'moveTool')
		dragControls.deactivate();

	needSpacing = true;
}

function generateComponnentChildren(componentType, material) {
	let count = 0; // nesting level of added children
	let cmpnt = selectedComponent;
	while(cmpnt != sceneComponentsObj){
		cmpnt = cmpnt.parent;
		count ++;
	}
	if(count >= Object.keys(nestingLevels).length){
		nestingLevels["level"+count] = {width: 1.2, depth: 1.2};
	}

	const cWidth = nestingLevels['level'+count]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cDepht = nestingLevels['level'+count]['depth'];

	paletteChild = new THREE.Mesh( new THREE.BoxGeometry( cWidth, cHeight, cDepht ), material );
	paletteChild.userData.componentType = componentType;
	paletteChild.userData.componentID = selectedComponent.children.length;
	if(!selectedComponent)
		return;
	paletteChild.userData.componentName = componentsList[componentType]['name'] + selectedComponent.children.length;

	selectedComponent.add(paletteChild);
	if(objectsPerLevels[count] !== undefined) {
		objectsPerLevels[count][objectsPerLevels[count].length] = paletteChild;
	}else{
		objectsPerLevels.push([]);
		objectsPerLevels[count][0] = paletteChild;
	}

	paletteChild.position.y += (paletteChild.geometry.parameters.height/2) + (paletteChild.parent.geometry.parameters.height/2);
	let childIndex = selectedComponent.children.length - 1;

	childrenSpacing(selectedComponent, count-1, true);

	$('#'+selectedComponent.userData.componentID).append(
		'<li class="childListItem" id="p'+selectedComponent.userData.componentID+'c'+childIndex+'" data-value="'+paletteChild.userData.componentID+'">'
		+paletteChild.userData.componentName+
		'</li>'
	);

	dragControls.dispose();
	dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
	if(selectedTool !== 'moveTool')
		dragControls.deactivate();

	$('.selectedChild').removeClass('selectedChild').addClass( 'addChildButtons' );
	paletteChild = null;
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

function regenerateTexture(component, material){
	component.material = material;
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
			messageBox.css('opacity', 1);
			messageBox.fadeToggle(100);
			messageBox.html('Ce composant doit être imbriqué');
			messageBox.fadeToggle(2000);
		}
	}else{
		if( componentsList[componentType]['requirements']['nestedOn'].includes(selectedComponent.userData.componentType) ){
			generateTexture(componentType, componentType+ncID, cColor, cWidth, cHeight, '#7d2f9e', cLogo, 'createChild');
		}else{
			messageBox.css('opacity', 1);
			messageBox.fadeToggle(100);
			messageBox.html('Ce ne peut pas être imbriqué sur un '+componentsList[selectedComponent.userData.componentType]['name']);
			messageBox.fadeToggle(2000);
		}
	}
});
// select child to add to a Component
/*htmlComponentList.on('click', '.addChildButtons', function () {
	$('.selectedChild').removeClass("selectedChild").addClass( "addChildButtons" );
	$(this).removeClass("addChildButtons").addClass( "selectedChild" );

	const componentType = this.dataset.value;
	const cWidth = componentsList[componentType]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cColor = componentsList[componentType]['color'];
	const cLogo = componentsList[componentType]['logo'];
	const index = sceneComponentsObj.children.length;
	let ncID = 0;
	if(index > 0)
		ncID = sceneComponentsObj.children[index-1].userData.componentID+1;

	generateTexture(componentType, componentType+ncID, cColor, cWidth, cHeight, '#7d2f9e', cLogo, 'createChild');
});*/
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

	const componentType = selectedComponent.userData.componentType;
	const cWidth = componentsList[componentType]['width'];
	const cHeight = componentsList[componentType]['height'];
	const cColor = componentsList[componentType]['color'];
	const cTagColor = componentsList[componentType]['tagColor'];
	const cLogo = componentsList[componentType]['logo'];
	generateTexture(componentType, selectedComponent.userData.componentName, cColor, cWidth, cHeight, '#7d2f9e', cLogo, 'updateTexture');
});
// supprimer un objet
$('#deleteButton').on('click', function(){
	if(selectedComponent){
		$('.componentlistItem').each(function(){
			if( $(this).attr('data-value') == selectedComponent.userData.componentID ){
				$(this).remove();
				selectedComponent.parent.remove(selectedComponent);
				selectedComponent = null;
				rightPannel.css('display', 'none');

				dragControls.dispose();
				dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
				if(selectedTool !== 'moveTool')
					dragControls.deactivate();
			}else{
				if(selectedComponent.parent != sceneComponentsObj){
					$(this).find('.childListItem').each(function (){
						if( $(this).attr('data-value') == selectedComponent.userData.componentID ){
							$(this).remove();
							selectedComponent.parent.remove(selectedComponent);
							selectedComponent = null;
							rightPannel.css('display', 'none');

							dragControls.dispose();
							dragControls = new DragControls( [ ... sceneComponentsObj.children ], camera, renderer.domElement );
							if(selectedTool !== 'moveTool')
								dragControls.deactivate();
						}
					});
				}
			}
		});
	}
});

// Affichage framerate (debug)
//(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
