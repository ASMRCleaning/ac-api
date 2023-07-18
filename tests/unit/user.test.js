const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

afterAll(async () => {
  await mongoose.disconnect();
});

// describe('GET /:userID', () => {
//   test('should return the user given the user ID', async () => {
//     const res = await request(app).get('/user/seneca9092');
//     expect(res.statusCode).toBe(200);
//     expect(res.body.status).toBe('ok');
//     expect(res.body.firstName).toBe('Test');
//   });
// });

describe('Unauthenticated GET /:userID', () => {
  test('should return 401 when unautheticated', async () => {
    const res = await request(app).get('/user/noone');
    expect(res.statusCode).toBe(401);
  });
});

// describe('Error 404 GET /:userID', () => {
//   test('should return 404 when the user cannot be found', async () => {
//     const res = await request(app).get('/user/noone');
//     expect(res.statusCode).toBe(404);
//   });
// });
