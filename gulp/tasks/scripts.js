'use strict';

module.exports = function(gulp, plugins, conf) {
  var resource_dir = conf.resource_dir + '/js';
  return function() {
    return gulp.src([
        resource_dir+'/**/*.js'
    	])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('compact', process.stderr))
    .pipe(plugins.eslint.results(results => {
        // Called once for all ESLint results.
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
    }))
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
