import { API, FileInfo, JSCodeshift, Options } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

export class Codemod {
  api: API;

  cs: JSCodeshift;

  source: Collection<any>;

  constructor(fileInfo: FileInfo, api: API) {
    this.cs = api.jscodeshift;
    this.source = this.cs(fileInfo.source);
  }

  createNode<T>(cb: (cs: JSCodeshift) => T): T {
    return cb(this.cs);
  }

  findImports() {
    return this.source.find(this.cs.ImportDeclaration);
  }

  getComponentNameFromDefaultImport(importPath: string | RegExp): string | null {
    let name = '';

    this.findImports()
      .filter(({ node }) => !!String(node.source.value).match(importPath))
      .forEach(({ node }) => {
        node.specifiers.forEach(spec => {
          if (spec.type === 'ImportDefaultSpecifier') {
            name = spec.local.name;
          }
        });
      });

    return name || null;
  }

  getComponentNameFromNamedImports(importPath: string | RegExp, namesToFind: string[]): string[] {
    const names = [];

    this.findImports()
      .filter(({ node }) => !!String(node.source.value).match(importPath))
      .forEach(({ node }) => {
        node.specifiers.forEach(spec => {
          if (spec.type === 'ImportSpecifier' && namesToFind.includes(spec.imported.name)) {
            names.push(spec.local.name);
          }
        });
      });

    return names;
  }

  toSource(options: Options) {
    return this.source.toSource({
      tabWidth: 2,
      quote: 'single',
      trailingComma: true,
      ...options,
    });
  }
}
