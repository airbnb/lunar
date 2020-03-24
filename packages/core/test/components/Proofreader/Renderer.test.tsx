import React from 'react';
import { render } from 'rut-dom';
import Renderer, { RendererProps } from '../../../src/components/Proofreader/Renderer';
import { ProofreadRuleMatch } from '../../../src/components/Proofreader/types';
import Mark from '../../../src/components/Proofreader/Mark';

describe('<Renderer />', () => {
  const props: RendererProps = {
    errors: [],
    value: 'This is a really long input string.',
    onSelectError() {},
  };

  const error: ProofreadRuleMatch = {
    found: 'really long',
    length: 11,
    message: 'Invalid',
    offset: 10,
    replacements: [],
    rule_id: 'TEST',
  };

  const debugOptions = {
    log: false,
    reactElements: false,
  };

  it('renders full string if no errors', () => {
    const { root } = render<RendererProps>(<Renderer {...props} />);

    expect(root.findAt('div', 'first').debug(debugOptions)).toMatchSnapshot();
  });

  it('wraps errors with marks', () => {
    const { root } = render<RendererProps>(
      <Renderer
        {...props}
        errors={[
          error,
          {
            found: 'string',
            length: 6,
            message: 'Invalid',
            offset: 28,
            replacements: [],
            rule_id: 'WORD',
          },
        ]}
      />,
    );

    expect(root.findAt('div', 'first').debug(debugOptions)).toMatchSnapshot();
  });

  it('can mark as secondary', () => {
    const { root } = render<RendererProps>(
      <Renderer {...props} errors={[error]} isRuleSecondary={(rule) => rule.rule_id === 'TEST'} />,
    );

    expect(root.findOne(Mark)).toHaveProp('secondary', true);
  });

  it('can mark as highlighted', () => {
    const { root } = render<RendererProps>(
      <Renderer
        {...props}
        errors={[error]}
        isRuleHighlighted={(rule) => rule.rule_id === 'TEST'}
      />,
    );

    expect(root.findOne(Mark)).toHaveProp('highlighted', true);
  });

  it('marks as selected if errors match', () => {
    const { root } = render<RendererProps>(
      <Renderer {...props} errors={[error]} selectedError={error} />,
    );

    expect(root.findOne(Mark)).toHaveProp('selected', true);
  });

  it('calls `onSelectError` when a mark is clicked', () => {
    const spy = jest.fn();
    const { root } = render<RendererProps>(
      <Renderer {...props} errors={[error]} onSelectError={spy} />,
      {
        mockRef: () => ({ offsetTop: 5, offsetRight: 10, offsetLeft: 15, offsetHeight: 100 }),
      },
    );

    root.findOne('button').dispatch('onClick');

    expect(spy).toHaveBeenCalledWith(error, 105, 15);
  });
});
