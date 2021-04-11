const { palindrome } = require('../utils/for_testing')

test('palindrome for midudev', () => {
  const result = palindrome('midudev')

  expect(result).toBe('vedudim')
})

test('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})