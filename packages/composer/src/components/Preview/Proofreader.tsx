import React, { useState, useEffect, useContext } from 'react';
import debounce from 'lodash/debounce';
import Dropdown from '@airbnb/lunar/lib/components/Dropdown';
import ErrorMenu from '@airbnb/lunar/lib/components/TextArea/Proofreader/ErrorMenu';
import { DEFAULT_LOCALE } from '@airbnb/lunar/lib/constants';
import { checkForAirbnbErrors, NO_LOCALE } from '../../helpers/preview';
import ComposerContext from '../../contexts/ComposerContext';
import Renderer, { RendererProps } from './Renderer';
import Controls from './Controls';
import Window from './Window';
import { ProofreaderLoader, ProofreadConfig } from '../../types';

export type ProofreaderProps = {
  /** Determines whether a marked mistake is highlighted. */
  isRuleHighlighted?: RendererProps['isRuleHighlighted'];
  /** Determines whether a marked mistake uses a secondary color. */
  isRuleSecondary?: RendererProps['isRuleSecondary'];
  /** Locale to query mistakes for. Defaults to "en". */
  locale?: string;
  /** Callback fired when preview is confirmed. */
  onConfirm: () => void;
  /** Callback to load spelling and grammar checks from a LanguageTool API. */
  onProofread: ProofreaderLoader;
  value: string;
};

export default function Proofreader({
  isRuleHighlighted,
  isRuleSecondary,
  locale,
  onConfirm,
  onProofread,
  value,
}: ProofreaderProps) {
  const context = useContext(ComposerContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ProofreadConfig[]>([]);
  const [selectedError, setSelectedError] = useState<ProofreadConfig>();
  const [selectedLocale, setSelectedLocale] = useState(locale ?? DEFAULT_LOCALE);
  const [errorPosition, setErrorPosition] = useState<{ top: number; left: number }>();

  // Load proofreader errors when value changes
  useEffect(
    debounce(
      () => {
        const customErrors = checkForAirbnbErrors(value);

        if (!value || !selectedLocale || selectedLocale === NO_LOCALE) {
          if (customErrors.length > 0) {
            setErrors(customErrors);
          }

          return;
        }

        // Check with language tool
        setLoading(true);

        onProofread({
          action: 'check',
          locale: selectedLocale,
          text: value,
        })
          .then(proofreadErrors => {
            setErrors([...customErrors, ...proofreadErrors]);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      },
      1000,
      { leading: true },
    ),
    [onProofread, selectedLocale, value],
  );

  // Handlers
  const handleSelectError = (error: ProofreadConfig, top: number, left: number) => {
    setSelectedError(error);
    setErrorPosition({ top, left });
  };

  const handleUnselectError = () => {
    setSelectedError(undefined);
    setErrorPosition(undefined);
  };

  // istanbul ignore next
  const handleSelectLocale = (nextLocale: string) => {
    setSelectedLocale(nextLocale);
    handleUnselectError();
  };

  const handleReplaceText = (error: ProofreadConfig, replacement: string) => {
    const { offset = 0 } = error;
    let nextValue = '';

    nextValue += value.slice(0, offset);
    nextValue += replacement;
    nextValue += value.slice(offset + error.length!);

    handleUnselectError();
    setErrors(errors.filter(e => e !== error));
    context.setData('value', nextValue);
  };

  return (
    <Window
      controls={
        <Controls
          errors={errors}
          loading={loading}
          locale={selectedLocale}
          onSelectLocale={handleSelectLocale}
        />
      }
      onConfirm={onConfirm}
    >
      <Renderer
        errors={errors}
        isRuleHighlighted={isRuleHighlighted}
        isRuleSecondary={isRuleSecondary}
        selectedError={selectedError}
        value={value}
        onClickError={handleSelectError}
      />

      {errorPosition && selectedError && (
        <Dropdown {...errorPosition} visible zIndex={5} onClickOutside={handleUnselectError}>
          <ErrorMenu error={selectedError} onReplaceText={handleReplaceText} />
        </Dropdown>
      )}
    </Window>
  );
}
