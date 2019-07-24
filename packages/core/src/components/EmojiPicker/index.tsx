import React from 'react';
import BaseEmojiPicker, { PickerProps } from 'interweave-emoji-picker';
import IconBolt from '@airbnb/lunar-icons/lib/general/IconBolt';
import IconBulb from '@airbnb/lunar-icons/lib/general/IconBulb';
import IconClock from '@airbnb/lunar-icons/lib/general/IconClock';
import IconFlag from '@airbnb/lunar-icons/lib/interface/IconFlag';
import IconFlower from '@airbnb/lunar-icons/lib/general/IconFlower';
import IconPlane from '@airbnb/lunar-icons/lib/general/IconPlane';
import IconSmile from '@airbnb/lunar-icons/lib/general/IconSmile';
import IconUtensils from '@airbnb/lunar-icons/lib/general/IconUtensils';
import IconVideoGame from '@airbnb/lunar-icons/lib/general/IconVideoGame';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Core from '../..';
import { ESCAPE } from '../../keys';
import T from '../Translate';

// Exclude inappropriate or offensive emojis
const blacklist = [
  '1F621', // 😡 pouting face
  '1F620', // 😠 angry face
  '1F47F', // 👿 angry face with horns
  '1F4A9', // 💩 pile of poo
  '1F595', // 🖕 middle finger
  '1F445', // 👅 tongue
  '1F444', // 👄 mouth
  '1F48B', // 💋 kiss mark
  '1F4A3', // 💣️ bomb
  '1F346', // 🍆 eggplant
  '1F52A', // 🔪 kitchen knife
  '1F3E9', // 🏩 love hotel
  '1F52B', // 🔫 pistol
  '1F489', // 💉 syringe
  '1F48A', // 💊 pill
];

const groupIcons = {
  commonlyUsed: <IconClock decorative />,
  smileysPeople: <IconSmile decorative />,
  animalsNature: <IconFlower decorative />,
  foodDrink: <IconUtensils decorative />,
  travelPlaces: <IconPlane decorative />,
  activities: <IconVideoGame decorative />,
  objects: <IconBulb decorative />,
  symbols: <IconBolt decorative />,
  flags: <IconFlag decorative />,
};

const clearIcon = <IconCloseAlt size="1.325em" decorative />;

export type Props = Partial<PickerProps> & {
  /** @ignore */
  disableAutoFocus?: boolean;
  /** A function to close the picker. Is triggered by the escape key. */
  onClosePicker: () => void;
};

/**
 * Display an emoji picker using [interweave-emoji-picker](https://github.com/milesj/interweave/tree/master/packages/interweave-emoji-picker).
 * Should primarily be used for private to public communication.
 */
export class EmojiPicker extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    disableAutoFocus: false,
  };

  // istanbul ignore next
  private handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // When the picker wrapper is focused, we need to close on esc
    if (event.key === ESCAPE) {
      this.props.onClosePicker();
    }
  };

  render() {
    const { cx, styles, disableAutoFocus, ...props } = this.props;
    const classNames = {
      picker: cx(styles.picker),
      emoji: cx(styles.emoji),
      emojiActive: cx(styles.emoji_active),
      emojis: cx(styles.emojis),
      emojisSection: cx(styles.emojisSection),
      emojisHeader: cx(styles.emojisHeader),
      emojisHeaderSticky: cx(styles.emojisHeader_sticky),
      emojisBody: cx(styles.emojisBody),
      group: cx(styles.group),
      groupActive: cx(styles.group_active),
      groups: cx(styles.groups),
      groupsList: cx(styles.list),
      skinTone: cx(styles.skinTone),
      skinToneActive: cx(styles.skinTone_active),
      skinTones: cx(styles.skinTones),
      skinTonesList: cx(styles.list),
      noPreview: cx(styles.noPreview),
      noResults: cx(styles.noResults),
      preview: cx(styles.preview),
      previewEmoji: cx(styles.previewEmoji),
      previewTitle: cx(styles.previewTitle),
      previewSubtitle: cx(styles.previewSubtitle),
      search: cx(styles.search),
      searchInput: cx(styles.searchInput),
      clear: cx(styles.clear),
    };

    const messages = {
      recentlyUsed: T.phrase('Recently Used', {}, { key: 'lunar.emoji.recentlyUsed' }),
      frequentlyUsed: T.phrase('Frequently Used', {}, { key: 'lunar.emoji.frequentlyUsed' }),
      smileysPeople: T.phrase('Smileys & People', {}, { key: 'lunar.emoji.smileysPeople' }),
      animalsNature: T.phrase('Animals & Nature', {}, { key: 'lunar.emoji.animalsNature' }),
      foodDrink: T.phrase('Food & Drink', {}, { key: 'lunar.emoji.foodDrink' }),
      travelPlaces: T.phrase('Travel & Weather', {}, { key: 'lunar.emoji.travelWeather' }),
      activities: T.phrase('Activities', {}, { key: 'lunar.emoji.activities' }),
      objects: T.phrase('Objects', {}, { key: 'lunar.emoji.objects' }),
      symbols: T.phrase('Symbols', {}, { key: 'lunar.emoji.symbols' }),
      flags: T.phrase('Flags', {}, { key: 'lunar.emoji.flags' }),
      searchResults: T.phrase('Search results', {}, { key: 'lunar.emoji.searchResults' }),
      none: T.phrase('All emojis', {}, { key: 'lunar.emoji.allResults' }),
      skinNone: T.phrase('No skin tone', {}, { key: 'lunar.emoji.noSkinTone' }),
      skinLight: T.phrase('Light skin tone', {}, { key: 'lunar.emoji.lightSkinTone' }),
      skinMediumLight: T.phrase(
        'Medium-light skin tone',
        {},
        { key: 'lunar.emoji.mediumLightSkinTone' },
      ),
      skinMedium: T.phrase('Medium skin tone', {}, { key: 'lunar.emoji.mediumSkinTone' }),
      skinMediumDark: T.phrase(
        'Medium-dark skin tone',
        {},
        { key: 'lunar.emoji.mediumDarkSkinTone' },
      ),
      skinDark: T.phrase('Dark skin tone', {}, { key: 'lunar.emoji.darkSkinTone' }),
      search: T.phrase('Search emojis', {}, { key: 'lunar.emoji.search' }),
      searchA11y: T.phrase(
        'Search for emojis by keyword',
        {},
        { key: 'lunar.emoji.searchKeyword' },
      ),
      noResults: T.phrase('No results, please try again.', {}, { key: 'lunar.emoji.noResults' }),
      clearUsed: T.phrase('Clear frequently used', {}, { key: 'lunar.emoji.clearFrequentlyUsed' }),
    };

    return (
      <div onKeyUp={this.handleKeyUp} role="presentation">
        <BaseEmojiPicker
          autoFocus={!disableAutoFocus}
          commonMode="frequently-used"
          columnCount={10}
          emojiPadding={5}
          emojiPath={Core.settings.emojiCDN}
          emojiSize={20}
          emojiLargeSize={48}
          stickyGroupHeader
          {...props}
          classNames={classNames}
          clearIcon={clearIcon}
          blacklist={blacklist}
          displayOrder={['preview', 'emojis', 'search', 'groups']}
          groupIcons={groupIcons}
          messages={messages}
        />
      </div>
    );
  }
}

