const Settings = require("../models/settingsModel");

/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

const getSettings = async () => {

    return await Settings.getSettings();

};

/*
|--------------------------------------------------------------------------
| Save Settings
|--------------------------------------------------------------------------
*/

const saveSettings = async (data) => {

    const existingSettings =
        await Settings.getSettings();

    if (!existingSettings) {

        await Settings.createSettings(data);

    } else {

        await Settings.updateSettings(data);

    }

    return await Settings.getSettings();

};

module.exports = {

    getSettings,

    saveSettings

};