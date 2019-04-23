export default function getImportPath(filePath, baseName) {
  const indexParts = filePath.match(/^packages\/([\w-]+)\/src\/index\.tsx#(\w+)$/i);

  if (indexParts) {
    const [, packageName, compName] = indexParts;

    return `import ${compName} from '@airbnb/${packageName}';`;
  }

  const parts = filePath.match(/^packages\/([\w-]+)\/src\/components\/(\w+)\/(\w+)\.tsx#(\w+)$/i);

  if (!parts) {
    return null;
  }

  const [, pkgName, compName, childName] = parts;
  const packageName = pkgName === 'core' ? 'lunar' : `lunar-${pkgName}`;

  if (childName === 'index') {
    // Special handling
    if (compName === 'Form') {
      return `import Form from '@airbnb/${packageName}';`;
    }

    return `import ${compName} from '@airbnb/${packageName}/lib/components/${compName}';`;
  }

  // Special handling
  if (packageName === 'lunar-forms') {
    return `import { ${childName} } from '@airbnb/${packageName}';`;
  }

  return `import { ${childName} } from '@airbnb/${packageName}/lib/components/${compName}';`;
}
