The primary features of `AppShell` is toast management and contextual page data.

```jsx
import uuid from 'uuid/v4';
import Button from ':core/components/Button';
import AppContext from './src/components/AppContext';
import AppShell from './src';

<AppShell name="Lunar">
  <div>
    <AppContext.Consumer>
      {({ addSuccessToast, addFailureToast, addPageData, data }) => (
        <div>
          <Button
            onClick={() => {
              addSuccessToast('Changes have been saved.', { duration: 0 });
            }}
          >
            Display success toast that never disappears
          </Button>

          <br />
          <br />

          <Button
            onClick={() => {
              addFailureToast('Changes failed to save!', { title: 'Oops' });
            }}
          >
            Display error toast with a custom title
          </Button>
        </div>
      )}
    </AppContext.Consumer>
  </div>
</AppShell>;
```
