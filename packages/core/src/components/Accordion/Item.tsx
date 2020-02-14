import React, { useEffect, useState } from 'react';
import useStyles from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';
import ExpandableIcon from '../ExpandableIcon';
import { styleSheetItem as styleSheet } from './styles';

export type Props = {
  /** Apply a border. */
  bordered?: boolean;
  /** Content to render if the accordion item is expanded. */
  children?: React.ReactNode;
  /** @ignore Whether the accordion item is expanded or not. */
  expanded?: boolean;
  /** @ignore Unique id of the accordion item, passed in from parent. */
  id?: string;
  /** @ignore Index amongst a collection of accordion items. */
  index?: number;
  /** Removes horizontal padding from the item and top padding from the item body. */
  noSpacing?: boolean;
  /** Title of the accordion item. */
  title?: React.ReactNode;
  /** @ignore Callback fired when the accordion item is clicked. */
  onClick?: (index: number) => void;
  /** Callback fired when the item is expanded or collapsed. */
  onToggle?: (expanded: boolean) => void;
  /** Secondary accordion style. */
  secondary?: boolean;
};

/**
 * A single accordion item. To be rendered amongst a collection of accordion items, within an accordion.
 */
export default function AccordionItem({
  bordered,
  children,
  expanded,
  id,
  index,
  noSpacing,
  secondary,
  title,
  onClick,
  onToggle,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);
  const [prevExpanded, setExpanded] = useState(expanded);
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick(index!);
    }
  };

  useEffect(() => {
    if (expanded !== undefined && prevExpanded !== expanded && onToggle) {
      onToggle(expanded);
      setExpanded(expanded);
    }
  }, [prevExpanded, expanded, onToggle]);

  return (
    <div className={cx(bordered && styles.item_bordered, secondary && styles.item_secondary)}>
      <button
        className={cx(
          styles.title,
          noSpacing && styles.title_noSpacing,
          secondary && styles.title_secondary,
        )}
        aria-controls={`accordion-body-${id}`}
        aria-selected={expanded}
        id={`accordion-title-${id}`}
        role="tab"
        tabIndex={0}
        type="button"
        onClick={handleClick}
      >
        {title && <span className={cx(styles.titleText)}>{title}</span>}

        <ExpandableIcon expanded={!!expanded} size={theme.unit * 3} />
      </button>

      <section
        className={cx(
          styles.body,
          expanded && styles.body_expanded,
          noSpacing && styles.body_noSpacing,
          secondary && styles.body_secondary,
        )}
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
