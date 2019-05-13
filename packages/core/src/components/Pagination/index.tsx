import React from 'react';
import PropTypes from 'prop-types';
import { requiredBy } from 'airbnb-prop-types';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import IconFirst from '@airbnb/lunar-icons/lib/interface/IconFirst';
import IconLast from '@airbnb/lunar-icons/lib/interface/IconLast';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import IconButton from '../IconButton';
import Text from '../Text';
import Row from '../Row';
import T from '../Translate';
import DirectionalIcon from '../DirectionalIcon';

export type Props = {
  /** Show fetching state. */
  fetching?: boolean;
  /** Whether it has a next page. */
  hasNext?: boolean;
  /** Whether it has a previous page. */
  hasPrev?: boolean;
  /** Current page number. */
  page: number;
  /** Total page count. Required when `showBookends` is true. */
  pageCount?: number;
  /** Invoked when the first page button is pressed. */
  onFirst?: () => void;
  /** Invoked when the last page button is pressed. */
  onLast?: () => void;
  /** Invoked when the next page button is pressed. */
  onNext: () => void;
  /** Invoked when the previous page button is pressed. */
  onPrevious: () => void;
  /** Show the first and last page buttons. */
  showBookends?: boolean;
};

/** Pagination controls. */
export class Pagination extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    fetching: false,
    hasNext: false,
    hasPrev: false,
    showBookends: false,
  };

  static propTypes = {
    onFirst: requiredBy('showBookends', PropTypes.func),
    onLast: requiredBy('showBookends', PropTypes.func),
    pageCount: requiredBy('showBookends', PropTypes.number),
  };

  render() {
    const {
      fetching,
      hasNext,
      hasPrev,
      onFirst,
      onLast,
      onNext,
      onPrevious,
      page,
      pageCount,
      showBookends,
      styles,
      theme,
    } = this.props;

    if (!(hasNext || hasPrev)) {
      return null;
    }

    const previousPage = (
      <IconButton active={hasPrev} disabled={!hasPrev || fetching} onClick={onPrevious}>
        <DirectionalIcon
          direction="left"
          left={IconChevronLeft}
          right={IconChevronRight}
          accessibilityLabel={T.phrase(
            'Load previous page',
            {},
            'Load previous page when paginating sets of data',
          )}
          size={4 * theme!.unit}
        />
      </IconButton>
    );

    const nextPage = (
      <IconButton active={hasNext} disabled={!hasNext || fetching} onClick={onNext}>
        <DirectionalIcon
          direction="right"
          left={IconChevronLeft}
          right={IconChevronRight}
          accessibilityLabel={T.phrase(
            'Load next page',
            {},
            'Load next page when paginating sets of data',
          )}
          size={4 * theme!.unit}
        />
      </IconButton>
    );

    let firstPage = null;
    let lastPage = null;

    if (showBookends && typeof pageCount === 'number') {
      firstPage = (
        <IconButton active={hasPrev} disabled={page === 1 || fetching} onClick={onFirst}>
          <DirectionalIcon
            direction="left"
            left={IconFirst}
            right={IconLast}
            accessibilityLabel={T.phrase(
              'Load first page',
              {},
              'Load first page when paginating sets of data',
            )}
            size={4 * theme!.unit}
          />
        </IconButton>
      );

      lastPage = (
        <IconButton
          active={hasNext}
          disabled={pageCount < 2 || pageCount === page || fetching}
          onClick={onLast}
        >
          <DirectionalIcon
            direction="right"
            left={IconFirst}
            right={IconLast}
            accessibilityLabel={T.phrase(
              'Load last page',
              {},
              'Load last page when paginating sets of data',
            )}
            size={4 * theme!.unit}
          />
        </IconButton>
      );
    }

    return (
      <Row
        before={
          <>
            {firstPage}
            {previousPage}
          </>
        }
        after={
          <>
            {nextPage}
            {lastPage}
          </>
        }
        middleAlign
      >
        <div {...css(styles.centered)}>
          <Text muted>
            {showBookends && pageCount ? (
              <T
                phrase="Page %{pageNumber} of %{pageCount}"
                pageCount={pageCount}
                pageNumber={page}
                context="Showing the current page number and total page count"
              />
            ) : (
              <T
                phrase="Page %{pageNumber}"
                pageNumber={page}
                context="Showing the current page number"
              />
            )}
          </Text>
        </div>
      </Row>
    );
  }
}

export default withStyles(
  () => ({
    centered: {
      width: '100%',
      textAlign: 'center',
    },
  }),
  {
    passThemeProp: true,
  },
)(Pagination);
