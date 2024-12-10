import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TypeBusiness } from "../../@types";




export const businessService = createApi({
    reducerPath: "businessService",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5088/api/Business" }),
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
      
    }),
    });


export const { useGetBusinessesQuery, useGetBusinessByUserIdQuery } = businessService;