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

With a reset button.

```jsx
<FormActions showReset />
```

With small buttons in a processing state.

```jsx
<FormActions showReset small processing />
```
