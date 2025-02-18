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
			cy.get('#create-button').click({ force: true })
      cy.contains('a blog created by cypress')
		})

		describe('and a blog exists', function ()
		{
			beforeEach(function ()
			{
				// cy.contains('create new blog').click()
				cy.get('#title').type('test title')
				cy.get('#author').type('test author')
				cy.get('#url').type('http://testurl.com')
				cy.get('#create-button').click({ force: true })
				cy.contains('test title')
			})

			it('user can like post', function ()
			{
				cy.get('#view').click({ force: true })
				cy.contains('0')
				cy.get('#like').click({ force: true })
				cy.contains('1')
			})

			it('user who created a blog can delete a specific post', function ()
			{
				cy.get('#view').click({ force: true })

				cy.contains('delete').should('not.exist')
			});

			// // cy.get('new blog').click({force: true})

			// describe('delete btn is only seen by its own creator', () => {
			// 	beforeEach(function () {
			// 		const anotherU ser = {
			// 			name: 'orange',
			// 			username: 'orange',
			// 			password: '123'
			// 		}
			// 		cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)

			// 		// Log out the first user
			// 		cy.contains('log out').click()

			// 		// Log in as the second user
			// 		// cy.contains('login').click()
			// 		cy.get('#username').type('orange')
			// 		cy.get('#password').type('123')
			// 		cy.get('#login-button').click({ force: true })
			// 	})

			// 	it('should not show the delete button for another user\'s blog', function ()
			// 	{
			// 		cy.get('#view').click({ force: true })

			// 		cy.get('#delete-button').should('not.exist')

			// 	})
			// })

			it.only('blogs are ordered by likes', function () {
				// cy.contains('create new blog').click()
				cy.get('#title').type('The title with most likes')
				cy.get('#author').type('kkkk')
				cy.get('#url').type('https://www.kkkk.com')
				cy.get('#create-button').click({ force: true })

				// cy.contains('create new blog').click()
				cy.get('#title').type('The title with the second most likes')
				cy.get('#author').type('gggg')
				cy.get('#url').type('https://www.gggg.com')
				cy.get('#create-button').click({ force: true })

				cy.contains('The title with most likes').get('#view').click({force: true})
				cy.get('button').get('#like').click({force: true})
				cy.get('.blog').eq(0).should('contain', 'test title')
        cy.get('.blog').eq(1).should('contain', 'The title with most likes')
			})
		})
	})
})
