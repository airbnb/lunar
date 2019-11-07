import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

async function getTotalSize(fileGlob: string, cwd: string): Promise<number> {
  const files = await glob(fileGlob, { absolute: true, cwd, onlyFiles: true });
  const sizes = await Promise.all<number>(
    files.map(
      file =>
        new Promise((resolve, reject) => {
          fs.stat(file, (error, stats) => {
            if (error) {
              reject(error);
            } else {
              resolve(stats.size);
            }
          });
        }),
    ),
  );

  return sizes.reduce((sum, size) => sum + size, 0);
}

type StatMap = {
  [pkg: string]: {
    [dir: string]: number;
  };
};

async function computeBuildSizes() {
  const packages = await glob('./packages/*', { absolute: true, onlyDirectories: true });
  const sizes: StatMap = {};

  await Promise.all(
    packages.map(async packagePath => {
      const packageName = path.basename(packagePath);

      sizes[packageName] = {
        esm: await getTotalSize('./esm/**/*.js', packagePath),
        lib: await getTotalSize('./lib/**/*.js', packagePath),
      };
    }),
  );

  fs.writeFileSync('./packages/sizes.json', JSON.stringify(sizes), 'utf8');
}

computeBuildSizes();
