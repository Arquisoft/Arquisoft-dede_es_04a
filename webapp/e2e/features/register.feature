Feature: Registrando a un usuario

Scenario: Un usuario no registrado intenta registrarse
  Given An unregistered user
  When I try to register with a bad credential
  Then An error message is shown