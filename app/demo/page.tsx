// Example of using a service in a component, also using a reusable component

import Image from "next/image";

import SimpleButton from "../../components/demobutton";

import { Button } from "@/components/ui/shadcndemobutton";
import { getProducts } from "@/services/demo";

export default async function DemoPage() {
    const products = await getProducts();

    return (
        <div className="flex flex-col items-center justify-center bg-white p-5">
            <h1 className="text-center text-black font-bold">Products</h1>
            <table className="w-1/2 mt-5 mb-5 border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 text-left bg-slate-600 text-white font-bold">Image</th>
                        <th className="p-3 text-left bg-slate-600 text-white font-bold">Name</th>
                        <th className="p-3 text-left bg-slate-600 text-white font-bold">Status</th>
                        <th className="p-3 text-left bg-slate-600 text-white font-bold">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    width={1000}
                                    height={1000}
                                    className="w-48 h-48 object-cover rounded-lg"
                                />
                            </td>
                            <td className="p-3 text-black">{product.name}</td>
                            <td className="p-3 text-black">{product.status}</td>
                            <td className="p-3 text-black">${product.price.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-row">
                <SimpleButton className="bg-green-500 text-white p-3 rounded-lg cursor-pointer hover:bg-green-700">
                    Click me!
                </SimpleButton>
                <Button>Click me too!</Button>
            </div>
        </div>
    );
}
