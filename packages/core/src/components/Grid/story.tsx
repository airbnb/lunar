import React from 'react';
import Text from '../Text';
import Grid, { Col } from '.';

function Box({ children = null }: { children: React.ReactNode }) {
  const color = localStorage.getItem('storybook.theme') === 'dark' ? '#222222' : '#EBEBEB';

  return (
    <div style={{ padding: 4, textAlign: 'center', width: '100%', backgroundColor: color }}>
      {children}
    </div>
  );
}

export default {
  title: 'Core/Grid',
  parameters: {
    inspectComponents: [Grid, Col],
  },
};

export function a12ColumnGridWith16PxGutters() {
  return (
    <Text>
      <Grid>
        <Col span={12}>
          <Box>12 - 100%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={6}>
          <Box>6 - 50%</Box>
        </Col>
        <Col span={6}>
          <Box>6 - 50%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={4}>
          <Box>4 - 33.3%</Box>
        </Col>
        <Col span={4}>
          <Box>4 - 33.3%</Box>
        </Col>
        <Col span={4}>
          <Box>4 - 33.3%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={3}>
          <Box>3 - 25%</Box>
        </Col>
        <Col span={3}>
          <Box>3 - 25%</Box>
        </Col>
        <Col span={3}>
          <Box>3 - 25%</Box>
        </Col>
        <Col span={3}>
          <Box>3 - 25%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={2}>
          <Box>2 - 16.6%</Box>
        </Col>
        <Col span={2}>
          <Box>2 - 16.6%</Box>
        </Col>
        <Col span={2}>
          <Box>2 - 16.6%</Box>
        </Col>
        <Col span={2}>
          <Box>2 - 16.6%</Box>
        </Col>
        <Col span={2}>
          <Box>2 - 16.6%</Box>
        </Col>
        <Col span={2}>
          <Box>2 - 16.6%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={1}>
          <Box>1</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={10}>
          <Box>10 - 83.3%</Box>
        </Col>
        <Col span={2}>
          <Box>2 - 16.6%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={3}>
          <Box>3 - 25%</Box>
        </Col>
        <Col span={9}>
          <Box>9 - 75%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={7}>
          <Box>7 - 58.3%</Box>
        </Col>
        <Col span={5}>
          <Box>5 - 41.6%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={4}>
          <Box>4 - 33.3%</Box>
        </Col>
        <Col span={8}>
          <Box>8 - 66.6%</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={1}>
          <Box>1</Box>
        </Col>
        <Col span={11}>
          <Box>11 - 91.6%</Box>
        </Col>
      </Grid>
    </Text>
  );
}

a12ColumnGridWith16PxGutters.story = {
  name: 'A 12 column grid with 16px gutters.',
};

export function supportsColumnsWithOffsetsForAdvancedSpacing() {
  return (
    <Text>
      <Grid>
        <Col span={12}>
          <Box>12</Box>
        </Col>
      </Grid>
      <br />
      <Grid>
        <Col span={7}>
          <Box>7</Box>
        </Col>
        <Col span={4} offset={1}>
          <Box>4 + 1 offset</Box>
        </Col>
      </Grid>
    </Text>
  );
}

supportsColumnsWithOffsetsForAdvancedSpacing.story = {
  name: 'Supports columns with offsets for advanced spacing.',
};

export function canAlignChildrenAlongTheHorizontalAxisDefaultIsSpaceBetween() {
  return (
    <Text>
      <Grid startAlign>
        <Col span={6}>
          <Box>6</Box>
        </Col>
      </Grid>
      <br />
      <Grid centerAlign>
        <Col span={6}>
          <Box>6</Box>
        </Col>
      </Grid>
      <br />
      <Grid endAlign>
        <Col span={6}>
          <Box>6</Box>
        </Col>
      </Grid>
    </Text>
  );
}

canAlignChildrenAlongTheHorizontalAxisDefaultIsSpaceBetween.story = {
  name: 'Can align children along the horizontal axis (default is space-between)',
};

export function canAlignChildrenAlongTheVerticalAxisDefaultIsStretch() {
  return (
    <Text>
      <Grid>
        <Col span={7}>
          <Box>
            <br />
            <br />7<br />
            <br />
            <br />
          </Box>
        </Col>
        <Col span={5}>
          <Box>
            <br />
            <br />5<br />
            <br />
            <br />
          </Box>
        </Col>
      </Grid>
      <br />
      <Grid topAlign>
        <Col span={7}>
          <Box>
            <br />
            <br />7<br />
            <br />
            <br />
          </Box>
        </Col>
        <Col span={5}>
          <Box>5</Box>
        </Col>
      </Grid>
      <br />
      <Grid middleAlign>
        <Col span={7}>
          <Box>
            <br />
            <br />7<br />
            <br />
            <br />
          </Box>
        </Col>
        <Col span={5}>
          <Box>5</Box>
        </Col>
      </Grid>
      <br />
      <Grid bottomAlign>
        <Col span={7}>
          <Box>
            <br />
            <br />7<br />
            <br />
            <br />
          </Box>
        </Col>
        <Col span={5}>
          <Box>5</Box>
        </Col>
      </Grid>
    </Text>
  );
}

canAlignChildrenAlongTheVerticalAxisDefaultIsStretch.story = {
  name: 'Can align children along the vertical axis (default is stretch).',
};

export function canReverseTheOrderOfColumns() {
  return (
    <Text>
      <Grid reversed>
        <Col span={3}>
          <Box>A</Box>
        </Col>
        <Col span={3}>
          <Box>B</Box>
        </Col>
        <Col span={3}>
          <Box>C</Box>
        </Col>
        <Col span={3}>
          <Box>D</Box>
        </Col>
      </Grid>
    </Text>
  );
}

canReverseTheOrderOfColumns.story = {
  name: 'Can reverse the order of columns.',
};
