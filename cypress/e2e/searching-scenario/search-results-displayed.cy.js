describe('Search results sould work as expected', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/search?title=rambo')
    })

    it('Number of movies should be 3', () => {
        cy.get('[data-cy="number-of-movies"]').contains('3')
    })

    it('Click on a movie URL should contain movie id, and movie details should be visible', () => {
        cy.get('[data-cy="cover-image__1370"]', { timeout: 10000 }).click({
            force: true,
        })
        cy.url().should('include', 'search?movie=1370')
        cy.get('[data-cy="movie-description"]')
            .invoke('text')
            .should('have.length.gt', 0)
    })
})
