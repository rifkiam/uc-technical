import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import reactHook from "alova/react";

export const backendApi = createAlova({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
    requestAdapter: adapterFetch(),
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT ?? "5000", 10),
    statesHook: reactHook,
    responded: (response) => response.json()
})