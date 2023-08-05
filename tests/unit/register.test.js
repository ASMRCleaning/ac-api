const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

afterAll(async () => {
  await mongoose.disconnect();
});

describe('POST /register', () => {
  test('should successfully create an user', async () => {
    const randomInt = Math.floor(Math.random() * 900000) + 100000;
    const user = {
      username: `test_usr_${randomInt}`,
      firstName: 'test',
      lastName: 'usr',
      email: 'test@test.com',
      phone: '123',
      password: 'pw',
      password2: 'pw',
      role: 'customer',
    };
    const res = await request(app)
      .post('/register')
      .send(user)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('ok');
    expect(res.body.message).toBe('User created');
  });
});

describe('Missing fields POST /register', () => {
  test('should return error 500 when trying to register with not enough fields provided', async () => {
    const user = {
      username: `test_usr`,
      firstName: 'test',
      email: 'test@test.com',
      phone: '123',
      password: 'pw',
      password2: 'pw',
      role: 'customer',
    };
    const res = await request(app)
      .post('/register')
      .send(user)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe('value of last name not accepted');
  });
});
