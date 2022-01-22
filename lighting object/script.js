
const CUBE_SIZE = 10;
const MAP_WIDTH = 28;
const MAP_HEIGHT = 31;

// DIRECTIONS
const NONE = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

// MAP ITEMS
const MAP_EMPTY = 1;
const MAP_WALL = 2;
const MAP_JUNCTION = 3;
const MAP_DIRECTION = 4;

const MAP_PARSE_COLORS = {
  '0,0,0': MAP_EMPTY,
  '255,0,0': MAP_WALL,
  '0,255,0': MAP_JUNCTION,
  '0,0,255': MAP_DIRECTION };



const Utils = {
  AddDot(scene, position, size = 5) {
    const geo = new THREE.Geometry();
    geo.vertices.push(position.clone());
    const mat = new THREE.PointsMaterial({
      size,
      sizeAttenuation: false,
      color: 0xffffff });

    const dot = new THREE.Points(geo, mat);
    scene.add(dot);
  } };


class BoardMap {
  constructor(mapId) {
    this.width = 0;
    this.height = 0;
    this.tiles = [];
    this.mapImageData = this.getImageData(mapId);
    this.parseMap();
  }

  getImageData(id) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.querySelector(id);
    const { width: w, height: h } = img;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0);
    this.width = w;
    this.height = h;
    return ctx.getImageData(0, 0, w, h).data;
  }

  getMapPixelRGB(x, y) {
    const { mapImageData: data, width } = this;
    const idx = (x + width * y) * 4;
    return [
    Math.round(data[idx + 0] / 255) * 255,
    Math.round(data[idx + 1] / 255) * 255,
    Math.round(data[idx + 2] / 255) * 255];

  }

  stepToDirection(x, y, direction) {
    let xTo = x;
    let yTo = y;
    switch (direction) {
      case UP:yTo -= 1;break;
      case RIGHT:xTo += 1;break;
      case DOWN:yTo += 1;break;
      case LEFT:xTo -= 1;break;}

    return [xTo, yTo];
  }

  getTileAt(x, y, direction = NONE) {
    let [xTo, yTo] = this.stepToDirection(x, y, direction);
    if (x <= this.width && y <= this.height) {
      let idx = yTo * this.width + xTo;
      return this.tiles[idx];
    }
  }

  getNearestNeighborFrom(x, y, direction, type) {
    let next = this.getTileAt(x, y, direction);
    let [xTo, yTo] = this.stepToDirection(x, y, direction);
    if (next === type) {
      return [xTo, yTo];
    } else if (next) {
      return this.getNearestNeighborFrom(xTo, yTo, direction, type);
    }
  }

  getIndexFromCoords(x, y) {
    return y * this.width + x;
  }

  getCoordsFromIndex(idx) {
    const x = idx % this.width;
    const y = Math.floor(idx / this.width);
    return [x, y];
  }

  parseMap() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const [r, g, b] = this.getMapPixelRGB(x, y);
        this.tiles.push(MAP_PARSE_COLORS[`${r},${g},${b}`]);
      }
    }
  }}


class MapBoundariesMesh {
  constructor(boardMap) {
    this.boardMap = boardMap;
    this.geometry = new THREE.Geometry();
    this.generateGeometry();
  }

  generateGeometry() {
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        let idx = y * MAP_WIDTH + x;
        if (this.boardMap.tiles[idx] === MAP_WALL) {
          this.putBlock(x, y);
        }
      }
    }
  }

  putBlock(x, y) {
    const boxWidth = CUBE_SIZE / MAP_WIDTH;
    const boxHeight = CUBE_SIZE / MAP_HEIGHT;
    const halfSize = CUBE_SIZE / 2;
    const boxElevation = 0.25;
    const geo = new THREE.BoxGeometry(boxWidth, boxElevation, boxHeight);
    const tX = -halfSize + x * boxWidth + boxWidth / 2;
    const tY = -halfSize + y * boxHeight + boxHeight / 2;
    geo.translate(tX, boxElevation / 2, tY);
    const mesh = new THREE.Mesh(geo);
    this.geometry.merge(mesh.geometry, mesh.matrix);
  }}


class Particles {
  constructor() {
    this.clusters = [];
    this.scales = [];
    this.initParticles();
    this.ripples = [];
  }

  initParticles() {
    this.texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/particle.png');
    for (let i = 0; i < 5; i++) {
      const cluster = {
        scale: i + 2,
        speed: THREE.Math.randFloat(0.5, 1.8),
        points: this.getCluster(100) 
      };

      this.clusters.push(cluster);
    }
    
    
  }

