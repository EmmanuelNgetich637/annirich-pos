const backupService = require("../services/backupService");
const logActivity = require("../utils/activityLogger");

// CREATE BACKUP
const createBackup = async (req, res) => {

    try {

        const backup =
            await backupService.createBackup();

        await logActivity({

            user_id: req.user.id,

            action: "CREATE",

            module: "Backup",

            description:
                `Created database backup ${backup.fileName}`,

            ip_address: req.ip

        });

        res.status(201).json({

            success: true,

            message: "Database backup created successfully.",

            data: backup

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// LIST BACKUPS
const listBackups = async (req, res) => {

    try {

        const backups =
            await backupService.listBackups();

        res.json({

            success: true,

            count: backups.length,

            data: backups

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// DOWNLOAD BACKUP
const downloadBackup = async (req, res) => {

    try {

        const backupPath =
            await backupService.getBackupPath(
                req.params.fileName
            );

        res.download(backupPath);

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};

const restoreBackup = async (req, res) => {

    try {

        const result =
            await backupService.restoreBackup(
                req.params.fileName
            );

        await logActivity({

            user_id: req.user.id,

            action: "RESTORE",

            module: "Backup",

            description:
                `Restored database from ${req.params.fileName}`,

            ip_address: req.ip

        });

        res.json({

            success: true,

            message:
                "Database restored successfully.",

            data: result

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createBackup,

    listBackups,

    downloadBackup,

    restoreBackup

};