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
                process.chdir(dirName + (suffix ? suffix : ''));
            } catch (err) {
                if (err.code === 'EEXIST') {
                    suffix = suffix ? suffix + 1 : 1;
                    continue;
                }
            }
            break;
        }
    }
}

function createProjectStructure() {
    let appDir = require('./structure/appDir');
    let configDir = require('./structure/configDir');
    let logsDir = require('./structure/logsDir');
    let testDir = require('./structure/testDir');
    let rootFiles = fs.createMultiFiles([
        { fileName: path.join(data.entry_point), content: constants.server },
        { fileName: path.join('package.json'), content: constants.packagejson },
        { fileName: path.join('.env'), content: constants.env },
        { fileName: path.join('README.md'), content: constants.readme },
        { fileName: path.join('.gitignore'), content: constants.gitignore },
        { fileName: path.join('install.sh'), content: constants.installsh }
    ]);
    Promise.all([
        appDir(data),
        configDir(data),
        logsDir(data),
        testDir(data),
        rootFiles
    ])
        .then(() => { utils.npminstall(); })
        .catch((err) => console.log('Some error occured during the process', err));
}