describe('login api', () => {
    it("login api", function() {
        cy.request({ // login first
                method: "Post",
                url: `http://cms.chtoma.com/api/login`,
                body: {
                    "email": "manager@admin.com",
                    "password": "U2FsdGVkX18kCnVlv+Uo6GPMgq5FjwcXoSO3Ty0a2ss=",
                    "role": "manager"
                }
            })
            .its("body.data.token").as("token") // after login success to get token value and set name as “token”
            .then(function() {
                cy.log(this.token) // print token，
                cy.request({ // 

                    method: "get",
                    url: `http://cms.chtoma.com/api/login`,
                    failOnStatusCode: false,
                    headers: { "Content-Type": "application/json", "Admin-Authorization": this.token } // 调用token
                }).its("body.data").should("contain", { "code": 201, "msg": "success" })

            })
    })


});