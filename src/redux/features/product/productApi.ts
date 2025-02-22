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
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useLazyGetProductByIdQuery,
  useLazyGetAllProductsQuery,
} = productApi;
