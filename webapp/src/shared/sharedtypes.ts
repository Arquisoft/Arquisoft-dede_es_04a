export type Producto = {
  categoria: string;
  name: string;
  description: string;
  urlImage: string;
  price: number;
  units: number;
  onSale: boolean;
}

enum Roles {ROLE_USER,ROLE_ADMIN}

export type User = {
  email?:string;
  dni?:string;
  username:string;
  password:string;
  confirmPassword?:string;
  token?:string;
  role?:Roles;
}

export type Item = {
  producto: Producto;
  num: number;
}

export type OrderType = {
    id: string;
    owner: User;
    products: Item[];
    price: number;
}

export type PaymentMean = {
  name: string;
  surname: string;
  code: string;
  date: string;
  cvv: string;
}