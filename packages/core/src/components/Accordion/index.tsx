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
  const [styles, cx] = useStyles(styleSheet);
  const [id] = useState(uuid());
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [openIndexes, setOpenIndexes] = useState(new Set<number>());

  useEffect(() => {
    if (enableMultiple) {
      if (openIndexes.has(defaultIndex)) {
        openIndexes.delete(defaultIndex);
      } else {
        openIndexes.add(defaultIndex);
      }

      setOpenIndexes(new Set(openIndexes));
    } else {
      setActiveIndex(defaultIndex);
    }
  }, [defaultIndex, enableMultiple]);

  const handleClick = (index: number) => {
    if (enableMultiple) {
      if (openIndexes.has(index)) {
        openIndexes.delete(index);
      } else {
        openIndexes.add(index);
      }

      setOpenIndexes(new Set(openIndexes));
    } else {
      // close the active one if its been clicked again
      setActiveIndex(activeIndex === index ? -1 : index);
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
          expanded: enableMultiple ? openIndexes.has(i) : activeIndex === i,
          id: `${id}-${i}`,
          index: i,
          onClick: handleClick,
        });
      })}
    </div>
  );
}
