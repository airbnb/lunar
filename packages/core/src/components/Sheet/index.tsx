import React from 'react';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { Z_INDEX_PORTAL } from '../../constants';
import { ESCAPE } from '../../keys';
import focusableSelector from '../../utils/focusableSelector';
import toRGBA from '../../utils/toRGBA';
import FocusTrap from '../FocusTrap';
import IconButton from '../IconButton';
import Portal from '../Portal';
import Row from '../Row';
import Spacing from '../Spacing';
import T from '../Translate';
import SheetArea from './SheetArea';
import SheetContext, { Context } from './SheetContext';

export { SheetArea, SheetContext };

export type Props = {
  /** The contents of the sheet. */
  children: NonNullable<React.ReactNode>;
  /** Render with reduced padding */
  compact?: boolean;
  /** Determines if the sheet has a side gap. */
  gap?: boolean;
  /** Content of the header bar */
  header?: React.ReactNode;
  /** Render the header area with a drop-shadow */
  headerShadow?: boolean;
  /** Determines if the sheet animates in/out. */
  noAnimation?: boolean;
  /** Invoked when the sheet close button is pressed, or when escape is pressed when displaying a portal sheet. This function should set the `visible` prop to false. */
  onClose: () => void;
  /** Determines if the sheet is displayed as a full-page view that covers the entire application. */
  portal?: boolean;
  /** Determines if the sheet is currently visible or not. */
  visible?: boolean;
};

export type PrivateProps = {
  /** @ignore */
  setSheetVisible: Context;
};

export type State = {
  animating: boolean;
};

/** @ignore */
export class BaseSheet extends React.Component<Props & PrivateProps & WithStylesProps, State> {
  static defaultProps = {
    gap: false,
    noAnimation: false,
    portal: false,
    visible: false,
  };

  lastActiveElement: HTMLElement | null = null;

  openTimeout: number = 0;

  sheetRef = React.createRef<HTMLDivElement>();

  wrapperRef = React.createRef<HTMLDivElement>();

  state = {
    animating: false,
  };

  componentDidMount() {
    if (this.props.visible) {
      this.visibilityChange();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible) {
      this.visibilityChange();
    }
  }

  componentWillUnmount() {
    this.cleanupPortal();
  }

  cleanupPortal() {
    if (this.openTimeout) {
      window.clearTimeout(this.openTimeout);
    }

    document.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = '';
  }

  visibilityChange() {
    const { noAnimation, portal, visible } = this.props;

    this.setState({
      animating: !noAnimation,
    });

    if (visible && !portal) {
      this.props.setSheetVisible(visible);
    }

    // Custom portal logic:
    if (portal) {
      if (visible) {
        document.addEventListener('keydown', this.handleKeyDown);
        document.body.style.overflow = 'hidden';

        this.lastActiveElement = document.activeElement as HTMLElement;

        // NOTE: Putting this in a setTimeout helps screen readers notice that focus has changed:
        this.openTimeout = window.setTimeout(() => {
          this.openTimeout = 0;

          if (this.sheetRef.current) {
            const firstFocusableElement = this.sheetRef.current.querySelector(focusableSelector);

            if (firstFocusableElement) {
              (firstFocusableElement as HTMLElement).focus();
            }
          }
        }, 0);
      } else {
        this.cleanupPortal();

        if (this.lastActiveElement) {
          this.lastActiveElement.focus();
          this.lastActiveElement = null;
        }
      }
    }
  }

  private handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    const { gap } = this.props;

    if (
      (!gap && event.target !== this.sheetRef.current) ||
      (gap && event.target !== this.wrapperRef.current)
    ) {
      return;
    }

    this.setState({
      animating: false,
    });

