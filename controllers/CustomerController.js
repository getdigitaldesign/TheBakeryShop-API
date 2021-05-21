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
    try {
        const customer = await Models.Customer.create({
            first_name: payload.first_name,
            lastname: payload.last_name,
            email: payload.email,
            hash: newCustomer.hash,
            salt: newCustomer.salt
        });
        console.log('New User created ', customer.toJSON())
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

const loginCustomer = async (req, h) => {
    try{
        const foundCustomer = await Models.Customer.findOne({
            where: { 
                email: req.payload.email
             }
        });

        if( foundCustomer === null) {
            return h.response(
                {
                    message: 'Customer not found.'
                }
            ).code(400)
        } else {
            if(foundCustomer.isValidPassword(req.payload.password)){
                return h.response(
                    {
                        message: 'Customer is logged in.'
                    }
                ).code(201)
            } else {
                return h.response(
                    {
                        message: 'Wrong password please try again'
                    }
                ).code(400)
            }
        }
    } catch (error ) {
        return h.response(
            {
                message: 'Server error while searching for a customer.',
                serverError: error.message
            }
        ).code(500);
    }
    
}

module.exports = [
    {method: 'GET', path: '/customers', handler: customersHandler},
    {method: 'POST', path:'/register-customer', handler: registerCustomer},
    {method: 'POST', path:'/login', handler: loginCustomer}
];