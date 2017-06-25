'use strict'

const fs = require('./../../utils/fs');
const constants = require('./../../constants')
const path = require('path');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join('logs'), (dirName, err) => {
            fs.mkdir(path.join(dirName, 'errorLogs'));
            fs.mkdir(path.join(dirName, 'requestLogs'));
            err ? reject() : resolve();
        });
    })
}