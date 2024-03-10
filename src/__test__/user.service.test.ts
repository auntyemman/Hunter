import request from 'supertest';
import express from 'express';
import 'reflect-metadata';

import { auth } from '../routes/userAuth';
// import { app } from '../app';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

const app = express();
app.use(express.json());
app.use(auth);

const mockRequest = async () => {
  return {
    body: {
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      password: 'test1234@',
      accountType: 'hunter',
    },
  };
};

describe('User Service Routes', () => {
  describe('POST /signup', () => {
    test('it should create a new user', async () => {
      const requestMock = await mockRequest();
      jest
        .spyOn(UserService.prototype, 'createUser')
        .mockImplementationOnce(() => Promise.resolve(new User()));
      const response = await request(app)
        .post('/signup')
        .send(requestMock.body)
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
    });
    test('it should validate user data', async () => {
      const requestMock = await mockRequest();
      const response = await request(app)
        .post('/signup')
        .send({ ...requestMock.body, firstName: '' })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('firstName should not be empty');
    });
    test('it should return internal server error', async () => {
      const requestMock = await mockRequest();
      jest
        .spyOn(UserService.prototype, 'createUser')
        .mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));
      const response = await request(app)
        .post('/signup')
        .send(requestMock.body)
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });
});
