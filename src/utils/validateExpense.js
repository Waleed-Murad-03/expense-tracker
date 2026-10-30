// Returns an error message string if the expense input is invalid, or null if it is valid.
export function validateExpense({ title, amount }) {
  if (!title || title.trim() === '') return 'Title is required'
  if (amount === '' || amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return 'Amount must be a number'
  }
  if (Number(amount) <= 0) return 'Amount must be greater than 0'
  if (Number(amount) > 100000) return 'Amount must not exceed 100000'
  return null
}
