const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('form').should('be.visible');
    cy.get('form').within(() => {
      cy.get('input[name="Username"]').should('be.visible');
      cy.get('input[name="Password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username')
          .and('have.css', 'color', 'rgb(114, 28, 36)') //display in red(114, 28, 36)
    })
  })

  describe('When logged in', function ()
  {
    beforeEach(function ()
    {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai',
        password: 'salainen'
      }).then((response) =>
      {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('succeeds with correct credentials', function () {
      cy.contains('mluukkai logged in');
    });
    
    it('A blog can be created', function ()
    {
      cy.contains('new blog').click()
      cy.get('#title-input').type('test2')
      cy.get('#author-input').type('test2')
      cy.get('#url-input').type('www.test2.com')
      cy.get('#create-btn').click();
      cy.contains('test2')
    })

    describe('blog exist', function ()
    {
      beforeEach(function ()
      {
        cy.contains('new blog').click()
        cy.get('#title-input').type('test3')
        cy.get('#author-input').type('test3')
        cy.get('#url-input').type('www.test3.com')
        cy.get('#create-btn').click();
        cy.contains('test3')
      })

      it('user can like a blog', function ()
      {        
        cy.contains('view').click();
        cy.contains('like').click();
        cy.contains('1').should('be.visible');
        cy.contains('0').should('not.exist');
      })

      it('matched user could see the delete btn', function ()
      {
        cy.contains('view').click();
        cy.contains('delete').should('be.visible');
      })
      //log a second user
      describe('simulate the second user', function() {
        beforeEach(function() {
          const user = {
            name: 'second',
            username: 'second',
            password: '123'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', user)
        
          cy.visit('http://localhost:5173')

          cy.request('POST', 'http://localhost:3003/api/login', {
            username: 'second',
            password: '123'
          }).then((response) =>
          {
            localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
            cy.visit('http://localhost:5173')
          })
        })

        it('succeeds with correct credentials', function () {
          cy.contains('second logged in');
          cy.contains('view').click()
          cy.contains('delete').should('not.exist');
        });

        it('the blogs are in the right order', function ()
        {
          cy.contains('new blog').click()
          cy.get('#title-input').type('test4')
          cy.get('#author-input').type('test4')
          cy.get('#url-input').type('www.test4.com')
          cy.get('#create-btn').click();

          cy.contains('view').click();
          cy.contains('like').click();

          cy.get('.blog').eq(0).should('contain', 'test3')
          cy.get('.blog').eq(1).should('contain', 'test4')
        })
      })
    })
  })
})