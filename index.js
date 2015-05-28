'use strict';

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var util = require('util');

module.exports = function(filePath, options) {
    var json = {};
    var concat = [];
    options || (options = {});
    var wrap = options.wrap || ['', ''];
    if (options.var) {
        wrap = [(options.var+' = '), ';'];
    }

    if (options.debug) {
        console.log("Debug mode on");
    }

    return through.obj(function(file, enc, cb) {
        // ignore empty files
        if (file.isNull()) {
            cb();
            return;
        }

        // we dont do streams (yet)
        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-templatesBuilder', 'Streaming not supported'));
            cb();
            return;
        }

        var html = file.contents.toString().replace(/>[\s]*([\S]*)[\s]*</g, '>$1<');
        var root = path.resolve(options.root);

        var name = file.path.replace(root, '').replace('.html', '').substring(1).replace(/\\/g, '.');

        if (options.debug) {
            console.log(name);
        }

        json[name] = html;

        cb();
    }, function(cb) {
        var joinedFile = new File();
        joinedFile.path = filePath;
        joinedFile.contents = new Buffer(wrap[0] + JSON.stringify(json) + wrap[1]);

        this.push(joinedFile);
        cb();
    });
};
