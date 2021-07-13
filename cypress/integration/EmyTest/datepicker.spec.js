import { datepicker } from "../../support/pageObject/datePicker.page";
import { navigateTo } from "../../support/pageObject/navigation.page";

describe('Datepicker page verification', () => {
    before(() => {
        cy.openHomePge();
    });

    beforeEach(() => {
        navigateTo.menuItem('Forms', 'Datepicker');
    });

    it('Should pick date from today', () => {
        datepicker.selectDateFromToday(7);
    });

    it('Should pick date range from today', () => {
        datepicker.selectDatepickerWithRangeFromToday(10, 23);
    });
});