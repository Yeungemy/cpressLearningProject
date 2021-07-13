export class FormLayoutPage{
    submitInlineFormWithNameAndEmail(name, email){
        cy.contains('nb-card', 'Inline form').find('form').then(inlineForm => {
            cy.wrap(inlineForm).find('[placeholder="Jane Doe"]').type(name, {force: true});
            cy.wrap(inlineForm).find('[placeholder="Email"]').type(email, {force: true});
            cy.wrap(inlineForm).find('[type="checkbox"]').check({force: true});
            cy.wrap(inlineForm).submit();
        });
    }
}
export const formLayoutPage = new FormLayoutPage();