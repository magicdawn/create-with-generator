# create-with-generator

> use `pnpm create` / `yarn create` / `npm init` with yeoman generator

[![Build Status](https://img.shields.io/github/workflow/status/magicdawn/create-with-generator/ci/main.svg?style=flat-square)](https://github.com/magicdawn/create-with-generator/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/create-with-generator.svg?style=flat-square)](https://codecov.io/gh/magicdawn/create-with-generator)
[![npm version](https://img.shields.io/npm/v/create-with-generator.svg?style=flat-square)](https://www.npmjs.com/package/create-with-generator)
[![npm downloads](https://img.shields.io/npm/dm/create-with-generator.svg?style=flat-square)](https://www.npmjs.com/package/create-with-generator)
[![npm license](https://img.shields.io/npm/l/create-with-generator.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ pnpm add create-with-generator
```

## API

index.js

```js
module.exports = require('create-with-generator').runGenerator()
```

### options

| key         | type     | required | description                                                                                                                                   |
| ----------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | `string` | `false`  | generator name, can be bareName(like `augular` or `@scope/augular` ) or fullname name(like `generator-angular` or `@scope/generator-angular`) |
| `subname`   | `string` | `false`  | generator subname, defaults empty, stands for `yo <name>:app`                                                                                 |
| `__dirname` | `string` | `false`  | your `__dirname`, used to detect who is calling `runGenerator`, if running in a symlinked environment, you need pass `__dirname` explicit     |

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
