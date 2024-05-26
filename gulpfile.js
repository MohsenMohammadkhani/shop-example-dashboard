"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;
const gulpConcat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");

gulp.task("sass", () => {
  return gulp
    .src("src/assets/css/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulpConcat("app.min.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("src/assets/css/vendor/"));
});

gulp.task("minify-css", () => {
  return gulp
    .src("src/assets/css/vendor/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulpConcat("app.min.css"))
    .pipe(gulp.dest("public/assets/css/"));
});

gulp.task("script", function () {
  return gulp
    .src([
      "./src/assets/js/jquery.min.js",
      "./src/assets/js/bootstrap.bundle.min.js",
      "./src/assets/js/adminlte.min.js",
      "./src/assets/js/jquery.slimscroll.min.js",
      "./src/assets/js/demo.js",
      "./src/assets/js/main.js",
    ])
    .pipe(gulpConcat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./public/assets/js/"));
});

gulp.task("serve", function () {
  gulp.watch("./src/assets/css/*.scss", gulp.series("sass","minify-css"));
});

gulp.task("default", gulp.series("sass", "minify-css", "serve"));
