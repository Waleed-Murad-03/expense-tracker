// App
// State: expenses - array of { id, title, amount, category }. All expense state lives here.
import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import './App.css'

export default function App() {
  const [expenses, setExpenses] = useState([])

  function handleAdd(expense) {
    setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }])
  }

  return (
    <main className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} />
    </main>
  )
}
