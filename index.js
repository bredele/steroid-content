/**
 * Dependencies
 */

const engine = require('trumpet')
const Readable = require('stream').Readable


/**
 * Expose 'content' to be used primarly
 * with sa declarative syntax
 * @see https://github.com/bredele/steroid-hook
 */

module.exports = content


/**
 *
 */

function content(params) {
  return content.query(params.select, params.from)
}


/**
 *
 *
 */

content.query = function(selector, source) {
  const query = engine()
  const dest = new Readable
  dest._read = function(){}
  query.selectAll(selector, function (el) {
    el.createReadStream({
      outer: true
    }).on('data', data => dest.push(data))
  })
  query.on('end', () => dest.push(null))
  source.pipe(query)
  return dest
}
