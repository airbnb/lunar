#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');

glob('packages/**/*.story.tsx').then(storyPaths => {
  storyPaths.forEach(oldPath => {
    if (!oldPath.includes('components') || oldPath.includes('packages/forms')) {
      return;
    }

    const newPath = oldPath.replace('.story', '/story');
    const folderName = path.dirname(newPath);
    const componentName = path.basename(folderName);

    // Create folder
    fs.ensureDir(folderName)
      // Move file
      .then(() => fs.moveSync(oldPath, newPath))
      // Update import paths in new file
      .then(() => {
        let source = fs.readFileSync(newPath, 'utf8');

        source = source.replace(`from './${componentName}'`, `from '.'`);
        source = source.replace(/from '\.\//g, "from '../");

        return fs.writeFile(newPath, source, 'utf8');
      });
  });
});
