export interface Producto{
    _id?: string;
    categoria: string;
    name: string;
    description: string;
    urlImage: string;
    price: number;
    units: number;
    onSale: boolean;
}