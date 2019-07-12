import React from 'react';
import uuid from 'uuid/v4';
import childrenWithComponentName from '../../prop-types/childrenWithComponentName';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Item, { Props as AccordionItemProps } from './Item';

export { Item };

export type Props = {
  /** Apply a border. */
  bordered?: boolean;
  /** Accordion items and their content. */
  children: NonNullable<React.ReactNode>;
  /** Index of accordion expanded by default. Provide `-1` to collapse all initially. */
  defaultIndex?: number;
};

export type State = {
  id: string;
  index: number;
};

/** A controller for multiple accordion items. */
export class Accordion extends React.Component<Props & WithStylesProps, State> {
  static propTypes = {
    children: childrenWithComponentName('AccordionItem').isRequired,
  };

  static defaultProps = {
    bordered: false,
    defaultIndex: 0,
  };

  state = {
    id: uuid(),
    index: this.props.defaultIndex || 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.defaultIndex !== prevProps.defaultIndex) {
      this.setState({
        index: this.props.defaultIndex!,
      });
    }
  }

  private handleClick = (index: number) => {
    this.setState(prevState => ({
      index: index === prevState.index ? -1 : index,
    }));
  };

  render() {
    const { cx, bordered, children, styles } = this.props;
    const { id, index } = this.state;

    return (
      <div className={cx(styles.container, bordered && styles.container_bordered)} role="tablist">
        {React.Children.map(children, (child, i) => {
          if (!child) {
            return null;
          }

          return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
            bordered,
            expanded: i === index,
            id: `${id}-${i}`,
            index: i,
            onClick: this.handleClick,
          });
        })}
      </div>
    );
  }
}

export default withStyles(({ color }) => ({
  container: {
    background: color.accent.bg,
    borderBottom: '1px solid transparent',
    borderTop: '1px solid transparent',

    ':empty': {
      display: 'none',
    },
  },

  container_bordered: {
    borderBottomColor: color.accent.border,
  },
}))(Accordion);
