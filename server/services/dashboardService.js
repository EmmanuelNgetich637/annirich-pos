const Dashboard = require("../models/dashboardModel");

/*
|--------------------------------------------------------------------------
| Get Dashboard
|--------------------------------------------------------------------------
*/

const getDashboard = async () => {

    const summary =
        await Dashboard.getDashboardSummary();

    const recentSales =
        await Dashboard.getRecentSales();

    const recentPurchases =
        await Dashboard.getRecentPurchases();

    const lowStockProducts =
        await Dashboard.getLowStockProducts();

    const monthlySales =
        await Dashboard.getMonthlySales();

    return {

        summary,

        recentSales,

        recentPurchases,

        lowStockProducts,

        monthlySales

    };

};

module.exports = {

    getDashboard

};