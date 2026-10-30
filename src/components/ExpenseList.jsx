// ExpenseList
// Props: expenses - array of expenses to display; onDelete(id) - passed to each item. No state.
import ExpenseItem from './ExpenseItem'

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) return <p>No expenses yet.</p>
  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  )
}
