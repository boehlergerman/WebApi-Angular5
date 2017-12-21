import { TypeProduct } from "./typeProduct.model";

export class Product {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    typeProductId?: number;
    typeProduct?: TypeProduct;
}
