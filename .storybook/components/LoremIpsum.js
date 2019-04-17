import React from 'react';
import { styled } from '@storybook/theming';

const Wrapper = styled.div({
  marginTop: 8,
  marginBottom: 8,

  '&:first-child': {
    marginTop: 0,
  },

  '&:last-child': {
    marginBottom: 0,
  },
});

export default function LoremIpsum({ short, medium }) {
  if (short) {
    return <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>;
  }

  if (medium) {
    return (
      <Wrapper>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet.
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
      sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
      blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi,
      a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
      Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat.
      Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum.
      Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
    </Wrapper>
  );
}
