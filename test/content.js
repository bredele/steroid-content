/**
 * Test dependencies
 */

const test = require('tape')
const content = require('..')
const query = content.query
const fs = require('fs')
const concat = require('concat-stream')

test('should select pseudo element and return stream', assert => {
  assert.plan(1)
  query(
    'header',
    fs.createReadStream(__dirname + '/test.html')
  ).pipe(concat(data => {
    assert.equal(data.toString(), '<header>hello</header>')
  }))
})


test('should select elements and return stream', assert => {
  assert.plan(1)
  query(
    'button',
    fs.createReadStream(__dirname + '/test.html')
  ).pipe(concat(data => {
    assert.equal(data.toString(), '<button>foo</button><button>bar</button>')
  }))
})


test('should select id and return stream', assert => {
  assert.plan(1)
  query(
    '#foo',
    fs.createReadStream(__dirname + '/test.html')
  ).pipe(concat(data => {
    assert.equal(data.toString(), '<li id="foo"><button>foo</button></li>')
  }))
})


test('should select classes and return stream', assert => {
  assert.plan(1)
  query(
    '.link',
    fs.createReadStream(__dirname + '/test.html')
  ).pipe(concat(data => {
    assert.equal(data.toString(), '<a class="link">world</a><a class="link">world</a>')
  }))
})


test('should select attribute and return stream', assert => {
  assert.plan(1)
  query(
    '[required]',
    fs.createReadStream(__dirname + '/test.html')
  ).pipe(concat(data => {
    assert.equal(data.toString(), '<input type="number" required>')
  }))
})

test('should use declarative api', assert => {
  assert.plan(1)
  content({
    select: 'header',
    from: fs.createReadStream(__dirname + '/test.html')
  }).pipe(concat(data => {
    assert.equal(data.toString(), '<header>hello</header>')
  }))
})
