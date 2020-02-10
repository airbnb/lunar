import React, { useState, useContext } from 'react';
import T from '@airbnb/lunar/lib/components/Translate';
import IconCreate from '@airbnb/lunar-icons/lib/interface/IconCreate';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import Input from '@airbnb/lunar/lib/components/Input';
import { Prefix, Suffix } from '@airbnb/lunar/lib/components/FormField';
import Row from '@airbnb/lunar/lib/components/Row';
import Text from '@airbnb/lunar/lib/components/Text';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import IconButton from '@airbnb/lunar/lib/components/IconButton';
import ComposerContext from '../../contexts/ComposerContext';

export type InlineInputProps = {
  label: NonNullable<React.ReactNode>;
  name: string;
  value?: string;
};

export default function InlineInput({ label, name, value }: InlineInputProps) {
  const context = useContext(ComposerContext);
  const [editing, setEditing] = useState(false);

  // Elements
  const textLabel = (
    <Text inline small muted bold>
      {label}
    </Text>
  );
  const editLabel = T.phrase('lunar.composer.labels.editField', 'Edit %{name} field', { name });
  const editButton = (
    <IconButton onClick={() => setEditing(!editing)}>
      {editing ? (
        <IconCloseAlt accessibilityLabel={editLabel} size="1.25em" />
      ) : (
        <IconCreate accessibilityLabel={editLabel} size="1em" />
      )}
    </IconButton>
  );

  if (editing) {
    return (
      <Spacing bottom={0.5}>
        <Input
          small
          hideLabel
          label={label}
          name={name}
          prefix={<Prefix compact>{textLabel}</Prefix>}
          suffix={<Suffix compact>{editButton}</Suffix>}
          value={value}
          onChange={nextValue => {
            context.setData(name, nextValue);
          }}
        />
      </Spacing>
    );
  }

  return (
    <Spacing horizontal={1}>
      <Row middleAlign after={editButton}>
        <Spacing vertical={0.5}>
          <Text small>
            {textLabel} {value}
          </Text>
        </Spacing>
      </Row>
    </Spacing>
  );
}
