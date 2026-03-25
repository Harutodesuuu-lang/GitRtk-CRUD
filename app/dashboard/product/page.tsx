import { ProductTable } from "@/components/product/product-table";
import { useGetProductByIdQuery } from "@/lib/api/productApi";

export default function ProductDashboardPage() {
  //   const { data, isLoading } = useGetProductByIdQuery;
  return <ProductTable />;
}
