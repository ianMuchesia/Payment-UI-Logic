import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TypeBusiness } from "../../@types";




export const businessService = createApi({
    reducerPath: "businessService",
    baseQuery: fetchBaseQuery({ baseUrl: "http://41.90.106.13:5080/api/Business" }),
    tagTypes: ["Business"],
    endpoints: (builder) => ({
        getBusinesses: builder.query({
        query: () => "/business",
        providesTags: ["Business"],
        }),
        getBusinessByUserId: builder.query<TypeBusiness[],string>({
        query: (userId) => `/userId/${userId}`,
        providesTags: ["Business"],
        }),
        getBusiness: builder.query<TypeBusiness, string>({
        query: (id) => `/${id}`,
        providesTags: ["Business"],
        }),
      
    }),
    });


export const { useGetBusinessesQuery, useGetBusinessByUserIdQuery,useGetBusinessQuery } = businessService;