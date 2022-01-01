describe("Test Acodity protfolio website", () => {
  beforeEach(() => {
    cy.visit("https://acodity.com/");
  });

  it("It should have developer name title", () => {
    cy.contains("Hi there, I'm Amir Sohel").should("exist");
  });

  it("It should redirect on hompage when click on logo", () => {
    cy.get(".navbar-brand").click();
    cy.url().should("eq", "https://acodity.com/index.php");
  });

  it("It should be mobile friendly", () => {
    cy.viewport("iphone-8");
    cy.get(".nav-toggle").click();
  });

  it("It should redirect on indivisual page", () => {
    cy.contains("My work").click();
    cy.url().should("includes", "work.php");
    cy.go("back");
  });

  it("It should not submit invalid form", () => {
    cy.contains("Hire me").click();
    cy.url().should("includes", "hire.php");
    cy.get(".contact-from input[name='name']").type("Amir Sohel");
    cy.get(".contact-from input[name='email']").type("323dsd@gmail");
    cy.get(".contact-from input[name='website']").type("www.acodity.com");
    cy.get(".contact-from textarea[name='message']").type("wdwwe");
    cy.get(".submit").should("be.disabled");
  });

  it("It should Submit a valid form", () => {
    cy.contains("Hire me").click();
    cy.url().should("includes", "hire.php");
    cy.get(".contact-from input[name='name']").type("Amir Sohel");
    cy.get(".contact-from input[name='email']").type("323dsd@gmail.com");
    cy.get(".contact-from input[name='website']").type("www.acodity.com");
    cy.get(".contact-from textarea[name='message']")
      .type(
        "This is Amir Sohel and I am doing end to end testing using cypress"
      )
      .focus()
      .blur();
    cy.get(".submit").should("not.be.disabled");
    cy.get(".submit").click();
    cy.url().should("include", "mail.php");
    cy.contains("Thanks for reaching me out");
  });
});
