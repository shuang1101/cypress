/// <reference types="cypress" />

const { formatDate } = require("tough-cookie");




describe('login', () => {
    beforeEach(() => {
        cy.visit('/login');


    });
    // case
    it('Case1: student、teacher、manager this form can normal show ', () => {
        cy.get('.ant-radio-button-wrapper').contains('Student').click();
        cy.get('input[value="student"]').should('be.checked');
        //student是默认选中的
        cy.get('.ant-radio-button-wrapper').contains('Teacher').click();
        //teacher可点击
        cy.get('.ant-radio-button-wrapper').contains('Manager').click();
        //manager可点击

    })


    it('Case 2:The email format is correct, otherwise an error message will prompt ', function() {
        //测试邮箱
        cy.get('input[type="email"]').should('have.attr', 'placeholder', 'Please input email');
        //测试不写邮箱
        cy.get('input[type="email"]').type('student123@gmail.com');
        cy.get('input[type="email"]').clear();
        cy.get('[role="alert"]:first').should('have.text', ("'email' is required"));
        //测试邮箱格式错误
        cy.get('input[type="email"]').type('test.com', '333');
        cy.get('#login > div:nth-child(2) > div > div.ant-form-item-explain.ant-form-item-explain-error > div')
            .should('have.text', "'email' is not a valid email");

    });

    it('Case3:The password format is correct, otherwise an error message will prompt ', function() {

        //测试密码
        cy.get('input[type="password"]').should('have.attr', 'placeholder', 'Please input password');
        //测试不写密码;
        cy.get('input[type="password"]').type('11111');
        cy.get('input[type="password"]').clear();
        cy.get('#login > div.ant-row.ant-form-item.ant-form-item-with-help.ant-form-item-has-error > div > div.ant-form-item-explain.ant-form-item-explain-error > div')
            .should('have.text', ("'password' is required"));
        //测试邮箱格式错误
        cy.get('input[type="password"]').type('234', '2131231241413414');
        cy.get('#login > div.ant-row.ant-form-item.ant-form-item-with-help.ant-form-item-has-error > div > div.ant-form-item-explain.ant-form-item-explain-error > div')
            .should('have.text', ("'password' must be between 4 and 16 characters"));
    });


    it('Case 4: student login pass', function() {

        cy.loginFunction('student@admin.com', '111111', 'Student');
        cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/student');
        //  cy.url().should('eq', Cypress.config().baseUrl + '/dashboard');
    });



    it('Case 5: teacher login pass', function() {
        cy.loginFunction('teacher@admin.com', '111111', 'Teacher');
        cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/teacher');
    });


    it('Case 6: manager login pass', function() {
        cy.loginFunction('manager@admin.com', '111111', 'Manager');
        cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/manager');
    })



















});