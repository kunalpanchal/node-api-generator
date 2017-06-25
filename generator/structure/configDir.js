'use strict'

const fs = require('./../../utils/fs');
const constants = require('./../../constants')
const path = require('path');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join('config'), (dirName) => {
            let configFiles = fs.createMultiFiles([
                { fileName: path.join(dirName, 'express.js'), content: constants.config_express },
                { fileName: path.join(dirName, 'db.js'), content: constants.config_db },
                { fileName: path.join(dirName, 'index.js'), content: constants.config_index },
                { fileName: path.join(dirName, 'bootstrap.js'), content: constants.config_bootstrap },
                { fileName: path.join(dirName, '.logging.js'), content: constants.config_logging },
                { fileName: path.join(dirName, 'passport.js'), content: constants.config_passport }
            ]);

            Promise.all([
                subModules.constants(dirName),
                subModules.env(dirName),
                subModules.middlewares(dirName),
                subModules.passport(dirName),
                subModules.responses(dirName),
                subModules.seed(dirName),
                subModules.routes(dirName, data.numAPIversions),
                configFiles
            ])
                .then(() => resolve())
                .catch((err) => console.log('Some error occured during config dir creation the process', err));
        });
    })
}

let subModules = {
    constants: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'constants'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'error.js'));
                fs.writeFile(path.join(dirName, 'index.js'));
                fs.writeFile(path.join(dirName, 'response.js'));
                err ? reject() : resolve();
            });
        })
    },
    env: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'env'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'development.js'));
                fs.writeFile(path.join(dirName, 'production.js'));
                fs.writeFile(path.join(dirName, 'test.js'));
                err ? reject() : resolve();
            });
        })
    },
    middlewares: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'middlewares'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'is-auth-api.js'));
                fs.writeFile(path.join(dirName, 'is-authenticated.js'));
                fs.writeFile(path.join(dirName, 'is-company-user.js'));
                err ? reject() : resolve();
            });
        })
    },
    passport: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'passport'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'jwt.js'));
                fs.writeFile(path.join(dirName, 'local.js'));
                fs.writeFile(path.join(dirName, 'oauth2.js'));
                err ? reject() : resolve();
            });
        })
    },
    responses: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'responses'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'index.js'));
                fs.writeFile(path.join(dirName, 'ok.js'));
                fs.writeFile(path.join(dirName, 'error.js'));
                err ? reject() : resolve();
            });
        })
    },
    seed: (dirName) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'seed'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'index.js'));
                fs.writeFile(path.join(dirName, 'users.js'));
                err ? reject() : resolve();
            });
        })
    },
    routes: (dirName, numAPIversions) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.join(dirName, 'routes'), (dirName, err) => {
                fs.writeFile(path.join(dirName, 'index.js'));
                fs.writeFile(path.join(dirName, 'router-configurator.js'));
                if (err) reject();
                for (let i = 1; i <= numAPIversions; i++) {
                    fs.mkdir(path.join(dirName, 'v' + i), (dirName, err) => {
                        fs.writeFile(path.join(dirName, 'index.js'));
                        fs.writeFile(path.join(dirName, 'crawler.js'));
                        err ? reject() : resolve();
                    });
                }
            });
        })
    }
}