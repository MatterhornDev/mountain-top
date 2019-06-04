---
date: "2019-06-01"
title: "Learn TypeScript Linting Part 2"
tags: ['typescript', 'linting', 'eslint', 'prettier', 'standard']
excerpt: "Part 2 of the Learn TypeScript Linting series. This post covers Prettier and Standard formatter configuration."
featuredImage: ""
---

# Learn TypeScript Linting Part 2

Written by: Ethan Arrowood

## Integrating Standard and Prettier

This part of the guide will build off of the [ESLint](https://eslint.org/) and [TypeScript](https://www.typescriptlang.org/) configuration from [Part 1](/posts/learn-typescript-linting-part-1). This guide will show you how to integrate the popular styling formatters [Standard](https://standardjs.com/) and [Prettier](https://prettier.io/). Make use of the table of contents and the `[toc]` shortcuts to better navigate this article.

As a reminder, this guide comes with an accompanying GitHub repo so you can follow along. Checkout [`learn-typescript-linting`](https://github.com/MatterhornDev/learn-typescript-linting) and use the following commands to run it locally:

```bash
git clone https://github.com/MatterhornDev/learn-typescript-linting.git
cd learn-typescript-linting
npm install
```

The repository comes with multiple branches for different points in the guide.
- [`init`](https://github.com/MatterhornDev/learn-typescript-linting/tree/init): a baseline repo without ESLint installed so you can follow along ([part 1 section 2](/posts/learn-typescript-linting-part-1#2-adding-eslint))
- [`master`](https://github.com/MatterhornDev/learn-typescript-linting): a complete example of TypeScript with ESLint ([part 1 section 2](/posts/learn-typescript-linting-part-1#2-adding-eslint))
- [`unused-variable`](https://github.com/MatterhornDev/learn-typescript-linting/tree/unused-variable): an example of a common TypeScript + ESLint error ([part 1 section 2.9](/posts/learn-typescript-linting-part-1#29-fixing-unused-variable-definition-error-from-type-import))
- [`standard-style`](https://github.com/MatterhornDev/learn-typescript-linting/tree/standard-style): a complete example of with Standard ([part 2 section 1](#1-adding-standard-style-formatter))
- [`prettier-style`](https://github.com/MatterhornDev/learn-typescript-linting/tree/prettier-style): a complete example of with Prettier ([part 2 section 2](#2-adding-prettier-style-formatter))

### Table of Contents
- [1 Adding Standard Style Formatter](#1-adding-standard-style-formatter)
  - [1.1 Installing Standard](#11-installing-standard)
  - [1.2 Evaluating new errors](#12-evaluating-new-errors)
  - [1.3 Configuring Standard specific rules](#13-configuring-standard-specific-rules)
- [2 Adding Prettier Style Formatter](#2-adding-prettier-style-formatter)
  - [2.1 Installing Prettier](#21-installing-prettier)
  - [2.2 Executing Prettier](#22-executing-prettier)
  - [2.3 Configuring Prettier specific rules](#23-configuring-prettier-specific-rules)
- [3 Additional Resources and Documentation](#3-additional-resources-and-documentation)

## 1 Adding Standard Style Formatter
[`[toc]`](#table-of-contents)

[Standard](https://standardjs.com) is a JavaScript style guide, linter, and formatter. It is opinionated and does not require any special configuration. A part of the appeal to using Standard is that it _just works_. The Standard website has documentation on how to set it up standalone with TypeScript; however, with the deprecation of `eslint-plugin-typescript` I have not found a way to configure Standard with `@typescript-eslint/eslint-plugin`. If this changes I will make sure to update this post! Checkout the [`learn-typescript-linting/standard-style`](https://github.com/MatterhornDev/learn-typescript-linting/tree/standard-style) branch for a completed example.

### 1.1 Installing Standard
[`[toc]`](#table-of-contents)

To get started, run the following command:

```bash
npm i -D eslint-config-standard eslint-plugin-{standard,promise,import,node}
```

The additional eslint-plugin's are peer dependencies of `eslint-config-standard` and are required.

Add it to the config by prepending it to the end of the `"extends"` list.

```diff
{
- "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
+ "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "standard"],
}
```

### 1.2 Evaluating new errors
[`[toc]`](#table-of-contents)

Executing `npm run lint` on the `learn-typescript-linting` repository should result in the following output:

```bash
/learn-typescript-linting/src/bar.ts
  4:19  error  Arrow function should not return assignment    no-return-assign
  4:42  error  Operator '+=' must be spaced                   space-infix-ops
  5:2   error  Newline required at end of file but not found  eol-last

/learn-typescript-linting/src/foo.ts
  3:20  error  Missing space before function parentheses      space-before-function-paren
  6:2   error  Newline required at end of file but not found  eol-last

/learn-typescript-linting/src/index.ts
   9:1   warning  Unexpected console statement                   no-console
  10:1   warning  Unexpected console statement                   no-console
  10:23  error    Newline required at end of file but not found  eol-last

✖ 8 problems (6 errors, 2 warnings)
  5 errors and 0 warnings potentially fixable with the `--fix` option.
```

Now, there are a couple new errors that need fixing. When using an opinionated formatter such as Standard it is best practice not to modify the rule configuration much. Looking at the rules currently throwing errors, many are easy fixes. Run `npm run lint -- --fix` to have ESLint make the changes automatically. The remaining error is a basic code fix:

```diff
import { CustomType } from './foo'

export function bar (a: CustomType, b: CustomType[]): CustomType {
-  return b.reduce((c, v): CustomType => c += v, a)
+  return b.reduce((c, v): CustomType => c + v, a)
}

```

The previous code snippet was actually considered computationally wasteful as the `+=` assignment was an unnecessary operation, even though it has the same runtime output of just `+`. In larger scale applications catching errors like this can make a great performance difference. This is why using linters are important! They can alert developers of potential issues in their code base.

Run `npm run lint` one last time to verify everything is passing as expected. Remember that the warnings for `no-console` are expected based on the `.eslintrc.json` configuration.

### 1.3 Configuring Standard specific rules
[`[toc]`](#table-of-contents)

If you really need to modify the Standard formatting rules then override them in the `.eslintrc.json` file by adding the ESLint rules to the `rules` object. Unlike `typescript-eslint`, Standard does not add any additional rules, so everything can be overwritten using the ESLint style. For example, to turn off the `semicolon` rule add `"semi": "off"` to the `"rules"` object.

Take a moment to read Standard's FAQ answer to the [_can I configure_](https://standardjs.com/index.html#i-disagree-with-rule-x-can-you-change-it) question:

> No. The whole point of standard is to save you time by avoiding [bikeshedding](https://www.freebsd.org/doc/en/books/faq/misc.html#bikeshed-painting) about code style. There are lots of debates online about tabs vs. spaces, etc. that will never be resolved. These debates just distract from getting stuff done. At the end of the day you have to 'just pick something', and that's the whole philosophy of standard -- its a bunch of sensible 'just pick something' opinions. Hopefully, users see the value in that over defending their own opinions.

## 2 Adding Prettier Style Formatter
[`[toc]`](#table-of-contents)

[Prettier](https://prettier.io/) is an opinionated code formatter that brilliantly integrates with many languages and editors. It has limited configuration options to simplify code formatting. It works seemlessly with ESLint and will transform your coding workflow if used properly.

### 2.1 Installing Prettier
[`[toc]`](#table-of-contents)

Just like Standard, Prettier is easy to get up and running with the existing ESLint configuration. Start by running the following command:

```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

Modify the `.eslintrc.json` configuration to use the newely installed configuration and plugin.

```diff
{
- "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
+ "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  "parser": "@typescript-eslint/parser",
- "plugins": ["@typescript-eslint"],
+ "plugins": ["@typescript-eslint", "prettier"],
  "env": { "node": true },
  "parserOptions": {
    "ecmaVersion": 5,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/indent": ["error", 2]
  }
}
```

### 2.2 Executing Prettier
[`[toc]`](#table-of-contents)

Running `npm run lint` on the `learn-typescript-linting` project should result in the following output:

```bash
/learn-typescript-linting/src/bar.ts
  1:28  error  Replace `'./foo'` with `"./foo";`        prettier/prettier
  3:20  error  Delete `·`                               prettier/prettier
  4:41  error  Replace `c+=v,·a)` with `(c·+=·v),·a);`  prettier/prettier
  5:2   error  Insert `⏎`                               prettier/prettier

/learn-typescript-linting/src/foo.ts
  1:32  error  Insert `;`  prettier/prettier
  4:19  error  Insert `;`  prettier/prettier
  5:31  error  Insert `;`  prettier/prettier
  6:2   error  Insert `⏎`  prettier/prettier

/learn-typescript-linting/src/index.ts
   1:33  error    Replace `'./foo'` with `"./foo";`  prettier/prettier
   2:21  error    Replace `'./bar'` with `"./bar";`  prettier/prettier
   4:25  error    Insert `;`                         prettier/prettier
   5:40  error    Insert `;`                         prettier/prettier
   6:24  error    Insert `;`                         prettier/prettier
   7:24  error    Insert `;`                         prettier/prettier
   9:1   warning  Unexpected console statement       no-console
   9:23  error    Insert `;`                         prettier/prettier
  10:1   warning  Unexpected console statement       no-console
  10:23  error    Insert `;⏎`                        prettier/prettier

✖ 18 problems (16 errors, 2 warnings)
  16 errors and 0 warnings potentially fixable with the `--fix` option.
```

Similar to Standard, there are plenty of easily fixable errors. Run `npm run lint -- --fix` to automatically fix all of the listed errors.

### 2.3 Configuring Prettier specific rules
[`[toc]`](#table-of-contents)

As mentioned previously, the purpose of using a formatter such as prettier is so that there is no configuration needed. Nevertheless, understanding how to modify rules is important to comply to an organization's code formatting practices. Lets use the classic `semicolon` rule as an example.

To modify Prettier rules you must create either a new `.prettierrc.json` file or add a `"prettier"` section to the `package.json`. In order to eliminate maintaining additional files, I prefer to add it directly to the package.json.

```diff
{
  "name": "learn-typescript-linting",
  "version": "0.1.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "compile": "tsc -p tsconfig.json",
    "start": "node lib/index.js",
    "lint": "eslint 'src/**/*.ts'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^1.7.0",
    "@typescript-eslint/parser": "^1.7.0",
    "eslint": "^5.16.0",
    "eslint-config-prettier": "^4.2.0",
    "eslint-plugin-prettier": "^3.0.1",
    "prettier": "^1.17.0",
    "typescript": "^3.4.5"
  },
+ "prettier": {
+   "semi": false
+ }
}
```

Run `npm run lint` and see how the linter now errors on all the semicolons added in the previous section. Fix them automatically or remove the rule to go back to using semicolons.

## 3 Additional Resources and Documentation
[`[toc]`](#table-of-contents)

- [Learn TypeScript Linting post repository](https://github.com/MatterhornDev/matterhorn-posts/): This post is open sourced! Check it out at the link and open issues/pull requests if you'd like to contribute to it.
- [eslint-config-standard](https://github.com/standard/eslint-config-standard): The ESLint configurtion for integrating the JavaScript Standard Style formatter.
- [Prettier documentation](https://prettier.io/docs/en/index.html): Prettier code formatter documentation. Relevant sections of the documentation listed below.
  - [Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)
  - [Prettier vs. Linters](https://prettier.io/docs/en/comparison.html)
- [Write Perfect Code With Standard and ESLint](https://www.youtube.com/watch?v=kuHfMw8j4xk): a great talk on linters and formatters by Feross Aboukhadijeh at JSConf.Asia 2018

---

Thank you for reading! If you enjoyed this article follow [@MatterhornDev](https://twitter.com/matterhorndev) on Twitter for notifications on all future posts. This article was written by Ethan Arrowood, share you support on Twitter by following him ([@ArrowoodTech](https://twitter.com/ArrowoodTech)) and [sharing this article](https://twitter.com/intent/tweet?text=Learn%20TypeScript%20Linting%20by%20@ArrowoodTech&url=https://blog.matterhorn.dev/posts/learn-typescript-linting-part-2&hashtags=typescript,eslint,standardjs,prettier&via=MatterhornDev&related=ArrowoodTech,MatterhornDev). 

Special thank you's to Julia Cotter and Colin Hennessey for their help on reviewing and proof reading this article. Find them on GitHub and LinkedIn below!
- Julia Cotter: [GitHub](https://github.com/juliacotter) [LinkedIn](https://www.linkedin.com/in/julia-cotter/)
- Colin Hennessey: [GitHub](https://github.com/colinhennessey) [LinkedIn](https://www.linkedin.com/in/colin-hennessey-140625180/)