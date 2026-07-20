const activityLogService =
require("../services/activityLogService");


/*
|--------------------------------------------------------------------------
| Create Activity Log
|--------------------------------------------------------------------------
*/

const createLog = async (
    req,
    res,
    next
) => {

    try {

        const data = {

            user_id:
                req.body.user_id,

            action:
                req.body.action,

            module:
                req.body.module,

            description:
                req.body.description,

            ip_address:
                req.ip

        };


        const result =
            await activityLogService.createLog(
                data
            );


        res.status(201).json({

            success: true,

            message:
                "Activity log created successfully.",

            data: result

        });


    } catch(error) {

        next(error);

    }

};



/*
|--------------------------------------------------------------------------
| Get All Activity Logs
|--------------------------------------------------------------------------
*/

const getAllLogs = async (
    req,
    res,
    next
) => {

    try {

        const logs =
            await activityLogService.getAllLogs();


        res.status(200).json({

            success: true,

            count:
                logs.length,

            data: logs

        });


    } catch(error) {

        next(error);

    }

};



/*
|--------------------------------------------------------------------------
| Get Logs By User
|--------------------------------------------------------------------------
*/

const getLogsByUser = async (
    req,
    res,
    next
) => {

    try {

        const logs =
            await activityLogService.getLogsByUser(
                req.params.id
            );


        res.status(200).json({

            success: true,

            count:
                logs.length,

            data: logs

        });


    } catch(error) {

        next(error);

    }

};



module.exports = {

    createLog,

    getAllLogs,

    getLogsByUser

};