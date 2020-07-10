const fs = require('fs');
const { argv } = require('./utils/args').yargs;
const { logger } = require('./utils/log');

const {
  createSceneFromPoints,
  exportSceneToOBJ,
} = require('../dist/lib.node');

function getFileBuffer(filePath) {
  const encoding = 'utf8';

  return fs.readFileSync(filePath, encoding);
}

function convertFileBufferIntoPointsArray(fileBuffer) {
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

  return points;
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
  const points = convertFileBufferIntoPointsArray(fileBuffer);

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

  const scene = createSceneFromPoints(points, config);

  // TODO: support other export formats
  const output = await exportSceneToOBJ(scene);

  fs.writeFileSync(outputFile, output);
})();
