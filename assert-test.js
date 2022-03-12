import { strict as assert } from 'assert'

/* console.log('---*****************************************************---')
assert.equal(1, 1, "MATCHING")

console.log('---*****************************************************---')
assert.deepEqual([[1, 2, '3'], 4, 5], [[1, 2, 3], 4, 5], "NOT MATCHING") */

// 生成 AssertionError，以便稍后比较错误信息：
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual',
  code: 'ERR_ASSERTION',
  generatedMessage: true,
  name: 'AssertionError',
  message: 'Assertion Error Output'
});

// 验证错误的输出：
try {
  assert.strictEqual(1, 2);
} catch (err) {
  console.log('---*****************************************************---')
  assert(err instanceof assert.AssertionError);
  assert.equal(err.message, message);
  assert.equal(err.name, 'AssertionError');
  assert.equal(err.actual, 1);
  assert.equal(err.expected, 2);
  assert.equal(err.code, 'ERR_ASSERTION');
  assert.equal(err.operator, 'strictEqual');
  assert.equal(err.generatedMessage, true);
}

/* console.log('---*****************************************************---')
assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  TypeError('Wrong value')
); */