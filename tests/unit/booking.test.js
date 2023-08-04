const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');

afterAll(async () => {
  await mongoose.disconnect();
});

const booking = {
  employeeId: '64c6eb3602c0d3f4f6986095',
  residenceId: '64c6a81e696feb195b478335',
  serviceType: 'casual',
  frequency: 'weekly',
  startDate: '2023-07-29T00:00:00.000Z',
  endDate: '2023-08-29T00:00:00.000Z',
  specification: 'Testing',
  status: 'ongoing',
};

describe('GET /booking', () => {
  test('should return error 404 since basic auth does not provide an user id', async () => {
    const res = await request(app).get('/booking/').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });

  test('should return 401 when unautheticated', async () => {
    const res = await request(app).get('/booking/');
    expect(res.statusCode).toBe(401);
  });
});

describe('GET /booking/all', () => {
  test('should return all bookings', async () => {
    const res = await request(app).get('/booking/all').auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.bookings)).toBe(true);
  });
});

describe('GET /booking/employee', () => {
  test('should return bookings', async () => {
    const res = await request(app).get('/booking/employee').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.bookings)).toBe(true);
  });
});

describe('GET /booking/employee/:id', () => {
  test('should return the residence given the ID', async () => {
    const empID = '64c6eb3602c0d3f4f6986095';

    const res = await request(app)
      .get(`/booking/employee/${empID}`)
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.bookings[0].employeeId).toBe(empID);
    expect(Array.isArray(res.body.bookings)).toBe(true);
  });

  test('Invalid ID should return Error 404', async () => {
    const id = 'wrong';

    const res = await request(app)
      .get(`/booking/employee/${id}`)
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('GET /booking/:id', () => {
  test('should return the residence given the ID', async () => {
    const id = '64c6a895696feb195b478345';

    const res = await request(app).get(`/booking/${id}`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.bookings._id).toBe(id);
  });

  test('Invalid ID should return Error 404', async () => {
    const id = 'wrong';

    const res = await request(app).get(`/booking/${id}`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('POST /booking/', () => {
  test('should return error 500 due to lack of user for basic auth', async () => {
    const res = await request(app)
      .post('/booking/')
      .send(booking)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
  });
});

describe('POST /booking/customer/:id', () => {
  test('should create new residence with customer id', async () => {
    const custID = '64c6a7e2696feb195b47832d';

    const res = await request(app)
      .post(`/booking/customer/${custID}`)
      .send(booking)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');

    await request(app)
      .delete(`/booking/${res.body.booking._id}`)
      .auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.booking.customerId).toBe(custID);
  });

  test('should return error 500 with invalid data', async () => {
    const custID = '64c6a7e2696feb195b47832d';
    const booking = {
      fake: 'not real',
    };

    const res = await request(app)
      .post(`/booking/customer/${custID}`)
      .send(booking)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe('value of status not accepted');
  });
});

describe('PUT /booking/', () => {
  test('should return error 500 due to lack of user for basic auth', async () => {
    const res = await request(app)
      .put('/booking/')
      .send(booking)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('PUT /booking/:id', () => {
  test('should update booking of provided id', async () => {
    const id = '64c9827be6d375a89dead6d6';

    const req = await request(app).get(`/booking/${id}`).auth('user1@email.com', 'password1');

    const res = await request(app)
      .put(`/booking/${id}`)
      .send({ ...booking, specification: 'for testing!' })
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');

    await request(app)
      .put(`/booking/${id}`)
      .send(req.body.bookings)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.booking.specification).toBe('for testing!');
  });

  test('should return error 500 with invalid id', async () => {
    const id = 'wrong';

    const res = await request(app)
      .put(`/booking/${id}`)
      .send(booking)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('DELETE /booking/', () => {
  test('should return error 404 due to lack of user for basic auth', async () => {
    const res = await request(app).delete('/booking/').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.error.message).toBe(
      'Booking class error [byCustomerId]: booking with customerId not found'
    );
  });
});

describe('DELETE /booking/:id', () => {
  test('should delete booking with id', async () => {
    const custID = '64c6a7e2696feb195b47832d';

    const req = await request(app)
      .post(`/booking/customer/${custID}`)
      .send(booking)
      .set('Content-Type', 'application/json')
      .auth('user1@email.com', 'password1');

    const res = await request(app)
      .delete(`/booking/${req.body.booking._id}`)
      .auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('should return error 404 with wrong id', async () => {
    const res = await request(app).delete(`/booking/nothing`).auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
  });
});
