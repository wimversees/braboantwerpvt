const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-cleancss');
const uglify = require('gulp-uglify'); // JS Minification
const concat = require('gulp-concat'); // JS Concatenation
const babel = require('gulp-babel'); // ES6 Transpilation

 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
    return gulp.src('./design/src/app/design/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({            
                overrideBrowserslist: ['last 2 versions', 'ie >= 8', 'ios >= 8'],
                cascade: false
            }
        ))
        .pipe(gulp.dest('./design/src/docs/design/css'));
});
 
gulp.task('css', function () {
    return gulp.src('./design/src/docs/design/css/scss/main.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./design/css/'));
});

gulp.task('javascript-lib', function(){
    return gulp.src([
        './design/src/app/design/js/lib/jquery/*.js',
        './design/src/app/design/js/lib/popper/*.js',
        './design/src/app/design/js/lib/bootstrap/**/*.js'
        ])
        .pipe(concat('lib.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./design/src/docs/design/js/'))
        .pipe(gulp.dest('./design/js/'));
});

gulp.task('javascript-applib', function(){
    return gulp.src([
            './design/src/app/design/js/app/components/*.js',
            './design/src/app/design/js/app/functions/*.js',
            './design/src/app/design/js/app/modules/*.js',
            './design/src/app/design/js/app/lube.strapon.js',
        ])
        .pipe(concat('applib.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./design/src/docs/design/js/'))
        .pipe(gulp.dest('./design/js/'));
});

gulp.task('run', gulp.series(['sass', 'css', 'javascript-lib', 'javascript-applib']));

gulp.task('watch', function(){
    // css watchers
    gulp.watch('./design/src/app/design/**/*.scss', gulp.series(['sass']));
    gulp.watch('./design/src/docs/design/css/**/*.css', gulp.series(['css']));
    // js watchers
    gulp.watch('./design/src/app/design/js/lib/**/*.js', gulp.series(['javascript-lib']));
    gulp.watch('./design/src/app/design/js/app/**/*.js', gulp.series(['javascript-applib']));
});

gulp.task('default', gulp.series(['run', 'watch']));