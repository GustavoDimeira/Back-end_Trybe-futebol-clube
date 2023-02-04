// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import * as request from "supertest";
import { app } from '../app';

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
});

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });