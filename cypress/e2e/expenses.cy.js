const add = (title, amount, category) => {
  cy.get('[data-cy="title"]').type(title)
  cy.get('[data-cy="amount"]').type(amount)
  cy.get('[data-cy="category"]').select(category)
  cy.get('[data-cy="add-expense"]').click()
}

describe('expenses', () => {
  it('adds expenses, totals them and filters by category', () => {
    cy.visit('/')
    add('Lunch', '250', 'Food')
    add('Cab', '400', 'Travel')
    cy.get('[data-cy="total"]').should('contain', '650.00')
    cy.get('[data-cy="filter"]').select('Food')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="count"]').should('contain', '1')
    cy.get('[data-cy="total"]').should('contain', '250.00')
  })
})
