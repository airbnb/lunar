import React from 'react';
import IconCaretLeft from '@airbnb/lunar-icons/lib/interface/IconCaretLeft';
import IconCaretRight from '@airbnb/lunar-icons/lib/interface/IconCaretRight';
import iconComponent from '../../prop-types/iconComponent';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink from '../private/ButtonOrLink';
import Text from '../Text';
import DirectionalIcon from '../DirectionalIcon';

export type Props = {
  /** Content within the menu item. */
  children: NonNullable<React.ReactNode>;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the item as highlighted. */
  highlighted?: boolean;
  /** Render an anchor link with a URL instead of a button. */
  href?: string;
  /** An icon to display before the item. */
  icon?: React.ReactNode;
  /** Pass an HTML element attribute id. */
  id?: string;
  /** Click handler. */
  onClick?: () => void;
  /** Opens links in a new window. */
  openInNewWindow?: boolean;
  /** Accessibility role. */
  role?: string;
  /** Increase padding. */
  spacious?: boolean;
  /** A sub-menu to display on hover. */
  submenu?: React.ReactNode;
  /** Tab index for the current menu. */
  tabIndex?: number;
  /** Tip to display after the item. */
  tip?: React.ReactNode;
  /** A tracking name to identify this component. */
  trackingName?: string;
};

/** An interactive item within a menu. */
export class MenuItem extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    icon: iconComponent,
  };

  static defaultProps = {
    disabled: false,
    highlighted: false,
    href: '',
    icon: null,
    openInNewWindow: false,
    role: 'menuitem',
    spacious: false,
    submenu: null,
    tabIndex: -1,
    tip: null,
  };

  state = {
    showSubmenu: false,
  };

  private handleMouseEnter = () => {
    if (this.props.submenu) {
      this.setState({
        showSubmenu: true,
      });
    }
  };

  private handleMouseLeave = () => {
    if (this.props.submenu) {
      this.setState({
        showSubmenu: false,
      });
    }
  };

  render() {
    const {
      cx,
      children,
      disabled,
      highlighted,
      href,
      icon,
      id,
      onClick,
      openInNewWindow,
      role,
      spacious,
      styles,
      submenu,
      tabIndex,
      tip,
      trackingName,
    } = this.props;
    const { showSubmenu } = this.state;
    const after = submenu ? (
      <DirectionalIcon
        decorative
        direction="right"
        left={IconCaretLeft}
        right={IconCaretRight}
        size="1.5em"
      />
    ) : (
      tip
    );

    return (
      <li role="none" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <ButtonOrLink
          afterIcon={
            after ? (
              <Text muted small>
                {after}
              </Text>
            ) : null
          }
          className={cx(
            styles.item,
            (showSubmenu || highlighted) && styles.item_highlighted,
            disabled && styles.item_disabled,
            spacious && styles.item_spacious,
          )}
          disabled={disabled}
          href={href}
          trackingName={trackingName}
          id={id}
          beforeIcon={icon}
          openInNewWindow={openInNewWindow}
          role={role}
          tabIndex={tabIndex}
          aria-haspopup={!!submenu}
          aria-expanded={showSubmenu}
          onClick={onClick}
        >
          {children}
        </ButtonOrLink>

        {showSubmenu && <div className={cx(styles.submenu)}>{submenu}</div>}
      </li>
    );
  }
}

export default withStyles(({ color, font, pattern, unit, transition }) => ({
  item: {
    ...transition.box,
    ...font.textRegular,
    width: '100%',
    padding: `${unit}px ${1.5 * unit}px`,
    border: 0,
    textAlign: 'left',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    outlineOffset: '-3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: color.accent.text,

    ':hover': {
      backgroundColor: color.accent.bgHover,
      color: color.core.neutral[6],
    },

    '@selectors': {
      // Fix content
      '> span': {
        flexGrow: 1,
      },

      // Fix icons
      '> div': {
        flexGrow: 0,
        margin: 0,

        ':first-child': { marginRight: unit },
        ':last-child': { marginLeft: unit },
      },
    },
  },

  item_spacious: {
    padding: unit * 2,
  },

  item_disabled: {
    ...pattern.disabled,
  },

  item_highlighted: {
    backgroundColor: color.accent.bgHover,
  },

  submenu: {
    position: 'absolute',
    top: -1,
    left: '99%',
  },
}))(MenuItem);
