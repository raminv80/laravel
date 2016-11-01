var gulp = require("gulp");
var elixir = require("laravel-elixir");
var plugins = require('gulp-load-plugins')();
plugins = Object.assign(plugins, {
    mainBowerFiles: require('main-bower-files'),
    runSequence: require('run-sequence')
});

//shared configuration object
var conf = {
    url: 'hybrid-laravel.dev',
    resource_dir: 'resources/assets',
    destination_dir: 'public'
};

function getTask(task) {
    return require('./gulp/tasks/' + task)(gulp, plugins, conf);
}

gulp.task('bower', getTask('bower'));
gulp.task('vendorjs', getTask('vendor-js'));
gulp.task('vendorcss', getTask('vendor-css'));
gulp.task('vendorfonts', getTask('vendor-fonts'));
gulp.task('vendor', function(cb){
    plugins.runSequence('bower', 'vendorjs', 'vendorfonts', 'vendorcss');
    cb();
});

gulp.task('custom-fonts', getTask('custom-fonts'));
gulp.task('google-fonts', getTask('google-fonts'));
gulp.task('fonts', ['custom-fonts', 'google-fonts']);

gulp.task('scripts', getTask('scripts'));
gulp.task('sass', getTask('sass'));
gulp.task('images', getTask('images'));
gulp.task('resource', function cb(){
    plugins.runSequence('scripts', 'sass', 'images')
});

gulp.task('lint-js', getTask('lint-js'));
gulp.task('lint-css', getTask('lint-css'));
gulp.task('lint', ['lint-js', 'lint-css']);

elixir(function(mix) {
    mix.task('custom-fonts', conf.resource_dir+'/**/*')
        .task('google-fonts', './fonts.list')
        .task('vendor', 'bower.json')
        .task('sass', conf.resource_dir+'/**/*.scss')
        .task('scripts', conf.resource_dir+'/**/*.js')
        .task('images', conf.resource_dir+'/**/*.+(png|jpg|gif|svg)')
        .task('vendor')
        .browserSync({
            proxy: conf.url
        })
        .version([
            conf.destination_dir+'/css/*.css',
            conf.destination_dir+'/js/*.js'
        ]);
});