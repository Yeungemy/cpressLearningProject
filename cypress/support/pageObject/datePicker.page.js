export class Datepicker{
    selectDateFromCalendar(noOfDaysAwayToday){
        let date = new Date();
        date.setDate(date.getDate() + noOfDaysAwayToday);

        const futureDate = date.getDate(),
        futureMonth = date.toLocaleString('default', {month: 'short'}),
        futureYear = date.getFullYear(),
        assertBtnText = futureMonth + ' ' + futureYear,
        assertDate = futureMonth + ' ' + futureDate + ', ' + futureYear;

        cy.get('nb-calendar-navigation button').invoke('text').then(btnText => {
            if(! ((btnText.trim()) === assertBtnText)){
                if(noOfDaysAwayToday > 0){
                    cy.get('[data-name="chevron-right"]').click();
                }else{
                    cy.get('nb-calendar-pageable-navigation [data-name="chevron-left"]').click();
                }
                
                /**
                 * JS can loop itself by call itself
                 */
                this.selectDateFromCalendar(noOfDaysAwayToday);
            }else{
                cy.get('.day-cell').not('.bounding-month').contains(futureDate).click();
            }
        });
        return assertDate;
    }

    selectDateFromToday(noOfDaysAwayToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then(inputField => {
            cy.wrap(inputField).click({force: true});

            const assertDate = this.selectDateFromCalendar(noOfDaysAwayToday);
            cy.wrap(inputField).should('have.value', assertDate);
        });
    }

    selectDatepickerWithRangeFromToday(noOfDaysAwayTodayForStartingDate, noOfDaysAwayTodayForEndingDate){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(rangeDateInputField => {
            cy.wrap(rangeDateInputField).click({force: true});
            const firstDate = this.selectDateFromCalendar(noOfDaysAwayTodayForStartingDate);
            const lastDate = this.selectDateFromCalendar(noOfDaysAwayTodayForEndingDate);
            const assertDateRange = firstDate + ' - ' + lastDate;
            cy.wrap(rangeDateInputField).should('have.value', assertDateRange);
        });
        
    }
}
export const datepicker = new Datepicker();