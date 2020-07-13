const fs = require('fs');
const { argv } = require('./utils/args').yargs;
const { logger } = require('./utils/log');

const {
  createSceneFromPoints,
  exportSceneToOBJ,
  XYZLoader,
} = require('../dist/lib.node');

function getFileBuffer(filePath) {
  const encoding = 'utf8';

  return fs.readFileSync(filePath, encoding);
}

(async () => {
  const {
    defaultColor,
    inputFile,
    outputFileFormat,
    outputFile,
    outputPolygon,
    polygonScale,
  } = argv;

  const fileBuffer = getFileBuffer(inputFile);
  const points = XYZLoader.parse(fileBuffer);

  const config = {
    polygonScale,
    shapeType: outputPolygon,
  };

  const loggingMessage = [
    `Number of Points: ${points.length}`,
    `Output file format: ${outputFileFormat}`,
    `Polygon Scale: ${polygonScale}`,
    `Polygon Type: '${outputPolygon}'`,
    `Default Color: '${defaultColor}'`,
  ].join('\n');

  logger.log('info', loggingMessage);

  // generate THREE.Scene from a list of 3D Points
  const scene = createSceneFromPoints(points, config);

  // TODO: support other export formats
  const output = await exportSceneToOBJ(scene);

  fs.writeFileSync(outputFile, output);
})();
