// ExpenseItem
// Props: expense - { id, title, amount, category }; onDelete(id) - called when Delete is clicked. No state.
export default function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <span className="title">{expense.title}</span>
      <span className="category">{expense.category}</span>
      <span className="amount">{expense.amount.toFixed(2)}</span>
      <button type="button" data-cy="delete-expense" onClick={() => onDelete(expense.id)}>
        Delete
      </button>
    </li>
  )
}
