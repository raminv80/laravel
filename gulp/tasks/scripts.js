'use strict';

module.exports = function(gulp, plugins, conf) {
  var resource_dir = conf.resource_dir + '/js';
  return function() {
    return gulp.src([
        resource_dir+'/**/*.js'
    	])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .on('error', swallowError)
    .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(conf.destination_dir+'/js/'));
  };
};

function swallowError (error) {
    console.log('javascript error', error.toString())
    this.emit('end')
}