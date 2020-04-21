import fs from 'fs';
import { getPath } from './utils';

export const rootPath = `${fs.realpathSync(process.cwd())}/../../`;

export const paths = {
  src: getPath('src'),
  dist: getPath('dist'),
  indexJS: getPath('src/assets/js/build.js'),
  indexSCSS: getPath('src/assets/scss/style.scss'),
  allSCSS: getPath('src/assets/scss/**/*.scss'),
  allJS: getPath('src/assets/js/**/*.js'),
  allPHP: getPath('**/*.php'),
};
