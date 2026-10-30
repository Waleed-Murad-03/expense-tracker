import { calculateTotal } from './calculateTotal'

describe('calculateTotal', () => {
  it('returns 0 for an empty list', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('sums the amounts', () => {
    expect(calculateTotal([{ amount: 250 }, { amount: 400 }, { amount: 0.5 }])).toBe(650.5)
  })
})
