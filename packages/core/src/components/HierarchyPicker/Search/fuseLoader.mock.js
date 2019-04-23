// This mock exists because the normal fuseLoader uses `import()` which jest doesn't understand.

import Fuse from 'fuse.js';

export default async function fuseLoader(list, options) {
  return new Fuse(list, options);
}
