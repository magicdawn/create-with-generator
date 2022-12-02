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

```js
require('create-with-generator').runGenerator({ __dirname })
```

### options

| key         | type     | required | description                                                                                                                                   |
| ----------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `__dirname` | `string` | `true`   | your `__dirname`, used to detect who is calling `runGenerator`, if running in a symlinked environment, you need pass `__dirname` explicitly   |
| `name`      | `string` | `false`  | generator name, can be bareName(like `augular` or `@scope/augular` ) or fullname name(like `generator-angular` or `@scope/generator-angular`) |
| `subname`   | `string` | `false`  | generator subname, defaults empty, stands for `yo <name>:app`                                                                                 |

## Usage Guide

example we have `generator-angular`, and we want to build the `create-angular` package

- init package.json via `npm init`
- install deps: `pnpm add create-with-generator 'generator-angular@*'`
- add `index.js` with contents below
- add `main` & `bin` field of package.json to `index.js`
- tweak your package.json as you want, then run `npm publish`
- start create using `pnpm create angular`

### `index.js`

```js
require('create-with-generator').runGenerator({ __dirname })
```

### `package.json`

```json
{
  "main": "index.js",
  "bin": "index.js"
}
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
