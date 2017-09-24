/**
 * @file Exports middleware for creating and attaching a Handlebars renderer
 *       to a Koa2 application context.
 */


const fs         = require('fs');
const Handlebars = require('handlebars');
const path       = require('path');


const templateManager = require('./template-manager.js');


/**
 * Creates Handlebars renderer middleware for Koa2 applications.
 * @param  {Object} options Configuration options
 * @return {AsyncFunction}
 * @throws {ReferenceError}
 */
module.exports = function createRenderer(options) {
  let opts = Object.assign({
    cacheExpires:  60,
    contentTag:    'content',
    defaultLayout: 'default',
    environment:   process.env.NODE_ENV,
    extension:     '.hbs',
    hbs:           Handlebars.create(),
    Promise:       Promise
  }, options);

  // Throw errors if required options aren't specified
  if (!opts.paths) {
    throw new ReferenceError('options.paths is required');
  } else if (!opts.paths.views) {
    throw new ReferenceError('options.paths.views is required');
  }

  // Normalize the extension. Should be `.ext` and not `ext` alone
  const ext = opts.extension = `.${opts.extension.replace(/[^a-z-]/, '')}`;

  // The empty layout should be based on the contentTag option
  const emptyLayout = Handlebars.compile(`{{{${opts.contentTag}}}}`);

  // One-time operation: preload all helpers
  if (opts.paths.helpers) {
    fs.readdirSync(opts.paths.helpers).filter(file => {
      return path.extname(file) === '.js';
    }).forEach(helper => {
      let helperPath = path.join(opts.paths.helpers, helper),
          name       = path.basename(helper, '.js');

      opts.hbs.registerHelper(name, require(helperPath));
    });
  }

  // A template manager object to handle compiling, caching, etc.
  let manager = templateManager(opts);


  /**
   * Renders the specified view using the specified layout, partials, and
   * context into a string.
   *
   * Although another Handlebars environment may be provided to the underlying
   * renderer middleware, and partials manually registered with that environment
   * will be used when rendering templates, all partials loaded by this module
   * are handled manually by this module. There is no significant performance or
   * usability advantage to using the #registerPartial method included in the
   * Handlebars API to register partials instead; please see the Handlebars.js
   * source code for further details.
   * @param  {Function}          view     The view to render
   * @param  {Function}          layout   The layout to render the view onto
   * @param  {Object.<Function>} partials An object map of partials
   * @param  {Object}            context  Data to be rendered into the view
   * @return {String}
   * @private
   * @see {@link https://github.com/wycats/handlebars.js/blob/master/lib/handlebars/base.js#L49}
   */
  function renderView(view, layout, partials, context) {
    let options = {
      partials: partials
    };

    // Handle dynamically-defined content tag
    let renderedView = {};
    renderedView[opts.contentTag] = view(context, options);

    return layout(Object.assign({}, context, renderedView), options);
  };


  /**
   * Attaches #render function to a specified Koa context object.
   * @param  {Object}   ctx  A Koa context object
   * @param  {Function} next The next Koa middleware in the chain
   */
  return async function rendererMiddleware(ctx, next) {


    /**
     * Renders the specified view.
     * @param  {String} viewName The name of the view to render
     * @param  {Object} [locals] Local data passed to be rendered
     * @public
     */
    ctx.render = async function render(viewName, locals) {
      let context  = Object.assign({}, ctx.state, locals),
          layout   = emptyLayout,
          partials = {},
          viewPath = path.resolve(opts.paths.views, `${viewName}${ext}`),
          view     = await manager.compileTemplate(viewPath, 'view');

      // If a layouts path is specified, retrieve the layout
      if (opts.paths.layouts) {
        let layoutName = context.layout || opts.defaultLayout,
            layoutPath = path.resolve(opts.paths.layouts, `${layoutName}${ext}`);

        layout = await manager.compileTemplate(layoutPath, 'layout');
      }

      // If a partials path is specified, retrieve the partials
      if (opts.paths.partials) {
        partials = await manager.compileTemplates(opts.paths.partials, 'partial');
      }

      ctx.type = 'text/html; charset=utf-8';
      ctx.body = renderView(view, layout, partials, context);
    };

    await next();
  };
};
