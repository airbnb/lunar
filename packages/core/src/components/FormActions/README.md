A pair of form action buttons.

```jsx
<FormActions />
```

With custom text and click handlers.

```jsx
<FormActions
  cancelText="Close"
  continueText="Send"
  onCancel={debug('onCancel')}
  onContinue={debug('onContinue')}
/>
```

With no cancel button.

```jsx
<FormActions hideCancel />
```

With a reset button and a danger state.

```jsx
<FormActions showReset danger />
```

With small buttons in a processing state.

```jsx
<FormActions showReset small processing />
```
