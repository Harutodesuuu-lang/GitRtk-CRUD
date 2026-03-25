import { ProductRequest, ProductResponse } from "../type/product";
import { fakeStoreApi } from "./api";

export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => `/api/v1/products`,
      providesTags: ["products"],
    }),
    getProductById: builder.query<ProductResponse, number>({
      query: (id) => `/api/v1/products/${id}`,
    }),
    addProduct: builder.mutation<ProductResponse, ProductRequest>({
      query: (newProduct) => ({
        url: "/api/v1/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation<
      ProductResponse,
      { id: number; body: ProductRequest }
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
