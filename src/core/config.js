require('dotenv').config();
module.exports = {
    gaServerUrl: process.env.GA_SERVER_URL || 'http://localhost:3000',
    companyCode: process.env.COMPANY_CODE || 'UNKNOWN',
};