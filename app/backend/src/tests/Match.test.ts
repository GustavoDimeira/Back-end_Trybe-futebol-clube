// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import * as jwt from 'jsonwebtoken';
import * as request from "supertest";
import { app } from '../app';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const token = jwt.sign(
  { user: 'teste@teste.com', id: 3, role: 'none' },
  secret,
  { expiresIn: '24h', algorithm: 'HS256' },
);

chai.use(chaiHttp);

const { expect } = chai;

describe('Match', () => {
  describe('Listar matches', () => {
    it('Listar todas as matches', async () => {
      const result = await request(app).get("/matches").set('authorization', token);
      expect(result.status).to.be.eq(200)
    });
  
    it('Listar todas as matches encerradas', async () => {
      const result = await request(app).get("/matches/?inProgress=false").set('authorization', token);
      expect(result.body[0].inProgress).to.be.eq(false);
    });
  
    it('Listar todas as matches em andamento', async () => {
      const result = await request(app).get("/matches?inProgress=true").set('authorization', token);
      expect(result.body[0].inProgress).to.be.eq(true);
    });
  });

  describe('Criar matches', () => {
    
  });

  describe('Atualizar matches', () => {

  });
});