import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import removeFocusOnMouseUp from '../../utils/removeFocusOnMouseUp';
import toRGBA from '../../utils/toRGBA';
import ProfilePhoto from '../ProfilePhoto';
import Shimmer from '../Shimmer';
import Text from '../Text';
import Spacing from '../Spacing';
import T from '../Translate';

// add color flags here
const stripeColorTypePropType = mutuallyExclusiveTrueProps('important', 'info', 'warning');

export type Props = {
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
export class MessageItem extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    important: stripeColorTypePropType,
    info: stripeColorTypePropType,
    warning: stripeColorTypePropType,
  };

  static defaultProps = {
    disableTitleTranslation: false,
    email: null,
    horizontalSpacing: false,
    imageBadgeSrc: '',
    imageDescription: '',
    important: false,
    info: false,
    loadingAuthor: false,
    sending: false,
    source: '',
    titleClickDescription: '',
    titleTag: '',
    verticalSpacing: false,
    warning: false,
  };

  getAvatar() {
    const {
      cx,
      icon,
      imageBadgeSrc,
      imageDescription,
      imageSrc,
      loadingAuthor,
      title,
      onClickImage,
      styles,
    } = this.props;

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
            title={T.phrase(
              'Profile photo badge',
              {},
              {
                context: 'Profile photo descriptive image text within a message bubble',
                key: 'lunar.message.photoLabel',
              },
            )}
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
  }

  getTitle() {
    const {
      cx,
      disableTitleTranslation,
      loadingAuthor,
      title,
      titleClickDescription,
      onClickTitle,
      styles,
    } = this.props;

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
  }

  render() {
    const {
      cx,
      children,
      email,
      formattedTimestamp,
      horizontalSpacing,
      important,
      info,
      sending,
      source,
      styles,
      titleTag,
      verticalSpacing,
      warning,
    } = this.props;

    const timestamp = source
      ? T.phrase(
          '%{time} via %{source}',
          { time: formattedTimestamp, source },
          { context: 'Timestamp and source within a message bubble', key: 'lunar.message.source' },
        )
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
          <div className={cx(styles.relative)}>{this.getAvatar()}</div>

          <div>
            <Spacing bottom={0.5}>
              <div className={cx(styles.title)}>
                <Spacing inline bottom={0.5} right={1}>
                  {this.getTitle()}
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
                  <T
                    html
                    k="lunar.message.fromUser"
                    phrase="From: %{email}"
                    email={email}
                    context="Who the message is from"
                  />
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
}

export default withStyles(({ color, font, ui, unit, pattern }) => ({
  relative: {
    position: 'relative',
  },

  container: {
    position: 'relative',
    border: '1px solid transparent',
    borderRadius: ui.borderRadius,
    margin: 0,
    padding: 0,
  },

  container_horizontalSpacing: {
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
  },

  container_verticalSpacing: {
    marginBottom: unit * 2,
    marginTop: unit * 2,
  },

  container_withStripe: {
    borderColor: color.accent.border,
    borderWidth: `1px 1px 1px ${unit * 0.5}px`,
    padding: `${unit * 2}px ${unit * 2}px ${unit * 2}px ${unit * 1.5 + 1}px`,
  },

  container_important: {
    backgroundColor: color.core.danger[0],
    borderLeftColor: color.core.danger[3],
  },

  container_info: {
    backgroundColor: color.accent.bg,
    borderLeftColor: color.core.primary[3],
  },

  container_warning: {
    backgroundColor: color.core.warning[0],
    borderLeftColor: color.core.warning[3],
  },

  grid: {
    display: 'grid',
    gridGap: unit,
    gridTemplateColumns: `${unit * 4}px 1fr`,
    width: '100%',
  },

  profileBadge: {
    position: 'absolute',
    transform: `translate(50%, ${-unit}px)`,
  },

  wordBreak: {
    wordBreak: 'break-word',
  },

  resetButton: {
    ...pattern.resetButton,
    display: 'block',
    width: '100%',
    textAlign: 'left',

    ':focus': {
      outline: 'none',
    },
  },

  sendingOverlay: {
    backgroundColor: toRGBA(color.core.neutral[1], 50),
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'all',
    zIndex: 1,
  },

  tag: {
    alignSelf: 'stretch',
    alignItems: 'center',
    display: 'flex',
    border: ui.border,
    borderRadius: unit / 4,
    lineHeight: 1,
    maxWidth: '5em',
    overflow: 'hidden',
    padding: `0 ${unit / 2}px`,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  title: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
}))(MessageItem);
