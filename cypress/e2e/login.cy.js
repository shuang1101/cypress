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


    it('Case 2:The email format is correct, otherwise an error message will prompt ', () => {
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

    it('Case3:The password format is correct, otherwise an error message will prompt ', () => {

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


    it('Case 4: student login pass', () => {

        cy.get('.ant-radio-button-wrapper').contains('Student').click();
        cy.get('input[type="email"]').type('student@admin.com');
        cy.get('input[type="password"]').type('111111');
        cy.contains('button', 'Sign in').click().then(() => {
            cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/student');
            //  cy.url().should('eq', Cypress.config().baseUrl + '/dashboard');
        })
    });


    it('Case 5: teacher login pass', () => {
        cy.get('.ant-radio-button-wrapper').contains('Teacher').click();
        cy.get('input[type="email"]').type('teacher@admin.com');
        cy.get('input[type="password"]').type('111111');
        cy.contains('button', 'Sign in').click().then(() => {
            cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/teacher');
        })
    });

    it('Case 6: manager login pass', () => {
        cy.get('.ant-radio-button-wrapper').contains('Manager').click();
        cy.get('input[type="email"]').type('manager@admin.com');
        cy.get('input[type="password"]').type('111111');
        cy.contains('button', 'Sign in').click().then(() => {
            cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/manager');

        })
    });
    it('Case 7: Add course', () => {
        cy.get('.ant-radio-button-wrapper').contains('Manager').click();
        cy.get('input[type="email"]').type('manager@admin.com');
        cy.get('input[type="password"]').type('111111');
        cy.contains('button', 'Sign in').click().then(() => {
            cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/manager');


            cy.get('li[role="menuitem"').eq(3).click();
            cy.get('li[title="Add Course"] > span > a').click().should('be.visible').and('have.attr', 'href');
            //.should('be.visible').and('have.attr', 'href');

            cy.get('label[title="Course Name"]').type('abcef');
            cy.get('#teacherId').type('una');
            cy.intercept('GET', '/api/teachers?query=una').as('teachersRes');
            cy.intercept('GET', '/api/courses/type').as('types');

            cy.get('.ant-select-item-option-content').first().click();
            cy.get('#type').click();
            cy.get('.ant-select-item-option').contains('Python').click();
            cy.get('.ant-select-item-option').contains('PHP').click();

            // cy.get('#startTime').click()
            //     .then(() => {
            //         var title = new Date();
            //         title = title.getDate() + 2;
            //         title = title.getFullYear() + "-" + title.getMonth() + "-" + title.getDay();
            //         cy.get(`td[title=${title}]`).click();

            //     });一直显示没有这个function:getFullYear

            cy.get('#price').type(750);
            cy.get('#maxStudents').type(2);

            cy.get('.ant-input-group > .ant-input-number > .ant-input-number-input-wrap > input.ant-input-number-input')
                .type(4);

            cy.get('.ant-input-group > .ant-select > .ant-select-selector').click()
                .then(() => {
                    cy.get('.ant-select-item-option-content').contains('day').click();
                })

            cy.get('#detail').type(
                'Cypress is a next generation front end testing tool built for the modern web. We address the key pain points developers and QA engineers face when testing modern applications.'
            );




        })


    })





});