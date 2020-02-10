import React from 'react';
import useStyles from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';
import { ProfilePhotoProps } from '../ProfilePhoto';
import { styleSheet } from './styles';

export type ProfilePhotoGroupProps = {
  /** List of `ProfilePhoto` components to group. */
  children: NonNullable<React.ReactNode>;
  /** Max number of photos to display before truncating. */
  max?: number;
  /** Size in units to multiply by. */
  size?: number;
};

/** Horizontally align `ProfilePhoto`s in a stacked fashion. */
export default function ProfilePhotoGroup({ children, max = 3, size = 5 }: ProfilePhotoGroupProps) {
  const [styles, cx] = useStyles(styleSheet);
  const { unit } = useTheme();

  const margin = { marginLeft: -(size * (unit / 2.5)) };
  let photos = React.Children.toArray(children).filter(child => !!child);
  let remainder = 0;

  if (max && photos.length > max) {
    remainder = photos.length - max;
    photos = photos.slice(0, max);
  }

  return (
    <div className={cx(styles.group)}>
      {/* eslint-disable react/no-array-index-key */}
      {photos.map((photo, i) => (
        <div key={i} className={cx(styles.cell, margin)}>
          {React.cloneElement(photo as React.ReactElement<ProfilePhotoProps>, {
            size,
            inline: false,
            square: false,
          })}
        </div>
      ))}

      {remainder > 0 && (
        <div key="remainder" className={cx(styles.cell, margin)}>
          <div
            className={cx(styles.remainder, {
              height: size * unit,
              maxHeight: size * unit,
              maxWidth: size * unit,
              width: size * unit,
            })}
          >
            <span className={cx(styles.remainderNumber)}>{`+${remainder}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
