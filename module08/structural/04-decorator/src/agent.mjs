import Http from 'http';

function injectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;

  Http.Server.prototype.emit = function (...args) {
    const [type, request, response] = args;

    if (type === 'request') {
      response.setHeader('X-instrumented-by', 'ErickWendel');
    }

    return oldEmit.apply(this, args);
  };
}

export { injectHttpInterceptor };
