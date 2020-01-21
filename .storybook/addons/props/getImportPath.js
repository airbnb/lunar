export default function getImportPath(filePath, baseName) {
  const indexParts = filePath.match(/^packages\/([\w-]+)\/src\/index\.tsx?#(\w+)$/i);

  if (indexParts) {
    const [, packageName, compName] = indexParts;

    return `import ${compName} from '@airbnb/${packageName}';`;
  }

  const parts = filePath.match(/^packages\/([\w-]+)\/src\/components\/(\w+)(\/\w+)?\.tsx#(\w+)$/i);

  if (!parts) {
    return null;
  }

  const [, pkgName, compName, baseChildName] = parts;
  const packageName = pkgName === 'core' ? 'lunar' : `lunar-${pkgName}`;
  const childName = baseChildName ? baseChildName.slice(1) : null;

  // Composer
  if (packageName === 'lunar-composer') {
    if (compName === 'Composer') {
      return `import ${compName} from '@airbnb/${packageName}'`;
    }

    return `import { ${compName || childName} } from '@airbnb/${packageName}'`;
  }

  // Forms
  if (compName === 'Form') {
    return `import ${compName} from '@airbnb/${packageName}'`;
  }

  if (!childName || childName === 'index') {
    return `import ${compName} from '@airbnb/${packageName}/lib/components/${compName}'`;
  }

  return `import { ${childName} } from '@airbnb/${packageName}/lib/components/${compName}'`;
}
