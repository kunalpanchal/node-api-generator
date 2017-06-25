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
        let resp = '';
        child.stdout.on('data', function (buffer) { resp += buffer.toString(); console.log(buffer.toString()); });
        child.on('close', function () {
            child.stdin.pause();
            child.kill();
        });

        // child.unref()
        console.log('Running *npm install* for you');
    },
}