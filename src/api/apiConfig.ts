import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductsResponse, ProductConfigResponse } from "../types/product.types";

// Get API base URL from environment variables
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Create API service using RTK Query
export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => "/api/products",
        }),
        downloadFile: builder.query<Blob, string>({
            query: (fileKey) => ({
                url: `/api/file/download?key=${fileKey}`,
                responseHandler: (response) => response.blob(),
            }),
        }),
        getProductConfig: builder.query<ProductConfigResponse, string>({
            query: (id) => `/api/products/${id}/config`,
        }),
        downloadTemplate: builder.query<Blob, string>({
            query: (productId) => ({
                url: `https://bimakart.onrender.com/excel/${productId}`,
                responseHandler: (response) => response.blob(),
            }),
        }),
        validateExcel: builder.mutation<{ valid: boolean; message: string; errors?: string[] }, { productId: string; file: File }>({
            query: ({ productId, file }) => {
                const formData = new FormData();
                formData.append("file", file);
                return {
                    url: `https://bimakart.onrender.com/validate-excel/${productId}`,
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

// Export hooks for usage in components
export const { useGetProductsQuery, useLazyDownloadFileQuery, useGetProductConfigQuery, useLazyDownloadTemplateQuery, useValidateExcelMutation } = productsApi;