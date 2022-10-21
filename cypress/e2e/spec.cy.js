//suit
describe('spec', () => {
    //case
    it('should contains logo', () => {
        cy.visit('https://cms-lyart.vercel.app');
        cy.get('#logo');
    })

    it('nav should contains 5 links', () => {
        cy.visit('https://cms-lyart.vercel.app');
        cy.get('#menu a').should('have.length', '5').and('have.attr', 'href');
    })

    it('nav bar should always on top screen', () => {
        cy.visit('https://cms-lyart.vercel.app');
        cy.get('#menu a').should('be.visible').and('have.attr', 'href');
    })

    it('can go to events page', () => {
        cy.visit('https://cms-lyart.vercel.app');
        cy.get('#menu a:first').click();
        cy.url('https://cms-lyart.vercel.app/events');
        expect('https://cms-lyart.vercel.app/events').to.include('events');
    })

    it('logic can click and then go back index page', () => {
        cy.visit('https://cms-lyart.vercel.app');
        cy.get('#menu a:first').click();
        cy.url('https://cms-lyart.vercel.app/events');
        cy.get('#logo').click();
        cy.url('https://cms-lyart.vercel.app');
        expect('https://cms-lyart.vercel.app').to.have.string('https://cms-lyart.vercel.app');
    })

    it('newsletter can type my email address and click subscribe', () => {
        cy.visit('https://cms-lyart.vercel.app');
        cy.get('#footer > div > section > article.col-4 > form > input[type=text]').click().type('123@gmail.com').should('have.value', '123@gmail.com');

    })



});