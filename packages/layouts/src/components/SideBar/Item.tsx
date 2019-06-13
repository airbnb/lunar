import React from 'react';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import ButtonOrLink, { ButtonOrLinkTypes } from '@airbnb/lunar/lib/components/private/ButtonOrLink';
import iconComponent from '@airbnb/lunar/lib/prop-types/iconComponent';
import Text from '@airbnb/lunar/lib/components/Text';

export type Props = {
  /** Mark the item as active. */
  active?: boolean;
  /** Render as an anchor link with a URL. */
  href?: string;
  /** Icon to display above the label. */
  icon: NonNullable<React.ReactElement<any>>;
  /** Item label. */
  label?: React.ReactNode;
  /** Callback fired when the element is clicked. */
  onClick?: (event: React.MouseEvent<ButtonOrLinkTypes>) => void;
};

/** A clickable item within the sidebar navigation menu. */
export class SideBarItem extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    icon: iconComponent.isRequired,
  };

  static defaultProps = {
    active: false,
    label: null,
  };

  render() {
    const { cx, active, label, href, icon, onClick, styles } = this.props;

    return (
      <li role="none">
        <ButtonOrLink
          role="menuitem"
          href={href}
          onClick={onClick}
          className={cx(styles.item, active && styles.item_active)}
        >
          <span className={cx(styles.icon)}>{React.cloneElement(icon, { size: '2em' })}</span>

          {label && (
            <span className={cx(styles.label)}>
              <Text micro bold uppercased inverted>
                {label}
              </Text>
            </span>
          )}
        </ButtonOrLink>
      </li>
    );
  }
}

export default withStyles(({ unit, color, pattern, transition }) => ({
  item: {
    ...pattern.resetButton,
    ...transition.box,
    paddingTop: unit * 1.5,
    paddingBottom: unit * 1.5,
    border: 0,
    display: 'block',
    textAlign: 'center',
    width: '100%',
    color: color.accent.bg,
    background: color.core.neutral[5],

    ':hover': {
      color: color.accent.bgHover,
      background: color.core.neutral[6],
    },
  },

  item_active: {
    background: color.core.neutral[6],
  },

  icon: {
    display: 'block',

    '@selectors': {
      '> svg': {
        display: 'inline-block',
        margin: 'auto',
      },
    },
  },

  label: {
    display: 'block',
    paddingTop: unit * 0.25,
  },
}))(SideBarItem);
