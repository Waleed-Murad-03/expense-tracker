import { validateExpense } from './validateExpense'

describe('validateExpense', () => {
  it('returns null for valid input', () => {
    expect(validateExpense({ title: 'Lunch', amount: '250' })).toBeNull()
  })

  it('rejects an empty or blank title', () => {
    expect(validateExpense({ title: '', amount: '100' })).toBe('Title is required')
    expect(validateExpense({ title: '   ', amount: '100' })).toBe('Title is required')
  })

  it('rejects a non-numeric or missing amount', () => {
    expect(validateExpense({ title: 'Taxi', amount: 'abc' })).toBe('Amount must be a number')
    expect(validateExpense({ title: 'Taxi', amount: '' })).toBe('Amount must be a number')
  })

  it('rejects zero and negative amounts', () => {
    expect(validateExpense({ title: 'Taxi', amount: '0' })).toBe('Amount must be greater than 0')
    expect(validateExpense({ title: 'Taxi', amount: '-5' })).toBe('Amount must be greater than 0')
  })
})
