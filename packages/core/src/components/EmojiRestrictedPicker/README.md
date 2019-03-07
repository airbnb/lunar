Render a restricted picker.

```jsx
<div style={{ position: 'relative', width: 245, height: 135 }}>
  <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
    <EmojiRestrictedPicker
      onClosePicker={debug('onClosePicker')}
      onSelectEmoji={emoji => console.log(emoji)}
    />
  </div>
</div>
```

_The consuming app should handle the display and positioning of the picker._
