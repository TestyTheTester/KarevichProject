describe('Slack Tests', () => {
    beforeEach(() => {

    });

    it('First Account', () => {
        cy.login('maksim.smilov00@gmail.com', 'qwe123QWE');
    });

    it.skip('Seccond Account', () => {
        cy.login('maksim.smilov11@gmail.com', 'qwe123QWE');

    });
});