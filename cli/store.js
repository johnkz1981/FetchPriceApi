const fs = require('fs');
const path = require('path');

module.exports = (componentName) => {
  const componentCode = `
export default {
  state: {
  },
  mutations:{
  },
  actions:{
  },
  getters: {
  }
}
`;

  fs.writeFileSync(
      path.resolve(__dirname, '..', 'src', 'store',`${componentName}.js`),
      componentCode,
  );
};