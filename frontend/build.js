var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require("babelify");

var b = browserify({
    entries: ['src'],
    cache: {},
    packageCache: {},
    debug: true,
    plugin: [watchify]
  })
  .transform(babelify, { presets: ['es2015', 'react'] });

b.on('update', bundle);

b.on('error', function (error) {
  console.log(error);
});

bundle();

function bundle() {
  b.bundle()
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(fs.createWriteStream('../app/assets/javascripts/bundle.js'));
}
