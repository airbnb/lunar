import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import useStyles from '../../hooks/useStyles';
import Item, { Props as AccordionItemProps } from './Item';
import { styleSheet } from './styles';

export { Item };

export type Props = {
  /** Apply a border. */
  bordered?: boolean;
  /** Accordion items and their content. */
  children: NonNullable<React.ReactNode>;
  /** Index of accordion expanded by default. Provide `-1` to collapse all initially. */
  defaultIndex?: number;
  /** Enable multiple items to be open at once. */
  expandMultiple?: boolean;
};

/** A controller for multiple accordion items. */
export default function Accordion({ bordered, children, defaultIndex = 0, expandMultiple }: Props) {
  const [id] = useState(() => uuid());
  const [styles, cx] = useStyles(styleSheet);
  const [expanded, setExpanded] = useState(
    new Set<number>([defaultIndex]),
  );

  useEffect(() => {
    setExpanded(new Set([defaultIndex]));
  }, [defaultIndex]);

  const handleClick = (index: number) => {
    if (expandMultiple) {
      if (expanded.has(index)) {
        expanded.delete(index);
      } else {
        expanded.add(index);
      }

      setExpanded(new Set(expanded));
    } else {
      setExpanded(new Set([expanded.has(index) ? -1 : index]));
    }
  };

  return (
    <div className={cx(styles.container, bordered && styles.container_bordered)} role="tablist">
      {React.Children.map(children, (child, i) => {
        if (!child) {
          return null;
        }

        return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
          bordered,
          expanded: expanded.has(i),
          id: `${id}-${i}`,
          index: i,
          onClick: handleClick,
        });
      })}
    </div>
  );
}
