
/**
 * Module dependencies.
 */

/**
 * Render index html page.
 */

exports.index = async function(ctx, next) {
  return await ctx.render('index', {})
}
