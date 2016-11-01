'use strict';

module.exports = function(gulp, plugins, conf) {
  return function() {
    return gulp.src(plugins.mainBowerFiles())
    .pipe(plugins.filter('**/*.css'))
    .pipe(plugins.concat('vendor.css'))
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(conf.destination_dir+'/css/'));
  };
};
