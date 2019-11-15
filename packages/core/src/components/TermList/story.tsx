import React from 'react';
import TermList, { Term } from '.';
import Link from '../Link';
import Spacing from '../Spacing';
import List, { Item } from '../List';

import Card, { Content } from '../Card';

export default {
  title: 'Core/TermList',
  parameters: {
    inspectComponents: [TermList, Term],
  },
};

export function standaloneTerm() {
  return (
    <TermList>
      <Term label="Clusters">8</Term>
    </TermList>
  );
}

standaloneTerm.story = {
  name: 'Standalone term.',
};

export function standaloneTermWithRegularLabel() {
  return (
    <TermList>
      <Term regular label="Clusters">
        8
      </Term>
    </TermList>
  );
}

standaloneTermWithRegularLabel.story = {
  name: 'Standalone Term with regular sized label.',
};

export function standaloneTermWithAfterContent() {
  return (
    <TermList>
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
    </TermList>
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
          <TermList>
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
          </TermList>
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
    <div style={{ width: '50%' }}>
      <Card>
        <Content>
          <List horizontal gutter>
            <Item>
              <TermList>
                <Term label="Total Clusters">16</Term>
              </TermList>
            </Item>
            <Item>
              <TermList>
                <Term label="Inactive Clusters">12</Term>
              </TermList>
            </Item>
            <Item>
              <TermList>
                <Term label="Active">123456789</Term>
              </TermList>
            </Item>
          </List>
        </Content>
      </Card>
    </div>
  );
}

horizontalListOfTerms.story = {
  name: 'Horizontal list of terms wrapped in List.',
};
