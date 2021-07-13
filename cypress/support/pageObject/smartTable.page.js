export class SmartTablePage{
    updateTableAgeByFirstName(cellIdentifier, newAge){
        cy.get('tbody').contains('tr', cellIdentifier).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click({force: true});
            cy.wrap(tableRow).find('[placeholder="Age"]').click().clear().type(newAge);
            cy.wrap(tableRow).find('.nb-checkmark').click({force: true});
            cy.wrap(tableRow).contains('td', newAge).should('be.visible');
            cy.wrap(tableRow).find('td').last().should('contain', newAge);
        });
    }

    addNewRecordWithFirstNameAndLastName(firstName, lastName){
        cy.get('thead').find('.ng2-smart-filters').then(filterRow => {
            cy.wrap(filterRow).find('.nb-plus').click({force: true});
            cy.get('thead').find('tr').last().then(newRow => {
                cy.wrap(newRow).find('[placeholder="First Name"]').type(firstName);
                cy.wrap(newRow).find('[placeholder="Username"]').type(lastName);
                cy.wrap(newRow).find('.nb-checkmark').click({force: true});
                cy.get('tbody').contains('tr', firstName).should('be.visible');
                cy.get('tbody').contains('tr', lastName).should('be.visible');
            });
        });
    }

    filterUsersByAge(ages){
        cy.wrap(ages).each((age, index) => {
            cy.get('thead [placeholder="Age"]').clear().type(age); 
            cy.wait(500);
            cy.get('tbody tr').each(tableRow => {
                cy.wrap(tableRow).last().invoke('text').then(textFiltered => {
                    if(! textFiltered.includes('No data found')){
                        cy.wrap(tableRow).find('td').last().should('contain', age);
                    }
                });
            });
        });
    }

    deleteRowByIndex(indexOfRow){
        cy.get('tbody').find('tr').eq(indexOfRow).then(tableRow => {
     
            // //Delete way 1: confirmed
            // cy.wrap(tableRow).find('.nb-trash').click({force: true});
            // cy.on('window:alert', confirm => {
            //     expect(confirm).to.equal('Are you sure you want to delete?');
            //     cy.wrap(tableRow).should('not.be.visible');
            // });

            //Delete way 1: confirmed
            const stub = cy.stub();
            cy.on('window:alert', stub => {
                cy.wrap(tableRow).find('.nb-trash').click({force: true});
                expect(stub.getCalls(0)).to.be.calledWithExactly('Are you sure you want to delete?');
                cy.wrap(tableRow).should('not.be.visible');
            });
        });

        // //Cancel deletion
        // cy.contains('tbody tr', 'Mark').find('.nb-trash').click({force: true});
        // cy.on('window:alert', () => false);
        // cy.contains('tbody tr', 'Mark').should('be.visible');
    }
}
export const smartTablePage = new SmartTablePage();