import React, { useState } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import useTheme from '@airbnb/lunar/lib/hooks/useTheme';
import Text from '@airbnb/lunar/lib/components/Text';
import Link from '@airbnb/lunar/lib/components/Link';
import Loader from '@airbnb/lunar/lib/components/Loader';
import T from '@airbnb/lunar/lib/components/Translate';
import Dropdown from '@airbnb/lunar/lib/components/Dropdown';
import LocaleMenu from '@airbnb/lunar/lib/components/TextArea/Proofreader/LocaleMenu';
import {
  AUTO_DETECT_LOCALE,
  NO_LOCALE,
  getLocaleDefinition,
  selectAppropriateLocale,
} from '../../helpers/preview';
import { ProofreadConfig } from '../../types';
import { previewControlsStyleSheet } from '../../styles';

export type ControlsProps = {
  autoDetect?: boolean;
  errors: ProofreadConfig[];
  loading?: boolean;
  locale?: string;
  onSelectLocale: (locale: string) => void;
};

export default function Controls({
  autoDetect,
  errors,
  loading,
  locale,
  onSelectLocale,
}: ControlsProps) {
  const theme = useTheme();
  const [styles, cx] = useStyles(previewControlsStyleSheet);
  const [showLocaleMenu, setLocaleMenu] = useState(false);
  const { selectedLocale, unsupportedLocale } = selectAppropriateLocale(locale);

  return (
    <div>
      <span className={cx(styles.cell)}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link bold small onClick={() => setLocaleMenu(value => !value)}>
          {selectedLocale ? (
            getLocaleDefinition(selectedLocale).label
          ) : (
            <T
              k="composer.proofreader.unsupportedLanguage"
              phrase="Unsupported language %{locale}"
              locale={unsupportedLocale ?? 'unknown'}
              context="Language is not supported for spelling detection"
            />
          )}
        </Link>

        {showLocaleMenu && (
          <Dropdown
            visible
            top="95%"
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
              k="composer.proofreader.totalIssues"
              phrase="%{smartCount} issue||||%{smartCount} issues"
              smartCount={errors.length}
              context="Showing the number of misspellings in a paragraph of text"
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
