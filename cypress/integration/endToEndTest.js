/// <reference types="Cypress" />

describe('Verify end to end test scenarios', function(){

    beforeEach(function(){
        cy.fixture('example').then(function(data)
        {
            this.data = data
        })
    })
    
    it('land on MetroFare home screen', function(){
        cy.visit(Cypress.env('prodUrl'))
        cy.get('.MuiTypography-root.MuiTypography-h6').should('have.text', 'MetroFare')
    })

    it('select departure station', function(){
        cy.get(this.data.departure).click()
        cy.get('h3').then(function(element){
            const departureNameWithCode = element.text()
            var departureName = departureNameWithCode.split(' ')
            departureName = departureName[1].trim()
            cy.get('.leaflet-popup-content > section > :nth-child(2)').click()
            cy.get('.from-to-button-width70').should('contain.text', departureName)
        })
    })

    it('select arrival station', function(){
        cy.get(this.data.arrival).click()
        cy.get('h3').then(function(element){
            const arrivalNameWithCode = element.text()
            var arrivalName = arrivalNameWithCode.split(' ')
            arrivalName = arrivalName[1].trim()
            cy.get('.leaflet-popup-content > section > :nth-child(3)').click()
            cy.get(':nth-child(2) > .from-to-button-width70').should('contain.text', arrivalName)
        })
    })

    it('display price of the jouney', function(){
        //fix price can be improve
        cy.get('.MuiGrid-grid-xs-10 > .MuiPaper-root > .MuiGrid-direction-xs-column > .MuiGrid-container > :nth-child(2)')
        .should('contain.text', '26 Baht')
    })

})