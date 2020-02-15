import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheet, cleanClassName } from './styles';

export type SpacingRange =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 4.5
  | 5
  | 5.5
  | 6
  | 6.5
  | 7
  | 7.5
  | 8
  | 8.5
  | 9
  | 9.5
  | 10
  | 10.5
  | 11
  | 11.5
  | 12;

export type Props = {
  /** Apply spacing on all sides. */
  all?: SpacingRange;
  /** Apply spacing on the bottom. */
  bottom?: SpacingRange;
  /** Content to render. */
  children: NonNullable<React.ReactNode>;
  /** Apply spacing on the left and right. */
  horizontal?: SpacingRange;
  /** Render as inline block instead of block. */
  inline?: boolean;
  /** Use padding instead of margin. */
  inner?: boolean;
  /** Apply spacing on the left. */
  left?: SpacingRange;
  /** Apply spacing on the right. */
  right?: SpacingRange;
  /** Base element / component type. Can be a string representing a DOM element. */
  tag?: 'article' | 'div' | 'footer' | 'header' | 'section';
  /** Apply spacing on the top. */
  top?: SpacingRange;
  /** Apply spacing on the top and bottom. */
  vertical?: SpacingRange;
};

/** Common component for arbitray layout structure and spacing. */
export default function Spacing({
  all = 0,
  bottom = 0,
  children,
  horizontal = 0,
  inline,
  inner,
  left = 0,
  right = 0,
  tag: TagProp = 'div',
  top = 0,
  vertical = 0,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  const type = inner ? 'inner' : 'outer';
  const classes: (string | object)[] = [];

  if (all) {
    const cleaned = cleanClassName(all);
    classes.push(
      styles[`${type}Top_${cleaned}`],
      styles[`${type}Right_${cleaned}`],
      styles[`${type}Bottom_${cleaned}`],
      styles[`${type}Left_${cleaned}`],
    );
  } else {
    if (vertical) {
      const cleaned = cleanClassName(vertical);
      classes.push(styles[`${type}Top_${cleaned}`], styles[`${type}Bottom_${cleaned}`]);
    } else {
      if (top) {
        const cleaned = cleanClassName(top);
        classes.push(styles[`${type}Top_${cleaned}`]);
      }

      if (bottom) {
        const cleaned = cleanClassName(bottom);
        classes.push(styles[`${type}Bottom_${cleaned}`]);
      }
    }

    if (horizontal) {
      const cleaned = cleanClassName(horizontal);
      classes.push(styles[`${type}Left_${cleaned}`], styles[`${type}Right_${cleaned}`]);
    } else {
      if (left) {
        const cleaned = cleanClassName(left);
        classes.push(styles[`${type}Left_${cleaned}`]);
      }

      if (right) {
        const cleaned = cleanClassName(right);
        classes.push(styles[`${type}Right_${cleaned}`]);
      }
    }
  }

  return <TagProp className={cx(...classes, inline && styles.spacing_inline)}>{children}</TagProp>;
}
