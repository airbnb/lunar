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
  return (
    <TermList>
      <Term label="Clusters">8</Term>
    </TermList>
  );
}

standaloneTerm.story = {
  name: 'Standalone term.',
};

export function termsUsingTextProperties() {
  return (
    <TermList>
      <Term bold label="Bold term">
        with &quot;bold&quot; prop
      </Term>
      <Term muted label="Muted term">
        with &quot;muted&quot; prop
      </Term>
      <Term small={false} label="Regular term">
        {'with "small={false}" prop'}
      </Term>
      <Term large label="Large term">
        with &quot;large&quot; prop
      </Term>
    </TermList>
  );
}

termsUsingTextProperties.story = {
  name: 'Examples of Term using Text properties.',
};

export function standaloneTermWithAfterContent() {
  return (
    <TermList>
      <Term
        label="Clusters"
        after={
          <>
            <Link small href="https://github.com/airbnb/lunar">
              Details
            </Link>
            <Spacing inline left={1}>
              <Link small href="https://github.com/airbnb/lunar">
                Git
              </Link>
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
                  <Link small href="https://github.com/airbnb/lunar">
                    Details
                  </Link>
                  <Spacing inline left={1}>
                    <Link small href="https://github.com/airbnb/lunar">
                      Git
                    </Link>
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
  name: 'Standalone Term in a Card with after content end-aligned.',
};

export function listOfTerms() {
  return (
    <TermList>
      <Term label="Total Clusters">16</Term>
      <Term label="Active Clusters">4</Term>
      <Term label="Inactive Clusters">12</Term>
    </TermList>
  );
}

listOfTerms.story = {
  name: 'Vertical list of terms.',
};

export function horizontalListOfTerms() {
  return (
    <TermList horizontal>
      <Term label="Total Clusters">16</Term>
      <Term label="Inactive Clusters">12</Term>
      <Term label="Active">123456789</Term>
    </TermList>
  );
}

horizontalListOfTerms.story = {
  name: 'Horizontal list of terms.',
};
