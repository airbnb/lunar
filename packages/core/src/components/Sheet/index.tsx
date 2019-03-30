import React from 'react';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import { ESCAPE } from '../../keys';
import focusableSelector from '../../utils/focusableSelector';
import IconButton from '../IconButton';
import FocusTrap from '../FocusTrap';
import Portal from '../Portal';
import T from '../Translate';
import SheetArea from './SheetArea';
import SheetContext, { Context } from './SheetContext';
import toRGBA from '../../utils/toRGBA';
import { Z_INDEX_PORTAL } from '../../constants';

export type Props = {
  /** Invoked when the sheet close button is pressed, or when escape is pressed when displaying a portal sheet. This function should set the `visible` prop to false. */
  onClose: () => void;
  /** The contents of the sheet. */
  children: NonNullable<React.ReactNode>;
  /** Determines if the sheet is currently visible or not. */
  visible?: boolean;
  /** Determines if the sheet is displayed as a full-page view that covers the entire application. */
  portal?: boolean;
  /** Determines if the sheet has a side gap. */
  gap?: boolean;
  /** Determines if the sheet animates in/out. */
  noAnimation?: boolean;
};

export type PrivateProps = {
  /** @ignore */
  setSheetVisible: Context;
};

export type State = {
  animating: boolean;
};

/** @ignore */
class BaseSheet extends React.Component<Props & PrivateProps & WithStylesProps, State> {
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
    const { gap, theme, styles, portal, visible, children } = this.props;

    if (!visible && !animating) {
      return null;
    }

    const closeText = T.phrase('Close', {}, 'Close a sheet popup');

    const sheetContent = (
      <div
        aria-modal
        role="dialog"
        ref={this.sheetRef}
        onAnimationEnd={this.handleAnimationEnd}
        {...css(
          styles.sheet,
          portal && styles.sheet_portal,
          !gap && animating && styles.sheet_animating,
          !gap && animating && !visible && styles.sheet_out,
          !gap && animating && visible && styles.sheet_in,
        )}
      >
        <FocusTrap disabled={!portal}>
          <div
            {...css(
              styles.container,
              gap && styles.container_gap,
              portal && animating && styles.container_animating,
            )}
          >
            {gap && (
              <button
                {...css(styles.gap)}
                aria-label={closeText}
                type="button"
                onClick={this.handleClose}
              />
            )}

            <div
              ref={this.wrapperRef}
              onAnimationEnd={this.handleAnimationEnd}
              {...css(
                styles.wrapper,
                gap && styles.wrapper_gap,
                gap && animating && styles.sheet_animating,
                gap && animating && !visible && styles.sheet_slide_out,
                gap && animating && visible && styles.sheet_slide_in,
              )}
            >
              <div {...css(styles.closeButton, gap && styles.closeButton_rightAlign)}>
                <IconButton onClick={this.handleClose}>
                  <IconClose accessibilityLabel={closeText} size={3 * theme!.unit} />
                </IconButton>
              </div>

              <div {...css(styles.content)}>{children}</div>
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

    closeButton: {
      padding: 4 * unit,
      paddingBottom: 0,
    },

    closeButton_rightAlign: {
      textAlign: 'right',
    },

    content: {
      marginTop: 2 * unit,
      padding: 4 * unit,
      paddingTop: 0,
      flex: 1,
    },
  }),
  {
    passThemeProp: true,
  },
)(BaseSheet);

export { SheetArea, SheetContext };

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
