require('../core/test.setup');
const axios = require('axios');
const {expect, assert} = require('chai');
const { gaServerUrl, companyCode } = require('../core/config');

const endPoint = 'api/v1/companyProfile';

describe(`Company Profile Api Testing : ${endPoint}/:companyCode`, () => {
    let accessToken = ''
    before(() => {
        accessToken = shared.accessToken;
    });


    after(() => {
        // After all tests
    });

    it('Should not able get company info if no authorization info in header', async () => {
        try {
            await axios.get(`${gaServerUrl}/${endPoint}/${companyCode}`);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(401);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('unauthorized')
        }
    });

    it('Should not able get company info if has header but invalid authorization', async () => {
        try {
            await axios.get(`${gaServerUrl}/${endPoint}/${companyCode}`, {
                headers: { 'Authorization': `Bearer ` }
            });
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(401);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('jwt malformed')
        }
    });

    it('Should able get company info if has header and valid authorization', async () => {
        const {status, data} = await axios.get(`${gaServerUrl}/${endPoint}/${companyCode}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        expect(status).to.equal(200);
        expect(data).to.have.property('company');
        expect(data.company).to.equal(companyCode);
    });
});