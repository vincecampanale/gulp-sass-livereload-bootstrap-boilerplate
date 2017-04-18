var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var config = {
    bootStrapDir: './bower_components/bootstrap-sass',
    publicDir: './public'
}


gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

//keeps gulp from crashing for scss errors & gives sass access to bootstrap
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass({ 
            errLogToConsole: true,
            includePaths: [config.bootStrapDir + '/assets/stylesheets']
        }))
        .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('livereload', function() {
    gulp.src('./public/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch(config.publicDir + '/**/*', ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass']);