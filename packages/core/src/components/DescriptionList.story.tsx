import React from 'react';
import { storiesOf } from '@storybook/react';
import DescriptionList, { Description, Term } from './DescriptionList';
import Link from './Link';
import Spacing from './Spacing';

import Card, { Content } from './Card';

storiesOf('Core/DescriptionList', module)
  .addParameters({
    inspectComponents: [DescriptionList, Description],
  })
  .add('Standard Description.', () => (
    <DescriptionList>
      <Term>Clusters</Term>
      <Description>8</Description>
    </DescriptionList>
  ))
  .add('DataItem with multiple links.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <DescriptionList>
            <Term
              after={
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
              Clusters
            </Term>
            <Description>8</Description>
          </DescriptionList>
        </Content>
      </Card>
    </div>
  ))
  .add('DataItem with right-floated Link.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <DescriptionList>
            <Term
              endAlign
              after={
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
              Clusters
            </Term>
            <Description>8</Description>
          </DescriptionList>
        </Content>
      </Card>
    </div>
  ))
  .add('Multiple DataItems.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <DescriptionList>
            <Term>Total Clusters</Term>
            <Description>16</Description>
            <Term>Total Clusters</Term>
            <Description>16</Description>
            <Term>Total Clusters</Term>
            <Description>16</Description>
            <Term>Total Clusters</Term>
            <Description>16</Description>
          </DescriptionList>
        </Content>
      </Card>
    </div>
  ))
  .add('Multiple DataItems inline.', () => (
    <div style={{ width: 600 }}>
      <Card>
        <Content>
          <DescriptionList horizontal>
            <Term>Total Clusters</Term>
            <Description>16</Description>
            <Term>Total Clusters</Term>
            <Description>16</Description>
            <Term>Total Clusters</Term>
            <Description>16</Description>
            <Term>Total Clusters</Term>
            <Description>16</Description>
          </DescriptionList>
        </Content>
      </Card>
    </div>
  ));
