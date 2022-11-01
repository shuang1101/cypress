describe(('add Course'), () => {
    before(() => {
        cy.visit('/login');
    });


    it('Case 7: Add course', () => {
            cy.get('.ant-radio-button-wrapper').contains('Manager').click();
            cy.get('input[type="email"]').type('manager@admin.com');
            cy.get('input[type="password"]').type('111111');
            cy.contains('button', 'Sign in').click().then(() => {
                cy.url().should('eq', 'https://cms-lyart.vercel.app/dashboard/manager');


                cy.get('li[role="menuitem"').eq(3).click();
                cy.get('li[title="Add Course"] > span > a').click({ force: true }).should('be.visible').and('have.attr', 'href');
                //.should('be.visible').and('have.attr', 'href');

                cy.get('label[title="Course Name"]').type('abcef');
                cy.get('#teacherId').type('una');
                cy.intercept('GET', '/api/teachers?query=una').as('teachersRes');
                cy.intercept('GET', '/api/courses/type').as('types');

                cy.get('.ant-select-item-option-content').first().click();
                cy.get('#type').click();
                cy.get('.ant-select-item-option').contains('Python').click();
                cy.get('.ant-select-item-option').contains('PHP').click();

                cy.get('#startTime').click()
                    .then(() => {
                        var title = new Date();
                        title.setDate(title.getDate() + 2);
                        title = title.getFullYear() + "-" + (title.getMonth() + 1) + "-" + ("0" + title.getDate()).slice(-2);
                        console.log(title);
                        cy.get(`td[title="${title}"]`).click();

                    }); //一直显示没有这个function:getFullYear
                //price
                cy.get('#price').type(750);
                //student limit
                cy.get('#maxStudents').type(2);

                //
                cy.get('.ant-input-group > .ant-input-number > .ant-input-number-input-wrap > input.ant-input-number-input')
                    .type(4);

                cy.get('.ant-input-group > .ant-select > .ant-select-selector').click()
                    .then(() => {
                        cy.get('.ant-select-item-option-content').contains('day').click();
                    })

                cy.get('#detail').type(
                    'Cypress is a next generation front end testing tool built for the modern web. We address the key pain points developers and QA engineers face when testing modern applications.'
                );

                cy.contains("button", "Create Course").click();
                // cy.intercept('POST', '/api/courses', { fixture: 'add-course.json' }).as('addCourseRes');
                // cy.wait('@addCourseRes', { timeout: 10000 }).then((res) => {
                //     const data = res.response.body.data;
                //     expect(data).haveOwnProperty('id');
                //     expect(data).haveOwnProperty('scheduleId');


                cy.get('#schedule').contains('Add Chapter').click();
                cy.get('input[placeholder="Chapter Name"]').first().type('course');
                cy.get('input[placeholder="Chapter content"]').first().type('hello everyone');
                cy.get('input[placeholder="Chapter Name"]').eq(1).type('choose');
                cy.get('input[placeholder="Chapter content"]').eq(1).type('welcome to cypress');

                cy.get('#schedule').contains('Add Class Time').click();
                cy.get('#schedule .ant-select-selector').first().click();
                cy.get('.ant-select-item').contains('Tuesday').first().click();
                cy.get('#schedule input[placeholder="Select time"]').first().click();
                cy.get('.ant-picker-time-panel-column').first().contains('20').scrollIntoView().click();
                cy.get('.ant-picker-time-panel-column').eq(1).contains('07').click();
                cy.get('.ant-picker-time-panel-column').eq(2).contains('05').click();
                cy.get('type="submit"').contains('button', 'Submit').click();

                cy.get('#contentLayout > main > div:nth-child(4) > div > div.ant-result-title').should('have.text', 'Successfully Create Course!');
            });

        })
        //})
});