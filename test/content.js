/**
 * Test dependencies
 */

const test = require('tape')
const content = require('..').query
const fs = require('fs')
const concat = require('concat-stream')

test('should select pseudo element and return stream', assert => {
  assert.plan(1)
  content(
    'header',
    fs.createReadStream(__dirname + '/test.html')
  ).pipe(concat(data => {
    assert.equal(data.toString(), '<header>hello</header>')
  }))
})
