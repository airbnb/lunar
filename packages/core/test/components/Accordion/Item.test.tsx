import React from 'react';
import { shallow } from 'enzyme';
import { render } from 'rut-dom';
import AccordionItem, { AccordionItemProps } from '../../../src/components/Accordion/Item';
import ExpandableIcon from '../../../src/components/ExpandableIcon';

describe('<AccordionItem />', () => {
  it('renders a button', () => {
    const wrapper = shallow(<AccordionItem id=".0" index={0} title="Title" onClick={() => {}} />);

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders a section', () => {
    const wrapper = shallow(<AccordionItem id=".0" index={0} title="Title" onClick={() => {}} />);

    expect(wrapper.find('section')).toHaveLength(1);
  });

  it('renders the title as a string', () => {
    const wrapper = shallow(
      <AccordionItem id=".0" index={0} title="unique string" onClick={() => {}} />,
    );

    expect(wrapper.find('button').html()).toMatch('unique string');
  });

  it('renders the title as a component', () => {
    function CustomTitleComponent() {
      return null;
    }

    const wrapper = shallow(
      <AccordionItem id=".0" index={0} title={<CustomTitleComponent />} onClick={() => {}} />,
    );

    expect(wrapper.find(CustomTitleComponent)).toHaveLength(1);
  });

  it('renders children', () => {
    const child = <div>Foo</div>;

    const wrapper = shallow(
      <AccordionItem id=".0" index={0} title="Title" onClick={() => {}}>
        {child}
      </AccordionItem>,
    );

    expect(wrapper.contains(child)).toBe(true);
  });

  it('renders bordered', () => {
    const wrapper = shallow(
      <AccordionItem bordered id=".0" index={0} title="Title" onClick={() => {}} />,
    );

    expect(wrapper.prop('className')).toMatch('item_bordered');
  });

  it('renders expanded', () => {
    const wrapper = shallow(
      <AccordionItem expanded id=".0" index={0} title="Title" onClick={() => {}} />,
    );

    expect(wrapper.find('section').prop('className')).toMatch('body_expanded');
    expect(wrapper.find(ExpandableIcon).prop('expanded')).toBe(true);
  });

  it('renders without spacing', () => {
    const wrapper = shallow(
      <AccordionItem noSpacing id=".0" index={0} title="Title" onClick={() => {}} />,
    );

    expect(wrapper.find('button').prop('className')).toMatch('title_noSpacing');
    expect(wrapper.find('section').prop('className')).toMatch('body_noSpacing');
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<AccordionItem id=".0" index={1} title="Title" onClick={spy} />);

    wrapper.find('button').at(0).simulate('click');

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('triggers `onToggle` when opening and closing', () => {
    const spy = jest.fn();
    const wrapper = render<AccordionItemProps>(
      <AccordionItem id=".0" index={1} title="Title" onToggle={spy} />,
    );

    expect(spy).not.toHaveBeenCalled();

    wrapper.update({
      expanded: true,
    });

    expect(spy).toHaveBeenCalledWith(true);

    wrapper.update({
      expanded: false,
    });

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('doesnt fire `onToggle` effect when other props change', () => {
    const spy = jest.fn();
    const wrapper = render<AccordionItemProps>(
      <AccordionItem id=".0" index={1} title="Title" onToggle={spy} />,
    );

    wrapper.update({ bordered: true });

    expect(spy).toHaveBeenCalledTimes(0);

    wrapper.update({ id: 'foo' });

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
