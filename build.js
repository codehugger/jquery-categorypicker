var compressor = require('node-minify');
var fs = require('fs');

/*
 * jquery-categorypicker.min.js
 */
new compressor.minify({
    type: 'yui-js',
    fileIn: './src/jquery-categorypicker.js',
    fileOut: './jquery-categorypicker.min.js',
    callback: function(err) {
        if (err) { console.log(err); }
        else {
            // include LICENSE
            new compressor.minify({
                type: 'no-compress',
                fileIn: [
                    'LICENSE',
                    './jquery-categorypicker.min.js'],
                fileOut: './jquery-categorypicker.min.js',
                callback: function(err) {
                    console.log(this.fileOut);
                }
            });
        }
    }
});

/*
 * jquery-categorypicker-ko.min.js
 */
new compressor.minify({
    type: 'yui-js',
    fileIn: './src/jquery-categorypicker-ko.js',
    fileOut: './jquery-categorypicker-ko.min.js',
    callback: function(err) {
        if (err) { console.log(err); }
        else {
            // include LICENSE
            new compressor.minify({
                type: 'no-compress',
                fileIn: ['LICENSE', './jquery-categorypicker-ko.min.js'],
                fileOut: './jquery-categorypicker-ko.min.js',
                callback: function(err) {
                    console.log(this.fileOut);
                }
            });
        }
    }
});
