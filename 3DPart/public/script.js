import * as THREE from './libs/three.js/build/three.module.js';
import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';
import { DragControls } from './libs/three.js/examples/jsm/controls/DragControls.js';

/// VARIABLES ///
const htmlComponentList = $('#sceneComponentslist');

let camera, scene, renderer, orbitControls, dragControls, enableSelection = false, mouse, raycaster, selectedTool = 'eyeTool', paletteChild = null,selectedComponent = null, enableAutoFocus = false;
let componentsList, sceneComponents = [];	// Liste de tous les comosants existants; liste des composants de la Scene
// config
let config_distance = 5, config_tolerance = 0.2, config_diviseurVitesse = 30, config_focusDistance = 7;
// Loaders
const textureLoaderSky = new THREE.TextureLoader();
textureLoaderSky.setPath( 'public/skybox/' );


/// FONCTIONS DE BASE ///
// Lance le programme
init();
animate();

// Initialisation
function init(){
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
	camera.position.set(0, 3, 15);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x132644);

	mouse = new THREE.Vector2();
	raycaster = new THREE.Raycaster();

	document.body.appendChild(renderer.domElement);

	// ----------------------------------------------
	//initialisation de la liste des composants
	const box = new THREE.BoxGeometry(1, 1, 1);
	const bigTile =  new THREE.BoxGeometry(1, 0.4, 1);
	const smallTile =  new THREE.BoxGeometry(1.2, 0.2, 1.2);
	componentsList = {
		'serveur' : { 'geometry' : box, 'mesh' :  new THREE.MeshStandardMaterial({ color: 0x8288a1 })},
		'router': { 'geometry' : bigTile, 'mesh' :  new THREE.MeshStandardMaterial({ color: 0x09bab1 })},
		'apache': { 'geometry' : smallTile,	'mesh' :  new THREE.MeshStandardMaterial({ color: 0xb00d07 })},
		'php': { 'geometry' : smallTile, 'mesh' :  new THREE.MeshStandardMaterial({ color: 0x3d51ad })},
		'database': { 'geometry' : smallTile,	'mesh' :  new THREE.MeshStandardMaterial({ color: 0xc77c0c })},
		'nodejs': { 'geometry' : smallTile,	'mesh' :  new THREE.MeshStandardMaterial({ color: 0x85E36B })}
	  };

	/*sceneComponents.push( new THREE.Mesh(shape, new THREE.MeshBasicMaterial({ color: 0x8288a1 })) );
	scene.add(sceneComponents[0]);*/

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

	const gridHelper = new THREE.GridHelper( 100, 100 );
	gridHelper.position.y = -0.5;
	scene.add( gridHelper );

	// Lights
	const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
	scene.add(ambientLight);
	const pointLight = new THREE.PointLight(0xFFFFFF, 0.5, 1000);
	pointLight.position.set(0, 10, 0);
	scene.add(pointLight);

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
	orbitControls.maxDistance = 70;
	orbitControls.update();

	// Drag control
	dragControls = new DragControls( [ ... sceneComponents ], camera, renderer.domElement);
	dragControls.deactivate();
	document.addEventListener( 'click', onClick );
	window.addEventListener( 'keydown', onKeyDown );
	window.addEventListener( 'keyup', onKeyUp );
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
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}


