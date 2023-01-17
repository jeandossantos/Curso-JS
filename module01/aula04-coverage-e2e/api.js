const http = require('http');

const DEFAULT_USER = {
  username: 'jean',
  password: 'password',
};

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact us page');
    return res.end();
  },
  '/login:post': async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data);

      const isCredentialsValid =
        DEFAULT_USER.username !== user.username ||
        DEFAULT_USER.password !== user.password;

      if (isCredentialsValid) {
        res.writeHead(401);
        res.write('Logging failed!');
        return res.end();
      }

      res.write('Logging has succeeded!');
      return res.end();
    }
  },
  default: (req, res) => {
    res.write('Hello World!');
    return res.end();
  },
};

const handler = function (req, resp) {
  const { url, method } = req;

  const routerKey = `${url}:${method.toLowerCase()}`;

  const choose = routes[routerKey] || routes.default;

  resp.writeHeader(200, { 'Content-Type': 'text/html' });

  return choose(req, resp);
};

const app = http
  .createServer(handler)
  .listen(3001, () => console.log('running on port 3001'));

module.exports = app;
