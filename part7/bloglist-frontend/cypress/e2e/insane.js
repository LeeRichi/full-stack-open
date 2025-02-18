describe('template spec', () =>
{
	 beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'cat',
      username: 'cat',
      password: '123'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:5173')
	 })

  // it('passes', () => {
  //   cy.visit('http://localhost:5173/')
	// })

	// it('Login form is shown', function() {
	// 	cy.visit('http://localhost:5173')
	// 	cy.contains('login').click()

  //   cy.get('input[name="Username"]').should('exist')
  //   cy.get('input[name="Password"]').should('exist')
  //   cy.get('button[type="submit"]').should('exist')
	// })

	// describe('Login',function() {
	// 	it('succeeds with correct credentials', async function ()
	// 	{
	// 		cy.contains('login').click()
	// 		cy.get('#username').type('cat')
	// 		cy.get('#password').type('123')
	// 		cy.get('#login-button').click()

	// 		cy.contains('cat logged in')
  //   })

  //   it('fails with wrong credentials', function() {
  //     cy.contains('login').click()
	// 		cy.get('#username').type('cat')
	// 		cy.get('#password').type('124')
	// 		cy.get('#login-button').click()

	// 		cy.contains('Wrong credentials')
  //   })
	// })

  describe('When logged in', function() {
    beforeEach(function() {
			cy.contains('login').click()
			cy.get('#username').type('cat')
			cy.get('#password').type('123')
			cy.get('#login-button').click()
		})

		it('A blog can be created', function() {
			// cy.contains('new blog').click()
			cy.get('#title').type('a blog created by cypress')
			cy.get('#author').type('rich')
			cy.get('#url').type('www.rich.com')
			cy.contains('new blog').click({ force: true })
      // cy.contains('a blog create3d by cypress')
		})
	})
})
