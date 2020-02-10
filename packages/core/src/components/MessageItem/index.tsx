import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import removeFocusOnMouseUp from '../../utils/removeFocusOnMouseUp';
import ProfilePhoto from '../ProfilePhoto';
import Shimmer from '../Shimmer';
import Text from '../Text';
import Spacing from '../Spacing';
import T from '../Translate';
import { styleSheet } from './styles';

export type MessageItemProps = {
  /** Message body. */
  children: NonNullable<React.ReactNode>;
  /** Wraps title in a span to disables translation suggestions from Google Translate. */
  disableTitleTranslation?: boolean;
  /** Email display; displays that the message is from the provided email. */
  email?: React.ReactNode;
  /** Message timestamp display, e.g. "6:30 PM". */
  formattedTimestamp: string;
  /** Increase horizontal spacing. */
  horizontalSpacing?: boolean;
  /** Icon for profile photo. */
  icon?: React.ReactNode;
  /** Image URL for profile photo badge. */
  imageBadgeSrc?: string;
  /** Image description; displays on hover; defaults to `title`. */
  imageDescription?: string;
  /** Image URL. Required when using `icon`. */
  imageSrc?: string;
  /** Mark the message as important. */
  important?: boolean;
  /** Informational status (blue). */
  info?: boolean;
  /** Whether the message item is loading author data. */
  loadingAuthor?: boolean;
  /** When provided, enables the profile photo to be clicked with this callback. */
  onClickImage?: React.MouseEventHandler<HTMLButtonElement>;
  /** When provided, enables the message title to be clicked with this callback. */
  onClickTitle?: React.MouseEventHandler<HTMLButtonElement>;
  /** Whether the message item is in a sending state. */
  sending?: boolean;
  /** Text to describe the message's source, e.g. "web". */
  source?: string;
  /** Message title. */
  title: string;
  /** Text to describe the `onClickTitle`'s action; displays on hover; defaults to `title`. */
  titleClickDescription?: string;
  /** Tag to display alongside the title. */
  titleTag?: string;
  /** Increase vertical spacing. */
  verticalSpacing?: boolean;
  /** Mark the message as a warning. */
  warning?: boolean;
};

/** An individual comment within a message thread. */
function MessageItem({
  children,
  disableTitleTranslation,
  email,
  formattedTimestamp,
  horizontalSpacing,
  icon,
  imageBadgeSrc,
  imageDescription,
  imageSrc,
  important,
  info,
  loadingAuthor,
  onClickImage,
  onClickTitle,
  sending,
  source,
  title,
  titleClickDescription,
  titleTag,
  verticalSpacing,
  warning,
}: MessageItemProps) {
  const [styles, cx] = useStyles(styleSheet);

  const getAvatar = () => {
    if (loadingAuthor) {
      return <Shimmer width={32} height={32} radius="50%" />;
    }

    let profilePhoto = null;

    if (imageSrc) {
      profilePhoto = (
        <ProfilePhoto imageSrc={imageSrc} size={4} title={imageDescription || title} />
      );
    } else if (icon) {
      profilePhoto = (
        <Spacing left={2} top={0.5}>
          {icon}
        </Spacing>
      );
    }

    const avatar = imageBadgeSrc ? (
      <>
        {profilePhoto}

        <div className={cx(styles.profileBadge)}>
          <ProfilePhoto
            imageSrc={imageBadgeSrc}
            size={2}
            title={T.phrase('lunar.message.photoLabel', 'Profile photo badge')}
          />
        </div>
      </>
    ) : (
      profilePhoto
    );

    if (onClickImage) {
      return (
        <button
          className={cx(styles.resetButton)}
          type="button"
          title={imageDescription || title}
          onClick={onClickImage}
          onMouseUp={removeFocusOnMouseUp}
        >
          {avatar}
        </button>
      );
    }

    return avatar;
  };

  const getTitle = () => {
    if (loadingAuthor) {
      return <Shimmer width={150} height={14} />;
    }

    const formatedTitle = disableTitleTranslation ? (
      <span className="notranslate">{title}</span>
    ) : (
      title
    );

    if (onClickTitle) {
      return (
        <button
          className={cx(styles.resetButton)}
          type="button"
          title={titleClickDescription || title}
          onClick={onClickTitle}
          onMouseUp={removeFocusOnMouseUp}
        >
          <Text bold>{formatedTitle}</Text>
        </button>
      );
    }

    return <Text bold>{formatedTitle}</Text>;
  };

  const timestamp = source
    ? T.phrase('lunar.message.source', '%{time} via %{source}', {
        time: formattedTimestamp,
        source,
      })
    : formattedTimestamp;

  return (
    <div
      className={cx(
        styles.container,
        horizontalSpacing && styles.container_horizontalSpacing,
        verticalSpacing && styles.container_verticalSpacing,
        !!(important || info || warning) && styles.container_withStripe,
        important && styles.container_important,
        info && styles.container_info,
        warning && styles.container_warning,
      )}
    >
      <div className={cx(styles.grid)}>
        <div className={cx(styles.relative)}>{getAvatar()}</div>

        <div>
          <Spacing bottom={0.5}>
            <div className={cx(styles.title)}>
              <Spacing inline bottom={0.5} right={1}>
                {getTitle()}
              </Spacing>

              {titleTag && (
                <Spacing inline bottom={0.5} right={1}>
                  <div className={cx(styles.tag)}>
                    <Text micro muted>
                      {titleTag}
                    </Text>
                  </div>
                </Spacing>
              )}

              <Text small muted>
                {timestamp}
              </Text>
            </div>

            {email && (
              <Text small muted>
                <T html k="lunar.message.fromUser" phrase="From: %{email}" email={email} />
              </Text>
            )}
          </Spacing>

          <div className={cx(styles.wordBreak)}>{children}</div>
        </div>
      </div>

      {sending && <div className={cx(styles.sendingOverlay)} />}
    </div>
  );
}

// add color flags here
const stripeColorTypePropType = mutuallyExclusiveTrueProps('important', 'info', 'warning');

MessageItem.propTypes = {
  important: stripeColorTypePropType,
  info: stripeColorTypePropType,
  warning: stripeColorTypePropType,
};

export default MessageItem;
