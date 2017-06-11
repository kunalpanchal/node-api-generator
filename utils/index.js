'use strict'

const path=require('path');
module.exports = {
    getCurDirName: () => {
        return process.cwd().split(path.sep).slice(-1);
    }
}