describe('delete', () => {
  it('deletes an expense', () => {
    cy.visit('/')
    cy.get('[data-cy="title"]').type('Lunch')
    cy.get('[data-cy="amount"]').type('250')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="delete-expense"]').click()
    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="total"]').should('contain', '0.00')
  })
})
