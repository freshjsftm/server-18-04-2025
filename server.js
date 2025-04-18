const http = require('http');
const connectDB = require('./config/db');

connectDB();

const server = http.createServer();
const port = 3000;

server.listen(port, () => {
  console.log('server started at port ', port);
});
