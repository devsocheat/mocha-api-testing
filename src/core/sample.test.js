// const axios = require('axios');
// const { expect } = require('chai');

// describe('CRUD API Testing', () => {
//     let createdResourceId;

//     it('should create a new resource', async () => {
//         const payload = { name: 'John Doe', email: 'john@example.com' };
//         const response = await axios.post('https://api.example.com/resources', payload);
//         expect(response.status).to.equal(201);
//         expect(response.data).to.have.property('id');
//         createdResourceId = response.data.id;
//     });

//     it('should retrieve the created resource', async () => {
//         const response = await axios.get(`https://api.example.com/resources/${createdResourceId}`);
//         expect(response.status).to.equal(200);
//         expect(response.data).to.have.property('name', 'John Doe');
//         expect(response.data).to.have.property('email', 'john@example.com');
//     });

//     it('should update the created resource', async () => {
//         const updatedPayload = { name: 'Jane Doe', email: 'jane@example.com' };
//         const response = await axios.put(`https://api.example.com/resources/${createdResourceId}`, updatedPayload);
//         expect(response.status).to.equal(200);
//         expect(response.data).to.have.property('name', 'Jane Doe');
//         expect(response.data).to.have.property('email', 'jane@example.com');
//     });

//     it('should delete the created resource', async () => {
//         const response = await axios.delete(`https://api.example.com/resources/${createdResourceId}`);
//         expect(response.status).to.equal(204);
//     });
// });