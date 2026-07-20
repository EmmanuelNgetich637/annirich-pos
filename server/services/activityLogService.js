const ActivityLog =
require("../models/activityLogModel");


/*
|--------------------------------------------------------------------------
| Create Activity Log
|--------------------------------------------------------------------------
*/

const createLog = async (data) => {

    return await ActivityLog.createLog(
        data
    );

};


/*
|--------------------------------------------------------------------------
| Get All Activity Logs
|--------------------------------------------------------------------------
*/

const getAllLogs = async () => {

    return await ActivityLog.getAllLogs();

};


/*
|--------------------------------------------------------------------------
| Get Logs By User
|--------------------------------------------------------------------------
*/

const getLogsByUser = async (user_id) => {

    return await ActivityLog.getLogsByUser(
        user_id
    );

};


module.exports = {

    createLog,

    getAllLogs,

    getLogsByUser

};