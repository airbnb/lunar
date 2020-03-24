import React from 'react';
import T from '../Translate';
import Menu, { Row, Item, Separator } from '../Menu';
import Text from '../Text';
import TrackingBoundary from '../TrackingBoundary';
import { LT_LOCALES } from '../../constants';
import { DefinitionShape } from './types';

export type LocaleMenuProps = {
  autoDefinition?: DefinitionShape;
  maxHeight?: number;
  noneDefinition?: DefinitionShape;
  selectedLocale: string | null;
  onSelectLocale: (locale: string) => void;
};

export default class LocaleMenu extends React.Component<LocaleMenuProps> {
  private handleClick = (locale: string) => {
    this.props.onSelectLocale(locale);
  };

  render() {
    const { autoDefinition, maxHeight, noneDefinition, selectedLocale } = this.props;
    const locales = [...LT_LOCALES];

    locales.sort((a, b) => a.label.localeCompare(b.label));

    return (
      <TrackingBoundary name="Proofreader/LocaleMenu">
        <Menu
          accessibilityLabel={T.phrase('lunar.proofreader.languageSelector', 'Language selector')}
          maxHeight={maxHeight}
        >
          <Row>
            <Text small muted bold>
              <T k="lunar.proofreader.selectLanguage" phrase="Select a language" />
            </Text>
          </Row>

          {noneDefinition && (
            <Item
              key={noneDefinition.locale}
              highlighted={selectedLocale === noneDefinition.locale}
              onClick={() => this.handleClick(noneDefinition.locale)}
            >
              <Text inline>{noneDefinition.label}</Text>
            </Item>
          )}

          {autoDefinition && (
            <Item
              key={autoDefinition.locale}
              highlighted={selectedLocale === autoDefinition.locale}
              onClick={() => this.handleClick(autoDefinition.locale)}
            >
              <Text inline>{autoDefinition.label}</Text>
            </Item>
          )}

          {(noneDefinition || autoDefinition) && <Separator />}

          {locales.map((definition) => (
            <Item
              key={definition.locale}
              highlighted={selectedLocale === definition.locale}
              onClick={() => this.handleClick(definition.locale)}
            >
              <Text inline>{definition.label}</Text>
            </Item>
          ))}
        </Menu>
      </TrackingBoundary>
    );
  }
}
