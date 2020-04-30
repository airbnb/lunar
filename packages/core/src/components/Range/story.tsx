import React, { useState } from 'react';
import Range, { RangeProps } from '.';

export default {
  title: 'Core/Range',
  parameters: {
    inspectComponents: [Range],
  },
};

export function StandardRangeSlider() {
  const [value, setValue] = useState(50);
  return (
    <>
      <Range label="Range" value={value} onChange={(v) => setValue(v)} />
      <Range disabled label="Disabled" value={50} onChange={(v) => setValue(v)} />
    </>
  );
}

StandardRangeSlider.story = {
  name: 'A standard range slider.',
};

export function RangeSliderWithAnnotations() {
  const [value, setValue] = useState(40);
  const [[annotations1, annotations2]] = useState(() => [
    [...new Array(6)].map((_, i) => ({
      value: i * 20,
      label: `${i * 20}`,
    })),
    [{ value: 40, label: 'Default' }],
  ]);
  const props: RangeProps = {
    label: 'Inline label',
    inline: true,
    step: 20,
    value,
    onChange: (v: number) => setValue(v),
  };

  return (
    <>
      <Range {...props} annotations={annotations1} />
      <Range {...props} annotations={annotations2} />
    </>
  );
}

RangeSliderWithAnnotations.story = {
  name: 'With annotations and step size',
};

export function RangeSliderWithTooltip() {
  const [value, setValue] = useState(60);
  return (
    <>
      <Range
        alwaysShowTooltip
        label="Always show tooltip"
        value={value}
        onChange={(v) => setValue(v)}
      />
      <Range showTooltip label="Tooltip on hover" value={value} onChange={(v) => setValue(v)} />
      <Range
        showTooltip
        invertTooltip
        label="Inverted with custom renderer"
        value={value}
        renderTooltipContent={() => '🍍'}
        onChange={(v) => setValue(v)}
      />
    </>
  );
}

RangeSliderWithTooltip.story = {
  name: 'With tooltips',
};

export function RangeSliderWithWidthAndCustomValues() {
  const [value, setValue] = useState(-2);
  const [annotations] = useState([-10, -8, -6, -4, -2, 0].map((val) => ({ value: val })));
  const props: RangeProps = {
    label: 'range',
    hideLabel: true,
    alwaysShowTooltip: true,
    min: -10,
    max: 0,
    step: 2,
    value,
    annotations,
    onChange: (v: number) => setValue(v),
  };
  return (
    <>
      <Range width={200} {...props} />
      <Range width={400} {...props} />
      <Range width={600} {...props} />
    </>
  );
}

RangeSliderWithWidthAndCustomValues.story = {
  name: 'Custom width and min/max/step',
};
