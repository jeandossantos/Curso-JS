import http from 'node:http';
import { injectHttpInterceptor } from '../src/index.js';
injectHttpInterceptor();

function handleRequest(req, res) {
  //res.setHeader('X-instrumented-by', 'ErickWendel');
  res.end('Hello World!');
}

const server = http.createServer(handleRequest);

const PORT = 3001;

server.listen(PORT, () => console.log('Server listening on port', PORT));
