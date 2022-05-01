Feature: Buscando un producto por precio

Scenario: El usuario no esta registrado busca un producto por precio minimo
  Given An unregistered user
  When I fill price in the minimun bar
  Then The products with a price above that one are shown

Scenario: El usuario no esta registrado busca un producto por precio maximo
  Given An unregistered user
  When I fill price in the maximum bar
  Then The products with a price under that one are shown