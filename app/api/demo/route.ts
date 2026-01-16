// /app/api/products/route.ts

import { NextResponse } from "next/server";

import { z } from "zod";
import { statusValues } from "@/models/Product";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "@/services/demo";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");
const productBaseSchema = z.object({
    image_url: z.url(),
    name: z.string().min(1),
    status: z.enum(statusValues),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative(),
    available_at: z.coerce.date(),
});

const productCreateSchema = productBaseSchema;
const productUpdateSchema = productBaseSchema.partial();
// GET: Fetch all products or a single product by ID
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
        const parsedId = objectIdSchema.safeParse(id);
        if (!parsedId.success) {
            return NextResponse.json(
                { message: parsedId.error.issues[0]?.message ?? "Invalid id" },
                { status: 400 },
            );
        }

        // There was an id in the search, so find the product that corresponds to it
        const product = await getProduct(parsedId.data);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } else {
        // There was no id in the get request, so return all of the products
        const products = await getProducts();
        return NextResponse.json(products, { status: 200 });
    }
}

// POST: Add a new product
export async function POST(request: Request) {
    const newProduct = productCreateSchema.parse(await request.json());
    const createdProduct = await addProduct(newProduct);
    return NextResponse.json(createdProduct, { status: 201 });
}

// PUT: Update a product
export async function PUT(request: Request) {
    const validator = z.object({
        id: objectIdSchema,
        update: productUpdateSchema,
    });
    const parsedRequest = validator.parse(await request.json());
    const id = parsedRequest.id;
    const updatedData = parsedRequest.update;
    const updatedProduct = await updateProduct(id, updatedData);
    if (!updatedProduct) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct, { status: 200 });
}

// DELETE: Delete a product
export async function DELETE(request: Request) {
    const validator = z.object({ id: objectIdSchema });
    const { id } = validator.parse(await request.json());
    const deleted = await deleteProduct(id);
    if (!deleted) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
