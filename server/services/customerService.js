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

const createCustomer = async (data) => {

    const phoneExists =
        await Customer.getCustomerByPhone(data.phone);

    if (phoneExists) {
        throw new Error("Phone number already exists.");
    }

    if (data.email) {

        const emailExists =
            await Customer.getCustomerByEmail(data.email);

        if (emailExists) {
            throw new Error("Email already exists.");
        }

    }

    const id =
        await Customer.createCustomer(data);

    return await Customer.getCustomerById(id);

};

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer
};