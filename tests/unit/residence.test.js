const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

afterAll(async () => {
  await mongoose.disconnect();
});

// describe('GET /customer/residence/:customerID', () => {
//   test('should return the customer given the customer ID', async () => {
//     const res = await request(app).get('/customer/residence/id');
//     expect(res.statusCode).toBe(200);
//     expect(res.body.status).toBe('ok');
//     expect(res.body.firstName).toBe('Test');
//   });
// });

describe('Unauthenticated GET /customer/residence/:customerID', () => {
  test('should return 401 when unautheticated', async () => {
    const res = await request(app).get('/customer/residence/noone');
    expect(res.statusCode).toBe(401);
  });
});

// describe('Error 404 GET /:userID', () => {
//   test('should return 404 when the user cannot be found', async () => {
//     const res = await request(app).get('/user/noone');
//     expect(res.statusCode).toBe(404);
//   });
// });

// describe('PUT /customer/residence/:customerID', () => {
//   test('should update a customer residence', async () => {
//     const res = await request(app).patch('/customer/residence/6331abc9e9ececcc2d449e44').send({
//       username: 'testuser',
//       firstName: 'testfirst',
//       lastName: 'testlast',
//       email: 'test@email.com',
//       phone: '111-111-1111',
//       role: 'customer',
//     });
//     expect(res.statusCode).toBe(200);
//   });
// });
