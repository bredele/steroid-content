/**
 * Dependencies
 */

const engine = require('trumpet')
const through = require('through')

/**
 * Expose 'content' to be used primarly
 * with sa declarative syntax
 * @see https://github.com/bredele/steroid-hook
 */

module.exports = content


/**
 *
 */

function content() {

}


/**
 *
 *
 */

content.query = function(selector, source) {
  const query = engine()
  const dest = through(
    function(data) {
      this.queue(data)
    },
    function() {
      this.queue(null)
    }
  )
  query.selectAll(selector, function (span) {
    span.createReadStream({
      outer: true
    }).pipe(dest)
  })
  source.pipe(query)
  return dest
}
