import type { HydratedDocument } from "mongoose";

import { connectToDatabase } from "@/lib/mongoose";
import ProductModel, { Product, ProductInput } from "@/models/Product";

type ProductDocument = HydratedDocument<ProductInput>;

const toProduct = (doc: ProductDocument): Product => doc.toObject<Product>();

export async function getProducts(): Promise<Product[]> {
    await connectToDatabase();
    const products = await ProductModel.find().exec();
    return products.map((product) => toProduct(product));
}

export async function getProduct(id: string): Promise<Product | null> {
    await connectToDatabase();
    const product = await ProductModel.findById(id).exec();
    return product ? toProduct(product) : null;
}

export async function updateProduct(
    id: string,
    data: Partial<ProductInput>,
): Promise<Product | null> {
    await connectToDatabase();
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).exec();
    return updatedProduct ? toProduct(updatedProduct) : null;
}

export async function addProduct(newProduct: ProductInput): Promise<Product> {
    await connectToDatabase();
    const createdProduct = await ProductModel.create(newProduct);
    return toProduct(createdProduct);
}

// DON'T create this for tables that you don't actually need to potentially delete things from
// Could be used accidentally or misused maliciously to get rid of important data
export async function deleteProduct(id: string): Promise<boolean> {
    await connectToDatabase();
    const deleted = await ProductModel.findByIdAndDelete(id).exec();
    return Boolean(deleted);
}
