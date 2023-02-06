// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import * as jwt from 'jsonwebtoken';
import * as request from "supertest";
import { app } from '../app';

const secret = process.env.JWT_SECRET || 'jwt_secret';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  it('sem passar parametros', async () => {
    const result = await request(app).post("/login").send({});
    expect(result.body.message).to.be.eq('All fields must be filled');
  });

  it('sem passar email', async () => {
    const result = await request(app).post("/login").send({ password: 'secret_admin' });
    expect(result.body.message).to.be.eq('All fields must be filled');
  });

  it('sem passar senha', async () => {
    const result = await request(app).post("/login").send({ email: 'admin@admin.com' });
    expect(result.body.message).to.be.eq('All fields must be filled');
  });

  it('com email incorreto', async () => {
    const result = await request(app).post("/login").send({ email: 'errado@errado.com', password: 'secret_admin'});
    expect(result.body.message).to.be.eq('Incorrect email or password');
  });

  it('com senha incorreta', async () => {
    const result = await request(app).post("/login").send({ email: 'admin@admin.com', password: '123456'});
    expect(result.body.message).to.be.eq('Incorrect email or password');
  });

  it('correto', async () => {
    const result = await request(app).post("/login").send({ email: 'admin@admin.com', password: 'secret_admin'});
    expect(result.body.token).not.to.be.undefined;
  });

  it('Validar a "role" como admin', async () => {
    const token = jwt.sign(
      { user: 'teste@teste.com', id: 3, role: 'admin' },
      secret,
      { expiresIn: '24h', algorithm: 'HS256' },
    );

    const result = await request(app).get("/login/validate").set('authorization', token);
    expect(result.body.role).to.be.eq('admin');
  });

  it('Validar a "role" como none', async () => {
    const token = jwt.sign(
      { user: 'teste@teste.com', id: 3, role: 'none' },
      secret,
      { expiresIn: '24h', algorithm: 'HS256' },
    );

    const result = await request(app).get("/login/validate").set('authorization', token);
    expect(result.body.message).to.be.eq('Error');
  });

  it('Validar com token invalido', async () => {
    const result = await request(app).get("/login/validate").set('authorization', 'invalido');
    expect(result.body.message).to.be.eq('Error');
  });

  it('Valir sem token', async () => {
    const result = await request(app).get("/login/validate");
    expect(result.body.message).to.be.eq('Bad request');
  })
});
