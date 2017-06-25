'use strict'

const fs = require('./../../utils/fs');
const constants = require('./../../constants')
const path = require('path');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join('app'), (dirName) => {
            Promise.all([subModules.controllers(dirName, data.numAPIversions),
            subModules.events(dirName),
            subModules.helpers(dirName),
            subModules.models(dirName),
            subModules.services(dirName)
            ])
                .then(() => resolve())
                .catch((err) => console.log('Some error occured during app dir creation the process', err));
        });
    })
}

let subModules = {
    controllers: (dirName, numAPIversions) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'controllers'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'base.js'));
                if (err) reject();
                for (let i = 1; i <= numAPIversions; i++) {
                    fs.mkdir(path.join(dirName, 'v' + i), (dirName, err) => {
                        fs.writeFile(path.join(dirName, 'crawler.js'));
                        err ? reject() : resolve();
                    });
                }
            });
        })
    },
    events: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'events'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'signup.js'));
                err ? reject() : resolve();
            });
        })
    },
    helpers: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'helpers'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'crawler.js'));
                err ? reject() : resolve();
            });
        })
    },
    models: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'models'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'app.js'));
                fs.writeFile(path.join(dirName, 'user.js'));
                if (err) reject();
                fs.mkdir(path.join(dirName, 'schemas'), (dirName, err) => {
                    fs.writeFile(path.join(dirName, 'email.js'));
                    err ? reject() : resolve();
                });
            });
        })
    },
    services: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'services'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'jwt.js'));
                err ? reject() : resolve();
            });
        })
    }
}