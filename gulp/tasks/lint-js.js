'use strict';

module.exports = function(gulp, plugins, conf) {
    var resource_dir = conf.resource_dir + '/js';
    return function() {
        return gulp.src([
            resource_dir+'/**/*.js'
        ])
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'));
    };
};
