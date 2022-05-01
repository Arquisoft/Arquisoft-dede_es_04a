Feature: Añadiendo un producto al carrito

Scenario: Un usuario no registrado intenta logearse
  Given An unregistered user
  When I login 
  Then I am at the login view and an error message is shown

Scenario: Un usuario no registrado intenta logearse y no rellena campos
  Given An unregistered user
  When I login with blank params 
  Then I am at the login view and an error message is shown