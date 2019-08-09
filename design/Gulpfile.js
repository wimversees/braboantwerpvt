const gulp = require('gulp');
const $ = require('gulp-load-plugins')(); // Gulp plugin loader (loads all gulp-* dependencies)
const sass = require('gulp-sass'); // Sass compiler
const autoprefixer = require('gulp-autoprefixer'); // Fixed vendor prefixes by required prefixes for configured compatibility
const sourcemaps = require('gulp-sourcemaps'); // Adds sourcemaps to your resulting css file
const babel = require('gulp-babel'); // ES6 Transpilation
const uglify = require('gulp-uglify'); // JS Minification
const concat = require('gulp-concat'); // JS Concatenation
const cleanCSS = require('gulp-clean-css'); // CSS Minification
const nunjucksRender = require('gulp-nunjucks-render'); // Nunjucks renderer
const path = require('path'); // NPM path helper

const DEV_DIR = 'src/app';
const DESIGN_DIR = path.join(DEV_DIR, 'design');
const DIST_DIR = 'src/docs';
const DIST_DIR_THEME = '';

gulp.task('copy-dependencies', function () {
    gulp
        .src(['./node_modules/jquery/dist/jquery.js'])
        .pipe(gulp.dest(path.join(DESIGN_DIR, 'js/lib/jquery')));

    gulp
        .src([
            './node_modules/bootstrap/js/dist/util.js',
            './node_modules/bootstrap/js/dist/collapse.js',
            './node_modules/bootstrap/js/dist/alert.js',
            './node_modules/bootstrap/js/dist/dropdown.js',
            './node_modules/bootstrap/js/dist/modal.js',
            './node_modules/bootstrap/js/dist/carousel.js'
        ])
        .pipe(gulp.dest(path.join(DESIGN_DIR, 'js/lib/bootstrap')));

    gulp
        .src(['./node_modules/bootstrap/scss/**/_*.scss'])
        .pipe(gulp.dest(path.join(DESIGN_DIR, 'scss/vendor/bootstrap')));

    gulp
        .src(['./node_modules/popper.js/dist/umd/popper.js'])
        .pipe(gulp.dest(path.join(DESIGN_DIR, 'js/lib/popper')));

    gulp
        .src(['./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js'])
        .pipe(gulp.dest(path.join(DESIGN_DIR, 'js/lib/bootstrap-datepicker')));

    // gulp
    //     .src(['./node_modules/slick-carousel/slick/slick.js'])
    //     .pipe(gulp.dest(path.join(DESIGN_DIR, 'js/lib/slick-carousel')));

    gulp
        .src(['./node_modules/magnific-popup/dist/jquery.magnific-popup.js'])
        .pipe(gulp.dest(path.join(DESIGN_DIR, 'js/lib/magnific-popup')));
});

gulp.task('stylesheets', function () {
    console.log("Run stylesheets");
    gulp
        .src(path.join(DESIGN_DIR, 'scss/**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compact'
            }).on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions', 'ie >= 8', 'ios >= 8'],
                cascade: false
            })
        )
        .pipe(
            cleanCSS({
                compatibility: 'ie8'
            })
        )
        .pipe(
            sourcemaps.write({
                sourceRoot: './design/scss/'
            })
        )
        .pipe(gulp.dest('../design/src/docs/design/css'));
    return gulp.src('../design/src/docs/design/css/src/app/design/scss/main.css')
        .pipe(gulp.dest('../design/css/'))
        .pipe(gulp.dest('../design/src/docs/design/css/'));
});

gulp.task('javascript', function () {
    console.log("Run javascript");
    gulp
        .src([
            path.join(DESIGN_DIR, 'js/lib/jquery/*.js'),
            path.join(DESIGN_DIR, 'js/lib/popper/popper.js'),
            path.join(DESIGN_DIR, 'js/lib/bootstrap/**/*.js'),
            path.join(DESIGN_DIR, 'js/lib/bootstrap-datepicker/**/*.js'),
            path.join(DESIGN_DIR, 'js/lib/magnific-popup/**/*.js'),
            path.join(DESIGN_DIR, 'js/lib/lodash/**/*.js')
        ])
        .pipe(concat('lib.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(path.join(DIST_DIR, 'design/js/')))
        .pipe(gulp.dest(path.join(DIST_DIR_THEME, 'js/')));

    return gulp
        .src([
            path.join(DESIGN_DIR, 'js/app/components/*.js'),
            path.join(DESIGN_DIR, 'js/app/functions/*.js'),
            path.join(DESIGN_DIR, 'js/app/modules/*.js'),
            path.join(DESIGN_DIR, 'js/app/lube.strapon.js')
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('applib.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(DIST_DIR, 'design/js/')))
        .pipe(gulp.dest(path.join(DIST_DIR_THEME, 'js/')));
});

gulp.task('copy-img', function () {
    console.log("Run copy-img");
    return gulp.src(path.join(DESIGN_DIR, 'img/**/*'))
        .pipe(gulp.dest(path.join(DIST_DIR, 'design/img')))
        .pipe(gulp.dest(path.join(DIST_DIR_THEME, 'img')));
});

gulp.task('copy-icons', function () {
    console.log("Run copy-icons");
    return gulp
        .src(path.join(DESIGN_DIR, 'favicons/**/*'))
        .pipe(gulp.dest(path.join(DIST_DIR, 'design/favicons')))
        .pipe(gulp.dest(path.join(DIST_DIR_THEME, 'favicons')));
});

gulp.task('copy-fonts', function () {
    console.log("Run copy-fonts");
    return gulp
        .src(path.join(DESIGN_DIR, 'fonts/**/*'))
        .pipe(gulp.dest(path.join(DIST_DIR, 'design/fonts')))
        .pipe(gulp.dest(path.join(DIST_DIR_THEME, 'fonts')));
});

gulp.task('compile-nunjucks', function () {
    console.log("Run compile-nunjucks");
    // Gets .html and .nunjucks files in pages
    return gulp
        .src(path.join(DEV_DIR, 'pages/**/*.+(html|nunjucks)'))
        // Renders template with nunjucks
        .pipe(
            nunjucksRender({
                path: ['app/templates']
            })
        )
        // output files in app folder
        .pipe(gulp.dest(DIST_DIR));
});

gulp.on('err', function (err) {
    console.log(err);
});

//Watch task
gulp.task('default', function() {
    console.log("Path: " + path.join(DESIGN_DIR, 'scss/**/*.scss'));
    gulp.watch('src/app/design/scss/**/*.scss', gulp.series(['stylesheets']));
    gulp.watch('src/app/design/js/**/*.js', gulp.series(['javascript']));
    // gulp.watch(path.join(DEV_DIR, '**/*.+(html|nunjucks)'), gulp.series(['compile-nunjucks', 'bundle-sw']));

    gulp.watch('src/app/design/img/**/*', gulp.series(['copy-img']));
    gulp.watch('src/app/design/favicons/**/*', gulp.series(['copy-icons']));
    gulp.watch('src/app/design/fonts/**/*', gulp.series(['copy-fonts']));
});
