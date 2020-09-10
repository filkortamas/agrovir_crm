const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const company = require('./models/partner');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

process.on('SIGINT', function() {
  server.close();
  company.close();
});