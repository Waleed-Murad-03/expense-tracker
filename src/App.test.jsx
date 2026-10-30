import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const cy = (name) => document.querySelector(`[data-cy="${name}"]`)
const items = () => screen.queryAllByText((_, el) => el?.dataset?.cy === 'expense-item')

async function addExpense(user, title, amount, category) {
  await user.type(cy('title'), title)
  await user.type(cy('amount'), amount)
  await user.selectOptions(cy('category'), category)
  await user.click(cy('add-expense'))
}

async function setup() {
  const user = userEvent.setup()
  render(<App />)
  await addExpense(user, 'Lunch', '250', 'Food')
  await addExpense(user, 'Cab', '400', 'Travel')
  return user
}

describe('App', () => {
  it('adds expenses to the list with amounts to 2 decimals', async () => {
    await setup()
    expect(items()).toHaveLength(2)
    expect(within(items()[0]).getByText('250.00')).toBeInTheDocument()
  })

  it('does not add an invalid expense', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Bad', '-5', 'Food')
    expect(items()).toHaveLength(0)
    expect(cy('error')).toBeInTheDocument()
  })

  it('updates the total and count as expenses are added', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(cy('total')).toHaveTextContent('0.00')
    expect(cy('count')).toHaveTextContent('0')
    await addExpense(user, 'Lunch', '250', 'Food')
    await addExpense(user, 'Cab', '400.5', 'Travel')
    expect(cy('total')).toHaveTextContent('650.50')
    expect(cy('count')).toHaveTextContent('2')
  })

  it('filters by category and updates total and count', async () => {
    const user = await setup()
    await user.selectOptions(cy('filter'), 'Food')
    expect(items()).toHaveLength(1)
    expect(within(items()[0]).getByText('Lunch')).toBeInTheDocument()
    expect(cy('count')).toHaveTextContent('1')
    expect(cy('total')).toHaveTextContent('250.00')
    await user.selectOptions(cy('filter'), 'All')
    expect(items()).toHaveLength(2)
  })

  it('deletes an expense and updates total and count', async () => {
    const user = await setup()
    await user.click(within(items()[0]).getByText('Delete'))
    expect(items()).toHaveLength(1)
    expect(within(items()[0]).getByText('Cab')).toBeInTheDocument()
    expect(cy('total')).toHaveTextContent('400.00')
    expect(cy('count')).toHaveTextContent('1')
  })
})
