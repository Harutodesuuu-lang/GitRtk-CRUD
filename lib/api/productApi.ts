import { ProductResponse } from "../type/product";
import { fakeStoreApi } from "./api";

export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => `/api/v1/products`,
    }),
    getUserById: builder.query<ProductResponse[], number>({
      query: (id) => `/api/v1/users`,
    }),
  }),
});

export const { useGetProductsQuery, useGetUserByIdQuery } = productApi;
