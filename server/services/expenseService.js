const Expense = require("../models/expenseModel");


// Create Expense
const createExpense = async (data) => {

    const {
        expense_name,
        amount,
        description,
        expense_date
    } = data;

    const expenseId =
        await Expense.createExpense({
            expense_name,
            amount,
            description,
            expense_date
        });

    return {
        id: expenseId,
        expense_name,
        amount,
        description,
        expense_date
    };

};


// Get All Expenses
const getExpenses = async () => {

    return await Expense.getAllExpenses();

};


// Get Expense By ID
const getExpense = async (id) => {

    const expense =
        await Expense.getExpenseById(id);

    if (!expense) {

        throw new Error(
            "Expense not found."
        );

    }

    return expense;

};


// Update Expense
const updateExpense = async (
    id,
    data
) => {

    const expense =
        await Expense.getExpenseById(id);

    if (!expense) {

        throw new Error(
            "Expense not found."
        );

    }

    await Expense.updateExpense(
        id,
        data
    );

    return await Expense.getExpenseById(id);

};


// Delete Expense
const deleteExpense = async (id) => {

    const expense =
        await Expense.getExpenseById(id);

    if (!expense) {

        throw new Error(
            "Expense not found."
        );

    }

    await Expense.deleteExpense(id);

};


// Search Expenses
const searchExpenses = async (keyword) => {

    return await Expense.searchExpenses(
        keyword
    );

};


// Pagination
const getExpensesPaginated =
async (page, limit) => {

    return await Expense.getExpensesPaginated(
        page,
        limit
    );

};


// Statistics
const getExpenseStatistics =
async () => {

    return await Expense.getExpenseStatistics();

};


module.exports = {

    createExpense,

    getExpenses,

    getExpense,

    updateExpense,

    deleteExpense,

    searchExpenses,

    getExpensesPaginated,

    getExpenseStatistics

};