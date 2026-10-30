// ExpenseItem
// Props: expense - { id, title, amount, category }. No state.
export default function ExpenseItem({ expense }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <span className="title">{expense.title}</span>
      <span className="category">{expense.category}</span>
      <span className="amount">{expense.amount.toFixed(2)}</span>
    </li>
  )
}
