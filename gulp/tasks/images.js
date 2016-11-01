'use strict';

module.exports = function(gulp, plugins, conf) {
  var resource_dir = conf.resource_dir + '/images';
  return function() {
    return gulp.src([
        resource_dir+'/**/*.+(png|jpg|gif|svg)'
    	])
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(conf.destination_dir+'/images/'));
  };
};