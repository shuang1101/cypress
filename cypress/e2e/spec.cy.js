/// <reference types="cypress" />


const { expect } = require("chai");

//suit
describe('spec', () => {
    beforeEach(() => {
        cy.visit('https://cms-lyart.vercel.app');
    });
    //case
    it('Page should contains logo', () => {
        cy.get('#logo');
    })

    it('Nav should contains 5 links', () => {
        cy.get('#menu a').should('have.length', '5').and('have.attr', 'href');
    })

    it('Nav bar should always on top screen', () => {
        cy.scrollTo('bottom');
        cy.get('#menu a').should('be.visible').and('have.attr', 'href');
    })

    it('Click to course page', () => {
        cy.get('#menu a:first').click();
        cy.url().should("eq", "https://cms-lyart.vercel.app/events");
        cy.url().then(url => {
            expect(url).to.equal('https://cms-lyart.vercel.app/events');
        })
    })

    it('Logo can click and then go back index page', () => {
        cy.get('#menu a:first').click().url();
        cy.get('#logo').click();
        cy.url().should('eq', 'https://cms-lyart.vercel.app/');
    })

    it('Newsletter can type my email address', () => {
        cy.get('#footer > div > section > article.col-4 > form > input[type=text]').click().type('123@gmail.com').should('have.value', '123@gmail.com');
        //cy.get('input[type=text]').and('have.attr', 'placeholder');
    })



});