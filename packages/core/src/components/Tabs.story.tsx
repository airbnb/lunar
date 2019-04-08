import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Tabs, { Tab } from './Tabs';

storiesOf('Core/Tabs', module)
  .add('Standard tabs with no body content.', () => (
    <Tabs>
      <Tab key="a" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('Standard tabs stretched with no body content.', () => (
    <Tabs stretched>
      <Tab key="a" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('Borderless tabs with no body content.', () => (
    <Tabs borderless>
      <Tab key="a" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" disabled label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('Render anchor links when passing .', () => (
    <Tabs>
      <Tab key="a" href="#mj" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" href="#cp" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" href="#th" label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('With body content and a default selected index.', () => (
    <Tabs defaultKey="c">
      <Tab key="a" label={<Text bold>Bruce W.</Text>}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur, nulla ut
          sollicitudin tincidunt, nisi quam scelerisque purus, sed suscipit sem nisi a odio.
          Vestibulum tempus iaculis laoreet. Nunc ex libero, consectetur et orci vel, luctus varius
          massa. Aliquam ornare auctor tincidunt. Quisque at egestas nibh. Phasellus nec scelerisque
          ipsum. Nunc blandit interdum tincidunt. Ut eget lacus diam. Sed eu sapien a sapien dictum
          eleifend vitae nec tortor. Quisque eget cursus magna. Quisque in nunc quis neque auctor
          congue.
        </Text>
      </Tab>

      <Tab key="b" label={<Text bold>Clark K.</Text>} disabled>
        <Text>
          Vestibulum purus orci, venenatis non ipsum ac, pulvinar convallis nisi. Maecenas blandit
          cursus consectetur. Aenean feugiat non sem a sagittis. Sed at nulla sed turpis accumsan
          malesuada. Suspendisse vitae sollicitudin ipsum, ut placerat felis. Nam a turpis eget
          lectus dapibus convallis. Nulla vel risus erat. Fusce in nunc in eros consequat congue.
          Mauris sodales orci nec blandit rutrum. Nullam eros leo, fringilla id volutpat vel,
          finibus nec dolor. Quisque in faucibus augue, et pharetra eros. Nunc viverra fermentum
          felis, finibus venenatis orci porta quis.
        </Text>
      </Tab>

      <Tab key="c" label={<Text bold>Peter P.</Text>}>
        <Text>
          Curabitur sem eros, laoreet et purus eget, varius lobortis orci. Aenean auctor fermentum
          risus, ut tempor eros congue quis. Proin ac leo elit. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Donec euismod non nulla
          nec convallis. Fusce elit diam, commodo ac tincidunt et, commodo a odio. Ut non lorem sit
          amet sapien condimentum accumsan non consectetur neque. Donec sollicitudin sem neque,
          vitae rhoncus urna pulvinar in. Ut porta dignissim porta. Cras vel consectetur nunc, vitae
          porta enim. Curabitur quis erat bibendum, semper massa a, convallis elit. Vestibulum et
          commodo tellus, vel venenatis est.
        </Text>
      </Tab>
    </Tabs>
  ))
  .add('With scrollable variable height tabs.', () => (
    <div style={{ width: '325px' }}>
      <Tabs scrollable>
        <Tab
          key="a"
          label={
            <Text bold>
              Bruce
              <br />
              Wayne
            </Text>
          }
        />
        <Tab key="b" label={<Text bold>Clark K.</Text>} />
        <Tab
          key="c"
          label={
            <Text bold>
              Peter
              <br />
              Parker
            </Text>
          }
        />
        <Tab key="d" label={<Text bold>Tony S.</Text>} />
        <Tab key="e" label={<Text bold>Bruce B.</Text>} />
      </Tabs>
    </div>
  ));
