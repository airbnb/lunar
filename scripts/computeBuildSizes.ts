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

async function computeBuildSizes() {
  const packages = await glob('./packages/*', { absolute: true, onlyDirectories: true });
  const stats: { name: string; sizes: object }[] = [];

  await Promise.all(
    packages.map(async packagePath => {
      const packageName = path.basename(packagePath);

      stats.push({
        name: packageName,
        sizes: {
          esm: await getTotalSize('./esm/**/*.js', packagePath),
          lib: await getTotalSize('./lib/**/*.js', packagePath),
        },
      });
    }),
  );

  // Sort so its deterministic
  stats.sort((a, b) => a.name.localeCompare(b.name));

  // Convert to an object
  const sizes = stats.reduce(
    (obj, stat) => ({
      ...obj,
      [stat.name]: stat.sizes,
    }),
    {},
  );

  fs.writeFileSync('./packages/sizes.json', JSON.stringify(sizes), 'utf8');
}

(async () => {
  await computeBuildSizes();
})();
