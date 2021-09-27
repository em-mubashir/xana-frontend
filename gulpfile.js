const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!
      =========================================================
      * Xana App - v1.0 based on Tailwind by Malik Mubashir
      =========================================================
*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Xana App - v1.0 based on Tailwind by Malik Mubashir
=========================================================


-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!
      =========================================================
      * Xana App - v1.0 based on Tailwind by Malik Mubashir
      =========================================================

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
