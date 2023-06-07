const axios = require('axios');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { gaServerUrl, companyCode } = require('../core/config');
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

const endPoint = 'api/v1/companylogin'; 
describe(`Company Login Api Testing : ${endPoint}`, () => {
    before(() => {
        // Before all tests
    });


    after(() => {
        // After all tests
    });
    
    it('Should not able to login if company code is empty', async () => {
        const payload = { companyCode: "" };
        try {
            await axios.post(`${gaServerUrl}/${endPoint}`, payload);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(422);
            expect(data).to.have.all.keys('errno', 'code', 'message');
        }
    });

    it('Should not able to login if company code not empty but incorrect', async () => {
        const payload = { companyCode: "DUMMY" };
        try {
            await axios.post(`${gaServerUrl}/${endPoint}`, payload);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(401);
            expect(data).to.have.all.keys('errno', 'code', 'message');
        }
    });


    it('Should able to login successfully with correct company code', async () => {
        const payload = { companyCode};
        const { status, data } = await axios.post(`${gaServerUrl}/${endPoint}`, payload);
        expect(status).to.equal(200);
        expect(data).to.have.all.keys('id', 'company', 'url');
        expect(data.company).to.equal(companyCode);
        expect(data.url).to.match(/^https?:\/\/[^/]+\.[^/]+/);
    });
});