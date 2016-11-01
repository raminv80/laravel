'use strict';

module.exports = function(gulp, plugins, conf) {
    var resource_dir = conf.resource_dir + '/fonts';
  return function() {
    return gulp.src([
    	resource_dir+'/**/*'
    	])
      .pipe(gulp.dest(conf.destination_dir+'/fonts/'));
  };
};