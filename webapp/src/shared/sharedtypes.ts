export type Producto = {
  _id?: string;
  categories: string;
  name: string;
  description: string;
  urlImage: string;
  price: number;
  units: number;
  onSale: boolean;
}

export enum Roles {ROLE_USER,ROLE_ADMIN}

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

export type AddressType = {
  street_address: string;
  locality: string;
  region: string;
  postal_code: string;
  country_name: string;
}

export type OrderType = {
    id: string;
    user: User;
    products: Item[];
    price: number;
    address?: AddressType;
    status?: string;
    receptionDate?: Date;
}

export type PaymentMean = {
  name: string;
  surname: string;
  code: string;
  date: string;
  cvv: string;
}