# koa-hbs-renderer

[![npm](https://img.shields.io/npm/v/koa-hbs-renderer.svg?style=flat-square)](https://www.npmjs.com/package/koa-hbs-renderer)
![Node.js](https://img.shields.io/badge/node.js-%3E=_7.6.0-blue.svg?style=flat-square) [![Build Status](https://img.shields.io/travis/ConnorWiseman/koa-hbs-renderer/master.svg?style=flat-square)](https://travis-ci.org/ConnorWiseman/koa-hbs-renderer) [![Coverage](https://img.shields.io/codecov/c/github/ConnorWiseman/koa-hbs-renderer.svg?style=flat-square)](https://codecov.io/gh/ConnorWiseman/koa-hbs-renderer)
[![Dependencies Status](https://david-dm.org/ConnorWiseman/koa-hbs-renderer/status.svg?style=flat-square)](https://david-dm.org/ConnorWiseman/koa-hbs-renderer)
[![devDependencies Status](https://david-dm.org/ConnorWiseman/koa-hbs-renderer/dev-status.svg?style=flat-square)](https://david-dm.org/ConnorWiseman/koa-hbs-renderer?type=dev)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ConnorWiseman/koa-hbs-renderer/blob/master/LICENSE)

> A Handlebars template renderer for [Koa](https://github.com/koajs/koa) applications.


## Installation

```shell
npm install --save koa-hbs-renderer
```


## Usage
### views/template.hbs
```html
<p>This is a template. Isn't that {{adjective}}?</p>
```

### index.js
```javascript
const Koa      = require('koa');
const path     = require('path');
const renderer = require('koa-hbs-renderer');

let app = new Koa();

app.use(renderer({
  paths: {
    views: path.join(__dirname, 'views')
  }
}));

app.use(async (ctx, next) => {
  await ctx.render('template', {
    adjective: 'useful'
  });
});

app.listen(3000);
```

## Options
```javascript
const Handlebars = require('handlebars');

let options = {
  cacheExpires:  60,
  contentTag:    'content',
  defaultLayout: 'default',
  environment:   'development',
  extension:     '.hbs',
  hbs:           Handlebars.create(),
  paths: {
    views:    path.join(__dirname, 'views'),
    layouts:  path.join(__dirname, 'layouts'),
    partials: path.join(__dirname, 'partials'),
    helpers:  path.join(__dirname, 'helpers')
  },
  Promise:      Promise
};

app.use(renderer(options));
```

### cacheExpires
The length of time, in seconds, to keep compiled Handlebars templates in the in-memory cache before recompilation. Defaults to `60`.

### contentTag
The name of the block used by layouts to render views. Defaults to `content`, meaning views will be rendered onto layouts where `{{{content}}}` appears.

### defaultLayout
The name of the layout to use by default if `paths.layouts` is defined. Defaults to `default`.

### environment
The current Node.js environment, used to determine whether or not to invalidate the contents of cached templates. If set to `development`, cached templates will expire after the amount of time specified by [`cacheExpires`](#cacheexpires) above. Defaults to `process.env.NODE_ENV`.

### extension
The file extension used by template files. Defaults to `.hbs`.

### hbs
A Handlebars environment to use. If one is not provided, one will be created via [`Handlebars.create`](http://handlebarsjs.com/reference.html#base-create) when the middleware function is called.

### paths
An object literal of specified file paths. _Required._

#### views
The path to a directory of view templates. _Required._

#### partials
The path to a directory of partial templates. If specified, all templates in the partials directory will be compiled and cached together. _Optional._

#### layouts
The path to a directory of layout templates. _Optional._

#### helpers
The path to a directory of helper functions contained in JavaScript files. If specified, all functions in the helpers directory will be loaded and made available to the Handlebars environment for rendering. _Optional._

### Promise
The constructor function to create internal Promises from. Defaults to the built-in `Promise` object; has been tested to work with [`bluebird`](https://github.com/petkaantonov/bluebird/).
