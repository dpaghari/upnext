'use strict';
var exec = require('child_process').exec, child;
var colors = require('colors');
var gulp = require('gulp');


    // browserify = require('browserify'),
    // uglify = require('gulp-uglify'),
    // source = require('vinyl-source-stream'),
    // buffer = require('vinyl-buffer'),
    // sourcemaps = require('gulp-sourcemaps'),
    // gutil = require('gulp-util'),
    var sass = require('gulp-sass');
    var cssnano = require('gulp-cssnano');
    // webpack = require('webpack'),
    // WebpackDevServer = require('webpack-dev-server'),
    var autoprefixer = require('gulp-autoprefixer');
    // livereload = require('gulp-livereload');

gulp.task('scripts', function () {
  // Future processing for scripts
});

gulp.task('styles', function () {
  gulp.src('scss/*.scss')
    .pipe(sass({
      includePaths: ['./scss', './node_modules/support-for/sass/']

    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('css'));
    // .pipe(livereload());
});

gulp.task('sass:watch', function () {
  // livereload.listen();
  gulp.watch('scss/*.scss', ['styles']);
});

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(require("./webpack.config.js"), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(require("./webpack.config.js"));

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('zip_project', function() {
  child = exec("zip -r ./upnext.zip * -x '*.DS_Store' 'node_modules/*'", function(error, stdout, stderr) {
    // console.log(stdout.split("\n"));
    console.log(stdout);
  });
  // console.log(typeof child);
  // child();
});

gulp.task('clone_project', function() {
  shell("rsync -av --exclude='node_modules' --exclude='.git' --exclude='*.DS_Store' . ~/Desktop/Daniel/newProj_" + Date.now());
});


function shell(cmd) {
  console.log(colors.yellow.bold("Running " + cmd));
  exec(cmd, function(error, stdout, stderr){
    if(error !== null) {
      throw colors.red(error);
    }

    console.log(stdout);
    console.log(colors.green("Script successful"));
  });
}



// gulp.task('javascript', function () {
//   // set up the browserify instance on a task basis
//   var b = browserify({
//     entries: './entry.js',
//     debug: true
//   });
//
//   return b.bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//         // Add transformation tasks to the pipeline here.
//         .pipe(uglify())
//         .on('error', gutil.log)
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/js/'));
// });

gulp.task('default', ['styles', 'sass:watch', 'webpack-dev-server']);
