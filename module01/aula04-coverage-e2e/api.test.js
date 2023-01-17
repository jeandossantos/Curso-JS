const { describe, it } = require('mocha');
const assert = require('assert');
const request = require('supertest');

const app = require('./api');

describe('Api suite test', () => {
  describe('/contact', () => {
    it('should return contact page with status 200', async () => {
      const response = await request(app).get('/contact').expect(200);
      assert.deepStrictEqual(response.text, 'contact us page');
    });

    it('should request page /hi and redirect to /hello page', async () => {
      const response = await request(app).get('/hi').expect(200);
      assert.deepStrictEqual(response.text, 'Hello World!');
    });

    it('should return page /login with status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'jean',
          password: 'password',
        })
        .expect(200);

      assert.deepStrictEqual(response.text, 'Logging has succeeded!');
    });

    it('should unauthorize with wrong credentials with status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'testando',
          password: '123',
        })
        .expect(401);

      assert.ok(response.unauthorized);

      assert.deepStrictEqual(response.text, 'Logging failed!');
    });
  });
});
