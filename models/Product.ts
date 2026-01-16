import { HydratedDocument, InferSchemaType, Model, Schema, model, models } from "mongoose";

export const statusValues = ["active", "inactive", "archived"] as const;

const transformDocument = (_: unknown, ret: Record<string, unknown>) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    return ret;
};

const productSchema = new Schema(
    {
        image_url: { type: String, required: true },
        name: { type: String, required: true },
        status: { type: String, enum: statusValues, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        available_at: { type: Date, required: true },
    },
    {
        toJSON: { virtuals: true, versionKey: false, transform: transformDocument },
        toObject: { virtuals: true, versionKey: false, transform: transformDocument },
    },
);

export type ProductInput = InferSchemaType<typeof productSchema>;
export type ProductStatus = (typeof statusValues)[number];
export type Product = ProductInput & { id: string };
export type ProductDocument = HydratedDocument<ProductInput>;

const ProductModel: Model<ProductInput> =
    (models.Product as Model<ProductInput>) || model<ProductInput>("Product", productSchema);

export default ProductModel;
