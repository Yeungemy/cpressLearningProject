/// <reference types="cypress" />

describe("Form Group", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it("Fill the form", ()=> {
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

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
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

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
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker').find('input').then(pickDate => {
            cy.wrap(pickDate).click({force: true});

            cy.get('nb-calendar-day-picker').contains('19').click();
            cy.wrap(pickDate).invoke('val').then(date => {
                expect(date).not.to.empty;
            });
        });
    });

    it("Radio buttons assertion", () => {
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').then(gridCard => {
           cy.wrap(gridCard).find('[type="radio"]').then(radioBtns => {
                cy.wrap(radioBtns).eq(0).check({force: true}).should('be.checked');
                cy.wrap(radioBtns).eq(1).should('not.be.checked');
                cy.wrap(radioBtns).eq(2).should('be.disabled');
           }) ;
        });
    });

    it("Checkbox assertion", () => {
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

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

    it("Table test", () => {
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //edit table cell
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click({force: true});
            cy.wrap(tableRow).find('[placeholder="Age"]').click().clear().type(30);
            cy.wrap(tableRow).find('.nb-checkmark').click({force: true});
            cy.wrap(tableRow).contains('td', 30).should('be.visible');
            cy.wrap(tableRow).find('td').last().should('contain', 30);
        });
        
        //add a new row with cells filled
        cy.get('thead').find('.ng2-smart-filters').then(filterRow => {
            cy.wrap(filterRow).find('.nb-plus').click({force: true});
            cy.get('thead').find('tr').last().then(newRow => {
                cy.wrap(newRow).find('[placeholder="First Name"]').type('SuperStar');
                cy.wrap(newRow).find('[placeholder="Username"]').type('Hello');
                cy.wrap(newRow).find('.nb-checkmark').click({force: true});
                cy.get('tbody').contains('tr', 'SuperStar').should('be.visible');
                cy.get('tbody').contains('tr', 'Hello').should('be.visible');
            });
        });

        //delete a row
        cy.get('tbody').contains('tr', 'SuperStar').should('be.visible').then(tableRow => {
            cy.wrap(tableRow).find('.nb-trash').click({force: true});
        });

        //verify filter works
        const age = [20, 30, 40, 200];
        cy.wrap(age).each((age, index) => {
            cy.get('thead [placeholder="Age"]').clear().type(age); 
            cy.wait(500);
            cy.get('tbody tr').each(tableRow => {
                if(index < 3){
                    cy.wrap(tableRow).find('td').last().should('contain', age);
                }else {
                    cy.wrap(tableRow).contains('td', 'No data found').should('be.visible');
                }
            });
        });
    });

    it.only('Date picker verification', () => {
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();
        cy.get('ngx-datepicker').find('[placeholder="Form Picker"]').click({force: true});

        function selectDateFromCurrentYear(noOfDaysAwayToday){
            let date = new Date();
            date.setDate(date.getDate() + noOfDaysAwayToday);
    
            const futureDate = date.getDate(),
            futureMonth = date.toLocaleString('default', {month: 'short'}),
            futureYear = date.getFullYear(),
            assertDate = futureMonth + ' ' + futureDate + ', ' + futureYear;
            cy.get('nb-calendar-pageable-navigation').invoke('attr', 'ng-reflect-date').then(btnText => {
                console.log('button text: ' + btnText);
                console.log('Future year: ')
                console.log('button text: ' + btnText.includes(futureYear));
                if(! (btnText.includes(futureMonth))){
                    if(noOfDaysAwayToday > 0){
                        cy.get('[data-name="chevron-right"]').click();
                    }else{
                        cy.get('[data-name="chevron-left"]').click();
                    }
                    
                    selectDateFromCalendar(noOfDaysAwayToday);
                }else{
                    cy.contains('[class="day-cell ng-star-inserted"]', futureDate).click();
                }
            });
            return assertDate;
        }

        const noOfDaysAwayToday = 500;
        const assertDate = selectDateFromCalendar(noOfDaysAwayToday);
        console.log('Assert Date: ' + assertDate);
        cy.get('[placeholder="Form Picker"]').invoke('prop', 'value').then(dataPicked => {
            expect(dataPicked).to.equal(assertDate);
        });
    });
});