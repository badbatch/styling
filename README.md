# styling

A zero-runtime CSS-in-JS library that extracts css into stylesheets at compile time.

[![Build Status](https://travis-ci.com/dylanaubrey/styling.svg?branch=master)](https://travis-ci.com/dylanaubrey/styling)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![codecov](https://codecov.io/gh/dylanaubrey/styling/branch/master/graph/badge.svg)](https://codecov.io/gh/dylanaubrey/styling)

## Why

Popular CSS-in-JS libraries such as Styled Components or Emotion come with a performance cost because they write styles
to the head of the document at runtime. The more dynamic the styles, the more expensive this cost becomes. This poses a
problem for end-users as a major draw of these libraries is how they allow you to write highly dynamic styles.

But what if this overhead could be moved upstream to when an application is compiled? This way end-users could benefit
from everything these libraries offer without incurring the runtime performance cost. Styling attempts to solve this
issue without sacrificing functionality.

## Installation

Styling is structured as a [monorepo](https://github.com/lerna/lerna), so each package is published to npm under the
`@styling` scope and can be installed in a project in the same way as any other npm package.

```shell
yarn add @styling/<package>
```

`@styling` packages are linked to each other via peer dependencies, so you will need to install all of them explicitly.

```shell
yarn add @styling/babel-plugin-transform-styling @styling/core @styling/file-change @styling/helpers
  @styling/styled @styling/types --dev
```

## Packages

* [@styling/babel-plugin-transform-styling](packages/babel-plugin-transform-styling)
* [@styling/core](packages/core)
* [@styling/file-change](packages/file-change)
* [@styling/helpers](packages/helpers)
* [@styling/styled](packages/styled)
* [@styling/types](packages/types)

## Usage

Styling works as a babel plugin and requires just __two changes__ to the way you already write your styled components.

The __first change__ may or may not be a big one, depending on how you currently structure your code. Styling requires
all styled components related to React component to be named exports in their own file and the file has to be called
either `styling.{ext}` or `{name}.styling.{ext}`.

The __second change__ is Styling requires a list of the props a styled component cares about - those that change styles it
generates - to be passed into the component in the order of precedence you want the styles each prop generates to have
over each other. [Read more about the prop list](#proplist-rules).

Below is an example of how to change a traditional styled component you will be familiar with into a styling component.
And that is pretty much it. [Read more about IE11 support](#ie11-support).

Under the hood, the plugin generates the styles for each component in the file using their prop lists and replaces each
`styled` component with a `styling` component. Each `styling` component is provided a map of prop list combo keys to
css class names, which it uses at runtime to figure out which class names to apply based on the props it receives.

```javascript
// traditional styled component
export const PrimaryButton = styled.button`
  background-color: ${props => (props.disabled ? getDisabledBackgroundColor : getPrimaryColor)};
  color: ${getSecondaryColor};

  &[disabled],
  :disabled {
    background-color: ${getDisabledBackgroundColor};
    color: ${getSecondaryColor};
  }

  &:focus,
  &:hover {
    ${buttonActiveStyles};
  }
`;

// styling styled component
const propList = [
  'block',
  'inverse',
  'disabled',
  'error',
  'externalText',
  'noText',
  ['size', ['xs', 'sm', 'md']],
  'stretch',
  ['variant', ['primary', 'secondary', 'link']],
];

export const PrimaryButton = styled('button', propList)`
  background-color: ${props => (props.disabled ? getDisabledBackgroundColor : getPrimaryColor)};
  color: ${getSecondaryColor};

  &[disabled],
  :disabled {
    background-color: ${getDisabledBackgroundColor};
    color: ${getSecondaryColor};
  }

  &:focus,
  &:hover {
    ${buttonActiveStyles};
  }
`;
```

### propList

The props that can be used to drive styles in a Styling styled component can either be a boolean, an "enum"
or a string/number value. This might sound restrictive at first, but having build and maintained a component library
with some 100 components I have found this caters for all use cases.

A boolean prop is represented in the prop list as the name of the prop. An "enum" is represented in the prop
list as an array with the first entry being the name of the prop and the second being an array of the possible string
values. A string/number value is represented in the prop list as an array with the name of the prop as the first entry
and a fallback value as the optional second entry.

As stated above, the order of the props in the list is important. Styling uses the order to determine the order class
names get written to a stylesheet. The class names generated for the first entry in the prop list will have a higher
precedence than those generated for the second entry, and so on.

```typescript
type PropList = Array<string | [string, string[]] | [string, (string | number)?]>
```

## IE11 support

IE11 does not support css variables and Styling uses css variables when a string/number value is used in the prop list.
At compile time, references to the value are replaced with a var function/css variable and then at runtime the
string/number value is assigned to the css variable inline.

If you need to support IE11 then you cannot use string/number values in the prop list. Again, this may seem restrictive,
but I have found this mechanism for driving styles is not as common as one might expect and is usually straightforward
to refactor into an "enum".

## Debugging

The Styling babel plugin excepts a `logLevel` option, which you can use to enable various levels of logging. This
can help debug problems compiling your code, should any occur... hopefully not!

```js
module.exports = {
  plugins: [
    [
      '@styling/babel-plugin-transform-styling',
      {
        logLevel: 'info',
      },
    ],
  ],
};
```

## Troubleshooting

### Styling is not resolving module aliases

Styling will not try and resolve module path aliases, there are already Babel plugins to do that such as
`babel-plugin-module-resolver`. Make sure you have such a plugin installed in your project and it runs before
`@styling/babel-plugin-transform-styling`.

### Rollup throws error telling me to set modules to false in my babel config

This is caused by the Rollup preflight checks and happens when you are running multiple builds concurrently and one
of those builds has modules set to "commonjs" in babel config. The way to resolve this is to upgrade
`rollup-plugin-babel` to v5 and set the newly added `skipPreflightCheck` flag to true.

## Changelog

Check out the [features, fixes and more](CHANGELOG.md) that go into each major, minor and patch version.

## License

Styling is [MIT Licensed](LICENSE).
