const minimist = require('minimist');

const fs = require('fs');
const path = require('path');

const args = minimist(process.argv.slice(2), {
  alias: {
    vue: 'v',
    name: 'n'
  }
});

const componentName = args.name;

fs.writeFileSync(
    path.resolve(__dirname, '..', 'src', 'store', `${componentName}.js`),
    `export default from './${componentName}';`,
);

require('./store')(args.name);