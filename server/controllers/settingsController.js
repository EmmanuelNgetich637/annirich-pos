const settingsService =
require("../services/settingsService");

/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

const getSettings = async (
    req,
    res
) => {

    try {

        const settings =
            await settingsService.getSettings();

        return res.status(200).json({

            success: true,

            data: settings

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
| Save Settings
|--------------------------------------------------------------------------
*/

const saveSettings = async (
    req,
    res
) => {

    try {

        const settings =
            await settingsService.saveSettings(
                req.body
            );

        return res.status(200).json({

            success: true,

            message:
                "Settings saved successfully.",

            data: settings

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getSettings,

    saveSettings

};