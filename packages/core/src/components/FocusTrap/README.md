Focus will remain trapped (try tabbing around).

```jsx
import Button from '../Button';
import Input from '../Input';
import TextArea from '../TextArea';

<FocusTrap>
  <Input name="trap-input" label="Input" onChange={debug('onChange')} />

  <TextArea name="trap-textarea" label="Textarea" onChange={debug('onChange')} />

  <Button>Action</Button>
</FocusTrap>;
```
