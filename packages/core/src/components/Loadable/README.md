Factory a re-usable loadable component (preferred approach).

```jsx static
const Component = Loadable.factory(() => import('./Foo.tsx'), { noError: true });

<Component customProp="abc" />;
```

Render a component after importing it.

```jsx static
<Loadable component={() => import('./Foo.tsx')} />
```

Display a custom loading component.

```jsx static
<Loadable component={() => import('./Foo.tsx')} loading={<Shimmer />} />
```

Display a custom error. Supports either a render function or an element.

```jsx static
<Loadable component={() => import('./Foo.tsx')} error={error => <Failure error={error} />} />
// Or
<Loadable component={() => import('./Foo.tsx')} error={<Failure />} />
```

Disable the loading delay.

```jsx static
<Loadable component={() => import('./Foo.tsx')} delay={0} />
```

Take full control of the rendering process by using function children.

```jsx static
<Loadable component={() => import('./Foo.tsx')} delay={0}>
  {Foo => <Foo customProp="abc" extraProp />}
</Loadable>
```
