import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const packageService = createApi({
    reducerPath: "packageService",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5088/api/packages"
    }),
    tagTypes: ["Package"],
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: () => 
            ({
                url: "/packages",
                method: "GET",
                
            })
                ,

            providesTags: ["Package"],
        }),
        getPackageById: builder.query({
            query: (id) => `/packages/${id}`,
            providesTags: ["Package"],
        }),
        getUserPackages: builder.query({
            query: (userId) => `/user-packages/${userId}`,
            providesTags: ["Package"],
        }),
        getServices: builder.query({
            query: () => "/services",
            providesTags: ["Package"],
        }),
        getServicesById: builder.query({
            query: (id) => `/services/${id}`,
            providesTags: ["Package"],
        }),

    }),
});

export const { useGetPackagesQuery, useGetPackageByIdQuery, useGetUserPackagesQuery, useGetServicesQuery, useGetServicesByIdQuery } = packageService;