import addons, { makeDecorator } from '@storybook/addons';
import kebabCase from 'lodash/kebabCase';
import stripHOCs from '../../helpers/stripHOCs';

export const withProps = makeDecorator({
  name: 'withProps',
  parameterName: 'props',
  wrapper: (getStory, context) => {
    const components = {};

    context.parameters.inspectComponents.forEach(component => {
      components[stripHOCs(component.displayName || component.name)] = component;
    });

    // We need to cast globals to JSON, otherwise the data is lost
    addons.getChannel().emit('SET_PROPS_DATA', {
      components,
      componentChangelogs: JSON.stringify(COMPONENT_CHANGELOGS),
      componentMetadata: JSON.stringify(STORYBOOK_REACT_CLASSES),
      section: kebabCase(context.kind.split('/')[0]),
      storyPath: context.parameters.fileName,
    });

    return getStory(context);
  },
});
