const Customer = require("../models/customerModel");

const getCustomers = async () => {

    return await Customer.getAllCustomers();

};

module.exports = {
    getCustomers
};