A basic form to provide feedback.

```jsx
<FeedbackForm
  categories={{
    chat: 'Chat',
    phone: 'Phone',
  }}
  channel="Lunar"
  channelID={1}
  teamID={2}
  onSubmit={debug('onSubmit')}
/>
```

Without bug reporting.

```jsx
<FeedbackForm
  categories={{
    chat: 'Chat',
    phone: 'Phone',
  }}
  channel="Lunar"
  channelID={1}
  teamID={2}
  onSubmit={debug('onSubmit')}
  disableBugReporting
/>
```
