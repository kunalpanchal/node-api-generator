
const path = require('path');

var dir = process.argv[2];
if (dir) {
    try {
        process.chdir(dir);
    } catch (error) {
        console.log('enter a valid path');
        process.abort();
    }
}

console.log('\n\nWelcome to NODE API GENERATOR\n');
require('./utils/dataFetcher')(() => { require('./generator')() });
