describe('sample', () => {
  it("finds the content 'TamBang'", () => {
    cy.visit('/');
    cy.contains('TamBang');
  });
});
