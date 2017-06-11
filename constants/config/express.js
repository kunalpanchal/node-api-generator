module.exports=`'use strict';

const express = require('express');

const parser = require('body-parser');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';

module.exports = function (app) {
    app.disable('x-powered-by');
    app.use(cors());
    app.use(parser.json({limit: '50mb'}));
    app.use(parser.urlencoded({ extended: false }));
};
`