import addons, { makeDecorator } from '@storybook/addons';

function stripHOCs(fullName) {
  if (typeof fullName !== 'string') {
    return fullName;
  }

  let innerName = fullName;

  while (/\([^()]*\)/g.test(innerName)) {
    let HOC = innerName;
    let previousHOC;

    do {
      previousHOC = HOC;
      HOC = previousHOC.replace(/\([^()]*\)/g, '');
    } while (previousHOC !== HOC);

    innerName = innerName.replace(RegExp(`^${HOC}\\(|\\)$`, 'g'), '');
  }

  return innerName;
}

export const withProps = makeDecorator({
  name: 'withProps',
  parameterName: 'props',
  wrapper: (getStory, context) => {
    const components = {};

    context.parameters.inspectComponents.forEach(component => {
      components[stripHOCs(component.displayName || component.name)] = component;
    });

    addons.getChannel().emit('SET_PROPS_DATA', {
      components,
      propTables: global.STORYBOOK_REACT_CLASSES,
    });

    return getStory(context);
  },
});
