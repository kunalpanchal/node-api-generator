'use strict'

module.exports = {

    //root files
    server: require('./root/server'),
    packagejson: require('./root/packagejson'),
    env: require('./root/env'),
    gitignore: require('./root/gitignore'),
    readme: require('./root/readme'),
    installsh: require('./root/installsh'),

    //config files
    config_express: require('./config/express'),
    config_db: require('./config/express'),
    config_index: require('./config/express'),
    config_bootstrap: require('./config/express'),
    config_logging: require('./config/express'),
    config_passport: require('./config/express'),
}