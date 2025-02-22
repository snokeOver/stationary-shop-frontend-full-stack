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
    }),
  }),
});

export const { useCreateInentMutation, useCreateOrderMutation } = orderApi;
