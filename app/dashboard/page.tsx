import ProductForm from "@/components/form/product-form";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="w-full px-4 py-6 md:px-8 md:py-8">
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create a new product.
          </p>
        </div>
        <ProductForm />
        <Link
          href="/photos/1"
          className="inline-block text-sm underline underline-offset-4"
        >
          Go to photo
        </Link>
      </section>
    </main>
  );
}
