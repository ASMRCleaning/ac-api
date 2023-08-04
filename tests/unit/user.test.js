const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET All Users', () => {
  test('should return all users', async () => {
    const res = await request(app).get('/user/all').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.users)).toBe(true);
  });
});

describe('Basic Auth GET /user/', () => {
  test('should return error 404', async () => {
    const res = await request(app).get(`/user/`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('GET /user/:userID', () => {
  test('should return the user given the user ID', async () => {
    const id = '64adddd29dea2d05d4369e44';

    const res = await request(app).get(`/user/${id}`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.user._id).toBe(id);
  });
});

describe('Invalid userID GET /user/:userID', () => {
  test('should return error 404 when the user ID cannot be found', async () => {
    const id = 'cant_find_me';

    const res = await request(app).get(`/user/${id}`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe('User Class error [byId]: cannot find user');
  });
});

describe('Unauthenticated GET /:userID', () => {
  test('should return 401 when unautheticated', async () => {
    const res = await request(app).get('/user/noone').auth('who', 'what');
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('Unauthorized');
  });
});

describe('Invalid Basic Auth PUT /user/', () => {
  test('should return error when trying to PUT', async () => {
    const updatedUserData = {
      firstName: 'fn',
      lastName: 'ln',
      password: 'pw',
      password2: 'pw',
      email: 'e@mail.com',
      phone: '1234567890',
    };

    const res = await request(app)
      .put('/user/')
      .send(updatedUserData)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
  });
});

describe('Invalid Basic Auth PUT /user/password', () => {
  test('should return error when trying to PUT', async () => {
    const updatedPassword = {
      password: 'pw',
      password2: 'pw',
    };

    const res = await request(app)
      .put('/user/password')
      .send(updatedPassword)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /user/password/:id', () => {
  test('should update the password of user provided by the id', async () => {
    const id = '64adddd29dea2d05d4369e44';
    const updatedPassword = {
      password: 'pw',
      password2: 'pw',
    };

    const res = await request(app)
      .put(`/user/password/${id}`)
      .send(updatedPassword)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Invalid Password Object PUT /user/password/:id', () => {
  test('should return Error 404', async () => {
    const id = '64adddd29dea2d05d4369e44';
    const updatedPassword = {
      pass: 'pw',
      pass2: 'pw',
    };

    const res = await request(app)
      .put(`/user/password/${id}`)
      .send(updatedPassword)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe('User Class error [setData]: cannot password');
  });
});

describe('Invalid ID PUT /user/password/:id', () => {
  test('should show error 404', async () => {
    const id = 'nobody';
    const updatedPassword = {
      password: 'pw',
      password2: 'pw',
    };

    const res = await request(app)
      .put(`/user/password/${id}`)
      .send(updatedPassword)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});
