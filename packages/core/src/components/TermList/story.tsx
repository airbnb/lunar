import React from 'react';
import TermList, { Term } from '.';
import Link from '../Link';
import Spacing from '../Spacing';

import Card, { Content } from '../Card';

export default {
  title: 'Core/TermList',
  parameters: {
    inspectComponents: [TermList, Term],
  },
};

export function standaloneTerm() {
  return <Term label="Clusters">8</Term>;
}

standaloneTerm.story = {
  name: 'Standalone term.',
};

export function standaloneTermWithRegularLabel() {
  return (
    <Term small={false} label="Clusters">
      8
    </Term>
  );
}

standaloneTermWithRegularLabel.story = {
  name: 'Standalone Term with regular sized label.',
};

export function standaloneTermWithAfterContent() {
  return (
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
  );
}

standaloneTermWithAfterContent.story = {
  name: 'Standalone Term with after content.',
};

export function standaloneTermWithAfterContentEndAligned() {
  return (
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
  );
}

standaloneTermWithAfterContentEndAligned.story = {
  name: 'Standalone Term in a card with after content end aligned.',
};

export function listOfTerms() {
  return (
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
  );
}

listOfTerms.story = {
  name: 'Vertical list of terms.',
};

export function horizontalListOfTerms() {
  return (
    <div style={{ width: 600 }}>
      <Card>
        <Content>
          <TermList inline>
            <Term label="Total Clusters">16</Term>
            <Term label="Active Clusters">4</Term>
            <Term label="Inactive Clusters">12</Term>
          </TermList>
        </Content>
      </Card>
    </div>
  );
}

horizontalListOfTerms.story = {
  name: 'Horizontal list of terms.',
};
