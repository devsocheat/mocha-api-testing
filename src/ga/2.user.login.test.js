require('../core/test.setup'); 
const axios = require('axios');
const { gaServerUrl, companyCode } = require('../core/config');
const { expect, assert } = require('chai');

const endPoint = 'api/v1/company/userlogin';
describe(`User Login Api Testing : ${endPoint}`, () => {
    
    before(() => {
        // Before all tests
    });

    
    after(() => {
        // After all tests
    });

    it('Should not able to login if empty payload', async () => {
        const payload = {}; 
        try {
            await axios.post(`${gaServerUrl}/${endPoint}`, payload);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(422);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('"companyCode" is required')
        }
    });

    it('Should not able to login if username empty', async () =>{
        const payload = {companyCode: 'DUMMY', username: '', password: '' };
        try {
            await axios.post(`${gaServerUrl}/${endPoint}`, payload);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(422);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('"username" is not allowed to be empty')
        }
    });

    it('Should not able to login if password empty', async () => {
        const payload = { companyCode: 'DUMMY', username: 'xxxx', password: '' };
        try {
            await axios.post(`${gaServerUrl}/${endPoint}`, payload);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(422);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('"password" is not allowed to be empty')
        }
    });

    it('Should not able to login if incorrect company code', async () => {
        const payload = { companyCode: 'DUMMY', username: 'xxxx', password: 'xxxx' };
        try {
            await axios.post(`${gaServerUrl}/${endPoint}`, payload);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(500);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('Somthing went wrong! Please try again.')
        }
    });

    it('Should not able to login if incorrect username or password', async () => {
        const payload = { companyCode, username: 'beepov', password: 'xxxx' };
        try {
            await axios.post(`${gaServerUrl}/${endPoint}`, payload);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(401);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('Invalid account information. Please try again, or contact your account manager.')
        }
    });

    it('Should able to login if correct payload info', async () => {
        const payload = { companyCode, username: 'beepov', password: '123456' };
        const { status, data } = await axios.post(`${gaServerUrl}/${endPoint}`, payload);
        expect(status).to.equal(200);
        assert.containsAllKeys(data, ['status', 'userId', 'username', 'username', 'factoryId', 'factory', 'role','language' , 'mfgLineId', 'accessToken', 'refreshToken']);
        const {accessToken, username, factoryId} = data;

        //manage test data 
        shared.accessToken = accessToken;

        expect(accessToken).to.not.to.be.empty;
        expect(username).to.not.to.be.empty;
        expect(factoryId).to.exist; // assertion checks if factoryId is not null or undefined. 
    });


});