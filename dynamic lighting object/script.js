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
  }

  initParticles() {
    this.texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/particle.png');
    for (let i = 0; i < 5; i++) {
      const cluster = {
        scale: i + 2,
        speed: THREE.Math.randFloat(0.5, 1.8),
        points: this.getCluster(100) };

      this.clusters.push(cluster);
    }
  }

  getCluster(count) {
    const geo = new THREE.Geometry();
    const mat = new THREE.PointsMaterial({
      color: 0xffff00,
      size: THREE.Math.randFloat(0.1, 0.25),
      map: this.texture,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9 });


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
  }}

class App {

  constructor() {
    this.width = 0;
    this.height = 0;
    this.mouse = new THREE.Vector2(0, 0);
    this.init();
    this.initLights();
    this.initParticles();
    this.initGodRays();
    this.setupComposer();
    this.setupProstprocessing();
    this.attachEvents();
    this.updateSize();
    this.onFrame(0);
    this.initHelpers();
  }
  init() {
    const { innerWidth: w, innerHeight: h } = window;
    const aspect = w / h;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(w, h);
    // this.renderer.gammaInput = true;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x0f3440 );
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.set( 160, 40, 10 );
    // this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10000);
    // this.camera.position.set(14, 14, 30);
    this.clock = new THREE.Clock();
    document.getElementById('canvas').appendChild(this.renderer.domElement);
  }

  initParticles() {
    const { scene } = this;
    this.particles = new Particles();
    this.particles.clusters.forEach(cluster => {
      scene.add(cluster.points);
    });
  }

  initLights() {
    
    const { scene } = this;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    const innerLight = new THREE.PointLight(0xfffff);
    const outterLight = new THREE.PointLight(0xc743ff, 3, 25);
    outterLight.position.set(14, 14, 14);
    this.outterLight = outterLight;
    scene.add(innerLight);
    scene.add(outterLight);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 15, 40, 35 );
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;
    scene.add( spotLight );
  }

  setupProstprocessing() {
    const { composer } = this;
    const { innerWidth: w, innerHeight: h } = window;
    this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    this.effectFXAA.uniforms['resolution'].value.set(1 / w, 1 / h);
    composer.addPass(this.effectFXAA);
    this.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 0.85);
    this.bloomPass.renderToScreen = true;
    composer.addPass(this.bloomPass);
  }

  initGodRays() {
    const { scene } = this;
    const geoSphere = new THREE.SphereGeometry(3, 32, 16);
    const matSphere = new THREE.MeshBasicMaterial({ color: 0xffa602, transparent: true });
    this.lightSphere = new THREE.Mesh(geoSphere, matSphere);
    this.lightSphere.layers.set(1);
    this.lightSphere.material.opacity = 1;
    scene.add(this.lightSphere);


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
        exposure: { value: 0.21 },
        decay: { value: 0.95 },
        density: { value: 0.1 },
        weight: { value: 0.7 },
        samples: { value: 50 } },

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
    //addPass.renderToScreen = true;
  }


  getGamePlaneGeometry(mapId) {
    const boardMap = new BoardMap(mapId);
    const mapBoundariesMesh = new MapBoundariesMesh(boardMap);
    return new THREE.Mesh(mapBoundariesMesh.geometry);
  }

  attachEvents() {
    window.addEventListener("resize", this.updateSize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  initHelpers() {
    const { scene, camera, renderer } = this;
    const c = new THREE.OrbitControls(camera, renderer.domElement);
    c.addEventListener( 'change', render );
    c.enablePan = false;
    c.enableDamping = true;
    c.dampingFactor = 0.25;
    c.minDistance = 1;
    c.maxDistance = 10000;
    this.orbitControls = c;
    // this.axesHelper = new THREE.AxesHelper(1500);
    // scene.add(this.axesHelper);
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
    const n0 = (noise.perlin2(time * 0.0005, 0) + 1) * 0.5;
    const n1 = (noise.perlin2(0, time * 0.0005) + 1) * 0.5;
    // u.exposure.value = THREE.Math.lerp(0.05, 0.21, n0);
    // u.decay.value = THREE.Math.lerp(0.95, 0.98, n1);
    // u.density.value = THREE.Math.lerp(0.2, 0.4, n0);
    // u.weight.value = THREE.Math.lerp(0.1, 0.7, n1);
    u.exposure.value = THREE.Math.lerp(0.05, 0.21, 0.45);
    u.decay.value = THREE.Math.lerp(0.95, 0.98, 0.45);
    u.density.value = THREE.Math.lerp(0.2, 0.4, 0.45);
    u.weight.value = THREE.Math.lerp(0.1, 0.7, 0.45);
  }

  updateLightPosition(time) {
    const { lightSphere } = this;
    const n0 = (noise.perlin2(time * 0.0005, 0) + 1) * 0.5;
    lightSphere.position.y = THREE.Math.lerp(-1, 1, n0);
  }

  updateCameraTilt() {
    const { camera, mouse } = this;
    TweenMax.to(this.camera.position, 1.5, {
      x: 14 + mouse.x * 2.5,
      y: 14 + mouse.y * 2.5,
      z: 30 + mouse.x * mouse.y });

  }

  onFrame(time) {
    const { renderer, scene, camera, clock } = this;
    requestAnimationFrame(this.onFrame.bind(this));
    // this.orbitControls.update();
    camera.layers.set(1);
    this.updateCameraTilt();
    this.particles.update(clock.getDelta());
    this.updateOcclusionIntensity(time);
    this.updateLightPosition(time);
    renderer.setClearColor(0x0, 0);
    this.occlusionComposer.render();
    camera.layers.set(0);
    camera.lookAt(scene.position);
    this.composer.render();
    // renderer.render(scene, camera);
  }}



window.app = new App();