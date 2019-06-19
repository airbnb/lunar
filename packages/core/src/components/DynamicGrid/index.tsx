import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

type State = {
  items: number;
};

export type GridProps = {
  /** List of width/item pairs, describes how many items to display for windows of at least that width. */
  breakpoints?: { [key: number]: number };
  /** Items per row for screens smaller than the smallest breakpoint. */
  defaultItems?: number;
  /** Removes padding between items. */
  noPadding?: boolean;
};

type Props = GridProps & WithStylesProps;

class DynamicGrid extends React.PureComponent<Props, State> {
  public static defaultProps = {
    breakpoints: {},
    defaultItems: 1,
    noPadding: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      items: this.getItems(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Find the largest breakpoint smaller than the current width
  private getItems(): any {
    const { breakpoints, defaultItems } = this.props;
    const width = window.innerWidth;

    const max = Object.keys(breakpoints!).reduce((acc, breakpoint) => {
      const b = parseInt(breakpoint, 10);

      return b < width && b > acc ? b : acc;
    }, -1);

    return max > -1 ? breakpoints![max] : defaultItems;
  }

  private handleResize = () => {
    this.setState({
      items: this.getItems(),
    });
  };

  public render() {
    const { children, cx, noPadding, styles } = this.props;
    const { items } = this.state;

    const itemStyle = {
      width: `${100 / items}%`,
    };

    const childElements =
      children &&
      React.Children.map(children, (child: React.ReactNode, idx: number) => (
        // These items are generic and don't have a guaranteed id or any unique property
        // eslint-disable-next-line react/no-array-index-key
        <div className={cx(!noPadding && styles.item_padded)} style={itemStyle} key={idx}>
          {child}
        </div>
      ));

    return (
      <div className={cx(styles.container, !noPadding && styles.container_padded)}>
        {childElements}
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container_padded: {
    marginRight: -2 * unit,
  },
  item_padded: {
    paddingRight: 2 * unit,
    paddingBottom: 2 * unit,
  },
}))(DynamicGrid);
