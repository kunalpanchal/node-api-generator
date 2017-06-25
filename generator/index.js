'use strict'

const utils = require('./../utils');
const fs = require('./../utils/fs');
const constants = require('./../constants')
const path = require('path');
const data = require('./../constants/data');

module.exports = () => {
    fs.isDirEmpty(process.cwd(), (isDirEmpty) => {
        let parent_dir = '';

        if (!isDirEmpty)
            parent_dir = data.projectName ? data.projectName : utils.getCurDirName();

        createProjectStructure(createdirectory(parent_dir));
    });
}

function createdirectory(dirName) {
    if (dirName) {
        let suffix;
        while (true) {
            try {
                fs.mkdirSync(dirName + (suffix ? suffix : ''));
            } catch (err) {
                if (err.code === 'EEXIST') {
                    suffix = suffix ? suffix + 1 : 1;
                    continue;
                }
            }
            break;
        }
        return dirName + (suffix ? suffix : '');
    }
    return dirName;
}

function createProjectStructure(parent_dir) {
    let appDir = require('./structure/appDir');
    let configDir = require('./structure/configDir');
    let logsDir = require('./structure/logsDir');
    let testDir = require('./structure/testDir');
    let rootFiles = fs.createMultiFiles([
        { fileName: path.join(parent_dir, data.entry_point), content: constants.server },
        { fileName: path.join(parent_dir, 'package.json'), content: constants.packagejson },
        { fileName: path.join(parent_dir, '.env'), content: constants.env },
        { fileName: path.join(parent_dir, 'README.md'), content: constants.readme },
        { fileName: path.join(parent_dir, '.gitignore'), content: constants.gitignore },
        { fileName: path.join(parent_dir, 'install.sh'), content: constants.installsh }
    ]);
    Promise.all([
        appDir(parent_dir, data),
        configDir(parent_dir, data),
        logsDir(parent_dir, data),
        testDir(parent_dir, data),
        rootFiles
    ])
        .then(() => { utils.npminstall(); })
        .catch((err) => console.log('Some error occured during the process', err));
}