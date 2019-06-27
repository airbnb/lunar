import addons, { makeDecorator } from '@storybook/addons';
import reactElementToJsxString from 'react-element-to-jsx-string';
import stripHOCs from '../../helpers/stripHOCs';

export const withStory = makeDecorator({
  name: 'withStory',
  parameterName: 'story',
  wrapper: (getStory, context) => {
    addons.getChannel().emit('SET_STORY_DATA', {
      storySource: reactElementToJsxString(getStory(context), {
        displayName: element =>
          typeof element.type === 'string'
            ? element.type
            : stripHOCs(element.type.displayName || element.type.name),
        functionValue: () => '(func)',
        showDefaultProps: false,
        sortProps: false,
      }).replace(/\t/g, '  '),
    });

    return getStory(context);
  },
});
