const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const cleanCSS = require('gulp-cleancss');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify'); // JS Minification
const concat = require('gulp-concat'); // JS Concatenation
const babel = require('gulp-babel'); // ES6 Transpilation
const sourcemaps = require('gulp-sourcemaps'); // Adds sourcemaps to your resulting css file

 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
    return gulp.src('./design/src/app/design/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({            
                overrideBrowserslist: ['last 2 versions', 'ie >= 8', 'ios >= 8'],
                cascade: false
            }
        ))
        .pipe(
            sourcemaps.write({
                sourceRoot: './design/src/app/design/scss/'
            })
        )
        .pipe(gulp.dest('./design/src/docs/design/css'));
}); 

gulp.task('admin-sass', function () {
    return gulp.src('./functions/admin/design/src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({            
                overrideBrowserslist: ['last 2 versions', 'ie >= 8', 'ios >= 8'],
                cascade: false
            }
        ))
        .pipe(
            sourcemaps.write({
                sourceRoot: './functions/admin/design/src/scss/'
            })
        )
        .pipe(gulp.dest('./functions/admin/design/css/'));
});
 
gulp.task('css-dev', function () {
    return gulp.src('./design/src/docs/design/css/main.css')
        .pipe(concat('main-dev.css'))
        .pipe(gulp.dest('./design/css/'));
});
 
gulp.task('css', function () {
    return gulp.src('./design/src/docs/design/css/main.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./design/css/'));
});

gulp.task('javascript-lib-dev', function(){
    return gulp.src([
        './design/src/app/design/js/lib/jquery/*.js',
        './design/src/app/design/js/lib/popper/*.js',
        './design/src/app/design/js/lib/bootstrap/**/*.js',
        // './design/src/app/design/js/lib/leaflet/**/*.js', // no leaflet for local environment
        './design/src/app/design/js/lib/simplelightbox/**/*.js'
        ])
        .pipe(concat('lib-dev.js'))
        .pipe(gulp.dest('./design/src/docs/design/js/'))
        .pipe(gulp.dest('./design/js/'));
});

gulp.task('javascript-lib', function(){
    return gulp.src([
        './design/src/app/design/js/lib/jquery/*.js',
        './design/src/app/design/js/lib/popper/*.js',
        './design/src/app/design/js/lib/bootstrap/**/*.js',
        './design/src/app/design/js/lib/leaflet/**/*.js',
        './design/src/app/design/js/lib/simplelightbox/**/*.js'
        ])
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./design/src/docs/design/js/'))
        .pipe(gulp.dest('./design/js/'));
});

gulp.task('javascript-applib-dev', function(){
    return gulp.src([
            './design/src/app/design/js/app/components/*.js',
            './design/src/app/design/js/app/functions/*.js',
            './design/src/app/design/js/app/modules/*.js',
            './design/src/app/design/js/app/lube.strapon.js',
        ])
        .pipe(concat('applib-dev.js'))
        .pipe(babel())
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
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./design/src/docs/design/js/'))
        .pipe(gulp.dest('./design/js/'));
});

gulp.task('admin-js', function(){
    return gulp.src([
            './functions/admin/design/src/js/**/*.js'
        ])
        .pipe(concat('wiver-admin.js'))
        .pipe(babel())
        .pipe(gulp.dest('./functions/admin/design/js/'));
});

gulp.task('run', gulp.series([
    'sass', 
    'admin-sass', 
    'css', 
    'css-dev', 
    'javascript-lib', 
    'javascript-lib-dev', 
    'javascript-applib', 
    'javascript-applib-dev',
    'admin-js']));

gulp.task('watch', function(){
    // css watchers
    gulp.watch('./design/src/app/design/**/*.scss', gulp.series(['sass']));
    gulp.watch('./design/src/docs/design/css/**/*.css', gulp.series(['css', 'css-dev']));
    gulp.watch('./functions/admin/design/src/**/*.scss', gulp.series(['admin-sass']));
    // js watchers
    gulp.watch('./design/src/app/design/js/lib/**/*.js', gulp.series(['javascript-lib', 'javascript-lib-dev']));
    gulp.watch('./design/src/app/design/js/app/**/*.js', gulp.series(['javascript-applib', 'javascript-applib-dev']));
    gulp.watch('./functions/admin/design/src/**/*.js', gulp.series(['admin-js']));
});

gulp.task('default', gulp.series(['run', 'watch']));