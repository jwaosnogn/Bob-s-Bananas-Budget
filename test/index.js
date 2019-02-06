const app = require('./../server/server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const redis = require('redis');

describe("Bob's Banana Budget Tests", () => {
  let testClient;

  before((done) => {
    testClient = redis.createClient();
    testClient.select(1);
    done();
  });

  beforeEach((done) => {
    testClient.flushdb();
    done();
  });

  describe('Calculating Price', () => {
    it('POST request to /calculatePrice with correctly formatted body calculates and stores price into Redis', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/01/2019', numberOfDays: 1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          const key = JSON.stringify(['04/01/2019', 1]);
          testClient.get(key, (err, res) => {
            expect(res).to.not.be.null;
            done();
          });
        });
    });

    it('POST request to /calculatePrice with incorrectly formatted body should return error', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/01/2019', numberOfDays: -1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.text.match(/Error/)).to.not.be.null;
          done();
        });
    });

    it('POST request to /calculatePrice with incorrectly formatted body should not be stored into Redis', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/01/2019', numberOfDays: -1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          const key = JSON.stringify(['04/01/2019', -1]);
          testClient.get(key, (err, res) => {
            expect(res).to.be.null;
            done();
          });
        });
    });

    it('POST request to /calculatePrice within first seven days of month should return correct output', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/01/2019', numberOfDays: 1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.totalCost).to.equal('$0.05');
          done();
        });
    });

    it('POST request to /calculatePrice within second seven days of month should return correct output', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/08/2019', numberOfDays: 1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.totalCost).to.equal('$0.10');
          done();
        });
    });

    it('POST request to /calculatePrice within third seven days of month should return correct output', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/15/2019', numberOfDays: 1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.totalCost).to.equal('$0.15');
          done();
        });
    });

    it('POST request to /calculatePrice within fourth seven days of month should return correct output', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/22/2019', numberOfDays: 1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.totalCost).to.equal('$0.20');
          done();
        });
    });

    it('POST request to /calculatePrice past fourth seven days of month should return correct output', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/29/2019', numberOfDays: 1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.totalCost).to.equal('$0.25');
          done();
        });
    });

    it('POST request to /calculatePrice on a weekend should return correct output', (done) => {
      request
        .post('/calculatePrice')
        .send({ startDate: '04/06/2019', numberOfDays: 1 })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.totalCost).to.equal('$0.00');
          done();
        });
    });
  });
});
