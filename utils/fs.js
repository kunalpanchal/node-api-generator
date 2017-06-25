'use strict'

var fs = require('fs');
var logStatus = require('./logger');
const path = require('path');

module.exports = {
    writeFile: (fileName, content, cb) => {
        if (content)
            fs.writeFile(fileName, content, (err) => { logStatus(err, fileName); cb && cb(); });
        else
            fs.open(fileName, 'w', (err) => { logStatus(err, fileName); cb && cb(); });
    },
    mkdir: (dirName, cb) => {
        dirName && fs.mkdir(dirName, (err) => { logStatus(err, dirName + '/'); cb && cb(dirName); });
    },
    mkdirSync: (dirName) => {
        dirName && fs.mkdirSync(dirName);
    },
    isDirEmpty: (dirName, cb) => {
        let a = fs.readdir(dirName, (err, files) => {
            if (err)
                logStatus(err, dirName)
            cb && cb(files.length === 0);
        });
    }
}