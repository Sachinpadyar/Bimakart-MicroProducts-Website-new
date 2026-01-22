import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export interface CreatePaymentLinkRequest {
    amount: number;
    phone: string;
    description: string;
    name: string;
    email: string;
    callbackUrl: string;
}

export interface CreatePaymentLinkResponse {
    status: string;
    statusCode: number;
    message: string;
    data: {
        paymentUrl: string;
        orderId: string;
    };
}

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        createPaymentLink: builder.mutation<CreatePaymentLinkResponse, CreatePaymentLinkRequest | CreatePaymentLinkRequest[]>({
            query: (body) => ({
                url: "/api/payment/create-link",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useCreatePaymentLinkMutation } = paymentApi;
