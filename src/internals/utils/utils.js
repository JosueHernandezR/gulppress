import path from 'path';

import { rootPath } from './constants';

export function getPath(relativePath) {
  return path.resolve(rootPath, relativePath);
}