  getCluster(count) {
    const geo = new THREE.Geometry();
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: THREE.Math.randFloat(0.1, 0.25),
      map: this.texture,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0 });


    for (let i = 0; i < count; i++) {
      let p = new THREE.Vector3();
      p.x = THREE.Math.randFloatSpread(2);
      p.y = THREE.Math.randFloatSpread(2);
      p.z = THREE.Math.randFloatSpread(2);
      geo.vertices.push(p);
    }
    return new THREE.Points(geo, mat);
  }

  update(delta) {
    for (let i = 0; i < this.clusters.length; i++) {
      const cluster = this.clusters[i];

      if (cluster.scale > 12) {
        cluster.scale = 2;
        cluster.points.material.opacity = 1;
      }

      cluster.scale += 0.45 * delta * cluster.speed;
      cluster.points.scale.set(cluster.scale, cluster.scale, cluster.scale);
      //const color = this.startColor.lerp(this.endColor, cluster.scale / 12);


      if (cluster.scale > 8) {
        const opacity = THREE.Math.lerp(1, 0, 1 - (12 - cluster.scale) / 4);
        cluster.points.material.opacity = opacity;
      }
    }
  }
}


class Trails {
  constructor(map) {
    this.group = new THREE.Object3D();
    this.position = new THREE.Vector3();
    this.map = map;
    this.maxPositions = 25;
    this.history = [];
    this.junctionTiles = [];
    this.init();
    this.spawn();
  }

  init() {
    this.geometry = new THREE.Geometry();
    const mat = new MeshLineMaterial({ color: new THREE.Color(0xffffff), side: THREE.DoubleSide });
    this.line = new MeshLine();
    this.mesh = new THREE.Mesh(this.line.geometry, mat);
    this.group.add(this.mesh);
    for (let i = 0; i < this.maxPositions; i++) {
      this.geometry.vertices.push(new THREE.Vector3());
    }
    this.map.tiles.forEach((t, idx) => {
      if (t === MAP_JUNCTION) {
        this.junctionTiles.push(idx);
      }
    });
    this.light = new THREE.PointLight(0x00ff00, 1, 5);
    this.group.add(this.light);
    //this.debug();
  }

  spawn() {
    const { position, line } = this;
    const { vertices } = this.geometry;
    const wayPoints = this.getWayPoints();
    vertices.forEach(v => v.copy(wayPoints[0]));
    this.position.copy(wayPoints[0]);
    this.light.position.copy(wayPoints[0]);
    line.setGeometry(this.geometry, p => p * 0.5);
    this.startPath(wayPoints);
  }

  getTileDirections(x, y) {
    const { map } = this;
    return [UP, RIGHT, DOWN, LEFT].filter(d => {
      const tile = map.getTileAt(x, y, d);
      return tile !== undefined && tile === MAP_DIRECTION;
    });
  }

  debug() {
    this.junctionTiles.forEach(t => {
      const [x, y] = this.map.getCoordsFromIndex(t);
      Utils.AddDot(this.group, this.scaleTilePosition(new THREE.Vector3(x, y, 0)));
    });
  }

  scaleTilePosition(position) {
    const { map } = this;
    const tileScaleX = CUBE_SIZE / map.width;
    const tileScaleY = CUBE_SIZE / map.height;
    position.set(
    (position.x + tileScaleX * 1.5) * tileScaleX,
    (position.y + tileScaleX * 1.5) * tileScaleY, 0);
    return position;
  }

  getWayPoints() {
    const { map, junctionTiles: jTiles } = this;
    const startTile = jTiles[~~(Math.random() * jTiles.length)];
    let [xCurrent, yCurrent] = map.getCoordsFromIndex(startTile);
    const visitedTiles = [];
    let insert = true;
    while (insert) {
      visitedTiles.push(map.getIndexFromCoords(xCurrent, yCurrent));

      // find available directions from current coords
      const directions = this.getTileDirections(xCurrent, yCurrent);

      // get all neighbours for all posibile directions
      const neighbours = directions.
      map(d => map.getNearestNeighborFrom(xCurrent, yCurrent, d, MAP_JUNCTION))

      // exclude already visited ones
      .filter(n => visitedTiles.indexOf(map.getIndexFromCoords(n[0], n[1])) === -1);

      // pick one from available neighbours
      const nPick = neighbours[~~(Math.random() * neighbours.length)];
      if (nPick) {
        [xCurrent, yCurrent] = nPick;
        insert = true;
      } else {
        insert = false;
      }
    }
    const tileScaleX = map.width / CUBE_SIZE * 0.1;
    const tileScaleY = map.height / CUBE_SIZE * 0.1;
    return visitedTiles.map(idx => {
      let [x, y] = map.getCoordsFromIndex(idx);
      return this.scaleTilePosition(new THREE.Vector3(x, y, 0));
    });
  }

