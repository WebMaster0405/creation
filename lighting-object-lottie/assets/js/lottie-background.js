import * as THREE from './libs/threemodule.js';
import { RoomEnvironment } from './libs/roomenv.js';
import { RoundedBoxGeometry } from './libs/roundgeo.js';
import { LottieLoader } from './libs/lottieloader.js';

let renderer, scene, camera;
let mesh;

setTimeout(()=>{
    
    init();
    animate() ;
}, 4000)


function init() {
    clearTimeout();
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.z = 2.5;

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0x111111 );

    const loader = new LottieLoader();
    loader.setQuality( 2 );
    loader.load( './assets/slow-ripples.json', function ( texture ) {

        const geometry = new RoundedBoxGeometry( 10, 10, 1, 3, 0);
        const material = new THREE.MeshStandardMaterial( { roughness: 1, map: texture } );
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

    } );

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.domElement.style.background = 'radial-gradient(71.29% 71.29% at 50% 50%, #FFFFFF 0%, #F8F2D7 2.79%, #00B9C6 36.77%, #214269 77.1%, #0E1E31 99.48%)';

    document.getElementById('info').appendChild( renderer.domElement );

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    scene.environment = pmremGenerator.fromScene( environment ).texture;

    //

    window.addEventListener( 'resize', onWindowResize );

}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}
