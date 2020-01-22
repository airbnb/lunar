// REVIEWERS: airbnb/a11y-web

import focusElement from '../../../src/utils/focus/focusElement';

describe('focusElement', () => {
  it('silently returns undefined if not passed an argument', () => {
    expect(focusElement()).toBeUndefined();
  });

  it('focuses on the given DOM node', () => {
    const element = document.createElement('div');
    const focusSpy = jest.spyOn(element, 'focus');
    focusElement(element);
    expect(focusSpy).toHaveBeenCalled();
  });

  it('returns the given DOM node', () => {
    const element = document.createElement('div');
    expect(focusElement(element)).toEqual(element);
  });

  describe('handling the tabindex', () => {
    it('sets tabindex as negative to allow focus when the element type is not focusable', () => {
      const element = document.createElement('div');
      document.body.append(element);
      expect(element).toHaveProperty('tabIndex', -1);
      focusElement(element);
      expect(element).toHaveProperty('tabIndex', -1);
    });

    it('does not change the tabindex when the node already has one', () => {
      const initialTabIndex = '1';
      const element = document.createElement('div');
      document.body.append(element);

      element.setAttribute('tabIndex', initialTabIndex);
      expect(element).toHaveProperty('tabIndex', parseInt(initialTabIndex, 10));
      expect(element.getAttribute('tabindex')).toEqual(initialTabIndex);

      focusElement(element);

      expect(element).toHaveProperty('tabIndex', parseInt(initialTabIndex, 10));
      expect(element.getAttribute('tabindex')).toEqual(String(initialTabIndex));
    });

    it('does not change the default tabindex when the element type is focusable', () => {
      const element = document.createElement('input');
      element.setAttribute('type', 'text');
      element.setAttribute('tabIndex', '0');
      document.body.append(element);
      expect(element).toHaveProperty('tabIndex', 0);

      focusElement(element);

      expect(element).toHaveProperty('tabIndex', 0);
    });

    it('does not change the default tabindex when given an <a> tag with an href', () => {
      const element = document.createElement('a');
      element.setAttribute('href', '#');
      element.setAttribute('tabIndex', '0');
      document.body.append(element);
      expect(element).toHaveProperty('tabIndex', 0);

      focusElement(element);

      expect(element).toHaveProperty('tabIndex', 0);
    });

    it('sets the tabindex as negative to allow focus when given an <a> tag without an href', () => {
      const element = document.createElement('a');
      document.body.append(element);
      expect(element).toHaveProperty('tabIndex', 0);

      focusElement(element);

      expect(element).toHaveProperty('tabIndex', -1);
    });
  });
});