  updatePosition() {
    const { position } = this;
    this.light.position.copy(position);
    this.line.advance(position);
  }

  startPath(waypoints) {
    const { position } = this;
    this.timeline = new TimelineMax({ onComplete: () => {
        TweenMax.to(this.position, 1, {
          onUpdate: this.updatePosition.bind(this),
          onComplete: () => {
            setTimeout(this.spawn.bind(this), Math.random() * 2500 + 500);
          } });

      } });
    waypoints.forEach((pos, idx) => {
      this.timeline.to(this.position, 0.25, {
        x: pos.x,
        y: pos.y,
        onUpdate: this.updatePosition.bind(this),
        ease: Linear.easeNone });


      if (idx === 0) {
        this.timeline.to(this.light, 0.2, { power: 1.5 * 4 * Math.PI });
      }

      if (idx === waypoints.length - 1) {
        this.timeline.to(this.light, 0.4, { power: 0.1 * 4 * Math.PI }, '-=0.45');
      }

    });
  }}


class Ripples {
  constructor(){
    this.r = 0;
    this.count = 0;
    this.initRippleLine()
  }

  initRippleLine(){
    this.ripple_group = new THREE.Group();
    let ripple_line = this.generateRippleLine();
    this.ripple_group.add(ripple_line);
    return ripple_line;
  }

  generateRippleLine(){
    const circleRadius = 30;
    const circleShape = new THREE.Shape();
    circleShape.moveTo(0, circleRadius);
    circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
    circleShape.quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius );
    circleShape.quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 );
    circleShape.quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );
    const points = circleShape.getPoints();
    const spacedPoints = circleShape.getSpacedPoints( 20 );

    const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
    const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );

    // solid line

    const line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    line.position.set( 0, 0, 0, -125 );
    line.rotation.set( 0, 0, 60 );
    line.scale.set( 0.2, 0.2, 0.2 );
    return line;
  }
  update(delta){
    
  }
}
class App {

  constructor() {
    this.width = 0;
    this.height = 0;
    this.mouse = new THREE.Vector2(0, 0);
    this.orbitControls = null;
    this.renderer;
    this.carmera_zoom = false;

    this.init();
    this.initHelpers();
    this.attachEvents();
    this.initLights();
    this.initMazeMesh();
    // this.initTrails();
    this.initParticles();
    // this.initRippleLine();
    this.initGodRays();
    this.setupComposer();
    this.setupProstprocessing();
    this.addRenderTargetImage();
    
    this.updateSize();
    this.onFrame(0);
    this.addGUI();
  }

  addGUI() {
    this.gui = new dat.GUI();
    // const setCubeColor = c => {this.mazeMesh.material.color.setHex(c.replace('#', '0x'));};
    const setOutterLightColor = c => {this.outterLight.color.setHex(c.replace('#', '0x'));};
    const setLightSphereColor = c => {this.lightSphere.material.color.setHex(c.replace('#', '0x'));};
    this.cubeColor = "#4583dc";
    this.outterLightColor = "#c743ff";
    this.lightSphereColor = '#ffd242';
    // this.gui.addColor(this, 'cubeColor').onChange(setCubeColor);
    // this.gui.addColor(this, 'outterLightColor').onChange(setOutterLightColor);
    this.gui.addColor(this, 'lightSphereColor').onChange(setLightSphereColor);
  }

