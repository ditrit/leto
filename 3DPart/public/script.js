import * as THREE from './libs/three.js/build/three.module.js';

import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

//HTML
const htmlComponentList = $('#sceneComponentslist');

// Variables
let camera, scene, renderer, controls, mouse, raycaster, selectedTool = 'eyeTool', selectedComponent = null;
let componentsList, sceneComponents = [];	// Liste de tous les comosants existants; liste des composants de la Scene
let config_distance = 5, config_tolerance = 0.2, config_diviseurVitesse = 30, config_focusDistance = 5;
// Loaders
const textureLoaderSky = new THREE.TextureLoader();
textureLoaderSky.setPath( 'public/skybox/' );

// Evenements
// Met à jour la taille de la vue si la fenêtre est redimentionée
window.addEventListener('resize', function(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener( 'mousemove', function ( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}, false );
window.addEventListener( 'click', function ( event ) {
	// do something
});

$('.objectButtons').on('click', function () {
	let componentType = this.dataset.value;
	let index = sceneComponents.length;
	sceneComponents.push( new THREE.Mesh( componentsList[componentType]['geometry'], componentsList[componentType]['mesh'] ) );
	sceneComponents[index].position.set(Math.random(), Math.random(), Math.random());
	scene.add(sceneComponents[index]);
	htmlComponentList.append('<li class="componentlistItem" data-value="'+index+'">'+componentType+'</li>');
});
$('#sceneComponentslist').on('click', "li.componentlistItem", function () {
	let index = this.dataset.value;
	selectedComponent = sceneComponents[index];
	controls.target = selectedComponent.position;
});
$('.toolButtons').on('click', function () {
	selectedTool = $(this).attr("id");

	switch($(this).attr("id")){
		case 'eyeTool':
			console.log("eyeTool selected");
			controls.enableRotate = true;
			break;
		case 'moveTool':
			console.log("moveTool selected");
			controls.enableRotate = false;
			break;
		case 'linkTool':
			console.log("linkTool selected");
			controls.enableRotate = false;
			break;
	}
});

// Lance le programme
init();
animate();

// Initialisation
function init(){
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
	camera.position.set(0, 0, 15);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x132644);

	mouse = new THREE.Vector2();
	raycaster = new THREE.Raycaster();

	document.body.appendChild(renderer.domElement);

	// ----------------------------------------------
	//initialisation de la liste des composants
	const shape = new THREE.BoxGeometry(1,1,1);
	componentsList = {
		'serveur' : { 'geometry' : shape,	'mesh' :  new THREE.MeshBasicMaterial({ color: 0x8288a1 })},
		'apache': { 'geometry' : shape,	'mesh' :  new THREE.MeshBasicMaterial({ color: 0x3d51ad })},
		'php': { 'geometry' : shape,	'mesh' :  new THREE.MeshBasicMaterial({ color: 0x85E36B })}
	  };

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

	// CONTROLES CAMERA
	controls = new OrbitControls( camera, renderer.domElement);
	//controls.target.set(4.5, 0, 4.5);
	controls.enablePan = false;
	//controls.maxPolarAngle = Math.PI / 2;
	controls.enableDamping = true;
	controls.minDistance = 2;
	controls.maxDistance = 70;
	controls.update();
}

// espace les composants entre eux
function ajustementEspacement(){
	sceneComponents.forEach(component => {
		sceneComponents.forEach(neighbour => {
			if(component != neighbour){
				let distance = Math.sqrt(Math.pow((component.position.x - neighbour.position.x), 2) + Math.pow((component.position.y - neighbour.position.y), 2) + Math.pow((component.position.z - neighbour.position.z), 2));
				//console.log(distance);

				if(distance == 0){
					component.position.x += Math.random();
					component.position.y += Math.random();
					component.position.z += Math.random();
				}else if(distance < config_distance + config_tolerance){
					component.position.x += (component.position.x - neighbour.position.x) / config_diviseurVitesse;
					component.position.y += (component.position.y - neighbour.position.y) / config_diviseurVitesse;
					component.position.z += (component.position.z - neighbour.position.z) / config_diviseurVitesse;
				}/*else if(distance > config_distance - config_tolerance){
					component.position.x -= (component.position.x - neighbour.position.x) / config_diviseurVitesse;
					component.position.y -= (component.position.y - neighbour.position.y) / config_diviseurVitesse;
					component.position.z -= (component.position.z - neighbour.position.z) / config_diviseurVitesse;
				}*/
			}
		});
	});
}

function autoFocus(){
	if(selectedComponent){
		let distance = Math.sqrt(Math.pow((camera.position.x - selectedComponent.position.x), 2) + Math.pow((camera.position.y - selectedComponent.position.y), 2) + Math.pow((camera.position.z - selectedComponent.position.z), 2));
		
		if(distance > config_focusDistance - config_tolerance){
			camera.position.x -= (camera.position.x - selectedComponent.position.x) / config_diviseurVitesse;
			camera.position.y -= (camera.position.y - selectedComponent.position.y) / config_diviseurVitesse;
			camera.position.z -= (camera.position.z - selectedComponent.position.z) / config_diviseurVitesse;

			console.log("camera moved !");
		}else{
			selectedComponent = null;
			console.log("camera stopped");
		}
	}
}

// Mises à jour de l'application
function update(){
	autoFocus();
	ajustementEspacement();
	controls.update();
}

// Boucle d'animation
function animate(){
	update();

	// Déclenche l'affichage
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}
