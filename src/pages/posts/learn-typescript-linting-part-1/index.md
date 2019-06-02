---
date: "2019-05-31"
title: "Learn TypeScript Linting Part 1"
tags: ['typescript', 'linting', 'eslint']
excerpt: "Part 1 of the Learn TypeScript Linting series. This post covers TypeScript and ESLint."
featuredImage: ""
---

# Learn TypeScript Linting Part 1

Written by: Ethan Arrowood

## TypeScript and ESLint

This guide will show you how to set up [ESLint](https://eslint.org/) with a [TypeScript](https://www.typescriptlang.org/) project. The guide is broken up into three sections. The first two are about setting up ESLint and configuring it to work with TypeScript. The last section contains additional context and a list of resources for those interested in learning more. Make use of the table of contents and the `[toc]` shortcuts to better navigate this article. 

[Part 2](/posts/learn-typescript-linting-part-2) of this guide covers integrating popular styling formatters [Standard](https://standardjs.com/) and [Prettier](https://prettier.io/).

### Table of Contents
- [1 Getting Started](#1-getting-started)
- [2 Adding ESLint](#2-adding-eslint)
  - [2.1 Initializing .eslintrc](#21-initializing-eslintrc)
    - [2.1.1 Specifying environments](#211-specifying-environments)
    - [2.1.2 Specifying ecmaVersion](#212-specifying-ecmaVersion)
  - [2.2 Creating ESLint npm script](#22-Creating-ESLint-npm-script)
  - [2.3 Executing ESLint](#23-executing-eslint)
  - [2.4 Fixing an ESLint warning](#24-fixing-an-eslint-warning)
  - [2.5 Configuring ESLint](#25-configuring-eslint)
  - [2.6 Additional ESLint rule configuration](#26-additional-eslint-rule-configuration)
  - [2.7 Fixing unused variable definition error from type import](#27-fixing-unused-variable-definition-error-from-type-import)
- [3 Additional Resources and Documentation](#3-additional-resources-and-documentation)

## 1 Getting Started
[`[toc]`](#table-of-contents)

Before starting this article, review the following prerequisite information:
- Installed, stable version of [`Node.js`](https://nodejs.org/en/) and the accompanying version of [`npm`](https://www.npmjs.com/). At the time of writing/publishing this article this includes all stable Node.js versions in scope of: v8.x, v10.x, v11.x, or v12.x.
- Installed, stable version of [`git`](https://git-scm.com/)
- A bash terminal. Mac and Linux users should use the default `Terminal` application. Windows users should use `Git Bash` or another bash emulator. The Window's Subsystem for Linux is also a great option. The commands used in the article are `bash` commands and are **not** verified to work on non-bash terminals such as Powershell.

> **Note:** Developers without an existing TypeScript project should start here at section 1; developers with an existing project can skip ahead to section [2 Adding ESLint](#2-adding-eslint). This guide works best if you follow along with the GitHub repository.

View the GitHub repository [`learn-typescript-linting`](https://github.com/MatterhornDev/learn-typescript-linting). Copy, paste and execute the following command to clone it to your machine:

```bash
git clone https://github.com/MatterhornDev/learn-typescript-linting.git
cd learn-typescript-linting
git checkout init
npm install
```

The repository comes with multiple branches for different points in the guide.
- [`init`](https://github.com/MatterhornDev/learn-typescript-linting/tree/init): a baseline repo without ESLint installed so you can follow along ([part 1 section 2](#2-adding-eslint))
- [`master`](https://github.com/MatterhornDev/learn-typescript-linting): a complete example of TypeScript with ESLint ([part 1 section 2](#2-adding-eslint))
- [`unused-variable`](https://github.com/MatterhornDev/learn-typescript-linting/tree/unused-variable): an example of a common TypeScript + ESLint error ([part 1 section 2.9](#29-fixing-unused-variable-definition-error-from-type-import))
- [`standard-style`](https://github.com/MatterhornDev/learn-typescript-linting/tree/standard-style): a complete example of with Standard ([part 2 section 1](/posts/learn-typescript-linting-part-2#1-adding-standard-style-formatter))
- [`prettier-style`](https://github.com/MatterhornDev/learn-typescript-linting/tree/prettier-style): a complete example of with Prettier ([part 2 section 2](/posts/learn-typescript-linting-part-2#2-adding-prettier-style-formatter))

The project comes with a single developer dependency, `typescript`, and two npm scripts, `compile` and `start`. The `compile` command is `tsc -p tsconfig.json`. The project is configured for `es5` in `strict` mode and includes all `.ts` files under the `src` directory. The compiled output can be found in the `lib` directory. The `start` command runs the compiled `.js` output via `node lib/index.js`. Try them out by running:

```bash
npm run compile

# Result:
> learn-typescript-linting@1.0.0 compile /learn-typescript-linting
> tsc -p tsconfig.json
```

```bash
npm run start

# Result:
> learn-typescript-linting@1.0.0 start /learn-typescript-linting
> node lib/index.js

2 ** 8 = 256
35
```

It is recommended you do not modify the `.ts` files as they are specifically set up to show off unique aspects of linting typescript projects.

## 2 Adding ESLint
[`[toc]`](#table-of-contents)

Install `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` as developer dependencies. Initialize an empty eslint configuration file. I prefer to use `.json` for configuration files.

```bash
npm i -D eslint @typescript-eslint/{eslint-plugin,parser}
touch .eslintrc.json
```

### 2.1 Initializing .eslintrc
[`[toc]`](#table-of-contents)

Add the following to `.eslintrc.json`

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "env": { "node": true },
  "parserOptions": {
    "ecmaVersion": 5,
    "sourceType": "module"
  },
  "rules": {}
}
```

#### 2.1.1 Specifying environments
[`[toc]`](#table-of-contents)

The `env` object is used for defining global variables in a project that are not explicitly imported. A great example is the `console` object. This is considered globally available in both browser and Node.js environments. In the `learn-typescript-linting` example, the code will be executed in a Node.js terminal, thus the `node` attributes is enabled. Some other common attributes include `jest`, `mocha`, `amd`, `commonjs`, and `es6`. There is no easy way to know which attributes need to be enabled; it is recommended to consult [ESLint's Specifying Environments](https://eslint.org/docs/user-guide/configuring#specifying-environments) documentation to find out what each environment attribute provides.

#### 2.1.2 Specifying ecmaVersion
[`[toc]`](#table-of-contents)

The `parserOptions.ecmaVersion` value is based on the `target` value found in the `tsconfig.json`. A `tsconfig.json` value of `{ "target": "es5" }` is equivalent to `{ "ecmaVersion": 5 }`. Use the table below for additional mappings.

| tsconfig.json `target` | .eslintrc.json `ecmaVersion` |
| ------ | ----------- |
| `es3` | 3 |
| `es5` | 5 |
| `es6` or `ES2015` | 6 or 2015 |
| `ES2016` | 7 or 2016 |
| `ES2017` | 8 or 2017 |
| `ES2018` | 9 or 2018 |
| `ES2019` | 10 or 2019 |
| `ESNext` | 10 or 2019 |

Take a look at TypeScript's `--lib` [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to learn how to include unique library files in the compilation. By setting `target` to either `es5` or `es6`, TypeScript will automatically import a set of libraries (i.e. `{ target: es5 } = { lib: ['DOM', 'ES5', 'ScriptHost']}`).

### 2.2 Creating ESLint npm script
[`[toc]`](#table-of-contents)

Now that ESLint is configured, create a new npm script in `package.json` by adding it to the `"scripts"` object:

```diff
{
  "scripts": {
    "compile": "tsc -p tsconfig.json",
    "start": "node lib/index.js",
+   "lint": "eslint 'src/**/*.ts'"
  }
}
```

This command will run ESLint on all `.ts` files within the `src` directory. The `/**/*` glob pattern will reach all files within subdirectories of `src`. If you have multiple directories to run the linter on (such as a `test` directory), use a pattern such as: `{src,test}/**/*.ts`.

### 2.3 Executing ESLint
[`[toc]`](#table-of-contents)

Run the new command via `npm run lint`, you should get an output similar to:

```bash
> learn-typescript-linting@0.1.0 lint /learn-typescript-linting
> eslint 'src/**/*.ts'

/learn-typescript-linting/src/bar.ts
  4:1  error  Expected indentation of 4 spaces but found 2  @typescript-eslint/indent
  4:19  warning  Missing return type on function            @typescript-eslint/explicit-function-return-type

/learn-typescript-linting/src/foo.ts
  4:1  error  Expected indentation of 4 spaces but found 2  @typescript-eslint/indent
  5:1  error  Expected indentation of 4 spaces but found 2  @typescript-eslint/indent

/learn-typescript-linting/src/index.ts
   9:1  error  Unexpected console statement  no-console
  10:1  error  Unexpected console statement  no-console

✖ 6 problems (5 errors, 1 warnings)
  3 errors and 0 warnings potentially fixable with the `--fix` option.

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! learn-typescript-linting@0.1.0 lint: `eslint 'src/**/*.ts'`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the learn-typescript-linting@0.1.0 lint script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /.npm/_logs/2019-05-05T00_51_14_059Z-debug.log
```

> **Note** future command-output references in this post will not include the first two lines (denoted by the `>` character) nor the `npm ERR!` lines as they are not important and contain no useful information (for us). The `npm ERR!` occurs when `npm run lint` fails with a linting _error_. If the script returns a _warning_, an npm error is not thrown. This is expected behaviour and is mainly used in a [continuous integration pipline](https://codeship.com/continuous-integration-essentials) (stay tuned for a future post on CI pipelines).

The output shows two main things. First, it outputs linting errors and warnings (i.e. `@typescript-eslint/indent` and `no-console`). These will come in handy for further configuring ESLint. Second, it says _" 3 errors and 0 warnings potentially fixable with the `--fix` option."_. ESLint comes with a great CLI option `--fix` to automatically fix certain linting errors and warnings.

Run `npm run lint -- --fix` to pass the `--fix` option down to the `eslint` command. After it completes there should be a new output:

```bash
/learn-typescript-linting/src/bar.ts
  4:21  warning  Missing return type on function  @typescript-eslint/explicit-function-return-type

/learn-typescript-linting/src/index.ts
   9:1  error  Unexpected console statement  no-console
  10:1  error  Unexpected console statement  no-console

✖ 3 problems (2 errors, 1 warning)
```

The source files have now been updated to use 4-spaces per indent rather than 2. Section [2.8](#28-additional-eslint-rule-configuration), will describe how to change this configuration back to 2-spaces as well as how to enable semicolons.

### 2.4 Fixing an ESLint warning
[`[toc]`](#table-of-contents)

TypeScript exists to help developers write better and safer code. The typescript-eslint package helps accomplish this by warning of missing explicit types. The warning:

```bash
/learn-typescript-linting/src/bar.ts
  4:21  warning  Missing return type on function  @typescript-eslint/explicit-function-return-type
```

refers to the missing return type from the arrow function inside the `.reduce` method in the `bar.ts` file. Modify the code by specifying a return type:

```diff
import { CustomType } from './foo'

export function bar (a: CustomType, b: CustomType[]): CustomType {
-    return b.reduce((c, v) => c+=v, a)
+    return b.reduce((c, v): CustomType => c+=v, a)
}
```

Run the linter (`npm run lint`), observe how the previous warning no longer exists!

### 2.5 Configuring ESLint
[`[toc]`](#table-of-contents)

To start, configure the `no-console` rule by adding the following `"rules"` object to the `.eslintrc.json`

```diff
{
  "rules": {
+   "no-console": "warn"
  }
}
```

The `no-console` rule can be configured to one of three values: `"error"` (default), `"warn"`, or `"off"`. Specify the rule to whichever value best serves the project at hand. In my opinion, `no-console` should be enabled as a warning because in a production application it is considered best-practice not to log to console, but to instead use a legitimite logger such as [Pino](http://getpino.io/#/).

### 2.6 Additional ESLint rule configuration
[`[toc]`](#table-of-contents)

Some other opinionated rules are indent spacing and semicolon use. Start by specifying the `@typescript-eslint/indent` rule with the value `["error", 2]`. Make sure to include `@typescript-eslint` in the rule name; otherwise, the configuration will target ESLint's base rule `indent` and not the typescript-eslint's rule `indent`. 

```diff
{
  "rules": {
    "no-console": "warn",
+   "@typescript-eslint/indent": ["error", 2]
  }
}
```

The value for this rule is different to that of `no-console`. It is an array of parameters. The first value refers to the lint _level_. It can have the value of `"error"` (default), `"warn"`, or `"off"`. Awfully familiar right? The second value is the number of spaces for space-based indentation or the string `"tab"` for tab based indentation. The third and optional value is an object of language specific configurations. Visit the `@typescript-eslint/eslint-plugin` [indent rule documentation](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md) for more details.

Based on that documentation, Node.js standard development uses 2-space indentation. Configure the rule and run `npm run lint` to see the indentation errors in the `learn-typescript-linting` project. Run the command with the fix option `npm run lint -- --fix` to automatically fix the errors.

Configuring semicolons requires specifying the `semi` rule. This rule is similar to the `indent` rule as it is best configured using an array of parameters. The first parameter is one of the three values `"error"`, `"warn"`, or `"off"` (default). The second parameter is a string of either `"always"` or `"never"`. By default, ESLint does not care if semicolons are used or not as JavaScript [automatically inserts semicolons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Automatic_semicolon_insertion). This rule can also be specified with a singular value of `"error"`, `"warn"`, or `"off"` (default). The configurations and resulting behaviour is best described in a table:

| configuration | code | result |
| - | - | - |
| `"error"` or `["error", "always"]` | `x = 0` <br> `x = 0;` | error ❌ Missing semicolon <br> pass ✅ |
| `["error", "never"]` | `x = 0` <br> `x = 0;` | pass ✅ <br> error ❌ Extra semicolon |
| `"warn"` or `["warn", "always"]` | `x = 0` <br> `x = 0;` | warn ⚠️ Missing semicolon <br> pass ✅ |
| `["warn", "never"]` | `x = 0` <br> `x = 0;` | pass ✅ <br> warn ⚠️ Extra semicolon |
| `"off"` or `["off", "always"]` or `["off", "never"]` | `x = 0` <br> `x = 0;` | pass ✅ |

My preference is _sans_ semicolons, so I'll be modifying my `.eslintrc.json` file rule set like so:

```diff
{
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/indent": ["error", 2],
+   "semi": ["error", "never"]
  }
}
```

### 2.7 Fixing unused variable definition error from type import
[`[toc]`](#table-of-contents)

This final section covers a common problem case when linting TypeScript with ESLint. If you __do not__ specify `plugin:@typescript-eslint/recommended` in the `.eslintrc.json` configuration `"extends"` list, then a troubling error will be returned from the `learn-typescript-linting` project. Modify the code by removing the second value in the `"extends"` list, or checkout the `learn-typescript-linting/unused-variable` branch to see the error.

```bash
/learn-typescript-linting/src/bar.ts
  1:10  error  'CustomType' is defined but never used  no-unused-vars

/learn-typescript-linting/src/index.ts
   1:10  error    'CustomType' is defined but never used  no-unused-vars
   9:1   warning  Unexpected console statement            no-console
  10:1   warning  Unexpected console statement            no-console

✖ 4 problems (2 errors, 2 warnings)
```

ESLint thinks that `CustomType` is never used; however, the source code is definitely using it, just not in the way ESLint expects it to. This error happens because of how ESLint works. ESLint parses JavaScript into a data structure called an Abstract Syntax Tree (AST) and analyzes the AST using the configured rule set. An AST is a pragmatic data structure that allows a script to interact and perform functions with other, existing code without having to run the code. In this situation, the ESLint **parsers** are generating the AST from the TypeScript source code, and the ESLint **plugins** are the scripts analyzing the parsed source code. ESLint does not natively understand how to parse TypeScript; thus, the use of the `typescript-eslint/parser`. The linter then utilizes the `typescript-eslint/eslint-plugin` to enable a rule set to analyze the parsed TypeScrtipt code. For more information on the inner workings of `typescript-eslint` read their documentation on [_How does `typescript-eslint` work and why do you have multiple packages_](https://github.com/typescript-eslint/typescript-eslint#how-does-typescript-eslint-work-and-why-do-you-have-multiple-packages). 

To fix the above `no-unused-vars` error, set two rule configurations.

```diff
{
- "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
+ "extends": ["eslint:recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "env": { "node": true },
  "parserOptions": {
    "ecmaVersion": 5,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/indent": ["error", 2],
    "semi": ["error", "never"],
+   "no-unused-vars": "off",
+   "@typescript-eslint/no-unused-vars": ["error"]
  }
}
```

This configuration turns off the base ESLint rule and enables the typescript-eslint rule instead. The typescript-eslint rule understands how to analyze TypeScript source code and will still catch normal JavaScript based unused variables. The `plugin:@typescript-eslint/recommended` specification creates this specification automatically which is why the error didn't appear earlier in this guide. Similar to the previous rules, additional configuration is available for the [no-unused-vars rule](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md).

## 3 Additional Resources and Documentation
[`[toc]`](#table-of-contents)

- [Learn TypeScript Linting post repository](https://github.com/MatterhornDev/matterhorn-posts): This post is open sourced! Check it out at the link and open issues/pull requests if you'd like to contribute to it.
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint): Monorepo for all the tooling which enables ESLint to support TypeScript.
  - [typesciprt-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)
  - [typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin)
- [eslint-config-standard](https://github.com/standard/eslint-config-standard): The ESLint configurtion for integrating the JavaScript Standard Style formatter.

---

Thank you for reading! If you enjoyed this article follow [@MatterhornDev](https://twitter.com/matterhorndev) on Twitter for notifications on all future posts. This article was written by Ethan Arrowood, share you support on Twitter by following him ([@ArrowoodTech](https://twitter.com/ArrowoodTech)) and [sharing this article](https://twitter.com/intent/tweet?text=Learn%20TypeScript%20Linting%20by%20@ArrowoodTech&url=https://blog.matterhorn.dev/posts/learn-typescript-linting-part-1&hashtags=typescript,eslint&via=MatterhornDev&related=ArrowoodTech,MatterhornDev). 

Special thank you's to Julia Cotter and Colin Hennessey for their help on reviewing and proof reading this article. Find them on GitHub and LinkedIn below!
- Julia Cotter: [GitHub](https://github.com/juliacotter) [LinkedIn](https://www.linkedin.com/in/julia-cotter/)
- Colin Hennessey: [GitHub](https://github.com/colinhennessey) [LinkedIn](https://www.linkedin.com/in/colin-hennessey-140625180/)