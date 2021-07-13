export class NavigationPage {
    expandMenuByName(menu){
        cy.contains('a', menu).then(menuLine => {
            cy.wrap(menuLine).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
                if(attr.includes('left')){
                    cy.wrap(menuLine).click();
                }
            });
        });
    }

    menuItem(menu, menuItem){
        this.expandMenuByName(menu);
        cy.contains(menuItem).click();
    }

    selectDateFromCalendar(noOfDaysAwayToday){
        let date = new Date();
        date.setDate(date.getDate() + noOfDaysAwayToday);

        const futureDate = date.getDate(),
        futureMonth = date.toLocaleString('default', {month: 'short'}),
        futureYear = date.getFullYear(),
        assertBtnText = futureMonth + ' ' + futureYear,
        assertDate = futureMonth + ' ' + futureDate + ', ' + futureYear;
        console.log('Asset button text: ' + assertBtnText);

        cy.get('nb-calendar-navigation button').invoke('text').then(btnText => {
            console.log('button text: ' + btnText);
            console.log('Future year: ')
            console.log('button text: ' + btnText.includes(futureYear));
            if(! ((btnText.trim()) === assertBtnText)){
                if(noOfDaysAwayToday > 0){
                    cy.get('[data-name="chevron-right"]').click();
                }else{
                    cy.get('nb-calendar-pageable-navigation [data-name="chevron-left"]').click();
                }
                
                /**
                 * JS can loop itself by call itself
                 */
                selectDateFromCalendar(noOfDaysAwayToday);
            }else{
                cy.contains('[class="day-cell ng-star-inserted"]', futureDate).click();
            }
        });
        return assertDate;
    }
}

export const navigateTo = new NavigationPage();