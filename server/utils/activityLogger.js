const ActivityLog =
require("../services/activityLogService");


/*
|--------------------------------------------------------------------------
| Create Activity Log Helper
|--------------------------------------------------------------------------
*/

const logActivity = async ({
    user_id,
    action,
    module,
    description,
    ip_address
}) => {

    try {

        await ActivityLog.createLog({

            user_id,

            action,

            module,

            description,

            ip_address

        });


    } catch(error) {

        // Do not break the main operation
        console.error(
            "Activity Log Error:",
            error.message
        );

    }

};


module.exports = logActivity;