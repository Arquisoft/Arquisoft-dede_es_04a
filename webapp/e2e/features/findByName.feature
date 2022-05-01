Feature: Buscando un producto por nombre

Scenario: El usuario no esta registrado busca un producto en especifico
  Given An unregistered user
  When I fill a name in the search bar
  Then Only the product with the name will be shown

Scenario: El usuario no esta registrado busca un producto en general
  Given An unregistered user
  When I fill a name in the search bar
  Then The products containing the name will be shown