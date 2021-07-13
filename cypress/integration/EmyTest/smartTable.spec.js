import { datepicker } from "../../support/pageObject/datePicker.page";
import { navigateTo } from "../../support/pageObject/navigation.page";
import { smartTablePage } from "../../support/pageObject/smartTable.page";

describe('Smart Table Page Verification', () => {
    before(() => {
        cy.openHomePge();
    });

    beforeEach(() => {
        navigateTo.menuItem('Tables & Data', 'Smart Table');
    });

    it('Should be able to update age cell', () => {
        smartTablePage.updateTableAgeByFirstName('Larry', 39);
    });

    it('Should be able to add new row with user first name and last name', () => {
        smartTablePage.addNewRecordWithFirstNameAndLastName('Emy', 'Yeung');
    });

    it('Should be able to delete a row by index', () => {
        smartTablePage.deleteRowByIndex(0);
    });

    it('Should be able to filter out uses by age', () => {
        smartTablePage.filterUsersByAge([20, 30, 200]);
    });
});