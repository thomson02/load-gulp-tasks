'use strict';

var path = require('path');
var globby = require('globby');

module.exports = function (gulp, options, plugins) {
    var pattern;
    var cwd = process.cwd();

    options = options || {};

    options.cwd = options.cwd || cwd;
    options.argv = options.argv || require('yargs').argv;
    
    pattern = options.pattern = options.pattern || 'tasks/**/*.js';

    globby.sync(pattern).forEach(function (file) {
        var taskConfig = require(path.join(cwd, file));

        if (typeof taskConfig === 'function') {
            taskConfig(gulp, options);
        }
    });
};