  init() {
    const { innerWidth: w, innerHeight: h } = window;
    const aspect = w / h;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(w, h);
    // this.renderer.gammaInput = true;
    this.renderer.domElement.style.background = 'radial-gradient(71.29% 71.29% at 50% 50%, #FFFFFF 0%, #F8F2D7 2.79%, #00B9C6 36.77%, #214269 77.1%, #0E1E31 99.48%)';
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.camera.position.set(14, 14, 14);
    this.clock = new THREE.Clock();
    // document.body.appendChild(this.renderer.domElement);
    document.getElementById("main").appendChild(this.renderer.domElement);
       
    var domeGeometry = new THREE.SphereGeometry(300, 300,300);

    let g = new THREE.PlaneGeometry(2, 2);
    let m = new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: new THREE.Color(0x0a97ab)},
          color2: { value: new THREE.Color(0x000000)},
          ratio: {value: innerWidth / innerHeight}
        },
        vertexShader: `varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = vec4(position, 1.);
          }`,
              fragmentShader: `varying vec2 vUv;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform float ratio;
            void main(){
              vec2 uv = (vUv - 0.5) * vec2(ratio, 1.);
              gl_FragColor = vec4( mix( color1, color2, length(uv)), 1. );
            }`
        })
    let p = new THREE.Mesh(domeGeometry, m);
    // this.scene.add(p);


    // var domeMaterial = new THREE.MeshPhongMaterial({
    //   side: THREE.DoubleSide,
    //   vertexColors: true,
    //   uniforms: {
    //   color1: { value: new THREE.Color(0xff00ff)},
    //   color2: { value: new THREE.Color(0xff0000)},
    //   ratio: {value: innerWidth / innerHeight}
    // },
    //   shading: THREE.FlatShading,
    //   side: THREE.BackSide });

    // var dome = new THREE.Mesh(domeGeometry, m);
    // this.scene.add(dome);

   
  }

  initHelpers() {
    const { scene, camera, renderer } = this;
    const c = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    c.autoRotate = true;
    c.autoRotateSpeed = 0.03;

    c.enableDamping = true;
    c.dampingFactor = 0.25;
    c.minDistance = 1;
    c.maxDistance = 1000;
    this.orbitControls = c;

    // this.axesHelper = new THREE.AxesHelper(500);
    // scene.add(this.axesHelper);
  }
  attachEvents() {
    window.addEventListener("resize", this.updateSize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("click", this.onMouseClick.bind(this));
  }

  onMouseMove(event) {
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onMouseClick(event){
    const { scene, camera, renderer } = this;
    this.carmera_zoom = true;
    // camera.fov = camera.fov * 100;
    // camera.updateProjectionMatrix();
    // this.updateCameraTilt();
    
  }
  carmeraZoom (time){
    const { scene, camera, renderer } = this;
    if(this.carmera_zoom){
      camera.zoom += 0.15;
      camera.updateProjectionMatrix();
 
    }
  }
  initParticles() {
    const { scene } = this;
    this.particles = new Particles();
    this.particles.clusters.forEach(cluster => {
      scene.add(cluster.points);
    });
    this.particles.ripples.forEach(ripple => {
      scene.add(ripple);
    });
  }

  initRippleLine(){
    const {scene} = this;
    // this.rippleLines = new Ripples();
    // scene.add(this.rippleLines.initRippleLine());
  }

  initLights() {
    const { scene } = this;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    const innerLight = new THREE.PointLight(0xfffff);
    const outterLight = new THREE.PointLight(0xc743ff, 3, 25);
    outterLight.position.set(14, 14, 14);
    this.outterLight = outterLight;
    // Utils.AddDot(scene, outterLight.position);
    scene.add(innerLight);
    scene.add(outterLight);
    scene.add(ambientLight);
  
  }
  setupProstprocessing() {
    const { composer } = this;
    const { innerWidth: w, innerHeight: h } = window;


    this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    this.effectFXAA.uniforms['resolution'].value.set(1 / w, 1 / h);
    this.effectFXAA.renderToScreen = false;
    composer.addPass(this.effectFXAA);
    
    this.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.9, 0.85);
    this.bloomPass.threshold = 0.0;
    this.bloomPass.strength = 2;
    this.bloomPass.renderToScreen = false;
    composer.addPass(this.bloomPass);
  }

  initGodRays() {
    const { scene, mazeMesh } = this;
    const geoSphere = new THREE.SphereGeometry(0.5, 32, 16);
    const matSphere = new THREE.MeshBasicMaterial({ color: 0xe6e2d8, transparent: true });
    this.lightSphere = new THREE.Mesh(geoSphere, matSphere);
    this.lightSphere.layers.set(1);
    this.lightSphere.material.opacity = 1;
    scene.add(this.lightSphere);

    // const matOcclusion = new THREE.MeshBasicMaterial({ color: 0x0 });
    // this.occlusionMesh = new THREE.Mesh(mazeMesh.geometry, matOcclusion);
    // this.occlusionMesh.position.z = 0;
    // this.occlusionMesh.layers.set(1);
    // scene.add(this.occlusionMesh);
  }

  getScriptContent(id) {
    return document.querySelector(id).textContent;
  }

  

  setupComposer() {
    const { renderer, camera, scene } = this;
    const { innerWidth: w, innerHeight: h } = window;
    const scale = 0.5;
    this.occlusionRenderTarget = new THREE.WebGLRenderTarget(w * scale, h * scale);
    this.occlusionComposer = new THREE.EffectComposer(renderer, this.occlusionRenderTarget);
    this.occlusionComposer.addPass(new THREE.RenderPass(scene, camera));
    let occPass = new THREE.ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
        exposure: { value: 0.8 },
        decay: { value: 0.4 },
        density: { value: 0.3 },
        weight: { value: 5 },
        samples: { value: 50 } 
      },
      vertexShader: this.getScriptContent('#shader-passthrough-vertex'),
      fragmentShader: this.getScriptContent('#shader-volumetric-light-fragment') });

    occPass.needsSwap = false;
    this.occlusionPass = occPass;
    this.occlusionComposer.addPass(occPass);


    this.composer = new THREE.EffectComposer(renderer);
    this.composer.addPass(new THREE.RenderPass(scene, camera));
    let addPass = new THREE.ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        tAdd: { value: null } },

      vertexShader: this.getScriptContent('#shader-passthrough-vertex'),
      fragmentShader: this.getScriptContent('#shader-additive-fragment') });


    addPass.uniforms.tAdd.value = this.occlusionRenderTarget.texture;

    this.composer.addPass(addPass);
    addPass.renderToScreen = true;
  }

  addRenderTargetImage() {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        vertexShader: this.getScriptContent('#shader-passthrough-vertex'),
        fragmentShader: this.getScriptContent('#shader-passthrough-fragment') } });


    mat.uniforms.tDiffuse.value = this.occlusionRenderTarget.texture;
    const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), mat);
    mesh.visible = false;
    this.composer.passes[1].scene.add(mesh);
  }

  initMazeMesh() {
    const { scene } = this;
    const geo = new THREE.Geometry();
    const mat = new THREE.MeshPhongMaterial({
      color: 0xffffff });

    this.mazeMesh = new THREE.Mesh(geo, mat);
    this.mazeMesh.updateMatrix();
    scene.add(this.mazeMesh);
  }

  getGamePlaneGeometry(mapId) {
    const boardMap = new BoardMap(mapId);
    const mapBoundariesMesh = new MapBoundariesMesh(boardMap);
    return new THREE.Mesh(mapBoundariesMesh.geometry);
  }

  

  updateSize() {
    const { renderer, camera, composer, occlusionComposer } = this;
    const { innerWidth: w, innerHeight: h } = window;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    composer.setSize(w, h);
    occlusionComposer.setSize(w, h);
    this.width = w;
    this.height = h;
  }

  updateOcclusionIntensity(time) {
    const { uniforms: u } = this.occlusionPass;
    const n0 = (noise.perlin2(time * 0.0005, 0) + 4) * 0.5;
    const n1 = (noise.perlin2(0, time * 0.0005) +1) * 0.8;
    u.exposure.value = THREE.Math.lerp(0.05, 0.21, n0);
    u.decay.value = THREE.Math.lerp(0.95, 0.98, n1);
    u.density.value = THREE.Math.lerp(0.2, 0.4, n0);
    u.weight.value = THREE.Math.lerp(0.3, 0.7, n1);
  }

  updateLightPosition(time) {
    const { lightSphere } = this;
    // const n0 = (noise.perlin2(time * 0.0005, 0) + 1) * 0.5;
    // lightSphere.position.y = THREE.Math.lerp(-1, 1, n0);
  }

  updateCameraTilt() {
    const { camera, mouse } = this;
    TweenMax.to(this.camera.position, 100, {
      x: mouse.x * 550,
      y: mouse.y * 550,
      z: mouse.x * mouse.y * 300 ,
    });

  }

  onFrame(time) {
    const { renderer, scene, camera, clock } = this;

    requestAnimationFrame(this.onFrame.bind(this));
    this.orbitControls.update();
    camera.layers.set(1);
    // this.updateCameraTilt();
    this.particles.update(clock.getDelta());
    // this.rippleLines.update(clock.getDelta());
    this.updateOcclusionIntensity(time);
    this.updateLightPosition(time);
    this.carmeraZoom(time);
    renderer.setClearColor(0x000000, 0);
    this.occlusionComposer.render();
    camera.layers.set(0);
    camera.lookAt(scene.position);
    
    this.renderer.render(this.scene, this.camera);
    this.composer.render();    
    
  }}



window.app = new App();