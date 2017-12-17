import { TypeProduct } from "./typeProduct.model";

export class Product {
    Id?: number;
    Name?: string;
    Description?: string;
    Price?: number;
    TypeProductId?: number;
    TypeProduct?: TypeProduct;
}
