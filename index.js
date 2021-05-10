require('dotenv').config();
const createServer = require('./src/server');
const setUpMongoose = require('./config/mongoose');
const appConfig = require('./app.config');

async function init() {
  await setUpMongoose(appConfig.mongoUrl);

  return createServer();
}

init().then(server => {
  server.listen(appConfig.PORT, () => {
    console.log(`app is running on port ${appConfig.PORT}`);
  })
})

if (process.env.NODE_ENV === 'production') {
  // Catch any uncaught exceptions in this application
  process.on('uncaughtException', (err) => {
    console.log(`There was an uncaught exception: ${err}`);
  });

  // Catch any unhandled rejections in this application
  process.on('unhandledRejection', (err) => {
    console.log(`There was an unhandled rejection: ${err}`);
  });
}