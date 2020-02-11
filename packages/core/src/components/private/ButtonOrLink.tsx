import React from 'react';
import removeFocusOnMouseUp from '../../utils/removeFocusOnMouseUp';
import IconAffix from './IconAffix';

export type ButtonOrLinkTypes = HTMLAnchorElement | HTMLButtonElement;

export type ButtonOrLinkProps = {
  [prop: string]: unknown;
  /** Icon to display at the end the content. */
  afterIcon?: React.ReactNode;
  /** Icon to display at the start the content. */
  beforeIcon?: React.ReactNode;
  /** Content within the button or link. */
  children: NonNullable<React.ReactNode>;
  /** Whether the element is disabled. */
  disabled?: boolean;
  /** Apply flexbox styles to icons. */
  flexAlign?: boolean;
  /** Render as an anchor link with a URL. */
  href?: string;
  /** Whether the element is loading. */
  loading?: boolean;
  /** Callback fired when the element is clicked. */
  onClick?: (event: React.MouseEvent<ButtonOrLinkTypes>) => void;
  /** Callback fired when the element is released. */
  onMouseUp?: (event: React.MouseEvent<ButtonOrLinkTypes>) => void;
  /** When a link, open the target in a new window. */
  openInNewWindow?: boolean;
  /** Rel attribute override for if the component has an href */
  rel?: string;
  /** Add a data-tracking-name attribute. */
  trackingName?: string;
  /** When a button, the type of button. */
  type?: 'button' | 'submit' | 'reset';
};

export default class ButtonOrLink extends React.Component<ButtonOrLinkProps> {
  static defaultProps = {
    afterIcon: null,
    beforeIcon: null,
    disabled: false,
    flexAlign: false,
    href: '',
    loading: false,
    openInNewWindow: false,
    type: 'button',
  };

  // Intercept click to handle disabled state
  private handleClick = (event: React.MouseEvent<ButtonOrLinkTypes>) => {
    if (this.props.disabled) {
      event.preventDefault();
    } else if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  // Remove outline after click
  private handleMouseUp = (event: React.MouseEvent<ButtonOrLinkTypes>) => {
    removeFocusOnMouseUp(event);

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  render() {
    const {
      afterIcon,
      beforeIcon,
      children,
      disabled,
      flexAlign,
      href,
      loading,
      openInNewWindow,
      rel,
      trackingName,
      type,
      ...restProps
    } = this.props;
    const Tag = href ? 'a' : 'button';
    const props: JSX.IntrinsicElements['a'] & JSX.IntrinsicElements['button'] = {};

    // Determine props based on element type
    if (href) {
      props.href = href;
      props.rel = rel;

      if (openInNewWindow) {
        props.target = '_blank';

        if (props.rel === undefined) {
          props.rel = 'noopener noreferrer';
        }
      }
    } else {
      props.disabled = disabled || loading || false;
      props.type = type || 'button';
    }

    return (
      // @ts-ignore [ts] JSX element type 'Component' does not have any construct or call signatures. [2604]
      <Tag
        {...restProps}
        {...props}
        data-tracking-name={trackingName}
        onClick={this.handleClick}
        onMouseUp={this.handleMouseUp}
      >
        {!loading && beforeIcon && (
          <IconAffix before flex={flexAlign}>
            {beforeIcon}
          </IconAffix>
        )}

        <span>{children}</span>

        {!loading && afterIcon && (
          <IconAffix after flex={flexAlign}>
            {afterIcon}
          </IconAffix>
        )}
      </Tag>
    );
  }
}
