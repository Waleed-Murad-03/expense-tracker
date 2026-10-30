describe('invalid input', () => {
  beforeEach(() => cy.visit('/'))

  it('does not add an expense with an empty title', () => {
    cy.get('[data-cy="amount"]').type('100')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="error"]').should('be.visible')
    cy.get('[data-cy="expense-item"]').should('not.exist')
  })

  it('does not add an expense with a negative amount', () => {
    cy.get('[data-cy="title"]').type('Taxi')
    cy.get('[data-cy="amount"]').type('-5')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="error"]').should('be.visible')
    cy.get('[data-cy="expense-item"]').should('not.exist')
  })
})
