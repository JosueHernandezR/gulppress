import cleanCSS from 'gulp-clean-css';
import del from 'del';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import named from 'vinyl-named';
import { paths } from './utils/constants';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import webpack from 'webpack-stream';
import yargs from 'yargs';

const PROD = yargs.argv.prod || false;

export function bundleCSS() {
  return gulp
    .src([paths.indexSCSS])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!PROD, sourcemaps.init()))
    .pipe(gulpif(PROD, cleanCSS({ compatibility: 'ie8' })))
    .pipe(gulpif(!PROD, sourcemaps.write(paths.dist)))
    .pipe(gulp.dest(paths.dist));
}

export function tailwindCSS() {
  return null;
}

export function bundleJS() {
  return gulp
    .src([paths.indexJS])
    .pipe(named())
    .pipe(
      webpack({
        devtool: !PROD && 'inline-source-map',
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
        mode: PROD ? 'production' : 'development',
        output: {
          path: paths.dist,
          filename: '[name].js',
        },
      }),
    )
    .pipe(gulp.dest(paths.dist));
}

export function watch() {
  gulp.watch(paths.allSCSS, bundleCSS);
  gulp.watch(paths.allJS, bundleJS);
}

export function clean() {
  return del([paths.dist], { force: true });
}

export function build(done) {
  gulp.series(clean, gulp.parallel(bundleCSS, bundleJS))(done);
}

export default function start(done) {
  gulp.series(clean, gulp.parallel(bundleCSS, bundleJS), watch)(done);
}
