import React from 'react';
import PropTypes from 'prop-types';
import { requiredBy, mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import IconFirst from '@airbnb/lunar-icons/lib/interface/IconFirst';
import IconLast from '@airbnb/lunar-icons/lib/interface/IconLast';
import useStyles from '../../hooks/useStyles';
import IconButton from '../IconButton';
import Text from '../Text';
import T from '../Translate';
import DirectionalIcon from '../DirectionalIcon';
import { styleSheet } from './styles';
import useTheme from '../../hooks/useTheme';

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
  /** Show the first and last page buttons. */
  showBookends?: boolean;
  /** Align arrows to the start */
  startAlign?: boolean;
  /** Current page number. */
  page: number;
  /** Content to label the pages. Default is "Page" */
  pageLabel?: string;
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
};

/** Pagination controls. */
function Pagination({
  centerAlign,
  endAlign,
  fetching,
  hasNext,
  hasPrev,
  showBookends,
  startAlign,
  pageLabel = T.phrase('Page', {}, { context: 'Label for pages', key: 'lunar.common.page' }),
  onFirst,
  onLast,
  onNext,
  onPrevious,
  page,
  pageCount,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();

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
          {
            context: 'Load previous page when paginating sets of data',
            key: 'lunar.pagination.loadPrevious',
          },
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
          {
            context: 'Load next page when paginating sets of data',
            key: 'lunar.pagination.loadNext',
          },
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
            {
              context: 'Load first page when paginating sets of data',
              key: 'lunar.pagination.loadFirst',
            },
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
            {
              context: 'Load last page when paginating sets of data',
              key: 'lunar.pagination.loadLast',
            },
          )}
          size={4 * theme!.unit}
        />
      </IconButton>
    );
  }

  let paginationText =
    showBookends && pageCount ? (
      <T
        k="lunar.pagination.pageCount"
        phrase="%{pageNumber} of %{pageCount}"
        pageCount={pageCount}
        pageNumber={page}
        context="Showing the current page number and total page count"
      />
    ) : (
      page
    );

  if (pageLabel) {
    paginationText =
      showBookends && pageCount ? (
        <T
          k="lunar.pagination.pageCountLabeled"
          phrase="%{pageLabel} %{pageNumber} of %{pageCount}"
          pageLabel={pageLabel}
          pageCount={pageCount}
          pageNumber={page}
          context="Showing the current page number and total page count"
        />
      ) : (
        <T
          k="lunar.pagination.pageNumberLabeled"
          phrase="%{pageLabel} %{pageNumber}"
          pageLabel={pageLabel}
          pageNumber={page}
          context="Showing the current page number"
        />
      );
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        endAlign && styles.wrapper_endAlign,
        centerAlign && styles.wrapper_centerAlign,
        startAlign && styles.wrapper_startAlign,
      )}
    >
      <div className={cx(styles.previous)}>
        {firstPage}
        {previousPage}
      </div>

      <div className={cx(styles.page)}>
        <Text muted>{paginationText}</Text>
      </div>

      <div className={cx(styles.next)}>
        {nextPage}
        {lastPage}
      </div>
    </div>
  );
}

const alignProp = mutuallyExclusiveTrueProps('centerAlign', 'endAlign', 'startAlign');

Pagination.propTypes = {
  centerAlign: alignProp,
  endAlign: alignProp,
  pageCount: requiredBy('showBookends', PropTypes.number),
  startAlign: alignProp,
  onFirst: requiredBy('showBookends', PropTypes.func),
  onLast: requiredBy('showBookends', PropTypes.func),
};

export default Pagination;
