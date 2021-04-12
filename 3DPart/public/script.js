import * as THREE from './libs/three.js/build/three.module.js';

import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';

//(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

// Objets
let camera, scene, renderer, controls, mouse, raycaster, selectedComponent;

// Loaders
const textureLoaderSky = new THREE.TextureLoader();
textureLoaderSky.setPath( 'public/skybox/' );

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

// Lance le programme
init();
animate();

// Initialisation
function init(){
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
	camera.position.set(-0, 0, 10);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x132644);

	mouse = new THREE.Vector2();
	raycaster = new THREE.Raycaster();

	document.body.appendChild(renderer.domElement);

	// ----------------------------------------------
	// Création et insertion d'objets
	const geometry = new THREE.BoxGeometry(1,1,1);
	const material = new THREE.MeshBasicMaterial({ color: 0x85E36B });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// Skybox
	const NightFront = textureLoaderSky.load('Night-front.png');
	const NightLeft = textureLoaderSky.load('Night-left.png');
	const NightRight = textureLoaderSky.load('Night-right.png');
	const NightBack = textureLoaderSky.load('Night-back.png');
	const NightTop = textureLoaderSky.load('Night-top.png');
	const NightBottom = textureLoaderSky.load('Night-bottom.png');
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
	controls.maxDistance = 40;
	controls.update();
}

// Mises à jour de l'application
function update(){
	controls.update();
}

// Boucle d'animation
function animate(){
	update();

	// Déclenche l'affichage
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}
