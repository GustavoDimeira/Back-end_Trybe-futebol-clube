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

describe('Match', () => {
  it('Listar todas as matches', async () => {
    const result = await request(app).get("/matches").send({});
    expect(result.status).to.be.eq(200);
  });

  it('Listar todas as matches encerradas', async () => {
    const result = await request(app).get("/matches/?inProgress=false").send({});
    expect(result.body[0].inProgress).to.be.eq(false);
  });

  it('Listar todas as matches em andamento', async () => {
    const result = await request(app).get("/matches?inProgress=true").send({});
    expect(result.body[0].inProgress).to.be.eq(true);
  });
});