    // If we're animating out, then we defered the visible reset call, so let's make it now:
    if (!this.props.portal && !this.props.visible) {
      this.props.setSheetVisible(false);
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.props.portal && event.key === ESCAPE) {
      this.props.onClose();
      event.stopPropagation();
    }
  };

  private handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { animating } = this.state;
    const {
      cx,
      gap,
      theme,
      styles,
      portal,
      visible,
      children,
      header,
      compact,
      headerShadow,
    } = this.props;

    if (!visible && !animating) {
      return null;
    }

    const closeText = T.phrase('Close', {}, 'Close a sheet popup');
    const closeIcon = (
      <IconButton onClick={this.handleClose}>
        <IconClose accessibilityLabel={closeText} size={3 * theme!.unit} />
      </IconButton>
    );

    const sheetContent = (
      <div
        aria-modal
        role="dialog"
        ref={this.sheetRef}
        onAnimationEnd={this.handleAnimationEnd}
        className={cx(
          styles.sheet,
          portal && styles.sheet_portal,
          !gap && animating && styles.sheet_animating,
          !gap && animating && !visible && styles.sheet_out,
          !gap && animating && visible && styles.sheet_in,
        )}
      >
        <FocusTrap disabled={!portal}>
          <div
            className={cx(
              styles.container,
              gap && styles.container_gap,
              portal && animating && styles.container_animating,
            )}
          >
            {gap && (
              <button
                className={cx(styles.gap)}
                aria-label={closeText}
                type="button"
                onClick={this.handleClose}
              />
            )}

            <div
              ref={this.wrapperRef}
              onAnimationEnd={this.handleAnimationEnd}
              className={cx(
                styles.wrapper,
                gap && styles.wrapper_gap,
                gap && animating && styles.sheet_animating,
                gap && animating && !visible && styles.sheet_slide_out,
                gap && animating && visible && styles.sheet_slide_in,
              )}
            >
              <div className={cx(headerShadow && styles.headerShadow)}>
                <Spacing all={compact ? 1 : 4} bottom={0}>
                  <Row middleAlign before={!gap && closeIcon} after={gap && closeIcon}>
                    {header || ''}
                  </Row>
                </Spacing>
              </div>

              <div className={cx(styles.content, compact && styles.content_compact)}>
                {children}
              </div>
            </div>
          </div>
        </FocusTrap>
      </div>
    );

    if (portal) {
      return <Portal>{sheetContent}</Portal>;
    }

    return sheetContent;
  }
}

const InternalSheet = withStyles(
  ({ color, pattern, unit, ui }) => ({
    sheet: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      boxShadow: ui.boxShadowLarge,
      zIndex: Z_INDEX_PORTAL,

      '@selectors': {
        '> div': {
          height: '100%',
        },
      },
    },

    sheet_portal: {
      position: 'fixed',
    },

    sheet_animating: {
      pointerEvents: 'none',
      animationDuration: '300ms',
    },

    sheet_out: {
      animationFillMode: 'forwards',
      animationName: {
        name: 'sheetSlideOut',
        from: {
          opacity: 1,
          transform: 'translateY(0%)',
        },
        to: {
          opacity: 0,
          transform: 'translateY(80%)',
        },
      },
      animationTimingFunction: 'ease-in',
    },

    sheet_in: {
      animationFillMode: 'forwards',
      animationName: {
        name: 'sheetSlideIn',
        from: {
          opacity: 0,
          transform: 'translateY(80%)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0%)',
        },
      },
      animationTimingFunction: 'ease-out',
    },

    sheet_slide_out: {
      animationFillMode: 'forwards',
      animationName: {
        name: 'sheetSlideOut',
        from: {
          opacity: 1,
          transform: 'translateX(0%)',
        },
        to: {
          opacity: 0,
          transform: 'translateX(80%)',
        },
      },
      animationTimingFunction: 'ease-in',
    },

    sheet_slide_in: {
      animationFillMode: 'forwards',
      animationName: {
        name: 'sheetSlideIn',
        from: {
          opacity: 0,
          transform: 'translateX(80%)',
        },
        to: {
          opacity: 1,
          transform: 'translateX(0%)',
        },
      },
      animationTimingFunction: 'ease-out',
    },

    container: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    },

    container_gap: {
      backgroundColor: toRGBA(color.core.neutral[6], 30),
      display: 'grid',
      gridTemplateAreas: '"moverlay mcontent mcontent mcontent"',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: 0,
      gridGap: 0,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },

    gap: {
      ...pattern.resetButton,
      gridArea: 'moverlay',
      overflow: 'hidden',
      outline: 'none',

      '@selectors': {
        '::-moz-focus-inner': {
          border: 0,
        },
      },
    },

    wrapper: {
      gridArea: 'mcontent',
      background: color.accent.bg,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'auto',
    },

    wrapper_gap: {
      height: 'auto',
    },

    content: {
      marginTop: 2 * unit,
      padding: 4 * unit,
      paddingTop: 0,
      flex: 1,
    },

    content_compact: {
      padding: unit,
    },

    headerShadow: {
      boxShadow: ui.boxShadow,
    },
  }),
  {
    passThemeProp: true,
  },
)(BaseSheet);

/**
 * A modal-like UI that is used to display content in a sheet that covers the existing UI. There are
 * two versions of the Sheet: one that displays inline, and one that displays in a portal.

 * If you want to display a sheet inline, you must wrap the `Sheet` component in the exported
 * `SheetArea`. The wrapping component ensures that the positioning and scroll of the nested content
 * and sheet works as expected.

 * If you want to display a sheet in a portal, you can simply pass the `portal` prop to the `Sheet`
 * component, and it will render at the root of your document. It does not need to be wrapped in a
 * `SheetArea`.
 */
export default function Sheet(props: Props) {
  return (
    <SheetContext.Consumer>
      {setSheetVisible => <InternalSheet {...props} setSheetVisible={setSheetVisible} />}
    </SheetContext.Consumer>
  );
}
