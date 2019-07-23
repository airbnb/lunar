import React from 'react';
import { storiesOf } from '@storybook/react';
import DataItem from './DataItem';
import Link from './Link';
import Spacing from './Spacing';
import Card, { Content } from './Card';

storiesOf('Core/DataItem', module)
  .addParameters({
    inspectComponents: [DataItem],
  })
  .add('Standard DataItem.', () => <DataItem label="Pending tickets">8</DataItem>)
  .add('DataItem with multiple links.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <DataItem
            label="Pending tickets"
            link={
              <>
                <Spacing inline left={1}>
                  <Link small>Details</Link>
                </Spacing>
                <Spacing inline left={1}>
                  <Link small>Git Link</Link>
                </Spacing>
              </>
            }
          >
            8
          </DataItem>
        </Content>
      </Card>
    </div>
  ))
  .add('DataItem with right-floated Link.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <DataItem floatLinkRight label="Pending tickets" link={<Link small>DetailsText</Link>}>
            8
          </DataItem>
        </Content>
      </Card>
    </div>
  ))
  .add('Multiple DataItems.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <Spacing bottom={2}>
            <DataItem label="Pending tickets">8</DataItem>
          </Spacing>
          <DataItem label="Resolved tickets">20</DataItem>
        </Content>
      </Card>
    </div>
  ))
  .add('Multiple DataItems inline.', () => (
    <div style={{ width: 600 }}>
      <Card>
        <Content>
          <Spacing inline right={4}>
            <DataItem label="Pending tickets">8</DataItem>
          </Spacing>
          <DataItem inline label="Resolved tickets">
            20
          </DataItem>
        </Content>
      </Card>
    </div>
  ));
