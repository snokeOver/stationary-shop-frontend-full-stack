import { baseApi } from "@/redux/api/baseAPI";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createInent: builder.mutation({
      query: (intentInfo) => ({
        url: "/orders/payment-intent",
        method: "POST",
        body: intentInfo,
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Orders"],
    }),
    approveOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order", "Orders"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getSingleOrder: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateInentMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useApproveOrderMutation,
} = orderApi;
