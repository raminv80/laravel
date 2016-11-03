'use strict';

module.exports = function(gulp, plugins, conf) {
  var resource_dir = conf.resource_dir + '/js';
  return function() {
    return gulp.src([
        resource_dir+'/**/*.js'
    	])
    .pipe(plugins.eslint('.esLintConfig.json'))
    .pipe(plugins.eslint.format())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel({
        presets: ['es2015']
    })).on('error', swallowError)
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify()).on('error', swallowError)
    .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(conf.destination_dir+'/js/'));
  };
};

function swallowError (error) {
    console.log('javascript error', error.toString())
    this.emit('end')
}
