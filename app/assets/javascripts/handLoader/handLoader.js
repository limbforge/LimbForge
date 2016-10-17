if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;

init();

function init() {

  scene = new THREE.Scene();

  scene.add( new THREE.AmbientLight( 0x999999 ) );

  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

  // Z is up for objects intended to be 3D printed.

  camera.up.set( 0, 0, 1 );
  camera.position.set( 0, -9, 6 );

  var light1 = new THREE.PointLight( 0xffffff, 1 );
  light1.position.set( 0, 0, -10);
  var light2 = new THREE.PointLight( 0xffffff, 1 );
  light2.position.set( 20, -25, 0);
  var light3 = new THREE.PointLight( 0xffffff, 1 );
  var light4 = new THREE.PointLight( 0xffffff, 1 );

  camera.add(light1);
  camera.add(light2);
  camera.add(light3);
  camera.add(light4);
  scene.add(camera);

  var grid = new THREE.GridHelper( 25, 50, 0x0f2045, 0x0f2045 );
  grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI/180 ) );
  scene.add(grid);

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  var loader = new THREE.STLLoader();


  // Binary files

  var material = new THREE.MeshPhongMaterial( { color: 0x0f2045, specular: 0x111111, shininess: 200 } );
  loader.load( 'https://s3.amazonaws.com/limbforgestls/EbeArm/Ebe_forearm_L/forearm_L_C4-200_L1-230.stl', function ( geometry ) {
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, 0, 0 );
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( .02, .02, .02 );

    mesh.castShadow = false;
    mesh.receiveShadow = false;

    render();
  });

  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.target.set( 0, 1.2, 2 );
  controls.update();
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function render() {

  renderer.render( scene, camera );

}


  $(document).on('turbolinks:load', function() {
    document.getElementById('display-hand').appendChild( renderer.domElement );
    render();
  });
