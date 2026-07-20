const Report = require("../models/reportModel");

/*
|--------------------------------------------------------------------------
| Sales Report
|--------------------------------------------------------------------------
*/

const getSalesReport = async (
    startDate,
    endDate
) => {

    return await Report.getSalesReport(
        startDate,
        endDate
    );

};

/*
|--------------------------------------------------------------------------
| Purchase Report
|--------------------------------------------------------------------------
*/

const getPurchaseReport = async (
    startDate,
    endDate
) => {

    return await Report.getPurchaseReport(
        startDate,
        endDate
    );

};

/*
|--------------------------------------------------------------------------
| Expense Report
|--------------------------------------------------------------------------
*/

const getExpenseReport = async (
    startDate,
    endDate
) => {

    return await Report.getExpenseReport(
        startDate,
        endDate
    );

};

/*
|--------------------------------------------------------------------------
| Profit Report
|--------------------------------------------------------------------------
*/

const getProfitReport = async (
    startDate,
    endDate
) => {

    const result =
        await Report.getProfitReport(
            startDate,
            endDate
        );

    return {

        totalSales:
            result.revenue,

        totalPurchases:
            result.purchases,

        totalExpenses:
            result.expenses,

        grossProfit:
            result.profit

    };

};

module.exports = {

    getSalesReport,

    getPurchaseReport,

    getExpenseReport,

    getProfitReport

};