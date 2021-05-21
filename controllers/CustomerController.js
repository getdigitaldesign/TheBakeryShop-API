const { sequelize } = require('../models/index');
const Models = require('../models/index');

const customersHandler = async (req, h) => {
    try {
        const customers = await Models.Customer.findAll({})
        return { data: customers}
    } catch (error) {
        return h.response({error: error.message }).code(400)
    }
}

const registerCustomer = async (req, h) => {
    
    let newCustomer = new Models.Customer();
    const payload = req.payload;
    newCustomer.setPassword(payload.password);
    console.log(newCustomer);
    try {
        const customer = await Models.Customer.create({
            first_name: payload.first_name,
            lastname: payload.last_name,
            email: payload.email,
            hash: newCustomer.hash,
            salt: newCustomer.salt
        });
        console.log('new customer created: ', customer)
        return h.response('Customer created successfull').code(201);
    } catch (error) {
        return h.response(
            {
                message: 'Failed to create new customer',
                serverError: error.message
            }
        ).code(400);
    }
}

module.exports = [
    {method: 'GET', path: '/customers', handler: customersHandler},
    {method: 'POST', path:'/register-customer', handler: registerCustomer}
];