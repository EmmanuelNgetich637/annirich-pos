const fs = require("fs");
const path = require("path");
const backupHelper = require("../utils/backupHelper");

const createBackup = async () => {

    return await backupHelper.createBackup();

};

const listBackups = async () => {

    const backupDir =
        path.join(__dirname, "../backups");

    if (!fs.existsSync(backupDir)) {

        return [];

    }

    const files = fs
        .readdirSync(backupDir)
        .filter(file => file.endsWith(".sql"))
        .sort()
        .reverse();

    return files.map(file => {

        const fullPath =
            path.join(backupDir, file);

        const stats =
            fs.statSync(fullPath);

        return {

            fileName: file,

            size: stats.size,

            createdAt: stats.birthtime

        };

    });

};

const getBackupPath = async (fileName) => {

    const backupPath =
        path.join(
            __dirname,
            "../backups",
            fileName
        );

    if (!fs.existsSync(backupPath)) {

        throw new Error("Backup file not found.");

    }

    return backupPath;

};

const restoreBackup = async (fileName) => {

    return await backupHelper.restoreBackup(fileName);

};

module.exports = {

    createBackup,

    listBackups,

    getBackupPath,

    restoreBackup

};