import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import LoremIpsum from ':storybook/components/LoremIpsum';
import lunar from ':storybook/images/lunar-logo.png';
import stars from ':storybook/images/stars.jpg';
import Text from './Text';
import ResponsiveImage from './ResponsiveImage';
import Card, { Content } from './Card';

const moon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARdSURBVHgB7ZzLUeQwEIZ7djcAuHGDDCADIALIgOHGbciAyQBuHCED4MgJiACIADhyYjLwzu9aV+3DY8ljdevXbH9V2gemLFnfSC2PWx6JSCUODd/EocKFkOFCyHAhZLgQMlwIGS6EDBdChgshw4WQ4ULIcCFkuBAyXAgZLoQMF0KGCyHDhZDhQshwIWT8kAJZW1uTra0t2dnZ+efYbDary8vLS/13aRQhBJ1/eHgou7u7sre3VwuJ4f39vRZzd3cnj4+P9f9LoGIs806vzs7OqoeHhyoVONd4PK7PzXrddEIaEV9fX5UWb29vdR3zkUd17VRCLES0icGIYekDGiHz4Fx3Ti5QN9FoyduAyWRSMYCReXp6+n8LOT8/r9jAtJmzT77P/5iKMVi2Xl5eysnJiaRif39fnp6e6vL5+Vn/bGNjQ/rSLKvv7+8lF+afgqurqyo1bfVgoYCgvczSGaM3R9+YC9GapkL1ImhfX1/3Omem6cuuMlygFrFtgJg+K7qjo6PVFIKO0KRve6bTadR5sfoyXhLbVKR9n7FMm7DMjQExaKWEaE5VDcu2DUE/BsM7et0KtKeqhiFtjBkpmLqMvpTUrUBjidvG0HZeXFwE60DcKVqI1egAQ9uKT38ozmGUaAtRfYSLu95SwNPF4+Pjzt/BHbzFNanZfn5+rqxI1ebQXb3BikvnxJbTFUjV7vkICNalGdzVpiw8Ay8RPHtH6ULz2tSEHBwcSKkgKaKLtmyXlKgMPctHsSBl20PTLWKjVr+Nfv0jKViNzIWIJaPRSFKC9i9KN8KKbH19XTRQmbK0h7QFXXEEojY3N0UDFSGxiWzMfHx8dB4vaoSsgpBQGqrWNXqy9QJCaadIb9XAhSwgNAK0ErldyAJcCBm54qCKEGwBKJ3t7e3O41rX6DeGC1ipG0M0uJTNMW3gxrZrytKcAdRiSMnTVugh1Ovrq2ihJgQ5tqUymUw6j4e+nh+KyreW/oBq6aJ24qT7A0NYtRlZNJp9pnofEnrQw8Z4PA7GD4trUrONoW31oGpoW2OSsHFcs79Ee8pCiU1qHsrQdsYk9Bmlk+pWYDVKhrQxJvfYaHToC0GJzTIfgqYMsDLJ1k3RXnFpytBeWWURgqCpOXX1aQum0Zubm6jzZtjDblZR9F6MZYhtA278+mwewksNLPtIjCtTW3XFiOg7bRptP8grBCVmL0Zf2urBpxtxYpmk70wy8ggRhZGC6RDnxLZrxIch8SqjjHxCNKSkgOB9J1krrz/Z1nnAbSDQI87k7o/sQlCwrLT8ZvhvMMURvWWOohF1wWixfG8W0ajgFGIlhvRNcrxCfheTaipDnMK5CEfEH0UlDSg1ze5XFORLxeyEbd7di4SE29vbYt7jW4SQNpDs3CQ8Nyk7zUuUS05DKlbIquK5vWS4EDJcCBkuhAwXQoYLIcOFkOFCyHAhZLgQMlwIGS6EDBdChgshw4WQ4ULIcCFkuBAyXAgZLoSMn0EOei7Pde0JAAAAAElFTkSuQmCC';

storiesOf('Core/Card', module)
  .addParameters({
    inspectComponents: [Card, Content],
    happo: { delay: 250 },
  })
  .add('A standard card.', () => (
    <Card>
      <Content>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with overflow visible.', () => (
    <Card overflow>
      <Content>
        <div
          style={{
            position: 'relative',
            top: '-50px',
            background: '#ebebeb',
            padding: '16px',
          }}
        >
          <Text>
            <Text>
              <LoremIpsum />
            </Text>
          </Text>
        </div>
      </Content>
    </Card>
  ))
  .add('A card with multiple blocks of content.', () => (
    <Card>
      <Content>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>

      <Content>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('With a max height.', () => (
    <Card>
      <Content middleAlign maxHeight={50}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('With a min height.', () => (
    <Card>
      <Content middleAlign minHeight={300}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a top featured image.', () => (
    <Card>
      <Content topImageSrc={stars}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a large top featured image.', () => (
    <Card>
      <Content large topImageSrc={stars}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a small left featured image.', () => (
    <Card>
      <Content small beforeImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a left featured image.', () => (
    <Card>
      <Content beforeImageSrc={moon}>
        <LoremIpsum />
      </Content>
    </Card>
  ))
  .add('A card with a large left featured image.', () => (
    <Card>
      <Content large beforeImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a small right featured image.', () => (
    <Card>
      <Content small afterImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a right featured image.', () => (
    <Card>
      <Content afterImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a large right featured image.', () => (
    <Card>
      <Content large afterImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with text truncation.', () => (
    <Card>
      <Content truncated beforeImageSrc={stars}>
        <Text truncated>
          <LoremIpsum />
        </Text>

        <Text truncated>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('Click-able.', () => (
    <Card>
      <Content
        truncated
        after={<IconChevronRight decorative size={24} />}
        onClick={action('onClick Card')}
      >
        <Text truncated>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('As compact.', () => (
    <Card>
      <Content compact>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('Card as a button with middle alignment.', () => (
    <Card>
      <Content
        compact
        middleAlign
        truncated
        before={
          <ResponsiveImage
            cover
            noShadow
            alt="Image"
            borderRadius={3}
            maxHeight={100}
            maxWidth={100}
            src={lunar}
          />
        }
        onClick={action('onClick')}
      >
        <Text bold>Suspendisse vitae dui elit?</Text>

        <Text truncated>
          <LoremIpsum />
        </Text>

        <Text>Read more</Text>
      </Content>
    </Card>
  ));
