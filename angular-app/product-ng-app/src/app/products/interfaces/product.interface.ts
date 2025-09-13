export interface Products {
    products: Product[];
}

export interface Product {
    id:          number;
    name:        string;
    description: string;
    price:       number;
    quantity:    number;
    stock:       number;
}
