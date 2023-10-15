import gulp from "gulp";
import {deleteSync} from "del";
import minify from "gulp-csso";
import gulpSass from "gulp-sass";
import sass2 from "sass";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-replace";
import ghPages from "gh-pages";
import gulpImg from "gulp-imagemin";

const sass = gulpSass(sass2);

const routes = {
  html: {
    src: "index.html",
    dest: "dest",
  },
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dest: "dest/css",
  },
  js: {
    watch: "src/js/*",
    src: {
      jquery: "src/js/jquery.min.js",
      index: "src/js/index.js",
    },
    dest: "dest/js",
  },
  img: {
    src: "src/img/*",
    dest: "dest/img",
  },
};
const homepage = () => {
  gulp
    .src(routes.html.src)
    .pipe(replace(`<script src="src/js/jquery.min.js"></script>`, ""))
    .pipe(replace("dest/css/", "css/"))
    .pipe(replace("src/js/", "js/"))
    .pipe(replace("src/img/", "img/"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(routes.html.dest));
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));
const js = () => {
  gulp
    .src([routes.js.src.jquery, routes.js.src.index])
    .pipe(concat("index.js"))
    .pipe(gulp.dest(routes.js.dest));
};
const img = () => {
  gulp.src(routes.img.src).pipe(gulpImg()).pipe(gulp.dest(routes.img.dest));
};

const ghDeploy = async () => {
  ghPages.publish("dest", {
    branch: "gh-pages",
    message: "auto Deploy",
  });
};

const watch = () => {
  gulp.watch(routes.html.src, homepage);
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.js.watch, js);
  gulp.watch(routes.img.src, img);
};

const clean = async () => await deleteSync(["dest/"]);

const prepare = gulp.series([clean]);

const assets = async () => {
  await homepage();
  await styles();
  await js();
  await img();
};

const live = gulp.parallel([watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([ghDeploy]);
