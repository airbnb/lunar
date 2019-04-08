import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Grid, { Col } from './Grid';

function Box({ children = null }: { children: any }) {
  const color = localStorage.getItem('storybook.theme') === 'dark' ? '#222222' : '#EBEBEB';

  return (
    <div style={{ padding: 4, textAlign: 'center', width: '100%', backgroundColor: color }}>
      {children}
    </div>
  );
}

storiesOf('Core/Grid', module)
  .add('A 12 column grid with 16px gutters.', () => (
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
  ))
  .add('Supports columns with offsets for advanced spacing.', () => (
    <Text>
      <Grid>
        <Col span={7}>
          <Box>7</Box>
        </Col>
        <Col span={4} offset={1}>
          <Box>4 + 1 offset</Box>
        </Col>
      </Grid>
    </Text>
  ))
  .add('Can align children along the vertical axis (default is stretch).', () => (
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
  ))
  .add('Can reverse the order of columns.', () => (
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
  ));
