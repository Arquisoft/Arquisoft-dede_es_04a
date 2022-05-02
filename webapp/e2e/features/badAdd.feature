Feature: Añadiendo un producto al carrito

Scenario: Un usuario no logeado añade un producto
  Given An logged user
  When I add a product to cart 
  Then I am redirected to login view