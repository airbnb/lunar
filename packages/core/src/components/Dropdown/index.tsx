import React from 'react';
import { Block } from 'aesthetic';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Bottom offset. */
  bottom?: number | string;
  /** Content within the dropdown. */
  children: NonNullable<React.ReactNode>;
  /** Position the dropdown absolutely (default) or fixed. */
  fixed?: boolean;
  /** Left offset. */
  left?: number | string;
  /** Callback fired when dropdown is unfocused. */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** Callback fired when a click occurs inside the dropdown when `visible`. */
  onClickInside?: (event: MouseEvent) => void;
  /** Callback fired when a click occurs outside the dropdown when `visible`. */
  onClickOutside?: (event: MouseEvent) => void;
  /** Callback fired when dropdown is focused. */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** Right offset. */
  right?: number | string;
  /** Tab index for focus management. */
  tabIndex?: number;
  /** Top offset. */
  top?: number | string;
  /** When the dropdown is visible, adds event listening for clicks outside of the dropdown. */
  visible?: boolean;
  /** Z-index of the dropdown. */
  zIndex?: number | 'auto';
};

/** An abstract component for displaing menus and overlays over content. */
class Dropdown extends React.PureComponent<Props & WithStylesProps> {
  static defaultProps = {
    fixed: false,
    visible: false,
  };

  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.props.visible) {
      document.addEventListener('click', this.handleClick, true);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        document.addEventListener('click', this.handleClick, true);
      } else {
        document.removeEventListener('click', this.handleClick, true);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  private handleClick = (event: MouseEvent) => {
    const { current } = this.ref;

    if (current && current.contains(event.target as Element)) {
      if (this.props.onClickInside) {
        this.props.onClickInside(event);
      }

      return;
    }

    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };

  render() {
    const {
      cx,
      children,
      fixed,
      onBlur,
      onFocus,
      tabIndex,
      zIndex,
      visible,
      onClickOutside,
      ...props
    } = this.props;
    const style: Block = {
      position: fixed ? 'fixed' : 'absolute',
      zIndex: zIndex || 'auto',
      ...props,
    };

    // Set top by default if neither are defined
    if (!('bottom' in props) && !('top' in props)) {
      style.top = '100%';
    }

    // Set left by default if neither are defined
    if (!('left' in props) && !('right' in props)) {
      style.left = 0;
    }

    return (
      <div
        ref={this.ref}
        className={cx(style)}
        tabIndex={tabIndex}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {children}
      </div>
    );
  }
}

export default withStyles(() => ({}))(Dropdown);
