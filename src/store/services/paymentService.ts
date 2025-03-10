import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateServiceBundleRequest, ServiceBundlesResponse, TypePackageCard, TypePackageCardResponse } from "../../@types";

export const paymentService = createApi({
  reducerPath: "paymentService",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://41.90.106.13:5080/api/payment"
 }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    submitPayment: builder.mutation({
      query: (payment) => ({
        url: "/payment",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: ["Payment"],
    }),
    getPayments: builder.query({
      query: () => "/payment",
      providesTags: ["Payment"],
    }),

    getPackageServices: builder.query({
        query: () => "/package-services",
        providesTags: ["Payment"],
        }),
    getPackageServicesById: builder.query({
        query: (id) => `/package-services/${id}`,
        providesTags: ["Payment"],
        }),
    getUserPackages: builder.query<ServiceBundlesResponse,string|number>({
        query: (userId) => `/user-packages/${userId}`,
        providesTags: ["Payment"],
        }),
    attachToBusiness: builder.mutation<any,CreateServiceBundleRequest>({
        query: (serviceBundle) => ({
            url: "/attach-to-business/" +serviceBundle.id,
            method: "PATCH",
            body: serviceBundle,
        }),
        invalidatesTags: ["Payment"],

    }),
    getPackageCards: builder.query<TypePackageCardResponse,void>({
      query: () => ({
        url: "/package-cards",
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    getPackageCardWithId: builder.query<{message:string;data:TypePackageCard},string>({
      query: (id) => ({
        url: `/package-cards/${id}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    
  }),
});


export const { useGetPaymentsQuery, useGetPackageServicesQuery, useGetPackageServicesByIdQuery, useSubmitPaymentMutation ,useGetUserPackagesQuery,useAttachToBusinessMutation,useGetPackageCardsQuery,useGetPackageCardWithIdQuery} = paymentService;
