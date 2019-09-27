import React from 'react';
import Rating from '.';

export default {
  title: 'Core/Rating',
  parameters: {
    inspectComponents: [Rating],
  },
};

export function starRatings() {
  return (
    <>
      <Rating rating={0} />
      <Rating rating={0.5} />
      <Rating rating={1} />
      <Rating rating={1.5} />
      <Rating rating={2} />
      <Rating rating={2.5} />
      <Rating rating={3} />
      <Rating rating={3.5} />
      <Rating rating={4} />
      <Rating rating={4.5} />
      <Rating rating={5} />
    </>
  );
}

starRatings.story = {
  name: 'Star ratings.',
};

export function withReviews() {
  return <Rating rating={4.5} reviews={100} />;
}

withReviews.story = {
  name: 'With reviews.',
};

export function withDifferentSizing() {
  return (
    <>
      <Rating micro rating={3.5} reviews={100} />
      <Rating small rating={3.5} reviews={100} />
      <Rating rating={3.5} reviews={100} />
      <Rating large rating={3.5} reviews={100} />
    </>
  );
}

withDifferentSizing.story = {
  name: 'With different sizing.',
};
