import React, { useState } from 'react';
import useStyles from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';
import Text from '../Text';
import Link from '../Link';
import Loader from '../Loader';
import T from '../Translate';
import Dropdown from '../Dropdown';
import LocaleMenu from './LocaleMenu';
import { AUTO_DETECT_LOCALE, NO_LOCALE } from './constants';
import { getLocaleDefinition, selectAppropriateLocale } from './helpers';
import { ProofreadRuleMatch } from './types';
import { controlBarStyleSheet } from './styles';

export type ControlBarProps = {
  autoDetect?: boolean;
  errors: ProofreadRuleMatch[];
  loading?: boolean;
  locale?: string;
  top?: string;
  onSelectLocale: (locale: string) => void;
};

export default function ControlBar({
  autoDetect,
  errors,
  loading,
  locale,
  top = '80%',
  onSelectLocale,
}: ControlBarProps) {
  const theme = useTheme();
  const [styles, cx] = useStyles(controlBarStyleSheet);
  const [showLocaleMenu, setLocaleMenu] = useState(false);
  const { selectedLocale, unsupportedLocale } = selectAppropriateLocale(locale);

  return (
    <div>
      <span className={cx(styles.cell, { pointerEvents: 'initial' })}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link bold small onClick={() => setLocaleMenu(value => !value)}>
          {selectedLocale ? (
            getLocaleDefinition(selectedLocale).label
          ) : (
            <T
              k="lunar.proofreader.unsupportedLanguage"
              phrase="Unsupported language %{locale}"
              locale={unsupportedLocale ?? 'unknown'}
            />
          )}
        </Link>

        {showLocaleMenu && (
          <Dropdown
            visible
            top={top}
            left={theme.unit * 2}
            zIndex={5}
            onClickOutside={/* istanbul ignore next */ () => setLocaleMenu(false)}
          >
            <LocaleMenu
              autoDefinition={autoDetect ? getLocaleDefinition(AUTO_DETECT_LOCALE) : undefined}
              noneDefinition={getLocaleDefinition(NO_LOCALE)}
              selectedLocale={selectedLocale}
              onSelectLocale={nextLocale => {
                onSelectLocale(nextLocale);
                setLocaleMenu(false);
              }}
            />
          </Dropdown>
        )}
      </span>

      {errors.length > 0 && (
        <span className={cx(styles.cell)}>
          <Text small muted>
            <T
              k="lunar.proofreader.totalIssues"
              phrase="%{smartCount} issue||||%{smartCount} issues"
              smartCount={errors.length}
            />
          </Text>
        </span>
      )}

      {loading && (
        <span className={cx(styles.cell)}>
          <Loader inline />
        </span>
      )}
    </div>
  );
}
