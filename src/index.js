import {
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  Scene,
  SphereBufferGeometry,
  // Vector3,
} from 'three/build/three.module';

import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';

const DEFAULT_SCALE = 0.005;
const DEFAULT_COLOR = 0xff0000;
const DEFAULT_SPHERE_GEOMETRY = new SphereBufferGeometry(1, 5, 5);
const DEFAULT_BOX_GEOMETRY = new BoxBufferGeometry(1, 1, 1);
const DEFAULT_GEOMETRY = DEFAULT_BOX_GEOMETRY;

const SHAPE_TYPES = {
  box: DEFAULT_BOX_GEOMETRY,
  sphere: DEFAULT_SPHERE_GEOMETRY,
};

function convertPointToMesh(point = [], opts = {}) {
  const {
    color = DEFAULT_COLOR,
    geometryInstance = DEFAULT_GEOMETRY,
    polygonScale = DEFAULT_SCALE,
  } = opts;

  const material = new MeshBasicMaterial({ color });
  const geometry = geometryInstance.clone();

  geometry.scale(polygonScale, polygonScale, polygonScale);
  geometry.translate(point[0], point[1], point[2]);

  // TODO: Move to a test (ensure center of the shape == point.xyz)
  // const center = new Vector3();
  // geometry.computeBoundingBox();
  // geometry.boundingBox.getCenter(center);
  // console.log('center', center);
  // console.log('point', point);

  const mesh = new Mesh(geometry, material);

  return mesh;
}

function createSceneFromPoints(points = [], config) {
  const {
    defaultColor = DEFAULT_COLOR,
    polygonScale = DEFAULT_SCALE,
    shapeType,
  } = config;

  // TODO: check if input data includes color
  const color = defaultColor;

  const geometryInstance = SHAPE_TYPES[shapeType];
  const opts = {
    polygonScale,
    geometryInstance,
    color,
  };

  const scene = new Scene();
  const meshes = points.map((point) => convertPointToMesh(point, opts));
  meshes.forEach((mesh) => scene.add(mesh));

  return scene;
}

async function exportSceneToOBJ(scene) {
  const exporter = new OBJExporter();
  const result = await exporter.parse(scene);

  return result;
}

export {
  exportSceneToOBJ,
  convertPointToMesh,
  createSceneFromPoints,
};
