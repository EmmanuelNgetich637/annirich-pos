const Customer = require("../models/customerModel");

const getCustomers = async () => {

    return await Customer.getAllCustomers();

};

const getCustomer = async (id) => {

    const customer =
        await Customer.getCustomerById(id);

    if (!customer) {
        throw new Error("Customer not found.");
    }

    return customer;

};

module.exports = {
    getCustomers,
    getCustomer
};