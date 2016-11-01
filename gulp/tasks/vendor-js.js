'use strict';

module.exports = function(gulp, plugins, conf) {
  return function() {
    return gulp.src(plugins.mainBowerFiles())
    .pipe(plugins.filter('**/*.js'))
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(conf.destination_dir+'/js/'));
  };
};
