import {
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  Scene,
  SphereBufferGeometry,
  Vector3,
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

class XYZLoader {
  static parse(fileBuffer) {
    // from '1 2 3\n4 5 6\n'
    // into ['1 2 3', '4 5 6']
    const content = fileBuffer.toString().trim().split('\n');

    // convert space-separated numbers into its own element in an array
    // from ['1 2 3', '4 5 6']
    // into [['1', '2', '3'], ['4', '5', '6']]
    const lines = content.map((line) => line.trim().split(' '));

    // convert each number on a line from a string into a Number
    // from [['1', '2', '3'], ['4', '5', '6']]
    // into [[1, 2, 3], [4, 5, 6]]
    const points = lines.map((line) => line.map((numberStr) => Number(numberStr)));

    // convert [[x, y, z]...] into [Vector3(x, y, z)...]
    const pointsVec = points.map((point) => new Vector3().fromArray(point));

    return pointsVec;
  }
}

function convertPointToGeometry(point, opts = {}) {
  const {
    geometryInstance = DEFAULT_GEOMETRY,
    polygonScale = DEFAULT_SCALE,
  } = opts;

  const geometry = geometryInstance.clone();

  geometry.scale(polygonScale, polygonScale, polygonScale);
  geometry.translate(point.x, point.y, point.z);

  return geometry;
}

function createMeshFromGeometry(geometry, opts = {}) {
  const {
    color = DEFAULT_COLOR,
  } = opts;

  const material = new MeshBasicMaterial({ color });

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
  const pointsGeo = points.map((point) => convertPointToGeometry(point, opts));
  const meshes = pointsGeo.map((geometry) => createMeshFromGeometry(geometry, opts));
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
  createMeshFromGeometry,
  createSceneFromPoints,
  XYZLoader,
};
