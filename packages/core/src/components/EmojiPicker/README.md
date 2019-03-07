Render a picker.

```jsx
<div style={{ position: 'relative', width: 300, height: 410 }}>
  <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
    <EmojiPicker
      disableAutoFocus
      onClosePicker={debug('onClosePicker')}
      onSelectEmoji={emoji => console.log(emoji)}
    />
  </div>
</div>
```

_The consuming app should handle the display and positioning of the picker._
