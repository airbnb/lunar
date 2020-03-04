import {
  API,
  FileInfo,
  JSCodeshift,
  Options,
  FunctionDeclaration,
  ClassDeclaration,
} from 'jscodeshift';
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

  findReactComponent(): undefined | ClassDeclaration | FunctionDeclaration {
    let decl;

    // class Foo extends React.Component {}
    this.source
      .find(this.cs.ClassDeclaration, { superClass: { object: { name: 'React' } } })
      .forEach(({ node }) => {
        if (!decl) {
          decl = node;
        }
      });

    if (decl) {
      return decl;
    }

    const handleFunctionComponent = (func: FunctionDeclaration) => {
      if (
        !decl &&
        func.type === 'FunctionDeclaration' &&
        func.id.type === 'Identifier' &&
        func.id.name &&
        func.id.name.match(/^[A-Z]/)
      ) {
        decl = func;
      }
    };

    // export default function Foo() {}
    this.source
      .find(this.cs.ExportDefaultDeclaration, {
        declaration: { type: 'FunctionDeclaration' },
      })
      .forEach(({ node: { declaration } }) => {
        handleFunctionComponent(declaration as FunctionDeclaration);
      });

    if (decl) {
      return decl;
    }

    // function Foo() {}
    this.source.find(this.cs.FunctionDeclaration).forEach(({ node }) => {
      handleFunctionComponent(node);
    });

    return decl;
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
