const Models = require('../models/index');

const customersHandler = async (req, h) => {
    try {
        const customers = await Models.Customer.findAll({})
        return { data: customers}
    } catch (error) {
        return h.response({error: error.message }).code(400)
    }
}

module.exports = [
    {method: 'GET', path: '/customers', handler: customersHandler}
];