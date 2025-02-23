import { baseApi } from "@/redux/api/baseAPI";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({
        page = 1,
        limit = 6,
        searchTerm = "",
        minPrice,
        maxPrice,
        category,
        inStock,
      }: {
        page?: number;
        limit?: number;
        searchTerm?: string;
        minPrice?: number;
        maxPrice?: number;
        category?: string;
        inStock?: boolean;
      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        params.append("isDeleted", "false");

        // Add optional query parameters if they are defined
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (minPrice !== undefined)
          params.append("minPrice", minPrice.toString());
        if (maxPrice !== undefined)
          params.append("maxPrice", maxPrice.toString());
        if (category) params.append("category", category);
        if (inStock !== undefined) params.append("inStock", inStock.toString());

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: `/products/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["Product", "Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useLazyGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
