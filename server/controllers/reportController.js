const ReportService =
require("../services/reportService");

/*
|--------------------------------------------------------------------------
| Sales Report
|--------------------------------------------------------------------------
*/

const getSalesReport = async (req, res) => {

    try {

        const {
            startDate,
            endDate
        } = req.query;

        const data =
            await ReportService.getSalesReport(
                startDate,
                endDate
            );

        return res.status(200).json({

            success: true,

            count: data.length,

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
|--------------------------------------------------------------------------
| Purchase Report
|--------------------------------------------------------------------------
*/

const getPurchaseReport = async (req, res) => {

    try {

        const {
            startDate,
            endDate
        } = req.query;

        const data =
            await ReportService.getPurchaseReport(
                startDate,
                endDate
            );

        return res.status(200).json({

            success: true,

            count: data.length,

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
|--------------------------------------------------------------------------
| Expense Report
|--------------------------------------------------------------------------
*/

const getExpenseReport = async (req, res) => {

    try {

        const {
            startDate,
            endDate
        } = req.query;

        const data =
            await ReportService.getExpenseReport(
                startDate,
                endDate
            );

        return res.status(200).json({

            success: true,

            count: data.length,

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
|--------------------------------------------------------------------------
| Profit Report
|--------------------------------------------------------------------------
*/

const getProfitReport = async (req, res) => {

    try {

        const {
            startDate,
            endDate
        } = req.query;

        const data =
            await ReportService.getProfitReport(
                startDate,
                endDate
            );

        return res.status(200).json({

            success: true,

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getSalesReport,

    getPurchaseReport,

    getExpenseReport,

    getProfitReport

};