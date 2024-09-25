# React Guest List project

## Create a variable to hold guests

[ ] Create an empty Array of Objects

## Creation of users

- Create two text input fields
- When a user clicks enter a new user should be created
- create a state for attending and set the default to false
- when creating new users/guests, return a div that contains data-test-id="guest"
- create checkbox input

## Deletion of users

- create a function to delete users with a click of a button called Remove
- the aria-label of the button should have Remove <first name> <last name>)

## Changing guest status

- change guest to attending or not attending with a checkbox
- set the checkbox to be clicked as default

## Connect to an API

- https://github.com/upleveled/express-guest-list-api-memory-data-store
- save changes to the API
- load the guest list from the API

### Loading

- create a loading state, use an If statemnt to check if loading if yes show loading
- plus disable the input fields if loading

## Default view

- the default view should show all guests in the list.
