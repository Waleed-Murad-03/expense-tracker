// App
// State: expenses - array of { id, title, amount, category }; filter - "All" or a category.
// All expense state lives here; children get data and callbacks via props.
import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import CategoryFilter from './components/CategoryFilter'
import { calculateTotal } from './utils/calculateTotal'
import './App.css'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [filter, setFilter] = useState('All')

  const visibleExpenses =
    filter === 'All' ? expenses : expenses.filter((e) => e.category === filter)

  function handleAdd(expense) {
    setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }])
  }

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <main className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <div className="toolbar">
        <CategoryFilter value={filter} onChange={setFilter} />
      </div>
      <p className="summary">
        <span>Total: <span data-cy="total">{calculateTotal(visibleExpenses).toFixed(2)}</span></span>
      </p>
      <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
    </main>
  )
}