/// FONCTIONS ADDITIONNELLES ///
// espace les composants entre eux
function ajustementEspacement(){
	//let firstComponent = true;
	sceneComponents.forEach(component => {
		//if(!firstComponent){
			let haveNeighbour = false;
			let lastDistance = null;
			let nearestNeighbour = null;
			component.position.y = 0;
			sceneComponents.forEach(neighbour => {
				if(component != neighbour){
					let distance = Math.sqrt(
						Math.pow((component.position.x - neighbour.position.x), 2) +
						Math.pow((component.position.y - neighbour.position.y), 2) +
						Math.pow((component.position.z - neighbour.position.z), 2)
						);
					//console.log(distance);
					if(nearestNeighbour == null){
						lastDistance = distance;
						nearestNeighbour = neighbour;
					}else if(distance < lastDistance){
						lastDistance = distance;
						nearestNeighbour = neighbour;
					}

					if(distance == 0){
						component.position.x += Math.random();
						//component.position.y += Math.random();
						component.position.z += Math.random();
						haveNeighbour = true;
					}else if(distance <= config_distance){		// eloignement
						component.position.x += (component.position.x - neighbour.position.x) / config_diviseurVitesse;
						//component.position.y += (component.position.y - neighbour.position.y) / config_diviseurVitesse;
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
					//component.position.y -= (component.position.y - nearestNeighbour.position.y) / config_diviseurVitesse;
					component.position.z -= (component.position.z - nearestNeighbour.position.z) / config_diviseurVitesse;
				}
			}
		//}
		//firstComponent = false;
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
	if(dragControls.enabled)
		enableSelection = ( event.keyCode === 16 ) ? true : false;
	if(event.keyCode === 32)
	orbitControls.target = new THREE.Vector3(0, 0, 0);
}

function onKeyUp() {
	if(dragControls.enabled)
		enableSelection = false;
}

function onClick( event ) {
	/*if(paletteChild && selectedComponent){
		let componentType = 'test';
		selectedComponent.add(paletteChild);
		let index = selectedComponent.children.length;
		//sceneComponents.push( paletteChild );
		sceneComponents[index].position.set(selectedComponent[0].position.x, selectedComponent[0].position.y, selectedComponent[0].position.z);
		//scene.add(sceneComponents[index]);
		htmlComponentList.append('<li class="childListItem" data-value="'+componentType+' '+index+'">'+componentType+'</li>');
		dragControls.dispose();
		dragControls = new DragControls( [ ... sceneComponents ], camera, renderer.domElement );
		if(selectedTool !== 'moveTool')
			dragControls.deactivate();
		
			
		$('.selectedChild').removeClass("selectedChild").addClass( "addChildButtons" );
		paletteChild = null;

		return;
	}*/
	if(selectedTool === 'moveTool'){
		event.preventDefault();

		if( enableSelection === true ) {
			const draggableObjects = dragControls.getObjects();
			draggableObjects.length = 0;
			console.log(draggableObjects.length);

			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			raycaster.setFromCamera( mouse, camera );

			const intersections = raycaster.intersectObjects( sceneComponents, true );

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
				draggableObjects.push( ...sceneComponents );
			}
		}
	}else if(selectedTool === 'eyeTool'){
		if(!enableAutoFocus){
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);
			let intersects = raycaster.intersectObjects(scene.children);
			if(intersects.length > 1) {
				selectedComponent = intersects[0].object;
				//orbitControls.target = new THREE.Vector3(selectedComponent.position.x, selectedComponent.position.y, selectedComponent.position.z);
				//enableAutoFocus = true;
			}else{
				selectedComponent = null;
				$('.addChildButtons').removeClass('selectedChild');
			}
		}
	}
}


/// EVENEMENTS ///
// Met à jour la taille de la vue si la fenêtre est redimentionée
window.addEventListener('resize', function(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
// add Component
$('.addComponentButtons').on('click', function () {
	let componentType = this.dataset.value;
	let index = sceneComponents.length;
	let group = new THREE.Group();
	group.add(new THREE.Mesh( componentsList[componentType]['geometry'], componentsList[componentType]['mesh'] ));
	sceneComponents.push( group );
	group.position.set(Math.random(), 0, Math.random());
	scene.add(group);
	htmlComponentList.append('<li class="componentlistItem" data-value="'+index+'">'+componentType+'</li>');
	dragControls.dispose();
	dragControls = new DragControls( [ ... sceneComponents ], camera, renderer.domElement );
	if(selectedTool !== 'moveTool')
		dragControls.deactivate();
});
// select child to add to a Component
$('#conponentsSection').on('click', '.addChildButtons', function ( event ) {
	$('.selectedChild').removeClass("selectedChild").addClass( "addChildButtons" );
	$(this).removeClass("addChildButtons").addClass( "selectedChild" );

	let componentType = this.dataset.value;
	paletteChild = new THREE.Mesh( componentsList[componentType]['geometry'], componentsList[componentType]['mesh'] );
});
$('#conponentsSection').on('click', '.selectedChild', function () {
	$(this).removeClass("selectedChild").addClass( "addChildButtons" );
	paletteChild = null;
});
// Select element (activate auto-focus)
$('#sceneComponentslist').on('click', "li.componentlistItem", function () {
	let index = this.dataset.value;
	selectedComponent = sceneComponents[index];
	orbitControls.target = new THREE.Vector3(selectedComponent.position.x, selectedComponent.position.y, selectedComponent.position.z);
	enableAutoFocus = true;
});
// switch selected tool
$('.toolButtons').on('click', function () {
	selectedTool = $(this).attr("id");

	switch($(this).attr("id")){
		case 'eyeTool':
			console.log("eyeTool selected");
			//orbitControls.enableRotate = true;
			dragControls.deactivate();
			break;
		case 'moveTool':
			console.log("moveTool selected");
			//orbitControls.enableRotate = false;
			dragControls.activate();
			break;
		case 'linkTool':
			console.log("linkTool selected");
			//orbitControls.enableRotate = false;
			break;
	}
});

// Affichage framerate (debug)
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
