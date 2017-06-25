'use strict'

const path = require('path');
module.exports = {
    getCurDirName: () => {
        return process.cwd().split(path.sep).slice(-1);
    },
    npminstall: (req, res) => {
        let spawn = require('child_process').spawn;
      console.log(process.cwd);
        let child = spawn('sh', ['./install.sh'], {
            cwd: process.cwd(),
            env: process.env,
            detached: true
        });
        let resp = '';
        child.stdout.on('data', function (buffer) { resp += buffer.toString(); console.log(buffer.toString()); });
        child.on('close', function () {
            console.log('eeeeeeeeeeeeend', resp); child.stdin.pause();
            child.kill();
        });

        // child.unref()
        console.log('Running *npm install* for you');
    },
}