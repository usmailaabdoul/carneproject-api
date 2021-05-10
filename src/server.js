const http = require('http');
const createApplication = require('./app');

/**
 *
 *
 * @return {*} 
 */
function createServer() {
  const app = createApplication();
  return app;
}

module.exports = createServer;