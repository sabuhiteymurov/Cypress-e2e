describe('Text box with max characters', () => {
  it('displays the remaining characters count', () => {
    cy.visit('http://localhost:3000/example-3');

    cy.get('[data-cy="first-name-chars-left-count"]').as('firstCharsLeftSpan');
    cy.get('[data-cy="input-first-name"]').as('firstInput');

    cy.get('@firstCharsLeftSpan').invoke('text').should('equal', '15');

    cy.get('@firstInput').type('hello');

    cy.get('@firstCharsLeftSpan').invoke('text').should('equal', '10');

    cy.get('@firstInput').type(' my friend');

    cy.get('@firstCharsLeftSpan').invoke('text').should('equal', '0');
  });

  it('prevents the user from typing more than input limit.', () => {
    cy.visit('http://localhost:3000/example-3');

    cy.get('[data-cy="input-last-name"]').as('lastInput');

    cy.get('@lastInput').type('abcdefghijklmnopqrstuvwxyz');

    cy.get('@lastInput').should('have.attr', 'value', 'abcdefghijklmno');
  });
});
