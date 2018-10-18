const fs = require('fs');
const deepMerge = require('deepmerge');
const clearConsole = require('react-dev-utils/clearConsole');
const Logger = require('@deity/falcon-logger');
const paths = require('./../paths');

/**
 * Get falcon-client build config
 * @param {string} buildConfigFileName='falcon-client.build.config.js' falcon-client build time config relative path
 * @returns {object} falcon-client build time config
 */
function getBuildConfig(buildConfigFileName = 'falcon-client.build.config.js') {
  let config = {
    clearConsole: true,
    envToBuildIn: [],
    i18n: {}
  };

  const buildConfigPath = paths.resolveApp(buildConfigFileName);
  if (fs.existsSync(buildConfigPath)) {
    try {
      // eslint-disable-next-line
      config = deepMerge(config, require(buildConfigPath), { arrayMerge: (destination, source) => source });
    } catch (e) {
      clearConsole();
      Logger.error(`Invalid falcon-client.build.config.js file, (${buildConfigFileName}).`, e);
      process.exit(1);
    }
  }

  return config;
}

module.exports = {
  getBuildConfig
};
