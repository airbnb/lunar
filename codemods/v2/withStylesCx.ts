/* eslint-disable no-param-reassign, import/no-unresolved */

import {
  FileInfo,
  API,
  Options,
  Identifier,
  JSXOpeningElement,
  ObjectPattern,
  BlockStatement,
  ObjectProperty,
} from 'jscodeshift';

function hasCxProp(props: ObjectPattern['properties']): boolean {
  return props.some(
    prop =>
      prop.type === 'ObjectProperty' && prop.key.type === 'Identifier' && prop.key.name === 'cx',
  );
}

function injectCxInBlockStatement(
  body: BlockStatement,
  cxProp: ObjectProperty,
  propsName: string = 'props',
) {
  body.body.forEach(stmt => {
    if (stmt.type === 'VariableDeclaration' && stmt.declarations.length > 0) {
      stmt.declarations.forEach(decl => {
        if (
          decl.type === 'VariableDeclarator' &&
          decl.init &&
          ((decl.init.type === 'Identifier' && decl.init.name === propsName) ||
            (decl.init.type === 'MemberExpression' &&
              decl.init.object.type === 'ThisExpression' &&
              decl.init.property.type === 'Identifier' &&
              decl.init.property.name === propsName)) &&
          decl.id.type === 'ObjectPattern' &&
          !hasCxProp(decl.id.properties)
        ) {
          decl.id.properties.unshift(cxProp);
        }
      });
    }
  });
}

module.exports = function withStylesCx(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const cs = api.jscodeshift;
  const source = cs(fileInfo.source);
  let hocName = '';
  let compName = '';

  // Find the imported HOC name
  source
    .find(cs.ImportDeclaration)
    .filter(({ node }) => String(node.source.value).endsWith('withStyles'))
    .filter(({ node }) => {
      // Capture imported HOC name
      node.specifiers.forEach(spec => {
        if (spec.type === 'ImportDefaultSpecifier') {
          hocName = spec.local.name;
        }
      });

      // Remove `css` named import
      node.specifiers = node.specifiers.filter(
        spec => spec.local.type === 'Identifier' && spec.local.name !== 'css',
      );

      // Return all imports that are no longer being used
      return node.specifiers.length === 0;
    })
    .remove();

  // Find the component name from the HOC call site
  if (hocName) {
    source.find(cs.ExportDefaultDeclaration).forEach(({ node }) => {
      if (
        node.declaration.type === 'CallExpression' &&
        node.declaration.callee.type === 'CallExpression' &&
        node.declaration.callee.callee.type === 'Identifier' &&
        node.declaration.callee.callee.name === hocName &&
        node.declaration.arguments.length === 1 &&
        node.declaration.arguments[0].type === 'Identifier'
      ) {
        compName = (node.declaration.arguments[0] as Identifier).name;
      }
    });
  }

  // Inject `cx` prop into usage
  if (compName) {
    const cxProp = cs.objectProperty(cs.identifier('cx'), cs.identifier('cx'));
    cxProp.shorthand = true;

    // Function components
    source.find(cs.FunctionDeclaration, { id: { name: compName } }).forEach(({ node }) => {
      if (node.params.length === 0) {
        return;
      }

      const param = node.params[0];
      let propsName = '';

      // From argument
      if (param.type === 'ObjectPattern' && !hasCxProp(param.properties)) {
        param.properties.unshift(cxProp);
      } else if (param.type === 'Identifier') {
        propsName = param.name;
      }

      // Within body
      if (propsName) {
        injectCxInBlockStatement(node.body, cxProp, propsName);
      }
    });

    // Class components
    source.find(cs.ClassDeclaration, { id: { name: compName } }).forEach(({ node }) => {
      node.body.body.forEach(stmt => {
        if (
          stmt.type === 'ClassMethod' &&
          stmt.key.type === 'Identifier' &&
          stmt.key.name === 'render'
        ) {
          injectCxInBlockStatement(stmt.body, cxProp);
        }
      });
    });
  }

  // Replace `{...css()}` with `className={cx()}`
  source.find(cs.JSXSpreadAttribute).forEach(path => {
    const parent = path.parent.node as JSXOpeningElement;

    if (!parent || !parent.attributes || parent.attributes.length === 0) {
      return;
    }

    parent.attributes.forEach((attr, index) => {
      if (
        attr.type === 'JSXSpreadAttribute' &&
        attr.argument.type === 'CallExpression' &&
        attr.argument.callee.type === 'Identifier' &&
        attr.argument.callee.name === 'css'
      ) {
        parent.attributes[index] = cs.jsxAttribute(
          cs.jsxIdentifier('className'),
          cs.jsxExpressionContainer(
            cs.callExpression(cs.identifier('cx'), attr.argument.arguments),
          ),
        );
      }
    });
  });

  // Replace `css()` with `cx()`
  source.find(cs.CallExpression).forEach(({ node }) => {
    if (node.callee.type === 'Identifier' && node.callee.name === 'css') {
      node.callee.name = 'cx';
    }
  });

  return source.toSource({
    tabWidth: 2,
    quote: 'single',
    trailingComma: true,
    ...options,
  });
};
