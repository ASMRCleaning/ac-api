const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

afterAll(async () => {
  await mongoose.disconnect();
});

describe('ERROR 500 POST /login', () => {
  test('should return error 500 when trying to login', async () => {
    const user = {
      username: 'seneca9092',
      password: 'pw',
    };
    const res = await request(app)
      .post('/login')
      .send(user)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
  });
});
