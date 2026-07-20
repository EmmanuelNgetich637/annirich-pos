const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const util = require("util");

const execAsync = util.promisify(exec);

const createBackup = async () => {

    const backupDir =
        path.join(__dirname, "../backups");

    if (!fs.existsSync(backupDir)) {

        fs.mkdirSync(backupDir, {
            recursive: true
        });

    }

    const timestamp =
        new Date()
            .toISOString()
            .replace(/[:.]/g, "-");

    const fileName =
        `annirich_backup_${timestamp}.sql`;

    const backupPath =
        path.join(
            backupDir,
            fileName
        );

    const command =
        `mysqldump ` +
        `-u ${process.env.DB_USER} ` +
        `-p${process.env.DB_PASSWORD} ` +
        `${process.env.DB_NAME} > "${backupPath}"`;

    await execAsync(command);

    return {

        success: true,

        fileName,

        backupPath

    };

};

module.exports = {
    createBackup
};