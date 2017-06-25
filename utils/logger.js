'use strict'

module.exports = (err, file_name, callback) => {
    if (err)
        console.log('\x1b[31merror\x1b[0m : ' + file_name + '\n' + err);
    else {
        if(file_name) console.log('\x1b[36mcreate\x1b[0m : ' + file_name);
        if (callback) {
            callback();
        }
    }
}