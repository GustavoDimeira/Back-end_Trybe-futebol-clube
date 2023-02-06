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

describe('Team', () => {
  it('Listar todos os times', async () => {
    const result = await request(app).get("/teams").send({});
    expect(result.status).to.be.eq(200);
  });

  it('Filtrar pelo id', async () => {
    const result = await request(app).get("/teams/1");
    expect(result.body.id).to.be.eq(1);
  });

  it('Filtrar por id inexistente', async () => {
    const result = await request(app).get("/teams/-1");
    expect(result.body.message).to.be.eq('Incorrect Id');
  });
});
