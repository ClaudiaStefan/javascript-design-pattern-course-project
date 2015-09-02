var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    mainConfig  = {
                    'dev': 'app'
                  };
/**
 *  @description This task wil compile the sass files for scss folder into the css folder. After the compilation
 *               is done it will reload the browser window via browserSync.
 **/
gulp.task('sass', function() {
    return gulp.src(mainConfig.dev + '/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(mainConfig.dev + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 *  @description We use browserSync to create a local web server that hosts our application.
 **/
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: mainConfig.dev
        }
    });
});

/**
 *  @description To be able to reload the browser window when the files change we created a watch task.
 *               This task will first run browser-sync task and sass task and after that it will start watching
 *               the scss, js and html files we have.
 **/
gulp.task('default', ['browser-sync', 'sass'], function () {
    gulp.watch(mainConfig.dev + '/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
