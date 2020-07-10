const yargs = require('yargs');

// examples at https://markoskon.com/yargs-examples/
yargs.usage('Usage: $0 [options]');

yargs.option('c', {
  alias: 'defaultColor',
  describe: 'Default color',
  type: 'number',
  default: 0xCCCCCC,
  nargs: 1,
});

yargs.option('i', {
  alias: 'inputFile',
  describe: 'Input file path (xyz File)',
  type: 'string',
  required: true,
  nargs: 1,
});

yargs.option('f', {
  alias: 'outputFileFormat',
  describe: 'Output 3D file format (extension)',
  type: 'string',
  choices: ['obj'],
  default: 'obj',
  nargs: 1,
});

yargs.option('o', {
  alias: 'outputFile',
  describe: 'Output file path',
  type: 'string',
  required: true,
  nargs: 1,
});

yargs.option('p', {
  alias: 'outputPolygon',
  choices: ['box', 'sphere'],
  describe: '3D Shape that represents a point on the point cloud',
  type: 'string',
  default: 'box',
  nargs: 1,
});

yargs.option('s', {
  alias: 'polygonScale',
  describe: '',
  type: 'number',
  default: 0.005,
  nargs: 1,
});

yargs
  .help('h')
  .alias('h', 'help')
  .describe('h', 'Show help');

module.exports = {
  yargs,
};
