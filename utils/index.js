'use strict'

const path = require('path');
module.exports = {
    getCurDirName: () => {
        return process.cwd().split(path.sep).slice(-1);
    },
    npminstall: (req, res) => {
        var spawn = require('child_process').spawn,
            deploy = spawn('sh', ['./install.sh'], {
                detached: true
            });
        deploy.unref()
        console.log('Running *npm install* for you');
    },
}