/// <reference types="cypress" />
import { datepicker } from "../../support/pageObject/datePicker.page";
import { navigateTo } from "../../support/pageObject/navigation.page";

describe("Form Group", () => {
    beforeEach(() => {
        cy.openHomePge();
    });

    it("Fill the form", ()=> {
        navigateTo.menuItem('Forms', 'Form Layouts');

        cy.get('#inputEmail1')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-radio')
        .contains('Option 1')
        .click({force: true})
        .children('[type="radio"]')
        .should('be.checked'); 
    });

    it("Lable of input field", () => {
        navigateTo.menuItem('Forms', 'Form Layouts');

        cy.contains('nb-card', 'Using the Grid').then(firstCard => {
            const passwordLabelFist = firstCard.find('[for="inputPassword2"]').text();
            expect(passwordLabelFist).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then(secondFirm => {
                cy.wrap(secondFirm).find('[for="exampleInputPassword1"]').invoke('text').then(passwordLabelSecond =>{
                    expect(passwordLabelFist).to.equal(passwordLabelSecond);
                });

                cy.wrap(secondFirm)
                .find('nb-checkbox')
                .click()
                .find('.custom-checkbox')
                .invoke('attr', 'class')
                .should('contain', 'checked');
                
                const passwordLabelSecond = secondFirm.find('[for="exampleInputPassword1"]').text();
                    expect(passwordLabelFist).to.equal(passwordLabelSecond);
            });
        });

        
    });

    it('Input property assertion', () => {
        navigateTo.menuItem('Forms', 'Datepicker');

        cy.contains('nb-card', 'Common Datepicker').find('input').then(pickDate => {
            cy.wrap(pickDate).click({force: true});

            cy.get('nb-calendar-day-picker').contains('19').click();
            cy.wrap(pickDate).invoke('val').then(date => {
                expect(date).not.to.empty;
            });
        });
    });

    it("Radio buttons assertion", () => {
        navigateTo.menuItem('Forms', 'Form Layouts');

        cy.contains('nb-card', 'Using the Grid').then(gridCard => {
           cy.wrap(gridCard).find('[type="radio"]').then(radioBtns => {
                cy.wrap(radioBtns).eq(0).check({force: true}).should('be.checked');
                cy.wrap(radioBtns).eq(1).should('not.be.checked');
                cy.wrap(radioBtns).eq(2).should('be.disabled');
           }) ;
        });
    });

    it("Checkbox assertion", () => {
        navigateTo.menuItem('Modal & Overlays', 'Toastr');

        cy.get('nb-card').find('[type="checkbox"]').then(checkboxes => {
            cy.wrap(checkboxes).eq(0).should('be.checked');
            
            cy.wrap(checkboxes).eq(0).check({force: true});
            cy.wrap(checkboxes).eq(0).should('be.checked');
            
            cy.wrap(checkboxes).eq(0).click({force: true});
            cy.wrap(checkboxes).eq(0).should('not.be.checked');

            cy.wrap(checkboxes).eq(1).should('not.be.checked');
            cy.wrap(checkboxes).eq(1).check({force: true});
            cy.wrap(checkboxes).eq(1).should('be.checked');

            cy.wrap(checkboxes).eq(2).should('be.checked');
        });
    });

    it("Lists and dropdown assertion", () => {
        const background_colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }

        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click();

            cy.get('.options-list nb-option', {timeout: 10000}).each((listOption, index) => {
                const listOptionName = listOption.text().trim();
                cy.wrap(listOption).click();
                cy.wrap(dropdown).should('contain', listOptionName);
                cy.get('nb-layout-header nav').should('have.css', 'background-color', background_colors[listOptionName]);
                
                if(index < 3){
                    cy.wrap(dropdown).click();
                }
            })
        });
    });

    it('tooltips', () => {
        navigateTo.menuItem('Forms', 'Modal & Overlays');
        cy.get('[title="Tooltip"]').click();

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click({force: true});
        cy.contains('nb-tooltip', 'This is a tooltip').should('be.visible');
    });
});