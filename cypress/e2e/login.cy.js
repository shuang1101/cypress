/// <reference types="cypress" />




describe('login', () => {
    beforeEach(() => {
        cy.visit('https://cms-lyart.vercel.app/login');
    });
    //case
    // it('Case1: student、teacher、manager this form can normal show ', () => {

    //     cy.get('.ant-radio-button-wrapper').contains('Student').click();
    //     cy.get('input[value="student"]').should('be.checked');
    //     //student是默认选中的
    //     cy.get('.ant-radio-button-wrapper').contains('Teacher').click();
    //     //teacher可点击
    //     cy.get('.ant-radio-button-wrapper').contains('Manager').click();
    //     //manager可点击

    // })


    // it('Case2: student login pass', () => {

    //     cy.get('.ant-radio-button-wrapper').contains('Student').click();
    //     cy.get('input[type="email"]').type('student@admin.com');
    //     cy.get('input[type="password"]').type('111111');
    //     cy.contains('button', 'Sign in').click().then(() => {
    //         cy.url().should('eq', 'https://cms-lyart.vercel.app/login');
    //     })
    // });


    // it('Case 3: teacher login pass', () => {
    //     cy.get('.ant-radio-button-wrapper').contains('Teacher').click();
    //     cy.get('input[type="email"]').type('teacher@admin.com');
    //     cy.get('input[type="password"]').type('111111');
    //     cy.contains('button', 'Sign in').click().then(() => {
    //         cy.url().should('eq', 'https://cms-lyart.vercel.app/login');
    //     })
    // });

    // it('Case 4: manager login pass', () => {
    //     cy.get('.ant-radio-button-wrapper').contains('Manager').click();
    //     cy.get('input[type="email"]').type('manager@admin.com');
    //     cy.get('input[type="password"]').type('111111');
    //     cy.contains('Sign in').click().then(() => {
    //         cy.url().should('eq', 'https://cms-lyart.vercel.app/login');
    //     })
    // });

    it('Case5:The email format is correct, otherwise an error message will prompt ', () => {
        //获取焦点
        cy.get('input[type="email"]').focus().type('student@email.com').blur();
        //测试邮箱
        cy.get('input[type="email"').type('student@email.com');
        //测试不写邮箱
        cy.get('input[type="email"').clear();
        cy.get('[role="alert"]').should('have.text', ("'email' is required"));
        //测试邮箱格式错误
        cy.get('input[type="email"').type('test.com', '333');
        cy.get('#login > div:nth-child(2) > div > div.ant-form-item-explain.ant-form-item-explain-error > div').should('have.text', "'email' is not a vaild email");

    });

    it('Case6:The password format is correct, otherwise an error message will prompt ', () => {
        //获取焦点
        cy.get('input[type="password"]').focus().type('111111').blur();
        //测试密码
        cy.get('input[type="password"').type('111111');
        //测试不写密码
        cy.get('input[type="password"').clear();
        cy.get('[role="alert"]').should('have.text', ("'password' is required"));
        //测试邮箱格式错误
        cy.get('input[type="password"').type('1234', '2131231241413414');
        cy.get('[role="alert"]').should('have.text', ("'password' must be between 4 and 16 characters"));
    });


});