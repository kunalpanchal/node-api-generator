'use strict'

var fs = require('fs');
var logStatus = require('./logger');
const path = require('path');

let self = module.exports = {
    writeFile: (fileName, content, cb) => {
        if (content)
            fs.writeFile(fileName, content, (err) => { logStatus(err, fileName); cb && cb(err); });
        else
            fs.open(fileName, 'w', (err) => { logStatus(err, fileName); cb && cb(err); });
    },
    mkdir: (dirName, cb) => {
        dirName && fs.mkdir(dirName, (err) => { logStatus(err, dirName + '/'); cb && cb(dirName, err); });
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
    },
    createMultiFiles: (files) => {
        return new Promise((resolve, reject) => {
            Promise.all(
                files.map((file) => {
                    return new Promise((resolve, reject) => {
                        self.writeFile(file.fileName, file.content, (err) => err ? reject() : resolve());
                    })
                })
            )
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }
}