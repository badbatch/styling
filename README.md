<p align="center">
  <img alt="Styling" src=".github/images/styling-logo.png">
</p>

A zero-runtime CSS-in-JS library that extracts css into stylesheets at compile time.

[![Build Status](https://travis-ci.com/badbatch/styling.svg?branch=master)](https://travis-ci.com/badbatch/styling)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![codecov](https://codecov.io/gh/badbatch/styling/branch/master/graph/badge.svg)](https://codecov.io/gh/badbatch/styling)

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

Styling requires __three changes__ to the way you already write your styled components.

The __first change__ may or may not be a big one, depending on how you currently structure your code. Styling requires
all styled components related to React component to be named exports in their own file and the file has to be called
either `styling.{ext}` or `{name}.styling.{ext}`.

The __second change__ is Styling requires a list of the props a styled component cares about - those that change styles
it generates - to be passed into the component in the order of precedence you want the styles each prop generates to
have over each other. [Read more about the prop list](#the-prop-list).

The __third change__ is the way you supply a theme to the components. Because the styles are generated at compile time,
you need to tell Styling where it can find the theme for a given component so it can load the theme and use it when
generating the styles. [Read more about configuration](#configuration).

And that is pretty much it... apart from the obligatory caveat around [IE11 support](#ie11-support) (damn you IE11!).

Once you have configured babel and Styling, you can run your usual transpilation/compilation with babel. Styling will
generate the styles for its components and write them to an output directory.

It will also replace each `styled` component with a `styling` component. Each `styling` component is provided a map of
prop list combo keys to css class names, which it uses at runtime to figure out which class names to apply based on the
props it receives.

Below is a really simplified example to get you started.

```text
# folder structure

- babel.config.js
- package.json
- src/
  - button/
    - index.jsx
    - styling.js
  - theme/
    - index.js
```

```javascript
// babel.config.js

module.exports = () => ({
  plugins: [
    // other plugins
    [
      '@styling/babel-plugin-transform-styling',
      {
        logLevel: 'error',
      },
    ],
  ],
  presets: [
    // presets
  ],
});
```

```json
// package.json

{
  // other config
  "styling": {
    "outputPath": "./lib/css",
    "selectorPrefix": "button",
    "theme": "./src/theme/index.js"
  }
}
```

```javascript
// src/button/index.jsx

import React from 'react';
import { Primary, Secondary } from './styling';

export default function Button({ variant, ...rest }) {
  return variant === 'primary' ? <Primary {...rest} /> : <Secondary {...rest} />;
}
```

```javascript
// src/button/styling.js

import styled from '@styling/styled';

const propList = ['disabled', 'error'];

export const Primary = styled('button', propList)`
  background-color: ${props => props.disabled ? props.theme.grey : props.theme.blue};
  border-color: ${props => props.disabled ? props.theme.grey : props.theme.blue};
  color: white;
  ${props => props.error && `outline-color: ${props.theme.red}`};
`;

export const Secondary = styled('button', propList)`
  background-color: white;
  border-color: ${props => props.disabled ? props.theme.grey : props.theme.blue};
  color: ${props => props.disabled ? props.theme.grey : props.theme.blue};
  ${props => props.error && `outline-color: ${props.theme.red}`};
`;
```

```javascript
// src/theme/index.js

export default {
  blue: 'blue',
  grey: 'grey',
  red: 'red',
};
```

Then run the command below and you should see the following folders and files.

```shell
babel src --out-dir lib/main --config-file ./babel.config.js
```

```text
# folder structure

- babel.config.js
- package.json
- lib/
  - css/
    - button/
      - styling.css
  - main/
    - button/
      - index.js
      - styling.js
    - theme/
      - index.js
- src/
  - button/
    - index.jsx
    - styling.js
  - theme/
    - index.js
```

```javascript
// lib/main/button/styling.js

import styling from '@styling/core';

export const Primary = styling('button', ['disabled', 'error'], ['disabled', 'error'], {
  "base": "button__primary-1842608486",
  "disabled": "button__primary-1842608486--disabled",
  "error": "button__primary-1842608486--error",
});

export const Secondary = styling('button', ['disabled', 'error'], ['disabled', 'error'], {
  "base": "button__secondary-1842608487",
  "disabled": "button__secondary-1842608487--disabled",
  "error": "button__secondary-1842608487--error",
});
```

```css
/* lib/css/button/styling.css */

.button__primary-1842608486 {
  background-color: blue;
  border-color: blue;
  color: white;
}

.button__primary-1842608486--disabled {
  background-color: grey;
  border-color: grey;
}

.button__primary-1842608486--error {
  outline-color: red;
}

.button__secondary-1842608487 {
  background-color: white;
  border-color: blue;
  color: blue;
}

.button__secondary-1842608487--disabled {
  border-color: grey;
  color: grey;
}

.button__secondary-1842608487--error {
  outline-color: red;
}
```

Once you have the above example working, you could apply the library to one of your existing React components
that use styled components and see what the output from that looks like. The library can work alongside other
styled component libraries so it is possible to roll it out incrementally.

### The prop list

The list of the props a styled component cares about, along with the theme, are used to generate
the styles for a component. The props that can be used to drive styles in a Styling styled component can either be a
boolean, an "enum" or a string/number value.

A boolean prop is represented in the prop list as the name of the prop. An "enum" is represented in the prop
list as an array with the first entry being the name of the prop and the second being an array of the possible string
values. A string/number value is represented in the prop list as an array with the name of the prop as the first entry
and a fallback value as the optional second entry.

```typescript
type PropList = Array<string | [string, string[]] | [string, (string | number)?]>
```

As stated above, the order of the props in the list is important. Styling uses the order to determine the order class
names get written to a stylesheet. The class names generated for the first entry in the prop list will have a higher
precedence than those generated for the second entry, and so on.

Below is an example of how to change a traditional styled component you will be familiar with into a Styling styled
component using the `propList`.

### Configuration

To mimic the way traditional styled components are themed using a `Provider` higher order component, Styling uses
configuration objects that can be declared anywhere in a project's folder structure by creating a `styling.config.js`
file or adding a `styling` object to a `package.json` file.

Each time a styling file is parsed, Styling loads the config for that file by working its way up from the file's
directory to the project root, loading and merging configs as it goes; the closer to the component the config, the
more precedence it is given when merging configs.

Below are the type definitions for the styling configuration object accompanied by descriptions of what each
property does.

```typescript
interface PathConfig {
  // Relative path to file
  path: string;
  // Directory to use when resolving relative path
  workingDir: "current" | "source" | "package";
}

interface RawStylingConfig {
  // Relative path to css output directory
  outputPath?: string | PathConfig;
  // An object of theme overrides
  overrides?: PlainObject;
  // Prefix for all class names
  selectorPrefix?: string;
  // Path to theme or theme object
  theme?: string | PathConfig | PlainObject;
}
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

If this is not enough, you can set breakpoints in the Styling source files in `node_modules/@styling` and run babel
directly through the vscode launch configuration. The debugger will stop on the breakpoints and you can follow the flow
for a given Styling file from start to finish. Below is an example configuration from a component library monorepo.

```json
{
  "type": "node",
  "request": "launch",
  "name": "Run babel on component",
  "program": "${workspaceFolder}/node_modules/.bin/babel",
  "cwd": "${workspaceFolder}/packages/button",
  "args": [
    "src",
    "--out-dir", "lib/main",
    "--config-file", "../../babel.config.js"
  ],
  "console": "integratedTerminal",
  "protocol": "inspector",
  "stopOnEntry": false
}
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

## Other defects

This library is still in its infancy, so you may encounter bugs at some point while using it. Right now, you can search
the codebase for `TODO` to find out what has been flagged up internally as needing to be looked at. If you do have a
problem, please raise an issue and I'll look at it.

## Changelog

Check out the [features, fixes and more](CHANGELOG.md) that go into each major, minor and patch version.

## License

Styling is [MIT Licensed](LICENSE).
