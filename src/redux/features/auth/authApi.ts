import { baseApi } from "@/redux/api/baseAPI";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    getSingleUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateSingleUser: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.email}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User", "Users"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    userActivationToggle: builder.mutation({
      query: (email) => ({
        url: `/users/toogle-activation/${email}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users", "User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useGetSingleUserQuery,
  useGetAllUsersQuery,
  useUpdateSingleUserMutation,
  useUserActivationToggleMutation,
} = authApi;
