import test from 'tape'
import { formatError } from '../src/formatters'

test('formatErrors', (t) => {
    const errorMessage = formatError(new Error('this is an error'))
    t.equal(errorMessage.message, 'this is an error', 'should format errors')
    t.end()
})