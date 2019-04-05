# Contributing

## 🛠 Developing

Lunar at minimum requires Node v8.9 and NPM v6.8. To begin, run `npm install` and
`npm run bootstrap`.

- Builds can be ran with `npm run build`.
- Testing can be ran with `npm run jest`.
- Linting can be ran with `npm run lint`.
- Type checking can be ran with `npm run type`.
- To run the 3 previous tasks, use `npm run test`.
- Styleguide can be previewed with `npm run sg` (it spins up a localhost server).

All code is formatted using Prettier with `npm run prettier`.

## 📄 Pull Request Titles

The PR title is also the changelog line item, and as such, should be clear, concise, and easily
understandable when groking the changelog.

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- When adding a new component, be direct and explicit ("Add Button component" or "New Button
  component").
- When updating a component, prefix with the component name wrapped in parens ("new(Button): Add new
  size prop").
- When touching a non-component, be as descriptive as possible ("Update NewRelic metrics config").

### Release Prefixes

Lunar utilizes [lerna](https://lernajs.io/) and
[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) for
automatic releases when a PR is merged to master. For this to work correctly, all PR titles must be
prefixed with one of the following tags defined in the
[beemo preset](https://github.com/beemojs/conventional-changelog-beemo).

_**Do not**_ label PRs as breaking, as breaking changes follow a defined release cycle.

## 💥 Major Release Cycles

Lunar abides semantic versioning with the exception of major releases, as they are split into
monthly cycles. If no breaking changes have occurred within the past month, the release will simply
be skipped.

That being said, this process is entirely flexible, as we may be required to cut a major release
outside of this timeline depending on the severity of the issue.

### How do we handle breaking changes?

Instead of introducing a breaking change, you would implement what we call a "deprecation bridge". A
bridge will support both the old code and new code in parallel, with the old code being wrapped with
deprecation logs. These logs will emit a warning to the browser console in development only (using
`__DEV__` blocks).

When the next major release cycle occurs, all deprecation bridges will be audited, and the old code
will be removed.

### Why have we chosen the cycle approach?

Major releases are great in theory, as it provides an explicit contract between consumer and
provider. However, in practice, this is not the case, as major releases have quite a few downsides
in the JavaScript ecosystem.

When multiple packages within an application are using different major versions of the same library,
you'll encounter what's called "dependency hell" within NPM/Yarn. One or all of the following
outcomes may happen:

- NPM has a difficult time resolving the dependency graph correctly, resulting in failed
  `npm install`s and builds.
- When peer dependencies are involved, the consuming application is blocked from updating their own
  dependencies until all packages are on the same major version. This requires upstream work and a
  heavier migration cost.
- Having multiple major versions of a package vastly increases the bundle size of your project, as
  you now have multiple copies of very similar (or near identical) code in your bundle. This is a
  big no-no.

With that being said, our current release cycle still has these problems, but with releases spaced
out every month or so, it provides a definite roadmap with less friction, and easier time and
resource allocation.

## 📈 Code Coverage

All files require tests, and all tests must pass a minimum of _85%_ code coverage, and a global test
suite coverage of _85%_. To verify code coverage status, simply run `npm run jest`, which collects
coverage automatically. You'll see a summary like the following when the process is complete.

```
=============================== Coverage summary ===============================
Statements   : 97.84% ( 1808/1848 )
Branches     : 92.39% ( 1178/1275 )
Functions    : 97.36% ( 517/531 )
Lines        : 97.91% ( 1783/1821 )
================================================================================

Test Suites: 149 passed, 149 total
Tests:       1009 passed, 1009 total
Snapshots:   163 passed, 163 total
Time:        14.943s
Ran all test suites.
```

For a more detailed breakdown experience, a coverage report is generated at
`./coverage/lcov-report/index.html`. This report will breakdown each file, by multiple coverage
types (statements, branches, functions, lines), with the ability to see line-by-line coverage.
Extremely helpful in meeting the threshold.

> Branch coverage is slightly lower than the others, so don't worry too much about it.

## ⚙️ TypeScript Patterns

A few guidelines and patterns when working with TypeScript:

- Interfaces and types must be exported when they're part of the files public API (annotating an
  argument, return, property, generic, etc).
- Use
  [TypeScript's type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
  for constants and primitive variables.

### React

- Non-required props must be marked as optional with `?`.
- Prop types may extend other prop types _if_ all the inherited props are used.
- Prop types _must not_ extend HOC type (like `WithStylesProps`). Instead use an intersection at the
  component's generics callsite.

```jsx
class Button extends React.Component<ButtonProps & WithStylesProps, ButtonState> {}
```
