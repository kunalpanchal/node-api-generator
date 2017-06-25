'use strict'

const path = require('path');
module.exports = {
    getCurDirName: () => {
        return process.cwd().split(path.sep).slice(-1);
    },
    npminstall: (req, res) => {
        let spawn = require('child_process').spawn;
        let child = spawn('sh', ['./install.sh'], {
            cwd: process.cwd(),
            env: process.env,
            detached: true
        });
        child.stdout.on('data', function (buffer) {
            console.log('\x1b[33m' + buffer.toString());
        });


        child.unref()
        console.log('\nRunning' + '\x1b[31m npm install\x1b[0m' + ' for you\n');
    },
}