const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const gulpSequence = require('gulp-sequence');
const cleanCSS = require('gulp-clean-css');

gulp.task("scss", function() {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/"))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
              cascade: true
          }))
          .pipe(cleanCSS())
          .pipe(gulp.dest('dist/'))

});

gulp.task("srv", ["scss","uglify",'img','clean'], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("src/scss/*.scss", ["scss"]).on("change", browserSync.reload);
  gulp.watch("src/img/*.*", ["img"]).on("change", browserSync.reload);
  gulp.watch("src/js/*.*", ["uglify"]).on("change", browserSync.reload);
  gulp.watch("index.html").on("change", browserSync.reload);
});

gulp.task("concat", function() {
    return gulp.src('src/js/*.js')
    .pipe(concat('index.js')) 
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
      .pipe(clean());
});

gulp.task("uglify", ['concat'], function () {
    return gulp.src("dist/index.js")
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest("dist/js"));
});

gulp.task('img', function() {
  return gulp.src('src/img/*.*')
          .pipe(imagemin({
                  interlaced: true,
                  progressive: true,
                  svgoPlugins: [{removeViewBox: false}],
                  use: [pngquant()]
                })
          )
          .pipe(gulp.dest('./dist/images'));
});

gulp.task('dev', gulpSequence('clean', 'srv'));

gulp.task('build', gulpSequence('clean',["scss", "uglify", 'img']) );

gulp.task("default", ["dev"]);



