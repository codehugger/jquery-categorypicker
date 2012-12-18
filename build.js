var compressor = require('node-minify');
var fs = require('fs');

fs.exists('./build', function (exists) {
  if (!exists) {
    fs.mkdirSync('./build');
  }
});

new compressor.minify({
    type: 'yui-js',
    fileIn: ['./jquery-categorypicker.js'],
    fileOut: './build/categorypicker.min.js',
    callback: function(err){
        if (err) { console.log(err); }
        else { console.log(this.fileOut); }
    }
});

new compressor.minify({
    type: 'yui-js',
    fileIn: ['./jquery-categorypicker.js', './jquery-categorypicker-ko.js'],
    fileOut: './build/categorypicker-ko.min.js',
    callback: function(err){
        if (err) { console.log(err); }
        else { console.log(this.fileOut); }
    }
});
