import AddCartBottom from "@/component/addToCard";
import VariableBottom from "@/component/bottom-incre-decre";
import { ProductResponse } from "@/lib/type/product";
import Image from "next/image";

//function to get product by p_id
async function getProductById(id: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/products/${id}`,
  );
  const product: ProductResponse = await data.json();
  return product;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //handle data from promise
  const { id } = await params;

  //received product data
  const product: ProductResponse = await getProductById(id);
  // console.log("product", product);

  return (
    <main className="container mx-auto flex min-h-screen items-center px-4 py-8">
      <section className="mx-auto max-w-4xl rounded-2xl border-4 border-gray-400 bg-white p-6 text-slate-900 md:p-10 dark:border-gray-600 dark:bg-transparent dark:text-slate-100">
        <div className="grid text-center justify-center items-center justify-items-center gap-3">
          <h1 className="text-center text-2xl font-semibold">
            Product Detail Page {id}
          </h1>
          <h2>Product ID: {product.id}</h2>
          <h2>{product.title}</h2>
          <h2>{product.slug}</h2>
          <Image
            src={product.images[0]}
            alt="product.img"
            width={500}
            height={500}
            className="mx-auto rounded-lg ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <h2>Price: {product.price} USD</h2>
          <h2>{product.description}</h2>
          <VariableBottom unitPrice={product.price} />
          <AddCartBottom unitPrice={product.price} />
        </div>
      </section>
    </main>
  );
}
