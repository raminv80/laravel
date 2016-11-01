'use strict';

var bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths;

var nb = {}
// nb = {
//   includePaths: bourbon,
//   includePaths: neat
// };

module.exports = function(gulp, plugins, conf) {
  var resource_dir = conf.resource_dir + '/sass';
  return function() {
    gulp.src([
      resource_dir+'/**/*.scss'
      ])
      .pipe(plugins.sassLint({
        files: {
          ignore: [
            resource_dir+'/modules/_reset.scss',
            resource_dir+'/neat/**/*.scss',
            resource_dir+'/bourbon/**/*.scss',
            resource_dir+'/base/**/*.scss'
          ]
        },
        rules: {
          'property-sort-order': 0,
          'class-name-format': [1, {convention: 'hyphenatedbem'}],
          'mixins-before-declarations': 0,
          'nesting-depth': [1, {'max-depth': 3}],
          'force-pseudo-nesting': 0,
          'no-trailing-zero': 0,
          'leading-zero': 0
        }
      }))
      .pipe(plugins.sassLint.format())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass(nb))
      .on('error',plugins.util.log.bind(plugins.util, 'Sass Error'))
      .pipe(plugins.concat('styles.css'))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.cleanCss())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(conf.destination_dir+'/css/'));
  };
};