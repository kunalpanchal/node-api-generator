'use strict'

const fs = require('./../../utils/fs');
const constants = require('./../../constants')
const path = require('path');

module.exports = (parent_dir, data) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(parent_dir, 'test'), (dirName) => {
            fs.writeFile(path.join(dirName, '.gitkeep'));
            fs.writeFile(path.join(dirName, 'index.test.js'));

            Promise.all([subModules.integration(dirName),
            subModules.unit(dirName)
            ])
                .then(() => resolve())
                .catch((err) => console.log('Some error occured during config test creation the process', err));
        });
    })
}

let subModules = {
    integration: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'integration'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'user.test.js'));
                err ? reject() : resolve();
            });
        })
    },
    unit: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'unit'), (dirName, err) => {
                fs.writeFile(path.join(dirName, '.gitkeep'));
                if (err) reject();
                fs.mkdir(path.join(dirName, 'user'), (dirName, err) => {
                    fs.writeFile(path.join(dirName, 'email.test.js'));
                    err ? reject() : resolve();
                });
                fs.mkdir(path.join(dirName, 'public_calc'), (dirName, err) => {
                    fs.writeFile(path.join(dirName, 'public_calc.test.js'));
                    err ? reject() : resolve();
                });
            });
        })
    }
}