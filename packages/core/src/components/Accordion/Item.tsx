import React from 'react';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import IconChevronDown from '@airbnb/lunar-icons/lib/interface/IconChevronDown';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Apply a border. */
  bordered?: boolean;
  /** Content to render if the accordion item is expanded. */
  children?: React.ReactNode;
  /** Whether the accordion item is expanded or not. */
  expanded?: boolean;
  /** Unique id of the accordion item. */
  id: string;
  /** Index amongst a collection of accordion items. */
  index?: number;
  /** Title of the accordion item. */
  title?: string;
  /** Callback fired when the accordion item is clicked. */
  onClick?: (index: number) => void;
};

/**
 * A single accordion item. To be rendered amongst a collection of accordion items, within an accordion.
 */
export class AccordionItem extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    bordered: false,
    children: null,
    expanded: false,
  };

  private handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.index!);
    }
  };

  render() {
    const { cx, bordered, children, expanded, id, styles, theme, title } = this.props;

    return (
      <div className={cx(styles.item, bordered && styles.item_bordered)}>
        <button
          className={cx(styles.title)}
          aria-controls={`accordion-body-${id}`}
          aria-selected={expanded}
          id={`accordion-title-${id}`}
          onClick={this.handleClick}
          role="tab"
          tabIndex={0}
          type="button"
        >
          {title && <span className={cx(styles.titleText)}>{title}</span>}

          {expanded ? (
            <IconChevronDown decorative size={theme!.unit * 3} />
          ) : (
            <IconChevronRight decorative size={theme!.unit * 3} />
          )}
        </button>

        <section
          className={cx(styles.body, expanded && styles.body_expanded)}
          aria-hidden={!expanded}
          aria-labelledby={`accordion-title-${id}`}
          id={`accordion-body-${id}`}
          role="tabpanel"
        >
          {children}
        </section>
      </div>
    );
  }
}

export default withStyles(
  ({ color, pattern, ui, unit }) => ({
    body: {
      display: 'none',
      padding: `${unit}px ${unit * 2}px ${unit * 2}px`,
    },

    body_expanded: {
      display: 'block',
    },

    item: {
      background: color.accent.bg,
    },

    item_bordered: {
      borderTop: ui.border,
    },

    title: {
      ...pattern.resetButton,
      display: 'flex',
      alignItems: 'center',
      padding: unit * 2,
      textAlign: 'left',
      width: '100%',
    },

    titleText: {
      flex: '1',
    },
  }),
  {
    passThemeProp: true,
  },
)(AccordionItem);
