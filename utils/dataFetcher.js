'use strict'

const utils = require('./');
const readline = require('readline');
const data = require('./../constants/data');

const readA = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = (cb) => {
    let q1 = () => readA.question('project name: (' + utils.getCurDirName() + ') ',
        (answer) => { if (answer) data.projectName = answer; q3(); });

    // let q2 = () => readA.question('version: (1.0.0) ',
    //     (answer) => { if (answer) data.version = answer; q3(); });

    let q3 = () => readA.question('description: (A simple node based API) ',
        (answer) => { if (answer) data.description = answer; q4(); });

    let q4 = () => readA.question('entry point: (server.js) ',
        (answer) => { if (answer) data.entry_point = answer; q5(); });

    let q5 = () => readA.question('git repository: ',
        (answer) => { if (answer) data.git = answer; q6(); });

    let q6 = () => readA.question('author: ',
        (answer) => { if (answer) data.author = answer; q7(); });

    let q7 = () => readA.question('Number Of API versions <less than 5>: (2)',
        (answer) => {
            if (answer && !isNaN(answer))
                data.numAPIversions = Math.abs(parseInt(answer)) > 5 ? 5 : Math.abs(parseInt(answer));
            q8();
        });

    let q8 = () => readA.question('license: (ISC) ',
        (answer) => { if (answer) data.license = answer; readA.close(); cb(); });

    q1();
}