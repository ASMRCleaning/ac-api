const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

afterAll(async () => {
  await mongoose.disconnect();
});

const residence = {
  houseType: 'condo',
  size: 1200,
  empty: false,
  furnished: true,
  pet: true,
  bedroom: 10,
  bathroom: 10,
  den: 10,
  address: {
    streetAddress: 'address',
    unit: 'unit 1',
    postalCode: 'A1B2C3',
    city: 'Toronto',
    province: 'Ontario',
    country: 'CA',
  },
};

describe('GET /residence', () => {
  test('should return error 404 since basic auth does not provide an user id', async () => {
    const res = await request(app).get('/residence/').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe(
      'Residence class error [byCustomer]: residence with customerId not found'
    );
  });
  test('should return 401 when unautheticated', async () => {
    const res = await request(app).get('/residence/');
    expect(res.statusCode).toBe(401);
  });
});

describe('GET /residence/:id', () => {
  test('should return the residence given the ID', async () => {
    const id = '64bedcd10332652c28215345';

    const res = await request(app).get(`/residence/${id}`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.residence._id).toBe(id);
  });

  test('Invalid ID should return Error 404', async () => {
    const id = 'wrong';

    const res = await request(app).get(`/residence/${id}`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });

  test('should return 401 when unautheticated', async () => {
    const res = await request(app).get('/residence/noone');
    expect(res.statusCode).toBe(401);
  });
});

describe('GET /residence/customer/:id', () => {
  test('should return the residence given the ID', async () => {
    const id = '64bd4e46a8011ebb7f8db7b6';
    const res = await request(app)
      .get(`/residence/customer/${id}`)
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.residence.customerId).toBe(id);
  });

  test('Invalid ID should return error 404', async () => {
    const id = 'invalid';
    const res = await request(app)
      .get(`/residence/customer/${id}`)
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });

  test('should return 401 when unautheticated', async () => {
    const res = await request(app).get('/residence/customer/id');
    expect(res.statusCode).toBe(401);
  });
});

describe('POST /residence/', () => {
  test('should return error 500 due to lack of user for basic auth', async () => {
    const res = await request(app)
      .post('/residence/')
      .send(residence)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
  });
});

describe('POST /residence/customer/:id', () => {
  test('should create new residence with customer id', async () => {
    const custID = '64bd4e46a8011ebb7f8db7b6';

    const res = await request(app)
      .post(`/residence/customer/${custID}`)
      .send(residence)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');

    await request(app)
      .delete(`/residence/${res.body.residence._id}`)
      .auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('ok');
    expect(res.body.residence.customerId).toBe(custID);
  });

  test('should return error 500 with invalid data', async () => {
    const custID = '64bd4e46a8011ebb7f8db7b6';
    const residence = {
      fakeHouse: 'not condo',
    };

    const res = await request(app)
      .post(`/residence/customer/${custID}`)
      .send(residence)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe('value of house type not accepted');
  });
});

describe('PUT /residence/', () => {
  test('should return error 500 due to lack of user for basic auth', async () => {
    const res = await request(app)
      .put('/residence/')
      .send(residence)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
  });
});

describe('PUT /residence/:id', () => {
  test('should update residence of provided id', async () => {
    const id = '64cc87b938d63cefffa617fb';

    const res = await request(app)
      .put(`/residence/${id}`)
      .send({ ...residence, size: 1300 })
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.residence.size).toBe(1300);
  });

  test('should return error 500 with invalid id', async () => {
    const id = 'wrong';
    const residence = {
      fakeHouse: 'not condo',
    };

    const res = await request(app)
      .put(`/residence/${id}`)
      .send(residence)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
  });
});

describe('DELETE /residence/', () => {
  test('should return error 404 due to lack of user for basic auth', async () => {
    const res = await request(app).delete('/residence/').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe(
      'DELETE /residence/:id error: Residence class error [byCustomer]: residence with customerId not found'
    );
  });
});

describe('DELETE /residence/:id', () => {
  test('should delete residence with id', async () => {
    const custID = '64bd4e46a8011ebb7f8db7b6';

    const req = await request(app)
      .post(`/residence/customer/${custID}`)
      .send(residence)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');

    const res = await request(app)
      .delete(`/residence/${req.body.residence._id}`)
      .auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('should return error 404 with wrong id', async () => {
    const res = await request(app)
      .delete(`/residence/nothing`)
      .auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});
