import React from 'react';
import PropTypes from 'prop-types';
import { requiredBy, mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import IconFirst from '@airbnb/lunar-icons/lib/interface/IconFirst';
import IconLast from '@airbnb/lunar-icons/lib/interface/IconLast';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import IconButton from '../IconButton';
import Text from '../Text';
import T from '../Translate';

const alignProp = mutuallyExclusiveTrueProps('centerAlign', 'endAlign', 'startAlign');

export type Props = {
  /** Align arrows in the center */
  centerAlign?: boolean;
  /** Align arrows to the end */
  endAlign?: boolean;
  /** Show fetching state. */
  fetching?: boolean;
  /** Whether it has a next page. */
  hasNext?: boolean;
  /** Whether it has a previous page. */
  hasPrev?: boolean;
  /** Current page number. */
  page: number;
  /** Content to label the pages. Default is "Page" */
  pageLabel?: string;
  /** Total page count. Required when `showBookends` is true. */
  pageCount?: number;
  /** Align arrows to the start */
  startAlign?: boolean;
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
    centerAlign: false,
    endAlign: false,
    fetching: false,
    hasNext: false,
    hasPrev: false,
    pageLabel: T.phrase('Page', {}, 'Label for pages'),
    showBookends: false,
    startAlign: false,
  };

  static propTypes = {
    centerAlign: alignProp,
    endAlign: alignProp,
    startAlign: alignProp,
    onFirst: requiredBy('showBookends', PropTypes.func),
    onLast: requiredBy('showBookends', PropTypes.func),
    pageCount: requiredBy('showBookends', PropTypes.number),
  };

  render() {
    const {
      centerAlign,
      endAlign,
      fetching,
      hasNext,
      hasPrev,
      pageLabel,
      onFirst,
      onLast,
      onNext,
      onPrevious,
      page,
      pageCount,
      showBookends,
      startAlign,
      styles,
      theme,
    } = this.props;

    if (!(hasNext || hasPrev)) {
      return null;
    }

    const previousPage = (
      <IconButton active={hasPrev} disabled={!hasPrev || fetching} onClick={onPrevious}>
        <IconChevronLeft
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
        <IconChevronRight
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
          <IconFirst
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
          <IconLast
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

    let paginationText =
      showBookends && pageCount ? (
        <T
          phrase={'%{pageNumber} of %{pageNumber}'}
          pageCount={pageCount}
          pageNumber={page}
          context="Showing the current page number and total page count"
        />
      ) : (
        <T phrase={'%{pageNumber}'} pageNumber={page} context="Showing the current page number" />
      );

    if (pageLabel) {
      paginationText =
        showBookends && pageCount ? (
          <T
            phrase={'%{pageLabel} %{pageNumber} of %{pageCount}'}
            pageLabel={pageLabel}
            pageCount={pageCount}
            pageNumber={page}
            context="Showing the current page number and total page count"
          />
        ) : (
          <T
            phrase={'%{pageLabel} %{pageNumber}'}
            pageLabel={pageLabel}
            pageNumber={page}
            context="Showing the current page number"
          />
        );
    }

    return (
      <div
        {...css(
          styles.wrapper,
          endAlign && styles.end_align,
          centerAlign && styles.center_align,
          startAlign && styles.start_align,
        )}
      >
        <div {...css(styles.previous)}>
          {firstPage}
          {previousPage}
        </div>
        <div {...css(styles.page)}>
          <Text muted>{paginationText}</Text>
        </div>
        <div {...css(styles.next)}>
          {nextPage}
          {lastPage}
        </div>
      </div>
    );
  }
}

export default withStyles(
  ({ unit }) => ({
    wrapper: {
      display: 'grid',
      gridTemplateAreas: '"previous page next"',
      gridTemplateColumns: 'auto 1fr auto',
      gridColumnGap: unit * 2,
      alignItems: 'center',
      justifyItems: 'center',
    },
    page: {
      gridArea: 'page',
    },
    previous: {
      gridArea: 'previous',
    },
    next: {
      gridArea: 'next',
    },
    end_align: {
      gridTemplateAreas: '"page previous next"',
      gridTemplateColumns: 'auto',
      justifyContent: 'end',
    },
    center_align: {
      gridTemplateColumns: 'auto',
      justifyContent: 'center',
    },
    start_align: {
      gridTemplateAreas: '"previous next page"',
      gridTemplateColumns: 'auto',
      justifyContent: 'start',
    },
  }),
  {
    passThemeProp: true,
  },
)(Pagination);
