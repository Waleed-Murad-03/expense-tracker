// Returns the sum of the amounts of the given expenses.
export function calculateTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}
