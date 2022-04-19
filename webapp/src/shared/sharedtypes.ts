export type Producto = {
  categoria: string;
  name: string;
  description: string;
  urlImage: string;
  price: number;
  units: number;
  onSale: boolean;
}

export type User = {
  email?:string;
  dni?:string;
  username:string;
  password:string;
  confirmPassword?:string;
  token:string;
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