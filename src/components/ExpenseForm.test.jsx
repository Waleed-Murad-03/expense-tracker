import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseForm from './ExpenseForm'

const cy = (name) => document.querySelector(`[data-cy="${name}"]`)

async function fill(user, title, amount, category = 'Food') {
  if (title) await user.type(cy('title'), title)
  if (amount) await user.type(cy('amount'), amount)
  await user.selectOptions(cy('category'), category)
  await user.click(cy('add-expense'))
}

describe('ExpenseForm', () => {
  it('calls onAdd with a numeric amount and clears the inputs', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ExpenseForm onAdd={onAdd} />)
    await fill(user, 'Lunch', '250', 'Food')
    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onAdd).toHaveBeenCalledWith({ title: 'Lunch', amount: 250, category: 'Food' })
    expect(cy('title')).toHaveValue('')
    expect(cy('amount')).toHaveValue('')
  })

  it.each([
    ['empty title', '', '100', 'Title is required'],
    ['blank title', '   ', '100', 'Title is required'],
    ['non-numeric amount', 'Taxi', 'abc', 'Amount must be a number'],
    ['zero amount', 'Taxi', '0', 'Amount must be greater than 0'],
    ['negative amount', 'Taxi', '-5', 'Amount must be greater than 0'],
  ])('rejects %s', async (_, title, amount, message) => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ExpenseForm onAdd={onAdd} />)
    await fill(user, title, amount)
    expect(onAdd).not.toHaveBeenCalled()
    expect(screen.getByText(message)).toHaveAttribute('data-cy', 'error')
  })
})
