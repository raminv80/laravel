'use strict';

module.exports = function(gulp, plugins, conf) {
  return function() {
    return gulp.src('./fonts.list')
      .pipe(plugins.googleWebfonts({fontsDir: './'}))
      .pipe(gulp.dest(conf.destination_dir+'/fonts'));
  };
};