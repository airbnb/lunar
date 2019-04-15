import addons, { makeDecorator } from '@storybook/addons';

export const withProps = makeDecorator({
  name: 'withProps',
  parameterName: 'props',
  wrapper: (getStory, context, d) => {
    addons.getChannel().emit('SET_PROPS_DATA', {
      components: context.parameters.inspectComponents || [],
      propTables: global.STORYBOOK_REACT_CLASSES,
    });

    return getStory(context);
  },
});
