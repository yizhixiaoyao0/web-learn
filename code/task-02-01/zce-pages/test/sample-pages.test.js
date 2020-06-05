import test from 'ava'
import samplePages from '..'

// TODO: Implement module test
test('<test-title>', t => {
  const err = t.throws(() => samplePages(100), TypeError)
  t.is(err.message, 'Expected a string, got number')

  t.is(samplePages('w'), 'w@zce.me')
  t.is(samplePages('w', { host: 'wedn.net' }), 'w@wedn.net')
})
