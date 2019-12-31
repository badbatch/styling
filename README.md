# styling

A css-in-js library that extracts css into stylesheets at build time.

[![Build Status](https://travis-ci.org/dylanaubrey/styling.svg?branch=master)](https://travis-ci.org/dylanaubrey/styling)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

Styling is structured as a [monorepo](https://github.com/lerna/lerna), so each package is published to npm under the
`@styling` scope and can be installed in a project in the same way as any other npm package.

```shell
yarn add @styling/<package>
```

## Packages

* [@styling/babel-plugin-transform-styling](packages/babel-plugin-transform-styling)
* [@styling/core](packages/core)
* [@styling/styled](packages/styled)
* [@styling/types](packages/types)

## Changelog

Check out the [features, fixes and more](CHANGELOG.md) that go into each major, minor and patch version.

## License

Styling is [MIT Licensed](LICENSE).
