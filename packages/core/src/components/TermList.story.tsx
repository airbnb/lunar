import React from 'react';
import { storiesOf } from '@storybook/react';
import TermList, { Term } from './TermList';
import Link from './Link';
import Spacing from './Spacing';

import Card, { Content } from './Card';

storiesOf('Core/TermList', module)
  .addParameters({
    inspectComponents: [TermList],
  })
  .add('Standalone Term.', () => <Term label="Clusters">8</Term>)
  .add('Standalone Term with regular sized label.', () => (
    <Term keyTextRegular label="Clusters">
      8
    </Term>
  ))
  .add('Standalone Term with after content.', () => (
    <Term
      label="Clusters"
      after={
        <>
          <Link small>Details</Link>
          <Spacing inline left={1}>
            <Link small>Git</Link>
          </Spacing>
        </>
      }
    >
      8
    </Term>
  ))
  .add('Standalone Term in a card with after content end aligned.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <Term
            endAlign
            label="Clusters"
            after={
              <>
                <Link small>Details</Link>
                <Spacing inline left={1}>
                  <Link small>Git</Link>
                </Spacing>
              </>
            }
          >
            8
          </Term>
        </Content>
      </Card>
    </div>
  ))
  .add('List of Terms.', () => (
    <div style={{ width: 300 }}>
      <Card>
        <Content>
          <TermList>
            <Term label="Total Clusters">16</Term>
            <Term label="Active Clusters">4</Term>
            <Term label="Inactive Clusters">12</Term>
          </TermList>
        </Content>
      </Card>
    </div>
  ));
