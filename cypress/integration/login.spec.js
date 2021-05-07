const Locators = require("../fixtures/Locators.json")


beforeEach("Login", ()=>{
    cy.getCookies().should('be.empty')
        cy.setCookie('Username', 'stagingadmin')
        cy.setCookie('Password', 'abc123')
        cy.getCookie('Username').should('have.property', 'value', 'stagingadmin')
        cy.getCookie('Password').should('have.property', 'value', 'abc123')
        window.location.href = 'https://staging.buchdeals.de'
        cy.visit('https://staging.buchdeals.de', {
            auth: {
            username: 'stagingadmin',
            password: 'abc123',
            },
        })
        cy.get("h1.text.-white.-bold").should("be.visible").and("contain", title)
        cy.url().should("contains", "https://staging.buchdeals.de")
})
        
    let title = "Entdecke die Bücher, die du lieben wirst"



 // cy.window().then(function ($win) {
        //     cy.stub($win, "prompt").returns("stagingadmin")
        //     cy.stub($win, "prompt").returns("abc123")
        //     cy.visit("https://staging.buchdeals.de")
        // })
        
        // cy.request({url: 'https://staging.buchdeals.de', failOnStatusCode: false})     
        
        
        // cy.window().then(($win) => {
        //     const stub = cy.stub ($win, 'prompt')
        //         stub.returns('stagingadmin')
        //         stub.returns('abc123')
        //         return true
        //     }) 



describe ("Login", ()=>{

    let alertSuccessEN = "Signed in successfully."
    let emailOrdUser = "test@user.com"
    let password = "password"
    let btntxt = "Einloggen"
    let message = "Ihr Email oder Passwort Eingabe war falsch."
    let messWithoutMonkey = "Please include an '@' in the email address."
    let emailOrdUserWithoutMonkey = "testuser.com"
    let invalidemail = "test@mail.com"
    let invalidpassword = "123456"
    let emailwriter = "writer@user.com"
    let emailWriterWithoutMonkey = "writeruser.com"


    it("Login with valid data - ordinary user", ()=> {
        cy.get(Locators.Login.SignIn).eq(0).click()
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
        cy.get(Locators.Login.Email).eq(1).type(emailOrdUser)
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("include.text", alertSuccessEN)
        cy.url().should("contains", "https://staging.buchdeals.de/ebooks")
    })

    it("Login without email - ordinary user", ()=>{
        cy.get(Locators.Login.SignIn).eq(0).click()
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
    })

    it("Login without password - ordinary user", ()=>{
        cy.get(Locators.Login.SignIn).eq(0).click()
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
        cy.get(Locators.Login.Email).eq(1).type(emailOrdUser)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
    })

    it("Login with invalid email, without @ - ordinary user", ()=>{
        cy.get(Locators.Login.SignIn).eq(0).click()
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
        cy.get(Locators.Login.Email).eq(1).type(emailOrdUserWithoutMonkey)
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Email).eq(1).then(($input)=>{
            expect($input[0].validationMessage).to.contains(messWithoutMonkey)
        })
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
    })

    it("Login with invalid email - ordinary user", ()=>{
        cy.get(Locators.Login.SignIn).eq(0).click()
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
        cy.get(Locators.Login.Email).eq(1).type(invalidemail)
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
    })

    it("Login with invalid password - ordinary user", ()=>{
        cy.get(Locators.Login.SignIn).eq(0).click()
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
        cy.get(Locators.Login.Email).eq(1).type(emailOrdUser)
        cy.get(Locators.Login.Password).eq(2).type(invalidpassword)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/users/sign_in")
    })

    it("Login with valid data - writer", ()=>{
        cy.get(Locators.Login.Author).click()
        cy.get(Locators.Login.Log).contains("Einloggen").click()
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.get(Locators.Login.Email).eq(1).type(emailwriter)
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible")
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/deals")
    })

    it("Login without email - writer", ()=>{
        cy.get(Locators.Login.Author).click()
        cy.get(Locators.Login.Log).contains("Einloggen").click()
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
    })

    it("Login without password - writer", ()=>{
        cy.get(Locators.Login.Author).click()
        cy.get(Locators.Login.Log).contains("Einloggen").click()
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.get(Locators.Login.Email).eq(1).type(emailwriter)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
    })

    it("Login with invalid email, without @ - writer", ()=>{
        cy.get(Locators.Login.Author).click()
        cy.get(Locators.Login.Log).contains("Einloggen").click()
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.get(Locators.Login.Email).eq(1).type(emailWriterWithoutMonkey)
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Email).eq(1).then(($input)=>{
            expect($input[0].validationMessage).to.contains(messWithoutMonkey)
        })
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
    })

    it("Login with invalid email - writer", ()=>{
        cy.get(Locators.Login.Author).click()
        cy.get(Locators.Login.Log).contains("Einloggen").click()
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.get(Locators.Login.Email).eq(1).type(invalidemail)
        cy.get(Locators.Login.Password).eq(2).type(password)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
    })

    it("Login with invalid password - writer", ()=>{
        cy.get(Locators.Login.Author).click()
        cy.get(Locators.Login.Log).contains("Einloggen").click()
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
        cy.get(Locators.Login.Btn).should("be.visible").and("contain", btntxt)
        cy.get(Locators.Login.Email).eq(1).type(emailwriter)
        cy.get(Locators.Login.Password).eq(2).type(invalidpassword)
        cy.get(Locators.Login.Submit).eq(3).click()
        cy.get(Locators.Login.Message).should("be.visible").and("contain", message)
        cy.url().should("contains", "https://staging.buchdeals.de/autoren/sign_in")
    })











})