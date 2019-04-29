import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import removeFocusOnMouseUp from '../../utils/removeFocusOnMouseUp';
import ProfilePhoto from '../ProfilePhoto';
import Shimmer from '../Shimmer';
import Text from '../Text';
import Spacing from '../Spacing';
import T from '../Translate';
import toRGBA from '../../utils/toRGBA';

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

  render() {
    const {
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
      styles,
      title,
      titleClickDescription,
      titleTag,
      verticalSpacing,
      warning,
    } = this.props;
    const timestamp = source
      ? T.phrase(
          '%{time} via %{source}',
          { time: formattedTimestamp, source },
          'Timestamp and source within a message bubble',
        )
      : formattedTimestamp;

    const striped = !!(important || info || warning);
    const containerStyles = css(
      styles.container,
      horizontalSpacing && styles.container_horizontalSpacing,
      verticalSpacing && styles.container_verticalSpacing,
      striped && styles.container_withStripe,
      important && styles.container_important,
      info && styles.container_info,
      warning && styles.container_warning,
    );

    const formatedTitle = disableTitleTranslation ? (
      <span className="notranslate">{title}</span>
    ) : (
      title
    );

    if (loadingAuthor) {
      return (
        <div {...containerStyles}>
          <div {...css(styles.profilePhoto, styles.tableCell)}>
            <Shimmer width={32} height={32} radius="50%" />
          </div>

          <div {...css(styles.messageBody, styles.tableCell)}>
            <Spacing bottom={0.5}>
              <Spacing right={1} inline>
                <Shimmer width={175} height={14} />
              </Spacing>

              <Text inline small muted>
                {timestamp}
              </Text>

              {email && <Shimmer height={12} width={225} />}
            </Spacing>

            {children}
          </div>

          {sending && <div {...css(styles.sendingOverlay)} />}
        </div>
      );
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
      <div>
        {profilePhoto}

        <div {...css(styles.profileBadge)}>
          <ProfilePhoto
            inline
            imageSrc={imageBadgeSrc}
            size={2}
            title={T.phrase(
              'Profile photo badge',
              {},
              'Profile photo descriptive image text within a message bubble',
            )}
          />
        </div>
      </div>
    ) : (
      profilePhoto
    );

    return (
      <div {...containerStyles}>
        <div {...css(styles.table)}>
          <div {...css(styles.profilePhoto, styles.tableCell)}>
            {onClickImage ? (
              <button
                {...css(styles.resetButton)}
                type="button"
                title={imageDescription || title}
                onClick={onClickImage}
                onMouseUp={removeFocusOnMouseUp}
              >
                {avatar}
              </button>
            ) : (
              avatar
            )}
          </div>

          <div {...css(styles.messageBody, styles.tableCell)}>
            <Spacing bottom={0.5}>
              <span {...css(styles.messageTitle)}>
                {onClickTitle ? (
                  <button
                    {...css(styles.resetButton)}
                    type="button"
                    title={titleClickDescription || title}
                    onClick={onClickTitle}
                    onMouseUp={removeFocusOnMouseUp}
                  >
                    <Text inline bold>
                      {formatedTitle}
                    </Text>
                  </button>
                ) : (
                  <Text inline bold>
                    {formatedTitle}
                  </Text>
                )}
              </span>

              {titleTag && (
                <span {...css(styles.tag)}>
                  <Text inline micro muted>
                    {titleTag}
                  </Text>
                </span>
              )}

              <Text inline small muted>
                {timestamp}
              </Text>

              {email && (
                <Text small muted>
                  <T phrase="From: %{email}" email={email} context="Who the message is from" html />
                </Text>
              )}
            </Spacing>

            <div {...css(styles.messageBodyContent)}>{children}</div>
          </div>
        </div>

        {sending && <div {...css(styles.sendingOverlay)} />}
      </div>
    );
  }
}

export default withStyles(({ color, ui, unit, pattern }) => ({
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

  table: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
  },

  tableCell: {
    display: 'table-cell',
    verticalAlign: 'top',
  },

  profilePhoto: {
    width: 4 * unit,
  },

  profileBadge: {
    position: 'absolute',
    transform: `translate(50%, ${-unit}px)`,
  },

  messageBody: {
    paddingLeft: unit,
  },

  messageBodyContent: {
    wordBreak: 'break-word',
  },

  messageTitle: {
    marginRight: unit,
    wordBreak: 'break-word',
  },

  resetButton: {
    ...pattern.resetButton,
    textAlign: 'left',
  },

  sendingOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'all',
    backgroundColor: toRGBA(color.core.neutral[3], 50),
    zIndex: 1,
  },

  tag: {
    border: ui.border,
    borderRadius: unit / 4,
    display: 'inline-block',
    lineHeight: 1,
    marginRight: unit,
    maxWidth: '100%',
    overflow: 'hidden',
    padding: `0 ${unit / 2}px`,
    textOverflow: 'ellipsis',
    verticalAlign: 'sub',
    whiteSpace: 'nowrap',
  },
}))(MessageItem);
