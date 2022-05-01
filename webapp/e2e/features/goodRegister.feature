Feature: Registrando a un usuario

Scenario: Un usuario no registrado intenta registrarse con email existente
  Given An unregistered user
  When I try to register with repeated email
  Then An error message is shown