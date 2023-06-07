require('../core/test.setup');
const axios = require('axios');
const {expect, assert} = require('chai');
const { gaServerUrl, companyCode } = require('../core/config');

const endPoint = 'api/v1/app-drawer';

describe(`App Drawer Api Testing : ${endPoint}`, () => {
    let accessToken = ''
    before(() => {
        accessToken = shared.accessToken;
    });


    after(() => {
        // After all tests
    });

    it('Should not able get app drawer info if no authorization info in header', async () => {
        try {
            await axios.get(`${gaServerUrl}/${endPoint}`);
            assert.fail('Expected the api call to fail');
        } catch (error) {
            const { data, status } = error.response;
            expect(status).to.equal(401);
            expect(data).to.have.all.keys('errno', 'code', 'message');
            expect(data.message).to.equal('unauthorized')
        }
    });

    it('Should not able get app drawer if has header but invalid authorization', async () => {
        try {
            await axios.get(`${gaServerUrl}/${endPoint}`, {
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

    it('Should able get app drawer if has header and valid authorization', async () => {
        const {status, data} = await axios.get(`${gaServerUrl}/${endPoint}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const {products} = data.data
        expect(status).to.equal(200);
        expect(data.data).to.have.property('products');
        expect(products).to.be.an('array');

        for (let e of products){
            expect(e).to.have.all.keys("id", "product", "productURL", "betaUrl", "productDesc", "desc2", "iconpath", "product_url","timezone")
            //assert.containsAllKeys(e, ["id", "product", "productURL", "betaUrl", "productDesc", "desc2", "iconpath", "product_url", "timezone"]);
        }
    });
});