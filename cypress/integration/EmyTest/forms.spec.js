import { navigateTo } from "../../support/pageObject/navigation.page";
import { formLayoutPage } from "../../support/pageObject/formLayout.Page";

describe('Form Layout page verification', () => {
    before(() => {
        cy.openHomePge();
    });

    beforeEach(() => {
        navigateTo.menuItem('Forms', 'Form Layouts');
    });

    it('Should be able to submit a inline form', () => {
        formLayoutPage.submitInlineFormWithNameAndEmail('Emy Yeung', 'emyzheng80@gmail.com');
    });
});