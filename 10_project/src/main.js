const app = require('./app');
const { SERVER_PORT } = require('./config/server');
require('./utils/errorHandler');

app.listen(SERVER_PORT, () => {
  console.log('Start Listening ...');
});
