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

    /* root directory files */
    fs.writeFile(path.join(parent_dir, data.entry_point), constants.server);
    fs.writeFile(path.join(parent_dir, 'package.json'), constants.packagejson);
    fs.writeFile(path.join(parent_dir, '.env'), constants.env);
    fs.writeFile(path.join(parent_dir, 'README.md'), constants.readme);
    fs.writeFile(path.join(parent_dir, '.gitignore'), constants.gitignore);
    /* root directory files -- END*/

    /* CONFIG directory*/
    fs.mkdir(path.join(parent_dir, 'config'), (dirName) => {
        fs.writeFile(path.join(dirName, 'express.js'), constants.config_express);
        fs.writeFile(path.join(dirName, 'db.js'), constants.config_db);
        fs.writeFile(path.join(dirName, 'index.js'), constants.config_index);
        fs.writeFile(path.join(dirName, 'bootstrap.js'), constants.config_bootstrap);
        fs.writeFile(path.join(dirName, 'logging.js'), constants.config_logging);
        fs.writeFile(path.join(dirName, 'passport.js'), constants.config_passport);

        fs.mkdir(path.join(dirName, 'constants'), (dirName) => {
            fs.writeFile(path.join(dirName, 'error.js'));
            fs.writeFile(path.join(dirName, 'index.js'));
            fs.writeFile(path.join(dirName, 'response.js'));
        });

        fs.mkdir(path.join(dirName, 'env'), (dirName) => {
            fs.writeFile(path.join(dirName, 'development.js'));
            fs.writeFile(path.join(dirName, 'production.js'));
            fs.writeFile(path.join(dirName, 'test.js'));
        });

        fs.mkdir(path.join(dirName, 'responses'), (dirName) => {
            fs.writeFile(path.join(dirName, 'index.js'));
            fs.writeFile(path.join(dirName, 'ok.js'));
            fs.writeFile(path.join(dirName, 'error.js'));
        });

        fs.mkdir(path.join(dirName, 'routes'), (dirName) => {
            fs.writeFile(path.join(dirName, 'index.js'));
            for (let i = 1; i <= data.numAPIversions; i++) {
                fs.mkdir(path.join(dirName, 'v' + i), (dirName) => {
                    fs.writeFile(path.join(dirName, 'index.js'));
                    fs.writeFile(path.join(dirName, 'crawler.js'));
                });
            }
        });
    });
    /* CONFIG directory -- END*/

    /* APP directory*/
    fs.mkdir(path.join(parent_dir, 'app'), (dirName) => {

        fs.mkdir(path.join(dirName, 'controllers'), (dirName) => {
            fs.writeFile(path.join(dirName, 'base.js'));
            for (let i = 1; i <= data.numAPIversions; i++) {
                fs.mkdir(path.join(dirName, 'v' + i), (dirName) => {
                    fs.writeFile(path.join(dirName, 'crawler.js'));
                });
            }
        });

        fs.mkdir(path.join(dirName, 'events'), (dirName) => {
            fs.writeFile(path.join(dirName, 'signup.js'));
        });

        fs.mkdir(path.join(dirName, 'helpers'), (dirName) => {
            fs.writeFile(path.join(dirName, 'crawler.js'));
        });

        fs.mkdir(path.join(dirName, 'models'), (dirName) => {
            fs.writeFile(path.join(dirName, 'app.js'));
            fs.writeFile(path.join(dirName, 'user.js'));
            fs.mkdir(path.join(dirName, 'schemas'), (dirName) => {
                fs.writeFile(path.join(dirName, 'email.js'));
            });
        });

        fs.mkdir(path.join(dirName, 'service'), (dirName) => {
            fs.writeFile(path.join(dirName, 'jwt.js'));
        });
    });
    /* APP directory -- END*/

    /* TEST directory*/
    fs.mkdir(path.join(parent_dir, 'test'), (dirName) => {
        fs.writeFile(path.join(dirName, '.gitkeep'));
        fs.writeFile(path.join(dirName, 'index.test.js'));
        fs.mkdir(path.join(dirName, 'integration'), (dirName) => {
            fs.writeFile(path.join(dirName, 'user.test.js'));
        });
        fs.mkdir(path.join(dirName, 'unit'), (dirName) => {
            fs.writeFile(path.join(dirName, '.gitkeep'));
            fs.mkdir(path.join(dirName, 'user'), (dirName) => {
                fs.writeFile(path.join(dirName, 'email.test.js'));
            });
            fs.mkdir(path.join(dirName, 'public_calc'), (dirName) => {
                fs.writeFile(path.join(dirName, 'public_calc.test.js'));
            });
        });
    });
    /* TEST directory -- END*/
}