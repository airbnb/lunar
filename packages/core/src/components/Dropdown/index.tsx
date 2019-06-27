import React from 'react';
import PropTypes from 'prop-types';
import { mutuallyExclusiveProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

const PositionShape = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.string.isRequired,
]);

const leftRightProp = mutuallyExclusiveProps(PositionShape, 'left', 'right');
const topBottomProp = mutuallyExclusiveProps(PositionShape, 'top', 'bottom');

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
  /** Callback fired when a click occurs outside the dropdown when `visible`. */
  onClickOutside?: (event: MouseEvent) => void;
  /** Callback fired when dropdown is focused. */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** Right offset. */
  right?: number | string;
  /** Top offset. */
  top?: number | string;
  /** When the dropdown is visible, adds event listening for clicks outside of the dropdown. */
  visible?: boolean;
  /** Z-index of the dropdown. */
  zIndex?: number | 'auto';
};

/** An abstract component for displaing menus and overlays over content. */
class Dropdown extends React.PureComponent<Props & WithStylesProps> {
  static propTypes = {
    bottom: topBottomProp,
    left: leftRightProp,
    right: leftRightProp,
    top: topBottomProp,
  };

  static defaultProps = {
    fixed: false,
    visible: false,
  };

  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.props.visible) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        document.addEventListener('click', this.handleClickOutside, true);
      } else {
        document.removeEventListener('click', this.handleClickOutside, true);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  private handleClickOutside = (event: MouseEvent) => {
    const { current } = this.ref;

    if (current && current.contains(event.target as any)) {
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
      zIndex,
      visible,
      onClickOutside,
      ...props
    } = this.props;
    const style: React.CSSProperties = {
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
      <div ref={this.ref} className={cx(style as any)} onBlur={onBlur} onFocus={onFocus}>
        {children}
      </div>
    );
  }
}

export default withStyles(() => ({}))(Dropdown);
