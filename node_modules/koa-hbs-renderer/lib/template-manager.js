/**
 * @file Exports a function that creates a set of functions for managing
 *       compiled and cached templates.
 */


const fs   = require('fs');
const path = require('path');


const getPaths = require('./get-paths.js');


/**
 * Obtains the current timestamp in seconds.
 * @return {Number}
 * @private
 */
function timestamp() {
  return Math.floor(Date.now() / 1000);
};


/**
 * Creates and manages an in-memory cache of compiled Handlebars template
 * functions, returning an object with two methods for interacting with the
 * cache and file system.
 * @param  {Object} options
 * @return {Object}
 */
module.exports = function templateManager(options) {


  /**
   * An in-memory cache of compiled Handlebars template functions.
   * @type {Object}
   * @public
   */
  let cache = {
    layout:  {},
    partial: {},
    view:    {}
  };

  // Alias certain options for brevity
  const env     = options.environment;
  const expires = options.cacheExpires;
  const ext     = options.extension;
  const hbs     = options.hbs;


  /**
   * Compiles and caches the template stored at the specified file path, if it
   * exists. Cached templates will be stored in the in-memory cache belonging
   * to the specified template type.
   * @param  {String} filePath The path of the template to compile
   * @param  {String} type     The type of template this is
   * @return {Promise.<Function>}
   * @public
   */
  function compileTemplate(filePath, type) {
    return new options.Promise((resolve, reject) => {
      let now  = timestamp(),
          name = path.basename(filePath, ext);

      // A cached template is only invalidated if the environment is something
      // other than `development` and the time-to-live has been exceeded.
      if (cache[type][name] &&
         (env !== 'development' || cache[type][name]._cached + expires > now)) {
        return resolve(cache[type][name]);
      }

      fs.readFile(filePath, 'utf-8', (error, contents) => {
        if (error) {
          return reject(error);
        }

        cache[type][name] = hbs.compile(contents.trim());

        // Decorate the cached function with private members. The underscore
        // is necessary to avoid conflict with function's name to prevent all
        // compiled templates from being named `ret` in the cache.
        cache[type][name]._name   = name;
        cache[type][name]._cached = timestamp();

        return resolve(cache[type][name]);
      });
    });
  };


  /**
   * Compiles and caches all the templates in the specified directory, if it
   * exists. Returns a Promise for an object map of compiled Handlebars template
   * functions, mapped from the results of compileTemplate above.
   * @param  {String} dir  The directory to search in
   * @param  {String} type The type of templates these are
   * @return {Promise.<Object>}
   * @public
   */
  function compileTemplates(dir, type) {
    return getPaths(dir, ext, options).then(paths => {
      return options.Promise.all(paths.map(filePath => {
        return compileTemplate(filePath, type);
      })).then(templates => {
        return templates.reduce((all, current) => {
          all[current._name] = current;
          return all;
        }, {});
      });
    });
  };

  return {
    cache:            cache,           // Exposed for ease of testing
    compileTemplate:  compileTemplate,
    compileTemplates: compileTemplates
  };
};
