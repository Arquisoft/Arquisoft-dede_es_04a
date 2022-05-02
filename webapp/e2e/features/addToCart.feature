Feature: Añadiendo un producto al carrito

Scenario: Un usuario logeado añade un producto
  Given An logged user
  When I add a product to cart 
  Then I see the product on the cart

