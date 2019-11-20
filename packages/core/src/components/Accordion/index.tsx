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
  enableMultiple?: boolean;
};

/** A controller for multiple accordion items. */
export default function Accordion({ bordered, children, defaultIndex = 0, enableMultiple }: Props) {
  const [id] = useState(uuid());
  const [styles, cx] = useStyles(styleSheet);
  const [active, setActive] = useState(
    new Set<number>([defaultIndex]),
  );

  useEffect(() => {
    setActive(new Set([defaultIndex]));
  }, [defaultIndex]);

  const handleClick = (index: number) => {
    if (enableMultiple) {
      if (active.has(index)) {
        active.delete(index);
      } else {
        active.add(index);
      }

      setActive(new Set(active));
    } else {
      setActive(new Set([active.has(index) ? -1 : index]));
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
          expanded: active.has(i),
          id: `${id}-${i}`,
          index: i,
          onClick: handleClick,
        });
      })}
    </div>
  );
}
