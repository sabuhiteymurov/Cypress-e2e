describe('Text box with max characters', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('base_url')}/example-3`);
    cy.get('[data-cy="first-name-chars-left-count"]').as('firstCharsLeftSpan');
    cy.get('[data-cy="input-first-name"]').as('firstInput');
    cy.get('[data-cy="input-last-name"]').as('lastInput');
  });

  it('displays the remaining characters count', () => {
    cy.get('@firstCharsLeftSpan').then(($charsLeftSpan) => {
      expect($charsLeftSpan.text()).to.equal('15');
    });

    cy.get('@firstInput').type('hello');

    cy.get('@firstCharsLeftSpan').invoke('text').should('equal', '10');

    cy.get('@firstInput').type(' my friend');

    cy.get('@firstCharsLeftSpan').invoke('text').should('equal', '0');
  });

  it('prevents the user from typing more than input limit.', () => {
    cy.get('@lastInput').type('abcdefghijklmnopqrstuvwxyz');

    cy.get('@lastInput').should('have.attr', 'value', 'abcdefghijklmno');
  });
});
