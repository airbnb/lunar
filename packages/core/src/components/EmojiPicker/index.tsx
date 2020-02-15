import React from 'react';
import BaseEmojiPicker, { PickerProps } from 'interweave-emoji-picker';
import IconBolt from '@airbnb/lunar-icons/lib/general/IconBolt';
import IconBulb from '@airbnb/lunar-icons/lib/general/IconBulb';
import IconClock from '@airbnb/lunar-icons/lib/general/IconClock';
import IconFlag from '@airbnb/lunar-icons/lib/interface/IconFlag';
import IconFlower from '@airbnb/lunar-icons/lib/general/IconFlower';
import IconPlane from '@airbnb/lunar-icons/lib/general/IconPlane';
import IconSmile from '@airbnb/lunar-icons/lib/general/IconSmile';
import IconThumbUp from '@airbnb/lunar-icons/lib/interface/IconThumbUp';
import IconUtensils from '@airbnb/lunar-icons/lib/general/IconUtensils';
import IconVideoGame from '@airbnb/lunar-icons/lib/general/IconVideoGame';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import useStyles from '../../hooks/useStyles';
import Core from '../..';
import { ESCAPE } from '../../keys';
import T from '../Translate';
import { styleSheet } from './styles';

// Exclude inappropriate or offensive emojis
const blockList = [
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
  smileysEmotion: <IconSmile decorative />,
  peopleBody: <IconThumbUp decorative />,
  animalsNature: <IconFlower decorative />,
  foodDrink: <IconUtensils decorative />,
  travelPlaces: <IconPlane decorative />,
  activities: <IconVideoGame decorative />,
  objects: <IconBulb decorative />,
  symbols: <IconBolt decorative />,
  flags: <IconFlag decorative />,
};

const clearIcon = <IconCloseAlt decorative size="1.325em" />;

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
export default function EmojiPicker({ disableAutoFocus, onClosePicker, ...props }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // When the picker wrapper is focused, we need to close on esc
    if (event.key === ESCAPE && onClosePicker) {
      onClosePicker();
    }
  };

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
    previewShiftMore: cx(styles.previewShiftMore),
    search: cx(styles.search),
    searchInput: cx(styles.searchInput),
    clear: cx(styles.clear),
  };

  const messages = {
    recentlyUsed: T.phrase('Recently Used', null, { key: 'lunar.emoji.recentlyUsed' }),
    frequentlyUsed: T.phrase('Frequently Used', null, { key: 'lunar.emoji.frequentlyUsed' }),
    smileysEmotion: T.phrase('Smileys & Emotions', null, { key: 'lunar.emoji.smileysEmotion' }),
    peopleBody: T.phrase('People & Bodies', null, { key: 'lunar.emoji.peopleBody' }),
    animalsNature: T.phrase('Animals & Nature', null, { key: 'lunar.emoji.animalsNature' }),
    foodDrink: T.phrase('Food & Drink', null, { key: 'lunar.emoji.foodDrink' }),
    travelPlaces: T.phrase('Travel & Weather', null, { key: 'lunar.emoji.travelWeather' }),
    activities: T.phrase('Activities', null, { key: 'lunar.emoji.activities' }),
    objects: T.phrase('Objects', null, { key: 'lunar.emoji.objects' }),
    symbols: T.phrase('Symbols', null, { key: 'lunar.emoji.symbols' }),
    flags: T.phrase('Flags', null, { key: 'lunar.emoji.flags' }),
    variations: T.phrase('Variations', null, { key: 'lunar.emoji.variations' }),
    searchResults: T.phrase('Search results', null, { key: 'lunar.emoji.searchResults' }),
    none: T.phrase('All emojis', null, { key: 'lunar.emoji.allResults' }),
    skinNone: T.phrase('No skin tone', null, { key: 'lunar.emoji.noSkinTone' }),
    skinLight: T.phrase('Light skin tone', null, { key: 'lunar.emoji.lightSkinTone' }),
    skinMediumLight: T.phrase('Medium-light skin tone', null, {
      key: 'lunar.emoji.mediumLightSkinTone',
    }),
    skinMedium: T.phrase('Medium skin tone', null, { key: 'lunar.emoji.mediumSkinTone' }),
    skinMediumDark: T.phrase('Medium-dark skin tone', null, {
      key: 'lunar.emoji.mediumDarkSkinTone',
    }),
    skinDark: T.phrase('Dark skin tone', null, { key: 'lunar.emoji.darkSkinTone' }),
    search: T.phrase('Search emojis', null, { key: 'lunar.emoji.search' }),
    searchA11y: T.phrase('Search for emojis by keyword', null, {
      key: 'lunar.emoji.searchKeyword',
    }),
    noResults: T.phrase('No results, please try again.', null, { key: 'lunar.emoji.noResults' }),
    clearUsed: T.phrase('Clear frequently used', null, { key: 'lunar.emoji.clearFrequentlyUsed' }),
  };

  return (
    <div role="presentation" onKeyUp={handleKeyUp}>
      <BaseEmojiPicker
        stickyGroupHeader
        autoFocus={!disableAutoFocus}
        columnCount={10}
        commonMode="frequently-used"
        emojiLargeSize={48}
        emojiPadding={5}
        emojiPath={Core.settings.emojiCDN}
        emojiSize={20}
        {...props}
        blockList={blockList}
        classNames={classNames}
        clearIcon={clearIcon}
        displayOrder={['preview', 'emojis', 'search', 'groups']}
        groupIcons={groupIcons}
        messages={messages}
      />
    </div>
  );
}
