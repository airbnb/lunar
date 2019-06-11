import React from 'react';
import withStyles, { css, WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import Spacing from '@airbnb/lunar/lib/components/Spacing';

export type SplitPaneProps = {
  sidePane: React.ReactNode;
  mainPane: React.ReactNode;
  collapsible?: boolean;
  minWidth?: string | number;
  maxWidth?: string | number;
  fixedWidth?: string | number;
  percentWidth?: number;
  iconOpen?: any;
  iconClosed?: any;
  buttonTop?: number;
  background?: string;
  rightSide?: boolean;
};

export type SplitPaneState = {
  collapsed: boolean;
};

/** A symmetrical two-column layout with optional top and side navigation. */
class SidePanel extends React.Component<SplitPaneProps & WithStylesProps, SplitPaneState> {
  public static defaultProps = {
    background: 'white',
    buttonTop: 16,
    collapsible: true,
    iconOpen: IconChevronLeft,
    iconClosed: IconChevronRight,
    maxWidth: Infinity,
    minWidth: 0,
    rightSide: false,
  };

  constructor(props: SplitPaneProps & WithStylesProps) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  private toggleSidePane = () => {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }));
  };

  public render() {
    const {
      background,
      buttonTop,
      collapsible,
      iconOpen,
      iconClosed,
      sidePane,
      mainPane,
      styles,
      theme,
      percentWidth,
      minWidth,
      maxWidth,
      fixedWidth,
      rightSide,
    } = this.props;
    const { collapsed } = this.state;

    const defaultWidth = percentWidth ? `${percentWidth}%` : `${40 * theme!.unit}px`;

    const buttonBackgroundColor = collapsed ? theme!.color.accent.bg : background;

    const sidePanelStyle = {
      width: collapsed ? 0 : fixedWidth || defaultWidth,
      maxWidth,
      minWidth: collapsed ? 0 : minWidth,
      flex: fixedWidth
        ? `0 0 ${collapsed ? 0 : fixedWidth}px`
        : `0 0 ${collapsed ? 0 : defaultWidth}`,
      padding: collapsed ? 0 : 3 * theme!.unit,
      borderRightColor:
        !rightSide && collapsed ? buttonBackgroundColor : theme!.color.core.neutral[1],
      borderLeftColor:
        rightSide && collapsed ? buttonBackgroundColor : theme!.color.core.neutral[1],
    };

    const Icon = collapsed ? iconClosed : iconOpen;

    const collapseButtonStyle = {
      top: buttonTop,
      background: buttonBackgroundColor,
      borderRightColor:
        !rightSide && !collapsed ? buttonBackgroundColor : theme!.color.core.neutral[1],
      borderLeftColor:
        rightSide && !collapsed ? buttonBackgroundColor : theme!.color.core.neutral[1],
    };

    const mainPanelColorStyle = {
      background: background || theme!.color.accent.bg,
    };

    const collapseButton = (
      <button
        type="button"
        {...css(
          collapseButtonStyle,
          styles.collapseButton,
          collapsed && !rightSide && styles.collapseButtonHiddenLeft,
          collapsed && rightSide && styles.collapseButtonHiddenRight,
          !collapsed && !rightSide && styles.collapseButtonVisibleLeft,
          !collapsed && rightSide && styles.collapseButtonVisibleRight,
        )}
        onClick={this.toggleSidePane}
      >
        <Spacing vertical={1}>
          <Icon color={theme!.color.core.neutral[5]} size="1.1rem" />
        </Spacing>
      </button>
    );

    return (
      <div {...css(styles.splitPane)}>
        {rightSide && <div {...css(styles.mainPanel, mainPanelColorStyle)}>{mainPane}</div>}
        <div
          {...css(
            styles.sidePanel,
            rightSide && styles.sidePanelRight,
            !rightSide && styles.sidePanelLeft,
            sidePanelStyle,
          )}
        >
          {collapsible && collapseButton}
          <div {...css(styles.sidePanelInner)}>{!collapsed && sidePane}</div>
        </div>
        {!rightSide && <div {...css(styles.mainPanel, mainPanelColorStyle)}>{mainPane}</div>}
      </div>
    );
  }
}

export default withStyles(
  ({ unit, color }) => ({
    splitPane: {
      display: 'inline-flex',
      minHeight: `calc(100vh - ${8 * unit}px)`,
      width: '100%',
    },
    mainPanel: {
      padding: unit * 4,
      overflow: 'auto',
      flexGrow: 1,
    },
    sidePanel: {
      wordBreak: 'break-word',
      background: color.accent.bg,
      height: `calc(100vh - ${8 * unit}px)`,
      position: 'sticky',
      top: 8 * unit,
    },

    sidePanelLeft: {
      borderRight: '1px solid',
    },

    sidePanelRight: {
      borderLeft: '1px solid',
    },

    sidePanelInner: {
      height: '100%',
      overflow: 'auto',
      zIndex: 100,
    },

    collapseButton: {
      cursor: 'pointer',
      position: 'absolute',
      border: `1px solid ${color.core.neutral[1]}`,
      padding: 0,
      borderRadius: 0,
    },

    collapseButtonVisibleRight: {
      left: -1,
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
      borderLeft: '1px solid',
    },
    collapseButtonHiddenRight: {
      right: 0,
      borderBottomLeftRadius: 4,
      borderTopLeftRadius: 4,
      borderRight: '1px solid',
    },

    collapseButtonVisibleLeft: {
      right: -1,
      borderBottomLeftRadius: 4,
      borderTopLeftRadius: 4,
      borderRight: '1px solid',
    },
    collapseButtonHiddenLeft: {
      left: 0,
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
      borderLeft: '1px solid',
    },
  }),
  {
    passThemeProp: true,
  },
)(SidePanel);
