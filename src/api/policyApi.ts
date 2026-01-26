import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const STATIC_AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzNhYjMxM2M5ZjE4OWQ0YTEzYWMwZiIsInBlcm1pc3Npb25zIjpbIkJVWV9QT0xJQ1kiXSwiaWF0IjoxNzY5MzMxMjQ5LCJleHAiOjE3Njk1OTA0NDl9.qklwV7lFUkd1zcG8hnlBufaUXapogDKzo3uDoBB-m-4";

// ✅ Set cookie once (dev only)
// ⚠️ will NOT work if backend cookie is HttpOnly
document.cookie = `auth_token=${STATIC_AUTH_TOKEN}; path=/; SameSite=Lax`;

export interface BuyPolicyRequest {
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  numberOfPeople: number;
}

export interface BuyPolicyResponse {
  status: string;
  statusCode: number;
  message: string;
  data?: any;
}

export const policyApi = createApi({
  reducerPath: "policyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // ✅ sends auth_token cookie automatically
  }),
  endpoints: (builder) => ({
    buyPolicy: builder.mutation<BuyPolicyResponse, BuyPolicyRequest>({
      query: (body) => ({
        url: "/api/policies/buy",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useBuyPolicyMutation } = policyApi;