export default withStyles(({ ui, unit, color, font, pattern }) => ({
  picker: {
    background: color.accent.bg,
    border: ui.border,
    borderRadius: ui.borderRadius,
  },

  preview: {
    ...font.textRegular,
    padding: unit * 1.5,
    borderBottom: ui.border,
    display: 'flex',
    alignItems: 'center',

    ':empty': {
      display: 'none',
    },
  },

  previewEmoji: {
    flexGrow: 0,
    marginRight: unit * 2,
  },

  previewTitle: {
    ...font.textRegular,
    marginBottom: unit / 2,
  },

  previewSubtitle: {
    ...font.textSmall,
    fontWeight: font.weights.light,
    color: color.muted,
  },

  emoji: {
    background: 'transparent',
    border: 0,
    fontSize: 'inherit',
    float: 'left',
    cursor: 'pointer',

    ':focus': {
      outline: 'none',
    },

    '@selectors': {
      ':not(:empty) > img': {
        display: 'block',
      },
    },
  },

  emoji_active: {
    background: color.accent.bgHover,
    borderRadius: ui.borderRadius,
  },

  emojis: {
    position: 'relative',
    padding: unit,
  },

  emojisHeader: {
    ...font.textMicro,
    fontWeight: font.weights.bold,
    textTransform: 'uppercase',
    color: color.accent.text,
    background: color.accent.bg,
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
    padding: `${unit * 0.75}px 0`,
  },

  emojisHeader_sticky: {
    position: 'absolute',
    top: unit,
    left: unit,
    right: unit,
    zIndex: 2,
  },

  list: {
    display: 'flex',
    flexWrap: 'nowrap',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    justifyContent: 'space-between',
  },

  group: {
    background: 'transparent',
    border: '1px solid transparent',
    borderTop: 0,
    padding: `${unit}px ${unit * 0.75}px`,
    fontSize: 16,
    position: 'relative',
    cursor: 'pointer',
    color: color.accent.text,
    borderBottomLeftRadius: ui.borderRadius,
    borderBottomRightRadius: ui.borderRadius,

    ':hover': {
      background: color.core.neutral[2],
    },

    ':focus': {
      outline: 'none',
    },
  },

  group_active: {
    background: color.accent.bg,
    color: color.core.primary[3],

    ':hover': {
      background: color.accent.bgHover,
    },
  },

  groups: {
    background: color.core.neutral[3],
    padding: `0 ${unit}px ${unit / 2}px ${unit}px`,
  },

  skinTone: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: '50%',
    width: 12,
    height: 12,
    lineHeight: 0,
    padding: 0,
    marginLeft: unit / 2,
    overflow: 'hidden',
    cursor: 'pointer',
    opacity: 0.75,

    ':hover': {
      opacity: 1,
    },

    ':focus': {
      outline: 'none',
    },
  },

  skinTone_active: {
    background: 'white !important',
    opacity: 1,
  },

  skinTones: {
    float: 'right',
    textAlign: 'center',
  },

  search: {
    padding: unit,
    paddingTop: 0,
  },

  searchInput: {
    ...font.textSmall,
    fontWeight: font.weights.light,
    border: ui.borderThick,
    borderRadius: ui.borderRadius,
    backgroundColor: color.accent.bg,
    padding: unit,
    zIndex: 0,
    width: '100%',

    ':focus': {
      ...pattern.focused,
    },
  },

  noPreview: {
    ...font.textRegular,
    color: color.muted,
  },

  noResults: {
    ...font.textRegular,
    padding: unit * 1.5,
  },

  clear: {
    ...pattern.resetButton,
    float: 'right',
    color: color.accent.text,
    margin: '0 -1px 0 0',

    ':hover': {
      color: color.core.neutral[4],
    },
  },
}))(EmojiPicker);
