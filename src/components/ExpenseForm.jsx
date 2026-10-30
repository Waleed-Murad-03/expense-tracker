// ExpenseForm
// Props: onAdd(expense) - called with { title, amount (number), category } when input is valid.
// State: title, amount, category (form inputs) and error (validation message). Does not store the list.
import { useState } from 'react'
import { validateExpense } from '../utils/validateExpense'

import { CATEGORIES } from '../utils/categories'

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [error, setError] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const message = validateExpense({ title, amount })
    if (message) {
      setError(message)
      return
    }
    onAdd({ title: title.trim(), amount: Number(amount), category })
    setTitle('')
    setAmount('')
    setError(null)
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        data-cy="title"
        aria-label="Title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        data-cy="amount"
        aria-label="Amount"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        data-cy="category"
        aria-label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button type="submit" data-cy="add-expense">Add</button>
      {error && <p className="error" data-cy="error">{error}</p>}
    </form>
  )
}
